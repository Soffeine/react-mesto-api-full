import React from 'react';
import logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header({ email, linkName, link, onSignOut}) {
  
    return(
      <header className="header">
        <img src={logo} className="header__logo" alt="Логотип Место" />
        <div className='header__links-container'>
        <p className="header__link">{email}</p>
        <Link to={link} className="header__link" onClick={onSignOut}>
          {linkName}
        </Link>
        </div>
      </header>
    )
}

export default Header