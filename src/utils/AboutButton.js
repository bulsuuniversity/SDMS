import { useRouter } from "next/navigation";


const AboutButton = ({ setViewPort }) => {
const router = useRouter()
    const handleClick = () => {
        if (window.location.pathname === "/") {
            setViewPort("aboutRef");
        } else {
            router.push("/?viewPort=aboutRef")
        }
    };
    return (
        <div
            onClick={handleClick}
            className={`flex items-center`}>
            <span className="mr-4">About us</span>
        </div>
    );
}

export default AboutButton