import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { initialLoadCart } from './actions/cart';
import { updateLoadingAvatar, updateUserInfo } from './actions/user';
import ScrollToTop from './components/ScrollToTop';
// import AdminPage from './features/AdminPage';
// import CheckoutPage from './features/CheckoutPage';
import MainPages from './pages';
import firebase from "firebase/app";
import './scss/style.scss';
import Loading from './components/Loading';
require("firebase/firestore");

let db = firebase.firestore();
const AdminPage = lazy(() => import('./features/AdminPage'));
const CheckoutPage = lazy(() => import('./features/CheckoutPage'));
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
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/admin" component={AdminPage} ></Route>
          <Route path="/checkout" component={CheckoutPage} exact></Route>
          <Route path="/" component={MainPages} ></Route>
        </Switch>
      </Suspense>
    </div>
  );
}
export default App;
