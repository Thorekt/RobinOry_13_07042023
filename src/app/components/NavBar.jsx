import React from 'react';
import logo from '../img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectProfile } from '../selectors';
import { logout } from '../features/auth';

export default function NavBar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectAuth);
  const { profileData } = useSelector(selectProfile);

  function handleLogout() {
    dispatch(logout());
  }

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
        {isLoggedIn && profileData != null ? (
          <React.Fragment>
            <Link className='main-nav-item' to='/profile'>
              <i className='fa fa-user-circle'></i>
              {profileData.firstName}
            </Link>
            <Link className='main-nav-item' to='/' onClick={handleLogout}>
              <i className='fa fa-sign-out'></i>
              Sign Out
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link className='main-nav-item' to='/login'>
              <i className='fa fa-user-circle'></i>
              Sign In
            </Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
}
