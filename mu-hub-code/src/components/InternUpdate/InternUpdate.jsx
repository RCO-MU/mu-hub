/* eslint-disable no-console */
import * as React from 'react';
import axios from 'axios';
import './InternUpdate.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InternUpdate({
  setLoading, loggedIn,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [college, setCollege] = useState();
  const [otherInput, setOtherInput] = useState();

  // **********************************************************************
  // AXIOS FUNCTIONS (GET/POST)
  // **********************************************************************

  // TODO: Store account info in database
  // TODO: Write function comment
  async function putInternUpdate() {
    try {
      const { data } = await axios.put(`/api/intern
      ?college=${college}
      &other=${otherInput}`);
    } catch (err) {
      console.error(err);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleOnInternUpdateSubmit = async () => {
    setLoading(true);
    await putInternUpdate();
    navigate('/');
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // TODO: Get old values from account database
  // TODO: Display old values in their respective input fields
  return (
    <div className="InternUpdate">
      <form
        onSubmit={(e) => { e.preventDefault(); handleOnInternUpdateSubmit(); }}
      >
        <br />
        <label htmlFor="college">
          {'College: '}
          <br />
          <input
            type="text"
            id="college"
            name="college"
            onChange={(e) => setCollege(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="otherInput">
          {'Other Input: '}
          <br />
          <input
            type="text"
            id="otherInput"
            name="otherInput"
            onChange={(e) => setOtherInput(e.target.value)}
          />
        </label>
        <br />
        <input
          className="action-button"
          type="submit"
          value="Submit"
          onClick={handleOnInternUpdateSubmit}
        />
      </form>
      {loggedIn ? (
        <button
          className="action-button"
          type="button"
          onClick={() => navigate('/')}
        >
          Return Home
        </button>
      ) : null}
    </div>
  );
}

export default InternUpdate;
