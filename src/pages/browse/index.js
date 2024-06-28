import Default from "@/layouts/Default";
import {sendInternalReq} from "@/common/helperFn";
import BaseCard from "@/components/Card/BaseCard";
import {useEffect, useLayoutEffect, useState} from "react";
import FilterModal from "@/components/FilterModal";
import Link from "next/link";

export default function AllBrowsePosts({ data } ) {
    const [selectKey, setSelectKey] = useState("none")
    const [filterModalOpen, setFilterModalOpen] = useState(false)
    const [postsState, setPostsState] = useState(data)
    const [filterState, setFilterState] = useState({ brand: "", model: "", minPrice: "", maxPrice: "" })

    useEffect(() => {
        let sortedPosts = [...postsState]

        if (selectKey === "low") {
            sortedPosts = sortedPosts.sort((a, b) => {
                return a.price - b.price
            })
        } else if (selectKey === "high") {
            sortedPosts = sortedPosts.sort((a, b) => {
                return b.price - a.price
            })
        }
        setPostsState(sortedPosts)

    }, [selectKey])

    function handleSelect(e) {
        if (e.target.value === "none") return
        setSelectKey(e.target.value)
    }

    async function applyFilters (filters) {
        sendInternalReq("POST", "http://localhost/test-api/api/index.php/getCarsWithFilters", filters)
            .then(res => {
                console.log(res)
                setFilterState(filters)
                setPostsState(res.data.body)
            })
            .catch(err => {
                console.log(err)
            })
    }


    function renderPosts() {
        // const output = []

        // for (const post of postsState) {
        //     output.push(
        //         <div className="p-4" key={post.id}>
        //             <BaseCard postData={post}/>
        //         </div>
        //     )
        // }
        // return output
        if (!postsState) return //bcs serializing err in prod

        return postsState.map(post => (
            <div className="p-4" key={post.id}>
                <Link href={"/browse/" + post.id}>
                    <BaseCard postData={post} />
                </Link>
            </div>
        ));
    }

    return (
        <>
          <Default title={"Browse"}>
              {filterModalOpen && <FilterModal filtersProp={filterState} setFilterModalProp={setFilterModalOpen} applyFiltersFn={applyFilters}/>}
              <div id="control-section" className="flex justify-center my-5">
                  <button
                      onClick={() => {
                          setFilterModalOpen(true)
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-10">Filter
                  </button>
                  <select onChange={handleSelect} className="bg-blue-500 text-white font-bold rounded mx-10 w-40">
                      <option className="select-option" value="none">Sort</option>
                      <option className="select-option" value="low">Low</option>
                      <option className="select-option" value="high">High</option>
                  </select>
              </div>
              <div id="postList" className="flex justify-center flex-wrap mt-5">
                  {renderPosts()}
              </div>
          </Default>
        </>
    );
}

export async function getStaticProps() {
    // const res = await fetch("http://localhost/test-api/api/index.php/getAllCars");
    // console.log(res, "=================================================================")
    //
    let data = null
    await sendInternalReq("GET", "http://localhost/test-api/api/index.php/getAllCars")
        .then(res => {
            console.log(res.data)
            data = res.data.body
        })
        .catch(err => {
            console.log("========================================== in static props")
            console.log(err)
        })

    return {
        props: {
            data
        }
    }
}
