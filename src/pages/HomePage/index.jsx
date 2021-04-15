import React, { lazy } from 'react';
import { Suspense } from 'react';
import BackgroundImg from '../../assets/img/image-fixed.jpg';
import Loading from '../../components/Loading';
import ProductsCarousel from './component/ProductsCarousel';
import SlickSlider from './component/SlickSlider';
import './style.scss';
// import Benefits from './component/Benefits';
// import Blogs from './component/Blogs';
// import CategoryProduct from './component/CategoryProduct';
// import Products from './component/Products';

const Benefits = lazy(() => import('./component/Benefits'));
const Blogs = lazy(() => import('./component/Blogs'));
const CategoryProduct = lazy(() => import('./component/CategoryProduct'));
const Products = lazy(() => import('./component/Products'));

const HomePage = () => {
    return (
        <>
            <SlickSlider />
            <Suspense fallback={<Loading />}>
                <Benefits />
                <CategoryProduct />
                <Products />
            </Suspense>
            <ProductsCarousel />
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
            <Suspense fallback={<Loading />}>
                <Blogs />
            </Suspense>
        </>
    );
};

export default HomePage;