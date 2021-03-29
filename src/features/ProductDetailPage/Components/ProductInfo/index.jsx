import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../actions/cart';
import { withSwalInstance } from 'sweetalert2-react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import swal from 'sweetalert2';
import "./style.scss";

const SweetAlert = withSwalInstance(swal);

ProductInfo.propTypes = {
    productInfo: PropTypes.object,
}
ProductInfo.defaultTypes = {
    productInfo: {}
}

function ProductInfo({ productInfo }) {
    let flavors = ["Chocolate", "Vani", "Strawberry", "Cookies"];
    let [quantity, setQuantity] = useState(1);
    let [flavorValue, setFlavorValue] = useState(flavors[0]);
    const [alert, setAlert] = useState(false);
    let dispatch = useDispatch();
    let flavorRef = useRef();
    let { id } = useParams();

    const handleDecreasement = () => {
        if (quantity > 1) {
            setQuantity(prevalue => prevalue - 1)
        }
    }
    const handleIncreasement = () => {
        setQuantity(prevalue => prevalue + 1)
    }
    const handleFlavorChecked = (e) => {
        setFlavorValue(e.target.value);
    }
    const handleActiveFlavor = (idx) => {
        if (flavorRef.current !== undefined) {
            let flavorList = flavorRef.current.children;
            for (let i = 0; i < flavorList.length; i++) {
                flavorList[i].className = flavorList[i].className.replace('active', '');
            }
            flavorList[idx].className = "active";
        }
    }
    const handleAddToCart = () => {
        let newItem = {
            ...productInfo,
            quantity: quantity,
            flavorChoosed: (productInfo.type !== 'fat burner' && productInfo.type !== 'vitamin') ? flavorValue : ''
        }
        let action = addToCart(newItem);
        dispatch(action);
        setAlert(true);
    }
    const handleUpperCase = (string) => {
        let convertToArray = string.toLowerCase().split(' ');
        let upperFirstLetter = convertToArray.map(item => `${item.charAt(0).toUpperCase()}${item.slice(1)}`);
        return upperFirstLetter.join(' ');
    };
    useEffect(() => {
        setQuantity(1);
    }, [id]);
    useEffect(() => {
        handleActiveFlavor(0);
    }, []);
    return (
        <div className="product">
            <div className="product__title">
                <h2>{productInfo.title}</h2>
                <p>Category: {
                    productInfo.type.charAt(0) === 'b' ? productInfo.type.toUpperCase() :
                        handleUpperCase(productInfo.type)
                }</p>
            </div>
            <div className="row">
                <div className="image col-8 col-sm-4">
                    <img src={productInfo.img} alt="" />
                </div>
                <div className="textbox col-12 col-sm-8">
                    <p>{`$${productInfo.price % 1 !== 0 ? productInfo.price : `${productInfo.price}.00`}`}</p>
                    <p className="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt et ad inventore quam fugit amet, blanditiis, vero expedita obcaecati nostrum eaque,
                    nobis enim excepturi vitae repellendus ipsum eveniet iste quos!</p>
                    {(productInfo.type === 'vitamin' || productInfo.type === 'fat burner') ? '' :
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
                    }
                    < div className="btn" >
                        <div className="quantityfield">
                            <button onClick={handleDecreasement} className="quantityfield__decreasement --btnctrl">
                                <RemoveIcon style={{ fontSize: "14px" }} />
                            </button>
                            <input type="number"
                                name="clicks"
                                value={quantity === 0 ? '' : quantity}
                                onChange={event => {
                                    setQuantity(Number(event.target.value));
                                }} />
                            <button onClick={handleIncreasement} className="quantityfield__increasement --btnctrl">
                                <AddIcon style={{ fontSize: "16px" }} />
                            </button>
                        </div>
                        <button onClick={handleAddToCart} className="btn__addtocart">Add To Cart</button>
                    </div>
                </div>
            </div>
            <SweetAlert
                show={alert}
                title="Successfully add to cart"
                text="Thanks a lot !!!"
                icon='warning'
                onConfirm={() => setAlert(false)}
            />
        </div>
    );
}

export default ProductInfo;
