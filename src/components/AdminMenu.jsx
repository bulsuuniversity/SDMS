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
import { FcDataProtection } from "react-icons/fc";
import { MdLogout, MdOutlineDashboardCustomize, MdSettingsSuggest, MdAdminPanelSettings } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { GrUserSettings } from "react-icons/gr";
import { FaPeopleLine } from "react-icons/fa6";

const AdminMenu = ({ children }) => {
    const currentPathname = usePathname()
    const [active, setActive] = useState()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const [menuOpen, setMenuOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()
    const [newReport, setNewReport] = useState()
    const [newStudent, setNewStudent] = useState()
    const [newAdmin, setNewAdmin] = useState()
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

    const handleUpdateStatus = async (id) => {
        try {
            const response = await axios.put(`${url}/api/AdminApproveAccount/${info.id}`,
                { status: "Registered Inactive" }, { headers });
        } catch (err) {
            console.log(err);
        }
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcDataProtection size={32} />Logout Account</div>
            <p className='text-xl p-6'>Are you sure you want to logout this account?</p>
        </div>, () => {
            router.push("/Admin/AdminLogin")
            handleUpdateStatus()
            signOut({ callbackUrl: `${url}/Admin/AdminLogin` })
        });
    };

    const getNotifReport = async () => {
        try {
            const reponse = await axios.get(`${url}/api/AdminNotification/6518de8c2bd81071174f2644`, { headers });
            setNewReport(reponse.data[0].notif)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const getNotifStudent = async () => {
        try {
            const reponse = await axios.get(`${url}/api/AdminNotification/651900d14826f8919bf936de`, { headers });
            setNewStudent(reponse.data[0].notif)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const getNotifAdmin = async () => {
        try {
            const reponse = await axios.get(`${url}/api/AdminNotification/654220a68db45807d25ac36a`, { headers });
            setNewAdmin(reponse.data[0].notif)
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
            getNotifAdmin();
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const handleGetNotif = () => {
        getNotifStudent();
        getNotifReport();
    }

    useEffect(() => {
        newAdmin.length > 0 && phoneNumbers && handleSendSMS()
    }, [newAdmin])



    const [adminaccounts, setAdminaccounts] = useState()

    const handleGetData = async () => {
        try {
            const response = await axios.get(`${url}/api/studentAccount`, { headers });
            setAdminaccounts(response.data)

        } catch (err) {
            console.log(err);

        }
    }

    const phoneNumbers = adminaccounts && adminaccounts
        .filter(account => account.status.includes("Active"))
        .map(activeAccount => activeAccount.phoneNumber);

    console.log(phoneNumbers)

    useEffect(() => {
        handleGetData()
    }, [])

    const handleSendSMS = async (id) => {
        try {
            const response = await axios.post(`${url}/api/sendSms`,
                { phoneNumbers: phoneNumbers, message: "Hello po" }, { headers });
            console.log(response)
        } catch (error) {
            console.error('Error:', error);
        }
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
                            href={'/Admin/AdminStudentRecord'}>Student Accounts</Link>
                        {session && session.idNumber === "master" && <Link onClick={() => setMenuOpen(false)} className={`px-4 pl-8 pt-2 ${active === "/Admin/AdminStudentRecord" ? "bg-gray-600" : "hover:bg-gray-600"}`}
                            href={'/Admin/AdminApproveAdmin'}>Admin Accounts</Link>}
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
                        <Link className={`mx-2 flex items-center px-8 py-2 ${active && active.includes("/Admin/AdminDashboard") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminDashboard'}>
                            <div className="pr-3"><MdOutlineDashboardCustomize size={24} /></div> Dashboard</Link>
                        {session && session.idNumber === "master" && <Link onClick={() => handleUpdateNotif("654220a68db45807d25ac36a")}
                            className={`mx-2 flex items-center md:whitespace-nowrap px-8 py-2 ${active && active.includes("/Admin/AdminApproveAdmin") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminApproveAdmin'}>
                            <div className="pr-3"><MdAdminPanelSettings size={24} /></div>Admin Accounts
                            {newAdmin && <div className="w-full flex justify-end"><IoNotificationsCircleSharp size={20} /></div>}</Link>}
                        <Link onClick={() => handleUpdateNotif("651900d14826f8919bf936de")}
                            className={`mx-2 flex items-center md:whitespace-nowrap px-8 py-2 ${active && active.includes("/Admin/AdminStudentRecord") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminStudentRecord'}>
                            <div className="pr-3"><FaPeopleLine size={24} /></div>Student Accounts
                            {newStudent && <div className="w-full flex justify-end"><IoNotificationsCircleSharp size={20} /></div>}</Link>
                        <Link onClick={() => handleUpdateNotif("6518de8c2bd81071174f2644")}
                            className={`mx-2 flex items-center px-8 py-2 ${active && active.includes("/Admin/AdminReports") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminReports/?new=newReport'}>
                            <div className="pr-3"><ImNewspaper size={24} /></div>Reports
                            {newReport &&
                                <div className="w-full flex justify-end"><IoNotificationsCircleSharp size={20} /></div>}</Link>
                        {/* <Link className={`mx-2 flex items-center px-8 py-2 ${(active && active.includes("/Admin/AdminCounseling")) ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminCounseling'}>Counselling</Link> */}
                        <Link className={`mx-2 flex items-center px-8 py-2 ${active && active.includes("/Admin/AdminSettings") ? "bg-gray-600 rounded-lg" : "hover:rounded-lg hover:bg-gray-600"}`}
                            href={'/Admin/AdminSettings'}>
                            <div className="pr-3"><MdSettingsSuggest size={24} /></div>Settings</Link>
                        <button onClick={handleSendSMS} className={`mx-2 flex items-center px-8 py-2 `}
                        >
                            <div className="pr-3"><MdSettingsSuggest size={24} /></div>Send SMS</button>
                        <Link className="mx-2 flex items-center px-8 py-2 hover:bg-gray-600 hover:rounded-lg"
                            href={'/Admin/AdminSettings'} onClick={handleSignOut}><div className="pr-3">
                                <MdLogout size={24} /></div>Logout</Link >
                    </div>

                </div>
                <div className="md:col-span-9 col-span-12 pt-10 bg-gray-200 md:pt-0">
                    <div className="fixed top-2 grid right-2">
                        {newStudent && <div className="flex justify-end">
                            <Link onClick={() => handleUpdateNotif("651900d14826f8919bf936de")}
                                className={`mx-2 flex gap-2 items-center`}
                                href={'/Admin/AdminStudentRecord'}>New Student <IoNotificationsCircleSharp size={35} /></Link>
                        </div>}
                        {newReport && <div className="flex justify-end">
                            <Link onClick={() => handleUpdateNotif("6518de8c2bd81071174f2644")}
                                className={`mx-2 flex gap-2 items-center`}
                                href={'/Admin/AdminReports/?new=newReport'}>New Report <IoNotificationsCircleSharp size={35} /></Link>
                        </div>}
                    </div>
                    {children}
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminMenu;