"use client"

import ReportsDatagridview from "./ReportsDatagridview";
import { useEffect, useState } from "react";
import InformationModal from "@/utils/InformationModal";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { url, headers } from "@/app/libs/api";
import axios from "axios";
import AdminMenu from "@/components/AdminMenu";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import SendMessage from "@/components/SendMessage";
import { ImNewspaper } from "react-icons/im";
import useConfirmation from "@/utils/ConfirmationHook";
import useLoading from "@/utils/Loading";

const Page = () => {
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    // const [data, setData] = useState()
    const [openMessage, setOpenMessage] = useState(false)
    const [sentEmail, setSentEmail] = useState()
    const [success, setSuccess] = useState(false)
    const [imageToView, setImageToView] = useState()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const { startLoading, loading, stopLoading } = useLoading()
    const [status, setStatus] = useState(true)
    const [filterReports, setFilterReports] = useState()

    const handleChangeStatus = () => {
        setStatus(!status)
    }

    const handleUpdateApi = async () => {
        startLoading()
        try {
            const response = await axios.put(`${url}/api/studentReport/${info.id}`,
                { headers });
            handleGetData()
            stopLoading()
            setSuccess(true)
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

    const handleSetImage = (image) => {
        setImageToView(image)
        setSeeImage(true)
    }

    const handleGetData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/studentReport`, { headers });
            setFilterReports(response.data)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const data = filterReports && Object.values(filterReports).filter(report => report.status === `${status ? 'Cleared' : 'Pending'}`)


    useEffect(() => {
        handleGetData()
    }, [])


    useEffect(() => {
        const clcikedInfo = data && Object.values(data).find(selfConsult => selfConsult.id === clickedID);
        setInfo(clcikedInfo)
    }, [clickedID])

    const suggestions = {
        one: "Thank you! Proper sanctions will be made.",
        two: "Sorry, can you provide more details for further assistance?"
    }



    return (
        <AdminMenu>
            <div className="m-7 flex items-center">
                <ImNewspaper size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                <p className="font-bold text-xl">Reports</p>
            </div>
            <div className="flex gap-10 bg-[#99acff] py-2 md:mx-10 mx-1 justify-center item-center mt-6">
                <div className="flex p-2 items-center">
                    <p>Filter: </p>
                    <input
                        className="border-b-2"
                        placeholder="Filter"
                        type="date"
                    />
                </div>
                <div className={`rounded-full mr-5 p-1 text-white bg-gray-500 w-max flex ${status ? 'justify-start' : 'justify-end'}`}>
                    {status && <div className="grid items-center mx-4">Pending</div>}
                    <button onClick={handleChangeStatus} className={`rounded-full px-4 bg-amber-500 py-2 border boder-black`}>
                        {status ? 'Cleared' : 'Pending'}</button>
                    {!status && <div className="grid items-center mx-4">Cleared</div>}
                </div>
                <div className="font-bold grid items-center"> Number of {!status ? 'Pending' : 'Cleared'} reports: {data && data.length}
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
                            <p>Cleared Successfully!</p>
                            <button onClick={() => setSuccess(false)} className='bg-amber-600 rounded-lg py-2 px-4'>Okay</button>
                        </div>
                    </InformationModal>}
                    {loading && <InformationModal>
                        <div className="grid justify-center p-6">
                            <div>Redirecting where you left.</div>
                            <p>Please wait...</p>
                        </div>
                    </InformationModal>}
                    <div className="grid gap-4 justify-center items-center">
                        <div className="grid gap-4 text-xs">
                            <label className="flex gap-3 justify-center items-center">
                                <p className="font-bold">Ticket No.:</p>
                                <div className="bg-gray-300 p-2">{info.id}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Action of Indiscipline: </p>
                                <div> {info.actionOfDiscipline}</div>
                            </label>
                            <div className="flex gap-4 items-start divide-x justify-center">
                                <label className="grid gap-3">
                                    <p className="font-bold">Offender Details: </p>
                                    <div className="indent-6">Name: {info.offender}</div>
                                    <div className="indent-6">College: {info.college}</div>
                                </label>
                                <label className="grid pl-4">
                                    <p className="font-bold">Student Offended Details: </p>
                                    <div className="indent-4">Email:  {info.reporter.email}</div>
                                    <div className="indent-4">Name:  {info.reporter.name}</div>
                                    <div className="indent-4">Contact No.: {info.reporter.phoneNumber}</div>
                                    {/* <label onClick={() => handleSetImage(info.reporter.profile)} className="indent-4 flex">
                                        <p>View Profile Picture: </p>
                                        <div>{info.reporter.profile ? (info.reporter.profile).slice(-8) : "No Profile"}</div>
                                    </label> */}
                                </label>
                            </div>

                            <label className="flex gap-3">
                                <p className="font-bold">Date of Incident: </p>
                                <div> {info.dateOfIncident}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Place/Platform of Incident: </p>
                                <div> {info.platformOfIncident}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Rate of Occurence: </p>
                                <div> {info.rateOfOccurence}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Describe the Situation: </p>
                                <div> {info.describeTheSituation}</div>
                            </label>
                            <label onClick={() => handleSetImage(info.attachment)} className="flex gap-3">
                                <p className="font-bold">Attachment: </p>
                                <div>{info.attachment ? (info.attachment).slice(-8) : "No attachment"}</div>
                            </label>
                            {openMessage && info && <SendMessage suggestions={suggestions} sentEmail={sentEmail} setSentEmail={setSentEmail} email={info.reporter.email} setClose={setOpenMessage} />}
                            {seeImage && info.attachment !== "" && <InformationModal>
                                <div className="relative p-6">
                                    <div className="h-96">
                                        <Image width={400} height={200}
                                            className="object-fill h-96 w-96"
                                            src={imageToView} alt="attachment" />
                                    </div>
                                    <div className="absolute -top-4 -right-4">
                                        <button
                                            onClick={() => setSeeImage(false)} className="rounded-full text-red-600 bg-white">
                                            <AiFillCloseCircle size={30} /></button>
                                    </div>

                                </div>
                            </InformationModal>}
                        </div>
                    </div>
                    <div className={`absolute ${info.status !== "Pending" ? 'left-36' : 'left-24'}  -bottom-10 flex justify-center gap-4`}>
                        <button onClick={() => setOpenMessage(true)} className="bg-amber-400 rounded-full p-2"><MdOutlineEmail size={32} /></button>
                        {info.status === "Pending" && <button onClick={handleUpdate} className="bg-green-600 rounded-full p-2"><GiCheckMark size={32} /></button>}
                    </div>
                </div>
            </InformationModal>}
            <div className="md:mx-10 mx-1 mb-14 border border-blue-400 border-2">
                {data && data.length > 0 ?
                    <ReportsDatagridview
                        setOpenINfo={setOpenINfo}
                        setClickedID={setClickedID}
                        tableData={data}
                        status={status}
                        handleGetData={handleGetData}
                    /> : <div className="flex inset-0">No records found</div>}
            </div>
        </AdminMenu>
    );
}

export default Page;