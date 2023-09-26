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

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Page = () => {
    const [reports, setReports] = useState()
    const { loading, startLoading, stopLoading } = useLoading()

    const handleGetData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/studentReport`, { headers });
            const responseData = response.data
            setReports(responseData)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const Cyberbullying = reports ? (Object.values(reports).filter(report => report.actionOfDiscipline === "Cyberbullying")).length : 1
    const Misinformation = reports ? (Object.values(reports).filter(report => report.actionOfDiscipline === "Misinformation")).length : 1
    const Verbal = reports ? (Object.values(reports).filter(report => report.actionOfDiscipline === "Verbal abuse")).length : 1
    const Harrassment = reports ? (Object.values(reports).filter(report => report.actionOfDiscipline === "Harrassment")).length : 1
    const Hateful = reports ? (Object.values(reports).filter(report => report.actionOfDiscipline === "Hateful behavior")).length : 1
    const Others = reports ? reports.length - (Cyberbullying + Misinformation + Verbal + Harrassment + Hateful) : 1

    const reportedAction = { Cyberbullying, Misinformation, Verbal, Harrassment, Hateful, Others }

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
        labels: ["Cyberbullying",
            "Misinformation",
            "Verbal abuse",
            "Harrassment",
            "Hateful behavior",
            "Others",],
        datasets: [
            {
                label: 'Reported Actions',
                data: [Cyberbullying,
                    Misinformation,
                    Verbal,
                    Harrassment,
                    Hateful,
                    Others],
                backgroundColor: [
                    'rgb(253, 224, 71)',
                    'rgb(180, 83, 9)',
                    'rgb(22, 163, 74)',
                    'rgb(37, 99, 235)',
                    'rgb(156, 163, 175)',
                    'rgb(109, 40, 217)'
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

    console.log(reports && reports.length < 0)

    return (
        <DashboardLayout>
            <div className="px-14">
                {loading && <div>Loading...</div>}
                {reports && reports.length < 0 ? <div className="inset-0">No Records Found</div> :
                    <div className="overflow-y-auto grid bg-blue-100 justify-center gap-10 max-h-96 pb-6">
                        <h2 className="font-bold flex py-4 justify-center">
                            REPORTED ACTIONS
                        </h2>
                        <div className="flex items-center p-5 gap-5 ">
                            <div className="w-60 h-60 m-4">
                                <Pie data={pieData} options={pieOptions} />
                            </div>
                            {reports && <ReportedCasesLegends data={reportedAction} />}
                        </div>
                        <h2 className="font-bold flex py-4 justify-center">
                            REPORTED STUDENTS
                        </h2>
                        <div className="flex items-center p-5 gap-5 ">
                            <div className="w-60 h-60">
                                <Pie data={UnpieData} options={pieOptions2} />
                            </div>
                            {reports && <ReportedStudentsLegends data={reportedStudent} />}
                        </div>
                    </div>
                }
            </div>
        </DashboardLayout>
    );
}
export default Page;