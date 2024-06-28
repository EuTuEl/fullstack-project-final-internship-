import Default from "@/layouts/Default";
import ImageCarousel from "@/components/ImageCarousel"
import LandingLayout from "@/layouts/LandingLayout";

export default function Home() {
    return (
        <>
            <LandingLayout title={"Home"}>
                <ImageCarousel imagesProp={["/bg1.jpg", "/bg2.jpg", "/bg3.jpg"]} autoPlayProp={true}></ImageCarousel>
            </LandingLayout>
        </>
    );
}