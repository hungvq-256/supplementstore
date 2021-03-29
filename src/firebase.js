import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBPso7wyjF9nsFJ4PG-RmmLZEqkCiM1dVY",
    authDomain: "login-206e5.firebaseapp.com",
    projectId: "login-206e5",
    storageBucket: "login-206e5.appspot.com",
    messagingSenderId: "723599704152",
    appId: "1:723599704152:web:5bbec350a2baef36208a2d"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;