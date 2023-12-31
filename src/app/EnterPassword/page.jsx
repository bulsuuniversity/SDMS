"use client"

import AccountModal from "@/utils/AccountModal";
import { useState, useEffect } from "react";
import { url, headers } from "../libs/api";
import axios from "axios";
import useLoading from "@/utils/Loading";
import ConfirmationModal from "@/utils/ConfirmationModal";
import { useRouter, useSearchParams } from 'next/navigation'
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
const Page = () => {
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const { loading, startLoading, stopLoading } = useLoading()
    const [message, setMessage] = useState()
    const [responseData, setResponseData] = useState()
    const route = useRouter()
    const [notPassword, setNotPassword] = useState(false)
    const { data: session } = useSession()

    const searchParams = useSearchParams()
    const emailParams = searchParams.get('email')

    const handlePassword = async (e) => {
        e.preventDefault()
        startLoading()
        try {
            const response = await axios.get(`${url}/api/findByEmail/${emailParams}`, { headers });
            // console.log(response)
            if (response) {
              await axios.put(`${url}/api/changePassword/${response.data[0].id}`, {
                    password
                }, { headers });
           
                setResponseData("success")
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setResponseData("failed")
        } finally {
            stopLoading()
        }
    };

    useEffect(() => {
        if (password !== confirmPassword) {
            setNotPassword(true)
        }
        if (password === confirmPassword) {
            setNotPassword(false)
        }
    }, [confirmPassword, password])


    useEffect(() => {
        if (responseData === "success") {
            const timer = setTimeout(() => {
                setMessage(true)
                if (!session) {
                    signIn('credentials', {
                        email: emailParams,
                        password: confirmPassword,
                        redirect: false,
                    });
                }
                route.push('/Profile')
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [responseData]);


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value)
    };

    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = (password) => {
        const isLengthValid = password.length >= 8;
        const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumbers = /\d/.test(password);

        if (!isLengthValid) {
            setErrorMessage('Password must be at least 8 characters long.');
        } else if (!hasSpecialCharacters) {
            setErrorMessage('Password must contain special characters.');
        } else if (!hasNumbers) {
            setErrorMessage('Password must include numbers.');
        }
        else {
            setErrorMessage('');
        }
    };

    return (
        <Layout>
            <AccountModal>
                <div className="grid bg-white py-5 px-12">
                    {message && <ConfirmationModal>
                        <div>
                            <div className="flex flex-col justify-center p-7 justify-center">
                                <div className="flex justify-center">
                                    <AiOutlineCheckCircle size={32} />
                                </div>
                                <div className="text-2xl font-bold whitespace-normal text-center ">
                                    SUCCESSFULLY CHANGED PASSWORD!
                                </div>
                                <div className="text-center italic text-sm">Redirecting you now to the home page.</div>
                                <span className="loader" />
                            </div>
                        </div>
                    </ConfirmationModal>}

                    {responseData === "failed" && <ConfirmationModal>
                        <div>
                            <div className="flex border border-black flex-col justify-center p-7 justify-center">
                                <div className="text-2xl font-bold whitespace-normal text-center ">
                                    PASSWORD CHANGE FAILED!
                                </div>
                                <button onClick={() => setResponseData("")} className="bg-green-500 text-white w-max py-2 px-4 rounded-lg">Okay</button>
                            </div>
                        </div>
                    </ConfirmationModal>}

                    <div className="text-2xl text-center font-bold">New Password</div>
                    <div className="text-sm text-center italic">Change your password.</div>
                    <form className="grid my-4 gap-5" onSubmit={handlePassword}>
                        <input type="password"
                            className="border p-2 text-sm border-2"
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                            placeholder="New Password" required />
                        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                        <input type="password"
                            placeholder="Confirm Password"
                            className={`border ${notPassword && "border-red-600"} p-2 text-sm border-2`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />
                        <button type="submit"
                            disabled={notPassword}
                            className={`py-2 text-white px-4 ${loading ? "bg-gray-600"
                                : notPassword ? "bg-red-600" : "bg-purple-800"} `}>
                            {loading ? "Submiting" : notPassword ? "Passwords don't match!" : "Submit"}
                        </button>
                    </form>
                </div>

            </AccountModal>
        </Layout>
    );
}

export default Page;