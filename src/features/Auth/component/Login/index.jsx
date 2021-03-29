import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
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

const Login = (props) => {
    const classes = useStyles();
    const schema = yup.object().shape({
        email: yup.string().required("Please enter your email")
            .email("Please enter a valid email"),
        password: yup.string().required("Please enter your password")
    })
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = (values) => {
        alert("This feature is not available right now, please sign in with your Google account")
    }
    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography component="h3" variant="h5" className={classes.title}>
                LOG IN
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="email" label="Email" form={form} fullWidth />
                <PasswordField name="password" label="Password" form={form} />
                <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth mt={2}>
                    LOG IN
                </Button>
            </form>
        </div>
    );
};

export default Login;