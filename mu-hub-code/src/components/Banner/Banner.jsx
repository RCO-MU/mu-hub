import * as React from 'react';
import './Banner.css';
import logo from '../../data/metalogo.jpg';

export default function Banner({ clickable }) {
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
    return (<img src={logo} alt="logo" className="logo" />);
  };

  return (
    <div className="Banner">
      {makeLogo()}
      <h1 className="title">MetaU Hub</h1>
    </div>
  );
}
