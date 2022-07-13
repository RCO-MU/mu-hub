/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import delay from '../../utils/delay';
import './Home.css';

function Home({
  testResponse, setTestResponse, loading, setLoading, error, setError, handleLogout, user,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [info, setInfo] = useState({});

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
  async function fetchTestResponse(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/test${id}`);
      if (data === undefined) {
        const msg = 'No response received';
        setTestResponse({});
        console.error(msg);
        setError(msg);
      } else {
        setTestResponse(data);
        setError(null);
      }
    } catch (err) {
      setTestResponse({});
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

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
  // FETCH DATA ON PAGE LOAD
  // **********************************************************************

  useEffect(() => {
    fetchTestResponse('');
    setInfo(getAccountInfo());
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************
  return (
    <div className="Home">
      {loading ? <Loader /> : (
        <div className="home-content">
          <p>{`Your username is: ${info.user}`}</p>
          <p>{`Your college is: ${info.college}`}</p>
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
          <h1>- Server Test: - </h1>
          <button className="action-button" type="button" onClick={() => fetchTestResponse('2')}>
            Click Me
          </button>
          <p id="test-response">{JSON.stringify(testResponse)}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
