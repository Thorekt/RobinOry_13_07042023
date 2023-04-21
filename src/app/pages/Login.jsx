import React from 'react';
import { login } from '../features/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../selectors';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectAuth);

  if (isLoggedIn) {
    return <Navigate to='/profile' replace={true} />;
  }

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    dispatch(login(email, password));
  }

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <div className='input-remember'>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button className='sign-in-button'>Sign In</button>
        </form>
      </section>
    </main>
  );
}
