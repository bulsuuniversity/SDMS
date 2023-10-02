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
import { IoNotificationsCircleSharp } from "react-icons/io5";
import axios from "axios";
import { url, headers } from "@/app/libs/api";

const AdminMenu = ({ children }) => {
    const currentPathname = usePathname()
    const [active, setActive] = useState()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const [menuOpen, setMenuOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()
    const [newReport, setNewReport] = useState()
    const [newStudent, setNewStudent] = useState()
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

    const getNotifReport = async () => {
        try {
            const reponse = await axios.get(`${url}/api/AdminNotification/6518de8c2bd81071174f2644`, { headers });
            setNewReport(reponse.data[0].notif)
            console.log(reponse.data[0].notif)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const getNotifStudent = async () => {
        try {
            const reponse = await axios.get(`${url}/api/AdminNotification/651900d14826f8919bf936de`, { headers });
            setNewStudent(reponse.data[0].notif)
            console.log(reponse.data[0].notif)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateNotif = async (id) => {
        try {
            await axios.put(`${url}/api/AdminNotification/${id}`,
                { notif: false }, { headers });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
          getNotifStudent();
          getNotifReport();
        }, 3000);
        return () => clearInterval(intervalId);
      }, []);

    const handleGetNotif = () => {
        getNotifStudent();
        getNotifReport();
    }

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
                    <div className="flex pl-4 text-lg text-amber-400 items-center gap-5">
                        <Image alt="design" height={50} width={50} src={Logo} /> Admin</div>
                    {/* <button onClick={handleGetNotif} className="flex pl-4 text-lg text-amber-400 items-center gap-5">GetNotif</button> */}
                    <ConfirmationDialog />
                    <div className="text-white grid mt-4">
                        <Link className={`mx-2 px-8 py-2 ${active && active.includes("/Admin/AdminDashboard") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminDashboard'}>Dashboard</Link>
                        <Link onClick={() => handleUpdateNotif("651900d14826f8919bf936de")}
                            className={`mx-2 flex justify-between px-8 py-2 ${active && active.includes("/Admin/AdminStudentRecord") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminStudentRecord'}>Student Records {newStudent && <IoNotificationsCircleSharp size={20} />}</Link>
                        <Link onClick={() => handleUpdateNotif("6518de8c2bd81071174f2644")}
                            className={`mx-2 flex justify-between px-8 py-2 ${active && active.includes("/Admin/AdminReports") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminReports'}>Reports {newReport && <IoNotificationsCircleSharp size={20} />}</Link>
                        {/* <Link className={`mx-2 px-8 py-2 ${(active && active.includes("/Admin/AdminCounseling")) ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminCounseling'}>Counselling</Link> */}
                        <Link className={`mx-2 px-8 py-2 ${active && active.includes("/Admin/AdminSettings") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminSettings'}>Settings</Link>
                        <Link className="mx-2 px-8 py-2 hover:bg-gray-600 hover:rounded-lg" href={'/Admin/AdminSettings'} onClick={handleSignOut}>Logout</Link >
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