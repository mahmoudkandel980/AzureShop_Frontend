import React, { useState, useEffect } from "react";

import { HiChevronDoubleUp } from "react-icons/hi";

const MoveUp = (): JSX.Element => {
    const [showSlideupButton, setShowSlideupButton] = useState<boolean>(false);

    useEffect(() => {
        window.onscroll = function () {
            if (window.pageYOffset >= window.innerHeight / 2) {
                setShowSlideupButton(true);
            } else {
                setShowSlideupButton(false);
            }
        };
    }, []);

    const slideupHandler = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            {showSlideupButton && (
                <div className='dark:bg-white bg-smothDark fixed h-7 w-7 sm:w-10 sm:h-10 border-[1px] border-white/50 bottom-5 right-5 sm:right-16 z-10 flex justify-center items-center rounded-full hover:-translate-y-1 hover:scale-110 duration-200'>
                    <div className='flex justify-center items-center '>
                        <button onClick={slideupHandler}>
                            <HiChevronDoubleUp className='h-5 w-5 sm:h-7 sm:w-7 dark:text-smothDark text-white ' />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MoveUp;
