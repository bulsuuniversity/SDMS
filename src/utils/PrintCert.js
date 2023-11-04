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
                <div className="absolute -top-4 -right-4">
                    <button
                        onClick={() => setPrint(!print)}
                        className="rounded-full px-4 py-2 h-max w-max text-red-600 bg-white">
                        <AiFillCloseCircle size={30} /></button>
                </div>
                <PrintableCert ref={componentRef} />
                <button className='bg-red-700 text-white px-4 py-2' onClick={handlePrint}>
                    <BsFillPrinterFill size={24} />  Print
                </button>

            </div>
        </InformationModal>
    );
};

export default PrintCert;
