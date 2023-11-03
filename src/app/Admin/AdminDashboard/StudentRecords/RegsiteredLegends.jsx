import { BsCircle } from "react-icons/bs";

const RegsiteredLegends = ({ data }) => {
    return (
        <div className="bg-white rounded-lg p-4 grid">
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-yellow-600 rounded-full" /></div>
                    <p>College of Business Administration &#40;CBA&#41;</p>
                </label>
                <div className="flex justify-center">
                    <p>Student Count: {data && data.CBA}</p>
                </div>
            </div>
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-green-600 rounded-full" /></div>
                    <p>College of Industrial Technology  &#40;CIT&#41;</p>
                </label>
                <div className="flex justify-center">
                    <p>Student Count:  {data && data.CIT}</p>
                </div>
            </div>
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-blue-600 rounded-full" /></div>
                    <p>College of Education  &#40;COED&#41;</p>
                </label>
                <div className="flex justify-center">
                    <p>Student Count:  {data && data.COED}</p>
                </div>
            </div>
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-gray-400 rounded-full" /></div>
                    <p>College of Information and Computing Sciences  &#40;CICS&#41;</p>
                </label>
                <div className="flex justify-center">
                    <p>Student Count:  {data && data.CICS}</p>
                </div>
            </div>
            <div className="grid justify-start">
                <label className="flex items-center gap-4">
                    <div><BsCircle size={20} className="bg-amber-600 rounded-full" /></div>
                    <p>College of Engineering  &#40;COE&#41;</p>
                </label>
                <div className="flex justify-center">
                    <p>Student Count:  {data && data.COE}</p>
                </div>
            </div>
        </div>
    );
}

export default RegsiteredLegends;