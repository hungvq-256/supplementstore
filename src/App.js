import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { initialLoadCart } from './actions/cart';
import AdminPage from './features/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import MainPages from './pages';
import './scss/style.scss';
import CheckoutPage from './features/CheckoutPage';
import { googleSignup } from './actions/user';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let initialCart = localStorage.getItem("cart");
    if (initialCart !== null) {
      let action = initialLoadCart(JSON.parse(initialCart));
      dispatch(action);
    }
    if (localStorage.getItem("user") !== null) {
      dispatch(googleSignup(JSON.parse(localStorage.getItem("user"))))
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
