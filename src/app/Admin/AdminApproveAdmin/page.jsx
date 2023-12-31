"use client"

import AdminDatagridView from "./AdminDatagridView";
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
import { GrClose } from "react-icons/gr";
import Link from "next/link";
import { FcApprove, FcDeleteDatabase } from "react-icons/fc";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { GoSearch } from "react-icons/go";

const Page = () => {
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    const [data, setData] = useState()
    const [imageToView, setImageToView] = useState()
    const [search, setSearch] = useState()
    const [success, setSuccess] = useState("")
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const { startLoading, loading, stopLoading } = useLoading()

    const handleSetImage = (image) => {
        setImageToView(image)
        setSeeImage(true)
    }

    const emailData = {
        email: info && info.email,
        subject: "SDMS Admin",
        message: "This is to inform you that your admin registration account in SDMS is approved by the Admin.",
        html: `<p>This is to inform you that your admin registration account in SDMS is approved by the Admin.</p>`
    }

    const sendEmail = async () => {
        startLoading()
        try {
            const sendCode = await axios.post(`${url}/api/AdminSendMail`, emailData, { headers });
            stopLoading()
        } catch (error) {
            console.error('Error:', error);
            stopLoading()
        }
    };

    const status = "Verified"

    const handleUpdateApi = async () => {
        startLoading()
        try {
            const response = await axios.put(`${url}/api/AdminApproveAccount/${info.id}`,
                status, { headers });
            sendEmail()
            stopLoading()
            handleGetData()
            setSuccess("Approved Successfully!")
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleRemoveAccApi = async () => {
        startLoading()
        try {
            const response = await axios.put(`${url}/api/RemoveAccount/${info.id}`,
                { headers });
            setData(response.data)
            handleGetData()
            stopLoading()
            setSuccess("Removed Successfully!")
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleRemoveAcc = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-slate-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcDeleteDatabase size={32} />Remove Account</div>
            <p className='text-xl p-6'>Are you sure you want to remove this account?</p>
        </div>, () => {
            handleRemoveAccApi()
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-slate-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcApprove size={32} />Approve Account</div>
            <p className='text-xl p-6'>Are you sure you want to approve this account?</p>
        </div>, () => {
            handleUpdateApi()
        });
    };

    const handleGetData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/AdminAccount`, { headers });
            setData(response.data)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const filterData = data &&
        Object.values(data).filter(admin => {
            const searchCondition = search ?
                admin.name && (admin.name.toLowerCase()).includes(search.toLowerCase()) : true;
            return searchCondition;
        });



    const handleConvertLevel = async (idNumber) => {
        startLoading()
        try {
            const response = await axios.put(`${url}/api/AdminAccount/${info.id}`,
                idNumber, { headers });
            stopLoading()
            handleGetData()
            setSuccess("Conversion Successfull!")
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }


    const handleMakeMaster = (e) => {
        const idNumber = "master"
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-slate-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcApprove size={32} />Approve Account</div>
            <p className='text-xl p-6'>Are you sure you want to mark this as master account?</p>
        </div>, () => {
            handleConvertLevel(idNumber)
        });
    };

    const handleRemoveMaster = (e) => {
        const idNumber = "admin"
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-slate-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcApprove size={32} />Approve Account</div>
            <p className='text-xl p-6'>Are you sure you want to remove this as master account?</p>
        </div>, () => {
            handleConvertLevel(idNumber)
        });
    };

    useEffect(() => {
        handleGetData()
    }, [])

    useEffect(() => {
        const clcikedInfo = data && Object.values(data).find(selfConsult => selfConsult.id === clickedID);
        setInfo(clcikedInfo)
    }, [clickedID])


    const searchParams = useSearchParams()
    const newAdmin = searchParams.get('new')
    const router = useRouter()

    useEffect(() => {
        if ("newAdmin" === newAdmin) {
            handleGetData()
            router.push("/Admin/AdminApproveAdmin")
        }
    }, [newAdmin])

    const onlyMaster = data && Object.values(data).filter((admin) => admin?.idNumber === "master")
    // console.log("Only master", onlyMaster)
    // console.log("data", data)

    return (
        <AdminMenu>
            <div className="m-7 flex items-center">
                <MdAdminPanelSettings size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                <p className="font-bold text-xl">Admin Accounts</p>
            </div>
            <div className="flex justify-center">
                <div className="rounded-full flex border border-2 border-slate-700 bg-slate-700 items-center">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-l-full pl-2 focus:outline-none py-2"
                        placeholder="Search Name" />
                    <GoSearch className="mx-2 text-white" size={25} />
                </div>
            </div>

            {openInfo && info && <InformationModal>
                <div className="relative p-6">
                    <div className="absolute -top-4 -right-4">
                        <button
                            onClick={() => setOpenINfo(false)} className="rounded-full text-slate-600 bg-white">
                            <AiFillCloseCircle size={30} /></button>
                    </div>
                    <ConfirmationDialog />
                    {success && <InformationModal>
                        <div className='grid p-10 rounded-lg gap-4'>
                            <p>{success}</p>
                            <button onClick={() => setSuccess("")} className='bg-amber-600 rounded-lg py-2 px-4'>Okay</button>
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
                                    <Image
                                        src={info.profile}
                                        alt="Selected"
                                        width={600}
                                        height={600}
                                        className="object-cover"
                                        required
                                    /> : <Image
                                        src="https://res.cloudinary.com/dckxajww8/image/upload/v1693269023/icons/profile_2_cotaml.png"
                                        alt="Selected"
                                        width={600}
                                        height={600}
                                        className="object-cover"
                                        required
                                    />}
                            </div>
                        </div>
                        <div className="grid gap-2 text-xs">
                            <label className="flex gap-3 items-center">
                                <p className="font-bold">Account type:</p>
                                <div className="bg-gray-300 p-2">{info?.idNumber === "master" ? "Master Admin" : "Admin"}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Email: </p>
                                <div> {info.email}</div>
                            </label>

                            <label className="flex gap-3">
                                <p className="font-bold">Status: </p>
                                <div> {info.status}</div>
                            </label>

                            <label className="flex gap-3">
                                <p className="font-bold">Contact No.: </p>
                                <div> {info.phoneNumber}</div>
                            </label>

                        </div>
                    </div>

                    {info?.email !== "bulsubulacanstateuniversity@gmail.com" &&
                        <div className="flex gap-2 items-center justify-center pt-4">
                            {info?.status.includes("Verified") ?
                                <>
                                    <button onClick={handleRemoveAcc}
                                        className="bg-slate-600 rounded-full p-2">
                                        <div><GrClose size={24} /></div>
                                    </button>
                                    {info?.idNumber.includes("master") ?
                                        onlyMaster && onlyMaster.length > 1 &&
                                        <button onClick={handleRemoveMaster}
                                            className="bg-slate-600 rounded-full p-2">
                                            <div>Remove as Master Admin</div>
                                        </button> :
                                        <button onClick={handleMakeMaster}
                                            className="bg-green-600 rounded-full p-2">
                                            <div>Mark as Master Admin</div>
                                        </button>}
                                </>
                                :
                                <button onClick={handleUpdate}
                                    className="bg-green-600 rounded-full p-2">
                                    <div><GiCheckMark size={24} /></div>
                                </button>

                            }

                        </div>}
                </div>
            </InformationModal>}
            <div className="md:mx-10 mx-1 my-10 border border-blue-400 border-2">
                {filterData && filterData.length > 0 ?
                    <AdminDatagridView
                        setOpenINfo={setOpenINfo}
                        setClickedID={setClickedID}
                        tableData={filterData}
                    /> : <div className="inset-0">No records found</div>}
            </div>
        </AdminMenu>
    );
}

export default Page;