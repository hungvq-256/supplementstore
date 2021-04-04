import { Checkbox, FormControl, FormControlLabel, NativeSelect } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

const useStyles = makeStyles({
    root: {
        maxWidth: "95%",
        marginBottom: '20px',
        marginLeft: "5px"
    },
    rangeLabel: {
        display: "inline",
        marginLeft: "-5px"
    },
    rangePrice: {
        display: "block",
        marginLeft: "-5px",
        '@media (max-width:991px)': {
            display: "inline",
            marginLeft: "5px"
        }
    }
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
let queryParams = ['whey', 'mass', 'bcaa', 'fat burner', 'vitamin'];

const ProductCategories = (props) => {
    const classes = useStyles();

    const { onChangeFilter,
        onReceiveSortPrice,
        filter,
        onReceiveFreeShipChecked,
        onReceiveNewProductChecked,
        onReceiveRangePrice } = props;

    let categoriesArray = ["Whey", "Mass Gainer", "BCAA", "Fat Burner", "Vitamin"];
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
        if (filter.type === undefined) {
            setActive(0);
        }
        else {
            setActive(queryParams.indexOf(filter.type) + 1)
        }
    }, [filter]);

    return (
        <div className="categories">
            <h2>Categories</h2>
            <ul>
                <li onClick={() => {
                    handleChangeFilter(null)
                }}
                    className={active === 0 ? "active" : ""}
                >
                    All Products
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
                <Typography id="range-slider" className={classes.rangeLabel} >
                    Price Range:
                </Typography>
                <Typography className={classes.rangePrice}>
                    ${rangePrice[0]} - ${rangePrice[1]}
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