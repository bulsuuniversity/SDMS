"use client"

import AdminMenu from "@/components/AdminMenu";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

const route = () => {

    return (
        <>
            <AdminMenu />
            <div className="z-50 fixed bottom-12 right-10">
            <Link href={"/Admin"} className="px-4 py-2 flex gap-4 bg-slate-600 text-white">View Student GUI <FaArrowAltCircleRight size={24} /></Link>
            </div>
        </>


    );
}

export default route;