import Link from "next/link";

const RegisterButton = ({ active }) => {
    return (
        <Link href={'/Register'}
            className={`flex pr-10 items-center ${active === "button2" ? 'bg-[#ebac85] text-black' : 'bg-red-900'}`}>
            <div className="overflow-hidden flex relative items-center h-16">
                <div className={`h-0 w-0 
            border-y-[4rem] border-y-transparent 
            border-r-[6rem]
            ${active === "button1" ? 'bg-[#ebac85]' : 'bg-red-900'}
            ${active === "button2" ? 'border-r-[#ebac85]' : 'border-orange-300'}
            `}></div>
                <div className={`h-0 w-0 absolute left-11 z-10 
            border-y-[4rem] border-y-transparent 
            border-r-[6rem] 
            ${active === "button2" ? 'border-r-[#ebac85]' : 'border-r-red-900'}
            `}></div>
            </div>

            <span className={`mr-4 ${active === "button2" ? 'bg-[#ebac85]' : ''}`}>Register</span>

        </Link>
    );
}

export default RegisterButton;