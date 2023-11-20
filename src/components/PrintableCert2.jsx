import React from "react";
import Image from "next/image";

const PrintableCert2 = React.forwardRef(({ content }, ref) => {

    const now = new Date();
    const day = now.getDate();
    const year = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'long' });
    const date = `${month} ${day}, ${year}`;

    return (
        <div className='w-full p-10'>
            <form>
                <div className="w-full h-full " ref={ref}>
                    <Image width={1500} className="w-full" layout="responsive" height={500} src={"/HEADER.png"} alt="header" />
                    <div className="mx-6">
                        <div className="w-full h-max flex justify-center items-center gap-6">
                            <Image className="w-max h-max" width={44} height={44} src={"/Logo.png"} alt="Logo" />
                            <div className="grid my-6">
                                <p className="font-semibold text-center">Bulacan State University</p>
                                <p className="font-semibold text-center">Discipline Committee</p>
                                <p className="italic text-center">Bustos Campus, Bustos, Bulacan</p>
                            </div>
                        </div>
                        <div className="text-center w-full my-6">
                            CERTIFICATE OF CLEARANCE
                        </div>

                        {content && <p className="indent-8">
                            This is to certify that <ins className="font-semibold">{content.name}</ins> of <ins className="font-semibold">{content.college} {content.yearLevel}</ins> has <ins className="font-semibold">NO OFFENSES</ins> and is eligible for aquiring certification for good moral.
                        </p>}
                        <p className="indent-8 my-2">
                            This certificate were issued on {date}.
                        </p>
                        <p className="mt-8">
                            Acknowledged By:
                        </p>
                        <p className="mt-4 underline underline-offset-8 ">
                            DR. EDITHA N. DE REGLA
                        </p>
                        <p className="italic pt-2 text-xs">Discipline Committee Chair</p>
                        <br />
                    </div>
                </div>
                {/* <button type="submit">Submit Agreement</button> */}
            </form>
        </div>
    );
});

export default PrintableCert2;
