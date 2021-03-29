import React from 'react';
import { Link } from 'react-router-dom';
import aboutBannerImg from '../../assets/img/aboutus-banner1.jpg';
import './style.scss';
const AboutPage = () => {
    return (
        <div className='aboutpage'>
            <div className="aboutpage__banner" style={{ backgroundImage: `url(${aboutBannerImg})` }}>
                <div className='aboutpage__banner-textbox '>
                    <p className='title'>About</p>
                    <div className="redirect">
                        <Link to='/'>Home</Link>
                        <p>&#62;</p>
                        <p>About</p>
                    </div>
                </div>
            </div>
            <div className="aboutpage__content">
                <div className="container">
                    <div className="textbox">
                        <h2>About Us</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Reiciendis illum incidunt fugit distinctio at dolor expedita deleniti,
                        repellendus, cupiditate neque, eius minus alias vitae illo ullam nihil quis sed deserunt!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum doloribus blanditiis facilis dolor ipsam? Magni autem praesentium blanditiis repudiandae, eligendi quaerat sint, cupiditate voluptatum architecto quibusdam pariatur, iste recusandae eveniet!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi minus laborum error ab iure, aperiam aut ratione molestias harum, adipisci placeat voluptas et tenetur amet rerum laboriosam fugit vel voluptate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;