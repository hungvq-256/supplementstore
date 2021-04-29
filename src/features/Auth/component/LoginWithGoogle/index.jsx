import React from 'react';
import firebase from "firebase/app";
import fire from "../../../../fire";
import "firebase/auth";
import { useDispatch } from 'react-redux';
import { googleSignup } from '../../../../actions/user';
import googleIcon from "../../../../assets/img/google-icon.svg";
import { withSnackbar } from 'notistack';
require("firebase/firestore");

let db = firebase.firestore();
const LoginWithGoogle = ({ enqueueSnackbar }) => {
    const dispatch = useDispatch();
    const onLogin = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        (async () => {
            try {
                let userFromGoogle = await fire.auth().signInWithPopup(provider);
                let user = userFromGoogle.user;
                let userFromDatabase = await db.collection("users").doc(user.uid).get();
                if (userFromDatabase.exists) {
                    let user = userFromDatabase.data();
                    localStorage.setItem("user", JSON.stringify(user));
                    dispatch(googleSignup(user));
                    enqueueSnackbar("Login Successful", {
                        variant: "success",
                    });
                }
                else {
                    let userInfo = {
                        userId: user.uid,
                        userName: user.displayName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        address: null
                    }
                    await db.collection("users").doc(user.uid).set(userInfo);
                    localStorage.setItem("user", JSON.stringify(userInfo));
                    dispatch(googleSignup(userInfo));
                    enqueueSnackbar("Login Successful", {
                        variant: "success",
                    });
                }

            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "success",
                });
            }
        })()
    }
    return (
        <div style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>
            <div onClick={onLogin} style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                <i style={{ display: "flex", width: "20px", marginRight: "5px", alignItems: "center" }}>
                    <img src={googleIcon} alt="google icon" />
                </i>
                <p style={{ fontFamily: "Poppins" }}>Log in with Google</p>
            </div>
        </div>
    );
};

export default withSnackbar(LoginWithGoogle);