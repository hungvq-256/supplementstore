import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import firebase from "firebase/app";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { removeAllCart } from '../../actions/cart.js';
import CheckoutForm from './component/CheckoutForm.jsx';
import OrderSummary from './component/OrderSummary.jsx';
import "./style.scss";
require("firebase/firestore");

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 1, 0)
    },
    formcheckout: {
        maxWidth: "450px",
        margin: "0 auto",
        padding: "10px",
        borderRadius: "5px",
        background: "#ffffff",
        maxHeight: "700px"
    },
    buttongroup: {
        display: "flex",
        justifyContent: "space-between",
        margin: theme.spacing(2, 0, 0, 0),
    },
    backbtn: {
        textDecoration: "none",
        color: "#111111"
    },
    checkoutstatus: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 0"
    },
    shippingInfo: {
        display: "flex",
        alignItem: "center",
        fontSize: "1.3em",
    },
    paymentDetail: {
        display: "flex",
        alignItems: "center",
    },
    line: {
        width: "40%",
        height: "1px",
        background: "#111111",
        "@media (max-width: 767px)": {
            width: "16%"
        },
    },
    orderSuccessfully: {
        padding: "25px 0",
        borderBottom: "1px solid #d7d0d0",
    }
}))


let db = firebase.firestore();

const CheckoutPage = () => {
    const user = useSelector(state => state.user.current);
    const orderList = useSelector(state => state.cart.cartList);
    const total = useSelector(state => state.cart.totalPrice);
    const classes = useStyles();
    const [clientInfo, setClientInfo] = useState(user);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirm, setOrderConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleNext = (values, checkValue) => {
        setClientInfo(
            {
                ...values,
                paymentMethod: checkValue
            }
        );
        setOrderSummary(true);
    }

    const handleBackToForm = () => {
        setOrderSummary(false);
    }
    const numberFormat = (value) => {
        return value.toString().padStart(2, 0);
    }
    const handleConfirm = () => {
        let d = new Date();
        setLoading(true);
        (async () => {
            try {
                let purchaseHistory = db.collection(`users/${user.userId}/purchaseHistory`).doc();
                purchaseHistory.set({
                    id: purchaseHistory.id,
                    name: clientInfo.userName,
                    phoneNumber: clientInfo.phoneNumber,
                    address: clientInfo.address,
                    cartList: orderList,
                    total: total.toFixed(2),
                    createdAt: `${numberFormat(d.getMonth() + 1)}/${numberFormat(d.getDate())}/${d.getFullYear()}  at  ${numberFormat(d.getHours())}:${numberFormat(d.getMinutes())}`,
                    date: firebase.firestore.FieldValue.serverTimestamp()
                });
                setOrderConfirm(true);
                dispatch(removeAllCart());
                localStorage.removeItem("cart");
            }
            catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        })();
    }

    const firstUpperLetter = (string) => {
        let convertToArray = string.toLowerCase().split(' ');
        let upperFirstLetter = convertToArray.map(item => `${item.charAt(0).toUpperCase()}${item.slice(1)}`);
        return upperFirstLetter.join(' ');
    }
    return (
        <Box className="container" style={{ marginTop: "50px" }}>
            <Box className={classes.formcheckout}>
                <Typography component="h3" variant="h5" className={classes.title}>
                    Checkout
                </Typography>
                <Box className={classes.checkoutstatus}>
                    <Box className={classes.shippingInfo}>
                        <Box className="numberprogress active">
                            <Typography>
                                {orderSummary ? <CheckIcon style={{ fontSize: "12px", fontWeight: "bolder" }}></CheckIcon> : 1}
                            </Typography>
                        </Box>
                        <Typography className="textprogress active">Shipping address</Typography>
                    </Box>
                    <Box className={classes.line}></Box>
                    <Box className={classes.paymentDetail}>
                        <Box className={orderSummary ? "numberprogress active" : "numberprogress"}>
                            <Typography>
                                {orderConfirm ? <CheckIcon style={{ fontSize: "12px", fontWeight: "bolder" }}></CheckIcon> : 2}
                            </Typography>
                        </Box>
                        <Typography className={orderSummary ? "textprogress active" : "textprogress"} >Payment Detail</Typography>
                    </Box>
                </Box>
                {(orderSummary === false && orderConfirm === false) &&
                    <CheckoutForm
                        clientInfo={clientInfo}
                        onNext={handleNext}
                    />}

                {(orderSummary && orderConfirm === false) &&
                    <OrderSummary
                        clientInfo={clientInfo}
                        onReceiveBackToForm={handleBackToForm}
                        onReceiveConfirm={handleConfirm}
                        loading={loading}
                    />}

                {orderConfirm &&
                    <Box >
                        <Typography className={classes.orderSuccessfully} style={{ textAlign: "center" }}>
                            Thank for your purchase, {firstUpperLetter(clientInfo.userName)}!
                        </Typography>
                        <Button variant="contained" onClick={handleBackToForm} style={{ marginTop: "25px" }}>
                            <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>Back to home</Link>
                        </Button>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default CheckoutPage;