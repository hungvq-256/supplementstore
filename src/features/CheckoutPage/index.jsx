import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { removeAllCart } from '../../actions/cart.js';
import CheckoutForm from './component/CheckoutForm.jsx';
import OrderSummary from './component/OrderSummary.jsx';
import "./style.scss";

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
        maxHeight: "550px"
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


const CheckoutPage = () => {
    const classes = useStyles();
    const [clientInfo, setClientInfo] = useState({});
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirm, setOrderConfirm] = useState(false);
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
    const handleConfirm = () => {
        setOrderConfirm(true);
        let action = removeAllCart();
        dispatch(action);
        localStorage.removeItem("cart");
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
                    />}

                {orderConfirm &&
                    <Box >
                        <Typography className={classes.orderSuccessfully} style={{ textAlign: "center" }}>
                            Thank for your purchase, {firstUpperLetter(clientInfo.fullName)}!
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