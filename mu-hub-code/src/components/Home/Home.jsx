/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './Home.css';
import refreshPage from '../../utils/refreshPage';

function Home({
  user, loading, setLoading, setCookie,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [userInfo, setUserInfo] = useState({});

  // **********************************************************************
  // AXIOS FUNCTIONS (GET/POST)
  // **********************************************************************

  /*
    Retrieves data from backend /api/test endpoint using axios.
    loading is true while this function runs and false otherwise.
    If response is undefined, response = {} and error = 'No response received'.
    If response is valid, set response accordingly and error = null.
    If other error occurs, response = {} and error is set to the caught error message.
  */

  // TODO: Get account info via database connection
  // TODO: Write comment
  // TODO: Display account info values on home page

  function getAccountInfo() {
    return {
      user: '1',
      college: '2',
    };
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  // TODO: implement delete account
  const handleLogout = async () => {
    setLoading(true);
    setCookie('data', {
      loggedIn: false,
      user,
    });
    refreshPage();
    navigate('/');
  };

  // **********************************************************************
  // FETCH DATA ON PAGE LOAD
  // **********************************************************************

  useEffect(() => {
    setUserInfo(getAccountInfo());
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************
  if (loading) {
    return <Loader />;
  }
  // else if not loading
  return (
    <div className="Home">
      <p>{`Your username is: ${userInfo.user}`}</p>
      <p>{`Your college is: ${userInfo.college}`}</p>
      <button
        className="action-button"
        type="button"
        onClick={() => navigate('/account_update')}
      >
        Edit Profile Info
      </button>
      <br />
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
