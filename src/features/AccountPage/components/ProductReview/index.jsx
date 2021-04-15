import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import DeleteIcon from '@material-ui/icons/Delete';
import "./style.scss";
require("firebase/firestore");

let db = firebase.firestore();
let getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
const ProductReview = () => {
    const [listReview, setListReview] = useState([]);

    const findIndex = (array, id) => {
        let findItem = array.find(item => item.id === id);
        let index = array.indexOf(findItem);
        return index;
    };

    const handleDeleteReview = (productId, documentId) => {
        (async () => {
            try {
                let userId = getIdFromLocalStorage.userId;
                await db.collection(`/ClientReview/uMXLd65LBex20ScoUzqg/product-${productId}`).doc(documentId).delete();
                await db.collection(`/users/${userId}/review`).doc(documentId).delete();
                listReview.splice(findIndex(listReview, documentId), 1);
                setListReview([...listReview]);
            }
            catch (error) {
                console.log(error)
            }
        })()
    }
    useEffect(() => {
        (async () => {
            try {
                let userId = getIdFromLocalStorage.userId;
                let getListReview = await db.collection(`users/${userId}/review`).get();
                let generateListProductReview = getListReview.docs.map(item => item.data());
                setListReview(generateListProductReview);
            }
            catch (error) {
                console.log(error);
            }
        })();
    }, [])
    return (
        <div className="listreview">
            {listReview.map((item, index) => (
                <div className="listreview__item" key={index}>
                    <div className="textbox">
                        <span>{index + 1}.</span>
                        <p>{item.title}</p>
                        <p>Your review: {item.comment}</p>
                    </div>
                    <i><DeleteIcon onClick={() => { handleDeleteReview(item.product, item.id) }} /></i>
                </div>
            ))}
        </div>
    );
};

export default ProductReview;