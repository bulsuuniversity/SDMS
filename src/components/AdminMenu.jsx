"use client"

import Image from "next/image";
import Logo from "../../public/Logo.png"
import Link from "next/link";
import AdminLayout from "./AdminLayout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useConfirmation from "@/utils/ConfirmationHook";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { IoMdMenu } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useProfileData } from "@/app/libs/store";
import { url } from "@/app/libs/api";


const AdminMenu = ({ children }) => {
    const currentPathname = usePathname()
    const [active, setActive] = useState()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const [menuOpen, setMenuOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()
    const { profileData } = useProfileData()

    useEffect(() => {
        setActive(currentPathname)
    }, [currentPathname])


    if (session && session.role !== "admin") {
        return (
            <>
                Unathorized
            </>
        )
    }

    useEffect(() => {
        if (!session) {
            router.push("/Admin/AdminLogin")
        }
    }, [])

    const handleSignOut = (e) => {
        e.preventDefault();
        showConfirmation('Are you sure you want to Log out?', () => {
            router.push("/Admin/AdminLogin")
            signOut({ callbackUrl: `${url}/Admin/AdminLogin` })
        });
    };

    return (
        <AdminLayout>
            <div className="grid grid-cols-12 h-screen">
                <div className="block fixed top-0 bg-gray-800 mb-6 w-screen md:hidden">
                    <button className="text-white pl-3 pt-3" onClick={() => setMenuOpen(!menuOpen)}><IoMdMenu size={32} /></button>
                </div>
                {menuOpen &&
                    <div className="text-white bg-gray-800 col-span-12 grid md:hidden mt-12">
                        <Link onClick={() => setMenuOpen(false)} className={`px-4 pl-8 pt-2 ${active === "/Admin/AdminDashboard" ? "bg-gray-600" : "hover:bg-gray-600"}`}
                            href={'/Admin/AdminDashboard'}>Dashboard</Link>
                        <Link onClick={() => setMenuOpen(false)} className={`px-4 pl-8 pt-2 ${active === "/Admin/AdminStudentRecord" ? "bg-gray-600" : "hover:bg-gray-600"}`}
                            href={'/Admin/AdminStudentRecord'}>Student Records</Link>
                        <Link onClick={() => setMenuOpen(false)} className={`px-4 pl-8 pt-2 ${active === "/Admin/AdminReports" ? "bg-gray-600" : "hover:bg-gray-600"}`}
                            href={'/Admin/AdminReports'}>Reports</Link>
                        {/* <Link onClick={() => setMenuOpen(false)} className={`px-4 pl-8 pt-2 ${active === "/Admin/AdminCounseling" ? "bg-gray-600" : "hover:bg-gray-600"}`}
                            href={'/Admin/AdminCounseling'}>Counselling</Link> */}
                        <Link onClick={() => setMenuOpen(false)} className={`px-4 pl-8 pt-2 ${active === "/Admin/AdminSettings" ? "bg-gray-600" : "hover:bg-gray-600"}`}
                            href={'/Admin/AdminSettings'}>Settings</Link>
                        <Link className="px-4 pl-8 pt-2 hover:bg-gray-600" href={'/Admin/AdminSettings'} onClick={handleSignOut}>Logout</Link >
                    </div>
                }
                <div className="bg-gray-800 md:block hidden col-span-3 pt-4">
                    <div className="flex pl-4 text-lg text-purple-600 items-center gap-5">
                        <Image alt="design" height={50} width={50} src={Logo} /> Admin</div>
                    <ConfirmationDialog />
                    <div className="text-white grid mt-4">
                        <Link className={`mx-2 pl-8 py-2 ${active && active.includes("/Admin/AdminDashboard") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminDashboard'}>Dashboard</Link>
                        <Link className={`mx-2 pl-8 py-2 ${active && active.includes("/Admin/AdminStudentRecord") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminStudentRecord'}>Student Records</Link>
                        <Link className={`mx-2 pl-8 py-2 ${active && active.includes("/Admin/AdminReports") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminReports'}>Reports</Link>
                        {/* <Link className={`mx-2 pl-8 py-2 ${(active && active.includes("/Admin/AdminCounseling")) ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminCounseling'}>Counselling</Link> */}
                        <Link className={`mx-2 pl-8 py-2 ${active && active.includes("/Admin/AdminSettings") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminSettings'}>Settings</Link>
                        <Link className="mx-2 pl-8 py-2 hover:bg-gray-600 hover:rounded-lg" href={'/Admin/AdminSettings'} onClick={handleSignOut}>Logout</Link >
                    </div>

                </div>
                <div className="md:col-span-9 col-span-12 pt-10 bg-gray-200 md:pt-0">
                    {children}
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminMenu;