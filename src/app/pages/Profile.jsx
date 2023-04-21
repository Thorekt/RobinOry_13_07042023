import React from 'react';
import Account from '../components/Account';
import { useSelector } from 'react-redux';
import { selectAuth, selectProfile } from '../selectors';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { profileData } = useSelector(selectProfile);
  const { isLoggedIn } = useSelector(selectAuth);

  if (!isLoggedIn) {
    return <Navigate to='/login' replace={true} />;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName } = profileData;
  return (
    <main className='main bg-dark'>
      <div className='header'>
        <h1>
          Welcome back
          <br />
          {`${firstName} ${lastName}!`}
        </h1>
        <button className='edit-button'>Edit Name</button>
      </div>
      <h2 className='sr-only'>Accounts</h2>
      <Account title='Argent Bank Checking (x8349)' amount='$2,082.79' />
      <Account title='Argent Bank Savings (x6712)' amount='$10,928.42' />
      <Account title='Argent Bank Credit Card (x8349)' amount='$184.30' />
    </main>
  );
}
