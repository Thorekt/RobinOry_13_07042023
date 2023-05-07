import React, { useState } from 'react';
import Account from '../components/Account';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, selectProfile } from '../selectors';
import { Navigate } from 'react-router-dom';
import { editProfile } from '../features/profile';

const accounts = [
  {
    name: 'Argent Bank Checking (x8349)',
    amount: '2,082.79',
  },
  {
    name: 'Argent Bank Savings (x6712)',
    amount: '10,928.42',
  },
  {
    name: 'Argent Bank Credit Card (x8349)',
    amount: '184.30',
  },
]

export default function Profile() {
  document.title = 'Argent Bank - Profile';

  const { profileData } = useSelector(selectProfile);
  const { isLoggedIn } = useSelector(selectAuth);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    return <Navigate to='/login' replace={true} />;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleProfileEdit = (e) => {
    e.preventDefault();
    const firstName = e.target.elements['first-name'].value;
    const lastName = e.target.elements['last-name'].value;
    dispatch(editProfile(firstName, lastName));
    toggleEditMode();
  };

  const { firstName, lastName } = profileData;
  return (
    <main className='main bg-dark'>
      <div className='header'>
        {editMode ? (
          <React.Fragment>
            <h1>Welcome back</h1>
            <form className='edit-form' onSubmit={handleProfileEdit}>
              <fieldset>
                <div className='input-wrapper'>
                  <input type='text' id='first-name' placeholder={firstName} />
                </div>
                <div className='input-wrapper'>
                  <input type='text' id='last-name' placeholder={lastName} />
                </div>
              </fieldset>
              <fieldset>
                <button
                  type='submit'
                  className='edit-button'
                >
                  Save
                </button>
                <button
                  type='button'
                  className='edit-button'
                  onClick={toggleEditMode}
                >
                  cancel
                </button>
              </fieldset>
            </form>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {' '}
            <h1>
              Welcome back
              <br />
              {`${firstName} ${lastName}!`}
            </h1>
            <button className='edit-button' onClick={toggleEditMode}>
              Edit Name
            </button>
          </React.Fragment>
        )}
      </div>
      <h2 className='sr-only'>Accounts</h2>

      {accounts.map((account, index) => (        
        <Account title={account.name} amount={account.amount} key={index} />
      ))}
    </main>
  );
}
