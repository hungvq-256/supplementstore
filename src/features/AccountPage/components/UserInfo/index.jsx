import { CircularProgress } from "@material-ui/core";
import firebase from "firebase/app";
import { withSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../../../actions/user';
import './style.scss';
require("firebase/firestore");

let db = firebase.firestore();
function UserInfo({ enqueueSnackbar }) {
    const [userInfo, setUserInfo] = useState({});
    const [inputValue, setInputValue] = useState(userInfo);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState({
        content: true,
        btn: false
    });
    const dispatch = useDispatch();
    const handleOnChange = (e) => {
        setInputValue(prevalue => ({
            ...prevalue,
            [e.target.name]: e.target.value
        }))
    }
    const handleEditUserInfo = () => {
        setEdit(true);
    }
    const handleSaveUserInfo = () => {
        const pushUserInfoToDatabase = () => async dispatch => {
            setLoading(prevalue => ({
                ...prevalue,
                btn: true
            }))
            try {
                await db.collection("users").doc(`${userInfo.userId}`).update(inputValue);
                let fetchUser = await db.collection("users").doc(`${userInfo.userId}`).get();
                let user = fetchUser.data();
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(updateUserInfo(user));
                setUserInfo(user);
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
    useEffect(() => {
        (async () => {
            try {
                let getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
                let fetchUserInfo = await db.collection("users").doc(`${getIdFromLocalStorage.userId}`).get();
                setUserInfo(fetchUserInfo.data());
                setInputValue(fetchUserInfo.data());
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
    }, [enqueueSnackbar]);

    return (
        <div className='userinfowrapper'>
            { loading.content ? <CircularProgress className="loadingpurchasehistory" size={50} style={{ color: "#cccccc" }} /> :
                <div className="userinfo">
                    <div className="userinfo__avatar">
                        <p>{userInfo.userName.charAt(0).toUpperCase()}</p>
                    </div>
                    <div className="userinfotextwrapper">
                        <div className="userinfotextbox">
                            <p className="infolabel">Name: </p>
                            {!edit ? <p>{userInfo.userName}</p> :
                                <input name="userName" onChange={handleOnChange} type="text" value={inputValue.userName} />
                            }
                        </div>
                        <div className="userinfotextbox">
                            <p className="infolabel">Email: </p>
                            {!edit ? <p>{userInfo.email}</p> :
                                <input name="email" onChange={handleOnChange} type="text" value={inputValue.email} />
                            }
                        </div>
                        <div className="userinfotextbox">
                            <p className="infolabel">Phone Number: </p>
                            {!edit ? <p>{userInfo.phoneNumber}</p> :
                                <input name="phoneNumber" onChange={handleOnChange} type="text" value={inputValue.phoneNumber || ''} />
                            }
                        </div>
                        <div className="userinfotextbox">
                            <p className="infolabel">Address: </p>
                            {!edit ? <p>{userInfo.address}</p> :
                                <input name="address" onChange={handleOnChange} type="text" value={inputValue.address || ''} />
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
        </div>

    );
}

export default withSnackbar(UserInfo);