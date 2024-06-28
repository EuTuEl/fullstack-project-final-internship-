import Default from "@/layouts/Default";
import {logOut, sendInternalReq} from "@/common/helperFn";
import BaseForm from "@/components/BaseForm";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/context/GlobalContext";
import BaseSelect from "@/components/BaseSelect";
import BRAND_OPTIONS from "../../../../public/brand-model-options/brands";
import MODELS_BY_BRAND from "../../../../public/brand-model-options/models-by-brand";
import GENERATION_BY_MODEL from "../../../../public/brand-model-options/generation-by-model";
import CarForm from "@/components/CarForm";

export default function UserPost( { car } ) {
    const router = useRouter();
    const context = useContext(GlobalContext);

    // const [brandState, setBrandState] = useState(car.brand);
    // const [modelState, setModelState] = useState(car.model);
    // const [generationState, setGenerationState] = useState(car.generation);
    // const [isInitial, setIsInitial] = useState(true);
    //
    // useEffect(() => {
    //     if (isInitial) {
    //         setIsInitial(false);
    //         return;
    //     } // dont reset on the first time
    //
    //     setModelState("-");
    // }, [brandState]);
    //
    // useEffect(() => {
    //     if (isInitial) {
    //         setIsInitial(false);
    //         return;
    //     } // dont reset on the first time
    //
    //     setGenerationState("-");
    // }, [modelState]);

    function handleSubmit(fields) {
        if (car.brand === brandState && car.model === modelState && car.generation === generationState) {
            console.log("form not valid")
            return
        }

        sendInternalReq("PUT", "http://localhost/test-api/api/index.php/editCar/" + car.id, fields)
            .then(res => {
                context.setAlertModal(true, "Success", "", "/user-posts/" + router.query.user)
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.status === 401) {
                    sendInternalReq("POST", "http://localhost/test-api/api/index.php/refreshTokenPair")
                        .then(res => {
                            console.log(res.data);
                            sendInternalReq("PUT", "http://localhost/test-api/api/index.php/editCar/" + car.id, fields)
                                .then(res => {
                                    context.setAlertModal(true, "Success", "", router.asPath)
                                })
                        })
                        .catch(err => {
                            context.setAlertModal(true, "Error, login required", err.response.data.error)
                            logOut()
                            localStorage.setItem("isLogged", "false")
                        })
                } else {
                    context.setAlertModal(true, "Error, login required", err.response.data.error)
                    logOut()
                    localStorage.setItem("isLogged", "false")
                }
            })
    }

    return (
        <>
            <Default title={"My posts"}>
                <BaseForm
                    fields={["year", "km", "price", "engine", "fuel", "power", "image", "description"]}
                    defaultValues={[car.year, car.km, car.price, car.engine, car.fuel, car.power, car.image, car.description]}
                    optionalFields={["image", "description"]}
                    formTitle={"Edit post " + car.id}
                    handleSubmitFn={handleSubmit}
                    additionalInputs={3} // for the selects
                >
                    <BaseSelect optionsProp={BRAND_OPTIONS} labelProp={"brand"} parentState={brandState} setParentState={setBrandState}></BaseSelect>
                    <BaseSelect optionsProp={MODELS_BY_BRAND[brandState]} labelProp={"model"} parentState={modelState} setParentState={setModelState}></BaseSelect>
                    <BaseSelect optionsProp={GENERATION_BY_MODEL[modelState + brandState]} labelProp={"generation"} parentState={generationState} setParentState={setGenerationState}></BaseSelect>
                </BaseForm>
                {/*<CarForm*/}
                {/*    defaultValues={[car.year, car.km, car.price, car.engine, car.fuel, car.power, car.image, car.description]}*/}
                {/*    carToBeEdited={car}*/}
                {/*    formTitle={"Edit post " + car.id}*/}
                {/*    handleSubmitFn={handleSubmit}*/}
                {/*/>*/}

            </Default>
        </>
    );
}

export async function getServerSideProps(context) {
    let car = null
    let contextCookies = context.req.headers.cookie ?? "username=,.[]42fSDfg43bh546u76kmngg";
    const contextQueryUser = context.query.user;
    const contextCookieUser = contextCookies.match(/username=([^;]+)(?:;|$)/)[1] ?? "";

    if (contextCookieUser !== contextQueryUser) {
        return {
            notFound: true
        };
    }

    await sendInternalReq("GET", "http://localhost/test-api/api/index.php/getCarById/" + context.query.postId)
        .then(res => {
            car = res.data.body;
        })
        .catch(err => {
            console.log(err.response.data);
        })

    return {
        props: {
            car
        }
    }
}