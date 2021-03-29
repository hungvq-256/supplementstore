import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import { withSwalInstance } from 'sweetalert2-react';
import { addToCart } from '../../actions/cart';
import './style.scss';

const SweetAlert = withSwalInstance(swal);

ProductItem.propTypes = {
    listProduct: PropTypes.array,
    column: PropTypes.number
};

ProductItem.defaultProps = {
    listProduct: [],
    column: 6,
    newTag: false
}
function ProductItem(props) {
    let flavors = ["Chocolate", "Vani", "Strawberry", "Cookies"];
    const [flavorValue, setFlavorValue] = useState("Chocolate");
    const { listProduct, column, newTag } = props;
    const dispatch = useDispatch();
    // const location = useLocation(); //get current url location.pathname
    const [statusPopup, setStatusPopup] = useState(false);
    const [productId, setProductId] = useState(null);
    const [alert, setAlert] = useState(false);
    const flavorRef = useRef();
    const handleAddToCart = (id) => {
        const productItem = listProduct.find(item => item.id === id);
        const action = addToCart(productItem);
        if (productItem.type !== 'vitamin' && productItem.type !== 'fat burner') {
            setProductId(id);
            setStatusPopup(true);
        } else {
            setAlert(true);
            dispatch(action);
        }
    }
    const handleClosePopup = () => {
        setStatusPopup(false);

    }
    const handleActiveFlavor = (idx) => {
        let flavorList = flavorRef.current.children;
        for (let i = 0; i < flavorList.length; i++) {
            flavorList[i].className = flavorList[i].className.replace('active', '');
        }
        flavorList[idx].className = "active";
    }
    const handleFlavorChecked = (e) => {
        setFlavorValue(e.target.value);
    }
    const handleAddToCartPopup = () => {
        let newItem = {
            ...findProduct,
            flavorChoosed: flavorValue
        }
        let action = addToCart(newItem);
        dispatch(action);
        setAlert(true);
    }
    const products = listProduct.map((item) => (
        <div className={`col-${column} col-sm-4 col-lg-3`} key={item.id}>
            <div className="productitem">
                <Link to={`/products/product-${item.id}`}>
                    <div className="productitem__img" style={{ backgroundImage: `url(${item.img})` }}></div>
                </Link>
                <div className="productitem__textbox">
                    <Link to={`/products/product-${item.id}`} title={item.title}>
                        <h3>{item.title}</h3>
                    </Link>
                    <p>{`$${Number(item.price) % 1 !== 0 ? item.price : `${item.price}.00`}`}</p>
                    <button onClick={() => { handleAddToCart(item.id) }}>
                        Add to cart
                    </button>
                </div>
                {newTag ? <div className="newtag">NEW</div> : ''}
            </div>
        </div>
    ))
    const findProduct = listProduct.find(item => item.id === productId);
    useEffect(() => {
        if (findProduct !== undefined) {
            handleActiveFlavor(0);
        }
    }, [findProduct]);
    return (
        <>
            {products}
            {(findProduct === undefined || statusPopup === false) ? '' :
                <div className="productpopupwrap">
                    <div className="productpopup">
                        <div className="productpopup__img" style={{ backgroundImage: `url(${findProduct.img})` }}></div>
                        <p className="productpopup__title">{findProduct.title}</p>
                        <p className="productpopup__price">Price: ${findProduct.price}</p>
                        <div className="flavor">
                            Flavor:
                            <ul ref={flavorRef} className="flavorlist">
                                {flavors.map((flavor, index) => (
                                    <li key={index} >
                                        <label
                                            htmlFor={`flavor-${index}`}
                                            className="flavor-option"
                                            onClick={() => { handleActiveFlavor(index) }}
                                        >
                                            {flavor}
                                        </label>
                                        <input
                                            className="size-checked"
                                            id={`flavor-${index}`}
                                            type="radio"
                                            value={flavor}
                                            name="choose-size"
                                            checked={flavorValue === flavor}
                                            hidden
                                            onChange={handleFlavorChecked}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="productpopup__btn" onClick={handleAddToCartPopup}>Add to cart</div>
                        <div className="close" onClick={handleClosePopup}>&#10006;</div>
                    </div>
                    <div className="modal" onClick={handleClosePopup}></div>
                </div>
            }
            <SweetAlert
                show={alert}
                title="Successfully add to cart"
                text="Thanks a lot !!!"
                icon='warning'
                onConfirm={() => setAlert(false)}
            />
        </>
    );
}

export default ProductItem;