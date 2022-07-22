/* eslint-disable no-console */
import * as React from 'react';
import axios from 'axios';
import './InternUpdate.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import refreshPage from '../../utils/refreshPage';

function InternUpdate({
  userInfo, loading, setLoading,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [bio, setBio] = useState('');

  // **********************************************************************
  // AXIOS FUNCTIONS (PUT)
  // **********************************************************************

  /*
    Puts data through backend /api/intern endpoint using axios.
    loading is true while this function runs and false otherwise.
      (loading -> false is handled by page navigation in client function)
    Updates intern info (bio) in database.
    If an error occurs, the error is logged.
  */
  async function putInternUpdate() {
    setLoading(true);
    try {
      const url = 'api/intern'
      + `?unixname=${userInfo.unixname}`
      + `&bio=${bio}`;
      await axios.put(url);
    } catch (err) {
      console.error(err);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleOnInternUpdateSubmit = async () => {
    await putInternUpdate();
    navigate('/');
    refreshPage();
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // TODO: Display old values in their respective input fields
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="InternUpdate">
      <p>{`Here's the existing info: ${JSON.stringify(userInfo)}`}</p>
      <br />
      <label htmlFor="bio">
        {'Bio: '}
        <br />
        <input
          type="textarea"
          id="bio"
          name="bio"
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <br />
      <input
        className="action-button"
        type="submit"
        value="Submit"
        onClick={handleOnInternUpdateSubmit}
      />
      <button
        className="action-button"
        type="button"
        onClick={() => navigate('/')}
      >
        Return Home
      </button>
    </div>
  );
}

export default InternUpdate;
