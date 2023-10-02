"use client"

import { useState } from "react";
import Layout from "../Layout";
import useConfirmation from "@/utils/ConfirmationHook";
import useLoading from "@/utils/Loading";
import InformationModal from "@/utils/InformationModal";
import { useProfileData } from "@/app/libs/store";
import axios from "axios";
import { url, headers } from "@/app/libs/api"
import { FcDataProtection } from "react-icons/fc";

const Page = () => {
    const { profileData } = useProfileData()
    const [formData, setFormData] = useState({
        current: "",
        new: "",
        confirm: ""
    })
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const { loading, startLoading, stopLoading } = useLoading()

    const data = {
        current: formData.current,
        confirm: formData.confirm,
    };

    const handleChangePass = async () => {
        startLoading()
        try {
            const checkPass = await axios.post(`${url}/api/AdminAccountUpdate/${profileData.id}`,
                data, { headers });
            if (checkPass.data) {
                const response = await axios.put(`${url}/api/AdminAccountUpdate/${profileData.id}`,
                    data, { headers })
                setSuccess(true)
                stopLoading()
            }
            if (!checkPass.data) {
                setFailed(true)
                stopLoading()
            }
        } catch (err) {
            console.log(err);
            stopLoading()
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
        <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcDataProtection size={32}/>Change Password</div>
         <p className='text-xl p-6'>Are you sure you want to change password?</p>
         </div>, () => {
            handleChangePass()
        });
    };

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <Layout>
            <ConfirmationDialog />
            {success && <InformationModal>
                <div className="grid p-6 justify-center gap-4 w-48">
                    <div className="py-2">Successfully changed password!</div>
                    <div className="flex justify-center">
                        <button onClick={() => setSuccess(false)} className="bg-amber-600 w-24 px-4 py-2 rounded-lg">Okay</button>
                    </div>
                </div>
            </InformationModal>
            }
            {failed && <InformationModal>
                <div className="grid p-6 bg-red-500 justify-center gap-4 w-52">
                    <div className="py-2 text-white">Error! Current Password is incorrect.</div>
                    <div className="flex justify-center">
                        <button onClick={() => setFailed(false)} className="bg-amber-400 w-24 px-4 py-2 rounded-lg">Okay</button>
                    </div>
                </div>
            </InformationModal>
            }
            {loading && <InformationModal>
                <div className="grid justify-center gap-4 w-28">
                    <div className="p-10">Please wait...</div>
                </div>
            </InformationModal>
            }
            <form onSubmit={handleUpdate} className="grid gap-2 pt-2 pl-6">
                <p>Admin ID: </p>
                <div className="ml-6 grid">
                    <p>change password:</p>
                    <div className="bg-gray-400 grid w-3/4 justify-end gap-3 p-6">
                        <div className="flex justify-end  gap-4">
                            <p>Current Password:</p>
                            <input
                                value={formData.current}
                                onChange={(e) => handleChange("current", e.target.value)}
                                type="password"
                                placeholder="Current Password"
                                className="border bg-white"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <p>New Password:</p>
                            <input
                                value={formData.new}
                                onChange={(e) => handleChange("new", e.target.value)}
                                type="password"
                                placeholder="New Password"
                                className="border bg-white"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <p>Confirm Password:</p>
                            <input
                                value={formData.confirm}
                                onChange={(e) => handleChange("confirm", e.target.value)}
                                type="password"
                                placeholder="Confirm Password"
                                className="border bg-white"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-red-800 text-white py-2 px-4">Save Changes</button>
                </div>
            </form>
        </Layout>
    );
}

export default Page;
