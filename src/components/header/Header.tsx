import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import Nav from "./nav/Nav";

const Header = () => {
    const location = useLocation();
    const [showHeader, setShowHeader] = useState<Boolean>(false);

    useEffect(() => {
        window.onscroll = function () {
            if (window.pageYOffset >= window.innerHeight / 2) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
        };
    }, []);

    return (
        <>
            <header
                className={`w-full py-2 h-14 bg-grayWhite dark:bg-dark border-b-[1px] border-lightDark/20 shadow-md ${
                    location.pathname !== "/" && "mb-8"
                }`}
            >
                <Nav />
            </header>

            {/* header that appears when scrolling down */}
            <AnimatePresence>
                {showHeader && (
                    <motion.div
                        className='z-20'
                        initial={{
                            opacity: 0,
                            top: "10px",
                        }}
                        animate={{
                            opacity: 1,
                            top: "0",
                        }}
                        exit={{
                            opacity: 0,
                            translateY: "10px",
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        <header
                            className={`top-0 fixed w-full py-2 h-14 bg-grayWhite dark:bg-dark border-b-[1px] border-lightDark/20 shadow-md ${
                                location.pathname !== "/" && "mb-8"
                            }`}
                        >
                            <Nav />
                        </header>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
