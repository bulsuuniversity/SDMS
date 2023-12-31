import React from "react";
import { useState } from "react";
import Image from "next/image";

const PrintableCert = React.forwardRef(({ content }, ref) => {
    const [studentName, setStudentName] = useState('');
    const [disciplinaryAction, setDisciplinaryAction] = useState('');
    const [agreementText, setAgreementText] = useState('');

    const now = new Date();
    const day = now.getDate();
    const year = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'long' });
    const date = `${month} ${day}, ${year}`;

    return (
        <div className='w-full p-10'>
            <form>
                <div className="w-full h-full " ref={ref}>
                    <div className="mx-6">
                        <div className="w-full h-max flex justify-center items-center gap-6">
                            <Image className="w-max h-max" width={44} height={44} src={"/Logo.png"} alt="Logo" />
                            <div className="grid my-6">
                                <p className="font-semibold text-center">Aaron Anablon University</p>
                                <p className="font-semibold text-center">Discipline Committee</p>
                                <p className="italic text-center">Baguio, City</p>
                            </div>
                        </div>
                        <div className="text-center w-full my-6">
                            CERTIFICATE OF CLEARANCE
                        </div>

                        {content && <p className="indent-8">
                            This is to certify that <ins>{content.offender}</ins> of <ins>{content.college} {content.course}</ins> has been CLEARED from their misconduct happened within Bulacan State University - Bustos Campus Premises.
                        </p>}
                        <p className="indent-8 my-2">
                            This certificate were issued on {date}.
                        </p>
                        <p className="mt-8">
                            Acknowledged By:
                        </p>
                        <p className="mt-4 underline underline-offset-8 ">
                            Jane Doe
                        </p>
                        <p className="italic pt-2 text-xs">Discipline Committee Chair</p>
                        <br />
                    </div>
                </div>
            </form>
        </div>
    );
});

export default PrintableCert;
