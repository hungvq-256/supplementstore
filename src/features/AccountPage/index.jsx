import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import AccountCategories from './components/AccountCategories';
import ProductReview from './components/ProductReview';
import PurchaseHistory from './components/PurchaseHistory';
import UserInfo from './components/UserInfo';
import "./style.scss";

const AccountPage = () => {
    const loggedIn = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {};
    const userFromRedux = useSelector(state => state.user.current);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if (!!userFromRedux.userId) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [userFromRedux]);
    return (
        <div className='container --accountpage'>
            <div className="row">
                <div className="col-12 col-sm-3 accountcategories">
                    <AccountCategories />
                </div>
                <div className="col-12 col-sm-9">
                    <div className="usercontent">
                        <Switch>
                            <Route path="/account/purchase-history">
                                {!!loggedIn.userId || isLogin ? <PurchaseHistory /> : <Redirect to="/" />}
                            </Route>
                            <Route path="/account/product-review">
                                {!!loggedIn.userId || isLogin ? <ProductReview /> : <Redirect to="/" />}
                            </Route>
                            <Route path="/account">
                                {!!loggedIn.userId || isLogin ? <UserInfo /> : <Redirect to="/" />}
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;