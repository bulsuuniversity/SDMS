import { SiGooglemaps } from "react-icons/si";
import { PiPhoneCallFill } from "react-icons/pi";
import { ImMail4 } from "react-icons/im";
import { forwardRef } from "react";
import Image from "next/image";
import { FcAssistant, FcCameraIdentification, FcDocument, FcList, FcQuestions } from "react-icons/fc";

const Contact = ({ data }, ref) => {
    return (
        <div ref={ref} className=" w-full grid bg-white text-black h-max">
            <div className="h-10"></div>
            <div className="w-full relative">
                <div className="absolute font-bold w-full h-full items-center text-xs md:text-2xl flex justify-center text-white">
                    <p>GUIDE ON HOW TO REPORT MISCONDUCT</p>
                </div>
                <Image width={1500} className="w-full" layout="responsive" height={500} src={"/HEADER.png"} alt="header" />
            </div>
            <div className="grid justify-center lg:mx-36 md:mx-28 ">
                <div className="w-24 px-10 h-full bg-amber-400">
                    <p className="text-amber-400 py-5">space</p>
                </div>
                <div className="flex gap-2 h-full items-center">
                    <div className="text-5xl w-24 px-10 flex font-bold items-center h-full justify-center bg-amber-400">
                        1
                    </div>
                    <div className="mx-2 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16">
                        <Image className="object-cover w-max" width={80} height={80}
                            src={"/Step 1.png"} alt="step 1" />
                    </div>
                    <div className="grid pb-6 gap-1">
                        <p className="font-bold text-xl">Login your account / Register an account</p>
                        <p className="pl-8">To submit a report, you need to be logged in your account. If you don't have one,you can freely register with the system.</p>
                    </div>
                </div>
                <div className="flex gap-2 h-full items-center">
                    <div className="text-5xl w-24 px-10 flex font-bold items-center h-full justify-center bg-amber-400">
                        2
                    </div>
                    <div className="mx-2 h-20 w-20">
                        <Image className="object-cover w-max" width={150} height={150}
                            src={"/Step 2.png"} alt="step2" />
                    </div>
                    <div className="grid py-6 gap-1">
                        <p className="font-bold text-xl">Go To Navigation Bar & Click Submit Report</p>
                        <p className="pl-8">At the navigation bar, click the drop-down arrow on your profile picture. The menu will
                            show several options and you will see there the "Submit Report" button. Click it to
                            redirect you to report form.
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 h-full items-center">
                    <div className="text-5xl w-24 px-10 flex font-bold items-center h-full justify-center bg-amber-400">
                        3
                    </div>
                    <div className="mx-2 h-24 w-24">
                        <Image className="object-cover w-max" width={500} height={500}
                            src={"/Step 3.png"} alt="step3" />
                    </div>
                    <div className="grid py-6 gap-1">
                        <p className="font-bold text-xl">Fill-Out the Necessary Details</p>
                        <p className="pl-8">On the form, all details are required to be filled. On the attachment part of the form,
                            a narrative report should be uploaded for your report to be evaluated. Make sure to
                            check your inserted information carefully.
                        </p>
                        <p className="pl-8"> The format of a narrative report can be seen on the top of this page.</p>
                    </div>
                </div>
                <div className="flex gap-2 h-full items-center">
                    <div className="text-5xl w-24 px-10 flex font-bold items-center h-full justify-center bg-amber-400">
                        4
                    </div>
                    <div className="mx-2 h-24 w-24">
                        <Image className="object-cover w-max" width={500} height={500}
                            src={"/Step 4.png"} alt="step4" />
                    </div>
                    <div className="grid py-6 gap-1">
                        <p className="font-bold text-xl">For Review & Evaluation</p>
                        <p className="pl-8">After submitting your report, you can check its summary on "Report Logs" button that
                            can also be found at the menu on the navigation bar. This means that you have
                            successfully submitted your report.
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 h-full items-center">
                    <div className="text-5xl w-24 px-10 flex font-bold items-center h-full justify-center bg-amber-400">
                        5
                    </div>
                    <div className="mx-2 h-24 w-24">
                        <Image className="object-cover w-max" width={500} height={500}
                            src={"/Step 5.png"} alt="step5" />
                    </div>
                    <div className="grid gap-4 pt-4 gap-1">
                        <p className="font-bold text-xl">Keep in Touch</p>
                        <p className="pl-8">Some misconducts are needed to be discussed personally in order to have resolution.
                            Thus, wait for further notice by the admin of the system that will be sent to your email
                            regarding the assessment of the report.
                        </p>
                    </div>
                </div>
                <div className="w-24 px-10 flex h-full justify-center bg-amber-400">
                    <p className="text-amber-400 py-5">spacing</p>
                </div>
            </div>
        </div >
    );
}

export default forwardRef(Contact);