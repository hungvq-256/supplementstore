import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductItem from '../../../../components/ProductItem';
import './style.scss';

RelatedProduct.propTypes = {
    relatedProducts: PropTypes.array,
}
RelatedProduct.defaultTypes = {
    relatedProducts: []
}
function RelatedProduct({ relatedProducts }) {
    let { id } = useParams();
    const [filterProducts, setfilterProducts] = useState([]);

    useEffect(() => {
        let filterProducts = relatedProducts.filter(product => product.id !== Number(id));
        setfilterProducts(filterProducts);
    }, [relatedProducts, id]);

    return (
        <div className="container relatedproduct">
            <div className="row --relatedproduct">
                <ProductItem
                    listProduct={filterProducts}
                    column={8}
                />
            </div>
        </div>
    );
}

export default RelatedProduct;