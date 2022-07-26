import * as React from 'react';
import Banner from '../Banner/Banner';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar" id="Navbar">
      <Banner clickable />
    </nav>
  );
}
