import Image from "next/image";
import Slider from "react-slick";
import { forwardRef, useState } from "react";
import { RiNavigationFill } from "react-icons/ri";
import { useEffect } from "react";
import axios from "axios";
import { url, headers } from "@/app/libs/api";

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
            <RiNavigationFill size={40} className="rotate-[130deg]"/>
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
    const [carousel, setCarousel] = useState()
    useEffect(() => {
        handleGetImages()
    }, [])

    const handleGetImages = async () => {
        try {
            const response = await axios.get(`${url}/api/HomeCarousel`, { headers });
            setCarousel(response.data)
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
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
        <div ref={ref} className="w-full md:px-0 px-12 h-96 md:h-screen">
            <div className="flex justify-center items-center">
                <div className="w-3/4 pt-5 h-full md:h-screen">
                    <Slider {...settings}>
                        {carousel ?
                            carousel.map((image, index) => (
                                <div key={index} className="grid items-center justify-center">
                                    <div className="m-auto lg:h-[44rem] 2xl:w-[52rem] lg:w-[48rem] md:h-[22rem] h-52 object-fit w-60 md:w-[32rem]">
                                        <Image src={image.image} width={900} height={700} className="md:pt-24 pt-10 object-contain" alt={index} />
                                    </div>
                                </div>
                            ))
                            :
                            images.map((image, index) => (
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
