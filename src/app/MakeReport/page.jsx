"use client"

import Layout from "@/components/Layout";
import { useProfileData } from "../libs/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../libs/api";
import useLoading from "@/utils/Loading";
import ConfirmationModal from "@/utils/ConfirmationModal";
import useConfirmation from "@/utils/ConfirmationHook";
import { formatDate, reverseFormatDate } from "@/utils/formatDate";
import { PrivateRoute } from "@/components/auth";
import { SlArrowDown } from "react-icons/sl";

const page = () => {
    const { profileData } = useProfileData()
    const { loading, startLoading, stopLoading } = useLoading()
    const [message, setMessage] = useState()
    const [confirmation, setConfirmation] = useState(false)
    const [openSelectAct, setOpenSelectAct] = useState(false)
    const [require, setRequire] = useState()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const [reportData, setReportData] = useState({
        reporter: "",
        ticketNo: "",
        actionOfDiscipline: '',
        offender: '',
        college: "",
        attachment: 'empty',
        dateOfIncident: '',
        platformOfIncident: '',
        rateOfOccurrence: '',
        describeTheSituation: '',
        status: 'Pending',
    });

    // const handleMakeNotif = async () => {
    //     try {
    //         const response = await axios.post(`${url}/api/AdminNotification`, { headers });
    //         console.log(response)
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    const getLatestTicket = async () => {
        try {
            const response = await axios.get(`${url}/api/AdminUpdateReport`, { headers });
            console.log(response)
            handleInputChange("ticketNo", String((Number(response.data[0].ticketNo) + 1)).padStart(6, '0'))

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getLatestTicket()
    }, [])

    console.log(reportData.ticketNo);


    useEffect(() => {
        if (profileData && profileData.id) {
            handleInputChange('reporter', profileData);
            handleInputChange('college', profileData.college);
        }
    }, [profileData])


    const handlePictureChange = (e) => {
        const picture = e.target.files[0];
        if (picture) {
            const reader = new FileReader();
            reader.readAsDataURL(picture);
            reader.onloadend = () => {
                if (picture.type.startsWith("image/")) {
                    handleInputChange('attachment', reader.result);
                } else {
                    handleInputChange('attachment', null);
                }
            };
        }
    };

    const handleInputChange = (field, value) => {
        setReportData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'sikretong-malupet',
        'Accept': 'application/json',
    };

    const handleNotif = async () => {
        try {
            await axios.put(`${url}/api/AdminNotification/6518de8c2bd81071174f2644`,
                { notif: true }, { headers });
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleSubmit = async () => {
        startLoading()
        try {
            const response = await axios.post(`${url}/api/studentReport`, reportData, { headers });
            setConfirmation(true)
            console.log(response)
            setMessage("Thank you for submitting your report")
            stopLoading()
            handleNotif()
            getLatestTicket()
            setReportData({
                reporter: "",
                actionOfDiscipline: '',
                offender: '',
                college: "",
                attachment: '',
                dateOfIncident: '',
                platformOfIncident: '',
                rateOfOccurrence: '',
                describeTheSituation: '',
                status: 'Pending',
            });
        } catch (error) {
            console.error('Error:', error);
            stopLoading()
            setConfirmation(true)
            setMessage("Something went wrong.")
        }
    };

    const handleSubmitReport = (e) => {
        e.preventDefault();
        if (reportData.actionOfDiscipline) {
            showConfirmation('Are you sure you want to submit report?', () => {
                handleSubmit()
            });
        } else {
            setRequire(true)
        }

    };

    const [customOption, setCustomOption] = useState(false)
    const [customActionOption, setActionCustomOption] = useState(false)

    const handleChangeCollege = (e) => {
        const selectedValue = e.target.value

        if (selectedValue === 'Others') {
            setCustomOption(true);
        } else {
            handleInputChange("college", selectedValue)
            setCustomOption(false);
        }
    }

    const handleAction = (value) => {
        if (value === 'Others') {
            setActionCustomOption(true);
            handleInputChange("actionOfDiscipline", "")
        } else {
            handleInputChange("actionOfDiscipline", value)
            setActionCustomOption(false);
        }
        setOpenSelectAct(false)
    }


    return (
        <Layout>
            <PrivateRoute>
                <div className="py-4 relative px-4 md:px-28">

                    <div className="border grid justify-center border-black border-2 mb-14 md:mb-7 rounded-lg px-2 md:px-6 py-4">
                        {/* <button className="bg-blue px-4 py-2" onClick={handleMakeNotif}>Make notif</button> */}

                        <h2 className="text-4xl text-center">Report Form</h2>
                        <h3 className="text-xs italic px-20 pb-4 grid justify-center">
                            Please fill the necessary details denoted by &#40;&#42;&#41;.
                            Other information may be optional, but still providing its details might hasten the process.
                        </h3>
                        <p className="indent-6 flex">Ticket No.:
                            <div className="underline underline-offset-4">
                                {reportData.ticketNo && reportData.ticketNo}
                            </div>
                        </p>
                        {openSelectAct &&
                            <>
                                <div className="p-6 grid text-start absolute border border-2 bg-white inset-0 m-12">
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("")} >Select Action of Discipline</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Littering / Disribution of unauthorized printed materials")} >Littering / Disribution of unauthorized printed materials</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Vandalism / Unauthorized posting of printed material")} >Vandalism / Unauthorized posting of printed materials</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Disturbance / Disrupt of classes or any Educational-Related-Programs")} >Disturbance / Disrupt of classes or any Educational-Related-Programs</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Unauthorized solicitation of funds or selling of any ticket")} >Unauthorized solicitation of funds or selling of any ticket</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Smoking, gambling or being under the influence of alcohol")} >Smoking, gambling or being under the influence of alcohol</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Malicious or unfounded accusations")} >Malicious or unfounded accusations</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Deception, impersonation or fraud")} >Deception, impersonation or fraud</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Disrespectful behavior or refusal to comply with the directions of the university")} >Disrespectful behavior or refusal to comply with the directions of the university</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Damage or unauthorized presence in or use of university premises, facilities or property, in violation of posted signage, when closed or after normal operatimg hours")} >Damage or unauthorized presence in or use of university premises, facilities or property, in violation of posted signage, when closed or after normal operatimg hours</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Theft, attemted theft and/or unauthorized possession or use of property/services belonging to the university")} >Theft, attemted theft and/or unauthorized possession or use of property/services belonging to the university</button>
                                    <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Others")} >Others</button>
                                </div>
                            </>}
                        <form className="grid md:grid-cols-2 grid-cols-1 gap-6 mx-2 md:mx-16" onSubmit={handleSubmitReport}>
                            <div className="grid gap-4">
                                <label className="grid">
                                    <div className="flex font-bold text-md"><p className="text-red-600">&#42;</p> Act of Misconduct:</div>
                                    <div
                                        className={`${require && "border border-red-600"} px-2 border-b-2 flex justify-between w-full`}
                                        onClick={() => setOpenSelectAct(true)}
                                    >{reportData.actionOfDiscipline ? reportData.actionOfDiscipline : 'Select'}
                                        <SlArrowDown className="text-black" size={10} />
                                    </div>


                                    {customActionOption && <input
                                        className="border-b-2"
                                        placeholder="Action of Discipline"
                                        type="text"
                                        value={reportData.actionOfDiscipline}
                                        onChange={(e) => handleInputChange('actionOfDiscipline', e.target.value)}
                                    />}
                                </label>
                                {confirmation && <ConfirmationModal>
                                    <div className="grid gap-2 m-10">
                                        <div>{message}</div>
                                        <div className="flex mt-6 justify-center">
                                            <button className="bg-amber-100 py-2 px-4 w-16 rounded-lg" onClick={() => setConfirmation(false)}>Okay</button>
                                        </div>
                                    </div>
                                </ConfirmationModal>}
                                <ConfirmationDialog />
                                <label className="grid">
                                    <p className="font-bold text-md">Offender:</p>
                                    <input
                                        className="border-b-2"
                                        placeholder="Offender name"
                                        type="text"
                                        value={reportData.offender}
                                        onChange={(e) => handleInputChange('offender', e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="grid">
                                    <p className="font-bold text-md"> College:</p>
                                    <select
                                        onChange={handleChangeCollege}
                                        className="border w-full"
                                        required
                                    >
                                        <option value="">Select offender College</option>
                                        <option value="CBA">CBA</option>
                                        <option value="CIT">CIT</option>
                                        <option value="COED">COED</option>
                                        <option value="CICS">CICS</option>
                                        <option value="COE">COE</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {customOption && <input
                                        className="border-b-2"
                                        placeholder=""
                                        type="text"
                                        value={reportData.college}
                                        onChange={(e) => handleInputChange('college', e.target.value)}
                                    />}
                                </label>
                                <label className="grid">
                                    <p className="font-bold text-md"> Attachment:</p>
                                    <input
                                        className="border-b-2"
                                        placeholder=""
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={handlePictureChange}
                                    />
                                    <p className="text-xs italic"> Note: Picture of handwritten narrative report.</p>
                                </label>
                            </div>
                            <div className="grid gap-4">
                                <label className="grid">
                                    <div className="flex font-bold text-md"><p className="text-red-600">&#42;</p> Date of Incident:</div>
                                    <input
                                        className="border-b-2"
                                        placeholder=""
                                        type="date"
                                        value={reverseFormatDate(reportData.dateOfIncident)}
                                        onChange={(e) => {
                                            const formattedDate = formatDate(e.target.value);
                                            handleInputChange('dateOfIncident', formattedDate);
                                        }}
                                        required
                                    />
                                </label>
                                <label className="grid">
                                    <div className="flex font-bold text-md"><p className="text-red-600">&#42;</p> Place/Platform of Incident:</div>
                                    <input
                                        className="border-b-2"
                                        placeholder="Place or platform used"
                                        type="text"
                                        value={reportData.platformOfIncident}
                                        onChange={(e) => handleInputChange('platformOfIncident', e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="grid">
                                    <div className="flex font-bold text-md"><p className="text-red-600">&#42;</p> Rate of Occurrence:</div>
                                    <select
                                        value={reportData.rateOfOccurrence}
                                        onChange={(e) => handleInputChange('rateOfOccurrence', e.target.value)}
                                        required
                                    >
                                        <option value="">Select rate of Occurrence</option>
                                        <option className="text-center" value="1">1</option>
                                        <option className="text-center" value="2">2</option>
                                        <option className="text-center" value="3">3</option>
                                        <option className="text-center" value="4">4</option>
                                        <option className="text-center" value="5">5</option>
                                    </select>

                                </label>
                                <label className="grid">
                                    <div className="flex font-bold text-md"><p className="text-red-600">&#42;</p>  Describe the Situation:</div>
                                    <textarea
                                        className="border"
                                        placeholder="Please descride the details"
                                        value={reportData.describeTheSituation}
                                        onChange={(e) => handleInputChange('describeTheSituation', e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="relative bg-red-600">
                                <button
                                    disabled={loading}
                                    className={`${loading ? "bg-gray-500" : "bg-amber-400"} absolute md:-bottom-12 -bottom-16 right-24 md:-right-96 border border-black rounded-[1.5rem] p-4`}
                                    type="submit">
                                    {loading ? "Submitting" : "Submit Report"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </PrivateRoute>
        </Layout>
    );
}

export default page;