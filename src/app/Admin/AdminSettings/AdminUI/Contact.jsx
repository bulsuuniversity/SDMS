import InformationModal from "@/utils/InformationModal";
import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";
import { url, headers } from "@/app/libs/api";
import useConfirmation from "@/utils/ConfirmationHook";
import useLoading from "@/utils/Loading";
import { FcDataConfiguration } from "react-icons/fc";

const Contact = ({ setOpen }) => {
    const { loading, startLoading, stopLoading } = useLoading()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const [message, setMessage] = useState(false)
    const [formData, setFormData] = useState({
        location: "",
        phoneNumber: "",
        email: "",
    })

    const getDetails = async () => {
        try {
            const details = await axios.get(`${url}/api/HomeDetails/${"64fdc6b73128648258b80c86"}`,
                { headers });
            setFormData({
                location: details.data[0].address,
                phoneNumber: details.data[0].phoneNumber,
                email: details.data[0].email,
            })
        } catch (err) {
            console.log(err)
        }
    }

    // const CreateData = {
    //     address: "Bulacan",
    //     email: "email@gmail.com",
    //     phoneNumber: "02394923",
    //     about: "sdfsdf"
    // }


    // const createDetails = async () => {
    //     try {
    //         await axios.post(`${url}/api/HomeDetails`, CreateData, { headers });
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const handleUpdate = async () => {
        startLoading()
        try {
            await axios.put(`${url}/api/HomeDetails/${"64fdc6b73128648258b80c86"}`,
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

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcDataConfiguration size={32} />Update data</div>
            <p className='text-xl p-6'>Are you sure you want to change this?</p>
        </div>, () => {
            handleUpdate()
        });
    };

    return (
        <InformationModal>
            <ConfirmationDialog />
            <div className="relative p-6 rounded-lg bg-gray-200">
                {/* <div className="p-6 bg-white">
                    <button onClick={createDetails} className="bg-blue-600 p-4">Create</button>
                </div> */}
                <div className="absolute -top-4 -right-4">
                    <button
                        onClick={() => setOpen("")} className="rounded-full text-red-600 bg-white">
                        <AiFillCloseCircle size={30} /></button>
                </div>
                {message && <InformationModal>
                    <div className="p-10 border border-black grid gap-3">
                        <div className="flex justify-center">
                            <AiOutlineCheckCircle size={32} />
                        </div>
                        <div className="text-2xl text-center">
                            Successfully updated!
                        </div>
                        <div className="flex justify-center">
                            <button onClick={() => setMessage(false)} className="bg-green-500 text-white w-max py-2 px-4 rounded-lg">Okay</button>
                        </div>
                    </div></InformationModal>}
                <form className="grid gap-2 text-2xl" onSubmit={handleSubmit}>
                    <label className="font-bold">School Name:</label>
                    <input
                        className="ml-8 rounded-md bg-gray-300"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        type="text"
                        placeholder="School Name"
                        required />
                    <label className="font-bold">Location:</label>
                    <input
                        className="ml-8 rounded-md bg-gray-300"
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        type="text"
                        placeholder="Location"
                        required />
                    <label className="font-bold">School year:</label>
                    <input
                        className="ml-8 rounded-md bg-gray-300"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e.target.value)}
                        type="text"
                        placeholder="School year"
                        maxLength={14}
                        required />
                    <div className="flex justify-center mt-6">
                        <button disabled={loading} type="submit" className="py-1 px-8 bg-red-800 text-white">{loading ? "Saving" : "Save"}</button>
                    </div>
                </form>
            </div>
        </InformationModal>
    );
}

export default Contact;
