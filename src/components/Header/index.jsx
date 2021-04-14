import { CircularProgress, Menu, MenuItem, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../actions/user';
import Supplement from '../../assets/img/supplement-logo.png';
import FormDialog from '../../features/Auth/component/FormDialog';
import firebase from "firebase/app";
import { withSnackbar } from 'notistack';
import "./style.scss";

const Header = ({ enqueueSnackbar }) => {
    const [isClose, setIsClose] = useState(true);
    const numberOfItem = useSelector(state => state.cart.numberOfItem)
    const [header, setHeader] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    // const [preValue, setPreValue] = useState(0);
    // const [showNav, setShowNav] = useState(true);

    const user = useSelector(state => state.user.current);
    const loadingAvatar = useSelector(state => state.user.loadingAvatar);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
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
        firebase.auth().signOut().then(() => {
            localStorage.removeItem("user");
            dispatch(logout());
            setAnchorEl(null);
            setOpen(false);
            enqueueSnackbar("Logout successful", {
                variant: "success",
            });
        }).catch((error) => {
            enqueueSnackbar(error.message, {
                variant: "warning",
            });
        });
    };
    const handleDirectToAccount = () => {
        history.push("/account");
        setAnchorEl(null);
    };
    useEffect(() => {
        window.addEventListener('scroll', changeBackgroundHd);
        return () => {
            window.removeEventListener('scroll', changeBackgroundHd);
        };
    }, []);
    // useEffect(() => {
    //     setPhotoUrl(user.photoUrl);
    // }, [user]);
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
                                <NavLink activeClassName='active' to={`/products`}><li>Products</li></NavLink>
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
                        {loadingAvatar ?
                            <div className="loadingavatar">
                                <CircularProgress size={18} style={{ color: "#ffffff" }} />
                            </div>
                            :
                            (user.userName
                                ?
                                (user.photoUrl ?
                                    <div onClick={handleOpenAccount} className="useravatar">
                                        <img src={user.photoUrl} alt="avatar" />
                                    </div>
                                    :
                                    <div className="userIcon" onClick={handleOpenAccount}>
                                        <p>{user.userName.charAt(0)}</p>
                                    </div>
                                )
                                :
                                <i onClick={handleClickOpen}>
                                    <PersonIcon className='adminicon' />
                                </i>
                            )
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
            {!user.userName && <FormDialog open={open} onReceiveCloseState={onReceiveCloseState} />}
            <Menu
                anchorEl={anchorEl}
                // keepMounted
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
                    onClick={handleDirectToAccount}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    My Account
                </MenuItem>
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

export default withSnackbar(Header);