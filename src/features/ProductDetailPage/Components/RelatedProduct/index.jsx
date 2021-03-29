import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ProductItem from '../../../../components/ProductItem';
import ProductItemSkeleton from '../../../../components/ProductItemSkeleton';
import SectionTitle from '../../../../components/SectionTitle';
import './style.scss';


function RelatedProduct() {
    let listProducts = useSelector(state => state.products.listProducts);
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    useEffect(() => {
        const findIndex = (listProducts) => {
            let result = -1;
            listProducts.forEach((product, idx) => {
                if (product.id === Number(id)) {
                    result = idx;
                }
            })
            return result;
        }
        if (listProducts.length !== 0) {
            let filterProducts = listProducts.filter(product => product.type === listProducts[findIndex(listProducts)].type
                && product.id !== Number(id));
            setRelatedProducts(filterProducts);
        }
    }, [listProducts, id]);

    useEffect(() => {
        if (relatedProducts.length !== 0) {
            setTimeout(() => {
                setLoading(false);
            }, getRndInteger(400, 1000))
        }
    }, [relatedProducts]);

    return (
        <div className="container relatedproduct">
            <SectionTitle text={'Related Products'} />
            {loading
                ?
                <ProductItemSkeleton numberOfItem={relatedProducts.length} />
                :
                <div className="row">
                    <ProductItem
                        listProduct={relatedProducts}
                        column={8}
                    />
                </div>
            }
        </div>
    );
}

export default RelatedProduct;