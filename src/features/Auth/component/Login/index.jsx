import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import firebase from "firebase/app";
// import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import InputField from '../../../../components/form-control/InputField';
import PasswordField from '../../../../components/form-control/PasswordField';
import { withSnackbar } from 'notistack';
import { requestSignupAction } from "../../../../actions/user";
require("firebase/firestore");

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

let db = firebase.firestore();
const Login = ({ enqueueSnackbar }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
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
        (async () => {
            setLoading(true);
            try {
                let result = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
                let user = result.user;
                setUserId(user.uid);
            }
            catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "warning",
                });
                setLoading(false);
            }
        })()
    }
    useEffect(() => {
        const fetchUserInfoFromDataBase = () => async dispatch => {
            try {
                let fetchUser = await db.collection("users").doc(`${userId}`).get();
                let user = fetchUser.data();
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(requestSignupAction(user));
                enqueueSnackbar("Login Successful", {
                    variant: "success",
                });
            }
            catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
        if (userId) {
            dispatch(fetchUserInfoFromDataBase());
        }
    }, [userId, dispatch, enqueueSnackbar])
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
                    {loading ? <CircularProgress size={25} style={{ color: "#ffffff" }} /> : "LOGIN"}
                </Button>
            </form>
        </div>
    );
};

export default withSnackbar(Login);