// PrintButton.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableComponent from '@/components/PrintableComponent';
import { BsFillPrinterFill } from 'react-icons/bs';
import InformationModal from './InformationModal';
import { AiFillCloseCircle } from 'react-icons/ai';

const PrintButton = ({ college, yearLevel, content, setPrint }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <InformationModal>
            <div className='relative m-16 overflow-y-auto h-screen'>
                <div className="absolute top-4 right-4">
                    <button
                        onClick={() => setPrint(!print)}
                        className="rounded-full px-4 py-2 h-max w-max text-red-600 bg-white">
                        <AiFillCloseCircle size={30} /></button>
                </div>
                <button className='bg-red-700 m-6  text-white flex px-4 py-2' onClick={handlePrint}>
                    <BsFillPrinterFill size={20} />  Print
                </button>
                <PrintableComponent college={college} yearLevel={yearLevel} content={content} ref={componentRef} />
            </div>
        </InformationModal>
    );
};

export default PrintButton;
