import { useEffect, useState } from 'react';
import axios from 'axios';
import { url, headers } from '@/app/libs/api';
import InformationModal from '@/utils/InformationModal';
import { AiFillCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import useLoading from '@/utils/Loading';

const Semester = ({ setOpen }) => {
    const [fetchedData, setFetchedData] = useState()
    const [edit, setEdit] = useState(false)
    const [message, setMessage] = useState()
    const [data, setData] = useState({
        start: fetchedData?.start || "",
        end: fetchedData?.end || "",
        sy: fetchedData?.sy || ""
    });
    const { loading, startLoading, stopLoading } = useLoading()



    const handleChange = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }))
    };

    const handleGetData = async () => {
        try {
            const response = await axios.get(`${url}/api/Semester`, { headers });
            setFetchedData(response.data[0])
        } catch (error) {
            alert("Something went wrong!")
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetData()
    }, [])

    const handleUpload = async (e) => {
        e.preventDefault()
        startLoading()
        try {
            const response = await axios.post(`${url}/api/Semester`, {
                data
            }, { headers });
            stopLoading()
            handleGetData()
            setMessage("Success")
        } catch (error) {
            alert("Something went wrong!")
            console.error(error);
            stopLoading()
        }
    };
    const handleEdit = async (e) => {
        e.preventDefault()
        startLoading()
        try {
            const response = await axios.put(`${url}/api/Semester`, {
                data
            }, { headers });
            stopLoading()
            setEdit(!edit)
            handleGetData()
            setMessage("Success")
        } catch (error) {
            alert("Something went wrong!")
            console.error(error);
            stopLoading()
        }
    };

    return (
        <InformationModal>
            <div className='relative bg-gray-300 p-24 w-full h-full'>
                <div className="absolute -top-4 -right-4">
                    <button
                        onClick={() => setOpen("")} className="rounded-full text-red-600 bg-white">
                        <AiFillCloseCircle size={30} />
                    </button>
                </div>
                {fetchedData && !edit &&
                    <div className='p-10 border-2 grid w-[30rem] gap-4 justify-center items-center'>
                        <label className='flex justify-between'>
                            Start of Semester:
                            <p className='bg-red-800 px-2 text-white'>{fetchedData.start}</p>
                        </label>
                        <label className='flex justify-between'>
                            End of Semester:
                            <p className='bg-red-800 px-2 text-white'>{fetchedData.end}</p>
                        </label>
                        <label className='flex justify-between'>
                            School Year:
                            <p className='bg-red-800 px-2 text-white'>{fetchedData.sy}</p>
                        </label>
                        <div className='flex justify-center'>
                            <button className='bg-red-700 text-white w-max py-2 px-2'
                                onClick={() => setEdit(!edit)}
                                disabled={loading}
                                type='button'>EDIT</button>
                        </div>
                    </div>}
                {message && <InformationModal>
                    <div className="p-12 grid gap-4">
                        <div className="flex justify-center">
                            <AiOutlineCheckCircle size={32} />
                        </div>
                        <div className="text-2xl text-center">
                            Successfully Saved!
                        </div>
                        <div className="flex justify-center">
                            <button onClick={() => setMessage("")} className="bg-green-500 text-white py-2 w-max px-4 rounded-lg">Okay</button>
                        </div>
                    </div></InformationModal>}
                {edit && 
                <form onSubmit={handleEdit} className='p-10 border-2 grid gap-4 justify-center items-center'>
                    <label className='flex gap-2'>
                        Start of Semester:
                        <input
                            value={data.start}
                            type="date"
                            className='bg-red-700 text-white'
                            onChange={(e) => handleChange("start", e.target.value)}
                            required
                        />
                    </label>
                    <label className='flex gap-2'>
                        End of Semester:
                        <input
                            value={data.end}
                            type="date"
                            className='bg-red-700 text-white'
                            onChange={(e) => handleChange("end", e.target.value)}
                            required
                        />
                    </label>
                    <label className='flex gap-2'>
                        School Year:
                        <input
                            value={data.sy}
                            type="text"
                            className=''
                            onChange={(e) => handleChange("sy", e.target.value)}
                            required
                        />
                    </label>
                    <div className='flex justify-center'>
                        <button className='bg-red-700 text-white w-max py-2 px-2'
                            disabled={loading}
                            type='submit'>{loading ? "Please wait..." : "SAVE"}</button>
                    </div>

                </form>}
            </div>
        </InformationModal>
    );
};

export default Semester;
