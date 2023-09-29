import React, { useState } from 'react';
import axios from 'axios';
import InformationModal from '@/utils/InformationModal';
import useLoading from '@/utils/Loading';
import useConfirmation from '@/utils/ConfirmationHook';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import { url, headers } from '@/app/libs/api';


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
            const sendCode = await axios.post(`${url}/api/AdminSendMail`, emailData, { headers });
            setSuccess(true)
            setSentEmail("")
            stopLoading()
        } catch (error) {
            console.error('Error:', error);
            stopLoading()
        }
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        showConfirmation('Are you sure you want to send message?', () => {
            handleSubmitReport()
        });
    };

    const handleClose = () => {
        setSuccess(false)
        setClose()
    }

    return (
        <InformationModal>
            <div className="relative text-lg sm:w-80 w-72 md:w-[45rem] rounded-lg grid justify-center bg-gray-300 p-6">
                <div className="absolute -top-4 -right-4">
                    <button
                        onClick={() => setClose(false)} className="rounded-full text-red-600 bg-white">
                        <AiFillCloseCircle size={30} /></button>
                </div>
                <ConfirmationDialog />
                {loading && <InformationModal>
                        <div className="grid justify-center p-6">
                            <div>Sending Message.</div>
                            <p>Please wait...</p>
                        </div>
                    </InformationModal>}
                {success ?
                    <>
                        <div className='bg-amber-200 grid p-10 rounded-lg gap-4'>
                            <p>Sent Successfully!</p>
                            <button onClick={handleClose} className='bg-amber-600 rounded-lg py-2 px-4'>Okay</button>
                        </div>
                    </> :
                    <form onSubmit={handleSendEmail}><div className='grid bg-gray-100 p-3 rounded-lg'>
                        <div className='relative grid mb-4'>
                            <label>Message:  </label>
                            <textarea
                                className='ml-4'
                                value={sentEmail}
                                onChange={(e) => setSentEmail(e.target.value)}
                                rows="8"
                                cols="50"
                                placeholder="Enter your message..."
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
