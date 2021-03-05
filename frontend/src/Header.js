import React, { useState, useContext } from 'react'
import { GlobalState } from './GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.UserAPI.isLogged
    const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin
    const [cart] = state.UserAPI.cart

    const logout = async () => {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/";
    }

    const AdminRouter = () => {
        return (
            <>
                <Link to="/create_product"><span className="header__login">Create_Product</span></Link>
                <Link to="/create_category"><span className="header__login">Create_Category</span></Link>
                <Link to="/category"><span className="header__login">Categories</span></Link>
                <Link to="/" onClick={logout}><span className="header__login"><span className="header__login">logout</span></span></Link>
            </>
        )
    }

    const LoggedRouter = () => {
        return (
            <>
                <Link to="/history"><span className="header__login">History</span></Link>
                <Link to="/" onClick={logout}><span className="header__login">logout</span></Link>

                {
                    isAdmin ? ''
                    :<Link to="/Cart">
                    <div className="header__basket">
                        <ShoppingBasketIcon />
                        <span className="header__basketCount">{cart.length}</span>
                    </div>
                </Link>
                }
            </>
        )
    }

    const NotLogged = () => {
        return (
            <>
                <Link to="/Login"><span className="header__login">Sign In</span></Link>

                <Link to="/Cart">
                    <div className="header__basket">
                        <ShoppingBasketIcon />
                        <span className="header__basketCount">0</span>
                    </div>
                </Link>
            </>
        )
    }

    console.log(isAdmin)
    return (
        <div className="header">
            <Link to="/"><h2 className="header__brand">{isAdmin ? 'Admin' : 'Product'}</h2></Link>

            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>


            <div className="header__nav">
                {isAdmin && AdminRouter()}

                {!isAdmin && isLogged && LoggedRouter()}

                {!isAdmin && !isLogged && NotLogged()}

            </div>
        </div>
    )
}

export default Header
