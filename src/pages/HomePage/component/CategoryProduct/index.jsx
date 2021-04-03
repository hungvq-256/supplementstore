import React from 'react';
import { div, useHistory } from 'react-router-dom';
import SectionTitle from '../../../../components/SectionTitle';
import "./style.scss"
const CategoryProduct = () => {
    const history = useHistory();
    const directToProducts = (type) => {
        history.push(`/products?sort=priceDF&type=${type}`)
    }
    return (
        <div className="container category">
            <SectionTitle text={'Category Products'} />
            <div className="categorylist">
                <div className="categoryitem" onClick={() => { directToProducts("fat burner") }}>
                    <div>
                        <div className="categoryitem__img" style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0264/8483/4389/files/T4P4W4_16_1728x.jpg?v=1589778808%201728w")` }}></div>
                    </div>
                    <div>
                        <p className="categoryitem__text">Fat Burner</p>
                    </div>
                </div>
                <div className="categoryitem" onClick={() => { directToProducts("whey") }}>
                    <div>
                        <div className="categoryitem__img" style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0264/8483/4389/files/T4P4W4_08_2048x.jpg?v=1589778679%202048w")` }}>
                        </div>
                    </div>
                    <div>
                        <p className="categoryitem__text">Whey Protein</p>
                    </div>
                </div>
                <div className="categoryitem" onClick={() => { directToProducts("bcaa") }}>
                    <div >
                        <div className="categoryitem__img" style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0264/8483/4389/files/T4P4W4_04_1728x.jpg?v=1589778712%201728w")` }}>
                        </div>
                    </div>
                    <div >
                        <p className="categoryitem__text">BCAA</p>
                    </div>
                </div>
                <div className="categoryitem" onClick={() => { directToProducts("vitamin") }}>
                    <div>
                        <div className="categoryitem__img" style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0264/8483/4389/files/T4P4W4_07_540x.jpg?v=1589778787%20540w")` }}>
                        </div>
                    </div>
                    <div >
                        <p className="categoryitem__text">Vitamin</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CategoryProduct;