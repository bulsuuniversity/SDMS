// PrintButton.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableComponent from '@/components/PrintableComponent';

const PrintButton = ({ contentRef }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <PrintableComponent ref={componentRef} />
            <button onClick={handlePrint}>
                Print
            </button>
        </>

    );
};

export default PrintButton;
