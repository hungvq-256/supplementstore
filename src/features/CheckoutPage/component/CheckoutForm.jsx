import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControlLabel, makeStyles, Radio, RadioGroup, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import * as yup from "yup";
import InputField from '../../../components/form-control/InputField';

CheckoutForm.propTypes = {
    clientInfo: PropTypes.object,
}
CheckoutForm.defaultProps = {
    clientInfo: {},
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        marginTop: "100px"
    },
    title: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 1, 0)
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

    flexfield: {
        display: "flex",
        justifyContent: "space-between"
    },
    paymentMethod: {
        padding: "10px 0 0",
        fontSize: "16px",
        fontWeight: "600"
    }
}));



function CheckoutForm(props) {
    const { onNext, clientInfo } = props;
    const classes = useStyles();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    // const user = useSelector(state => state.user.current);
    const [radioCheck, setRadioCheck] = useState("COD");

    const handleRadioChange = (e) => {
        setRadioCheck(e.target.value);
    }
    const schema = yup.object().shape({
        userName: yup.string().required("Please enter your full name")
            .test("should at least two words", "Full name must contain at least two words", (value) =>
                value.split(' ').length >= 2),
        email: yup.string().required("Please enter your email").email("Please enter a valid email"),
        address: yup.string().required("Please enter your address"),
        phoneNumber: yup.string().required("Please enter your phone number").matches(phoneRegExp, 'Phone number is not valid')
            .min(10, 'Phone number must be at least 10 digits')
    });
    const form = useForm({
        defaultValues: {
            userName: clientInfo.userName || '',
            email: clientInfo.email || '',
            address: clientInfo.address || '',
            phoneNumber: clientInfo.phoneNumber || '',
        },
        resolver: yupResolver(schema)
    });
    const handleSubmit = (values) => {
        onNext(values, radioCheck);
    };
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="userName" label="Full Name" form={form} fullWidth />
            <InputField name="email" label="Email" form={form} fullWidth />
            <InputField name="phoneNumber" label="Phone Number" form={form} fullWidth />
            <InputField name="address" label="Address" form={form} fullWidth />
            <Typography className={classes.paymentMethod}>Payment Method:</Typography>
            <RadioGroup onChange={handleRadioChange} row aria-label="position" name="paymentMethod" defaultValue="COD">
                <FormControlLabel
                    value="COD"
                    control={<Radio color="primary" />}
                    label="COD"
                // labelPlacement="COD"
                />
                <FormControlLabel
                    value="Others"
                    control={<Radio color="primary" />}
                    label="Others"
                // labelPlacement="Others"
                />
            </RadioGroup>
            <Box className={classes.buttongroup}>
                <Button variant="contained"><Link className={classes.backbtn} to="/cart">Back to cart</Link></Button>
                <Button
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    color="primary" mt={2}>
                    Next
            </Button>
            </Box>
        </form>
    );
};

export default CheckoutForm;