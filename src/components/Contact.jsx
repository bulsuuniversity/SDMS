import { SiGooglemaps } from "react-icons/si";
import { PiPhoneCallFill } from "react-icons/pi";
import { ImMail4 } from "react-icons/im";
import { forwardRef } from "react";

const Contact = ({ data }, ref) => {
    return (
        <div ref={ref} className=" w-full  bg-white text-black py-24 h-max">
            <div className="h-10"></div>
            <div className="text-center grid md:mx-32 mx-2 md:mb-16 my-max p-4 md:p-10">
                <div className="text-lg">
                    {data ? data.about : 'The purpose of this initiative is to appropriately implement policies within the university by giving appropriate punishment to students who violate university policies, to teach students how to follow university regulations and to educate them on the consequences of violating them, all are accordance with the student handbook. These disciplinary procedures aim to nurture the non-academic character of the students which preserves the students’ rights and responsibilities. Through this goal of the discipline committee, the university can achieve its desire to produce highly competent, ethical and service-oriented professionals that contribute to the sustainable socioeconomic growth and development of the nation.'}
                </div>
                <div className="grid justify-center items-center md:p-12 p-4 gap-2">
                    <div className="text-center text-red-700 text-xl font-bold">
                        {!data ? "BULACAN STATE UNIVERSITY" : data.email}
                    </div>
                    <div className="text-center italic">
                        {!data ? "Bustos Campus, Bustos, Bulacan" : data.address}
                    </div>
                    <div className="text-center text-sm">
                        {!data ? "2023" : data.phoneNumber}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(Contact);