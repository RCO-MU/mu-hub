import * as React from 'react';
import './Banner.css';
import logo from '../../data/metalogo.jpg';

export default function Banner() {
  return (
    <div className="Banner">
      <img src={logo} alt="logo" className="logo" />
      <h1 className="title">MetaU Hub</h1>
    </div>
  );
}
