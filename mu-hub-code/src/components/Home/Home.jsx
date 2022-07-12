/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

function Home({
  testResponse, setTestResponse, loading, setLoading, error, setError, handleLogout, user,
}) {
  // **********************************************************************
  // CONSTANTS
  // **********************************************************************

  const navigate = useNavigate();

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

  // **********************************************************************
  // HOME CONTENT
  // Button that fetches data, JSON response displayed on page
  // **********************************************************************

  // IMPORTANT TODO: START RENDERING USEFUL CONTENT
  function homeContent(content) {
    return (
      <div className="home-content">
        <p>{`Your username is: ${user}`}</p>
        <p>{`Your college is: ${'placeholder'}`}</p>
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
        <p id="test-response">{JSON.stringify(content)}</p>
      </div>
    );
  }

  // **********************************************************************
  // FETCH DATA ON PAGE LOAD
  // **********************************************************************

  useEffect(() => {
    fetchTestResponse('');
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************
  return (
    <div className="Home">
      {loading ? <Loader /> : homeContent(testResponse)}
    </div>
  );
}

export default Home;
