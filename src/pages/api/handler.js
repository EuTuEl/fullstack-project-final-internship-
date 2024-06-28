import {convertToFormData} from "@/common/helperFn";
import axios from "axios";

export default async function handler(internalReq, internalRes) {
    const method = internalReq.method;
    const url = internalReq.body.url;
    const data = internalReq.body.data;
    const cookies = internalReq.headers.cookie

    let config = {
        method: method,
        url: url,
        data: data,
        withCredentials: true,
        headers: {
            Cookie: cookies,
            ContentType: "application/json"
        }
    };
    console.log(data)
    internalRes.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    axios(config)
        .then(function (response) {
            let receivedCookies = response.headers["set-cookie"]
            internalRes.setHeader("Set-Cookie", receivedCookies)
            internalRes.status(response.status).json(response.data)
        })
        .catch(function (error) {
            internalRes.status(error.response.status).json(error.response.data)
        });
}