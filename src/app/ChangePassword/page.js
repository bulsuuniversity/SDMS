"use client"

import AccountModal from "@/utils/AccountModal";
import ConfirmationModal from "@/utils/ConfirmationModal";
import useLoading from "@/utils/Loading";
import { useProfileData } from "../libs/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { url, headers } from "../libs/api";
import Layout from "@/components/Layout";


const Page = () => {
    const [email, setEmail] = useState("");
    const { profileData } = useProfileData();
    const { loading, startLoading, stopLoading } = useLoading();
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("")


    const handleSendCode = async (e) => {
        e.preventDefault();
        startLoading();
        setSent(true);
        stopLoading();
    };

    return (
        <Layout>
            <AccountModal>
                <div className="grid justify-center items-center py-6 bg-white px-10">
                    <div className="font-bold text-center text-2xl">
                        {profileData.id !== " " ? 'Change Password' : 'Forgot Password'}
                    </div>
                    <div className="text-xs text-center italic py-4">
                        {sent ? 'Please verify if it is you.' :
                            `Please ${profileData.id !== " " ? "enter" : "correct"} the needed information below.`}
                    </div>
                    <form className="grid gap-5" onSubmit={handleSendCode}>
                        <input
                            type="email"
                            className="w-full text-xs px-3 py-2 border"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        ></input>
                        <button
                            type="submit"
                            className={`text-white py-2 w-full ${loading ? 'bg-gray-600' : "bg-purple-600"}`}
                        >
                            {sent ? 'Resend verification link' : 'Submit'}
                        </button>
                    </form>
                </div>
            </AccountModal>
        </Layout>
    );
};

export default Page;
