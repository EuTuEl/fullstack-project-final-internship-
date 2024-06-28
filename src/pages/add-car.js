import Default from "@/layouts/Default";
import BaseForm from "@/components/BaseForm";
import {logOut, sendInternalReq} from "@/common/helperFn";
import {GlobalContext} from "@/context/GlobalContext";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import BRAND_OPTIONS from "../../public/brand-model-options/brands";
import MODELS_BY_BRAND from "../../public/brand-model-options/models-by-brand";
import BaseSelect from "@/components/BaseSelect";
import GENERATION_BY_MODEL from "../../public/brand-model-options/generation-by-model";

export default function AddCar() {
    const context = useContext(GlobalContext)
    const [brandState, setBrandState] = useState("-")
    const [modelState, setModelState] = useState("-")
    const [generationState, setGenerationState] = useState("-")

    useEffect(() => {
        setModelState("-")
    }, [brandState]);

    useEffect(() => {
        setGenerationState("-")
    }, [modelState]);

    function handleSubmit(fields) {
        sendInternalReq("POST", "http://localhost/test-api/api/index.php/addNewCar", fields)
            .then(res => {
                context.setAlertModal(true, "Success")
            })
            .catch(err => {
                if (err.response.status === 401) {
                    sendInternalReq("POST", "http://localhost/test-api/api/index.php/refreshTokenPair")
                        .then(res => {
                            sendInternalReq("POST", "http://localhost/test-api/api/index.php/addNewCar", fields)
                                .then(res => {
                                    context.setAlertModal(true, "Success")
                                })
                        })
                        .catch(err => {
                            context.setAlertModal(true, "Error, login required!", err.response.data.error)
                            logOut()
                            localStorage.setItem("isLogged", "false")
                        })
                } else {
                    context.setAlertModal(true, "Error!", err.response.data.error)
                    // logOut()
                    // localStorage.setItem("isLogged", "false")
                }
            })
    }


    return (
        <>
            <Default title={"Add car"}>
                <BaseForm
                    fields={["year", "km", "price", "engine", "fuel", "power", "image", "description"]}
                    optionalFields={["image", "description"]}
                    formTitle={"Add car"}
                    handleSubmitFn={handleSubmit}
                    additionalInputs={3} // for the selects
                >
                    <BaseSelect optionsProp={BRAND_OPTIONS} labelProp={"brand"} parentState={brandState} setParentState={setBrandState}></BaseSelect>
                    <BaseSelect optionsProp={MODELS_BY_BRAND[brandState]} labelProp={"model"} parentState={modelState} setParentState={setModelState}></BaseSelect>
                    <BaseSelect optionsProp={GENERATION_BY_MODEL[modelState + brandState]} labelProp={"generation"} parentState={generationState} setParentState={setGenerationState}></BaseSelect>
                </BaseForm>

            </Default>
        </>
    );
}