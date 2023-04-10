import React from 'react';
import logo from '../img/argentBankLogo.png';
import { Link } from 'react-router-dom';

export default function NavBar() {
  //TODO: Replace the <a> tags with <Link> tags from react-router-dom
  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/'>
        <img
          className='main-nav-logo-image'
          src={logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div>
        <Link className='main-nav-item' to='/profile'>
          <i className='fa fa-user-circle'></i>
          Tony
        </Link>
        <Link className='main-nav-item' to='/'>
          <i className='fa fa-sign-out'></i>
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
