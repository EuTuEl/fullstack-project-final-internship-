import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import Image from 'next/image'
import {capitalizeFirstLetter, tr} from "@/common/helperFn";
import {useContext} from "react";
import {GlobalContext} from "@/context/GlobalContext";

export default function BaseCard( { postData, children } ) {
    return (
        <Card className="w-64 h-72 hover:scale-110 hover:h-80">
            <CardHeader className="pb-0 pt-1 px-1 flex-col items-end h-3/5">
                <p className="font-bold text-xl mr-8">{postData.price}€</p>
                <div className="relative h-full w-full">
                <Image
                    alt="Image unavailable"
                    className="object-cover rounded-xl"
                    src="/car-images/default.png"
                    // width={200}
                    // height={200}
                    fill={true}
                />
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
            <h3 className="font-bold text-large border-solid border-b-1.5 border-black rounded-md text-nowrap">
                    {postData.brand.toUpperCase()} {capitalizeFirstLetter(postData.model)}
                </h3>
                <p className="pt-3">{postData.year} * {postData.power}hp
                    * {postData.engine}<sup>3</sup> * {capitalizeFirstLetter(tr(postData.fuel))}</p>
            </CardBody>
            <CardFooter className="flex justify-center align-middle">
                {children}
            </CardFooter>
        </Card>
    )
}