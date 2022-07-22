/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './Home.css';
import refreshPage from '../../utils/refreshPage';

function Home({
  userInfo, loading, setLoading, setCookie,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  // TODO: implement delete account
  const handleLogout = async () => {
    setLoading(true);
    setCookie('data', {
      loggedIn: false,
      user: userInfo.unixname,
    });
    navigate('/');
    refreshPage();
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************
  if (loading) {
    return <Loader />;
  }
  // TODO: display user info... better
  // else if not loading
  return (
    <div className="Home">
      <h1>You are logged in and you have completed your account!</h1>
      <p>{`Raw user info: ${JSON.stringify(userInfo)}`}</p>
      {userInfo.user.role === 'intern' ? (
        <button
          className="action-button"
          type="button"
          onClick={() => navigate('/account_update')}
        >
          Edit Profile Info
        </button>
      ) : null}
      <button
        className="action-button"
        type="button"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default Home;
