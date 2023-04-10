import React from 'react';
import './app/styles/main.css';
import Footer from './app/components/Footer';
import NavBar from './app/components/NavBar';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className='App'>
        <Footer />
      </main>
    </React.Fragment>
  );
}

export default App;
