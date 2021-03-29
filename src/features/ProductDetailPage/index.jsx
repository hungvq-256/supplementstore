import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ProductDetailSkeleton from '../../components/ProductDetailSkeleton';
import ProductInfo from './Components/ProductInfo';
import RelatedProduct from './Components/RelatedProduct';
import TabProduct from './Components/TabProduct';
import './style.scss';

const ProductDetailPage = () => {
    const [loading, setLoading] = useState(true);
    const fetchProductsFromStore = useSelector(state => state.products.listProducts);
    const [productInfo, setProductInfo] = useState([]);
    let { id } = useParams();
    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    useEffect(() => {
        setLoading(true);
        if (fetchProductsFromStore.length !== 0) {
            let filterProduct = fetchProductsFromStore.find(item => item.id === Number(id));
            setProductInfo(filterProduct);
        }
    }, [fetchProductsFromStore, id]);
    useEffect(() => {
        if (productInfo.length !== 0) {
            setTimeout(() => {
                setLoading(false);
            }, getRndInteger(200, 800));
        }
    }, [productInfo])
    return (
        <div className="productdetailpage">
            <div className="container --detailpage">
                {loading ? <ProductDetailSkeleton /> : <ProductInfo productInfo={productInfo} />}
            </div>
            <TabProduct />
            <RelatedProduct />
        </div>
    );
};

export default ProductDetailPage;