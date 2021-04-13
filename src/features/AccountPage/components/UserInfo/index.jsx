import { CircularProgress } from "@material-ui/core";
import firebase from "firebase/app";
import { withSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../../../actions/user';
import UploadAvatar from "../UploadAvatar";
import './style.scss';

require("firebase/firestore");

let db = firebase.firestore();
function UserInfo({ enqueueSnackbar }) {
    const [value, setValue] = useState({
        user: {},
        input: {}
    })
    const { user, input } = value;
    const [edit, setEdit] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [loading, setLoading] = useState({
        content: true,
        btn: false
    });
    const dispatch = useDispatch();
    const handleOnChange = (e) => {
        setValue(prevalue => ({
            ...prevalue,
            input: {
                ...input,
                [e.target.name]: e.target.value
            }
        }))
    }
    const handleEditUserInfo = () => {
        setEdit(true);
    }
    const handleTogglePopup = () => {
        setOpenPopup(!openPopup);
    }
    const handleSaveUserInfo = () => {
        const pushUserInfoToDatabase = () => async dispatch => {
            setLoading(prevalue => ({
                ...prevalue,
                btn: true
            }))
            try {
                await db.collection("users").doc(`${user.userId}`).update(input);
                let fetchUser = await db.collection("users").doc(`${user.userId}`).get();
                localStorage.setItem("user", JSON.stringify(fetchUser.data()));
                dispatch(updateUserInfo(fetchUser.data()));
                setValue(prevalue => ({
                    ...prevalue,
                    user: fetchUser.data(),
                }));
                enqueueSnackbar("Update Info Successful", {
                    variant: "success",
                });
            }
            catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "warning",
                });
            }
            setEdit(false);
            setLoading(prevalue => ({
                ...prevalue,
                btn: false
            }))
        }
        dispatch(pushUserInfoToDatabase());
    }
    const handleChangeAvatar = (imgUrl) => {
        if (imgUrl) {
            (async () => {
                try {
                    await db.collection("users").doc(user.userId).update({
                        photoUrl: imgUrl
                    });
                    let fetchUserInfo = await db.collection("users").doc(user.userId).get();
                    localStorage.setItem("user", JSON.stringify(fetchUserInfo.data()));
                    setValue({
                        user: fetchUserInfo.data(),
                        input: fetchUserInfo.data()
                    })
                    dispatch(updateUserInfo(fetchUserInfo.data()));
                    enqueueSnackbar("Upload avatar successfully", {
                        variant: "success",
                    });
                }
                catch (error) {
                    enqueueSnackbar(error.message, {
                        variant: "warning",
                    });
                }
            })();
        }
    }
    useEffect(() => {
        (async () => {
            try {
                let getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
                let fetchUserInfo = await db.collection("users").doc(`${getIdFromLocalStorage.userId}`).get();
                setValue({
                    user: fetchUserInfo.data(),
                    input: fetchUserInfo.data()
                })
                dispatch(updateUserInfo(fetchUserInfo.data()));
            }
            catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "warning",
                });
            }
            setLoading(prevalue => ({
                ...prevalue,
                content: false
            }))
        })()
    }, [enqueueSnackbar, dispatch]);
    return (
        <div className='userinfowrapper'>
            { loading.content ? <CircularProgress className="loadingpurchasehistory" size={50} style={{ color: "#cccccc" }} /> :
                <div className="userinfo">
                    <div className="userinfo__avatar">
                        {user.photoUrl ?
                            <div className="userinfo__avatar-img" onClick={handleTogglePopup}>
                                <img src={user.photoUrl} alt="avatar" />
                            </div>
                            :
                            <div className="userinfo__avatar-text">
                                <p>{user.userName.charAt(0).toUpperCase()}</p>
                            </div>
                        }
                        <UploadAvatar onChangeAvatar={handleChangeAvatar} />
                        <div
                            className={openPopup ? "userinfo__avatar-popup active" : "userinfo__avatar-popup"}
                            onClick={handleTogglePopup}
                        >
                            <div className="imgwrapper">
                                <img src={user.photoUrl} alt="avatar popup" />
                            </div>
                            <div className="close">
                                <p>&#10006;</p>
                            </div>
                        </div>
                    </div>
                    <div className="userinfotextwrapper">
                        <div className="userinfotextbox">
                            <p className="infolabel">Name: </p>
                            {!edit ? <p>{user.userName}</p> :
                                <input name="userName" onChange={handleOnChange} type="text" value={input.userName} />
                            }
                        </div>
                        <div className="userinfotextbox">
                            <p className="infolabel">Email: </p>
                            {!edit ? <p>{user.email}</p> :
                                <input name="email" onChange={handleOnChange} type="text" value={input.email} />
                            }
                        </div>
                        <div className="userinfotextbox">
                            <p className="infolabel">Phone Number: </p>
                            {!edit ? <p>{user.phoneNumber}</p> :
                                <input name="phoneNumber" onChange={handleOnChange} type="text" value={input.phoneNumber || ''} />
                            }
                        </div>
                        <div className="userinfotextbox">
                            <p className="infolabel">Address: </p>
                            {!edit ? <p>{user.address}</p> :
                                <input name="address" onChange={handleOnChange} type="text" value={input.address || ''} />
                            }
                        </div>
                    </div>
                    {!edit
                        ?
                        <button onClick={handleEditUserInfo}>
                            <p>Edit</p>
                        </button>
                        : <button onClick={handleSaveUserInfo}>
                            {loading.btn ? <CircularProgress size={22} style={{ color: "#000000" }} /> : <p>Save</p>}
                        </button>}
                </div>
            }
            <div className={openPopup ? "modal active" : "modal"}></div>
        </div>

    );
}

export default withSnackbar(UserInfo);