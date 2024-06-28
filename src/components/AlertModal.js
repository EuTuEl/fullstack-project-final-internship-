import {useContext} from "react";
import {GlobalContext} from "@/context/GlobalContext";
import {useRouter} from "next/router";
import {tr} from "@/common/helperFn";

export default function AlertModal() {
    const context = useContext(GlobalContext)
    const globalState = context.globalState
    const router = useRouter()

    const title = globalState.alertModal.modalTitle
    const message = globalState.alertModal.modalContent
    const href = globalState.alertModal.afterCloseRedirect

    function closeModal(evt) {
        if (evt.target.tagName !== "BUTTON" && evt.target.tagName !== "DIALOG") return
        console.log(context)
        context.setAlertModal(false)
        if (href) router.replace(href)
    }

    return (
        <>
            <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center" onClick={closeModal}>
                <div className="bg-white h-fit min-h-64 w-64 flex flex-col justify-between items-center rounded-md">
                    <header className="flex justify-center mt-5 text-2xl w-2/3 border-b border-black text-nowrap">{ tr(title) }</header>
                    <div className="flex justify-center m-3">{ tr(message) }</div>
                    <footer className="flex justify-center w-1/3 mb-3">
                        <button type="button" className="bg-red-500 w-full text-white p-2 rounded-md" onClick={closeModal}>{ tr("Close") }
                        </button>
                    </footer>
                </div>
            </dialog>
        </>
    );
}

// export function setModalParams(setAlertModalVisibleVal, setModalTitleVal, setModalContentVal, setAfterCloseRedirectVal = null) {
//     const context = useContext(GlobalContext)
//     const modalSetters = context.modalSetters
//
//     modalSetters.setAlertModalVisible(setAlertModalVisibleVal)
//     modalSetters.setModalTitle(setModalTitleVal)
//     modalSetters.setModalContent(setModalContentVal)
//     modalSetters.setAfterCloseRedirect(setAfterCloseRedirectVal)
// }