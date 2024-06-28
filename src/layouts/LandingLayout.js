import Header from "@/components/Header";
import Head from "next/head";
import AlertModal from "@/components/AlertModal";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/context/GlobalContext";
import {tr} from "@/common/helperFn";
import LandingHeader from "@/components/LandingHeader";

export default function LandingLayout( { title, children } ) {
    const context = useContext(GlobalContext)
    const globalState = context.globalState

    useEffect(() => { // html lang attribute
        document.documentElement.lang = globalState.selectedLanguage;
    }, [globalState.selectedLanguage])

    return (
        <div className="h-full flex flex-col">
            <Head>
                <title>{tr(title)}</title>
            </Head>
            {globalState.alertModal.alertModalVisible && <AlertModal/>}
            <div className="absolute w-screen h-screen">
                {children}
            </div>
            <div className="w-screen relative" style={{}}>
                <LandingHeader activeTab={title}/>
            </div>
            {/*<main className="h-full">*/}
            {/*    <LandingHeader activeTab={title}/>*/}
            {/*    { children }*/}
            {/*</main>*/}
        </div>
    );
}