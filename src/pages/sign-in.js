import Default from "@/layouts/Default";
import BaseForm from "@/components/BaseForm";
import {sendInternalReq} from "@/common/helperFn";
import AlertModal from "@/components/AlertModal";
import {GlobalContext} from "@/context/GlobalContext";
import {useContext} from "react";

export default function SignIn() {
    const context = useContext(GlobalContext)
    function handleSubmit (fields) {
        fields["isadmin"] = 0;

        sendInternalReq("POST", "http://localhost/test-api/api/index.php/register", fields)
            .then(res => {
                context.setAlertModal(true, "Success", "Registered Successfully", "/log-in")
            })
            .catch(err => {
                context.setAlertModal(true, "Error", err.response.data.error)
            })
    }

    return (
        <>
            <Default title={"Sign in"}>
                <BaseForm
                    fields={["firstname", "lastname", "email", "username", "password"]}
                    formTitle={"Sign in"}
                    handleSubmitFn={handleSubmit}
                />
            </Default>
        </>
    );
}