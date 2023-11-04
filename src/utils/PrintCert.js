// PrintCert.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableCert from '@/components/PrintableCert';
import { BsFillPrinterFill } from 'react-icons/bs';
import InformationModal from './InformationModal';
import { AiFillCloseCircle } from 'react-icons/ai';

const PrintCert = ({ content, setPrint }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <InformationModal>
            <div className='relative m-10'>
            
                <button className='bg-red-700 text-white px-4 py-2' onClick={handlePrint}>
                    <BsFillPrinterFill size={24} />  Print
                </button>
             
            </div>
        </InformationModal>
    );
};

export default PrintCert;
