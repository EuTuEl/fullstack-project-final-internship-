import {useContext, useEffect, useRef, useState} from "react";
import {input} from "@nextui-org/theme";
import {formIsValid, tr} from "@/common/helperFn";
import {capitalizeFirstLetter} from "@/common/helperFn"
import {GlobalContext} from "@/context/GlobalContext";
import BaseSelect from "@/components/BaseSelect";
import BRAND_OPTIONS from "../../public/brand-model-options/brands";
import MODELS_BY_BRAND from "../../public/brand-model-options/models-by-brand";
import GENERATION_BY_MODEL from "../../public/brand-model-options/generation-by-model";

export default function CarForm({ defaultValues = null, carToBeEdited = null, formTitle, handleSubmitFn }) {
    let formRef = useRef();
    const inputGroupRef = useRef()

    const inputFields = ["year", "km", "price", "engine", "fuel", "power", "image", "description"]
    const optionalFields = ["image", "description"]

    const [brandState, setBrandState] = useState(carToBeEdited ? carToBeEdited.brand : "-")
    const [modelState, setModelState] = useState(carToBeEdited ? carToBeEdited.model : "-")
    const [generationState, setGenerationState] = useState(carToBeEdited ? carToBeEdited.generation : "-")
    const [isInitial, setIsInitial] = useState(true);

    useEffect(() => {
        if (isInitial) {
            setIsInitial(false);
            return;
        } // dont reset on the first time

        setModelState("-");
    }, [brandState]);

    useEffect(() => {
        if (isInitial) {
            setIsInitial(false);
            return;
        } // dont reset on the first time

        setGenerationState("-");
    }, [modelState]);

    function generateInputs() {
        const output = [];

        inputFields.forEach((field, index) => {
            // console.log(field)
            output.push(
                <div className="mb-4" key={field + ":" + formTitle}>
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={ field }> { capitalizeFirstLetter(tr(field)) } </label>
                    <input id={ field } type={field === "password" ? "password" : "text"} placeholder={defaultValues ? defaultValues[index] : null}
                           className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
            )
        })
        return output;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = {}
        let submit = false
        const nodeList = inputGroupRef.current.childNodes

        for (const node of nodeList) {
            const inputEl = node.lastElementChild

            if (inputEl.value && inputEl.value.toLowerCase() !== inputEl.placeholder) { //new input
                data[inputEl.id] = inputEl.value
                submit = true
            } else { //no input => submit the old input
                data[inputEl.id] = inputEl.placeholder
            }
        }

        if (!submit && carToBeEdited) { // case carToBeEdited != null and input values didnt change (no car to be edited => add car page) => check if selects value changed
            submit = carToBeEdited.brand !== brandState || carToBeEdited.model !== modelState || carToBeEdited.generation !== generationState;
        }

        if (!formIsValid(data, optionalFields) || !submit) {
            console.log("not valid");
            return;
        }
        console.log("valid")

        // handleSubmitFn(data)
    }

    return (
        <div className="flex flex-col min-h-full items-center justify-center">
            <h2 className="mb-5 mt-5 text-2xl"> { tr(formTitle) } </h2>
            <form
                className="shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-fit h-fit flex flex-col justify-center items-center"
                ref={formRef}>
                <BaseSelect
                    optionsProp={BRAND_OPTIONS}
                    labelProp={"brand"}
                    parentState={brandState}
                    setParentState={setBrandState}/>
                <BaseSelect
                    optionsProp={MODELS_BY_BRAND[brandState]}
                    labelProp={"model"}
                    parentState={modelState}
                    setParentState={setModelState}/>
                <BaseSelect
                    optionsProp={GENERATION_BY_MODEL[modelState + brandState]}
                    labelProp={"generation"}
                    parentState={generationState}
                    setParentState={setGenerationState}/>

                <div ref={inputGroupRef}>
                    {generateInputs()}
                </div>


                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}
                > {tr("Submit")} </button>
            </form>
        </div>
    );
}