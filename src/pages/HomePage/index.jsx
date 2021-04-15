import React from 'react';
import LazyLoad from 'react-lazyload';
import BackgroundImg from '../../assets/img/image-fixed.jpg';
import Benefits from './component/Benefits';
import Blogs from './component/Blogs';
import CategoryProduct from './component/CategoryProduct';
import Products from './component/Products';
import ProductsCarousel from './component/ProductsCarousel';
import SlickSlider from './component/SlickSlider';
import './style.scss';

// const Benefits = lazy(() => import('./component/Benefits'));
// const Blogs = lazy(() => import('./component/Blogs'));
// const CategoryProduct = lazy(() => import('./component/CategoryProduct'));
// const Products = lazy(() => import('./component/Products'));

const HomePage = () => {
    return (
        <>
            <SlickSlider />
            <LazyLoad offset={100} height={200} once={true}>
                <Benefits />
            </LazyLoad>
            <LazyLoad offset={150} height={200} once={true}>
                <CategoryProduct />
            </LazyLoad>
            <LazyLoad offset={150} height={200} once={true}>
                <Products />
            </LazyLoad>
            <LazyLoad offset={150} height={200} once={true}>
                <ProductsCarousel />
            </LazyLoad>
            <LazyLoad offset={100} height={200} once={true}>
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
            </LazyLoad>
            <LazyLoad offset={150} height={200} once={true}>
                <Blogs />
            </LazyLoad>
        </>
    );
};

export default HomePage;