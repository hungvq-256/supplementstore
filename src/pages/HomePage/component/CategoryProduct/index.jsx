import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../../components/SectionTitle';
import "./style.scss"
const CategoryProduct = () => {
    return (
        <div className="container category">
            <SectionTitle text={'Category Products'} />
            <div className="categorylist">
                <div className="categoryitem">
                    <Link to="products?type=fat burner">
                        <div className="categoryitem__img" style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0264/8483/4389/files/T4P4W4_16_1728x.jpg?v=1589778808%201728w")` }}></div>
                    </Link>
                    <Link to="products?type=fat burner">
                        <p className="categoryitem__text">Fat Burner</p>
                    </Link>
                </div>
                <div className="categoryitem">
                    <Link to='products?type=whey'>
                        <div className="categoryitem__img" style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0264/8483/4389/files/T4P4W4_08_2048x.jpg?v=1589778679%202048w")` }}>
                        </div>
                    </Link>
                    <Link to="products?type=whey">
                        <p className="categoryitem__text">Whey Protein</p>
                    </Link>
                </div>
                <div className="categoryitem">
                    <Link to='products?type=bcaa'>
                        <div className="categoryitem__img" style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0264/8483/4389/files/T4P4W4_04_1728x.jpg?v=1589778712%201728w")` }}>
                        </div>
                    </Link>
                    <Link to="products?type=bcaa">
                        <p className="categoryitem__text">BCAA</p>
                    </Link>
                </div>
                <div className="categoryitem">
                    <Link to='products?type=vitamin'>
                        <div className="categoryitem__img" style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0264/8483/4389/files/T4P4W4_07_540x.jpg?v=1589778787%20540w")` }}>
                        </div>
                    </Link>
                    <Link to="products?type=vitamin">
                        <p className="categoryitem__text">Vitamin</p>
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default CategoryProduct;