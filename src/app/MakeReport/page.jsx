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
import { SlArrowDown } from "react-icons/sl";
import { FcAddDatabase } from "react-icons/fc";
import { useRouter } from "next/navigation";

const page = () => {
    const { profileData } = useProfileData()
    const [colleges, setColleges] = useState()
    const { loading, startLoading, stopLoading } = useLoading()
    const [message, setMessage] = useState()
    const route = useRouter()
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
        course: "",
        attachment: 'empty',
        dateOfIncident: '',
        platformOfIncident: '',
        rateOfOccurrence: '',
        describeTheSituation: '',
        status: 'Pending',
    });
    const [latestTicket, setlatestTicket] = useState()



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



    const handleSubmit = async () => {
        startLoading()
        setMessage("Submitted successfully!")
        stopLoading()
    };

    const handleOkay = () => {
        setConfirmation(true)
        route.push('/')
    }

    const handleSubmitReport = (e) => {
        e.preventDefault();
        getLatestTicket()
        if (reportData.actionOfDiscipline) {
            showConfirmation(
                <div className='grid justify-center gap-4'>
                    <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'>
                        <FcAddDatabase size={32} />Submit Report
                    </div>
                    <div className="grid gap-1">
                        <p className='text-xl px-6 pb-6'>Are you sure you want to submit this report?</p>
                        <div className="flex justify-center">
                            <p className="italic text-center text-xs w-3/4">Any information found to be untrue in this report may result in liability, with corresponding penalties.</p>
                        </div>
                    </div>
                </div>, () => {
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
            <div style={{ backgroundImage: 'URL("/studentbg.png")' }} className="py-6 bg-no-repeat w-full h-full bg-cover grid justify-center pb-10">
                {openSelectAct &&
                    <>
                        <div className="p-6 grid text-start absolute border border-2 z-50 bg-white h-max inset-0 m-12">
                            <button className="hover:bg-gray-400 font-bold" type="button" onClick={() => handleAction("")} >Select Action of Discipline</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Carrying of Firearms and Other Weapons")} >Carrying of Firearms and Other Weapons</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Cheating")} >Cheating</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Damage or unauthorized presence in or use of university premises, facilities or property, in violation of posted signage, when closed or after normal operating hours")} >Damage or unauthorized presence in or use of university premises, facilities or property, in violation of posted signage, when closed or after normal operatimg hours</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Deception, impersonation or fraud")} >Deception, impersonation or fraud</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Disturbance / Disrupt of classes or any Educational-Related-Programs")} >Disturbance / Disrupt of classes or any Educational-Related-Programs</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Falsification or Forging of Academic Records and Official Documents")} >Falsification or Forging of Academic Records and Official Documents</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Indecency in Any Form of Obscene or Lewd Behavior")} >Indecency in Any Form of Obscene or Lewd Behavior</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Littering / Disribution of unauthorized printed materials")} >Littering / Disribution of unauthorized printed materials</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Malicious or unfounded accusations")} >Malicious or unfounded accusations</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Plagiarism")} >Plagiarism</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Possession, Use, Sale or Purchase of Any Illegal Drugs Inside The University Premises")} >Possession, Use, Sale or Purchase of Any Illegal Drugs Inside The University Premises</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Smoking, gambling or being under the influence of alcohol")} >Smoking, gambling or being under the influence of alcohol</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Theft, attemted theft and/or unauthorized possession or use of property/services belonging to the university")} >Theft, attemted theft and/or unauthorized possession or use of property/services belonging to the university</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Unauthorized solicitation of funds or selling of any ticket")} >Unauthorized solicitation of funds or selling of any ticket</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Vandalism / unauthorized posting of printed material")} >Vandalism / Unauthorized posting of printed materials</button>
                            <button className="hover:bg-gray-400" type="button" onClick={() => handleAction("Others")} >Others</button>
                        </div>
                    </>}
                <h2 className="text-2xl flex text-white sm:w-[44rem] bg-red-950 w-full justify-center">Report Form</h2>
                <div className="border-red-950 bg-white border-8 w-full sm:w-[44rem] grid justify-center">

                    <div className="w-full grid gap-4 md:px-6 px-1 justify-center">
                        <p className="font-bold py-4 flex gap-2">Ticket No.:
                            <div className="underline underline-offset-4">
                                00001
                            </div>
                        </p>
                        <form className="grid relative pb-8 w-full" onSubmit={handleSubmitReport}>
                            <p className="font-bold">Student-of-Concerns Details:</p>
                            <div className="grid md:indent-6 indent-2 gap-4">
                                <label className="md:flex grid justify-center md:justify-between">
                                    <p>Name:</p>
                                    <input
                                        className="border w-52 mr-2 md:mr-10"
                                        placeholder="Name"
                                        type="text"
                                        value={reportData.offender}
                                        onChange={(e) => handleInputChange('offender', e.target.value)}
                                        required
                                    />
                                </label>
                                {colleges && <label className="md:flex grid justify-center md:justify-between">
                                    <p>College:</p>
                                    <select
                                        onChange={handleChangeCollege}
                                        className="border w-52 mr-2 md:mr-10"
                                        required
                                    >
                                        {colleges?.map((college, index) => (
                                            <option key={index} value={college.acronym}>
                                                {college.acronym}
                                            </option>
                                        ))}
                                    </select>
                                </label>}
                                <label className="md:flex grid justify-center md:justify-between">
                                    <p>Course, year & section:</p>
                                    <input
                                        className="border w-52 mr-2 md:mr-10"
                                        placeholder="Course, Year & Section"
                                        type="text"
                                        value={reportData.course}
                                        onChange={(e) => handleInputChange('course', e.target.value)}
                                        required
                                    />
                                </label>

                            </div>

                            {confirmation && <ConfirmationModal>
                                <div className='grid justify-center gap-4 p-10'>
                                    <div>{message}</div>
                                    <div className="flex mt-6 justify-center">
                                        <button type="button" className="bg-green-600 text-white py-2 px-4 w-max rounded-lg" onClick={handleOkay}>Okay</button>
                                    </div>
                                </div>
                            </ConfirmationModal>}
                            <ConfirmationDialog />

                            <div className="grid gap-4 ">
                                <p className="font-bold">Misconduct Details:</p>
                                <div className="md:indent-6 indent-2 grid gap-4">
                                    <label className="md:flex grid justify-center md:justify-between">
                                        <div>Act of Misconduct:</div>
                                        <div
                                            className={`${require && "border border-red-600"} ml-6 pr-2 border flex items-center justify-between w-52`}
                                            onClick={() => setOpenSelectAct(true)}
                                        >{reportData.actionOfDiscipline ? reportData.actionOfDiscipline : 'Select'}
                                            <SlArrowDown className="text-black" size={9} />
                                        </div>
                                        {customActionOption && <input
                                            className="border-b-2"
                                            placeholder="Enter other Act of Misconduct."
                                            type="text"
                                            value={reportData.actionOfDiscipline}
                                            onChange={(e) => handleInputChange('actionOfDiscipline', e.target.value)}
                                        />}
                                    </label>
                                    <label className="md:flex grid justify-center md:justify-between">
                                        <div>Date of Incident:</div>
                                        <input
                                            className="border ml-6 w-52"
                                            type="date"
                                            value={reverseFormatDate(reportData.dateOfIncident)}
                                            onChange={(e) => {
                                                const formattedDate = formatDate(e.target.value);
                                                handleInputChange('dateOfIncident', formattedDate);
                                            }}
                                            required
                                        />
                                    </label>
                                    <label className="md:flex grid justify-center md:justify-between">
                                        <div>Place or Platform of Incident:</div>
                                        <input
                                            className="border ml-6 w-52"
                                            placeholder="Place or Platform Used"
                                            type="text"
                                            value={reportData.platformOfIncident}
                                            onChange={(e) => handleInputChange('platformOfIncident', e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label className="md:flex grid justify-center md:justify-between">
                                        <div>Rate of Occurrence:</div>
                                        <select
                                            value={reportData.rateOfOccurrence}
                                            onChange={(e) => handleInputChange('rateOfOccurrence', e.target.value)}
                                            required
                                            className="border ml-6 w-52"
                                        >
                                            <option value="">Select rate of Occurrence</option>
                                            <option className="text-center" value="1 - Seldom">1 - Seldom</option>
                                            <option className="text-center" value="2 - Rarely">2 - Rarely</option>
                                            <option className="text-center" value="3 - Sometimes">3 - Sometimes</option>
                                            <option className="text-center" value="4 - Usually">4 - Usually</option>
                                            <option className="text-center" value="5 - Always">5 - Always</option>
                                        </select>

                                    </label>
                                    <label className="grid">
                                        <div>Brief Description of the Situation:</div>
                                        <textarea
                                            className="border my-2 bg-gray-200 md:ml-14"
                                            placeholder="Details"
                                            rows="4"
                                            value={reportData.describeTheSituation}
                                            onChange={(e) => handleInputChange('describeTheSituation', e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label className="grid">
                                        <div className="flex gap-4">
                                            <p className="font-bold text-md"> Attachment:</p>
                                            <input
                                                className="border w-56"
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={handlePictureChange}
                                                required
                                            />
                                        </div>
                                        <p className="text-xs italic pb-10"> Note: The attachment should be in .jpg file containing narrative report.</p>
                                    </label>
                                </div>
                            </div>


                            <div className="w-full absolute -bottom-6 flex justify-center">
                                <button
                                    disabled={loading}
                                    className={`${loading ? "bg-gray-500" : "bg-red-950"} text-white border border-black py-2 px-6`}
                                    type="submit">
                                    {loading ? "SUBMITTING" : "SUBMIT"}</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* </PrivateRoute> */}
            </div>
        </Layout>
    );
}

export default page;
