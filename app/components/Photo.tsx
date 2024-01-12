'use client'

import Image from "next/image";
import { useState, FormEvent } from "react";
import PhotoModal from "./PhotoModal";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import { deletePhoto } from "../actions/deletePhoto";
import { addOrRemoveFromFavorites } from "../actions/addOrRemoveFromFavorites";

interface PhotoProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    photoName: string;
    isFavorited?: boolean;
}

const Photo: React.FC<PhotoProps> = ({ src, alt, width, height, photoName, isFavorited = false }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDeletePhoto = (e: FormEvent) => {
        e.preventDefault();
        deletePhoto({ photoPath: src });
    };

    const handleAddOrRemoveFromFavorites = (e: FormEvent) => {
        e.preventDefault();
        addOrRemoveFromFavorites({ photoName, isFavorited });
    };

    return (
        <>
            <div
                style={{ width, height }}
                className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
            >
                <form onClick={handleDeletePhoto} className="absolute bottom-2.5 right-10 z-10">
                    <input type="hidden" name="photoPath" value={src} />
                    <button
                        type="submit"
                        className="bg-transparent border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
                    >
                        <Delete />
                    </button>
                </form>

                <form onClick={handleAddOrRemoveFromFavorites} className="absolute bottom-2.5 right-2.5 z-10">
                    <input type="hidden" name="photoName" value={photoName} />
                    <input type="hidden" name="isFavorited"  />
                    <button
                        type="submit"
                        className="bg-transparent border-none text-white cursor-pointer hover:text-green-500 hover:scale-110 transition duration-300"
                    >
                        {isFavorited ? <Favorite /> : <FavoriteBorder />}
                    </button>
                </form>

                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    onClick={toggleModal}
                />
            </div>
            {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
        </>
    );
};

export default Photo;
