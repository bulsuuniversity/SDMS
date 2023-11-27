import InformationModal from "@/utils/InformationModal";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { url, headers } from "@/app/libs/api";
import useLoading from "@/utils/Loading";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const College = ({ setOpen }) => {
    const [colleges, setColleges] = useState()
    const [name, setName] = useState()
    const [acronym, setAcronym] = useState()
    const [message, setMessage] = useState()
    const { loading, startLoading, stopLoading } = useLoading()
    const [edit, setEdit] = useState()
    const [add, setAdd] = useState(false)

    const getDetails = async () => {
        try {
            const details = await axios.get(`${url}/api/Colleges`,
                { headers });
            setColleges(details.data)
        } catch (err) {
            console.log(err)
        }
    }



    const handleEdit = async (e) => {
        e.preventDefault()
        startLoading()
        try {
            await axios.put(`${url}/api/Colleges/${edit}`,
                { name, acronym }, { headers });
            setMessage("Edited")
            getDetails()
            setName("")
            setEdit("")
            setAcronym("")
            setEdit(false)
            stopLoading()
        } catch (err) {
            console.log(err)
            stopLoading()
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        startLoading()
        try {
            await axios.post(`${url}/api/Colleges`,
                { name, acronym }, { headers });
            setMessage("Created")
            stopLoading()
            setAdd(false)
            setName("")
            setAdd("")
            setAcronym("")
            getDetails()
        } catch (err) {
            console.log(err)
            stopLoading()
        }
    }

    useEffect(() => {
        getDetails()
    }, [])

    const handleDelete = async (collegeId) => {
        startLoading()
        try {
            await axios.delete(`${url}/api/Colleges/${collegeId}`,
                { name, acronym }, { headers });
            setMessage("Deleted")
            getDetails()
            stopLoading()
        } catch (err) {
            console.log(err)
            stopLoading()
        }
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
                    <div className="p-12 grid gap-4">
                        <div className="flex justify-center">
                            <AiOutlineCheckCircle size={32} />
                        </div>
                        <div className="text-2xl text-center">
                            Successfully {message}!
                        </div>
                        <div className="flex justify-center">
                            <button onClick={() => setMessage("")} className="bg-green-500 text-white py-2 w-max px-4 rounded-lg">Okay</button>
                        </div>
                    </div></InformationModal>}
                <div className="grid p-10 border-2 gap-2">
                    <p className="flex text-center text-lg my-2 font-semibold">College List</p>
                    {colleges?.map((college, index) => (
                        <li key={index} className="bg-red-700 text-white px-4 py-1 rounded-lg flex items-center justify-between">
                            <p>{college.name} &#40;{college.acronym}&#41;</p>
                            <div className="flex gap-2">
                                <button onClick={() => setEdit(college.id)}><BiEdit size={24} /></button>
                                <button onClick={() => handleDelete(college.id)}><MdDeleteForever size={24} /></button>
                            </div>
                        </li>
                    ))}
                    <div className="flex my-4 justify-center">
                        <button onClick={() => setAdd(!add)} className="bg-red-800 text-white rounded-lg px-4 py-2">Add</button>
                    </div>
                </div>
                {edit &&
                    <InformationModal>
                        <form className="grid gap-2 text-lg md:mx-32 mx-2 md:my-16 my-max" onSubmit={handleEdit}>
                            <p>Edit College:</p>
                            <input
                                className="rounded-md bg-gray-100 border"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Name"
                                required />
                            <input
                                className="rounded-md bg-gray-100 border"
                                value={acronym}
                                onChange={(e) => setAcronym(e.target.value)}
                                type="text"
                                placeholder="Acronym"
                                required />
                            <div className="flex justify-center mx-6 mt-6">
                                <button disabled={loading} type="submit" className="py-1 mx-1 px-8 bg-red-800 rounded-lg text-white">{loading ? "Saving" : "Save"}</button>
                                <button onClick={() => setEdit("")} disabled={loading} type="button" className="py-1 mx-1 px-8 bg-red-800 rounded-lg text-white">Cancel</button>
                            </div>
                        </form></InformationModal>}
                {add &&
                    <InformationModal>
                        <form className="grid gap-2 text-lg md:mx-32 mx-2 md:my-16 my-max" onSubmit={handleAdd}>
                            <p>Add College:</p>
                            <input
                                className="rounded-md bg-gray-100 border"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Name"
                                required />
                            <input
                                className="rounded-md bg-gray-100 border"
                                value={acronym}
                                onChange={(e) => setAcronym(e.target.value)}
                                type="text"
                                placeholder="Acronym"
                                required />
                            <div className="flex justify-between mx-6 mt-6">
                                <button disabled={loading} type="submit" className="py-1 px-8 mx-1 bg-red-800 rounded-lg text-white">{loading ? "Saving" : "Save"}</button>
                                <button onClick={() => setAdd(false)} disabled={loading} type="button" className="py-1 mx-1 px-8 bg-red-800 rounded-lg text-white">Cancel</button>
                            </div>
                        </form>
                    </InformationModal>
                }
            </div>
        </InformationModal>
    );
}

export default College;
