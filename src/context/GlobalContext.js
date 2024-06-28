import React, {createContext, useEffect, useState} from "react";
import {logOut, sendInternalReq} from "@/common/helperFn";
import Cookies from "js-cookie";

const GlobalContext  = createContext()

function GlobalProvider({children}) {
    const [globalState, setGlobalState] = useState({
        intervalValue: 0,
        intervalRunning: false,
        alertModal: {
            alertModalVisible: false,
            modalTitle: "",
            modalContent: "",
            afterCloseRedirect: null
        },
        isClient: false,
        selectedLanguage: (typeof window !== "undefined" && localStorage.getItem("lang")) ? localStorage.getItem("lang") : "en"
    })

    useEffect(() => {
        setGlobalState(prevState => ({
            ...prevState,
            isClient: true
        }))
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage.getItem("isLogged") === "true") {
            const interval = setInterval(() => {
                console.log('Interval running');
                // sendInternalReq("POST", "http://localhost/test-api/api/index.php/checkLogin", null, Cookies.get())
                //     .then(res => {
                //         console.log(res)
                //         console.log("check login success")
                //     })
                //     .catch(err => {
                //         console.log(err)
                //         console.log("check login fail")
                //         sendInternalReq("POST", "http://localhost/test-api/api/index.php/refreshTokenPair", {refreshOnlyAccess: true}, Cookies.get())
                //             .then(res => {
                //                 console.log(res)
                //                 console.log("refresh pair success")
                //                 sendInternalReq("POST", "http://localhost/test-api/api/index.php/checkLogin", null, Cookies.get())
                //                     .then(res => {
                //                         console.log(res)
                //                         console.log("2nd check login success")
                //                     })
                //             })
                //             .catch(err => {
                //                 console.log(err)
                //                 console.log("refresh pair fail")
                //                 logOut();
                //                 setIntervalRunning(false);
                //             })
                //     })
                sendInternalReq("POST", "http://localhost/test-api/api/index.php/checkLogin", null, Cookies.get())
                    .then(res => {
                        console.log(res)
                        console.log("check login success")
                    })
                    .catch(err => {
                        console.log(err)
                        console.log("check login fail")
                        logOut();
                        setIntervalRunning(false);
                        setAlertModal(true, "Session expired!", "Login required!", "/log-in")
                    })
            }, 1000 * 60 * 5);

            setGlobalState(prevState => ({
                ...prevState,

            }));

            return () => clearInterval(interval); // Clean up on unmount
        }
    }, [globalState.intervalRunning]);

    const setIntervalRunning = val => {
        setGlobalState(prevState => ({
            ...prevState,
            intervalRunning: val
        }))
    }

    const setAlertModal = (visible, title = "", content = "", href = null) => {
        setGlobalState(prevState => ({
            ...prevState,
            alertModal: {
                alertModalVisible: visible,
                modalTitle: title,
                modalContent: content,
                afterCloseRedirect: href
            }
        }))
    }

    const setSelectedLanguage = (lang) => {
        setGlobalState(prevState => ({
            ...prevState,
            selectedLanguage: lang
        }))
        if (typeof window !== "undefined") {
            localStorage.setItem("lang", lang)
        }
    }

    return (
        <GlobalContext.Provider value={{ globalState, setGlobalState, setIntervalRunning, setAlertModal, setSelectedLanguage}}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };