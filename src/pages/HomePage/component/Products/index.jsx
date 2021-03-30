import React, { useEffect, useState } from 'react';
import productsApi from '../../../../api/productsApi';
import ProductItem from '../../../../components/ProductItem';
import ProductItemSkeleton from '../../../../components/ProductItemSkeleton';
import SectionTitle from '../../../../components/SectionTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.scss';

const productPerSection = 8;

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [postsToShow, setPostsToShow] = useState([]);
    const [buttonShow, setButtonShow] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [next, setNext] = useState(8);

    const loopWithSlice = (end) => {
        const slicedPosts = products.slice(0, end);
        setPostsToShow(slicedPosts);
    }

    const handleLoadMorePosts = () => {
        setLoadingBtn(true);
        setTimeout(() => {
            loopWithSlice(next + productPerSection);
            setNext(prevalue => prevalue + productPerSection);
            setLoadingBtn(false);
        }, getRndInteger(800, 1500));
    }
    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    useEffect(() => {
        const fetchHomeProducts = async () => {
            try {
                const products = await productsApi.getAll();
                const productsFilter = products.filter(item => item.id % 2 === 0);
                setProducts(productsFilter);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchHomeProducts();
    }, []);

    useEffect(() => {
        if (products.length !== 0) {
            const slicedPosts = products.slice(0, productPerSection);
            setPostsToShow(slicedPosts);
            setLoading(false);
        }
    }, [products]);

    useEffect(() => {
        if (products.length !== 0 && next >= products.length) {
            setButtonShow(false)
        }
    }, [next, products]);
    return (
        <div>
            <div className="container">
                <SectionTitle text={'New Products'} />
            </div>
            <div className="container products">
                {loading ? <ProductItemSkeleton /> :
                    <div className="row">
                        <ProductItem
                            listProduct={postsToShow}
                            column={6}
                            newTag={true}
                        />
                    </div>
                }
                {buttonShow &&
                    <div className="loadmore">
                        <div className="loadmore__btn" onClick={handleLoadMorePosts}>
                            {loadingBtn ? <CircularProgress size={25} style={{ color: "#ffffff" }} /> : <p>more</p>}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};
export default Products;