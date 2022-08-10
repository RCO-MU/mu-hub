import * as React from 'react';
import './Loader.css';

function Loader({ loggedIn }) {
  return (
    <div id="preloader" className={loggedIn ? 'logged-in' : ''}>
      <div id="loader" />
    </div>
  );
}
export default Loader;
