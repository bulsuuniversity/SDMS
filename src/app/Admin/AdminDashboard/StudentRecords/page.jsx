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
    const registeredUser = 29
    const unRegisteredUser = 25
    const registered = Math.round((29 / 54) * 100)
    const unRegistered = Math.round((25 / 54) * 100)

    const CBA = 1
    const CIT = 4
    const COED = 7
    const CICS = 5
    const COE = 4

    const RegsiteredData = { CBA, CIT, COED, CICS, COE }


    const unCBA = 2
    const unCIT = 4
    const unCOED = 1
    const unCICS = 3
    const unCOE = 2
    const Others = 1

    const unRegsiteredData = { unCBA, unCIT, unCOED, unCICS, unCOE, Others }



    const data = {
        labels: ['Verified Students', 'Unverified Students'],
        datasets: [
            {
                data: [29, 25],
                backgroundColor: ['#780000', '#494f56'],
                borderWidth: 1,
            },
        ],
    };
    const data1 = {
        labels: ['Unverified Students', 'Verified Students'],
        datasets: [
            {
                data: [25, 29],
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
                color: 'black',
                borderColor: "#fff",
                textStrokeColor: 'white',
                textStrokeWidth: 2,
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    const percentage = registeredUser
                        ? Math.round((value / 29) * 100) : 0;
                    return percentage === 0 ? '' : `${label}: ${percentage}%`;
                },

            },
        },
    };


    const pieOptions2 = {
        responsive: true,
        plugins: {
            legend: false,
            datalabels: {
                color: 'black',
                borderColor: "#fff",
                textStrokeColor: 'white',
                textStrokeWidth: 2,
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    const percentage = unRegisteredUser
                        ? Math.round((value / 25) * 100) : 0;

                    return percentage === 0 ? '' : `${label}: ${percentage}%`;
                },
            },
        }
    };



    const pieData = {
        labels: ['CBA',
            'CIT',
            'COED',
            'CICS',
            'COE',
        ],
        datasets: [
            {
                label: 'Student Count',
                data: [5,
                    6,
                    7,
                    1,
                    2,],
                backgroundColor: [
                    'rgb(202, 138, 4)',
                    'rgb(22, 163, 74)',
                    'rgb(37, 99, 235)',
                    'rgb(156, 163, 175)',
                    'rgb(217, 119, 6)',
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
            'Unknown'],
        datasets: [
            {
                label: 'Student Count',
                data: [5,
                    6,
                    7,
                    1,
                    2,],
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
    return (
        <DashboardLayout>
            <div className=" px-14">
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
                                    <p className="font-bold text-center">{registeredUser}</p>
                                </span>
                            </div>
                            <div className="flex gap-6">
                                <span className="grid justify-center gap-6"><p>Unverified Students Count</p>
                                    <p className="font-bold text-center">{unRegisteredUser}</p>
                                </span>
                            </div>
                        </div>
                        <div className="grid justify-center font-bold">
                            <p>Student Population:</p>
                            <p className="text-center">{registeredUser + unRegisteredUser}</p>
                        </div>
                    </div>
                    <h2 className="font-bold flex py-4 justify-center">
                        Active Students &#40;by College&#41;
                    </h2>
                    <div className="flex items-center p-5 gap-5 ">
                        <div className="w-60 h-60 m-4">
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                        <RegsiteredLegends data={RegsiteredData} />
                    </div>
                    <h2 className="font-bold flex py-4 justify-center">
                        Inactive Students &#40;by College&#41;
                    </h2>
                    <div className="flex items-center p-5 gap-5 ">
                        <div className="w-60 h-60">
                            <Pie data={UnpieData} options={pieOptions2} />
                        </div>
                        <UnregisteredLegends data={unRegsiteredData} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default page;