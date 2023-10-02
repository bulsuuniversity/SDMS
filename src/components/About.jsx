import { forwardRef } from "react";

const About = ({ data }, ref) => {
    return (
        <div ref={ref} className="bg-gray-600 h-max">
            <div className="h-10"></div>
            <div className="text-white text-3xl flex justify-center py-4 font-serif font-cambria">
                About
            </div>
         

        </div>
    );
}

export default forwardRef(About);