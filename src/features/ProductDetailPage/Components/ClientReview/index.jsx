import firebase from "firebase/app";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./style.scss";
import { withSnackbar } from 'notistack';
import { timeSince } from "./timeSince";
import ReviewWithoutLogin from "./ReviewWithoutLogin";
require("firebase/firestore");

const ClientReview = ({ enqueueSnackbar }) => {
    var db = firebase.firestore();
    const { id } = useParams();
    const [textAreaValue, setTextAreaValue] = useState('');
    const [listReview, setListReview] = useState([]);
    const [submit, setSubmit] = useState(false);
    const userInfo = useSelector(state => state.user.current);

    const handleChangeTextArea = (e) => {
        setTextAreaValue(e.target.value);
    }
    const numberFormat = (value) => {
        return value.toString().padStart(2, 0);
    }
    var d = new Date();

    const handleSubmitReview = (e) => {
        e.preventDefault();
        var d = new Date();
        if (userInfo.userName && textAreaValue) {
            (async () => {
                try {
                    await db.collection(`/ClientReview/uMXLd65LBex20ScoUzqg/product-${id}`).doc().set({
                        userName: userInfo.userName,
                        email: userInfo.email,
                        comment: textAreaValue,
                        createdAt: `${numberFormat(d.getMonth() + 1)}/${numberFormat(d.getDate())}/${d.getFullYear()}  at  ${numberFormat(d.getHours())}:${numberFormat(d.getMinutes())}`,
                        date: d
                    })
                    setSubmit(prevalue => !prevalue);
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
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            } else {
                enqueueSnackbar("Please type something before submit", {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            }
        }
    }

    const onSubmitReviewWithoutLogin = (values) => {
        if (!!values.comment) {
            (async () => {
                try {
                    await db.collection(`/ClientReview/uMXLd65LBex20ScoUzqg/product-${id}`).doc().set({
                        userName: values.fullName,
                        email: values.email,
                        comment: values.comment,
                        createdAt: `${numberFormat(d.getMonth() + 1)}/${numberFormat(d.getDate())}/${d.getFullYear()}  at  ${numberFormat(d.getHours())}:${numberFormat(d.getMinutes())}`,
                        date: d
                    })
                    setSubmit(prevalue => !prevalue);
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
            enqueueSnackbar("Please type something before submit", {
                variant: "warning",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        }
    }
    useEffect(() => {
        (async () => {
            try {
                let fetchCollectionReview = await db.collection(`/ClientReview/uMXLd65LBex20ScoUzqg/product-${id}`).get()
                let result = fetchCollectionReview.docs.map(doc => doc.data());
                let sortResult = result.sort(function (a, b) {
                    return (b.date.seconds) - (a.date.seconds);
                });
                setListReview(sortResult);
            }
            catch (error) {
                console.error("Error writing document: ", error);
            }
        })()
    }, [db, id, submit]);
    return (
        <div className="container --reviewSection">
            <div className="reviewWrap">
                <div className="reviewField">
                    {listReview.length !== 0 ? listReview.map((item, index) =>
                    (
                        <div className="reviewItem" key={index}>
                            <div className="reviewItem__avatar">
                                <div className="reviewItem__avatar-img">
                                    <p>{item.userName.split(' ')[0].charAt(0)}</p>
                                </div>
                            </div>
                            <div className="reviewItem__textbox">
                                <div className="userNameWrap">
                                    <h3>{item.userName}</h3>
                                    <p>{timeSince(new Date(Date.now() - (Date.parse(d) + 1000 - ((item.date.seconds) * 1000))))} ago</p>
                                </div>
                                <p>{item.comment}</p>
                                <p>{item.createdAt}</p>
                            </div>
                        </div>
                    )) : <p className="emptytext">Leave the first review for the product</p>}
                </div>
                {!!userInfo.userName ? <div className="textField">
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
                    <ReviewWithoutLogin onSubmitReviewWithoutLogin={onSubmitReviewWithoutLogin} />}
            </div>
        </div>
    );
};

export default withSnackbar(ClientReview);