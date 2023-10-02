import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


const ContactButton = ({ setViewPort }) => {


    const router = useRouter()
    const handleClick = () => {
        if (window.location.pathname === "/") {
            setViewPort("contactRef");;
        } else {
            router.push("/?viewPort=contactRef")
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`flex items-center`}>
            <span className="mr-4">Help</span>
        </div>
    );
}

export default ContactButton;