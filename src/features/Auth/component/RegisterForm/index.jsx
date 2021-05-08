import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
// import PropTypes from "prop-types";
import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from '../../../../components/form-control/InputField';
import PasswordField from '../../../../components/form-control/PasswordField';



const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main
    },
    title: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 1, 0)
    },
    submit: {
        margin: theme.spacing(1, 0, 0, 0),
    }
}));
// RegisterForm.propTypes = {
//     onSubmit: PropTypes.func,
// }
const RegisterForm = (props) => {
    const { onSubmit, onLoading } = props;
    const classes = useStyles();
    const schema = yup.object().shape({
        fullName: yup.string().required("Please enter your full name")
            .test("should has at least two words", "Please enter at least two words.", (value) =>
                value.split(' ').length >= 2),

        email: yup.string().required("Please enter your email")
            .email("Please enter a valid email"),
        password: yup.string().required("Please enter your password").min(6, "Please enter at least 6 characters"),
        retypePassword: yup.string().required("Please retype your password")
            .oneOf([yup.ref("password")], "Pasword does not match")

    })
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = (values) => {
        if (onSubmit) {
            onSubmit(values);
        }
    }
    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography component="h3" variant="h5" className={classes.title}>
                SIGN UP
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form} fullWidth />
                <InputField name="email" label="Email" form={form} fullWidth />
                <PasswordField name="password" label="Password" form={form} passwordId="1" />
                <PasswordField name="retypePassword" label="Retype Password" form={form} passwordId="2" />
                <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth mt={2}>
                    {onLoading ? <CircularProgress size={25} style={{ color: "#ffffff" }} /> : "Create an new account"}
                </Button>
            </form>
        </div>
    );
};

export default RegisterForm;