import Link from "next/link";
import { useEffect, useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { usePathname } from "next/navigation";
import AdminMenu from "@/components/AdminMenu";

const Layout = ({ children }) => {
    const currentActive = usePathname()
    const [active, setActive] = useState()

    useEffect(() => {
        setActive(currentActive)
    }, [currentActive])

    return (
        <AdminMenu>
            <div className="grid">
                <div className="m-7 flex items-center">
                    <GrUserSettings size={70} /> <p className="border border-2 border-black h-16 mx-4" />
                    <p className="font-bold text-xl">Settings</p>
                </div>
                <div className="flex justify-center">
                    <div className="rounded-full md:bg-gray-400 grid gap-2 md:gap-0 sm:flex">
                        <Link href={"/Admin/AdminSettings/AdminAccount"}
                            className={`sm:pl-4 px-1 sm:pr-2 py-2 hover:text-white hover:rounded-full hover:bg-amber-600 ${active === "/Admin/AdminSettings/AdminAccount" ?
                                "bg-amber-600 rounded-full text-white" : "bg-gray-400 rounded-full"}`}>
                            ACCOUNT</Link>
                        <Link href={"/Admin/AdminSettings/AdminUI"}
                            className={`sm:pl-2 px-2 sm:pr-4 py-2 hover:text-white hover:rounded-full hover:bg-amber-600 ${active === "/Admin/AdminSettings/AdminUI" ?
                                "bg-amber-600 rounded-full text-white" : "bg-gray-400 rounded-full"}`}>
                            USER PAGE</Link>
                    </div>
                </div>

            </div>
            {children}
        </AdminMenu>
    );
}

export default Layout;