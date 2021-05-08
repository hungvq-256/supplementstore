import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import SweetAlert from 'sweetalert2-react';
import { addToCart } from '../../../../actions/cart';
import "./style.scss";

ProductInfo.propTypes = {
    productInfo: PropTypes.object,
}
ProductInfo.defaultTypes = {
    productInfo: {}
}

function ProductInfo({ productInfo, enqueueSnackbar }) {
    const flavors = ["Chocolate", "Vani", "Strawberry", "Cookies"];
    const [quantity, setQuantity] = useState(1);
    const [flavorValue, setFlavorValue] = useState(flavors[0]);

    const [active, setActive] = useState(0);
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch();
    let { id } = useParams();

    const handleQuantity = (value) => {
        if (value === 1) {
            setQuantity(prevalue => prevalue += value);
        }
        else if (quantity > 1) {
            setQuantity(prevalue => prevalue += value);
        }
    }

    const handleFlavorChecked = (e) => {
        setFlavorValue(e.target.value);
    }
    const handleActiveFlavor = (idx) => {
        setActive(idx);
    }
    const handleAddToCart = () => {
        let newItem = {
            ...productInfo,
            quantity: quantity,
            flavorChoosed: (productInfo.type !== 'fat burner' && productInfo.type !== 'vitamin') ? flavorValue : ''
        }
        let action = addToCart(newItem);
        if (quantity !== 0) {
            dispatch(action);
            setAlert(true);
        } else {
            enqueueSnackbar("Please choose quantity of product", {
                variant: "warning"
            });
        }
    }

    const handleUpperCase = (string) => {
        let convertToArray = string.toLowerCase().split(' ');
        let upperFirstLetter = convertToArray.map(item => `${item.charAt(0).toUpperCase()}${item.slice(1)}`);
        return upperFirstLetter.join(' ');
    };
    useEffect(() => {
        setQuantity(1);
    }, [id]);
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
                    <p>{`$${productInfo.price % 1 !== 0 ? (productInfo.price).toFixed(2) : `${productInfo.price}.00`}`}</p>
                    <p className="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt et ad inventore quam fugit amet, blanditiis, vero expedita obcaecati nostrum eaque,
                        nobis enim excepturi vitae repellendus ipsum eveniet iste quos!</p>
                    {(productInfo.type === 'vitamin' || productInfo.type === 'fat burner') ? '' :
                        <div className="flavor">
                            Flavor:
                                <ul className="flavorlist">
                                {flavors.map((flavor, index) => (
                                    <li key={index} className={active === index ? "active" : ""} >
                                        <label
                                            htmlFor={`flavor-${index}`}
                                            className="flavor-option"
                                            onClick={() => { handleActiveFlavor(index) }}
                                        >
                                            {flavor}
                                        </label>
                                        <input
                                            className="flavor-checked"
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
                            <button onClick={() => { handleQuantity(-1) }} className="quantityfield__decreasement --btnctrl">
                                <RemoveIcon style={{ fontSize: "14px" }} />
                            </button>
                            <input type="number"
                                name="clicks"
                                value={quantity === 0 ? '' : quantity}
                                onChange={event => {
                                    setQuantity(Number(event.target.value));
                                }} />
                            <button onClick={() => { handleQuantity(1) }} className="quantityfield__increasement --btnctrl">
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

export default withSnackbar(ProductInfo);
