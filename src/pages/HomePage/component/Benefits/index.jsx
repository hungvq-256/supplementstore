import React from 'react';
import freeShip from '../../../../assets/img/FreeDelivery.webp';
import onlineOrder from '../../../../assets/img/OnlineOrder.webp';
import guarantee from '../../../../assets/img/Guarantee.webp';
import "./style.scss"

const benefits = [
    {
        img: freeShip,
        title: "Free Delivery",
        subTitle: "Free shipping for all orders over $100"
    },
    {
        img: onlineOrder,
        title: "Online Order",
        subTitle: "Don’t worry you can order Online by our Site"
    },
    {
        img: guarantee,
        title: "Guarantee",
        subTitle: "We guarantee authenticity in all our products"
    }
]
const Benefits = () => {
    return (
        <section className="benefits">
            <div className="container">
                {benefits.map((benefit, index) => (
                    <div className="benefit" key={index}>
                        <div className="benefit__img">
                            <img src={benefit.img} alt={benefit.title} />
                        </div>
                        <div className="benefit__text">
                            <h3>{benefit.title}</h3>
                            <p>{benefit.subTitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;