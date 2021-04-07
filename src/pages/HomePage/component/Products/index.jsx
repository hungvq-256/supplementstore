import React, { useEffect, useState } from 'react';
import productsApi from '../../../../api/productsApi';
import ProductItem from '../../../../components/ProductItem';
import ProductItemSkeleton from '../../../../components/ProductItemSkeleton';
import SectionTitle from '../../../../components/SectionTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.scss';

const productPerSection = 8;

const Products = () => {
    const [loading, setLoading] = useState({
        productLoading: true,
        btnLoading: false
    });
    const { productLoading, btnLoading } = loading;

    const [products, setProducts] = useState({
        numberOfProduct: 0,
        listProduct: []
    });
    const [buttonShow, setButtonShow] = useState(true);
    const [next, setNext] = useState(8);

    const handleLoadMorePosts = () => {
        setLoading(prevalue => ({
            ...prevalue,
            btnLoading: true,
            productLoading: true
        }));
        setNext(prevalue => prevalue + productPerSection);
    }

    useEffect(() => {
        (async () => {
            try {
                const Fetchproducts = await productsApi.getAll({ isNew: true });
                const sliceProducts = Fetchproducts.slice(0, next);
                setProducts(prevalue => ({
                    ...prevalue,
                    numberOfProduct: Fetchproducts.length,
                    listProduct: sliceProducts
                }));
                setLoading(prevalue => ({
                    ...prevalue,
                    productLoading: false,
                    btnLoading: false,
                }));
                if (next >= Fetchproducts.length) {
                    setButtonShow(false)
                }
            }
            catch (error) {
                console.log(error)
            }
        })()
    }, [next]);
    return (
        <div>
            <div className="container">
                <SectionTitle text={'New Products'} />
            </div>
            <div className="container products">
                {productLoading ? <ProductItemSkeleton numberOfItem={products.listProduct.length !== 0 ? products.listProduct.length : 8} /> :
                    <div className="row">
                        <ProductItem
                            listProduct={products.listProduct}
                            column={6}
                            newTag={true}
                        />
                    </div>
                }
                {buttonShow &&
                    <div className="loadmore">
                        <div className="loadmore__btn" onClick={handleLoadMorePosts}>
                            {btnLoading ? <CircularProgress size={25} style={{ color: "#ffffff" }} /> : <p>more</p>}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};
export default Products;