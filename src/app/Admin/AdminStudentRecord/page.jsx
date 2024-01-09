"use client"

import StudentRecordDatagridview from "./StudentRecordDatagridview";
import { useEffect, useState, useRef } from "react";
import InformationModal from "@/utils/InformationModal";
import Modal from "@/utils/Modal";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { url, headers } from "@/app/libs/api";
import axios from "axios";
import AdminMenu from "@/components/AdminMenu";
import { FaPeopleLine } from "react-icons/fa6";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import PrintButton from "@/utils/PrintButton";
import { BsFillPrinterFill } from "react-icons/bs";
import PrintCert2 from "@/utils/PrintCert2";
import studentAccountData from "@/utils/studentAccountData";

const Page = () => {
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    const [filterData, setFilterData] = useState(studentAccountData)
    const [imageToView, setImageToView] = useState()
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState()
    const [search, setSearch] = useState()
    const [colleges, setColleges] = useState()
    const componentRef = useRef();


    const handleSetImage = (image) => {
        setImageToView(image)
        setSeeImage(true)
    }

    const handleGetData = async () => {
        setFilterData(studentAccountData)
    }

    const [yearLevel, setYearLevel] = useState()
    const [college, setCollege] = useState()

    const data = filterData &&
        Object.values(filterData).filter(report => {
            const searchCondition = search ?
                report.name && (report.name.toLowerCase()).includes(search.toLowerCase()) : true;
            const yearLevelCondition = !yearLevel || report && report.yearLevel && report.yearLevel.includes(yearLevel);
            const collegeCondition = !college || report && report.college === college;
            return collegeCondition && yearLevelCondition && searchCondition;
        });


    useEffect(() => {
        handleGetData()
        getColleges()
    }, [])

    useEffect(() => {
        const clcikedInfo = data && Object.values(data).find(selfConsult => selfConsult.id === clickedID);
        setInfo(clcikedInfo)
    }, [clickedID])


    const handleClose = () => {
        setSuccess(false)
        setOpenINfo(false)
    }

    const searchParams = useSearchParams()
    const newStudent = searchParams.get('new')
    const router = useRouter()

    useEffect(() => {
        if ("newStudent" === newStudent) {
            handleGetData()
            router.push("/Admin/AdminStudentRecord")
        }
    }, [newStudent])

    const getColleges = async () => {
        try {
            const details = await axios.get(`${url}/api/Colleges`,
                { headers });
            setColleges(details.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClearFilter = () => {
        setOpenFilter(!openFilter)
        setYearLevel()
        setCollege()
    }

    const handleConfirm = (e) => {
        setOpenFilter(!openFilter)
    }

    const [print, setPrint] = useState()


    return (
        <AdminMenu>
            <div className="flex flex-wrap items-center">
                <div className="m-7 flex items-center">
                    <FaPeopleLine size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                    <p className="font-bold text-xl">Student Accounts</p>
                </div>
                <div className="flex gap-2 relative items-center"><p>Filter: </p>
                    <button className="bg-red-700 text-white px-4 py-2 whitespace-normal rounded-full"
                        onClick={() => setOpenFilter(!openFilter)}>Select Filter</button>
                    {openFilter && <div className="grid p-6 bg-white z-50 absolute top-0 border gap-4 w-max">
                        {colleges && <div className="flex justify-between">
                            <p>By Year College:</p>
                            <select
                                onChange={(e) => setCollege(e.target.value)}
                                className="border w-36"
                            > <option value="">Select College</option>
                                {colleges?.map((college, index) => (
                                    <option key={index} value={college.name}>
                                        {college.acronym}
                                    </option>
                                ))}
                            </select>
                        </div>}
                        <div className="flex justify-between">
                            <p>By Year Level:</p>
                            <select
                                onChange={(e) => setYearLevel(e.target.value)}
                                className="border w-36"
                            >
                                <option value="">Select Year level</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                {/* <option value="5">5</option> */}
                            </select>
                        </div>
                        <div className="flex justify-between w-full">
                            <button onClick={handleClearFilter}
                                className="bg-red-700 rounded-full px-4 py-2 text-white">Clear Filter</button>
                            <button onClick={handleConfirm}
                                className="bg-red-700 rounded-full px-4 py-2 text-white">Confirm</button>
                        </div>
                    </div>}
                </div>
                <button onClick={() => setPrint(!print)}
                    className="px-4 py-2 h-max w-max flex items-center gap-4 bg-red-700 text-white rounded-lg m-4">
                    <BsFillPrinterFill size={20} /> Print</button>
                {print && <PrintButton college={college} yearLevel={yearLevel}
                    setPrint={setPrint} content={data} contentRef={componentRef} />}
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

            {openInfo && info && <InformationModal>
                <div className="relative p-6">
                    <div className="absolute -top-4 -right-4">
                        <button
                            onClick={() => setOpenINfo(false)} className="rounded-full text-red-600 bg-white">
                            <AiFillCloseCircle size={30} /></button>
                    </div>
                    {success && <InformationModal>
                        <div className='grid p-10 border border-black rounded-lg gap-7'>
                            <div className="flex justify-center">
                                <button onClick={handleClose} className='bg-green-500 text-white w-max rounded-lg py-2 px-4'>Okay</button>
                            </div>
                        </div>
                    </InformationModal>}
                    <div className="grid gap-4 justify-center items-center">
                        <div className="flex justify-center">
                            <div className="w-28 h-28 object-cover overflow-hidden rounded-full border-4 border-white mb-4">
                                {info.profile ?
                                    <Link href={info.profile} target="blank">
                                        <Image
                                            src={info.profile}
                                            alt="Selected"
                                            width={600}
                                            height={600}
                                            className="object-cover"
                                            required
                                        />
                                    </Link>
                                    : <Image
                                        src="https://res.cloudinary.com/dckxajww8/image/upload/v1693269023/icons/profile_2_cotaml.png"
                                        alt="Selected"
                                        width={600}
                                        height={600}
                                        className="object-cover"
                                        required
                                    />
                                }
                            </div>
                        </div>
                        <div className="grid gap-2 text-xs">
                            <label className="flex gap-3 items-center">
                                <p className="font-bold">Student ID:</p>
                                <div className="bg-gray-300 p-2">{info.idNumber}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Email: </p>
                                <div> {info.email}</div>
                            </label>

                            <label className="flex gap-3">
                                <p className="font-bold">Name: </p>
                                <div> {info.name}</div>
                            </label>
                            <label className="flex gap-6">
                                <label className="flex gap-3">
                                    <p className="font-bold">College: </p>
                                    <div> {info.college}</div>
                                </label>
                                <label className="flex gap-3">
                                    <p className="font-bold">Year Level and Section: </p>
                                    <div> {info.yearLevel}</div>
                                </label>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Address: </p>
                                <div> {info.address}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Contact No.: </p>
                                <div> {info.phoneNumber}</div>
                            </label>
                            <label onClick={() => handleSetImage(info.credentials)} className="flex gap-3">
                                <p className="font-bold">Attachment: </p>
                                <div>{info.credentials ? (info.credentials).slice(-8) : "No attachments"}</div>
                            </label>
                        </div>
                    </div>
                    {seeImage && info.attachment !== "" && <Modal>
                        <div className="relative p-10 h-screen w-screen grid justify-center items-center">
                            <Link href={imageToView} target="blank">
                                <div className="m-10 overflow-auto">
                                    <Image width={500} height={500}
                                        className="p-10 object-fill"
                                        src={imageToView} alt="attachment" />
                                </div>
                            </Link>
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={() => setSeeImage(false)} className="rounded-full text-red-600 bg-white">
                                    <AiFillCloseCircle size={30} /></button>
                            </div>

                        </div>
                    </Modal>}
                    <div className="flex gap-2 justify-center pt-4">
                        <button type="button" onClick={() => setPrint(!print)}
                            className="px-4 rounded-full py-2 bg-red-700 text-white">Clearance Certificate</button>
                        {print && <PrintCert2 content={info} setPrint={setPrint} contentRef={componentRef} />}
                    </div>
                </div>
            </InformationModal >}
            <div className="md:mx-10 mx-1 mb-20 mt-10 border border-red-700 border-2">
                {data && data.length > 0 ?
                    <StudentRecordDatagridview
                        setOpenINfo={setOpenINfo}
                        setClickedID={setClickedID}
                        tableData={data}
                    /> : <div className="inset-0">No records found</div>}
            </div>
        </AdminMenu >
    );
}

export default Page;
