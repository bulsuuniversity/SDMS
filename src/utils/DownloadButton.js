// DownloadPage.js
import React, { useRef, useEffect } from 'react';
import DownloadableCert from '@/components/DownloadableCert';


const DownloadButton = () => {
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
        <div>
            <DownloadableCert ref={downloadableDivRef} />
            <button type='button' onClick={handleDownload}>Download Image</button>
        </div>
    );
};

export default DownloadButton;
