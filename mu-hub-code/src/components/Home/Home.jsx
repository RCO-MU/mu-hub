/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Home.css';

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
  async function fetchTestResponse() {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/test');
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

  /*
    Retrieves data from backend /api/test2 endpoint using axios.
    loading is true while this function runs and false otherwise.
    If response is undefined, response = {} and error = 'No response received'.
    If response is valid, set response accordingly and error = null.
    If other error occurs, response = {} and error is set to the caught error message.
  */
  async function fetchTestResponse2() {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/test2');
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
  // **********************************************************************
  const loadingContent = (
    <div id="preloader">
      <div id="loader" />
    </div>
  );

  // **********************************************************************
  // HOME CONTENT
  // **********************************************************************
  function homeContent(content) {
    console.log('content: ', content);
    return (
      <div className="home-content">
        <button id="sso-test" type="button" onClick={fetchTestResponse2}>
          Click Me
        </button>
        <p>{JSON.stringify(content)}</p>
      </div>
    );
  }

  // **********************************************************************
  // FETCH DATA ON PAGE LOAD
  // **********************************************************************

  useEffect(() => {
    fetchTestResponse();
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
