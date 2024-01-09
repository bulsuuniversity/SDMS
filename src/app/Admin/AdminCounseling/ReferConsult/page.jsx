"use client"

import DataGridView from "./Datagridview";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import InformationModal from "@/utils/InformationModal";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Image from "next/image";
import { url, headers } from "@/app/libs/api";
import axios from "axios";
import SendMessage from "@/components/SendMessage";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import useConfirmation from "@/utils/ConfirmationHook";
import useLoading from "@/utils/Loading";

const Page = () => {
    const [openMessage, setOpenMessage] = useState(false)
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    const [data, setData] = useState()
    const [sentEmail, setSentEmail] = useState()
    const [success, setSuccess] = useState(false)
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const { loading, stopLoading, startLoading } = useLoading()

    const handleUpdateApi = async () => {
        startLoading()
        try {
            const response = await axios.put(`${url}/api/consultReferral/${info.id}`,
                { headers });
            handleGetData()
            setSuccess(true)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        showConfirmation('Are you sure you want to clear this case?', () => {
            handleUpdateApi()
        });
    };

    const handleGetData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/consultReferral`, { headers });
            setData(response.data)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    useEffect(() => {
        handleGetData()
    }, [])


    useEffect(() => {
        const clcikedInfo = data && Object.values(data).find(selfConsult => selfConsult.id === clickedID);
        setInfo(clcikedInfo)
    }, [clickedID])

    const suggestions = {
        one: `Your refferal is approved! Please come on our office together with ${info && info.referredStudent}.`,
        two: "Sorry, our schedule is full for that day. Please make another request. Date recommendations are:"
    }

    return (
        <Layout>
            {openInfo && info && <InformationModal>
                <div className="relative p-6">
                    <div className="absolute -top-4 -right-4">
                        <button
                            onClick={() => setOpenINfo(false)} className="rounded-full text-slate-600 bg-white">
                            <AiFillCloseCircle size={30} /></button>
                    </div>
                    <ConfirmationDialog />
                    {success && <InformationModal>
                        <div className='bg-amber-200 grid p-10 rounded-lg gap-4'>
                            <div className="flex justify-center">
                                <AiOutlineCheckCircle size={32} />
                            </div>
                            <p className="text-center">Cleared Successfully!</p>
                            <button onClick={() => setSuccess(false)} className='bg-green-600 text-white rounded-lg w-max py-2 px-4'>Okay</button>
                        </div>
                    </InformationModal>}
                    {loading && <InformationModal>
                        <div className="grid bg-slate-700 text-white justify-center p-10">
                            <div className="text-center">Redirecting where you left.</div>
                            <p className="text-center">Please wait...</p>
                        </div>
                    </InformationModal>}
                    <div className="grid gap-4 justify-center items-center">
                        <div className="grid gap-4 text-xs">
                            <label className="flex gap-3 justify-center items-center">
                                <p className="font-bold">Ticket No.:</p>
                                <div className="bg-gray-300 p-2">{info.id}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Reason on referring for Consultation: </p>
                                <div> {info.referralReason}</div>
                            </label>
                            <label className="grid gap-3">
                                <p className="font-bold">Date of Referral: </p>
                                <div>Name: {info.referralDate}</div>
                            </label>
                            <div className="flex gap-4 divide-x justify-center items-start">
                                <label className="grid">
                                    <p className="font-bold">Referred Student Details: </p>
                                    <div className="indent-4">Name:  {info.referredStudent}</div>
                                    <div className="indent-4">College: {info.referredStudentCollege}</div>
                                </label>
                                <label className="grid pl-3">
                                    <p className="font-bold">Referrer Details: </p>
                                    <div className="indent-4">Name:  {info.student.name}</div>
                                    <div className="indent-4">Email:  {info.student.email}</div>
                                    <div className="indent-4">Contact No.: {info.student.phoneNumber}</div>
                                    {/* <label onClick={() => setSeeImage(true)} className="flex indent-4">
                                        <p>View Profile Picture: </p>
                                        <div>{info.student.profile ? (info.student.profile).slice(-8) : "No profile uploaded"}</div>
                                    </label> */}
                                </label>
                            </div>

                            <label className="grid gap-3">
                                <p className="font-bold">Describe the situation: </p>
                                <div>{info.describeSituation}</div>
                            </label>
                            {openMessage && info && <SendMessage suggestions={suggestions} sentEmail={sentEmail} setSentEmail={setSentEmail} email={info.student.email} setClose={setOpenMessage} />}
                            {seeImage && info.student.profile !== "" && <InformationModal>
                                <div className="relative p-6">
                                    <div className="h-96">
                                        <Image width={400} height={200}
                                            className="object-fill h-96 w-96"
                                            src={info.student.profile} alt="attachment" />
                                    </div>
                                    <div className="absolute -top-4 -right-4">
                                        <button
                                            onClick={() => setSeeImage(false)} className="rounded-full text-slate-600 bg-white">
                                            <AiFillCloseCircle size={30} /></button>
                                    </div>

                                </div>
                            </InformationModal>}
                        </div>
                    </div>
                    <div className={`absolute ${info.status !== "Pending" ? "left-40" : "left-32"}  -bottom-10 flex justify-center gap-4`}>
                        <button onClick={() => setOpenMessage(true)} className="bg-amber-400 rounded-full p-2"><MdOutlineEmail size={32} /></button>
                        {info.status === "Pending" && <button onClick={handleUpdate} className="bg-green-600 rounded-full p-2"><GiCheckMark size={32} /></button>}
                    </div>
                </div>
            </InformationModal>}
            <div className="md:mx-10 mx-1 my-6 border border-blue-400 border-2">
                {data && data.length > 0 ?
                    <DataGridView
                        setOpenINfo={setOpenINfo}
                        setClickedID={setClickedID}
                        tableData={data}
                    /> : <div className="inset-0">No Record found</div>}
            </div>
        </Layout>
    );
}

export default Page;