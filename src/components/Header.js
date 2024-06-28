import Cookies from "js-cookie"
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "@/context/GlobalContext";
import {logOut, tr} from "@/common/helperFn";
import Image from "next/image";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import Link from "next/link";

export default function Header( { activeTab }) {
    const context = useContext(GlobalContext)
    const [isLogged, setIsLogged] = useState("false")
    const router = useRouter();

    useEffect(() => {
        setIsLogged(typeof window !== "undefined" ? localStorage.getItem("isLogged") : "false")
    })

    return (
        <header className="h-16">
            <ul role="tablist"
                className="h-full flex flex-nowrap justify-center text-sm font-medium text-center text-white bg-blue-950 dark:border-gray-700 dark:text-gray-400">
                <li role="tab" aria-selected="" className="me-2 flex align-middle">
                    <Link href="/" id="home"
                       className={activeTab === "Home" ? "p-4 flex items-center rounded-t-lg bg-gray-200 text-black text-lg" :
                           "p-4 flex items-center rounded-t-lg hover:bg-gray-200 hover:text-black text-base"}
                    >
                        { tr("Home") }
                    </Link>
                </li>
                <li role="tab" aria-selected="" className="me-2 flex align-middle">
                    <Link href="/browse" id="browse"
                       className={activeTab === "Browse" ? "p-4 flex items-center rounded-t-lg bg-gray-200 text-black text-lg" :
                           "p-4 flex items-center rounded-t-lg hover:bg-gray-200 hover:text-black text-base"}
                    >
                        { tr("Browse") }
                    </Link>
                </li>
                <li role="tab" aria-selected="false" className="me-2 flex align-middle">
                    <Link href="/add-car" id="add-car"
                       className={activeTab === "Add car" ? "p-4 flex items-center rounded-t-lg bg-gray-200 text-black text-lg" :
                           "p-4 flex items-center rounded-t-lg hover:bg-gray-200 hover:text-black text-base"}
                    >
                        { tr("Add car") }
                    </Link>
                </li>
                {isLogged === "true"
                    ? (
                        <>
                            <li role="tab" aria-selected="false" className="me-2 flex align-middle">
                                <Link href={"/user-posts/" + Cookies.get("username")} id="user-posts"
                                   className={activeTab === "My posts" ? "p-4 flex items-center rounded-t-lg bg-gray-200 text-black text-lg" :
                                       "p-4 flex items-center rounded-t-lg hover:bg-gray-200 hover:text-black text-base"}
                                >
                                    { tr("My posts") }
                                </Link>
                            </li>
                            <li role="tab" aria-selected="false" className="me-2 flex align-middle">
                                <button
                                    className="p-4 flex items-center rounded-t-lg hover:bg-gray-200 hover:text-black text-base"
                                    onClick={() => {
                                        logOut()
                                        context.setIntervalRunning(false)
                                        router.replace("/");
                                    }}
                                >
                                    { tr("Log out") }
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li role="tab" aria-selected="false" className="me-2 flex align-middle">
                                <Link href="/log-in" id="log-in"
                                   className={activeTab === "Log in" ? "p-4 flex items-center rounded-t-lg bg-gray-200 text-black text-lg" :
                                       "p-4 flex items-center rounded-t-lg hover:bg-gray-200 hover:text-black text-base"}
                                >
                                    { tr("Log in") }
                                </Link>
                            </li>
                            <li role="tab" aria-selected="false" className="me-2 flex align-middle">
                                <Link href="/sign-in" id="sign-in"
                                   className={activeTab === "Sign in" ? "p-4 flex items-center rounded-t-lg bg-gray-200 text-black text-lg" :
                                       "p-4 flex items-center rounded-t-lg hover:bg-gray-200 hover:text-black text-base"}
                                >
                                    { tr("Sign in") }
                                </Link>
                            </li>
                        </>
                    )
                }
                <li role="tab" aria-selected="false" className="me-2 flex flex-col justify-center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="solid"
                            >
                                <div className="h-2/3 flex items-center">
                                    <Image src="/settings-icon3.png"
                                           alt="Image unavailable"
                                           width="25"
                                           height="25"
                                    />
                                </div>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            variant="solid"
                            onAction={(key) => {
                                context.setSelectedLanguage(key)
                            }}>

                            <DropdownItem key="ro" className="p-3" startContent={
                                <Image src="/romania-img.png" alt="Image unavailable" width="20" height="20"/>
                            }>Romanian
                            </DropdownItem>

                            <DropdownItem key="en" className="p-3" startContent={
                                <Image src="/gbr-img.png" alt="Image unavailable" width="20" height="20"/>
                            }>English
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>
            </ul>
        </header>
    );
}