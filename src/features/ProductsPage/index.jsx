import queryString from 'query-string';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

    const queryParsed = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            sort: params.sort || "priceDF",
            page: params.page || 1
        }
    }, [location.search]);
    const [initialQuery] = useState(queryParsed);
    const productPerPage = 8;
    const productsRef = useRef();

    const handlePushQueryToUrl = (filter) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filter)
        })
    };

    const handleChangeFilter = (category) => {
        if (category === '') {
            delete queryParsed.type;
            handlePushQueryToUrl({
                ...queryParsed,
                page: 1
            });
        }
        else {
            handlePushQueryToUrl({
                ...queryParsed,
                type: category,
                page: 1
            });
        }
    }

    const onReceiveSortPrice = (value) => {
        handlePushQueryToUrl({
            ...queryParsed,
            sort: value
        });
    };

    const handlePaginationClick = (page) => {
        handlePushQueryToUrl({
            ...queryParsed,
            page: page
        });
        window.scrollTo({
            top: productsRef.current.offsetTop - 30,
            behavior: "smooth"
        });
    };

    const handleFreeShipChecked = (checked) => {
        if (checked) {
            handlePushQueryToUrl({
                ...queryParsed,
                isFreeShip: checked
            });
        }
        else {
            delete queryParsed.isFreeShip;
            handlePushQueryToUrl({
                ...queryParsed
            });
        }
    }

    const handleNewProductChecked = (checked) => {
        if (checked) {
            handlePushQueryToUrl({
                ...queryParsed,
                isNew: checked
            });
        }
        else {
            delete queryParsed.isNew;
            handlePushQueryToUrl({
                ...queryParsed
            });
        }
    }

    useEffect(() => {
        history.push({
            pathname: "/products",
            search: queryString.stringify(initialQuery)
        })
    }, [history, initialQuery])

    useEffect(() => {
        setProducts(prevalue => ({
            ...prevalue,
            loading: true
        }));
        const handleSortByPrice = (filterProducts) => {
            if (queryParsed.sort === "priceDSC") {
                return filterProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            } else if (queryParsed.sort === "priceASC") {
                return filterProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
            return filterProducts;
        }
        (async () => {
            try {
                let filterProducts = await productsApi.getAll(queryParsed);
                if (filterProducts.length > 8) {
                    let indexOfFirst = productPerPage * Number(queryParsed.page) - productPerPage;
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
    }, [queryParsed]);

    return (
        <div className='container --productspage'>
            <div className="row">
                <div className="col-12 col-lg-2">
                    <ProductCategories
                        onReceiveSortPrice={onReceiveSortPrice}
                        onChangeFilter={handleChangeFilter}
                        onReceiveFreeShipChecked={handleFreeShipChecked}
                        onReceiveNewProductChecked={handleNewProductChecked}
                        filter={queryParsed}
                    />
                </div>
                <div ref={productsRef} className="col-12 col-lg-10">
                    {loading ? <ProductItemSkeleton /> :
                        <div className="row --productspage">
                            <ProductItem listProduct={listProduct} />
                        </div>
                    }
                    {numberOfProduct > 8 &&
                        <PaginationRounded
                            onReceivePaginationClick={handlePaginationClick}
                            count={Math.ceil(numberOfProduct / productPerPage)}
                            page={Number(queryParsed.page)}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;