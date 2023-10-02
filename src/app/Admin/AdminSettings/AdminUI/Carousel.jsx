
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Image from "next/image";
import InformationModal from "@/utils/InformationModal";
import axios from "axios";
import { url, headers } from "@/app/libs/api";
import { useEffect, useState } from "react";
import useLoading from "@/utils/Loading";
import useConfirmation from "@/utils/ConfirmationHook";
import { FcAddDatabase, FcAddImage, FcDeleteDatabase } from "react-icons/fc";

const Carousel = ({ setOpen }) => {
    const [file, setFile] = useState(null)
    const { loading, startLoading, stopLoading } = useLoading()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const [message, setMessage] = useState()
    const [response, setResponse] = useState()
    const [images, setImages] = useState()
    const [preview, setPreview] = useState(false)


    const handlePictureChange = (e) => {
        const picture = e.target.files[0];
        if (picture) {
            const reader = new FileReader();
            reader.readAsDataURL(picture);
            reader.onloadend = () => {
                if (picture.type.startsWith("image/")) {
                    setFile(reader.result);
                    setPreview(true)
                }
            };
        }
        // else {
        //     setMessage(true)
        //     setResponse("Please try again. Something went wrong in the server.")
        // }
    };

    useEffect(() => {
        handleGetImages()
    }, [])

    const handleGetImages = async () => {
        try {
            const response = await axios.get(`${url}/api/HomeCarousel`, { headers });
            setImages(response.data)
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const handleAddImage = async () => {
        startLoading()
        try {
            if (file) {
                await axios.post(`${url}/api/HomeCarousel`, {
                    file,
                }, { headers });
                setPreview(false)
                setMessage(true)
                setResponse("Successfully Added Image!")
                handleGetImages()
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setResponse("Something went wrong!")
        } finally {
            stopLoading();
        }
    };

    const handleDelete = async (id, publicId) => {
        startLoading()
        try {
            await axios.post(`${url}/api/HomeCarousel/${id}`, {
                publicId: publicId,
            }, { headers });
            setMessage(true)
            setResponse("Successfully Deleted Image!")
            setPreview(false)
            handleGetImages()
        } catch (error) {
            console.error('An error occurred:', error);
            setResponse("Something went wrong!")
        } finally {
            stopLoading();
        }
    };

    const handleUpdate = () => {
        if (file) {
            showConfirmation(<div className='grid justify-center gap-4'>
            <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcAddImage size={32}/>Add Image</div>
            <p className='text-xl p-6'>Are you sure you want to add this image?</p>
            </div>, () => {
                handleAddImage()
            });
            setMessage(true)
            setResponse("Cancelled")
        } else {
            setMessage(true)
            setResponse("Please select the image again. Something went wrong in the server.")
        }
    };

    const handleDeleteImage = (id, publicId) => {
        showConfirmation(<div className='grid justify-center gap-4'>
        <div className='bg-red-700 flex items-center text-white gap-4 rounded-t-lg w-full'><FcDeleteDatabase size={32}/>Delete Image</div>
         <p className='text-xl p-6'>Are you sure you want to delete this image?</p>
         </div>, () => {
            handleDelete(id, publicId)
        });
    };

    return (
        <InformationModal>
            <div className="relative bg-gray-400 rounded-lg m-10 p-10">
                {message && <InformationModal>
                    <div className="p-10 w-60 grid">
                        <div className="text-2xl text-center">
                            {response}
                        </div>
                        <button onClick={() => setMessage(false)} className="bg-amber-100 py-2 px-4 rounded-lg">Okay</button>
                    </div></InformationModal>}
                {loading && <InformationModal>
                    <div className="p-10 w-60 grid">
                        <div className="text-2xl text-center">
                            Please wait...
                        </div>
                    </div></InformationModal>}
                {preview && <InformationModal>
                    <div className="p-10 grid justify-center">
                        <div className="content-fit w-44 h-44">
                            <Image src={file} width={500} height={500} alt="preview" />
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-red-700 text-white px-4 py-2" onClick={handleUpdate}>Upload</button>
                        </div>
                    </div></InformationModal>}
                <div className="absolute -top-4 -right-4">
                    <button
                        onClick={() => setOpen("")} className="rounded-full text-red-600 bg-white">
                        <AiFillCloseCircle size={30} /></button>
                </div>
                <ConfirmationDialog />
                <div className="flex gap-4 flex-wrap snap-y">
                    {images && images.map((image, index) => (
                        <div key={index} className="relative w-44 h-24 border border-black overflow-hidden group">
                            <Image
                                src={image.image}
                                width={500}
                                height={500}
                                alt={index}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleDeleteImage(image.id, image.publicId)}><BsFillTrash3Fill size={32} /></button>
                            </div>
                        </div>
                    ))}
                    <div className="w-44 h-24 border border-black overflow-hidden">
                        <div className="flex relative items-center justify-center h-full bg-gray-100">
                            <label className="absolute left-16 cursor-pointer text-center" htmlFor="inputFile">
                                <AiOutlinePlus size={40} />
                            </label>
                            <input
                                id="inputFile"
                                type="file"
                                className="invisible"
                                onChange={handlePictureChange}
                                accept=".png, .jpg, .jpeg"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </InformationModal>
    );
}

export default Carousel;