import React from 'react';
import BackgroundImg from '../../assets/img/image-fixed.jpg';
import Benefits from './component/Benefits';
import Blogs from './component/Blogs';
import CategoryProduct from './component/CategoryProduct';
import Products from './component/Products';
import SlickSlider from './component/SlickSlider';
import './style.scss';

const HomePage = () => {
    return (
        <>
            <SlickSlider />
            <Benefits />
            <CategoryProduct />
            <Products />
            <div className="backgroundfixedwrap">
                <div className="backgroundfixed" style={{ backgroundImage: `url(${BackgroundImg})` }}>
                    <div className="container --backgroundfixed">
                        <p className="slogan">
                            When you want to give up <br />
                        Remember why you start
                    </p>
                    </div>
                </div>
            </div>
            <Blogs />
        </>
    );
};

export default HomePage;