import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../data/images/metalogo.jpg';
import './Banner.css';

export default function Banner({ clickable }) {
  // **********************************************************************
  // CONSTANTS & VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // renders logo based on if it can be clicked on
  const makeLogo = () => {
    if (clickable) {
      return (
        <img
          src={logo}
          alt="logo"
          className="logo"
          onClick={() => navigate('/')}
          onKeyDown={() => {}}
        />
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
