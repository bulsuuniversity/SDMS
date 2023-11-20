"use client"

import Layout from "@/components/Layout";
import Image from "next/image";
import { useState } from "react";
import PersonalInformation from "@/components/PersonalInformation";
import Link from "next/link";
import SelectImage from "@/utils/SelectImage";
import { useProfileData } from "../libs/store"
import { PrivateRoute } from "@/components/auth";


const page = () => {
    const [changeProfile, setChangeProfile] = useState(false)
    const { profileData, getProfileData } = useProfileData()
    const handleCLick = () => {
        setChangeProfile(!changeProfile)
    }


    return (
        <Layout>
            <PrivateRoute>
                {changeProfile &&
                    <SelectImage handleCLick={handleCLick} profileData={profileData} getProfileData={getProfileData} />
                }
                {profileData && profileData.id &&
                    <div className="bg-red-100 border text-lg border-2 h-screen flex justify-center  p-4 z-1">
                        <div className="grid md:grid-cols-12 grid-cols-1 w-screen lg:w-10/12 md:bg-red-50 mb-10 bg-fuchsia-950 h-full items-center">
                            <div className="col-span-3 lg:col-span-2 flex w-full h-full items-center">
                                <div className="bg-green-600">
                                    <div className="relative bg-blue-600 px-6">
                                        <div className="absolute -top-20 left-24 md:-top-52 md:left-16 rounded-full bg-white border
                                     border-white border-8 overflow-hidden z-10 ">
                                            <div className="w-32 h-32 rounded-full overflow-hidden ">
                                                <Image alt="profile"
                                                    src={profileData.profile === null ?
                                                        "https://res.cloudinary.com/dckxajww8/image/upload/v1693269023/icons/profile_2_cotaml.png"
                                                        : profileData.profile}
                                                    width={500}
                                                    height={500}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="absolute top-28 left-24 md:-top-4 md:left-16 z-10 rounded-[2rem] bg-orange-300">
                                            <button
                                                onClick={handleCLick}
                                                className="py-3 w-36">
                                                Change Profile
                                            </button>
                                        </div>
                                        <div className="absolute left-20 -top-32 overflow-hidden md:visible hidden flex flex-col w-28 h-80 justify-center">
                                            <div className="bg-fuchsia-950 h-full">
                                            </div>
                                            <div className={`h-0 w-0 
                                            border-x-[3.6rem] border-x-transparent
                                            border-t-[2rem] border-fuchsia-950
                                            `}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-9 lg:col-span-10 bg-red-50 md:mt-0 xl:ml-10 p-2">
                                <div className="p-2 text-xs md:text-lg">
                                    <h2 className="font-semibold">Account Information</h2>
                                    <div className="ml-4 font-medium flex gap-5">
                                        <div className="grid">
                                            <label htmlFor="email">Email:</label>
                                            <label htmlFor="idNumber">ID Number:</label>
                                            <label htmlFor="password">Password:</label>
                                        </div>
                                        <div className="grid">
                                            <div id="email">{profileData.email}</div>
                                            <div id="idNumber">{profileData.idNumber}</div>
                                            <div id="password">*********</div>
                                        </div>
                                    </div>
                                    <Link href={'/ChangePassword'} className="text-blue-500 text-xs md:text-sm">
                                        Want to change password? Click here.
                                    </Link>
                                </div>

                                <div className="p-6 bg-white relative">
                                    <PersonalInformation />
                                </div>
                            </div>
                        </div>
                    </div>}
            </PrivateRoute>
        </Layout>
    );
}

export default page;