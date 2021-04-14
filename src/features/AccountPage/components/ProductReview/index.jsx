import React, { useEffect } from 'react';
import firebase from "firebase/app";
require("firebase/firestore");

let db = firebase.firestore();
const ProductReview = () => {
    useEffect(() => {
        (async () => {
            let getListProductReview = await db.collection("/ClientReview").get();
            // let generateListProductReview = getListProductReview.map(item => item.data());
            console.log(getListProductReview.data());
        })();
    }, [])
    return (
        <div>

        </div>
    );
};

export default ProductReview;