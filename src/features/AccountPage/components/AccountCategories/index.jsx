import React from 'react';
import { NavLink } from 'react-router-dom';
import "./style.scss";
const AccountCategories = () => {
    return (
        <>
            <ul className="usercategories">
                <NavLink to="/account" activeClassName="active" exact>
                    My Account
                </NavLink>
                <NavLink to="/account/purchase-history" activeClassName="active">
                    Purchase History
                </NavLink>
                <NavLink to="/account/product-review" activeClassName="active">
                    Product Review
                </NavLink>
            </ul>
        </>
    );
};

export default AccountCategories;