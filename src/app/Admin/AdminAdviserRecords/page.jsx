"use client"

import AdviserRecordDatagridview from "./AdviserRecordDatagridview";
import { useEffect, useState } from "react";
import { url, headers } from "@/app/libs/api";
import axios from "axios";
import AdminMenu from "@/components/AdminMenu";
import { FaPeopleLine } from "react-icons/fa6";
import useLoading from "@/utils/Loading";
import { GoSearch } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import { GiTeacher } from "react-icons/gi";


const Page = () => {
    const [clickedID, setClickedID] = useState()
    const [filterData, setFilterData] = useState()
    const { startLoading, loading, stopLoading } = useLoading()
    const [search, setSearch] = useState()

    const handleGetData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/studentAccount`, { headers });
            setFilterData(response.data)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }
  
    const data = filterData && Object.values(filterData)
        .filter((adviser, index, self) =>
            adviser.adviserEmail &&
            (search ? adviser.adviserName && (adviser.adviserName.toLowerCase()).includes(search.toLowerCase()) : true) &&
            index === self.findIndex((a) => a.adviserEmail === adviser.adviserEmail)
        );



    useEffect(() => {
        handleGetData()
    }, [])

    const searchParams = useSearchParams()
    const newAdviser = searchParams.get('new')
    const router = useRouter()

    useEffect(() => {
        if ("newAdviser" === newAdviser) {
            handleGetData()
            router.push("/Admin/AdminAdviserRecords")
        }
    }, [newAdviser])

    return (
        <AdminMenu>
            <div className="m-7 flex items-center">
                <GiTeacher size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                <p className="font-bold text-xl">Advisers</p>
            </div>
            <div className="flex justify-center">
                <div className="rounded-full flex border border-2 border-red-700 bg-red-700 items-center">
                    <input
                        className="rounded-l-full pl-2 focus:outline-none py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Name" />
                    <GoSearch className="mx-2 text-white" size={25} />
                </div>
            </div>
            {loading && <p>Loading...</p>}
            <div className="md:mx-10 mx-1 mb-20 mt-10 border border-red-700 border-2">
                {data && data.length > 0 ?
                    <AdviserRecordDatagridview
                        tableData={data}
                    /> : <div className="inset-0">No records found</div>}
            </div>
        </AdminMenu >
    );
}

export default Page;
