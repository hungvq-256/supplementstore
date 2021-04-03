import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

OrderSummary.propTypes = {
    clientInfo: PropTypes.object,
};

OrderSummary.defaultProps = {
    clientInfo: {},
};

const useStyles = makeStyles((theme) => ({
    listOrderWrap: {
        maxHeight: "220px",
        overflow: "auto",
        '&::-webkit-scrollbar': {
            display: "none"
        },
        border: "1px solid #cac4c4",
        padding: "5px",
        borderRadius: "4px"
    },
    product: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "&:not(:last-child)": {
            borderBottom: "1px solid #d7d0d0",
            marginBottom: "10px",
            paddingBottom: "10px",
        }
    },
    productName: {
        fontSize: "15px",
        fontWeight: "600",
        lineHeight: "20px",
        fontFamily: "Poppins"
    },
    productSubText: {
        fontSize: "14px",
        padding: "2px 0 0",
        fontFamily: "Poppins"
    },
    productPrice: {
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "Poppins"
    },
    totalPrice: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(1, 0, 1, 0)
    },
    totalPriceItem: {
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "Poppins"
    },
    clientText: {
        fontSize: "14px",
        padding: "2px 0",
        fontFamily: "Poppins"
    },
    buttongroup: {
        display: "flex",
        justifyContent: "space-between",
        margin: theme.spacing(2, 0, 0, 0),
    },
}))
function OrderSummary({ clientInfo, onReceiveBackToForm, onReceiveConfirm }) {
    const classes = useStyles();
    let orderList = useSelector(state => state.cart.cartList);
    let total = useSelector(state => state.cart.totalPrice);
    let listOrder = orderList.map((item, index) => (
        < Box key={index} className={classes.product} >
            <Box className={classes.productInfo}>
                <Typography className={classes.productName}>{item.title}</Typography>
                {item.flavorChoosed && <Typography className={classes.productSubText} >Flavor: {item.flavorChoosed}</Typography>}
                <Typography className={classes.productSubText}>
                    Quantity: {item.quantity} x ${Number(item.price) % 1 !== 0 ? (item.price).toFixed(2) : `${item.price}.00`}
                </Typography>
            </Box>
            <Box className={classes.productPrice}>${Number(item.price) % 1 !== 0 ? (item.price * item.quantity).toFixed(2) : `${item.price * item.quantity}.00`}</Box>
        </Box >
    ))

    const firstUpperLetter = (string) => {
        let convertToArray = string.toLowerCase().split(' ');
        let upperFirstLetter = convertToArray.map(item => `${item.charAt(0).toUpperCase()}${item.slice(1)}`);
        return upperFirstLetter.join(' ');
    }
    const handleBackToForm = () => {
        onReceiveBackToForm();
    }
    const handleConfirm = () => {
        onReceiveConfirm()
    }
    return (
        <Box>
            <Box>
                <Typography style={{ padding: "10px 0", fontSize: "16px", fontFamily: "Poppins" }}>Order Summary</Typography>
                <Box className={classes.listOrderWrap}>
                    {listOrder}
                </Box>
                <Box className={classes.totalPrice}>
                    <Typography className={classes.totalPriceItem}>Total</Typography>
                    <Typography className={classes.totalPriceItem}>${total.toFixed(2)}</Typography>
                </Box>
            </Box>
            <Box className={classes.client}>
                <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography className={classes.clientText}>
                        Name: {firstUpperLetter(clientInfo.fullName)}
                    </Typography>
                    <Typography className={classes.clientText}>Phone: {clientInfo.phone}</Typography>
                </Box>
                <Typography className={classes.clientText}>Email: {clientInfo.email}</Typography>
                <Typography className={classes.clientText}>Address: {clientInfo.address}</Typography>
                <Typography className={classes.clientText}>Payment method: {clientInfo.paymentMethod}</Typography>
            </Box>
            <Box className={classes.buttongroup}>
                <Button variant="contained" onClick={handleBackToForm}>Back</Button>
                <Button
                    onClick={handleConfirm}
                    className={classes.submit}
                    variant="contained"
                    color="primary" mt={2}>
                    Confirm
            </Button>
            </Box>
        </Box>
    );
}

export default OrderSummary;