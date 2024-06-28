import {useRef, useState} from "react";
import {capitalizeFirstLetter} from "@/common/helperFn";
import BRAND_OPTIONS from "../../public/brand-model-options/brands";
import MODELS_BY_BRAND from "../../public/brand-model-options/models-by-brand";

export default function FilterModal( { filtersProp, applyFiltersFn, setFilterModalProp } ) {
    const formRef = useRef()
    const [selectedBrand, setSelectedBrand] = useState(filtersProp.brand)

    function closeModal(evt) {
        if (evt.target.tagName !== "BUTTON" && evt.target.tagName !== "DIALOG") return
        setFilterModalProp(false)
    }

    function renderOptions(options) {
        return options.map(option => (
            <option value={option}>{capitalizeFirstLetter(option)}</option>
        ))
    }

    function updateModels(e) {
        console.log(e.target.value)
        setSelectedBrand(e.target.value)
    }

    return (
        <>
            <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center" onClick={closeModal}>
                <container className="bg-white min-h-64 w-80 flex flex-col justify-between items-center rounded-md">
                    <header className="flex justify-center mt-5 text-2xl w-2/3 border-b border-black">Filter</header>
                    <div className="flex justify-center m-3">
                        <form className="flex flex-col justify-center items-center mt-5" ref={formRef}>
                            {/*<div className="flex flex-col justify-center mb-3 ">*/}
                            {/*    <label htmlFor="brand" className="mb-2">Brand</label>*/}
                            {/*    <input id="brand" type="text" className="border border-gray-400 hover:border-gray-600"*/}
                            {/*           placeholder={(filtersProp.brand !== "") ? filtersProp.brand : "Brand"} defaultValue={(filtersProp.brand !== "") ? filtersProp.brand : ""}/>*/}
                            {/*</div>*/}
                            {/*<div className="flex flex-col justify-center mb-3 ">*/}
                            {/*    <label htmlFor="model" className="mb-2">Model</label>*/}
                            {/*    <input id="model" type="text" className="border border-gray-400 hover:border-gray-600"*/}
                            {/*           placeholder={(filtersProp.model !== "") ? filtersProp.model : "Model"} defaultValue={(filtersProp.model !== "") ? filtersProp.model : ""}/>*/}
                            {/*</div>*/}
                            <div className="flex flex-col justify-center mb-3 w-full">
                                <label htmlFor="brand" className="mb-2">Brand</label>
                                <select id="brand" className="border border-gray-400 hover:border-gray-600" onChange={updateModels}
                                       defaultValue={(filtersProp.brand !== "") ? filtersProp.brand : ""}>
                                    {renderOptions(BRAND_OPTIONS)}
                                </select>
                            </div>
                            <div className="flex flex-col justify-center mb-3 w-full">
                                <label htmlFor="model" className="mb-2">Model</label>
                                <select id="model" className="border border-gray-400 hover:border-gray-600" disabled={!selectedBrand}
                                       defaultValue={(filtersProp.model !== "") ? filtersProp.model : ""}>
                                    {renderOptions(MODELS_BY_BRAND[selectedBrand])}
                                </select>
                            </div>
                            <div className="flex flex-col justify-center mb-3 ">
                                <label htmlFor="minPrice" className="mb-2">Min. price €</label>
                                <input type="number" id="minPrice"
                                       className="border border-gray-400 hover:border-gray-600"
                                       placeholder={(filtersProp.minPrice !== "") ? filtersProp.minPrice : "Min"}
                                       defaultValue={(filtersProp.minPrice !== "") ? filtersProp.minPrice : ""}/>
                            </div>
                            <div className="flex flex-col justify-center mb-3 ">
                                <label htmlFor="maxPrice" className="mb-2">Max. price €</label>
                                <input type="number" id="maxPrice"
                                       className="border border-gray-400 hover:border-gray-600"
                                       placeholder={(filtersProp.maxPrice !== "") ? filtersProp.maxPrice : "Max"}
                                       defaultValue={(filtersProp.maxPrice !== "") ? filtersProp.maxPrice : ""}/>
                            </div>
                        </form>
                    </div>
                    <footer className="flex justify-center w-1/3 mb-3">
                        <button type="button"
                                className="bg-blue-500 hover:bg-blue-700 w-full text-white p-2 rounded-md mr-4"
                                onClick={(e) => {
                                    const filters = {}
                                    for (let inputElIndex = 0; inputElIndex < 4; inputElIndex++) {
                                        let inputEl = formRef.current[inputElIndex];
                                        // if (inputEl.value === "") {
                                        //     filters[inputEl.id] = filtersProp[inputEl.id] // set to prev value
                                        // } else {
                                        //     filters[inputEl.id] = inputEl.value
                                        // }
                                        filters[inputEl.id] = inputEl.value
                                    }
                                    // if (!formIsValid(filters)) return

                                    applyFiltersFn(filters)
                                }}>Apply
                        </button>
                        <button type="button" className="bg-red-500 w-full text-white p-2 rounded-md"
                                onClick={closeModal}>Close
                        </button>
                    </footer>
                </container>
            </dialog>
        </>
    );
}