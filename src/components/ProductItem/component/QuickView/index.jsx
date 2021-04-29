import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { addToCart } from '../../../../actions/cart';
import "./style.scss";

QuickView.propTypes = {
    productInfo: PropTypes.object,
}
QuickView.defaultTypes = {
    productInfo: {}
}

function QuickView({ productInfo, onReceiveCloseQuickView, enqueueSnackbar }) {
    const flavors = ["Chocolate", "Vani", "Strawberry", "Cookies"];
    const [quantity, setQuantity] = useState(1);
    const [flavorValue, setFlavorValue] = useState(flavors[0]);
    const [active, setActive] = useState(0);
    let dispatch = useDispatch();
    let { id } = useParams();

    const handleQuantity = (value) => {
        if (value === 1) {
            setQuantity(prevalue => prevalue += value);
        }
        else if (quantity > 1) {
            setQuantity(prevalue => prevalue += value);
        }
    }

    const handleActiveFlavor = (idx) => {
        setActive(idx)
    }
    const handleAddToCart = () => {
        let newItem = {
            ...productInfo,
            quantity: quantity,
            flavorChoosed: (productInfo.type !== 'fat burner' && productInfo.type !== 'vitamin') ? flavorValue : ''
        }
        let action = addToCart(newItem);
        if (quantity) {
            dispatch(action);
            onReceiveCloseQuickView(true);
        } else {
            enqueueSnackbar("Please choose quantity of product", {
                variant: "warning"
            });
        }

    }
    const handleCloseQuickView = () => {
        onReceiveCloseQuickView();
    }
    useEffect(() => {
        setQuantity(1);
    }, [id]);

    return (
        <>
            <div className="product --quickview">
                <div className="row">
                    <div className="image col-8 col-md-4">
                        <img src={productInfo.img} alt="" />
                    </div>
                    <div className="textbox col-12 col-md-8">
                        <h2>{productInfo.title}</h2>
                        <p>{`$${productInfo.price % 1 !== 0 ? productInfo.price : `${productInfo.price}.00`}`}</p>
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
                                                className="size-checked"
                                                id={`flavor-${index}`}
                                                type="radio"
                                                value={flavor}
                                                name="choose-flavor"
                                                checked={flavorValue === flavor}
                                                hidden
                                                onChange={(e) => { setFlavorValue(e.target.value) }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                        < div className="btn" >
                            <div className="quantityfield">
                                <div onClick={() => { handleQuantity(-1) }} className="quantityfield__decreasement --btnctrl">
                                    <RemoveIcon style={{ fontSize: "14px" }} />
                                </div>
                                <input type="number"
                                    name="clicks"
                                    value={quantity === 0 ? '' : quantity}
                                    onChange={e => {
                                        setQuantity(Number(e.target.value));
                                    }} />
                                <div onClick={() => { handleQuantity(1) }} className="quantityfield__increasement --btnctrl">
                                    <AddIcon style={{ fontSize: "16px" }} />
                                </div>
                            </div>
                            <div className="buttonwrap">
                                <button onClick={handleAddToCart} className="btn__addtocart">Add To Cart</button>
                                <Link className="btn__addtocart --gotodetail" to={`/products/${(productInfo.type).split(' ').join('-')}/product-${productInfo.id}`}>
                                    Go To Detail
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="close" onClick={handleCloseQuickView}>&#10006;</div>
                </div>
            </div>
            <div className="modal" onClick={handleCloseQuickView}></div>
        </>
    );
}

export default withSnackbar(QuickView);
