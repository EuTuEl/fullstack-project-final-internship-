import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import BaseCard from "@/components/Card/BaseCard";
export default function ImageCarousel( { imagesProp, autoPlayProp } ) {
    function renderImages(images) {
        return images.map((imageURL, index) => (
            <div className="img-container" key={index}>
                <img src={imageURL} alt="Image 1" className="object-fill h-screen w-screen"/>
            </div>
        ));
    }

    return (
        // <div className="absolute">
            <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={autoPlayProp} interval={5000} className="h-full">
                { renderImages(imagesProp) }
            </Carousel>
        // </div>
        // <img src="/car-images/bg1.jpg" alt="Image 3" className="h-1/2"/>
    );
}