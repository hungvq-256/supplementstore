import React from 'react';
import "./style.scss"

const Benefits = () => {
    return (
        <section className="benefits">
            <div className="container">
                <div className="benefit">
                    <div className="benefit__img">
                        <img src="//cdn.shopify.com/s/files/1/0451/3058/0119/files/Free-Delivery.png?v=1597738178" alt="free ship" />
                    </div>
                    <div className="benefit__text">
                        <h3>Free Delivery</h3>
                        <p>Free shipping for all orders over $100</p>
                    </div>
                </div>
                <div className="benefit">
                    <div className="benefit__img">
                        <img src="//cdn.shopify.com/s/files/1/0451/3058/0119/files/Online-Order.png?v=1597738197" alt="order online" />
                    </div>
                    <div className="benefit__text">
                        <h3>Online Order</h3>
                        <p>Don’t worry you can order
                        Online by our Site</p>
                    </div>
                </div>
                <div className="benefit">
                    <div className="benefit__img">
                        <img src="//cdn.shopify.com/s/files/1/0451/3058/0119/files/Freshness.png?v=1597738214 " alt="fresh flower" />
                    </div>
                    <div className="benefit__text">
                        <h3>Guarantee</h3>
                        <p>We guarantee authenticity in all our products</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;