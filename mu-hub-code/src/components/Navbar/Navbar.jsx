import * as React from 'react';
import Banner from '../Banner/Banner';
import './Navbar.css';

// the navbar is essentially just the Banner element
// + the clickable prop and different sizing
export default function Navbar() {
  return (
    <nav className="navbar" id="Navbar">
      <Banner clickable />
    </nav>
  );
}
