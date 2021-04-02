import { Checkbox, FormControl, FormControlLabel, NativeSelect } from '@material-ui/core';
import queryString from 'query-string';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';


const ProductCategories = ({ onChangeFilter, onReceiveSortPrice, filter, onReceiveChecked }) => {
    let categoriesArray = ["Whey", "Mass Gainer", "BCAA", "Fat Burner", "Vitamin"];
    let queryParams = useMemo(() => {
        return ['whey', 'mass', 'bcaa', 'fat burner', 'vitamin'];
    }, []);
    let refCategory = useRef();
    const [sortPrice, setSortPrice] = useState('');
    const history = useHistory();
    const queryParsed = queryString.parse(history.location.search);
    const [queryCategory] = useState(queryParsed.type);
    const [active, setActive] = useState(null);

    const handleChangeSort = (event) => {
        let value = event.target.value;
        onReceiveSortPrice(value);
        setSortPrice(value);
    };

    const handleChangeFilter = (category) => {
        onChangeFilter(category);
    }

    const handleChangeCheck = (e) => {
        onReceiveChecked(e.target.checked);
    }

    useEffect(() => {
        if (queryCategory === undefined) {
            setActive(0);
        }
        else {
            setActive(queryParams.indexOf(queryCategory) + 1)
        }
    }, [queryCategory, queryParams]);

    useEffect(() => {
        setActive(queryParams.indexOf(filter.type) + 1)
    }, [filter.type, queryParams])

    return (
        <div className="categories">
            <h2>Categories</h2>
            <ul ref={refCategory}>
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
                    value={sortPrice}
                    name="sort by price"
                    onChange={handleChangeSort}
                    inputProps={{ 'aria-label': 'age' }}
                >
                    <option value={-1} style={{ fontSize: '1em', fontFamily: "Poppins" }}>
                        Sort By Price
                    </option>
                    <option value={0} style={{ fontSize: '1em', fontFamily: "Poppins" }}>Descending Price</option>
                    <option value={1} style={{ fontSize: '1em', fontFamily: "Poppins" }}>Ascending Price</option>
                </NativeSelect>
            </FormControl>
            <FormControlLabel
                style={{ marginBottom: '20px', display: "flex" }}
                control={
                    <Checkbox
                        checked={Boolean(filter.isFreeShip)}
                        onChange={handleChangeCheck}
                        name="isFreeShip"
                        color="primary"
                    />
                }
                label="Free Ship"
            />
        </div>
    );
};

export default ProductCategories;