import Image from "next/image";
import Slider from "react-slick";
import { forwardRef } from "react";
import { RiNavigationFill } from "react-icons/ri";


const Next = ({ className, style, onClick, }) => {
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "transparent",
                color: 'gray',
            }}
            onClick={onClick}
        >
            <RiNavigationFill size={40} className="rotate-[130deg]" />
        </div>
    );
};

const Prev = ({ className, style, onClick }) => {
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "transparent",
                color: 'gray',
            }}
            onClick={onClick}
        >
            <RiNavigationFill size={40} className="-rotate-45" />
        </div>
    );
};

const Blog = ({ images }, ref) => {
      const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <Next />,
        prevArrow: <Prev />,
    };
    return (
        <div ref={ref} className="w-full md:px-0 px-12 h-96 md:h-[55rem]">
            <div className="flex justify-center items-center">
                <div className="w-3/4">
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index} className="grid items-center justify-center">
                                <div className="m-auto lg:h-[44rem] 2xl:w-[52rem] lg:w-[48rem] md:h-[25rem] h-52 md:h-96 object-fit w-60 md:w-[32rem]">
                                    <Image src={image} width={900} height={700} className="md:pt-24 pt-10 object-contain" alt={index} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(Blog);
