import AddIcon from '@material-ui/icons/Add';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantityItem } from '../../../../actions/cart';
import './style.scss';

CartItem.propTypes = {
    cartList: PropTypes.array,
};
CartItem.defaultProps = {
    cartList: []
}

function CartItem(props) {
    const { cartList } = props;
    const dispatch = useDispatch();

    const handleRemoveItem = (index) => {
        const action = removeItem(index);
        dispatch(action);
    };

    const handleUpdateItem = (arraydata) => {
        const action = updateQuantityItem(arraydata);
        dispatch(action);
    }
    const cartItem = cartList.map((item, index) => (
        <div className="cartitem" key={index}>
            <div className="cartitem__img">
                <img src={item.img} alt={`product-img ${item.title}`} />
            </div>
            <div className="cartitem__info">
                <div className="textbox">
                    <h3>{item.title}</h3>
                    <p>{`Price: $ ${item.price % 1 !== 0 ? item.price : `${item.price}.00`}`}</p>
                    {item.flavorChoosed ? <p>{`Flavor: ${item.flavorChoosed}`}</p> : ''}
                    <div className="quantitywrap">
                        <button onClick={() => { handleUpdateItem([index, -1]) }} className="quantitywrap__decreasement --btnctrl">
                            <RemoveIcon style={{ fontSize: "14px" }} />
                        </button>
                        <p>{item.quantity}</p>
                        <button onClick={() => { handleUpdateItem([index, 1]) }} className="quantitywrap__increasement --btnctrl">
                            <AddIcon style={{ fontSize: "16px" }} />
                        </button>
                    </div>
                </div>
                <i onClick={() => { handleRemoveItem(index) }}>
                    <DeleteForeverOutlinedIcon style={{ fontSize: "28px" }} />
                </i>
            </div>
        </div>
    ))
    return (
        <>
            {cartItem}
        </>
    );
}

export default CartItem;