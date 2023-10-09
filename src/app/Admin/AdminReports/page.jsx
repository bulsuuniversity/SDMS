"use client"

import ReportsDatagridview from "./ReportsDatagridview";
import { useEffect, useState } from "react";
import InformationModal from "@/utils/InformationModal";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Image from "next/image";
import { url, headers } from "@/app/libs/api";
import axios from "axios";
import AdminMenu from "@/components/AdminMenu";
import { GiCheckMark } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineEmail, MdDateRange } from "react-icons/md";
import SendMessage from "@/components/SendMessage";
import { ImNewspaper } from "react-icons/im";
import useConfirmation from "@/utils/ConfirmationHook";
import useLoading from "@/utils/Loading";
import { DateRangePicker } from 'react-date-range';
import Link from "next/link";
import { FcApprove } from "react-icons/fc";

const Page = () => {
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    const [openMessage, setOpenMessage] = useState(false)
    const [sentEmail, setSentEmail] = useState()
    const [success, setSuccess] = useState(false)
    const [imageToView, setImageToView] = useState()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const { startLoading, loading, stopLoading } = useLoading()
    const [status, setStatus] = useState(false)
    const [notes, setNotes] = useState()
    const [degreeOfOffense, setDegreeOfOffense] = useState()
    const [kindOfOffense, setKindOfOffense] = useState()
    const [filterReports, setFilterReports] = useState()
    const [openDate, setOpenDate] = useState(false)
    const [selectedRange, setSelectedRange] = useState(() => {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);

        return {
            startDate: startOfMonth,
            endDate: endOfMonth,
            key: 'selection',
        };
    });

    const handleDateRangeChange = (ranges) => {
        setSelectedRange(ranges.selection);
    };

    const filterAndSortData = () => {
        const startDate = selectedRange.startDate;
        const endDate = selectedRange.endDate;


        const filteredData = filterReports && filterReports.filter(item => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= startDate && itemDate <= endDate;
        });
        const sortedData = filteredData && filteredData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        return sortedData;
    };

    const filteredAndSortedData = filterAndSortData();

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
            setSuccess('Cleared')
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg rounded-t-lg w-full'><FcApprove size={32} />Clear Report</div>
            <p className='text-lg p-6'>Are you sure you want to clear this report?</p>
        </div>, () => {
            handleUpdateReport()
            handleUpdateApi()
        });
    };

    const handleAskUpdateReport = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg rounded-t-lg w-full'><FcApprove size={32} />Update Case</div>
            <p className='text-lg p-6'>Are you sure you want to update this case?</p>
        </div>, () => {
            handleUpdateReport()
        });
    };

    const sanctions = {
        degreeOfOffense,
        kindOfOffense,
        notes
    }


    const handleUpdateReport = async () => {
        startLoading()
        try {
            const response = await axios.put(`${url}/api/AdminUpdateReport/${info.id}`,
                { sanctions: sanctions }, { headers });
            handleGetData()
            stopLoading()
            setSuccess('Updated')
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

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

    const data = filteredAndSortedData &&
        Object.values(filteredAndSortedData).filter(report =>
            report.status === `${status ? 'Cleared' : 'Pending'}`)


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



    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const formattedDate = tomorrow.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const suggestions = {
        one: `Good day! We request you to please attend the meeting on ${formattedDate} in Room 216B (9:00AM). Your attendance is a must for the proceeding of your ongoing case. Further details will be discussed on the said meeting. Thank you.`,
        // two: "Sorry, can you provide more details for further assistance?"
    }



    return (
        <AdminMenu>
            <div className="m-7 flex items-center">
                <ImNewspaper size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                <p className="font-bold text-lg">Reports</p>
                <div className="flex gap-10 py-2 ml-4 px-4 justify-center items-center">
                    <div className="flex p-2 items-center rounded-lg">
                        <p className="font-bold text-red-700">Filter: </p>
                        <button className="bg-red-700 rounded-lg px-4 py-1 text-white flex"
                            onClick={() => setOpenDate(!openDate)}>Select Date <MdDateRange size={24} /></button>
                        {openDate && <InformationModal>
                            <div className="relative">
                                <div className="absolute -top-4 -right-4">
                                    <button
                                        onClick={() => setOpenDate(!openDate)} className="rounded-full text-red-600 bg-white">
                                        <AiFillCloseCircle size={30} /></button>
                                </div>
                                <DateRangePicker
                                    ranges={[selectedRange]}
                                    onChange={handleDateRangeChange}
                                />
                            </div>
                        </InformationModal>}
                    </div>
                    <div className={`rounded-full mr-5 p-1 text-white bg-red-700 w-max flex ${status ? 'justify-start' : 'justify-end'}`}>
                        {status && <div className="grid items-center mx-4">Pending</div>}
                        <button onClick={handleChangeStatus} className={`rounded-full px-2 bg-amber-500 border boder-black`}>
                            {status ? 'Cleared' : 'Pending'}</button>
                        {!status && <div className="grid items-center mx-4">Cleared</div>}
                    </div>
                    <div className="font-bold text-red-700 grid items-center"> Number of {!status ? 'Pending' : 'Cleared'} reports: {data && data.length}
                    </div>
                </div>

            </div>




            {openInfo && info && <InformationModal>
                {openMessage && info &&
                    <SendMessage
                        suggestions={suggestions}
                        sentEmail={sentEmail}
                        setSentEmail={setSentEmail}
                        email={info.reporter.email}
                        setClose={setOpenMessage} />}
                <form onSubmit={(e) => handleUpdate(e)} className="grid bg-gray-500 relative grid-cols-2 gap-4 p-4">
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
                                    <div className="font-bold">Course, Year & Section: {info.yearLevel}</div>
                                </label>
                            </div>
                            <label className="flex gap-3 text-sm w-72">
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
                            <label className="flex gap-3 text-sm">
                                <p className="font-bold">Brief Description of the Situation: </p>
                                <div> {info.describeTheSituation}</div>
                            </label>
                            <label onClick={() => handleSetImage(info.attachment)} className="flex gap-3 text-sm">
                                <p className="font-bold">Attachment: </p>
                                <div>{info.attachment ? (info.attachment).slice(-8) : "No attachment"}</div>
                            </label>
                            {seeImage && info.attachment !== "" && <InformationModal>
                                <div className="relative p-6">
                                    <Link href={imageToView} target="blank" className="h-96">
                                        <Image width={400} height={200}
                                            className="object-fill h-96 w-96"
                                            src={imageToView} alt="attachment" />
                                    </Link>
                                    <div className="absolute -top-4 -right-4">
                                        <button
                                            onClick={() => setSeeImage(false)} className="rounded-full text-red-600 bg-white">
                                            <AiFillCloseCircle size={30} /></button>
                                    </div>

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



                    <div className="absolute -top-4 -right-4">
                        <button
                            onClick={() => setOpenINfo(false)} className="rounded-full text-red-600 bg-white">
                            <AiFillCloseCircle size={30} />
                        </button>
                    </div>

                    <ConfirmationDialog />
                    {success && <InformationModal>
                        <div className='bg-white grid p-10 rounded-lg gap-4'>
                            <div className="flex justify-center">
                                <AiOutlineCheckCircle size={32} />
                            </div>
                            <p>{success === 'Updated' && 'Updated'}{success === 'Cleared' && 'Cleared'} Successfully!</p>
                            <div className="flex justify-center">
                                <button onClick={() => setSuccess('')} className='bg-green-600 text-white w-max rounded-lg py-2 px-4'>Okay</button>
                            </div>
                        </div>
                    </InformationModal>}
                    {loading && <InformationModal>
                        <div className="grid justify-center text-white bg-red-800 p-10">
                            <div>Redirecting where you left.</div>
                            <p className="text-center">Please wait...</p>
                        </div>
                    </InformationModal>}





                    <div className="grid text-sm gap-2">
                        <div className="border bg-white grid gap-1 border-black p-4">
                            <p className="font-bold text-lg">SANCTION</p>
                            <div className="flex gap-2">
                                <p className="font-bold text-sm">Kind of Offense:</p>
                                <div className="flex justify-end">
                                    <select onChange={(e) => setKindOfOffense(e.target.value)} className="w-36" required>
                                        <option value={info.kindOfOffense ? info.kindOfOffense : ''}>{info.kindOfOffense ? info.kindOfOffense : 'Select Kind of Offense'}</option>
                                        <option value={'Light Offense'}>Light Offense</option>
                                        <option value={'Less Grave Offense'}>Less Grave Offense</option>
                                        <option value={'Grave Offense'}>Grave Offense</option>
                                        <option value={'Dishonesty on Academic Pursuit'}>Dishonesty on Academic Pursuit</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex mb-6 gap-2">
                                <p className="font-bold text-sm">Degree of Offense:</p>
                                <div className="flex justify-end">
                                    <select onChange={(e) => setDegreeOfOffense(e.target.value)} className="w-36" required>
                                        <option value={info.degreeOfOffense ? info.degreeOfOffense : ""}>{info.degreeOfOffense ? info.degreeOfOffense : "Select Degree of Offense"}</option>
                                        <option value={'1st Offense'}>1st Offense</option>
                                        <option value={'2nd Offense'}>2nd Offense</option>
                                        <option value={'3rd Offense'}>3rd Offense</option>
                                        <option value={`4th Offense(for applicable or special cases)`}>4th Offense&#40;for applicable or special cases&#41;</option>
                                    </select>
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
                                required />
                        </div>

                        <div className="flex py-4 gap-4">
                            <button type="button" onClick={() => setOpenMessage(true)} className="flex gap-2 items-center bg-amber-400 px-2 py-1"><MdOutlineEmail size={20} /> Message</button>
                            <button type="button" onClick={handleAskUpdateReport} className="flex gap-2 items-center bg-amber-400 px-2 py-1"><GrUpdate size={20} /> Update</button>
                            {info.status === "Pending" && <button type="submit" className="flex gap-2 items-center bg-green-600 px-2 py-1"><GiCheckMark size={20} /> Clear</button>}
                        </div>

                    </div>



                </form>
            </InformationModal>}

            <div className="md:mx-10 mx-1 mb-14 border border-red-700 border-2">
                {data && data.length > 0 ?
                    <ReportsDatagridview
                        setOpenINfo={setOpenINfo}
                        setClickedID={setClickedID}
                        tableData={data}
                        status={status}
                        handleGetData={handleGetData}
                    /> : <div className="flex justify-center p-10 inset-0">No records found</div>}
            </div>
        </AdminMenu>
    );
}

export default Page;