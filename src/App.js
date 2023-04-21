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
import { fetchOrUpdateProfile, resetProfile } from './app/features/profile';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector(selectAuth);
  const { profileData } = useSelector(selectProfile);

  useEffect(() => {
    if (isLoggedIn && profileData === null) {
      dispatch(fetchOrUpdateProfile(token));
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
