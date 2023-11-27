import { useState } from 'react';
import axios from 'axios';
import { url, headers } from '@/app/libs/api';
import InformationModal from '@/utils/InformationModal';
import { AiFillCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import * as XLSX from 'xlsx';
import useLoading from '@/utils/Loading';

const CreateAccount = ({ setOpen }) => {
    const [excelFile, setExcelFile] = useState(null);
    const [message, setMessage] = useState();
    const { loading, startLoading, stopLoading } = useLoading()

    const convertExcelToJson = async (file) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                resolve(jsonData);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        try {
            const jsonData = await convertExcelToJson(file);
            setExcelFile(jsonData);
        } catch (error) {
            console.error('Error converting Excel to JSON:', error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault()
        startLoading()
        // if (!excelFile) {
        //     console.error('No file selected');
        //     return;
        // }
        try {
            const response = await axios.post(`${url}/api/createAccount`, {
                excelFile
            }, { headers });
            stopLoading()
            setMessage("Success")
        } catch (error) {
            alert("Something went wrong!")
            console.error(error);
            stopLoading()
        }
    };

    return (
        <InformationModal>
            <div className='relative bg-gray-300 w-full h-full'>
                <div className="absolute -top-4 -right-4">
                    <button
                        onClick={() => setOpen("")} className="rounded-full text-red-600 bg-white">
                        <AiFillCloseCircle size={30} />
                    </button>
                </div>
                {message && <InformationModal>
                    <div className="p-12 grid gap-4">
                        <div className="flex justify-center">
                            <AiOutlineCheckCircle size={32} />
                        </div>
                        <div className="text-2xl text-center">
                            Successfully created the accounts!
                        </div>
                        <div className="flex justify-center">
                            <button onClick={() => setMessage("")} className="bg-green-500 text-white py-2 w-max px-4 rounded-lg">Okay</button>
                        </div>
                    </div></InformationModal>}
                <form onSubmit={handleUpload} className='p-24 grid gap-4 justify-center items-center'>
                    <input
                        className='bg-red-700 text-white' type="file"
                        onChange={handleFileChange}
                        required
                    />
                    <button className='bg-red-700 text-white py-2'
                        disabled={loading}
                        type='submit'>{loading ? "Uploading! Please wait..." : "Upload Excel File"}</button>
                </form>
            </div>
        </InformationModal>
    );
};

export default CreateAccount;
