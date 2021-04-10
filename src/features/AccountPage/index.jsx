import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AccountCategories from './components/AccountCategories';
import PurchaseHistory from './components/PurchaseHistory';
import UserInfo from './components/UserInfo';
const AccountPage = () => {
    const loggedIn = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {};
    let isLogin = !!loggedIn.userId;
    return (
        <div className='container --accountpage' style={{ marginTop: "100px" }}>
            <div className="row">
                <div className="col-12 col-sm-3 accountcategories">
                    <AccountCategories />
                </div>
                <div className="col-12 col-sm-9 usercontent">
                    <Switch>
                        <Route path="/account/purchase-history">
                            {isLogin ? <PurchaseHistory /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/account">
                            {isLogin ? <UserInfo /> : <Redirect to="/" />}
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;