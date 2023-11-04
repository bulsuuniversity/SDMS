"use client"

import StudentHistoryDatagridview from "./StudentHistoryDatagridview";
import { useEffect, useState } from "react";
import InformationModal from "@/utils/InformationModal";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { url, headers } from "@/app/libs/api";
import axios from "axios";
import AdminMenu from "@/components/AdminMenu";
import SendMessage from "@/components/SendMessage";
import { ImNewspaper } from "react-icons/im";
import useConfirmation from "@/utils/ConfirmationHook";
import useLoading from "@/utils/Loading";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { useSearchParams } from "next/navigation";

const Page = () => {
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    const [openMessage, setOpenMessage] = useState(false)
    const [sentEmail, setSentEmail] = useState()
    const [imageToView, setImageToView] = useState()
    const { startLoading, loading, stopLoading } = useLoading()
    const [status, setStatus] = useState(false)
    const [notes, setNotes] = useState()
    const [filterReports, setFilterReports] = useState()



    const searchParams = useSearchParams();
    const student = (searchParams.get('student').toString());

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


    const [search, setSearch] = useState()

    const data = filterReports &&
        Object.values(filterReports).filter(report => {
            const statusCondition = report && report.offender && report.actionOfDiscipline.toLowerCase().includes(student.toLowerCase())
            const searchCondition = report && report.actionOfDiscipline && (search ? report.actionOfDiscipline.toLowerCase().includes(search.toLowerCase()) : true)
            return statusCondition && searchCondition;
        });



    useEffect(() => {
        handleGetData()
    }, [])


    useEffect(() => {
        const clcikedInfo = data && Object.values(data).find(selfConsult => selfConsult.id === clickedID);
        setInfo(clcikedInfo)
    }, [clickedID])

    useEffect(() => {
        if (info && info.notes) {
            setNotes(info.notes)
        } else {
            setNotes("")
        }
    }, [info])



    return (
        <AdminMenu>
            <div className="m-7 flex items-center">
                <ImNewspaper size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                <p className="font-bold text-lg">Reported Student History</p>
            </div>
            <div className="top-4 right-4">
                <Link
                    href={"/Admin/AdminReports"} className="rounded-full text-red-600 bg-white">
                    <AiFillCloseCircle size={30} />
                </Link>
            </div>
            <div className="flex my-6 justify-center">
                <div className="rounded-full flex border border-2 border-red-700 bg-red-700 items-center">
                    <input
                        className="rounded-l-full pl-2 focus:outline-none py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Offense" />
                    <GoSearch className="mx-2 text-white" size={25} />
                </div>
            </div>
            {
                openInfo && info &&
                <InformationModal>
                    {openMessage && info &&
                        <SendMessage
                            suggestions={suggestions}
                            sentEmail={sentEmail}
                            setSentEmail={setSentEmail}
                            email={info.reporter.email}
                            setClose={setOpenMessage} />}
                    <div style={{ backgroundImage: 'URL("/adminbg.png")' }} className="bg-no-repeat bg-cover h-screen w-screen grid p-16 justify-center items-center">
                        <form className="overflow-y-auto h-full bg-opacity-50 bg-gray-200">
                            <div className="bg-gray-500 p-4 m-4 relative grid-cols-2 grid gap-4">
                                <div className="absolute -top-4 -right-4">
                                    <button
                                        onClick={() => setOpenINfo(false)} className="rounded-full text-red-600 bg-white">
                                        <AiFillCloseCircle size={30} />
                                    </button>
                                </div>
                                <div className="grid gap-2 justify-center items-center text-xs">
                                    <div className="grid px-8 py-4 bg-white border border-black gap-2">
                                        <p className="font-bold text-lg">REPORT DETAILS</p>
                                        <label className="flex gap-3 text-sm items-center border-b border-black pb-2">
                                            <p className="font-bold text-sm">Ticket No.:</p>
                                            <div className="p-2">{info.ticketNo}</div>
                                        </label>

                                        <div className="flex gap-4 items-start border-b border-black pb-2">
                                            <label className="grid gap-1 text-sm">
                                                <div className="font-bold">Name: {info.offender}</div>
                                                <div className="font-bold">College: {info.college}</div>
                                                <div className="font-bold">Course, Year & Section: {info.course}</div>
                                            </label>
                                        </div>
                                        <label className="flex gap-3 text-sm w-full lg:w-96">
                                            <p className="font-bold">Act of Misconduct: </p>
                                            <div> {info.actionOfDiscipline}</div>
                                        </label>
                                        <label className="flex gap-3 text-sm">
                                            <p className="font-bold">Date of Incident: </p>
                                            <div> {info.dateOfIncident}</div>
                                        </label>
                                        <label className="flex gap-3 text-sm">
                                            <p className="font-bold">Place/Platform of Incident: </p>
                                            <div> {info.platformOfIncident}</div>
                                        </label>
                                        <label className="flex gap-3 text-sm">
                                            <p className="font-bold">Rate of Occurence: </p>
                                            <div> {info.rateOfOccurence}</div>
                                        </label>
                                        <label className="flex gap-3 text-sm w-full lg:w-96">
                                            <p className="font-bold">Brief Description of the Situation: </p>
                                            <div> {info.describeTheSituation}</div>
                                        </label>
                                        <label onClick={() => handleSetImage(info.attachment)} className="flex gap-3 text-sm">
                                            <p className="font-bold">Attachment: </p>
                                            <div>{info.attachment ? (info.attachment).slice(-8) : "No attachment"}</div>
                                        </label>
                                        {seeImage && info.attachment !== "" && <InformationModal>
                                            <div className="absolute top-1 right-1">
                                                <button type="button"
                                                    onClick={() => setSeeImage(false)} className="rounded-full text-red-600 bg-white">
                                                    <AiFillCloseCircle size={30} /></button>
                                            </div>
                                            <div className="relative p-6">
                                                <Link href={imageToView} target="blank" className="h-96">
                                                    <Image width={400} height={200}
                                                        className="object-fill h-96 w-96"
                                                        src={imageToView} alt="attachment" />
                                                </Link>
                                            </div>
                                        </InformationModal>}

                                    </div>

                                    <div className="border px-8 bg-white py-4 border-black">
                                        <label className="grid gap-1 text-sm">
                                            <p className="font-bold pb-1 text-lg">REPORT HOLDER DETAILS </p>
                                            <div className="font-bold">Name:  {info.reporter.name}</div>
                                            <div className="font-bold">College:  {info.reporter.college}</div>
                                            <div className="font-bold">Course, year and section: {info.reporter.yearLevel}</div>
                                            <div className="font-bold">Email:  {info.reporter.email}</div>
                                        </label>
                                    </div>
                                </div>
                                {loading && <InformationModal>
                                    <div className="grid justify-center text-white bg-red-800 p-10">
                                        <div>Redirecting where you left.</div>
                                        <p className="text-center">Please wait...</p>
                                    </div>
                                </InformationModal>}

                                <div className="grid text-sm gap-2">
                                    <div className="border bg-white grid gap-1 border-black p-4">
                                        <p className="font-bold text-lg">SANCTION</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-sm">Kind of Offense:</p>
                                            <div className="flex justify-end">
                                                {info.kindOfOffense}
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-6 gap-2">
                                            <p className="font-bold text-sm">Degree of Offense:</p>
                                            <div className="flex justify-end">
                                                {info.degreeOfOffense}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border bg-white grid border-black p-4">
                                        <p className="font-bold text-lg">NOTES</p>
                                        <p className="italic text-xs">Further details in accordance with the sanction.</p>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            rows="6"
                                            cols="30"
                                            placeholder="Further Details"
                                            className="mb-8 bg-gray-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </InformationModal>
            }

            <div className="md:mx-10 mx-1 mb-14 border border-red-700 border-2">
                {data && data.length > 0 ?
                    <StudentHistoryDatagridview
                        setOpenINfo={setOpenINfo}
                        setClickedID={setClickedID}
                        tableData={data}
                        status={status}
                        handleGetData={handleGetData}
                    /> : <div className="flex justify-center p-10 inset-0">No records found</div>}
            </div>
        </AdminMenu >
    );
}

export default Page;
