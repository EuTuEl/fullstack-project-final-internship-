import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import Image from 'next/image'
import {capitalizeFirstLetter} from "@/common/helperFn";

export default function HorizontalBaseCard( { postData, children } ) {

    return (
        <div className="p-4 border border-gray-700 border-opacity-55 rounded-lg">
            <div className="flex flex-row">
                <div>
                    <img alt="Image unavailable" src="/car-images/default.png"/>
                </div>
                <div>
                    asdasd
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}