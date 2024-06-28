import Default from "@/layouts/Default";
import ImageCarousel from "@/components/ImageCarousel";
import {capitalizeFirstLetter, sendInternalReq, tr} from "@/common/helperFn";

export default function BrowsePost( { car } ) {
    console.log(car)
    return (
        <>
            <Default title={"Browse"}>
                {/*<div className="flex justify-center h-full w-full">*/}
                {/*    <div className="h-4/5 w-1/2 bg-amber-700 my-8 p-6 border border-gray-900">*/}
                {/*        <div className="w-full h-1/3">*/}
                {/*            <div id="image-section" className="w-1/2 h-full">*/}
                {/*                <ImageCarousel imagesProp={["/car-images/default.png", "/car-images/bg1.jpg"]}/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        content {car}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="flex justify-center">
                    <div className="bg-gray-50 bg-opacity-50 my-8 p-6 border border-gray-900/10 border-b-black/30 rounded-2xl shadow-xl">
                        <div className="flex items-start">
                            <div className="w-96 h-72">
                                <div id="image-section" className="w-full h-full">
                                    <ImageCarousel imagesProp={["/car-images/default.png", "/car-images/bg1.jpg"]}
                                                   autoPlayProp={false}/>
                                </div>
                            </div>
                            <div className="flex flex-col ml-4 px-6">
                                <div className="flex justify-between m-2 border-b border-b-black pb-1 rounded-b">
                                    <p className="font-bold text-xl">{car.brand.toUpperCase()} {car.model.toUpperCase()}</p>
                                </div>
                                <div>
                                    <p>{car.year} * {car.power}hp
                                        * {car.engine}<sup>3</sup> * {capitalizeFirstLetter(tr(car.fuel))}</p>
                                </div>
                                <p className="mt-6 border-b border-b-red-700 text-red-700 font-bold text-3xl">{car.price}€</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Default>
        </>
    );
}

export async function getServerSideProps(context) {
    let car = null

    await sendInternalReq("GET", "http://localhost/test-api/api/index.php/getCarById/" + context.query.postId)
        .then(res => {
            console.log(res.data);
            car = res.data.body;
        })
        .catch(err => {
            console.log(err.response.data);
        })

    console.log(car)
    return {
        props: {
            car
        }
    }
}