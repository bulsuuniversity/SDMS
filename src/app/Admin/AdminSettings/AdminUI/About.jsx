import InformationModal from "@/utils/InformationModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { url, headers } from "@/app/libs/api";
import useLoading from "@/utils/Loading";

const About = ({ setOpen }) => {
    const [formData, setFormData] = useState()
    const [message, setMessage] = useState()
    const { loading, startLoading, stopLoading } = useLoading()
    const getDetails = async () => {
        try {
            const details = await axios.get(`${url}/api/HomeAbout/${"64fdc6b73128648258b80c86"}`,
                { headers });
            setFormData(details.data[0].about)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async () => {
        startLoading()
        try {
            await axios.put(`${url}/api/HomeAbout/${"650052b5a72ea4301b3147ab"}`,
                formData, { headers });
            setMessage(true)
            stopLoading()
        } catch (err) {
            console.log(err)
            stopLoading()
        }
    }

    useEffect(() => {
        getDetails()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdate()
    }
    return (
        <InformationModal>
            <div className="relative p-6 rounded-lg bg-gray-200">
                <div className="absolute -top-4 -right-4">
                    <button
                        onClick={() => setOpen("")} className="rounded-full text-red-600 bg-white">
                        <AiFillCloseCircle size={30} /></button>
                </div>
                {message && <InformationModal>
                    <div className="p-10 grid gap-3">
                        <div className="text-2xl text-center">
                            Successfully updated!
                        </div>
                        <div className="flex justify-center">
                            <button onClick={() => setMessage(false)} className="bg-amber-100 py-2 w-16 px-4 rounded-lg">Okay</button>
                        </div>
                    </div></InformationModal>}
                <form className="grid gap-2 text-lg md:mx-32 mx-2 md:my-16 my-max" onSubmit={handleSubmit}>
                    <textarea
                        className="h-[20rem] md:w-[60rem] sm:w-[40rem] w-[30rem] text-center p-5 whitespace-normal rounded-md bg-gray-300"
                        value={formData}
                        onChange={(e) => setFormData(e.target.value)}
                        type="text"
                        placeholder="About"
                        required />
                    <div className="flex justify-center mt-6">
                        <button disabled={loading} type="submit" className="py-1 px-8 bg-red-800 text-white">{loading ? "saving" : "Save"}</button>
                    </div>
                </form>
            </div>
        </InformationModal>
    );
}

export default About;
