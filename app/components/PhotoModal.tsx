// 'use client'

import Image from "next/image";
import { ReactNode } from "react";

interface PhotoModalProps {
    src: string;
    alt: string;
    onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ src, alt, onClose }) => {
    if (!src) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#000000] via-[#2a2929] to-[#000000] p-4 rounded-lg border border-gray-600 w-[80vw] overflow-hidden">
                <button onClick={onClose} className="text-gray-300 hover:text-white mb-2">Close</button>
                <div className="flex justify-center items-center h-full">
                    <div className="w-[80%] h-[80%]">
                        <Image
                            src={src}
                            alt={alt}
                            width={500}
                            height={500}
                            objectFit="contain"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;
