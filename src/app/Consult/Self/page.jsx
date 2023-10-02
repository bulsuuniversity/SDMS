"use client"

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import useLoading from "@/utils/Loading";
import axios from "axios";
import ConfirmationModal from "@/utils/ConfirmationModal";
import { url, headers } from "@/app/libs/api";
import { useProfileData } from "@/app/libs/store";
import { formatDate, reverseFormatDate } from "@/utils/formatDate";
import useConfirmation from "@/utils/ConfirmationHook";

const Page = () => {
    const { showConfirmation, ConfirmationDialog } = useConfirmation()
    const { profileData } = useProfileData()
    const [responseData, setResponseData] = useState()
    const [message, setMessage] = useState(false)
    const { loading, startLoading, stopLoading } = useLoading()
    const [formData, setFormData] = useState({
        student: "",
        appointmentDate: "",
        consultationReason: "",
        consultationType: "",
        status: "",
    });

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {
        if (profileData && profileData.id) {
            handleInputChange('student', profileData);
            handleInputChange('status', "Pending");
        }
    }, [profileData])

    const handleSubmitReport = async () => {
        startLoading()
        try {
            const response = await axios.post(`${url}/api/consultSelf`, formData, { headers });
            setResponseData("Thank you! We will contact you soon about your concern.")
            setFormData({
                consultationReason: "",
                appointmentDate: "",
                consultationType: ""
            })
        } catch (err) {
            console.log(err)
            setResponseData("Failed to submit")
        } finally {
            setMessage(true)
            stopLoading()
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        showConfirmation('Are you sure you want to submit report?', () => {
            handleSubmitReport()
        });
    };

    return (
        <Layout>
            <div className="md:px-10 px-4 py-4 grid grid-cols-1 lg:mb-10 md:grid-cols-3 bg-red-50">
                <form className="md:col-span-2 col-span-1 grid gap-4 border border-black border-2 mx-0 md:mx-24 px-4 md:px-12 py-4 bg-white rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="text-2xl text-center font-bold">SELF-CONSULTATION REQUEST FORM</h2>
                    <p className="text-xs text-center italic">Please fill out the needed details for the request</p>
                   
                    <div className="">Ticket No.: _______</div>
                
                    <label className="grid">
                        <p className="font-bold">Reason for consultation:</p>
                        <select
                            className="border-b-2"
                            name="consultationReason"
                            value={formData.consultationReason}
                            onChange={(e) => handleInputChange('consultationReason', e.target.value)}
                            required
                        >
                            <option value="">Select Reason</option>
                            <option value="Depression">Depression</option>
                            <option value="Anxiety">Anxiety</option>
                            <option value="Family issues">Family issues</option>
                            <option value="Stress">Stress</option>
                            <option value="Social-phobia">Social phobia</option>
                            <option value="Others">Other/s</option>
                        </select>
                    </label>
                    <label className="grid">
                        <p className="font-bold">Requested date of appointment:</p>
                        <input
                            className="border-b-2"
                            type="date"
                            placeholder="select date"
                            name="appointmentDate"
                            value={reverseFormatDate(formData.appointmentDate)}
                            onChange={(e) => {
                                const formattedDate = formatDate(e.target.value);
                                handleInputChange('appointmentDate', formattedDate);
                            }}
                            required
                        />
                    </label>
                    {message &&
                        <ConfirmationModal>
                            <div className="grid gap-4 p-4 border border-black justify-center items-center">
                                <div className="text-2xl w-full sm:w-72 text-center whitespace-normal font-bold">{responseData}</div>
                                <div className="flex justify-center">
                                    <button onClick={() => setMessage(false)} className="px-4 py-2 bg-green-500 text-white w-max rounded-lg">Okay</button>
                                </div>
                            </div>
                        </ConfirmationModal>
                    }
                        <ConfirmationDialog />
                    <label className="grid">
                        <p className="font-bold">Type of consultation:</p>
                        <select
                            className="border-b-2"
                            name="consultationType"
                            value={formData.consultationType}
                            onChange={(e) => handleInputChange('consultationType', e.target.value)}
                            required
                        >
                            <option value="">Please select an option</option>
                            <option value="Physically">Physically</option>
                            <option value="Virtually">Virtually</option>
                        </select>
                    </label>
                    <div className="flex justify-center">
                        <button
                            disabled={loading}
                            className={`${loading ? "bg-gray-600" : "bg-amber-200 "} font-bold p-2 m-2 w-1/2 border border-black rounded-[1.3rem]`}
                            type="submit">{loading ? "Submitting" : "Submit"}</button>
                    </div>
                </form>
                <div className="col-span-1">
                    <Image alt="design" className="object-cover scale-x-[-1]" src="/bg.png" width={500} height={700} />
                </div>
            </div>
        </Layout>
    );
};

export default Page;
