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
import { GiCheckMark } from "react-icons/gi";
import { FaPeopleLine } from "react-icons/fa6";
import useConfirmation from "@/utils/ConfirmationHook";
import useLoading from "@/utils/Loading";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import { GoSearch } from "react-icons/go";
import { FcApprove, FcDeleteDatabase } from "react-icons/fc";
import SendMessage from "@/components/SendMessage";
import { useRouter, useSearchParams } from "next/navigation";
import PrintButton from "@/utils/PrintButton";
import PrintableComponent from "@/components/PrintableComponent";
import { BsFillPrinterFill } from "react-icons/bs";

const Page = () => {
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    const [filterData, setFilterData] = useState()
    const [imageToView, setImageToView] = useState()
    const [success, setSuccess] = useState(false)
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const { startLoading, loading, stopLoading } = useLoading()
    const [message, setMessage] = useState()
    const [search, setSearch] = useState()
    const componentRef = useRef();

    const handleSetImage = (image) => {
        setImageToView(image)
        setSeeImage(true)
    }

    const emailData = {
        email: info && info.email,
        subject: "SDMS Admin",
        message: "This is to inform you that your registration account in SDMS is approved by the Admin.",
        html: `<p>This is to inform you that your registration account in SDMS is approved by the Admin.</p>`
    }

    const sendEmail = async () => {
        startLoading()
        try {
            const sendCode = await axios.post(`${url}/api/AdminSendMail`, emailData, { headers });
            setSuccess(true)
            stopLoading()
        } catch (error) {
            console.error('Error:', error);
            stopLoading()
        }
    };


    const handleUpdateApi = async () => {
        startLoading()
        try {
            const response = await axios.put(`${url}/api/AdminApproveAccount/${info.id}`,
                { status: "Registered" }, { headers });
            sendEmail()
            stopLoading()
            setMessage("Account approved successfully!")
            setSuccess(true)
            handleGetData()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcApprove size={32} />Approve Account</div>
            <p className='text-xl p-6'>Are you sure you want to approve this account?</p>
        </div>, () => {
            handleUpdateApi()
        });
    };

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
    }, [])

    useEffect(() => {
        const clcikedInfo = data && Object.values(data).find(selfConsult => selfConsult.id === clickedID);
        setInfo(clcikedInfo)
    }, [clickedID])

    const handleRemoveAccApi = async () => {
        startLoading()
        try {
            const response = await axios.put(`${url}/api/RemoveAccount/${info.id}`,
                { headers });
            setData(response.data)
            // sendEmail()
            setMessage("Account removed!")
            stopLoading()
            setSuccess(true)
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleRemoveAcc = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcDeleteDatabase size={32} />Remove Account</div>
            <p className='text-xl p-6'>Are you sure you want to remove this account?</p>
        </div>, () => {
            handleRemoveAccApi()
        });
    };

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
            <div className="flex flex-wrap">
                <div className="m-7 flex items-center">
                    <FaPeopleLine size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                    <p className="font-bold text-xl">Student Accounts</p>
                </div>
                <div className="flex gap-2 relative items-center"><p>Filter: </p>
                    <button className="bg-red-700 text-white px-4 py-2 whitespace-normal rounded-full"
                        onClick={() => setOpenFilter(!openFilter)}>Select Filter</button>
                    {openFilter && <div className="grid p-6 bg-white z-50 absolute top-0 border gap-4 w-max">
                        <div className="flex justify-between">
                            <p>By Year College:</p>
                            <select
                                onChange={(e) => setCollege(e.target.value)}
                                className="border w-36"
                            >
                                <option value="">Select College</option>
                                <option value="CBA">CBA</option>
                                <option value="CIT">CIT</option>
                                <option value="COED">COED</option>
                                <option value="CICS">CICS</option>
                                <option value="COE">COE</option>
                            </select>
                        </div>
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
                                <option value="5">5</option>
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
                    className="px-4 py-2 h-max w-max flex bg-red-700 rounded-lg m-4"><BsFillPrinterFill size={20} /> Print</button>
                {print && <PrintButton college={college} yearLevel={yearLevel} setPrint={setPrint} content={data} contentRef={componentRef} />}
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
                    <ConfirmationDialog />
                    {success && <InformationModal>
                        <div className='grid p-10 border border-black rounded-lg gap-7'>
                            <p>{message}</p>
                            <div className="flex justify-center">
                                <button onClick={handleClose} className='bg-green-500 text-white w-max rounded-lg py-2 px-4'>Okay</button>
                            </div>
                        </div>
                    </InformationModal>}
                    {loading && <InformationModal>
                        <div className="grid justify-center p-6">
                            <p>Please wait...</p>
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
                                    <p className="font-bold">Year Level: </p>
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
                    {/* <div className={`absolute left-24 -bottom-8`}> */}
                    <div className="flex justify-center pt-4">
                        {info.status !== "Registered" ?
                            <button onClick={handleUpdate}
                                className="bg-green-600 rounded-full p-2">
                                <div><GiCheckMark size={32} /></div>
                            </button> :
                            <button onClick={handleRemoveAcc}
                                className="bg-red-600 rounded-full p-2">
                                <div><GrClose size={32} /></div>
                            </button>}
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
