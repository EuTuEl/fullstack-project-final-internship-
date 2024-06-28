import Default from "@/layouts/Default";
import {capitalizeFirstLetter, logOut, sendInternalReq} from "@/common/helperFn";
import {Card, CardBody, CardHeader, CardFooter} from "@nextui-org/card";
import Image from "next/image";
import {useRouter} from "next/router";
import {useContext, useRef, useState} from "react";
import {GlobalContext} from "@/context/GlobalContext";
import BaseCard from "@/components/Card/BaseCard";

export default function AllUserPosts( { data, loginAgain } ) {
    const context = useContext(GlobalContext)
    const router = useRouter()

    function deleteHandler(id) {
        sendInternalReq("DELETE", "http://localhost/test-api/api/index.php/delete/" + id)
            .then(res => {
                context.setAlertModal(true, "Success", "", router.asPath)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    sendInternalReq("POST", "http://localhost/test-api/api/index.php/refreshTokenPair")
                        .then(res => {
                            sendInternalReq("POST", "http://localhost/test-api/api/index.php/delete/" + id)
                                .then(res => {
                                    context.setAlertModal(true, "Success", "", router.asPath)
                                })
                        })
                        .catch(err => {
                            context.setAlertModal(true, "Error, login required", err.response.data.error, "/log-in")
                            logOut()
                            localStorage.setItem("isLogged", "false")
                        })
                } else {
                    context.setAlertModal(true, "Error, login required", err.response.data.error, "/log-in")
                    logOut()
                    localStorage.setItem("isLogged", "false")
                }
            })
    }

    function handleMouseEnter(evt) {
        evt.stopPropagation()
        evt.currentTarget.children[0].children[2].children[0].className = "block"
    }

    function handleMouseLeave(evt) {
        evt.stopPropagation()
        evt.currentTarget.children[0].children[2].children[0].className = "hidden"
    }

    function renderPosts(posts, loginAgain) {
        if (loginAgain) {
            logOut()
            context.setIntervalRunning(false);
            return (
                <h2>Username altered, login again!</h2>
            )
        }
        if (typeof data === "string") {
            return (
                <h2>No posts yet</h2>
            )
        }

        const output = []

        for (const post of posts) {
            output.push(
                <div className="p-4" key={post.id}>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id={post.id}>
                        {/*<Card className={`w-64 h-72 hover:scale-110 hover:h-80`}>*/}
                        {/*    <CardHeader className="pb-0 pt-1 px-1 flex-col items-start h-3/5 relative">*/}
                        {/*        <Image*/}
                        {/*            alt="Image unavailable"*/}
                        {/*            className="object-cover rounded-xl"*/}
                        {/*            src="/favicon/default.png"*/}
                        {/*            // width={200}*/}
                        {/*            // height={200}*/}
                        {/*            fill={true}*/}
                        {/*        />*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardBody className="overflow-visible py-2">*/}
                        {/*        <h3 className="font-bold text-large border-solid border-b-1.5 border-black rounded-md text-nowrap">*/}
                        {/*            {post.brand.toUpperCase()} {capitalizeFirstLetter(post.model)} - {post.price}€*/}
                        {/*        </h3>*/}
                        {/*        <p className="pt-3">{post.year} * {post.power}hp * {post.engine}<sup>3</sup> * {capitalizeFirstLetter(post.fuel)}</p>*/}
                        {/*    </CardBody>*/}
                        {/*    <CardFooter className="flex justify-center align-middle">*/}
                        {/*        <div className="hidden">*/}
                        {/*            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 scale-90"*/}
                        {/*                onClick={() => {*/}
                        {/*                    // console.log()*/}
                        {/*                    router.push(router.asPath + "/" + post.id)*/}
                        {/*                }}*/}
                        {/*            >*/}
                        {/*                Edit</button>*/}
                        {/*            <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded m-2 scale-90"*/}
                        {/*                onClick={deleteHandler.bind(this, post.id)}*/}
                        {/*            >*/}
                        {/*                Delete</button>*/}
                        {/*        </div>*/}
                        {/*    </CardFooter>*/}
                        {/*</Card>*/}
                        <BaseCard postData={post}>
                            {/*footer*/}
                            <div className="hidden">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 scale-90"
                                    onClick={() => {
                                        // console.log()
                                        router.push(router.asPath + "/" + post.id)
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded m-2 scale-90"
                                    onClick={deleteHandler.bind(this, post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </BaseCard>
                    </div>
                </div>
            )
        }

        return output
    }

    return (
        <>
            <Default title={"My posts"}>
                <div id="postList" className="flex justify-center flex-wrap mt-5">
                    {renderPosts(data, loginAgain)}
                </div>
            </Default>
        </>
    );
}

export async function getServerSideProps(context) {
    let contextCookies = context.req.headers.cookie ?? "username=,.[]42fSDfg43bh546u76kmngg";
    const contextQueryUser = context.query.user;
    const contextCookieUser = contextCookies.match(/username=([^;]+)(?:;|$)/)[1] ?? "";

    if (contextCookieUser !== contextQueryUser) {
        return {
            notFound: true
        };
    }
    let data = null
    let loginAgain = false

    await sendInternalReq("GET", "http://localhost/test-api/api/index.php/getCarsByUser", undefined, contextCookies)
        .then(res => {
            console.log(res.data);
            data = res.data.body;
        })
        .catch(err => {
            console.log(err.response.data);
            loginAgain = true;
        })
    return {
        props: {
            data,
            loginAgain
        }
    }
}