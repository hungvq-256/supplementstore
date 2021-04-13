import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { initialLoadCart } from './actions/cart';
import { updateLoadingAvatar, updateUserInfo } from './actions/user';
import ScrollToTop from './components/ScrollToTop';
import AdminPage from './features/AdminPage';
import CheckoutPage from './features/CheckoutPage';
import MainPages from './pages';
import firebase from "firebase/app";
import './scss/style.scss';
require("firebase/firestore");

let db = firebase.firestore();
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let initialCart = localStorage.getItem("cart");
    if (initialCart !== null) {
      let action = initialLoadCart(JSON.parse(initialCart));
      dispatch(action);
    }
    if (localStorage.getItem("user") !== null) {
      let updateUserFromDatabase = () => async dispatch => {
        let getUserFormLocalStorage = JSON.parse(localStorage.getItem("user"));
        let fetchUser = await db.collection("users").doc(`${getUserFormLocalStorage.userId}`).get();
        localStorage.setItem("user", JSON.stringify(fetchUser.data()));
        dispatch(updateUserInfo(fetchUser.data()));
      }
      dispatch(updateUserFromDatabase());
    }
    else {
      dispatch(updateLoadingAvatar(false));
    }
  }, [dispatch]);
  return (
    <div className="App">
      <ScrollToTop />
      <Switch>
        <Route path="/admin" component={AdminPage} ></Route>
        <Route path="/checkout" component={CheckoutPage} exact></Route>
        <Route path="/" component={MainPages} ></Route>
      </Switch>
    </div>
  );
}
export default App;
