import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import lgLogo from '../../access/images/lg-logo.svg';
import smLogo from '../../access/images/sm-logo.svg';
import Search from '../../Common/Search';

const Header = () => {
    return (
        <div className="Header">
            <Link to="/" className="Header-logo">
                <picture>
                    <source media="(min-width: 650px)" srcSet={lgLogo} />
                        <img src={smLogo} alt="logo" />
                </picture>
            </Link>
            <Search />
        </div>
    )
};

export default Header;