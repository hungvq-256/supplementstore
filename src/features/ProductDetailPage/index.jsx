import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import productsApi from '../../api/productsApi';
import ProductDetailSkeleton from '../../components/ProductDetailSkeleton';
import ProductItemSkeleton from '../../components/ProductItemSkeleton';
import SectionTitle from '../../components/SectionTitle';
import ProductInfo from './Components/ProductInfo';
import RelatedProduct from './Components/RelatedProduct';
import TabProduct from './Components/TabProduct';
import './style.scss';

const ProductDetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [productInfo, setProductInfo] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    let { id, categories } = useParams();
    const convertCategoriesSlug = (categories) => {
        return categories.split('-').join(" ");
    }
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                let productItem = await productsApi.get(id);
                let relatedProducts = await productsApi.getAll({ type: convertCategoriesSlug(categories) });
                setProductInfo(productItem);
                setRelatedProducts(relatedProducts);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        })()
    }, [id, categories]);

    return (
        <div className="productdetailpage">
            <div className="container --detailpage">
                {loading ? <ProductDetailSkeleton /> : <ProductInfo productInfo={productInfo} />}
            </div>
            <TabProduct />
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