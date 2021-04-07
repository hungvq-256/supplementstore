import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from '@material-ui/core';
// import PropTypes from "prop-types";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../../components/form-control/InputField";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "-25px"
    },
    form: {
        maxWidth: "400px",
        margin: "0 auto"
    },
    textField: {
        margin: "15px"
    },
    textarea: {
        width: "100%",
        height: "150px",
        fontSize: "1.6em",
        resize: "none",
        outline: "none",
        borderColor: "#cccccc",
        background: "#f5f5f5",
        borderRadius: "3px",
        marginTop: "20px"
    },
    sendreviewbtn: {
        width: "100%",
        maxWidth: "400px",
        height: "40px",
        margin: "0 auto",
        background: "#111111",
        border: "none",
        outline: "none",
        borderRadius: "3px",
        fontSize: "1.5em",
        fontFamily: "Poppins",
        fontWeight: "500",
        textAlign: "center",
        lineHeight: "40px",
        color: "#ffffff",
        cursor: "pointer",
        marginTop: "10px"
    }
}));
// ReviewWithoutLogin.propTypes = {
//     onSubmit: PropTypes.func,
// }
const ReviewWithoutLogin = (props) => {
    const { onSubmitReviewWithoutLogin } = props;
    const classes = useStyles();
    const [textValue, setTextValue] = useState('');
    const schema = yup.object().shape({
        fullName: yup.string().required("Please enter your full name")
            .test("should has at least two words", "Please enter at least two words.", (value) =>
                value.split(' ').length >= 2),

        email: yup.string().required("Please enter your email")
            .email("Please enter a valid email"),
    })
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = (values) => {
        if (onSubmitReviewWithoutLogin) {
            onSubmitReviewWithoutLogin({
                ...values,
                comment: textValue
            });
        }
        setTextValue('');
    }
    const handleChangeTextArea = (e) => {
        setTextValue(e.target.value);
    }
    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField className={classes.textField} name="fullName" label="Display Name" form={form} fullWidth />
                <InputField className={classes.textField} name="email" label="Email" form={form} fullWidth />
                <textarea className={classes.textarea} value={textValue} onChange={handleChangeTextArea}></textarea>
                <button type="submit" className={classes.sendreviewbtn} >
                    Sent Review
                </button>
            </form>
        </div>
    );
};

export default ReviewWithoutLogin;