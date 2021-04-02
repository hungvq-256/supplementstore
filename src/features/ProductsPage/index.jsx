import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import productsApi from '../../api/productsApi';
import ProductItem from '../../components/ProductItem';
import ProductItemSkeleton from '../../components/ProductItemSkeleton';
import ProductCategories from './component/Categories';
import PaginationRounded from './component/Pagination';
import './style.scss';

const ProductsPage = () => {
    const history = useHistory();
    const location = useLocation();
    let [products, setProducts] = useState({
        numberOfProduct: 0,
        listProduct: [],
        loading: true
    });
    const { numberOfProduct, listProduct, loading } = products;
    let [sortPrice, setSortPrice] = useState(-1);

    const queryParsed = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
        }
    }, [location.search]);

    const productPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePushQueryToUrl = (filter) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filter)
        })
    }

    const handleChangeFilter = (category) => {
        if (category !== undefined) {
            if (category === '') {
                delete queryParsed.type
                let filter = {
                    ...queryParsed
                }
                handlePushQueryToUrl(filter);
            }
            else {
                let filter = {
                    ...queryParsed,
                    type: category
                }
                handlePushQueryToUrl(filter);
            }
        }
    }

    const onReceiveSortPrice = (value) => {
        setSortPrice(Number(value));
    };

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    const handleChecked = (checked) => {
        if (checked) {
            let filter = {
                ...queryParsed,
                isFreeShip: checked
            }
            handlePushQueryToUrl(filter);
        }
        else {
            delete queryParsed.isFreeShip;
            let filter = {
                ...queryParsed
            }
            handlePushQueryToUrl(filter);
        }
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [history.location]);

    useEffect(() => {
        setProducts(prevalue => ({
            ...prevalue,
            loading: true
        }));
        const handleSortByPrice = (filterProducts) => {
            if (sortPrice === 0) {
                return filterProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            } else if (sortPrice === 1) {
                return filterProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
            return filterProducts;
        }
        (async () => {
            try {
                let filterProducts = await productsApi.getAll(queryParsed);
                if (filterProducts.length > 8) {
                    let indexOfFirst = productPerPage * currentPage - productPerPage;
                    let indexOfLast = indexOfFirst + productPerPage;
                    let sliceProducts = filterProducts.slice(indexOfFirst, indexOfLast);
                    let sortByPrice = handleSortByPrice(sliceProducts);
                    setProducts(prevalue => ({
                        ...prevalue,
                        numberOfProduct: filterProducts.length,
                        listProduct: sortByPrice,
                        loading: false
                    }));
                }
                else {
                    let sortByPrice = handleSortByPrice(filterProducts);
                    setProducts(prevalue => ({
                        ...prevalue,
                        numberOfProduct: filterProducts.length,
                        listProduct: sortByPrice,
                        loading: false
                    }));
                }
            }
            catch (error) {
                console.log(error);
            }
        })()
    }, [sortPrice, currentPage, history.location, queryParsed]);

    return (
        <div className='container --productspage'>
            <div className="row">
                <div className="col-12 col-lg-2">
                    <ProductCategories
                        onReceiveSortPrice={onReceiveSortPrice}
                        onChangeFilter={handleChangeFilter}
                        onReceiveChecked={handleChecked}
                        filter={queryParsed}
                    />
                </div>
                <div className="col-12 col-lg-10">
                    {loading ? <ProductItemSkeleton /> :
                        <div className="row --productspage">
                            <ProductItem listProduct={listProduct} />
                        </div>
                    }
                    {numberOfProduct > 8 &&
                        <PaginationRounded
                            onReceivePaginationClick={handlePaginationClick}
                            count={Math.ceil(numberOfProduct / productPerPage)}
                            page={currentPage}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;