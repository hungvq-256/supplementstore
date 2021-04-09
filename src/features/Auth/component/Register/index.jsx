import firebase from "firebase/app";
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { requestSignupAction } from "../../../../actions/user";
// import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
require("firebase/firestore");

let db = firebase.firestore();
function Register({ enqueueSnackbar }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleSubmit = (values) => {
        const handleSignUp = () => async dispatch => {
            setLoading(true);
            try {
                let result = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
                let user = result.user;
                await user.updateProfile({
                    displayName: values.fullName,
                })
                await db.collection("users").doc(`${user.uid}`).set({
                    userId: user.uid,
                    userName: user.displayName,
                    email: user.email,
                    address: null,
                    phoneNumber: null,
                    cart: null,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                })
                let userInfo = {
                    userId: user.uid,
                    userName: user.displayName,
                    email: user.email,
                    address: null,
                    phoneNumber: null,
                    cart: null
                }

                localStorage.setItem("user", JSON.stringify(userInfo));
                dispatch(requestSignupAction(userInfo));
                enqueueSnackbar("Signup Successful", {
                    variant: "success",
                });
            }
            catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "warning",
                });
            }
            setLoading(false);
        }
        dispatch(handleSignUp());
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} onLoading={loading} />
        </div>
    );
}

export default withSnackbar(Register);