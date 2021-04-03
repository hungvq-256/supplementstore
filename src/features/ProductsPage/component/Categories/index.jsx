import { Checkbox, FormControl, FormControlLabel, NativeSelect } from '@material-ui/core';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.scss';


const ProductCategories = (props) => {
    const { onChangeFilter, onReceiveSortPrice, filter, onReceiveFreeShipChecked, onReceiveNewProductChecked } = props;
    let categoriesArray = ["Whey", "Mass Gainer", "BCAA", "Fat Burner", "Vitamin"];
    let queryParams = useMemo(() => {
        return ['whey', 'mass', 'bcaa', 'fat burner', 'vitamin'];
    }, []);
    const location = useLocation();
    const history = useHistory();
    const queryParsed = useMemo(()=>{
        return queryString.parse(history.location.search);
    },[location.search]);
    const [queryCategory] = useState(queryParsed.type);
    const [active, setActive] = useState(null);

    const handleChangeSort = (event) => {
        let value = event.target.value;
        onReceiveSortPrice(value);
    };

    const handleChangeFilter = (category) => {
        onChangeFilter(category);
    }

    const handleCheckFreeShip = (e) => {
        onReceiveFreeShipChecked(e.target.checked);
    }

    const handleCheckNewProduct = (e) => {
        onReceiveNewProductChecked(e.target.checked);
    }

    useEffect(() => {
        if (queryParsed.type === undefined) {
            setActive(0);
        }
        else {
            setActive(queryParams.indexOf(queryParsed.type) + 1)
        }
    }, [queryParsed]);
    
    return (
        <div className="categories">
            <h2>Categories</h2>
            <ul>
                <li onClick={() => {
                    handleChangeFilter('')
                }}
                    className={active === 0 ? "active" : ""}
                >
                    All Product
                </li>
                {categoriesArray.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            handleChangeFilter(queryParams[index])
                        }}
                        className={active === (index + 1) ? "active" : ""}
                    >
                        {category}
                    </li>
                ))}
            </ul>
            <FormControl style={{ width: '100%', marginBottom: '5px', fontSize: '1em', fontFamily: "Poppins" }} >
                <NativeSelect
                    value={filter.sort}
                    name="sort by price"
                    onChange={handleChangeSort}
                    inputProps={{ 'aria-label': 'age' }}
                >
                    <option value="priceDF" style={{ fontSize: '1em', fontFamily: "Poppins" }}>
                        Sort By Price
                    </option>
                    <option value="priceDSC" style={{ fontSize: '1em', fontFamily: "Poppins" }}>Descending Price</option>
                    <option value="priceASC" style={{ fontSize: '1em', fontFamily: "Poppins" }}>Ascending Price</option>
                </NativeSelect>
            </FormControl>
            <FormControlLabel
                style={{ display: "flex" }}
                control={
                    <Checkbox
                        checked={Boolean(filter.isFreeShip)}
                        onChange={handleCheckFreeShip}
                        name="isFreeShip"
                        color="primary"
                    />
                }
                label="Free Ship"
            />
            <FormControlLabel
                style={{ marginBottom: '20px', display: "flex" }}
                control={
                    <Checkbox
                        checked={Boolean(filter.isNew)}
                        onChange={handleCheckNewProduct}
                        name="isNew"
                        color="primary"
                    />
                }
                label="New Product"
            />
        </div>
    );
};

export default ProductCategories;