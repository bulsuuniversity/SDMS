"use client"

import DashboardLayout from "../DashboardLayout";
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { url, headers } from "@/app/libs/api";
import { useState, useEffect } from "react";
import useLoading from "@/utils/Loading";
import RegsiteredLegends from "./RegsiteredLegends";
import UnregisteredLegends from "./UnregisteredLegends";
import { GrCheckbox } from "react-icons/gr";
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const page = () => {
    const [users, setUsers] = useState()
    const [colleges, setColleges] = useState()
    const { loading, startLoading, stopLoading } = useLoading()

    const getDetails = async () => {
        try {
            const details = await axios.get(`${url}/api/Colleges`,
                { headers });
            setColleges(details.data)

        } catch (err) {
            console.log(err)
        }
    }


    const handleGetData = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/studentAccount`, { headers });
            const responseData = response.data
            setUsers(responseData)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }


    useEffect(() => {
        handleGetData()
        getDetails()
    }, [])


    const registeredUser = users && Object.values(users).filter(user => user.status === "Verified")
    const unRegisteredUser = users && Object.values(users).filter(user => user.status !== "Verified")
    const registered = users && Math.round((registeredUser.length / users.length) * 100)
    const unRegistered = users && Math.round((unRegisteredUser.length / users.length) * 100)

    const CBA = users ? (Object.values(registeredUser).filter(user => user.college === "CBA")).length : 1
    const CIT = users ? (Object.values(registeredUser).filter(user => user.college === "CIT")).length : 1
    const COED = users ? (Object.values(registeredUser).filter(user => user.college === "COED")).length : 1
    const CICS = users ? (Object.values(registeredUser).filter(user => user.college === "CICS")).length : 1
    const COE = users ? (Object.values(registeredUser).filter(user => user.college === "COE")).length : 1

    const RegsiteredData = { CBA, CIT, COED, CICS, COE }


    const unCBA = users ? (Object.values(unRegisteredUser).filter(user => user.college === "CBA")).length : 1
    const unCIT = users ? (Object.values(unRegisteredUser).filter(user => user.college === "CIT")).length : 1
    const unCOED = users ? (Object.values(unRegisteredUser).filter(user => user.college === "COED")).length : 1
    const unCICS = users ? (Object.values(unRegisteredUser).filter(user => user.college === "CICS")).length : 1
    const unCOE = users ? (Object.values(unRegisteredUser).filter(user => user.college === "COE")).length : 1
    const Others = users ? unRegisteredUser.length - (unCBA + unCIT + unCOED + unCICS + unCOE) : 1

    const unRegsiteredData = { unCBA, unCIT, unCOED, unCICS, unCOE, Others }


    const getCollegeCount = (userList, college) => users ? Object.values(userList).filter(user => user.college === college).length : 1;

    const collegess = colleges?.map((college) => college.acronym);

    const RegsiteredDatass = collegess && Object.fromEntries(collegess?.map(college =>
        [college, getCollegeCount(registeredUser, college)]));
    const unRegsiteredDatas = collegess && Object.fromEntries([...collegess, "Others"].map(college =>
        [college, college === "Others" ? users ? unRegisteredUser.length - collegess.reduce((acc, college) =>
            acc + getCollegeCount(unRegisteredUser, college), 0) : 1 :
            getCollegeCount(unRegisteredUser, college)]));



    const data = {
        labels: ['Verified Students', 'Unverified Students'],
        datasets: [
            {
                data: [registeredUser && registeredUser.length, unRegisteredUser && unRegisteredUser.length],
                backgroundColor: ['#780000', '#494f56'],
                borderWidth: 1,
            },
        ],
    };
    const data1 = {
        labels: ['Unverified Students', 'Verified Students'],
        datasets: [
            {
                data: [unRegisteredUser && unRegisteredUser.length, registeredUser && registeredUser.length],
                backgroundColor: ['#8d8f84', '#494f56'],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        cutout: '50%',
        rotation: -90,
        circumference: 180,
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            legend: false,
            datalabels: false
        }
    };

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
                    const percentage = registeredUser
                        ? Math.round((value / registeredUser.length) * 100) : 0;
                    return percentage === 0 ? '' : `${label}: ${percentage}%`;
                },

            },
        },
    };


    const pieOptions2 = {
        responsive: true,
        plugins: {
            legend: false,
            // datalabels: false
            datalabels: {
                // display: 'auto',
                color: 'black',
                borderColor: "#fff",
                textStrokeColor: 'white',
                textStrokeWidth: 2,
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    const percentage = unRegisteredUser
                        ? Math.round((value / unRegisteredUser.length) * 100) : 0;

                    return percentage === 0 ? '' : `${label}: ${percentage}%`;
                },
            },
        }
    };


    const generatePieData = (userData, colleges) => {
        const counts = colleges?.map(college => users ? Object.values(userData).filter(user => user.college === college).length : 1);
        const total = users ? Object.values(userData).length : 1;

        return {
            labels: [...colleges, 'Unknown'],
            datasets: [
                {
                    label: 'Student Count',
                    data: [...counts, total - counts.reduce((acc, count) => acc + count, 0)],
                    backgroundColor: [
                        'rgb(202, 138, 4)',
                        'rgb(22, 163, 74)',
                        'rgb(37, 99, 235)',
                        'rgb(156, 163, 175)',
                        'rgb(217, 119, 6)',
                        'rgb(124, 58, 237)'
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    const pieData = collegess?.length > 0 && generatePieData(registeredUser, collegess);
    const UnpieData = collegess?.length > 0 && generatePieData(unRegisteredUser, collegess);




    // const pieData = {
    //     labels: ['CBA',
    //         'CIT',
    //         'COED',
    //         'CICS',
    //         'COE',
    //     ],
    //     datasets: [
    //         {
    //             label: 'Student Count',
    //             data: [CBA,
    //                 CIT,
    //                 COED,
    //                 CICS,
    //                 COE,],
    //             backgroundColor: [
    //                 'rgb(202, 138, 4)',
    //                 'rgb(22, 163, 74)',
    //                 'rgb(37, 99, 235)',
    //                 'rgb(156, 163, 175)',
    //                 'rgb(217, 119, 6)',
    //             ],
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // const UnpieData = {
    //     labels: ['CBA',
    //         'CIT',
    //         'COED',
    //         'CICS',
    //         'COE',
    //         'Unknown'],
    //     datasets: [
    //         {
    //             label: 'Student Count',
    //             data: [unCBA, unCIT, unCOED, unCICS, unCOE, Others],
    //             backgroundColor: [
    //                 'rgb(202, 138, 4)',
    //                 'rgb(22, 163, 74)',
    //                 'rgb(37, 99, 235)',
    //                 'rgb(156, 163, 175)',
    //                 'rgb(217, 119, 6)',
    //                 'rgb(124, 58, 237)'
    //             ],
    //             borderWidth: 1,
    //         },
    //     ],
    // };
    return (
        <DashboardLayout>
            <div className=" px-14">
                {loading && <div>loading...</div>}
                {users && users.length < 0 ? <div className="inset-0">No records found</div> :
                    <div className="overflow-y-auto bg-blue-100 grid justify-center gap-10 max-h-96 pb-6">
                        <h2 className="font-bold flex py-4 justify-center">
                            ACCOUNT STATUS
                        </h2>
                        <div className="flex justify-center gap-5">
                            <div>
                                <div className="w-52 relative h-44">
                                    <Doughnut data={data} options={options} />
                                    <div className="absolute text-4xl top-24 left-14">{registered}&#37;</div>
                                </div>
                                <div className="flex items-center gap-2 justify-center">
                                    <GrCheckbox className="bg-red-800" />
                                    Verified Students
                                </div>
                            </div>
                            <div>
                                <div className="w-52 relative h-44">
                                    <Doughnut data={data1} options={options} />
                                    <div className="absolute text-4xl top-24 left-14">{unRegistered}&#37;</div>
                                </div>
                                <div className="flex items-center gap-2 justify-center">
                                    <GrCheckbox className="bg-gray-400" />
                                    Unverified Students
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg mx-5 p-2 grid justify-center gap-2">
                            <div className="flex gap-6">
                                <div className="flex gap-6">
                                    <span className="grid justify-center"><p>Verified Students Count</p>
                                        <p className="font-bold text-center">{registeredUser && registeredUser.length}</p>
                                    </span>
                                </div>
                                <div className="flex gap-6">
                                    <span className="grid justify-center gap-6"><p>Unverified Students Count</p>
                                        <p className="font-bold text-center">{unRegisteredUser && unRegisteredUser.length}</p>
                                    </span>
                                </div>
                            </div>
                            <div className="grid justify-center font-bold">
                                <p>Student Population:</p>
                                <p className="text-center">{registeredUser && registeredUser.length + unRegisteredUser.length}</p>
                            </div>
                        </div>
                        <h2 className="font-bold flex py-4 justify-center">
                            Verified Students &#40;by College&#41;
                        </h2>
                        <div className="flex items-center p-5 gap-5 ">
                            <div className="w-60 h-60 m-4">
                                <Pie data={pieData} options={pieOptions} />
                            </div>
                            {users && <RegsiteredLegends data={RegsiteredData} />}
                        </div>
                        <h2 className="font-bold flex py-4 justify-center">
                            Unverified Students &#40;by College&#41;
                        </h2>
                        <div className="flex items-center p-5 gap-5 ">
                            <div className="w-60 h-60">
                                <Pie data={UnpieData} options={pieOptions2} />
                            </div>
                            {users && <UnregisteredLegends data={unRegsiteredData} />}
                        </div>
                    </div>
                }
            </div>
        </DashboardLayout>
    );
}
export default page;