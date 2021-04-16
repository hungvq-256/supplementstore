import firebase from "firebase/app";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./style.scss";
import { withSnackbar } from 'notistack';
import { timeSince } from "./timeSince";
import ReviewWithoutLogin from "./ReviewWithoutLogin";
import { LinearProgress } from "@material-ui/core";
import hacker from "../../../../assets/img/hacker.png";
require("firebase/firestore");

let db = firebase.firestore();
const ClientReview = ({ enqueueSnackbar, productInfo }) => {
    const { id } = useParams();
    const [textAreaValue, setTextAreaValue] = useState('');
    const [listReview, setListReview] = useState([]);
    const [submit, setSubmit] = useState({
        state: false,
        loading: true
    })
    const userInfo = useSelector(state => state.user.current);

    const handleChangeTextArea = (e) => {
        setTextAreaValue(e.target.value);
    }
    const numberFormat = (value) => {
        return value.toString().padStart(2, 0);
    }
    const upperCaseFirstLetter = (string) => {
        let convertToArray = string.toLowerCase().split(' ');
        let upperFirstLetter = convertToArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return upperFirstLetter.join(' ');
    }

    const handleSubmitReview = (e) => {
        e.preventDefault();
        let d = new Date();
        if (userInfo.userName && textAreaValue) {
            (async () => {
                try {
                    let ReviewDocRef = db.collection(`/ClientReview/uMXLd65LBex20ScoUzqg/product-${id}`).doc();
                    await ReviewDocRef.set({
                        id: ReviewDocRef.id,
                        userId: userInfo.userId,
                        email: userInfo.email,
                        comment: textAreaValue,
                        createdAt: `${numberFormat(d.getMonth() + 1)}/${numberFormat(d.getDate())}/${d.getFullYear()}  at  ${numberFormat(d.getHours())}:${numberFormat(d.getMinutes())}`,
                        date: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    let userRef = db.collection(`users/${userInfo.userId}/review`).doc(ReviewDocRef.id);
                    await userRef.set({
                        id: ReviewDocRef.id,
                        product: id,
                        title: productInfo.title,
                        type: productInfo.type,
                        comment: textAreaValue,
                    })
                    setSubmit(prevalue => ({
                        ...prevalue,
                        state: !prevalue.state,
                    }));
                    setTextAreaValue('');
                    enqueueSnackbar("Submitted Successfully", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                    });
                }
                catch (error) {
                    console.error("Error writing document: ", error);
                }
            })()
        } else {
            if (!userInfo.userName) {
                enqueueSnackbar("Please login before leave the review", {
                    variant: "warning",
                });
            } else {
                enqueueSnackbar("Please type something before submit", {
                    variant: "warning",
                });
            }
        }
    }
    const onSubmitReviewWithoutLogin = (values) => {
        let d = new Date();
        if (values.comment) {
            (async () => {
                try {
                    await db.collection(`/ClientReview/uMXLd65LBex20ScoUzqg/product-${id}`).doc().set({
                        userName: upperCaseFirstLetter(values.fullName),
                        email: values.email,
                        comment: values.comment,
                        createdAt: `${numberFormat(d.getMonth() + 1)}/${numberFormat(d.getDate())}/${d.getFullYear()}  at  ${numberFormat(d.getHours())}:${numberFormat(d.getMinutes())}`,
                        date: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    setSubmit(prevalue => ({
                        ...prevalue,
                        state: !prevalue.state,
                    }));
                    enqueueSnackbar("Submitted Successfully", {
                        variant: "success",
                    });
                }
                catch (error) {
                    console.error("Error writing document: ", error);
                }
            })()
        } else {
            enqueueSnackbar("Please type something before submit", {
                variant: "warning",
            });
        }
    }
    useEffect(() => {
        setSubmit(prevalue => ({
            ...prevalue,
            loading: true
        }));
        (async () => {
            try {
                let fetchCollectionReview = await db.collection(`/ClientReview/uMXLd65LBex20ScoUzqg/product-${id}`).get();
                let fetchListUsers = await db.collection("users").get();
                let listReview = fetchCollectionReview.docs.map(doc => doc.data());
                let users = fetchListUsers.docs.map(doc => doc.data());

                let updateUserInfoForReview = listReview.map(review => {
                    if (!!review.userId) {
                        let user = users.find(user => user.userId === review.userId);
                        return {
                            ...review,
                            userName: user.userName,
                            photoUrl: user.photoUrl
                        }
                    }
                    return review
                })
                let sortResult = updateUserInfoForReview.sort(function (a, b) {
                    return (b.date.seconds) - (a.date.seconds);
                });
                setListReview(sortResult);
            }
            catch (error) {
                console.error("Error writing document: ", error);
            }
            setSubmit(prevalue => ({
                ...prevalue,
                loading: false
            }));
        })()
    }, [id, submit.state]);

    return (
        <div className="container --reviewSection">
            <div className="reviewWrap">
                {submit.loading ? <LinearProgress style={{ marginBottom: "50px" }} /> :
                    <div className="reviewField">
                        {listReview.length !== 0 ? listReview.map((item, index) =>
                        (
                            <div className="reviewItem" key={index}>
                                <div className="reviewItem__avatar">
                                    {item.photoUrl ?
                                        <div className="reviewItem__avatar-img">
                                            <img src={item.photoUrl} onError={(e) => { e.target.onerror = null; e.target.src = hacker }} alt="avatar" />
                                        </div>
                                        :
                                        <div className="reviewItem__avatar-text">
                                            <p>{item.userName.split(' ')[0].charAt(0)}</p>
                                        </div>
                                    }
                                </div>
                                <div className="reviewItem__textbox">
                                    <div className="userNameWrap">
                                        <h3>{item.userName}</h3>
                                        <p>{timeSince(new Date(Date.now() - (Date.parse(new Date()) + 1000 - ((item.date.seconds) * 1000))))} ago</p>
                                    </div>
                                    <p>{item.comment}</p>
                                    <p>{item.createdAt}</p>
                                </div>
                            </div>
                        )) : <p className="emptytext">Leave the first review for the product</p>}
                    </div>
                }
                {!!userInfo.userName
                    ?
                    <div className="textField">
                        <form onSubmit={handleSubmitReview}>
                            <textarea
                                onChange={handleChangeTextArea}
                                name="review"
                                value={textAreaValue}
                            >
                            </textarea>
                            <button type="submit" className="sendreviewbtn">Send Review</button>
                        </form>
                    </div>
                    :
                    <ReviewWithoutLogin onSubmitReviewWithoutLogin={onSubmitReviewWithoutLogin} />
                }
            </div>
        </div>
    );
};

export default withSnackbar(ClientReview);