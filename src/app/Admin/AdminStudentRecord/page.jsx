"use client"

import StudentRecordDatagridview from "./StudentRecordDatagridview";
import { useEffect, useState } from "react";
import InformationModal from "@/utils/InformationModal";
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


const Page = () => {
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    const [filterData, setFilterData] = useState()
    const [imageToView, setImageToView] = useState()
    const [success, setSuccess] = useState(false)
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const { startLoading, loading, stopLoading } = useLoading()
    const [message, setMessage] = useState()
    const [search, setSearch] = useState()


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
                { headers });
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
        showConfirmation('Are you sure you want to approve this account?', () => {
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

    const data = filterData && Object.values(filterData).filter(report => search ? report.name && (report.name).includes(search) : true)


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
        showConfirmation('Are you sure you want to Remove this account?', () => {
            handleRemoveAccApi()
        });
    };

    const handleClose = () => {
        setSuccess(false)
        setOpenINfo(false)
    }

    return (
        <AdminMenu>
            <div className="m-7 flex items-center">
                <FaPeopleLine size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                <p className="font-bold text-xl">Student Accounts</p>
            </div>
            <div className="flex justify-center">
                <div className="rounded-full flex border border-black bg-gray-200 items-center">
                    <input
                        className="rounded-l-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search" />
                    <GoSearch className="mx-2"/>
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
                        <div className='bg-amber-200 grid p-10 rounded-lg gap-4'>
                            <p>{message}</p>
                            <button onClick={handleClose} className='bg-amber-600 rounded-lg py-2 px-4'>Okay</button>
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
                    {seeImage && info.attachment !== "" && <InformationModal>
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
                    </InformationModal>}
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
            <div className="md:mx-10 mx-1 my-10 border border-blue-400 border-2">
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
