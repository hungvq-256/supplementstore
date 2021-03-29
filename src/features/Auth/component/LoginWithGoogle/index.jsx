import React from 'react';
import firebase from "firebase/app";
import fire from "../../../../firebase";
import "firebase/auth";
import { useDispatch } from 'react-redux';
import { googleSignup } from '../../../../actions/user';
import googleIcon from "../../../../assets/img/google-icon.svg";

const LoginWithGoogle = () => {
    const dispatch = useDispatch();
    const onSubmit = () => {
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
                    photoUrl: user.photoURL,
                    email: user.email,
                    phone: user.phoneNumber,
                    token: token
                }
                localStorage.setItem("user", JSON.stringify(userInfo));
                dispatch(googleSignup(userInfo));
            }).catch((error) => {
                console.log(error)
            });
        // firebase.auth().signInWithRedirect(provider);
        // firebase.auth()
        //     .getRedirectResult()
        //     .then((result) => {
        //         if (result.credential) {
        //             /** @type {firebase.auth.OAuthCredential} */
        //             var credential = result.credential;

        //             // This gives you a Google Access Token. You can use it to access the Google API.
        //             var token = credential.accessToken;
        //             // ...
        //             localStorage.setItem("user", JSON.stringify(result.user));

        //         }
        //         // The signed-in user info.
        //         var user = result.user;
        //         console.log(user);
        //         let userInfo = {
        //             userId: user.uid,
        //             userName: user.displayName,
        //             photoUrl: user.photoURL,
        //             email: user.email,
        //             phone: user.phoneNumber,
        //             token: token
        //         }
        //         localStorage.setItem("user", JSON.stringify(userInfo));
        //         dispatch(googleSignup(userInfo));
        //     }).catch((error) => {
        //         console.log(error);
        //     });
    }
    return (
        <div style={{ padding: "10px 0", cursor: "pointer" }}>
            <div onClick={onSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i style={{ display: "block", width: "20px", marginRight: "5px" }}>
                    <img src={googleIcon} alt="google icon" />
                </i>
                <p style={{ fontFamily: "Poppins" }}>Login with Google</p>
            </div>
        </div>
    );
};

export default LoginWithGoogle;