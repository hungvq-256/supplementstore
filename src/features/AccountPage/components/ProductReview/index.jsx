import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import DeleteIcon from '@material-ui/icons/Delete';
import "./style.scss";
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router';
require("firebase/firestore");

let db = firebase.firestore();
let getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
const ProductReview = () => {
    const [listReview, setListReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const findIndex = (array, id) => {
        let findItem = array.find(item => item.id === id);
        let index = array.indexOf(findItem);
        if (index >= 0) {
            return index;
        }
    };

    const handleDeleteReview = (productId, documentId) => {
        if (window.confirm("Do you want to delete this review ?")) {
            let userId = getIdFromLocalStorage.userId;
            let deleteReview = db.collection(`/ClientReview/uMXLd65LBex20ScoUzqg/product-${productId}`).doc(documentId).delete();
            let deleteUserReview = db.collection(`/users/${userId}/review`).doc(documentId).delete();
            Promise.all([deleteReview, deleteUserReview])
                .then(() => {
                    listReview.splice(findIndex(listReview, documentId), 1);
                    setListReview([...listReview]);
                })
                .catch(error => console.error(error));
        }
    }
    const handleDirectToProduct = (productId, type) => {
        history.push(`/products/${type}/product-${productId}`)
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
            setLoading(false);
        })();
    }, []);
    return (
        <div className="listreview">
            {loading ?
                <div className="loadingreview">
                    <CircularProgress size={50} style={{ color: "#cccccc" }} />
                </div>
                :
                (!listReview.length
                    ?
                    <p className="emptytextreview">Maybe you have not left any reviews</p>
                    :
                    (
                        listReview.map((item, index) => (
                            <div className="listreview__item" key={index}>
                                <div className="textbox">
                                    <span>{index + 1}.</span>
                                    <p onClick={() => { handleDirectToProduct(item.product, item.type) }}>{item.title}</p>
                                    <p>Your review: {item.comment}</p>
                                </div>
                                <i><DeleteIcon onClick={() => { handleDeleteReview(item.product, item.id) }} /></i>
                            </div>
                        ))
                    )
                )}
        </div>
    );
};

export default ProductReview;