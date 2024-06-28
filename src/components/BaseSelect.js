import {capitalizeFirstLetter} from "@/common/helperFn";
import {useState} from "react";


export default function BaseSelect({ optionsProp, labelProp, parentState, setParentState }) {
    const [defaultValueState, setDefaultValueState] = useState((parentState !== "-") ? parentState : "-")

    function renderOptions(options) {
        options = options ?? ["-"] // bcs of error when changing brand with a selected model for prev brand. that resulted in model not updating to "-"
        //therefore the script tried to load generation for the previous model with the new brand
        // const defaultSelected = (parentState !== "-") ? parentState : "-"
        return options.map(option => (
            <option value={option} selected={defaultValueState === option.toLowerCase()} key={option}>{capitalizeFirstLetter(option)}</option>
        ));

    }

    return (
        <div className="mb-4 w-full">
            <label htmlFor={labelProp} className="block text-gray-700 text-sm font-bold mb-1"> { capitalizeFirstLetter(labelProp) } </label>
            <select id={labelProp}
                className={"shadow appearance-none bg-white border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + `default-value-${defaultValueState}`}
                onChange={(event) => {
                    setParentState(event.target.value)
                }}
            >
                { renderOptions(optionsProp) }
            </select>
        </div>
    );
}