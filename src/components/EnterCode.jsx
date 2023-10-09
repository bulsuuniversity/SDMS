import { useState, useEffect } from "react";
import ConfirmationModal from "@/utils/ConfirmationModal";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { url } from "@/app/libs/api";


const EnterCode = ({ registerData, sentCode }) => {
    const [code, setCode] = useState()
    const [submitted, setSubmitted] = useState(false)
    const [xCode, setXCode] = useState(false)
    const [uploading, setUploading] = useState(false)
    const router = useRouter()
    const currentPathName = usePathname()

    const handleChange = (e) => {
        e.preventDefault()
        setCode(e.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setSubmitted(false)
        }, 1500);
        return () => {
            if (currentPathName === "/Register") {
                    router.push("/Login")
            } else {
                router.push("/Admin/AdminLogin")
            }
            clearTimeout(timer);
        };
    }, [submitted]);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'sikretong-malupet',
        'Accept': 'application/json',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true)
        if (sentCode === code) {
            try {
                const response = await axios.post(`${url}/api/studentAccount`, registerData, { headers });
                setUploading(false)
                setSubmitted(true)
            } catch (error) {
                console.error('Error:', error);
                setUploading(false)
            }
        } else {
            setXCode(true)
            setUploading(false)
        }
    };

    return (
        <>
            <div className="bg-white p-6 shadow-lg flex justify-center z-10">
                <div className="mx-1 w-3/4">
                    <div className="flex flex-col text-xs justify-center">
                        <h2 className="text-2xl text-center font-semibold">Login</h2>
                        <h4 className="italic text-xs text-center">Please verify if it's you.</h4>
                        <div className="bg-green-300 rounded-full text-center whitespace-normal mt-4 p-4">
                            Enter the verification code sent to your email.
                        </div>
                        <p className="italic text-xs mb-4">If not received, please check spam emails.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-sm">
                            <input
                                type="text"
                                className="w-full text-xs px-3 py-2 border border-black"
                                value={code}
                                onChange={handleChange}
                                placeholder="Code"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`${uploading ? 'bg-gray-500' : "bg-purple-800"} w-full py-2 my-3 px-4  text-white  hover:bg-purple-600`}
                            disabled={uploading}
                        >
                            {uploading ? "Please wait" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
            {xCode &&
                <ConfirmationModal>
                    <div className="text-xl font-bold whitespace-normal text-center ">
                        Wrong code entered!
                        <div className="italic text-xs">Please open your gmail account for the code sent.</div>
                        <button onClick={() => setXCode(false)} className="p-2 m-4 text-md rounded-lg w-max bg-green-500">Okay</button>
                    </div>
                </ConfirmationModal>
            }
            {submitted && <ConfirmationModal>
                <div className="flex flex-col justify-center p-7 justify-center">
                    <div className="text-4xl font-bold whitespace-normal text-center ">
                        Succesfully Registered!
                    </div>
                    <div className="text-center">
                        Please wait for the admin to review and approve you account.
                    </div>
                    <div className="text-center italic text-xs">Redirecting you now to login page.</div>
                    <span className="loader" />
                </div>
            </ConfirmationModal>}
        </>
    );
}

export default EnterCode;