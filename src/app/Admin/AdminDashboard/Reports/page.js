"use client"

import DashboardLayout from "../DashboardLayout";
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { url, headers } from "@/app/libs/api";
import { useState, useEffect } from "react";
import useLoading from "@/utils/Loading";
import ReportedCasesLegends from "./ReportedCasesLegends";
import ReportedStudentsLegends from "./ReportedStudentsLegends";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Dishonesty from "./Dishonesty";
import GraveOffenses from "./GraveOffenses";
import LessGraveOffenses from "./LessGraveOffenses";
import LightOffenses from "./LightOffenses";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Page = () => {
    const [filterReports, setFilterReports] = useState()
    const { loading, startLoading, stopLoading } = useLoading()
    const [status, setStatus] = useState(true)

    const handleChangeStatus = () => {
        setStatus(!status)
    }

    const handleGetData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/studentReport`, { headers });
            const responseData = response.data
            setFilterReports(responseData)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }


    const reports = filterReports && Object.values(filterReports).filter(report => report.status === `${!status ? 'Cleared' : 'Pending'}`)

    const lightOffenses = reports ? (Object.values(reports).filter(report =>
        (report.actionOfDiscipline).includes("Littering") ||
        (report.actionOfDiscipline).includes("Unauthorized") ||
        (report.actionOfDiscipline).includes("Vandalism") ||
        (report.actionOfDiscipline).includes("Disturbance")
    ).length) : 1;
    const lessGraveOffenses = reports ? (Object.values(reports).filter(report =>
        (report.actionOfDiscipline).includes("Smoking") ||
        (report.actionOfDiscipline).includes("Malicious") ||
        (report.actionOfDiscipline).includes("Deception") ||
        (report.actionOfDiscipline).includes("Damage") ||
        (report.actionOfDiscipline).includes("Disrespectful")
    ).length) : 1;
    const graveOffenses = reports ? (Object.values(reports).filter(report =>
        (report.actionOfDiscipline).includes("Theft") ||
        (report.actionOfDiscipline).includes("Indecency") ||
        (report.actionOfDiscipline).includes("Physical") ||
        (report.actionOfDiscipline).includes("Carrying") ||
        (report.actionOfDiscipline).includes("Possession")
    ).length) : 1;
    const dishonesty = reports ? (Object.values(reports).filter(report =>
        (report.actionOfDiscipline).includes("Cheating") ||
        (report.actionOfDiscipline).includes("Plagiarism") ||
        (report.actionOfDiscipline).includes("Falsification")
    ).length) : 1;
    const Others = reports ? reports.length - (lightOffenses + lessGraveOffenses + graveOffenses + dishonesty) : 1

    const reportedAction = { lightOffenses, lessGraveOffenses, graveOffenses, dishonesty, Others }



    const CBA = reports ? (Object.values(reports).filter(reportedStudent => reportedStudent.college === "CBA")).length : 1
    const CIT = reports ? (Object.values(reports).filter(reportedStudent => reportedStudent.college === "CIT")).length : 1
    const COED = reports ? (Object.values(reports).filter(reportedStudent => reportedStudent.college === "COED")).length : 1
    const CICS = reports ? (Object.values(reports).filter(reportedStudent => reportedStudent.college === "CICS")).length : 1
    const COE = reports ? (Object.values(reports).filter(reportedStudent => reportedStudent.college === "COE")).length : 1
    const OthersCollege = reports ? reports.length - (CBA + CIT + COED + CICS + COE) : 1

    const reportedStudent = { CBA, CIT, COED, CICS, COE, OthersCollege }

    useEffect(() => {
        handleGetData()
    }, [])


    const pieOptions = {
        responsive: true,
        plugins: {
            legend: false,
            datalabels: {
                // display: 'auto',
                color: 'black',
                borderColor: "#fff",
                textStrokeColor: 'white',
                textStrokeWidth: 2,
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    const percentage = reports
                        ? Math.round((value / reports.length) * 100) : 0;
                    return percentage === 0 ? '' : `${label}: ${percentage}%`;
                },
            },
        }
    };

    const pieOptions2 = {
        responsive: true,
        plugins: {
            legend: false,
            datalabels: {
                // display: 'auto',
                color: 'black',
                borderColor: "#fff",
                textStrokeColor: 'white',
                textStrokeWidth: 2,
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    const percentage = reports
                        ? Math.round((value / reports.length) * 100) : 0;
                    return percentage === 0 ? '' : `${label}: ${percentage}%`;
                },
            },
        }
    };

    const pieData = {
        labels: ["LIGHT OFFENSES",
            "LESS GRAVE ...",
            "GRAVE OFFENSES",
            "DISHONESTY ON ...",
            "Others"
        ],
        datasets: [
            {
                label: 'Reported Indiscipline',
                data: [lightOffenses,
                    lessGraveOffenses,
                    graveOffenses,
                    dishonesty,
                    Others],
                backgroundColor: [
                    'rgb(239, 68, 68)',
                    'rgb(34, 197, 94)',
                    'rgb(59, 130, 246)',
                    'rgb(249, 115, 22)',
                    'rgb(132, 145, 166)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const UnpieData = {
        labels: ['CBA',
            'CIT',
            'COED',
            'CICS',
            'COE',
            'Others'],
        datasets: [
            {
                label: 'Student Reported',
                data: [CBA, CIT, COED,
                    CICS, COE, OthersCollege],
                backgroundColor: [
                    'rgb(253, 224, 71)',
                    'rgb(21, 128, 61)',
                    'rgb(37, 99, 235)',
                    'rgb(156, 163, 175)',
                    'rgb(217, 119, 6)',
                    'rgb(109, 40, 217)'
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <DashboardLayout>
            <div className="px-14">
                {loading && <div>Loading...</div>}
                {reports && reports.length < 0 ? <div className="inset-0">No Records Found</div> :
                    <>
                        <div className="flex gap-10 justify-center item-center my-6">
                            <div className={`rounded-full mr-5 p-1 text-white bg-gray-500 w-max flex ${status ? 'justify-start' : 'justify-end'}`}>
                                {!status && <div className="grid items-center mx-4">Pending</div>}
                                <button onClick={handleChangeStatus} className={`rounded-full px-4 bg-amber-500 py-2 border boder-black`}>
                                    {!status ? 'Cleared' : 'Pending'}</button>
                                {status && <div className="grid items-center mx-4">Cleared</div>}
                            </div>
                            <div className="font-bold grid items-center"> Number of {status ? 'Pending' : 'Cleared'} reports: {reports && reports.length}</div>
                        </div>
                        <div className="overflow-y-auto grid bg-blue-100 justify-center gap-10 max-h-96 pb-6">
                          
                            <LightOffenses reports={reports} status={status} />
                            <LessGraveOffenses reports={reports} status={status} />
                            <GraveOffenses reports={reports} status={status} />
                            <Dishonesty reports={reports} status={status} />

                            <h2 className="font-bold flex py-4 justify-center">
                                REPORTED ACTIONS&#40;{status ? 'Pending' : 'Cleared'}&#41;
                            </h2>
                            <div className="flex items-center p-5 gap-5 ">
                                <div className="w-60 h-60 m-4">
                                    <Pie data={pieData} options={pieOptions} />
                                </div>
                                {reports && <ReportedCasesLegends data={reportedAction} />}
                            </div>
                            <h2 className="font-bold flex py-4 justify-center">
                                REPORTED STUDENTS&#40;{status ? 'Pending' : 'Cleared'}&#41;
                            </h2>
                            <div className="flex items-center p-5 gap-5 ">
                                <div className="w-60 h-60">
                                    <Pie data={UnpieData} options={pieOptions2} />
                                </div>
                                {reports && <ReportedStudentsLegends data={reportedStudent} />}
                            </div>
                        </div>
                    </>
                }
            </div>
        </DashboardLayout>
    );
}
export default Page;