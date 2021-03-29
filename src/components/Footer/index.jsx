import React from 'react';
import lifting from '../../assets/img/body-lifting.png';
import './style.scss';
const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footerinfo">
                    <div className="row">
                        <div className="left col-12 col-lg-6">
                            {/* <div className="row"> */}
                            <div className="image">
                                <div className="imgwrap"><img src={lifting} alt="lifting img" /></div>
                                <div className="slogan">be<span>better</span>.be<span>stronger</span>.</div>
                            </div>
                            <div className="account">
                                <h3>ACCOUNT</h3>
                                <p>Login / Register</p>
                                <p>Help Center</p>
                                <p>Returns & Refunds</p>
                                <p>Shipping Rates & Policies</p>
                                <p>Student Discounts</p>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className="right col-lg-6 col-12">
                            <h2>Get 20% off your first purchase</h2>
                            <p>Receive exclusive updates on new products & exclusive deals</p>
                            <div className="emailinput">
                                <input type="text" placeholder="Enter your email" />
                                <button>SIGN ME UP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;