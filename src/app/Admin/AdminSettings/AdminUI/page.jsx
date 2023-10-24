"use client"

import { useState } from "react";
import Layout from "../Layout";
import Image from "next/image";
import Carousel from "./Carousel";
import About from "./About";
import Contact from "./Contact";


const Page = () => {
    const [open, setOpen] = useState("")
    return (
        <Layout>
            <div className="flex ml-12 justify-between p-6 w-1/2">
                <div className="grid">
                    <p className="font-bold">Manage home page Images:</p>
                    <p className="font-bold">Edit user home page details:</p>
                </div>
                <div className="grid gap-20">
                    <div className="flex justify-end">
                        <button onClick={() => setOpen("carousel")} className="bg-red-800 text-white py-1 px-6">Manage</button>
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-bold">About:</p>
                            <button onClick={() => setOpen("about")} className="bg-red-800 text-white py-1 px-6">Manage</button>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-bold">Footer:</p>
                            <button onClick={() => setOpen("contact")} className="bg-red-800 text-white py-1 px-6">Manage</button>
                        </div>
                    </div>
                </div>
            </div>
            {open === "carousel" &&
                <Carousel setOpen={setOpen} />
            }
            {open === "about" &&
                <About setOpen={setOpen} />
            }
            {open === "contact" &&
                <Contact setOpen={setOpen} />
            }
        </Layout>
    );
}

export default Page;