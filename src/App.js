import React, { useEffect } from 'react';
import './app/styles/main.css';
import Footer from './app/components/Footer';
import NavBar from './app/components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './app/pages/Home';
import Login from './app/pages/Login';
import Profile from './app/pages/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, selectProfile } from './app/selectors';
import { fetchProfile, resetProfile } from './app/features/profile';
import { loginWithToken } from './app/features/auth';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn} = useSelector(selectAuth);
  const { profileData } = useSelector(selectProfile);

  useEffect(() => {
    console.log(sessionStorage.token);
    if(!isLoggedIn && sessionStorage.token !== undefined && sessionStorage.token !== null && sessionStorage.token !== ''){
      dispatch(loginWithToken(sessionStorage.token));
    }
    if (isLoggedIn && profileData === null) {
      dispatch(fetchProfile());
    }
    if (!isLoggedIn && profileData !== null) {
      dispatch(resetProfile());
    }
  });

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
