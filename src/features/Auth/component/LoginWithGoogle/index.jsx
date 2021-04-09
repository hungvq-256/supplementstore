import React from 'react';
import firebase from "firebase/app";
import fire from "../../../../fire";
import "firebase/auth";
import { useDispatch } from 'react-redux';
import { googleSignup } from '../../../../actions/user';
import googleIcon from "../../../../assets/img/google-icon.svg";
import { withSnackbar } from 'notistack';

const LoginWithGoogle = ({ enqueueSnackbar }) => {
    const dispatch = useDispatch();
    const onLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        fire.auth().signInWithPopup(provider)
            .then((result) => {
                // /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                var user = result.user;
                let userInfo = {
                    userId: user.uid,
                    userName: user.displayName,
                    email: user.email,
                    token: token
                }
                localStorage.setItem("user", JSON.stringify(userInfo));
                dispatch(googleSignup(userInfo));
                enqueueSnackbar("Login Successful", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            }).catch((error) => {
                console.log(error)
            });
    }
    return (
        <div style={{ padding: "10px 0", cursor: "pointer" }}>
            <div onClick={onLogin} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i style={{ display: "block", width: "20px", marginRight: "5px" }}>
                    <img src={googleIcon} alt="google icon" />
                </i>
                <p style={{ fontFamily: "Poppins" }}>Login with Google</p>
            </div>
        </div>
    );
};

export default withSnackbar(LoginWithGoogle);