import React from 'react';
import logo from '../img/argentBankLogo.png';

export default function NavBar() {
  //TODO: Replace the <a> tags with <Link> tags from react-router-dom
  return (
    <nav class='main-nav'>
      <a class='main-nav-logo' href='./index.html'>
        <img class='main-nav-logo-image' src={logo} alt='Argent Bank Logo' />
        <h1 class='sr-only'>Argent Bank</h1>
      </a>
      <div>
        <a class='main-nav-item' href='./user.html'>
          <i class='fa fa-user-circle'></i>
          Tony
        </a>
        <a class='main-nav-item' href='./index.html'>
          <i class='fa fa-sign-out'></i>
          Sign Out
        </a>
      </div>
    </nav>
  );
}
