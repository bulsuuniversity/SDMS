"use client"

import { useState } from "react";
import Layout from "../Layout";
import Image from "next/image";
import Carousel from "./Carousel";
import About from "./About";
import Contact from "./Contact";
import College from "./College";
import CreateAccount from "./CreateAccount";
import Semester from "./Semester";


const Page = () => {
    const [open, setOpen] = useState("")
    return (
        <Layout>
            <div className="flex ml-12 justify-between p-6 w-1/2">
                <div className="grid pt-2 gap-4 h-max">
                    <p className="font-bold">Manage home page Images:</p>
                    <p className="font-bold">Edit user home page details:</p>
                </div>
                <div className="grid gap-12">
                    <div className="flex justify-end">
                        <button onClick={() => setOpen("carousel")} className="bg-red-800 w-28 text-white py-1 px-6">Manage</button>
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-bold">About:</p>
                            <button onClick={() => setOpen("about")} className="bg-red-800 w-28 text-white py-1 px-6">Manage</button>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-bold">Footer:</p>
                            <button onClick={() => setOpen("contact")} className="bg-red-800 w-28  text-white py-1 px-6">Manage</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex ml-12 justify-between p-6 w-1/2">
                <p className="font-bold">Set School Year:</p>
                <button onClick={() => setOpen("semester")} className="bg-red-800 w-28 text-white py-1 px-7">Edit</button>
            </div>
            <div className="flex ml-12 justify-between p-6 w-1/2">
                <p className="font-bold">Manage College:</p>
                <button onClick={() => setOpen("college")} className="bg-red-800 w-28  text-white py-1 px-6">Manage</button>
            </div>
            <div className="flex ml-12 justify-between p-6 w-1/2 mb-20">
                <p className="font-bold">Create Accounts:</p>
                <button onClick={() => setOpen("accounts")} className="bg-red-800 w-28  text-white py-1 px-7">Upload</button>
            </div>
            {open === "college" &&
                <College setOpen={setOpen} />
            }
            {open === "carousel" &&
                <Carousel setOpen={setOpen} />
            }
            {open === "about" &&
                <About setOpen={setOpen} />
            }
            {open === "contact" &&
                <Contact setOpen={setOpen} />
            }
            {open === "accounts" &&
                <CreateAccount setOpen={setOpen} />
            }
            {open === "semester" &&
                <Semester setOpen={setOpen} />
            }
        </Layout>
    );
}

export default Page;