import React, { useState } from 'react';
import axios from 'axios';
import InformationModal from '@/utils/InformationModal';
import useLoading from '@/utils/Loading';
import useConfirmation from '@/utils/ConfirmationHook';
import { AiFillCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import { url, headers } from '@/app/libs/api';
import { FcAbout } from 'react-icons/fc';


function SendMessage({ sentEmail, setSentEmail, suggestions, email, setClose }) {
    const [success, setSuccess] = useState(false);
    const { loading, startLoading, stopLoading } = useLoading()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();

    const handleChoiceClick = (choice) => {
        setSentEmail(choice);
    };

    const emailData = {
        email: email,
        subject: "SDMS Admin",
        message: sentEmail,
        html: `<p>${sentEmail}</p>`
    }

    const handleSubmitReport = async () => {
        startLoading()
        try {
           await axios.post(`${url}/api/AdminSendMail`, emailData, { headers });
            setSuccess(true)
            // console.log(sendCode)
            setSentEmail("")
            stopLoading()
        } catch (error) {
            console.error('Error:', error);
            stopLoading()
        }
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcAbout size={32} />Send Message</div>
            <p className='text-xl p-6'>Are you sure you want to send message?</p>
        </div>, () => {
            handleSubmitReport()
        });
    };

    const handleClose = () => {
        setSuccess(false)
        setClose()
    }

    return (
        <InformationModal>
            <div className={`relative text-lg rounded-lg grid justify-center bg-white ${success ? "w-max" : "sm:w-80 w-72 md:w-[45rem]"} p-6`}>
                <div className="absolute -top-4 -right-4">
                    <button
                        onClick={() => setClose(false)} className="rounded-full text-red-600 bg-white">
                        <AiFillCloseCircle size={30} /></button>
                </div>
                <ConfirmationDialog />
                {loading && <InformationModal>
                    <div className="grid justify-center gap-4 bg-red-700 text-white p-10">
                        <div className='text-center'>Sending Message.</div>
                        <p className='text-center'>Please wait...</p>
                    </div>
                </InformationModal>}
                {success ?
                    <>
                        <div className='grid justify-center gap-7'>
                            <div className='flex justify-center'>
                                <AiOutlineCheckCircle className='rounded-full bg-green-400' size={32} />
                            </div>
                            <p>Sent Successfully!</p>
                            <div className='flex justify-center'>
                                <button onClick={handleClose} className='bg-green-600 w-max text-white rounded-lg py-2 px-4'>Okay</button>
                            </div>
                        </div>
                    </> :
                    <form onSubmit={handleSendEmail}><div className='grid bg-gray-100 p-3 rounded-lg'>
                        <div className='relative grid mb-4'>
                            <label>Message:  </label>
                            <textarea
                                className='ml-4 bg-gray-200'
                                value={sentEmail}
                                onChange={(e) => setSentEmail(e.target.value)}
                                rows="8"
                                cols="50"
                                placeholder="Message"
                                required
                            ></textarea>
                            <div className='absolute w-full flex justify-center -bottom-4'>
                                <div onClick={() => setSentEmail("")} className='cursor-pointer rounded px-2 bg-red-700 text-white'>Clear</div>
                            </div>
                        </div>


                        <div className='grid gap-2 rounded-lg bg-gray-100 divide-y'>
                            <div className='bg-gray-100 cursor-pointer rounded-lg' onClick={() => handleChoiceClick(suggestions.one)}>
                                {suggestions.one}
                            </div>
                            {/* <div className='bg-gray-100 cursor-pointer rounded-lg' onClick={() => handleChoiceClick(suggestions.two)}>
                                {suggestions.two}
                            </div> */}
                        </div>
                    </div>
                        <div className="flex mt-4 justify-center">
                            <button disabled={loading} type='submit'
                                className="bg-amber-400 rounded-full px-4 py-2 flex justify-center items-center">
                                <MdOutlineEmail size={32} /> {loading ? "Sending" : "SEND MESSAGE"}
                            </button>
                        </div>
                    </form>}
            </div>
        </InformationModal>
    );
}

export default SendMessage;
