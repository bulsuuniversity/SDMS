"use client"

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import ConfirmationModal from "@/utils/ConfirmationModal";
import { useProfileData } from "@/app/libs/store";
import useLoading from "@/utils/Loading";
import axios from "axios";
import { url, headers } from "@/app/libs/api";
import { formatDate, reverseFormatDate } from "@/utils/formatDate";
import useConfirmation from "@/utils/ConfirmationHook";
import { FcAddDatabase } from "react-icons/fc";


const Page = () => {
    const { showConfirmation, ConfirmationDialog } = useConfirmation()
    const { profileData } = useProfileData()
    const [responseData, setResponseData] = useState()
    const [message, setMessage] = useState(false)
    const { loading, startLoading, stopLoading } = useLoading()
    const [formData, setFormData] = useState({
        student: "",
        referredStudent: "",
        referredStudentCollege: "",
        referralReason: "",
        describeSituation: "",
        referralDate: "",
        status: ""
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
            const response = await axios.post(`${url}/api/consultReferral`, formData, { headers });
            setResponseData("Thank you! We will contact you soon about your concern.")
            setFormData({
                student: "",
                referredStudent: "",
                referredStudentCollege: "",
                referralDate: "",
                referralReason: "",
                describeSituation: "",
                status: ""
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
        showConfirmation(<div className='grid justify-center gap-4'>
        <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcAddDatabase size={32}/>Submit Account</div>
         <p className='text-xl p-6'>Are you sure you want to submit this account?</p>
         </div>, () => {
            handleSubmitReport()
        });
    };

    const [customOption, setCustomOption] = useState(false)

    const handleChangeCollege = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue === 'others') {
            setCustomOption(true);
        } else {
            handleInputChange('referredStudentCollege', e.target.value)
            setCustomOption(false);
        }
    }

    return (
        <Layout>
            <div className="md:px-10 p-4 mb-9 grid grid-cols-1 md:grid-cols-3 bg-red-50">
                <div className="md:block hidden col-span-1">
                    <Image alt="design" className="object-cover scale-x-[-1]" src="/bg.png" width={500} height={700} />
                </div>
                <form className="md:col-span-2 col-span-1 grid gap-4 border border-black border-2 mx-0 md:mx-24 px-4 md:px-12 py-4 bg-white rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="text-2xl whitespace-normal text-center font-bold">REFERRAL CONSULTATION FORM</h2>
                    <p className="text-xs whitespace-normal text-center italic">Please provide the details for the referral</p>



                    <div className="text-sm font-bold">Ticket No.: _______</div>

                    <label className="grid">
                        <p className="text-sm font-bold">Referred Student:</p>
                        <div className="grid gap-2">
                            <input
                                placeholder="Enter name"
                                className="border border-2"
                                type="text"
                                name="referredStudent"
                                value={formData.referredStudent}
                                onChange={(e) => handleInputChange('referredStudent', e.target.value)}
                                required
                            />
                            <select
                                onChange={handleChangeCollege}
                                className="border"
                                required
                            >
                                <option value="">Select College</option>
                                <option value="CBA">CBA</option>
                                <option value="CIT">CIT</option>
                                <option value="COED">COED</option>
                                <option value="CICS">CICS</option>
                                <option value="COE">COE</option>
                                <option value="others">Others</option>
                            </select>
                            {message && <ConfirmationModal>
                                <div className="p-6 grid gap-4">
                                    <div>{responseData}</div>
                                    <div className="flex justify-center">
                                        <button onClick={() => setMessage(false)} className="bg-amber-300 py-2 px-4 rounded-lg">Okay</button>
                                    </div>
                                </div>
                            </ConfirmationModal>}
                            <ConfirmationDialog />
                            {customOption && <input
                                placeholder="Enter college"
                                className="border border-2"
                                type="text"
                                name="referredStudentCollege"
                                value={formData.referredStudentCollege}
                                onChange={(e) => handleInputChange('referredStudentCollege', e.target.value)}
                                required
                            />}
                        </div>
                    </label>
                    <label className="grid">
                        <p className="text-sm font-bold">Reason for Referral:</p>
                        <select
                            className="border border-2"
                            name="referralReason"
                            value={formData.referralReason}
                            onChange={(e) => handleInputChange('referralReason', e.target.value)}
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
                            name="referralDate"
                            value={reverseFormatDate(formData.referralDate)}
                            onChange={(e) => {
                                const formattedDate = formatDate(e.target.value);
                                handleInputChange('referralDate', formattedDate);
                            }}
                            required
                        />
                    </label>
                    <label className="grid">
                        <p className="text-sm font-bold">Describe the Situation:</p>
                        <textarea
                            className="border border-2"
                            name="describeSituation"
                            value={formData.describeSituation}
                            onChange={(e) => handleInputChange('describeSituation', e.target.value)}
                            required
                        ></textarea>
                    </label>
                    <div className="flex justify-center">
                        <button
                            disabled={loading}
                            className={`${loading ? "bg-gray-400" : "bg-amber-200"} font-bold p-2 m-2 w-1/2 border border-black rounded-[1.3rem]`}
                            type="submit">{loading ? "Submitting" : "Submit"}</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Page;
