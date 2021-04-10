import React, { useEffect, useState } from 'react';
import "./style.scss";
import firebase from "firebase/app";
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
require("firebase/firestore");

let db = firebase.firestore();
const PurchaseHistory = () => {
    const [purchasedList, setPurchasedList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        (async () => {
            try {
                let fetchPurchaseHistory = await db.collection(`/users/${user.userId}/purchareHistory`).get();
                let result = fetchPurchaseHistory.docs.map(doc => doc.data());
                let sortOrderPurchase = result.sort(function (a, b) {
                    return (b.date.seconds) - (a.date.seconds);
                });
                setPurchasedList(sortOrderPurchase)
            }
            catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, []);
    return (
        <div className="purchaseHistoryWrapper">
            {loading ? <CircularProgress className="loadingpurchasehistory" size={50} style={{ color: "#cccccc" }} />
                : (purchasedList.length !== 0 ?
                    purchasedList.map((item, index) => (
                        <div className="purchasehistory" key={index}>
                            <div className="orderdat">
                                <p>{item.createdAt}</p>
                            </div>
                            {item.cartList.map((cartitem, index) => (
                                <div className="orderitem">
                                    <div className="productinfo">
                                        <div className="subtext">
                                            <p className="numericalorder">{index + 1}.</p>
                                            <h3 className='orderitem_producttitle'>{cartitem.title}</h3>
                                        </div>
                                        <div className="subtext">
                                            {cartitem.flavorChoosed && <p>Flavor: {cartitem.flavorChoosed}</p>}
                                            <p>{`Quantity: ${cartitem.quantity} x $${cartitem.price % 1 !== 0 ? (cartitem.price).toFixed(2) : `${cartitem.price}.00`}`}</p>
                                        </div>
                                    </div>
                                    <div className="price">${(cartitem.price * cartitem.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                            <div className="totalprice">
                                <p>Total: ${item.total}</p>
                            </div>
                        </div>
                    ))
                    : <p className="notiemptypurchasehistory">Maybe you have not bought something in our store</p>
                )
            }
        </div>
    );
};

export default PurchaseHistory;