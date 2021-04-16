import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import productsApi from '../../api/productsApi';
import ProductDetailSkeleton from '../../components/ProductDetailSkeleton';
import ProductItemSkeleton from '../../components/ProductItemSkeleton';
import SectionTitle from '../../components/SectionTitle';
import ClientReview from './Components/ClientReview';
import ProductInfo from './Components/ProductInfo';
import RelatedProduct from './Components/RelatedProduct';
import TabProduct from './Components/TabProduct';
import './style.scss';

const ProductDetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({
        productInfo: [],
        relatedProducts: []
    });
    const { productInfo, relatedProducts } = products;
    let { id, categories } = useParams();

    const convertCategoriesSlug = (categories) => {
        return categories.split('-').join(" ");
    }
    useEffect(() => {
        setLoading(true);
        (() => {
            let productItem = productsApi.get(id);
            let relatedProducts = productsApi.getAll({ type: convertCategoriesSlug(categories) });

            Promise.all([productItem, relatedProducts])
                .then(([productItem, relatedProducts]) => {
                    setProducts(prevalue => ({
                        ...prevalue,
                        productInfo: productItem,
                        relatedProducts: relatedProducts
                    }));
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error)
                })
        })()
    }, [id, categories]);

    return (
        <div className="productdetailpage">
            <div className="container --detailpage">
                {loading ? <ProductDetailSkeleton /> : <ProductInfo productInfo={productInfo} />}
            </div>
            <TabProduct />
            <div className="container">
                <SectionTitle text={'Review Product'} />
            </div>
            <ClientReview productInfo={productInfo} />
            <div className="container">
                <SectionTitle text={'Related Products'} />
            </div>
            {loading ?
                <div className="container">
                    <ProductItemSkeleton />
                </div>
                :
                <RelatedProduct relatedProducts={relatedProducts} />
            }
        </div>
    );
};

export default ProductDetailPage;