import React, { useEffect, useState } from 'react';
import upArrow from "../../../../assets/img/up-arrow.svg";
import './style.scss';

const BackToTopBtn = () => {
    const [showBtn, setShowBtn] = useState(false);

    const handleShowBtn = () => {
        if (window.scrollY > 800) {
            setShowBtn(true)
        } else {
            setShowBtn(false);
        }
    }
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleShowBtn);
        return () => window.removeEventListener('scroll', handleShowBtn)
    }, [])
    return (
        <div className={showBtn ? "backtotopbtn active" : "backtotopbtn"} onClick={handleBackToTop}>
            <div className="backtotopbtn__border">
                <i><img src={upArrow} alt="arrow up" /></i>
            </div>
        </div>
    );
};

export default BackToTopBtn;