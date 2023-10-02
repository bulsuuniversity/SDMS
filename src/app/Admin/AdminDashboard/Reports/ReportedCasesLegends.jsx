import { BsCircle } from "react-icons/bs";

const RegsiteredLegends = ({ data }) => {

    return (
        <div className="bg-white rounded-lg p-4 grid">
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-red-500 rounded-full" /></div>
                    <p>LIGHT OFFENSES</p>
                </label>
                <div className="flex justify-center">
                    <p>Count: {data && data.lightOffenses}</p>
                </div>
            </div>
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-green-500 rounded-full" /></div>
                    <p>LESS GRAVE OFFENSES</p>
                </label>
                <div className="flex justify-center">
                    <p>Count:  {data && data.lessGraveOffenses}</p>
                </div>
            </div>
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-blue-500 rounded-full" /></div>
                    <p>GRAVE OFFENSES</p>
                </label>
                <div className="flex justify-center">
                    <p>Count:  {data && data.graveOffenses}</p>
                </div>
            </div>
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-orange-500 rounded-full" /></div>
                    <p>DISHONESTY ON ACADEMIC PURSUITS</p>
                </label>
                <div className="flex justify-center">
                    <p>Count:  {data && data.dishonesty}</p>
                </div>
            </div>
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-gray-500 rounded-full" /></div>
                    <p>Others</p>
                </label>
                <div className="flex justify-center">
                    <p>Count:  {data && data.Others}</p>
                </div>
            </div>
        </div>
    );
}

export default RegsiteredLegends;