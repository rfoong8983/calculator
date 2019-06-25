import React from 'react';
import Calculator from './components/calculator/calculator';
import './stylesheets/App.css';
import logo from './logo.png'

function App() {
  return (
    <div className="calculator__container">
      <div className="calculator__logoWrapper">
        <div><p className="calculator__logoDescr">TI-80-poor</p></div>
        <div className="calculator__logo">
          <img height="15px" src={logo} alt="CA" /><p className="calculator__logoDescr">California Instruments</p>
        </div>
      </div>
      
      <Calculator />
    </div>
  );
}

export default App;
