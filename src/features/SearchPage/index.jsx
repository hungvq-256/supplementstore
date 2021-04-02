import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

const SearchPage = () => {
    const listProducts = useSelector(state => state.products.listProducts);
    let [inputValue, setInputValue] = useState('');
    let [filterProducts, setFilterProducts] = useState([]);
    let inputRef = useRef();
    let typingTimeOutRef = useRef(null);

    const handleSearchValue = (e) => {
        let value = e.target.value;
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        typingTimeOutRef.current = setTimeout(() => {
            setInputValue(value);
        }, 500)
    }

    const handleUpperCase = (string) => {
        let convertToArray = string.toLowerCase().split(' ');
        let upperFirstLetter = convertToArray.map(item => `${item.charAt(0).toUpperCase()}${item.slice(1)}`);
        return upperFirstLetter.join(' ');
    };
    useEffect(() => {
        inputRef.current.focus()
    }, []);
    useEffect(() => {
        let searchProduct =
            listProducts.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()) === true
                || item.type.toLowerCase().includes(inputValue.toLowerCase()) === true
            );
        if (inputValue !== '') {
            setFilterProducts(searchProduct);
        }
    }, [inputValue, listProducts])
    return (
        <div className='container --searchpage'>
            <div className="inputfield">
                <input
                    ref={inputRef}
                    type="text"
                    onChange={handleSearchValue}
                    placeholder='Search your product'
                />
            </div>
            <div className="searchresult">
                {filterProducts.map(item => (
                    <Link to={`/products/${item.type.split(' ').join("-")}/product-${item.id}`} key={item.id} className='productresult'>
                        <div className="productresult__productimg">
                            <div style={{ backgroundImage: `url(${item.img})` }}></div>
                        </div>
                        <div className="productresult__textbox">
                            <h3>{item.title}</h3>
                            <p>Category: {handleUpperCase(item.type)}</p>
                            <p className='price'>{`$${Number(item.price) % 1 !== 0 ? item.price : `${item.price}.00`}`}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;