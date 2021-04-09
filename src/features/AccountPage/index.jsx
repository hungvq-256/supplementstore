import React from 'react';
import { Route, Switch } from 'react-router';
import AccountCategories from './components/AccountCategories';
import PurchaseHistory from './components/PurchaseHistory';
import UserInfo from './components/UserInfo';
const AccountPage = () => {
    return (
        <div className='container --accountpage' style={{ marginTop: "100px" }}>
            <div className="row">
                <div className="col-12 col-sm-3 accountcategories">
                    <AccountCategories />
                </div>
                <div className="col-12 col-sm-9 usercontent">
                    <Switch>
                        <Route path="/account/purchase-history" component={PurchaseHistory} />
                        <Route path="/account" component={UserInfo} />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;