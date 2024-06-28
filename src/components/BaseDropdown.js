import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import Image from "next/image";
import BaseCard from "@/components/Card/BaseCard";
import {useState} from "react";
import {capitalizeFirstLetter} from "@/common/helperFn";

export default function BaseDropdown({ optionsProp, label, parentState, setParentState }) {
    // const [selectedItemState, setSelectedItemState] = useState(label) // initialized with the first option for example
    // console.log(optionsProp, "======================options=============")
    // console.log(label, "======================label=============")
    // console.log(parentState, "======================paernt=============")
    function generateOptions(options) {
        console.log(options)

        return options.map(item => (
            <DropdownItem key={item} className="p-3">{item.toUpperCase()}
            </DropdownItem>
        ));
    }


    return (
        <div className="mb-4 w-full">
            <label htmlFor={label} className="block text-gray-700 text-sm font-bold mb-1"> { capitalizeFirstLetter(label) } </label>
            <Dropdown id={label}>
                <DropdownTrigger>
                    <Button className="h-[30px] shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        variant="solid"
                    >
                        <div className="">
                            { capitalizeFirstLetter(parentState) }
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="solid"
                    onAction={(key) => {
                        // setSelectedItemState(key)
                        setParentState(key)
                    }}>

                    {/*<DropdownItem key="bmw" className="p-3" startContent={*/}
                    {/*    <Image src="/romania-img.png" alt="Image unavailable" width="20" height="20"/>*/}
                    {/*}>BMW*/}
                    {/*</DropdownItem>*/}

                    {/*<DropdownItem key="volkswagen" className="p-3" startContent={*/}
                    {/*    <Image src="/gbr-img.png" alt="Image unavailable" width="20" height="20"/>*/}
                    {/*}>VOLKSWAGEN*/}
                    {/*</DropdownItem>*/}
                    { generateOptions(optionsProp) }
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}