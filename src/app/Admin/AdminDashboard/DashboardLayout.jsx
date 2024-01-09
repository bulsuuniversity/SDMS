"use client"

import { IoIosPeople } from "react-icons/io";
import { PiNotePencilFill } from "react-icons/pi";
import Link from "next/link";
import { useState, useEffect } from "react";
import AdminMenu from "../../../components/AdminMenu";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const DashboardLayout = ({ children }) => {
    const [dashboard, setDashboard] = useState('')

    useEffect(() => {
        const currentPath = window.location.pathname;

        if (currentPath === "/Admin/AdminDashboard/StudentRecords") {
            setDashboard('StudentRecords');
        } else if (currentPath === "/Admin/AdminDashboard/Counselling") {
            setDashboard('Counselling');
        } else if (currentPath === "/Admin/AdminDashboard/Reports") {
            setDashboard('Reports');
        }
    }, []);

    return (
        <AdminMenu>
            <div className="w-full h-full">
                <div className={`flex gap-4 items-center`}>
                    <div className="m-7 flex items-center">
                        <MdOutlineDashboardCustomize size={70} /> <p className="border border-2 border-black h-16 mx-4" />
                        <p className="font-bold text-xl">Dashboard</p>
                    </div>
                    <div className={`flex bg-gray-400 text-xs rounded-lg `}>
                        <Link href={'/Admin/AdminDashboard/StudentRecords'}
                            className={`hover:bg-amber-400 w-28 text-center
                          
                             ${dashboard === 'StudentRecords' && 'bg-amber-300'} 
                             rounded-lg grid justify-center py-1 px-2 items-center`}>
                            <div className="flex text-2xl justify-center"><IoIosPeople size={32} /></div>
                            Student Records
                        </Link>
                        <Link href={'/Admin/AdminDashboard/Reports'}
                            className={`hover:bg-amber-400 w-28 text-center
                           
                            ${dashboard === 'Reports' && 'bg-amber-300'}
                             rounded-lg grid justify-center py-1 px-2 items-center`}>
                            <div className="flex justify-center"><PiNotePencilFill size={32} /></div>
                            Reports
                        </Link>
                    </div>
                </div>

                <div className="grid justify-center mt-4 items-center">
                    {children}
                </div>
            </div>
        </AdminMenu>
    );
}

export default DashboardLayout;