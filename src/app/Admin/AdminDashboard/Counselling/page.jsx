"use client"

import DashboardLayout from "../DashboardLayout";
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { url, headers } from "@/app/libs/api";
import { useState, useEffect } from "react";
import useLoading from "@/utils/Loading";
import Concerns from "./Concerns";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { GrCheckbox } from "react-icons/gr";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const page = () => {
    const [self, setSelf] = useState()
    const [referral, setReferral] = useState()
    const { loading, startLoading, stopLoading } = useLoading()

    const handleGetDataReferral = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/consultReferral`, { headers });
            console.log("get referral", response)
            const responseData = response.data
            setReferral(responseData)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleGetDataSelf = async () => {
        startLoading()
        try {
            const response = await axios.get(`${url}/api/consultSelf`, { headers });
            const responseData = response.data
            setSelf(responseData)
            stopLoading()
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const selfConsult = self && Object.values(self).filter(user => user.status === "Pending")
    const referralConsult = referral && Object.values(referral).filter(user => user.status === "Pending")

    const Consultation = self && referral && selfConsult.length + referralConsult.length
    const registered = self && Math.round((selfConsult.length / Consultation) * 100)
    const unRegistered = referral && Math.round((referralConsult.length / Consultation) * 100)




    const selDepression = self ? (Object.values(selfConsult).filter(user => user.consultationReason === "Depression")).length : 1
    const selAnxiety = self ? (Object.values(selfConsult).filter(user => user.consultationReason === "Anxiety")).length : 1
    const selFamily = self ? (Object.values(selfConsult).filter(user => user.consultationReason === "Family issues")).length : 1
    const selStress = self ? (Object.values(selfConsult).filter(user => user.consultationReason === "Stress")).length : 1
    const selSocial = self ? (Object.values(selfConsult).filter(user => user.consultationReason === "Social-phobia")).length : 1
    const selOthers = self ? selfConsult.length - (selDepression + selAnxiety + selFamily + selStress + selSocial) : 1

    const refDepression = referral ? (Object.values(referralConsult).filter(user => user.referralReason === "Depression")).length : 1
    const refAnxiety = referral ? (Object.values(referralConsult).filter(user => user.referralReason === "Anxiety")).length : 1
    const refFamily = referral ? (Object.values(referralConsult).filter(user => user.referralReason === "Family issues")).length : 1
    const refStress = referral ? (Object.values(referralConsult).filter(user => user.referralReason === "Stress")).length : 1
    const refSocial = referral ? (Object.values(referralConsult).filter(user => user.referralReason === "Social-phobia")).length : 1
    const refOthers = referral ? referralConsult.length - (refDepression + refAnxiety + refFamily + refStress + refSocial) : 1

    const consultationAll = {
        Depression: self && referral && selDepression + refDepression,
        Anxiety: self && referral && selAnxiety + refAnxiety,
        Family: self && referral && selFamily + refFamily,
        Stress: self && referral && selStress + refStress,
        Social: self && referral && selSocial + refSocial,
        Others: self && referral && selOthers + refOthers
    }

    useEffect(() => {
        handleGetDataSelf()
        handleGetDataReferral()
    }, [])

    const data = {
        labels: ['Self Consultation', 'Referral Consultation'],
        datasets: [
            {
                data: [selfConsult && selfConsult.length, referralConsult && referralConsult.length],
                backgroundColor: ['#780000', '#494f56'],
                borderWidth: 1,
            },
        ],
    };
    const data1 = {
        labels: ['Referral Consultation', 'Self Consultation'],
        datasets: [
            {
                data: [referralConsult && referralConsult.length, selfConsult && selfConsult.length],
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
                    const percentage = selfConsult && referralConsult
                        ? Math.round((value / (selfConsult.length + referralConsult.length)) * 100) : 0;
                    return percentage === 0 ? '' : `${label}: ${percentage}%`;
                },
            },
        }
    };

    const pieData = {
        labels: ['Depression',
            'Anxiety',
            'Family Issues',
            'Stress',
            'Social-phobia',
            'Others'],
        datasets: [
            {
                label: 'Student Count',
                data: [consultationAll.Depression,
                consultationAll.Anxiety,
                consultationAll.Family,
                consultationAll.Stress,
                consultationAll.Social,
                consultationAll.Others],
                backgroundColor: [
                    'rgb(250, 204, 21)',
                    'rgb(22, 163, 74)',
                    'rgb(37, 99, 235)',
                    'rgb(209, 213, 219)',
                    'rgb(217, 119, 6)',
                    'rgb(124, 58, 237)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <DashboardLayout>
            <div className="px-14">
                {loading && <div>loading...</div>}
                {self && self.length < 0 ? <div className="inset-0">No Records Found</div> :
                    <div className="overflow-y-auto bg-blue-100 grid justify-center gap-10 max-h-96 pb-6">
                        <h2 className="font-bold flex py-4 justify-center">
                            REQUEST FOR CONSULTATION
                        </h2>
                        <div className="flex justify-center gap-5">
                            <div>
                                <div className="w-52 relative h-44">
                                    <Doughnut data={data} options={options} />
                                    <div className="absolute text-4xl top-24 left-14">{registered}&#37;</div>
                                </div>
                                <div className="flex items-center gap-2 justify-center">
                                    <GrCheckbox className="bg-slate-800" />
                                    Self Consultation
                                </div>
                            </div>
                            <div>
                                <div className="w-52 relative h-44">
                                    <Doughnut data={data1} options={options} />
                                    <div className="absolute text-4xl top-24 left-14">{unRegistered}&#37;</div>
                                </div>
                                <div className="flex items-center gap-2 justify-center">
                                    <GrCheckbox className="bg-gray-400" />
                                    Referral Consultation
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg mx-5 p-2 grid justify-center gap-2">
                            <div className="flex gap-6">
                                <div className="flex gap-6">
                                    <span className="grid justify-center"><p>Self-Consultation</p>
                                        <p className="font-bold text-center">{self && selfConsult.length}</p>
                                    </span>
                                </div>
                                <div className="flex gap-6">
                                    <span className="grid justify-center gap-6"><p>Referral Consultation</p>
                                        <p className="font-bold text-center">{referral && referralConsult.length}</p>
                                    </span>
                                </div>
                            </div>
                            <div className="grid justify-center font-bold">
                                <p>Total number of pending Consultations:</p>
                                <p className="text-center">{referralConsult && selfConsult && selfConsult.length + referralConsult.length}</p>
                            </div>
                        </div>
                        <h2 className="font-bold flex py-4 justify-center">
                            CONSULTATION CONCERNS
                        </h2>
                        <div className="flex items-center p-5 gap-5 ">
                            <div className="w-60 h-60 m-4">
                                <Pie data={pieData} options={pieOptions} />
                            </div>
                            {self && <Concerns data={consultationAll} />}
                        </div>
                    </div>
                }
            </div>
        </DashboardLayout>
    );
}
export default page;