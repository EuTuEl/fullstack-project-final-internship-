import {useContext, useRef, useState} from "react";
import {input} from "@nextui-org/theme";
import {formIsValid, tr} from "@/common/helperFn";
import {capitalizeFirstLetter} from "@/common/helperFn"
import {GlobalContext} from "@/context/GlobalContext";

export default function BaseForm({ fields, defaultValues = null, optionalFields, formTitle, handleSubmitFn, children, additionalInputs = null }) {
    let formRef = useRef();
    function generateForm() {
        const output = [];
        // for (const field of fields) {
        //     output.push(
        //         <div className="mb-4" key={field + ":" + formTitle}>
        //             <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={ field }> { capitalizeFirstLetter(field) } </label>
        //             <input id={ field } type={field === "password" ? "password" : "text"}
        //                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        //         </div>
        //     )
        // }
        fields.forEach((field, index) => {
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


    return (
        <div className="flex flex-col min-h-full items-center justify-center">
            <h2 className="mb-5 mt-5 text-2xl"> { tr(formTitle) } </h2>
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-fit h-fit flex flex-col justify-center items-center" ref={formRef}>

                { children }

                { generateForm() }
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={ (e) => {
                            e.preventDefault();
                            const data = {}
                            const nrOfInputs = (additionalInputs) ? fields.length + additionalInputs : fields.length
                            let submit = false

                            for (let inputElIndex = 0; inputElIndex < nrOfInputs; inputElIndex++) {
                                let inputEl = formRef.current[inputElIndex];
                                if (inputEl.value && inputEl.value.toLowerCase() !== inputEl.placeholder) { //new input
                                    data[inputEl.id] = inputEl.value
                                    submit = true
                                }
                                else { //no input => submit the old input
                                    data[inputEl.id] = inputEl.placeholder
                                }
                            }
                            if (!formIsValid(data, optionalFields) || !submit) {
                                console.log("not valid");
                                return;
                            }
                            handleSubmitFn(data)
                        }}
                > { tr("Submit") } </button>
            </form>
        </div>
    );
}