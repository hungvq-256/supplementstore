import React from 'react';
import contactBannerImg from '../../assets/img/contact-banner.jpg';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import './style.scss';
import { Link } from 'react-router-dom';
const ContactPage = () => {
    return (
        <div className='contactpage'>
            <div className="contactpage__banner" style={{ backgroundImage: `url(${contactBannerImg})` }}>
                <div className='contactpage__banner-textbox '>
                    <p className='title'>Contact</p>
                    <div className="redirect">
                        <Link to='/'>Home</Link>
                        <p>&#62;</p>
                        <p>Contact</p>
                    </div>
                </div>
            </div>
            <div className="contactpage__content">
                <div className="container">
                    <p className="intro">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam ipsum odio voluptatum, impedit esse necessitatibus amet doloribus? Ducimus,
                    molestias officia esse numquam, commodi, debitis soluta minima et tempore animi voluptatibus!
                    </p>
                    <div className="shopinfo">
                        <div className="shopinfo__item">
                            <i><BusinessIcon /></i>
                            <p>Ho Chi Minh City</p>
                        </div>
                        <div className="shopinfo__item">
                            <i><PhoneIcon /></i>
                            <p>0937.770.240</p>
                        </div>
                        <div className="shopinfo__item">
                            <i><EmailIcon /></i>
                            <p>supplementshop@gmail.com</p>
                        </div>
                    </div>
                    <div className="formcontact">
                        <input type="text" placeholder='Name' />
                        <input type="text" placeholder='Email' />
                        <input type="text" placeholder='Subject' />
                        <textarea ></textarea>
                        <div className="sendmessagebtn">Send Message</div>
                    </div>
                </div>
            </div>
            <div className="contactpage__map">

            </div>
        </div>
    );
};

export default ContactPage;