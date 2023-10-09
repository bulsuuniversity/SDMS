import Image from "next/image";
import { forwardRef } from "react";

const About = ({ data }, ref) => {
    return (
        <div ref={ref} className="h-max">
            <div className="w-full relative">
                <div className="absolute font-bold w-full h-full items-center text-xs md:text-2xl flex justify-center text-white">
                    <p>ABOUT DISCIPLINE COMMITTEE</p>
                </div>
                <Image width={1500} className="w-full" layout="responsive" height={200} src={"/HEADER.png"} alt="header" />
            </div>
            <div className="text-center grid md:mx-32 mx-2 md:mb-16 my-max p-4 md:p-10">
                <div className="text-lg">
                    {data ? data.about : 'The purpose of this initiative is to appropriately implement policies within the university by giving appropriate punishment to students who violate university policies, to teach students how to follow university regulations and to educate them on the consequences of violating them, all are accordance with the student handbook. These disciplinary procedures aim to nurture the non-academic character of the students which preserves the students’ rights and responsibilities. Through this goal of the discipline committee, the university can achieve its desire to produce highly competent, ethical and service-oriented professionals that contribute to the sustainable socioeconomic growth and development of the nation.'}
                </div>
            </div>
            <div className="grid gap-1 py-3 text-white justify-center items-center w-full bg-red-900">
                <div className="text-center text-xs font-bold">
                    {!data ? "BULACAN STATE UNIVERSITY" : data.email}
                </div>
                <div className="text-center text-xs italic">
                    {!data ? "Bustos Campus, Bustos, Bulacan" : data.address}
                </div>
                <div className="text-center text-xs text-sm">
                    {!data ? "2023" : data.phoneNumber}
                </div>
            </div>
        </div>
    );
}

export default forwardRef(About);