import axios from "axios";
import Cookies from "js-cookie";
import TRANS_RO from "../../public/translations/ro";
import {GlobalContext} from "@/context/GlobalContext";
import {useContext} from "react";


export function formIsValid(fields, optionalFields = []) {
    for (const key in fields) {
        if ((fields[key] === null || fields[key] === "" || fields[key] === "-") && !optionalFields.includes(key)) {
            return false;
        }
    }
    return true
}

export function convertToFormData(data) {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key])
    }

    return formData;
}

export function sendInternalReq(method, url, data = null, cookies = null) {
    let config = {
        method: method,
        url: "http://localhost:3000/api/handler",
        data: {"data": data, "url": url},
        withCredentials: true,
        headers: {
            Cookie: cookies
        }
    };
    return axios(config);
}

export  function logOut() {
    Cookies.remove("username");
    Cookies.remove("access_jwt");
    Cookies.remove("refresh_jwt");
    localStorage.setItem("isLogged", "false")
}

export function capitalizeFirstLetter (string) {
    // console.log(string, "------------------------------------------------------")
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function tr(toBeTranslated) {
    const context = useContext(GlobalContext)
    const globalState = context.globalState
    const lang = globalState.selectedLanguage
    const isClient = globalState.isClient

    if (!isClient) return toBeTranslated //rendered on server => hydration problem

    switch (lang) {
        case "en":
            return toBeTranslated
        case "ro":
            return TRANS_RO[toBeTranslated.toUpperCase()] ?? toBeTranslated
    }
}
// async function handleTranslate(toBeTranslated, language) {
//     return await import("../../public/translations/" + language)
//         .then(module => {
//             return module.default[toBeTranslated]
//         })
// }

// const res = await fetch('/api/handler', {
//     method: 'POST',
//     headers: {
//         // "Content-Type": "multipart/form-data",
//         "Content-Type": "application/json",
//         "Accept": "*/*"
//     },
//     body: JSON.stringify(fields),
//     credentials: 'include', // Ensure cookies are sent with the request
// });
// console.log(res)
// const data = await res.json();
// // //
// console.log(data);
// await router.replace("/")