import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import emptyCart from "../../../../assets/img/empty-cart.png";
import CartItem from '../CartItem';
import './style.scss';

const CartList = () => {
    const cartList = useSelector(state => state.cart.cartList);
    const total = useSelector(state => state.cart.totalPrice);

    let roundTotal = total.toFixed(2);
    return (
        <div className="container --cartlist" >
            <div className={cartList.length === 0 ? "cartwrap hide" : "cartwrap"}>
                <div className="cartarea">
                    <CartItem cartList={cartList} />
                </div>
                <div className="cartfooter">
                    <p>{`Total: $${roundTotal}`}</p>
                    <Link to="/checkout">Payment</Link>
                </div>
            </div>
            <div className={cartList.length === 0 ? "emptystatus show" : "emptystatus"}>
                <img src={emptyCart} alt="" />
            </div>
        </div>
    );
};

export default CartList;