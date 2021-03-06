import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import { addToCart } from '../../actions/cart';
import QuickView from './component/QuickView';
import './style.scss';

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
    const history = useHistory();
    const [statusPopup, setStatusPopup] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);
    const [productPopup, setProductPopup] = useState({});
    const [alert, setAlert] = useState(false);
    const flavorRef = useRef();

    const handleAddToCart = (id) => {
        const productItem = listProduct.find(item => item.id === id);
        const action = addToCart(productItem);
        if (productItem.type !== 'vitamin' && productItem.type !== 'fat burner') {
            setProductPopup(productItem);
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

    const handleAddToCartPopup = () => {
        let newItem = {
            ...productPopup,
            flavorChoosed: flavorValue
        }
        let action = addToCart(newItem);
        dispatch(action);
        setAlert(true);
        setStatusPopup(false);
    }

    const handleDisplayQuickView = (id) => {
        const findProduct = listProduct.find(item => item.id === id);
        setProductPopup(findProduct);
        setShowQuickView(true);
    }

    const handleCloseQuickView = (addToCart) => {
        if (addToCart) {
            setAlert(true);
            setShowQuickView(false);
        }
        else {
            setShowQuickView(false);
        }
    }
    const handleGoToProductDetailPage = (type, id) => {
        history.push(`/products/${(type).split(' ').join('-')}/product-${id}`)
    }
    const generateInitialPrice = (price, salePercent) => {
        let initialPrice = (Number(price) * 100) / (100 - Number(salePercent));
        return initialPrice % 1 !== 0 ? initialPrice.toFixed(2) : `${initialPrice}.00`
    }

    const products = listProduct.map((item) => (
        <div className={`col-${column} col-xxs col-sm-4 col-lg-3`} key={item.id}>
            <div className="productitem">
                <div className="productitem__img" onClick={() => { handleGoToProductDetailPage(item.type, item.id) }}>
                    <div style={{ backgroundImage: `url(${item.img})` }}></div>
                </div>
                <div className="productitem__textbox">
                    <div onClick={() => { handleGoToProductDetailPage(item.type, item.id) }}>
                        <h3>{item.title}</h3>
                    </div>
                    <div className="pricegroup">
                        <p>{`$${Number(item.price) % 1 !== 0 ? (item.price).toFixed(2) : `${item.price}.00`}`}</p>
                        {item.isSale && <p className="oldprice">${generateInitialPrice(item.price, item.salePercent)}</p>}
                    </div>
                    <div className="btngroup">
                        <button onClick={() => { handleAddToCart(item.id) }}>
                            Add to cart
                        </button>
                        <i onClick={() => handleDisplayQuickView(item.id)}><VisibilitySharpIcon /></i>
                    </div>
                </div>
                {(newTag || item.isSale) &&
                    <div className="producttag">
                        {item.isSale ? `-${item.salePercent}%` : "NEW"}
                    </div>
                }
            </div>
        </div>
    ));

    useEffect(() => {
        if (statusPopup) {
            handleActiveFlavor(0);
        }
    }, [statusPopup]);
    return (
        <>
            {products}
            {statusPopup &&
                <div className="productpopupwrap">
                    <div className="productpopup">
                        <div className="productpopup__img" style={{ backgroundImage: `url(${productPopup.img})` }}></div>
                        <p className="productpopup__title">{productPopup.title}</p>
                        <p className="productpopup__price">Price: ${productPopup.price}</p>
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
                                            name="choose-flavor"
                                            checked={flavorValue === flavor}
                                            hidden
                                            onChange={(e) => setFlavorValue(e.target.value)}
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
            {showQuickView && <QuickView productInfo={productPopup} onReceiveCloseQuickView={handleCloseQuickView} />}
            <SweetAlert
                show={alert}
                title="Successfully add to cart"
                text="Thanks a lot !!!"
                icon="success"
                onConfirm={() => setAlert(false)}
            />
        </>
    );
}

export default ProductItem;
