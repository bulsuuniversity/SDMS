"use client"

import { useState, useEffect } from "react";
import AccountModal from "@/utils/AccountModal";
import axios from "axios";
import Layout from "@/components/Layout";
import Link from "next/link";
import EnterCode from "@/components/EnterCode";
import { url, headers } from "../libs/api"
import InformationModal from "@/utils/InformationModal";
import { PublicRoute } from "@/components/auth";

const Register = ({ setActive, setData }) => {
    const closeModal = () => {
        setActive('');
    };
    const [code, setCode] = useState()
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [credentials, setCredentials] = useState()
    const [uploading, setUploading] = useState(false)
    const [idNum, setIdNum] = useState("")
    const [info, setInfo] = useState(false)
    const [notPassword, setNotPassword] = useState(false)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleIdNUmChange = (e) => {
        setIdNum(e.target.value)
    }

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    useEffect(() => {
        if (password !== confirmPassword) {
            setNotPassword(true)
        }
        if (password === confirmPassword) {
            setNotPassword(false)
        }
    }, [confirmPassword, password])

    const handlePictureChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (file.type.startsWith("image/")) {
                    setCredentials(reader.result);

                } else {
                    setCredentials('');
                }
            };
        }


    };

    const data = {
        email: email,
        idNumber: idNum,
        phoneNumber: phoneNumber,
        credentials: credentials,
        password: confirmPassword,
        role: 'user'
    };


    const emailData = {
        email: data.email,
        subject: "Key for SDMS Registration",
        message: "Greetings! This is your registration key. PLease keep it private and do not share to other students. Key: ",
        html: `<p>Greetings! This is your registration key. PLease keep it private and do not share to other students. Key: </p>`
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUploading(true);
        try {
            const response = await axios.get(`${url}/api/findByEmail/${data.email}`, { headers });
            if (Array.isArray(response.data) && response.data.length > 0) {
                setInfo(true)
                setUploading(false)
            } else {
                const sendCode = await axios.post(`${url}/api/Mailer`, emailData, { headers });
                setCode(sendCode.data.key)
                setUploading(false)
            }
        } catch (error) {
            console.error('Error:', error);
            setUploading(false)
        }
    };


    return (
        <PublicRoute>
            <AccountModal closeModal={closeModal}>
                {info && <InformationModal>
                    <div className="p-6 grid justify-center gap-4">
                        <div>Email already exist!</div>
                        <div className="flex justify-center">
                            <button onClick={() => setInfo(false)} className="bg-green-500 rounded-lg w-16 py-2 px-4">Okay</button>
                        </div>
                    </div>
                </InformationModal>}
                {code ?
                    <EnterCode registerData={data} sentCode={code} /> :
                    <div className="bg-white p-6 shadow-lg z-10">
                        <div className="mx-4">
                            <div className="flex flex-col text-xs justify-center">
                                <h2 className="text-2xl text-center font-semibold">Register</h2>
                                <h4 className="italic py-4 text-center">Please enter the needed information below.</h4>
                            </div>
                            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                                <div className="grid">
                                    <div className="mb-4 text-sm">
                                        <input
                                            type="email"
                                            className="w-full text-xs px-3 py-2 border border-black"
                                            value={email}
                                            onChange={handleEmailChange}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 text-sm">
                                        <input
                                            type="tel"
                                            className="w-full text-xs px-3 py-2 border border-black"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                            placeholder="Phone Number."
                                            maxLength={13}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 text-sm">
                                        <input
                                            type="text"
                                            value={idNum}
                                            className="w-full text-xs px-3 py-2 border border-black"
                                            onChange={handleIdNUmChange}
                                            placeholder="ID Number."
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 text-sm">
                                        <input
                                            type="password"
                                            className="w-full text-xs px-3 py-2 border border-black"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            placeholder="Password"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 text-sm">
                                        <input
                                            type="password"
                                            className={`border ${notPassword ? "border-red-500 border-2" : "border-black"} w-full text-xs px-3 py-2`}
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            placeholder="Confirm Password."
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid">

                                    <div className="mb-4 text-sm">
                                        <div>Please upload your school credentials.</div>
                                        <div className="italic mt-4">Make sure the file is in *jpg/*png file format.</div>
                                        <input
                                            id="credentials"
                                            type="file"
                                            className="w-full text-xs px-3 mt-2 py-2 border border-black"
                                            onChange={handlePictureChange}
                                            accept="image/jpeg, image/png"
                                            title="Credentials"
                                            required
                                        />
                                    </div>
                                    {notPassword ? <div className="text-red-500 p-2 bg-red-800 w-max h-max flex text-center">Password do not match</div> : <button
                                        type="submit"
                                        className={`w-full py-1 my-1 px-4 ${uploading ? "bg-gray-600" : 'bg-fuchsia-950 hover:bg-blue-600'}  text-white `}
                                        disabled={uploading}
                                    >
                                        {uploading ? "Please wait" : "Register"}
                                    </button>}
                                    <Link href={'/Login'} onClick={() => setActive('button1')}
                                        className="text-blue-500 cursor-pointer text-xs text-end">
                                        Already have an account? Log in here.
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>}
            </AccountModal>
        </PublicRoute>
    );
}

export default Register;
