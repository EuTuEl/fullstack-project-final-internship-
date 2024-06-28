import Header from "@/components/Header";
import Head from "next/head";
// import AlertModal from "@/components/AlertModal";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/context/GlobalContext";
import {tr} from "@/common/helperFn";
import dynamic from "next/dynamic";

const AlertModal = dynamic(() => import("@/components/AlertModal"), { ssr: false })


export default function Default( { title, children } ) {
    const context = useContext(GlobalContext)
    const globalState = context.globalState

    useEffect(() => { // html lang attribute
        document.documentElement.lang = globalState.selectedLanguage;
    }, [globalState.selectedLanguage])

    return (
        <div className="h-full flex flex-col">
            <Head>
                <title>{ tr(title) }</title>
            </Head>
            <Header activeTab={title}/>
            {globalState.alertModal.alertModalVisible && <AlertModal/>}
            <main className="h-full"> { children } </main>
        </div>
    );
}