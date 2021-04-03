import { Checkbox, FormControl, FormControlLabel, NativeSelect } from '@material-ui/core';
import queryString from 'query-string';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        maxWidth: "95%",
        marginBottom: '20px',
    },
});

function valuetext(value) {
    return `$${value}`;
}
const marks = [
    {
        value: 0,
        label: '$0',
    },
    {
        value: 150,
        label: '$150',
    },
];

const ProductCategories = (props) => {
    const classes = useStyles();
    const { onChangeFilter,
        onReceiveSortPrice,
        filter,
        onReceiveFreeShipChecked,
        onReceiveNewProductChecked,
        onReceiveRangePrice } = props;
    let categoriesArray = ["Whey", "Mass Gainer", "BCAA", "Fat Burner", "Vitamin"];
    let queryParams = useMemo(() => {
        return ['whey', 'mass', 'bcaa', 'fat burner', 'vitamin'];
    }, []);
    const location = useLocation();
    const queryParsed = useMemo(() => {
        let query = queryString.parse(location.search);
        return {
            ...query
        }
    }, [location.search]);
    const [active, setActive] = useState(null);
    const [rangePrice, setRangePrice] = useState([Number(filter.gtePrice), Number(filter.ltePrice)]);

    const timeOutRef = useRef(null);

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
    const handleChangeRangePrice = (e, value) => {
        setRangePrice(value);
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }
        timeOutRef.current = setTimeout(() => {
            onReceiveRangePrice(value);
        }, 500)

    };
    useEffect(() => {
        if (queryParsed.type === undefined) {
            setActive(0);
        }
        else {
            setActive(queryParams.indexOf(queryParsed.type) + 1)
        }
    }, [queryParsed, queryParams]);

    return (
        <div className="categories">
            <h2>Categories</h2>
            <ul>
                <li onClick={() => {
                    handleChangeFilter(null)
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
                style={{ display: "flex" }}
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

            <div className={classes.root}>
                <Typography id="range-slider" gutterBottom>
                    Price Range
                </Typography>
                <Slider
                    value={rangePrice}
                    onChange={handleChangeRangePrice}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    max={150}
                    marks={marks}
                    step={10}
                />
            </div>
        </div>
    );
};

export default ProductCategories;