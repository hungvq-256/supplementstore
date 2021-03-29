import React, { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';
import ProductCategories from './component/Categories';
import { useSelector } from 'react-redux';
import './style.scss'
import { useParams } from 'react-router';
import ProductItemSkeleton from '../../components/ProductItemSkeleton';
const ProductsPage = () => {
    let productsFromStore = useSelector(state => state.products.listProducts);
    let [listProducts, setListProducts] = useState([]);
    let [loading, setLoading] = useState(true);
    let [sortPrice, setSortPrice] = useState('');
    let { categories } = useParams();

    const onReceiveSortPrice = (value) => {
        if (Number(value) !== sortPrice) {
            setSortPrice(Number(value));
        }
    }
    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    useEffect(() => {
        setLoading(true);

        const handleSortPrice = (productsArray) => {
            if (sortPrice === 0) {
                productsArray.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            } else if (sortPrice === 1) {
                productsArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
            setListProducts(productsArray);
        }

        if (categories === 'all') {
            handleSortPrice([...productsFromStore]);
        } else {
            let filterProducts = productsFromStore.filter(product => product.type.includes(categories.split('-').join(' ')) === true);
            handleSortPrice(filterProducts);
        }
    }, [categories, productsFromStore, sortPrice]);

    useEffect(() => {
        if (listProducts.length !== 0) {
            setTimeout(() => {
                setLoading(false)
            }, getRndInteger(200, 1000));
        }
    }, [listProducts])
    return (
        <div className='container --productspage'>
            <div className="row">
                <div className="col-12 col-lg-2">
                    <ProductCategories onReceiveSortPrice={onReceiveSortPrice} />
                </div>
                <div className="col-12 col-lg-10">
                    {loading ? <ProductItemSkeleton numberOfItem={listProducts.length !== 0 ? listProducts.length : productsFromStore.length} /> :
                        <div className="row --productspage">
                            <ProductItem listProduct={listProducts} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;