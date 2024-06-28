import Default from "@/layouts/Default";
import BaseForm from "@/components/BaseForm";
import {sendInternalReq} from "@/common/helperFn";
import {useContext} from "react";
import {GlobalContext} from "@/context/GlobalContext";
import Cookies from "js-cookie";

export default function LogIn() {
    const context = useContext(GlobalContext)

    function handleSubmit(fields) {
        sendInternalReq("POST", "http://localhost/test-api/api/index.php/login", fields)
            .then(res => {
                context.setIntervalRunning(true);
                context.setAlertModal(true, "Success", "Logged successfully!", "/user-posts/" + Cookies.get("username"))
                localStorage.setItem("isLogged", "true")
            })
            .catch(err => {
                context.setAlertModal(true, "Error", err.response.data.error)
            })
    }
    return (
        <>
            <Default title={"Log in"}>
                <BaseForm
                    fields={["username", "password"]}
                    formTitle={"Log in"}
                    handleSubmitFn={handleSubmit}
                />
            </Default>
        </>
    );
}