import { Menu, MenuItem, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../actions/user';
import Supplement from '../../assets/img/supplement-logo.png';
import FormDialog from '../../features/Auth/component/FormDialog';
import "./style.scss";

const Header = (props) => {
    const [isClose, setIsClose] = useState(true);
    const numberOfItem = useSelector(state => state.cart.numberOfItem)
    const [header, setHeader] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    // const [preValue, setPreValue] = useState(0);
    // const [showNav, setShowNav] = useState(true);

    const user = useSelector(state => state.user.current);
    const isLogin = !!user.userId;
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const onReceiveCloseState = () => {
        setOpen(false);
    };
    document.onclick = () => {
        setIsClose(true);
    };
    const handleBugerMenuClick = (e) => {
        e.stopPropagation();
        setIsClose(isClose => !isClose);
    };
    const changeBackgroundHd = () => {
        if (window.scrollY >= 80) {
            setHeader(true);
        } else {
            setHeader(false);
        }
    };


    const handleOpenAccount = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleCloseAccount = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(logout());
        setAnchorEl(null);
        setOpen(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackgroundHd);
        return () => {
            window.removeEventListener('scroll', changeBackgroundHd);
        };
    }, []);

    // useEffect(() => {
    //     const handleDisplayNav = () => {
    //         const currentValue = window.scrollY;
    //         setShowNav(preValue > currentValue);
    //         setPreValue(currentValue);
    //     }
    //     window.addEventListener('scroll', handleDisplayNav);
    //     return () => {
    //         window.removeEventListener('scroll', handleDisplayNav);
    //     };
    // }, [preValue, showNav]);
    // console.log(showNav);
    return (
        <>
            <header className={header || (pathname !== '/' && pathname !== '/contact' && pathname !== '/about')
                ? 'active' : ''}>
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            <Link to='/'><i><img src={Supplement} alt='supplement logo' /></i></Link>
                        </div>
                        <div className="nav">
                            <ul className={isClose ? "nav__list" : "nav__list active"}>
                                <NavLink activeClassName='active' to='/products/all'><li>Products</li></NavLink>
                                <NavLink activeClassName='active' to='/about'><li> About</li></NavLink>
                                <NavLink activeClassName='active' to='/contact'><li>Contact</li></NavLink>
                            </ul>
                            <div className={isClose ? "modal" : "modal active"}></div>
                        </div>
                    </div>
                    <div className="right">
                        <Link to='/search'>
                            <SearchIcon className='searchicon' />
                        </Link>
                        {!isLogin && <i onClick={handleClickOpen}>
                            <PersonIcon className='adminicon' />
                        </i>}
                        {isLogin &&
                            <div className="userIcon" onClick={handleOpenAccount}>
                                <p>{user.userName.charAt(0)}</p>
                            </div>
                        }
                        <i className='carticonwrap'>
                            <Link to="/cart">
                                <ShoppingCartRoundedIcon className='carticon' />
                                <div>{Number(numberOfItem) >= 100 ? '99+' : numberOfItem}</div>
                            </Link>
                        </i>
                        <div onClick={handleBugerMenuClick} className={isClose ? "navTrigger" : "navTrigger active"}>
                            <i></i><i></i><i></i>
                        </div>
                    </div>
                </div>
            </header>
            {!isLogin && <FormDialog open={open} onReceiveCloseState={onReceiveCloseState} />}
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseAccount}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
            >
                <Typography style={{ padding: "10px" }}>Hi, {user.userName}</Typography>
                <MenuItem
                    onClick={handleLogout}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    Log Out
                </MenuItem>
            </Menu>
        </>
    );
};

export default Header;