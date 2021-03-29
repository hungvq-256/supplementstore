import { FormControl, NativeSelect } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.scss';


const ProductCategories = (props) => {
    let categoriesArray = ["All Product", "Whey", "Mass Gainer", "BCAA", "Fat Burner", "Vitamin"];
    let slug = ['all', 'whey', 'mass', 'bcaa', 'fat-burner', 'vitamin'];

    let refCategory = useRef();
    let { categories } = useParams();
    const [sortPrice, setSortPrice] = useState('');

    const handleChange = (event) => {
        let value = event.target.value;
        props.onReceiveSortPrice(value);
        setSortPrice(value);
    };

    const handleActiveCategory = (idx) => {
        let listCategories = refCategory.current.children;
        for (let i = 0; i < listCategories.length; i++) {
            listCategories[i].className = listCategories[i].className.replace('active', '');
        }
        listCategories[idx].className = 'active';
    }

    useEffect(() => {
        let categoryItem = ['all', 'whey', 'mass', 'bcaa', 'fat-burner', 'vitamin'];
        handleActiveCategory(categoryItem.indexOf(categories));
    }, [categories])
    return (
        <div className="categories">
            <h2>Categories</h2>
            <ul ref={refCategory}>
                {categoriesArray.map((category, index) => (
                    <li key={index}>
                        <Link
                            to={`/products/${slug[index]}`}
                            onClick={() => { handleActiveCategory(index) }}
                        >{category}
                        </Link>
                    </li>
                ))}
            </ul>
            <FormControl style={{ width: '100%', marginBottom: '20px' }} >
                <NativeSelect
                    value={sortPrice}
                    name="age"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'age' }}
                >
                    <option value={-1} style={{ fontSize: '1em', fontFamily: "Poppins" }}>
                        Sort By Price
                    </option>
                    <option value={0} style={{ fontSize: '1em', fontFamily: "Poppins" }}>Descending Price</option>
                    <option value={1} style={{ fontSize: '1em', fontFamily: "Poppins" }}>Ascending Price</option>
                </NativeSelect>
            </FormControl>
        </div>
    );
};

export default ProductCategories;