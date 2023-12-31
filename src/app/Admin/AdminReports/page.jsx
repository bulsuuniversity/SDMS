"use client"

import ReportsDatagridview from "./ReportsDatagridview";
import { useEffect, useState, useRef } from "react";
import InformationModal from "@/utils/InformationModal";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Image from "next/image";
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
import { useRouter, useSearchParams } from "next/navigation";
import { GoSearch } from "react-icons/go";
import PrintCert from "@/utils/PrintCert";
import History from "./StudentHistory/History";
import SearchHistory from "./SearchHistory/SearchHistory";
import reportsData from "@/utils/reportsData";

const Page = () => {
    const [history, setHistory] = useState(false)
    const [fetchedSemester, setFetchedSemester] = useState()
    const [searchHistory, setSearchHistory] = useState(false)
    const [clickedID, setClickedID] = useState()
    const [openFilter, setOpenFilter] = useState(false)
    const [seeImage, setSeeImage] = useState(false)
    const [print, setPrint] = useState(false)
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
    const componentRef = useRef();
    const [selectedRange, setSelectedRange] = useState(
        () => {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);

            if (fetchedSemester) {
                const [year, month, day] = fetchedSemester.start.split('-').map(Number);
                const [endYear, endMonth, endDay] = fetchedSemester.end.split('-').map(Number);
                const fetchedStartDate = new Date(year, month - 1, day);
                const fetchedEndDate = new Date(endYear, endMonth - 1, endDay);
                return {
                    startDate: fetchedStartDate,
                    endDate: fetchedEndDate,
                    key: 'selection',
                };
            }

            return {
                startDate: startOfMonth,
                endDate: endOfMonth,
                key: 'selection',
            };
        }
    );

    const [viewArchivedReports, setViewArchivedReports] = useState(false);




    const handleGetSemester = async () => {
        setFetchedSemester({
            "_id": {
                "$oid": "65638d04e79c5f92243b45f6"
            },
            "start": "2023-10-01",
            "end": "2023-12-20",
            "sy": "2023-2023",
            "createdAt": {
                "$date": "2023-11-26T18:23:00.309Z"
            },
            "updatedAt": {
                "$date": "2023-12-01T04:09:16.634Z"
            }
        })
    };



    const searchParams = useSearchParams()
    const newReport = searchParams.get('new')
    const router = useRouter()

    useEffect(() => {
        if ("newReport" === newReport) {
            handleGetData()
            router.push("/Admin/AdminReports")
        }
    }, [newReport])

    const handleDateRangeChange = (ranges) => {
        setSelectedRange(ranges.selection);
    };

    const filterAndSortData = () => {
        const startDate = selectedRange?.startDate;
        const endDate = selectedRange?.endDate;


        const filteredData = filterReports && filterReports.filter(item => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= startDate && itemDate <= endDate;
        });
        const sortedData = filteredData && filteredData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        return sortedData;
    };

    const filteredAndSortedData = filterReports;

    const handleChangeStatus = () => {
        handleGetData()
        setStatus(!status)
    }

    const handleUpdateApi = async () => {
        startLoading()
        stopLoading()
        setSuccess('Cleared')
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-slate-700 flex items-center text-white gap-4 rounded-t-lg rounded-t-lg w-full'><FcApprove size={32} />Clear Report</div>
            <p className='text-lg p-6'>Are you sure you want to clear this report?</p>
        </div>, () => {
            handleUpdateReport()
            handleUpdateApi()
        });
    };

    const handleAskUpdateReport = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-slate-700 flex items-center text-white gap-4 rounded-t-lg rounded-t-lg w-full'><FcApprove size={32} />Update Case</div>
            <p className='text-lg p-6'>Are you sure you want to update this case?</p>
        </div>, () => {
            handleUpdateReport()
        });
    };


    const handleUpdateReport = async () => {
        startLoading()
        stopLoading()
        setSuccess('Updated')
    }

    const handleSetImage = (image) => {
        setImageToView(image)
        setSeeImage(true)
    }

    const handleGetData = async () => {
        setFilterReports(reportsData)
    }

    const minDateString = fetchedSemester && fetchedSemester.start;
    const [minYear, minMonth, minDay] = minDateString ? minDateString.split('-').map(Number) : [0, 0, 0];
    const minDate = `${minYear}, ${minMonth}, ${minDay}`;

    const maxDateString = fetchedSemester && fetchedSemester.end;
    const [maxYear, maxMonth, maxDay] = maxDateString ? maxDateString.split('-').map(Number) : [0, 0, 0];
    const maxDate = `${maxYear}, ${maxMonth}, ${maxDay}`;

    const lastDayOfTheMonth = new Date(minYear, minMonth, 0).getDate();

    const dayBeforeMindate = `${minYear}, ${minDay !== 1 ? minMonth : minMonth - 1}, ${minDay !== 1 ? minDay - 1 : lastDayOfTheMonth - 1}`;

    const handleCheckboxChange = (event) => {
        setViewArchivedReports(event.target.checked);
    };



    useEffect(() => {
        if (viewArchivedReports) {
            setSelectedRange({
                startDate: null,
                endDate: new Date(dayBeforeMindate),
                key: 'selection',
            })
        } else if (!viewArchivedReports) {
            setSelectedRange({
                startDate: fetchedSemester?.start ? new Date(fetchedSemester.start) : null,
                endDate: fetchedSemester?.end ? new Date(fetchedSemester.end) : null,
                key: 'selection',
            });
        }
    }, [viewArchivedReports, fetchedSemester])



    const [yearLevel, setYearLevel] = useState()
    const [college, setCollege] = useState()
    const [search, setSearch] = useState()


    const data = filteredAndSortedData &&
        Object.values(filteredAndSortedData).filter(report => {
            const statusCondition = report && report.status === (status ? 'Cleared' : 'Pending');
            const searchCondition = report && report.offender && (search ? report.offender.toLowerCase().includes(search.toLowerCase()) : true)
            const yearLevelCondition = !yearLevel || report && report.course && report.course.includes(yearLevel);
            const collegeCondition = !college || report && report.college === college;
            return statusCondition && collegeCondition && yearLevelCondition && searchCondition;
        });



    useEffect(() => {
        handleGetData()
        handleGetSemester()
    }, [])

    const searchID = useSearchParams()
    const id = searchID.get('id') && searchID.get('id').toString();

    useEffect(() => {
        const clcikedInfo = data && id && Object.values(data).find(selfConsult => selfConsult.id === id);
        setInfo(clcikedInfo)
    }, [id])

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
    }

    const handleClearFilter = () => {
        if (viewArchivedReports) {
            setSelectedRange({
                startDate: null,
                endDate: new Date(dayBeforeMindate),
                key: 'selection',
            })
        } else if (!viewArchivedReports) {
            setSelectedRange({
                startDate: fetchedSemester?.start ? new Date(fetchedSemester.start) : null,
                endDate: fetchedSemester?.end ? new Date(fetchedSemester.end) : null,
                key: 'selection',
            });
        }
        setYearLevel()
        setCollege()
        setOpenFilter(!openFilter)
    }

    const handleConfirm = (e) => {
        setOpenFilter(!openFilter)
    }

    const handleClose = () => {
        setSuccess("")
        setSuccess(!success)
    }
    const handleSearch = (e) => {
        setSearch(e)
    }

    return (
        <AdminMenu>
            <div className="m-7 flex items-center">
                <ImNewspaper size={50} /> <p className="border border-2 border-black h-16 mx-4" />
                <p className="font-bold text-lg">Reports</p>
                <div className="flex flex-wrap gap-10 py-2 ml-4 px-4 justify-center items-center">

                    <div className="flex gap-4 relative items-center">
                        <p className=" text-slate-700 font-semibold">Filter: </p>
                        <button className="bg-slate-700 text-white px-4 py-2 whitespace-normal rounded-full"
                            onClick={() => setOpenFilter(!openFilter)}>Select Filter</button>
                        {openFilter && <div className="grid p-6 bg-white z-50 absolute top-0 border gap-4 w-max">
                            <div className="flex p-2 items-center rounded-lg">
                                {/* <p className="font-bold text-slate-700">By Date: </p>
                                <button className="bg-slate-700 rounded-lg px-4 py-1 text-white flex"
                                    onClick={() => setOpenDate(!openDate)}>Select Date <MdDateRange size={24} /></button>
                                {openDate && <InformationModal>
                                    <div className="relative">
                                        <div className="absolute -top-8 -right-9">
                                            <button
                                                onClick={() => setOpenDate(!openDate)} className="rounded-full text-slate-600 bg-white">
                                                <AiFillCloseCircle size={44} /></button>
                                        </div>
                                        <DateRangePicker
                                            ranges={[selectedRange]}
                                            onChange={handleDateRangeChange}
                                            minDate={viewArchivedReports ? undefined : new Date(minDate)}
                                            maxDate={new Date(viewArchivedReports ? dayBeforeMindate : maxDate)}
                                            staticRanges={[]}
                                            inputRanges={[]}
                                        />
                                    </div>
                                </InformationModal>} */}
                            </div>
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
                                    {/* <option value="5">5</option> */}
                                </select>
                            </div>
                            <div className="flex justify-between w-full">
                                <button onClick={handleClearFilter}
                                    className="bg-slate-700 rounded-full px-4 py-2 text-white">Clear Filter</button>
                                <button onClick={handleConfirm}
                                    className="bg-slate-700 rounded-full px-4 py-2 text-white">Confirm</button>
                            </div>
                        </div>}
                    </div>
                    <div className={`rounded-full mr-5 p-1 text-white bg-slate-700 w-max flex ${status ? 'justify-start' : 'justify-end'}`}>
                        {status && <div className="grid items-center mx-4">Pending</div>}
                        <button onClick={handleChangeStatus} className={`rounded-full px-2 bg-amber-500 border boder-black`}>
                            {status ? 'Cleared' : 'Pending'}</button>
                        {!status && <div className="grid items-center mx-4">Cleared</div>}
                    </div>
                    <button type="button" className="m-3 rounded-full bg-slate-700 text-white px-4 py-2"
                        onClick={() => setSearchHistory(!searchHistory)}>Reports History</button>
                    {searchHistory &&
                        <SearchHistory setSearchHistory={setSearchHistory} />
                    }
                </div>
            </div>
            <div className="flex my-6 mx-6 justify-between">
                <div className="font-semibold text-slate-700 grid items-center"> Number of {!status ? 'Pending' : 'Cleared'} reports: {data && data.length}
                </div>
                <div className="rounded-full flex border border-2 border-slate-700 bg-slate-700 items-center">
                    <input
                        className="rounded-l-full pl-2 focus:outline-none py-2"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search Name" />
                    <GoSearch className="mx-2 text-white" size={25} />
                </div>
                <div className="flex font-semibold text-slate-700 items-center gap-2">
                    <input type="checkbox" onChange={handleCheckboxChange} />
                    <label>View Archived Reports</label>
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
                        <form onSubmit={(e) => handleUpdate(e)} className="overflow-y-auto h-full bg-opacity-50 bg-gray-200">
                            <div className="bg-gray-500 p-4 m-4 relative grid-cols-2 grid gap-4">
                                <div className="absolute -top-4 -right-4">
                                    <button
                                        onClick={() => setOpenINfo(false)} className="rounded-full text-slate-600 bg-white">
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
                                            {/* <Link className="m-3 rounded-full bg-slate-700 text-white px-4 py-2"
                                                href={`/Admin/AdminReports/StudentHistory/?student=${info.offender}`}>History</Link> */}
                                            <button type="button" className="m-3 rounded-full bg-slate-700 text-white px-4 py-2"
                                                onClick={() => setHistory(!history)}>History</button>
                                            {history &&

                                                <History student={info.offender} setHistory={setHistory} />

                                            }
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
                                                    onClick={() => setSeeImage(false)} className="rounded-full text-slate-600 bg-white">
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





                                <ConfirmationDialog />
                                {success && <InformationModal>
                                    <div className='bg-white grid p-10 rounded-lg gap-4'>
                                        <div className="flex justify-center">
                                            <AiOutlineCheckCircle size={32} />
                                        </div>
                                        <p>{success === 'Updated' && 'Updated'}{success === 'Cleared' && 'Cleared'} Successfully!</p>
                                        <div className="flex justify-center">
                                            <button onClick={handleClose}
                                                className='bg-green-600 text-white w-max rounded-lg py-2 px-4'>Okay</button>
                                        </div>
                                    </div>
                                </InformationModal>}
                                {loading && <InformationModal>
                                    <div className="grid justify-center text-white bg-slate-800 p-10">
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
                                                <select onChange={(e) => setKindOfOffense(e.target.value)} className="w-36" required>
                                                    <option value={info.kindOfOffense ? info.kindOfOffense : ''}>{info.kindOfOffense ? info.kindOfOffense : 'Select Kind of Offense'}</option>
                                                    <option value={'Light Offense'}>Light Offense</option>
                                                    <option value={'Less Grave Offense'}>Less Grave Offense</option>
                                                    <option value={'Grave Offense'}>Grave Offense</option>
                                                    <option value={'Dishonesty on Academic Pursuit'}>Dishonesty on Academic Pursuit</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-6 gap-2">
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

                                    {!viewArchivedReports && <div className="border bg-white grid border-black p-4">
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

                                        <button type="button" onClick={() => setPrint(!print)}
                                            className="px-4 py-2 bg-slate-700 text-white">Report Clearance</button>
                                        {print && <PrintCert content={info} setPrint={setPrint} contentRef={componentRef} />}
                                    </div>}

                                    {!viewArchivedReports && <div className="flex justify-center items-center h-max my-auto gap-4">
                                        <button type="button" onClick={() => setOpenMessage(true)} className="flex gap-2 items-center bg-amber-400 p-4"><MdOutlineEmail size={20} /> Message</button>
                                        <button type="button" onClick={handleAskUpdateReport} className="flex gap-2 items-center bg-amber-400 p-4"><GrUpdate size={20} /> Update</button>
                                        {info.status === "Pending" && <button type="submit" className="flex gap-2 items-center bg-green-600 p-4"><GiCheckMark size={20} /> Clear</button>}
                                    </div>}
                                </div>
                            </div>
                        </form>
                    </div>
                </InformationModal>
            }

            <div className="md:mx-10 mx-1 mb-14 border border-slate-700 border-2">
                {data && data.length > 0 ?
                    <ReportsDatagridview
                        setOpenINfo={setOpenINfo}
                        setClickedID={setClickedID}
                        tableData={data.reverse()}
                        status={status}
                        handleGetData={handleGetData}
                    /> : <div className="flex justify-center p-10 inset-0">No records found</div>}
            </div>
        </AdminMenu >
    );
}

export default Page;
