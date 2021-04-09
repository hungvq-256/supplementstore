import React, { useState } from 'react';
import { useHistory } from 'react-router';
import "./style.scss";
const AccountCategories = () => {
    const history = useHistory();
    const [active, setActive] = useState(0);
    const handleSwitchCategories = (slug, index) => {
        history.push(`/${slug}`)
        setActive(index);
    }
    return (
        <>
            <ul className="usercategories">
                <li
                    onClick={() => { handleSwitchCategories("account", 0) }}
                    className={active === 0 ? "active" : ""}
                >
                    My Account
                </li>
                <li
                    onClick={() => { handleSwitchCategories("account/purchase-history", 1) }}
                    className={active === 1 ? "active" : ""}
                >
                    Purchase History
                </li>
            </ul>
        </>
    );
};

export default AccountCategories;