import * as React from 'react';
import './Banner.css';
import logo from '../../data/metalogo.jpg';

export default function Banner({ clickable }) {
  // **********************************************************************
  // CONSTANTS & VARIABLES
  // **********************************************************************

  // renders logo based on if it can be clicked on
  const makeLogo = () => {
    if (clickable) {
      return (
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="logo"
          />
        </a>
      );
    }
    // not clickable
    return (<img src={logo} alt="logo" className="logo" />);
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="Banner">
      {makeLogo()}
      <h1 className="title">MetaU Hub</h1>
    </div>
  );
}
