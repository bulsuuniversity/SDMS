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
import adviserData from "@/utils/adviserData"

const Page = () => {
    const [filterData, setFilterData] = useState()
    const [add, setAdd] = useState(false)
    const { startLoading, loading, stopLoading } = useLoading()
    const [search, setSearch] = useState()
    const [sectionData, setSectionData] = useState([])
    const [data, setData] = useState({
        name: "",
        email: "",
        section: "",
    })


    useEffect(() => {
        if (sectionData) {
            handleSetData("section", sectionData.join(", "))
        }
    }, [sectionData])

    const handleSectionInputChange = (index, value) => {
        const updatedSections = [...sectionData];
        updatedSections[index] = value;
        setSectionData(updatedSections);
    };

    const handleAddSectionInput = () => {
        const partialMatch = filterData && filterData.find((adviser) => {
            const matchingParts = adviser.section &&
                adviser.section.toLowerCase().includes(sectionData[sectionData.length - 1]?.toLowerCase()
                );
            return matchingParts
        });
        if (partialMatch) {
            alert(`Section: ${partialMatch.section} already under ${partialMatch.name}!`);
            stopLoading();
            return;
        }
        setSectionData([...sectionData, '']);
    };

    const handleRemoveSectionInput = (index) => {
        const updatedSections = [...sectionData];
        updatedSections.splice(index, 1);
        setSectionData(updatedSections);
    };

    const handleSetData = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGetData = async () => {
        setFilterData(adviserData)
    }

    const handleCreateData = async (e) => {
        e.preventDefault();
        startLoading();

        const partialMatch = filterData && filterData.find((adviser) => {
            const matchingParts = adviser.section &&
                adviser.section.toLowerCase().includes(sectionData[sectionData.length - 1]?.toLowerCase()
                );
            return matchingParts
        });
        if (partialMatch) {
            alert(`Section: ${partialMatch.section} already under ${partialMatch.name}!`);
            stopLoading();
            return;
        }

        try {
            const response = await axios.post(`${url}/api/Adviser`, { data }, { headers });
            alert("Successfully Added the Adviser!");
            handleGetData();
            stopLoading();
            setAdd(!add);
        } catch (err) {
            console.log(err);
            stopLoading();
        }
    };


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
                <button onClick={() => setAdd(!add)} className="px-4 m-10 py-2 bg-slate-800 text-white">Add Adviser</button>
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
                        Section/s:
                        <div className="grid gap-1">
                            {sectionData.map((section, index) => (
                                <div className="flex gap-1">
                                    <input
                                        disabled={index !== sectionData.length - 1}
                                        type="text"
                                        className="border-black border-2 ml-2"
                                        value={section}
                                        onChange={(e) => handleSectionInputChange(index, e.target.value)}
                                        required
                                    />
                                    < button type="button" className="text-2xl text-slate-700" onClick={() => handleRemoveSectionInput(index)}>
                                        -
                                    </button>
                                </div>

                            ))}
                            <button type="button" className="text-2xl text-slate-700" onClick={handleAddSectionInput}>
                                +
                            </button>
                        </div>
                    </label>
                    <br />
                    <div className="flex justify-between my-3">
                        <button onClick={() => setAdd(!add)} className="bg-slate-800 text-white px-4 py-2" type="button">Cancel</button>
                        <button className="bg-slate-800 text-white px-4 py-2" type="submit">Submit</button>
                    </div>

                </form>
            </InformationModal>}
            <div className="flex justify-center">
                <div className="rounded-full flex border border-2 border-slate-700 bg-slate-700 items-center">
                    <input
                        className="rounded-l-full pl-2 focus:outline-none py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Section" />
                    <GoSearch className="mx-2 text-white" size={25} />
                </div>
            </div>
            {loading && <p>Loading...</p>}
            <div className="md:mx-10 mx-1 mb-20 mt-10 border border-slate-700 border-2">
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
