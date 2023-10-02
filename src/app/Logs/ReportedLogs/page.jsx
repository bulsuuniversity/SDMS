"use client"

import DataGridView from "@/utils/DataGridView";
import LogsLayout from "@/components/LogsLayout";
import { useReportData } from "@/app/libs/store";
import { useEffect, useState } from "react";
import InformationModal from "@/utils/InformationModal";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { useProfileData } from "@/app/libs/store";

const Page = () => {
    const { reportData } = useReportData()
    const { profileData } = useProfileData()
    const [clickedID, setClickedID] = useState()
    const [seeImage, setSeeImage] = useState(false)
    const [info, setInfo] = useState()
    const [openInfo, setOpenINfo] = useState(false)
    const [data, setData] = useState(
        {
            zero: "",
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
        })

    const reports = reportData && Object.values(reportData).filter(student => student.reporter.id === profileData.id);
    useEffect(() => {
        getReportData(profileData.id)
    }, [profileData])
    useEffect(() => {
        if (reports) {
            const formattedData = reports.map((data) => ({
                zero: data.dateOfIncident,
                one: data.id,
                two: data.offender,
                three: data.actionOfDiscipline,
                four: data.sentMessage,
                five: data.status,
            }));
            setData(formattedData)
        }
    }, [])

    const headerData = [
        "DATE OF INCIDENT",
        "TICKET NO.",
        "OFFENDER",
        "INCIDENT",
        "MESSAGE",
        "STATUS",
    ]

    useEffect(() => {
        const clcikedInfo = Object.values(reportData).find(selfConsul => selfConsul.id === clickedID);
        setInfo(clcikedInfo)
    }, [clickedID])

    return (
        <LogsLayout>
            {openInfo && info && <InformationModal>
                <div className="relative p-6">
                    <div className="absolute -top-4 -right-4">
                        <button
                            onClick={() => setOpenINfo(false)} className="rounded-full text-red-600 bg-white">
                            <AiFillCloseCircle size={30} /></button>
                    </div>
                    <div className="grid gap-4 justify-center items-center">
                        <h2 className="text-center text-lg font-bold">Reported Case</h2>
                        <div className="grid gap-4 text-xs">
                            <label className="flex gap-3 justify-center items-center">
                                <p className="font-bold">Ticket No.:</p>
                                <div className="bg-gray-300 p-2">{info.id}</div>
                            </label>
                            <label className="flex gap-3">
                                <p className="font-bold">Act of Indiscipline: </p>
                                <div className="w-52"> {info.actionOfDiscipline}</div>
                            </label>
                            <label className="grid">
                                <p className="font-bold">Offender Details: </p>
                                <div className="indent-5">Name: {info.offender}</div>
                                <div className="indent-5">College: {info.college}</div>
                                <div className="indent-5">Course, year & section: {info.course}</div>

                            </label>
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
                            <label onClick={() => setSeeImage(true)} className="flex gap-3">
                                <p className="font-bold">View Attachment: </p>
                                <div>{info.attachment ? (info.attachment).slice(-8) : "No attachment"}</div>
                            </label>
                            {seeImage && info.attachment !== "" && <InformationModal>
                                <div className="relative p-6">
                                    <div className="h-96">
                                        <Image width={400} height={200}
                                            className="object-fill h-96 w-96"
                                            src={info.attachment} alt="attachment" />
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
                </div>
            </InformationModal>}
            <div className="mx-10 my-6 border border-blue-400 border-2">
                {data && data.length > 0 ? <DataGridView
                    setOpenINfo={setOpenINfo}
                    setClickedID={setClickedID}
                    headerData={headerData}
                    tableData={data} /> : <div>No Logs Found</div>}
            </div>
        </LogsLayout>
    );
}

export default Page;