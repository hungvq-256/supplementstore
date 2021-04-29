import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { fetchProducts, fetchProductsFail, fetchProductsSuccess } from '../actions/products';
import productsApi from '../api/productsApi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import HomePage from './HomePage';
import BackToTopBtn from './HomePage/component/BackToTopBtn';
import ProductDetailPage from '../features/ProductDetailPage';
import NotFoundPage from './NotFoundPage';
// import AccountPage from '../features/AccountPage';
// import CartPage from '../features/CartPage';
// import ProductsPage from '../features/ProductsPage';
// import SearchPage from '../features/SearchPage';
// import AboutPage from './AboutUsPage';
// import BlogPage from './BlogPage';
// import ContactPage from './ContactPage';


const CartPage = lazy(() => import('../features/CartPage'));
const SearchPage = lazy(() => import('../features/SearchPage'));
const AboutPage = lazy(() => import('./AboutUsPage'));
const ContactPage = lazy(() => import('./ContactPage'));
const BlogPage = lazy(() => import('./BlogPage'));
const AccountPage = lazy(() => import('../features/AccountPage'));
const ProductsPage = lazy(() => import('../features/ProductsPage'));

const MainPages = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const RequestFetchProducts = () => async dispatch => {
            try {
                dispatch(fetchProducts);
                const products = await productsApi.getAll();
                dispatch(fetchProductsSuccess(products));
            }
            catch (error) {
                dispatch(fetchProductsFail(error));
            }
        }
        dispatch(RequestFetchProducts());
    }, [dispatch]);
    return (
        <div>
            <Header />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/" component={HomePage} exact></Route>
                    <Route path="/products/:categories/product-:id" component={ProductDetailPage}></Route>
                    <Route path='/products' component={ProductsPage}></Route>
                    <Route path='/article/:articleparams' component={BlogPage}></Route>
                    <Route path='/search' component={SearchPage}></Route>
                    <Route path="/cart" component={CartPage}></Route>
                    <Route path='/contact' component={ContactPage}></Route>
                    <Route path='/about' component={AboutPage}></Route>
                    <Route path='/account' component={AccountPage}></Route>
                    <Route component={NotFoundPage}></Route>
                </Switch>
            </Suspense>
            <BackToTopBtn />
            <Footer />
        </div>
    );
};

export default MainPages;