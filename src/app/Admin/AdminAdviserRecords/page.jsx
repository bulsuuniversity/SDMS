"use client"

import AdviserRecordDatagridview from "./AdviserRecordDatagridview";
import { useEffect, useState } from "react";
import { url, headers } from "@/app/libs/api";
import axios from "axios";
import AdminMenu from "@/components/AdminMenu";
import useLoading from "@/utils/Loading";
import { GoSearch } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import { GiTeacher } from "react-icons/gi";
import InformationModal from "@/utils/InformationModal";


const Page = () => {
    const [filterData, setFilterData] = useState()
    const [add, setAdd] = useState(false)
    const { startLoading, loading, stopLoading } = useLoading()
    const [search, setSearch] = useState()
    const [data, setData] = useState({
        name: "",
        email: "",
        section: "",
    })

    const handleSetData = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGetData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/Adviser`, { headers });
            setFilterData(response.data)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleCreateData = async (e) => {
        e.preventDefault()
        startLoading()
        try {
            const response = await axios.post(`${url}/api/Adviser`, { data }, { headers });
            alert("Successfully Added the Adviser!")
            handleGetData()
            stopLoading()
            setAdd(!add)
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const datas = filterData && Object.values(filterData)
        .filter((adviser) =>
            (search ? adviser.section && (adviser.section.toLowerCase()).includes(search.toLowerCase()) : true));



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
                <button onClick={() => setAdd(!add)} className="px-4 m-10 py-2 bg-red-800 text-white">Add Adviser</button>
            </div>
            {add && <InformationModal>
                <form className="border grid gap-1 border-2 p-10" onSubmit={handleCreateData}>
                    <label className="flex justify-between">
                        Name:
                        <input
                            type="text"
                            className="border-black border-2 ml-2"
                            name="name"
                            value={data.name}
                            onChange={(e) => handleSetData('name', e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label className="flex justify-between">
                        Email:
                        <input
                            type="email"
                            className="border-black border-2 ml-2"
                            name="email"
                            value={data.email}
                            onChange={(e) => handleSetData('email', e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label className="flex justify-between">
                        Section:
                        <input
                            type="text"
                            className="border-black border-2 ml-2"
                            name="section"
                            value={data.section}
                            onChange={(e) => handleSetData('section', e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <div className="flex justify-between my-3">
                        <button onClick={() => setAdd(!add)} className="bg-red-800 text-white px-4 py-2" type="button">Cancel</button>
                        <button className="bg-red-800 text-white px-4 py-2" type="submit">Submit</button>
                    </div>

                </form>
            </InformationModal>}
            <div className="flex justify-center">
                <div className="rounded-full flex border border-2 border-red-700 bg-red-700 items-center">
                    <input
                        className="rounded-l-full pl-2 focus:outline-none py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Section" />
                    <GoSearch className="mx-2 text-white" size={25} />
                </div>
            </div>
            {loading && <p>Loading...</p>}
            <div className="md:mx-10 mx-1 mb-20 mt-10 border border-red-700 border-2">
                {datas && datas.length > 0 ?
                    <AdviserRecordDatagridview
                        handleGetData={handleGetData}
                        tableData={datas}
                    /> : <div className="inset-0">No records found</div>}
            </div>
        </AdminMenu >
    );
}

export default Page;
