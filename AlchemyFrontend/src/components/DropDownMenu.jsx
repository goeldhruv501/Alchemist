import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";
import { FaUserTie, FaChalkboardTeacher } from "react-icons/fa";

const DropDowndiv = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeTimeoutRef = useRef(null);
    const [profileImg, setProfileImg] = useState(null);

    useEffect(() => {
        const storedImage = localStorage.getItem('profileImg');
        if (storedImage) {
            setProfileImg(storedImage);
        }
    }, []);

    const handleMouseEnter = () => {
        setIsOpen(true);
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 500);
    };

    const DropDownMenu = [
        { logo: <RiLoginCircleFill />, name: 'User Login', link: "/Login" },
        { logo: <FaChalkboardTeacher />, name: 'Teacher Login', link: "/Login" },
        { logo: <FaUserTie />, name: 'Parent Login', link: "/Login" },
        { logo: <RiLogoutCircleFill />, name: 'Registration', link: "/Signin" }
    ];

    return (
        <div
            className="relative inline-block text-left"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {profileImg ? (
                <img
                    src={profileImg}
                    alt="Profile"
                    onError={() => setProfileImg(null)}
                    className="w-[40px] h-[40px] rounded-full cursor-pointer ring-2 ring-gray-500 hover:ring-gray-400 transition-all duration-300"
                />
            ) : (
                <i
                    onClick={() => setIsOpen(!isOpen)}
                    className="fa-solid fa-user text-gray-400 text-2xl cursor-pointer hover:text-gray-300 transition duration-300"
                />
            )}
            {isOpen && (
                <div className="absolute right-0 z-10 mt-4 w-[220px] rounded-xl shadow-lg bg-[#2f2f2f] ring-1 ring-gray-700 backdrop-blur-sm">
                    <div className="py-2 px-3">
                        {DropDownMenu.map((value, key) => (
                            <Link to={value.link} key={key} onClick={() => setIsOpen(false)}>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-300">
                                    <span className="text-lg">{value.logo}</span>
                                    <span className="text-sm font-medium">{value.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDowndiv;
