"use client"

import { useState, useEffect } from "react";
import useLoading from "@/utils/Loading";
import { useRouter, useSearchParams } from 'next/navigation'
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import AdminAccountModal from "@/utils/AdminAccountModal";

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
        setResponseData("success")
        stopLoading()

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
                route.push('/Admin/AdminDashboard')
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
            <AdminAccountModal>
                <div className="grid bg-white py-5 px-12">
                    <div className="text-2xl text-center font-bold">New Password</div>
                    <div className="text-sm text-center italic">Change your password.</div>
                    <form className="grid my-4 gap-5" onSubmit={handlePassword}>
                        <input type="password"
                            className="border p-2 text-sm border-2"
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                            placeholder="Password" required />
                        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                        <input type="password"
                            placeholder="Confirm Password"
                            className={`border ${notPassword && "border-red-600"} p-2 text-sm border-2`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />
                        <button type="submit"
                            disabled={notPassword}
                            className={`py-2 text-white px-4 ${loading ? "bg-gray-600" :
                                notPassword ? "bg-red-600" : "bg-purple-800"} `}>
                            {loading ? "Submiting" : notPassword ? "Passwords don't match!" : "Submit"}
                        </button>
                    </form>
                </div>

            </AdminAccountModal>
        </Layout>
    );
}

export default Page;
