import React from 'react';
import './app/styles/main.css';
import Footer from './app/components/Footer';
import NavBar from './app/components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './app/pages/Home';
import Login from './app/pages/Login';
import Profile from './app/pages/Profile';

function App() {
  return (
    <Router>
      <NavBar />
      <main className='App'>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
