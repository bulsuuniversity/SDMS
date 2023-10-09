import { useRouter } from "next/navigation";

const Homebutton = ({ setViewPort }) => {
    const router = useRouter()
    const handleClick = () => {
        if (window.location.pathname === "/") {
            setViewPort("blogRef");;
        } else {
            router.push("/")
            window.location.pathname === "/" && setViewPort("blogRef");
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`flex items-center`}>
            <span className="mr-4 font-bold">Home</span>
        </div>
    );
}

export default Homebutton;
