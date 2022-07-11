/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Home.css';
import Account from '../Account/Account';

function Home({
  response, setResponse, loading, setLoading, error, setError,
}) {
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
      console.log('response: ', data);
      if (data === undefined) {
        const msg = 'No response received';
        setResponse({});
        console.error(msg);
        setError(msg);
      } else {
        setResponse(data);
        setError(null);
      }
    } catch (err) {
      setResponse({});
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // **********************************************************************
  // LOADING CONTENT
  // Adapted from Anastasiya Kuligina (https://codepen.io/WebSonata/pen/bRaONB)
  // **********************************************************************
  const loadingContent = (
    <div id="preloader">
      <div id="loader" />
    </div>
  );

  // **********************************************************************
  // HOME CONTENT
  // Button that fetches data, JSON response displayed on page
  // **********************************************************************

  // IMPORTANT TODO: START RENDERING USEFUL CONTENT
  function homeContent(content) {
    console.log('content: ', content);
    return (
      <div className="home-content">
        <Account />
        <h1>- Server Test: - </h1>
        <button id="action-button" type="button" onClick={() => fetchTestResponse('2')}>
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
      {loading ? loadingContent : homeContent(response)}
    </div>
  );
}

export default Home;
