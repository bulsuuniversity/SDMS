import Link from "next/link";

const LoginButton = ({ active }) => {
    return (
        <Link href={'/Login'}
            className={`flex items-center ${active === "button1" ? 'bg-[#FFF5E0] text-black' : 'bg-red-900'}`}>
            <div className="overflow-hidden flex relative items-center h-16">
                <div className={`h-0 w-0 
            border-y-[4rem] border-y-red-900 
            border-r-[6rem] 
             ${active === "button1" ? 'border-[#FFF5E0]' : 'border-orange-300'}
            `}></div>
                <div className={`h-0 w-0 absolute left-11 z-10 
            border-y-[4rem] border-y-transparent 
            border-r-[6rem]
             ${active === "button1" ? 'border-r-[#FFF5E0]' : 'border-r-red-900'}
            `}></div>
            </div>
            <span className="mr-4 font-bold">Login</span>
        </Link>
    );
}

export default LoginButton;