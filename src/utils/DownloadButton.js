// DownloadPage.js
import React, { useRef, useEffect } from 'react';
import DownloadableCert from '@/components/DownloadableCert';
import InformationModal from './InformationModal';
import PrintCert from './PrintCert';
import { AiFillCloseCircle } from 'react-icons/ai';


const DownloadButton = ({ setPrint }) => {
    const downloadableDivRef = useRef();

    const handleDownload = () => {
        const divToDownload = downloadableDivRef.current;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = divToDownload.offsetWidth;
        canvas.height = divToDownload.offsetHeight;

        // Create a foreignObject with the div content
        const foreignObject = new XMLSerializer().serializeToString(divToDownload);

        // Embed the div content in an SVG image with a background rectangle
        const dataURL = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + canvas.width + '" height="' + canvas.height + '">' +
            '<rect width="100%" height="100%" fill="lightblue"/>' +
            '<foreignObject width="100%" height="100%">' +
            foreignObject +
            '</foreignObject>' +
            '</svg>');

        const img = new Image();
        img.src = dataURL;

        img.onload = () => {
            context.drawImage(img, 0, 0);

            const a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = 'certificate.png';
            a.click();
        };
    };



    return (
        <InformationModal>
            <div className='relative'>
                <div className="absolute top-1 right-1">
                    <button type="button"
                        onClick={() => setPrint(!print)} className="rounded-full text-red-600 bg-white">
                        <AiFillCloseCircle size={30} /></button>
                </div>
                <DownloadableCert ref={downloadableDivRef} />
                <button type='button' onClick={handleDownload}>Download Image</button>
                {/* <PrintCert /> */}
            </div>
        </InformationModal>
    );
};

export default DownloadButton;
