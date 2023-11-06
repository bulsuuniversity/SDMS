"use client"

import { useState, useEffect } from "react";
import { useSession, signIn } from 'next-auth/react';
import Link from "next/link";
import Layout from "@/components/Layout";
import AccountModal from "@/utils/AccountModal";
import ConfirmationModal from "@/utils/ConfirmationModal";
import { useRouter } from "next/navigation";
import InformationModal from "@/utils/InformationModal";
import axios from "axios";
import { url, headers } from "@/app/libs/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false)
    const route = useRouter()
    const [erroring, setError] = useState(false)
    const [errorMess, setErrorMess] = useState(false)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const status = "Registered Active"

    const handleUpdateStatus = async (id) => {
        try {
            const response = await axios.put(`${url}/api/AdminApproveAccount/${id}`,
                status, { headers });
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const emailCheck = await axios.get(`${url}/api/findByEmail/${email}`, { headers });
        // console.log(emailCheck.data[0].id)
        if (Array.isArray(emailCheck.data)
            && emailCheck.data.length > 0
            && emailCheck.data[0].role === "admin") {
            handleUpdateStatus(emailCheck.data[0].id)
            const response = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
            });
            if (response.error) {
                setLoading(false)
                setError(true)
                setErrorMess("Failed to Login! Please check the email or password.")
            }
        } else {
            setErrorMess("You don't have account yet!")
            setError(true)
            setLoading(false)
        }
    };

    useEffect(() => {
        if (session && session.role === "user") {
            const timer = setTimeout(() => {
                setLoading(false)
                setSuccess(true);
                route.push('/')
            }, 500);
            return () => {
                clearTimeout(timer);
            };
        } else if (session && session.role === "admin") {
            const timer = setTimeout(() => {
                setLoading(false)
                setSuccess(true);
                route.push('/Admin/AdminDashboard')
            }, 500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [session]);

    return (
        <Layout>
            <InformationModal>
                <div className="bg-white p-6 shadow-lg z-10">
                    <div className="mx-4">
                        <div className="flex flex-col text-xs justify-center">
                            <h2 className="text-2xl text-center font-semibold">Admin Login</h2>
                            <h4 className="italic py-4 text-center">Please enter the needed information below.</h4>
                        </div>
                        {erroring &&
                            <InformationModal>
                                <div className="grid p-12 justify-center gap-4">
                                    <p className="text-center w-52">{errorMess}</p>
                                    <div className="flex justify-center">
                                        <button onClick={() => setError(false)}
                                            className="px-4 bg-green-500 text-white rounded-lg py-2 w-max">Okay</button>
                                    </div>
                                </div>
                            </InformationModal>}
                        <form onSubmit={handleSubmit}>
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
                            <div className="mb-4">
                                <input
                                    type="password"
                                    className="w-full text-xs px-3 py-2 border border-black"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    required
                                />
                                <Link href={"/Admin/AdminSettings/AdminAccount/ChangePassword"} className="text-blue-500 text-xs cursor-pointer text-end">Forgot password? Click here.</Link>
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-2 my-4 ${loading ? 'bg-gray-600' : "bg-fuchsia-950 hover:bg-blue-600"} text-white px-4 `}
                                disabled={loading}
                            >
                                Log In
                            </button>
                            <Link href="/Admin/AdminRegister" className="text-blue-500 cursor-pointer text-xs text-end">
                                Don't have an admin account? Register here.
                            </Link>
                        </form>
                    </div>
                </div>

                {success && (
                    <ConfirmationModal>
                        <div className="flex flex-col rounded-lg justify-center bg-red-700 text-white p-7 justify-center">
                            <div className="text-2xl mb-4 font-bold whitespace-normal text-center ">
                                {session && 'SUCCESSFULL!'}
                            </div>
                            <div className="text-center italic text-sm">Redirecting you now to the home page.</div>
                            <span className="loader" />
                        </div>
                    </ConfirmationModal>
                )}
            </InformationModal>
        </Layout>
    );
}

export default Login;
