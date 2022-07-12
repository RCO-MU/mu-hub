/* eslint-disable no-console */
import * as React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AccountUpdate.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import refreshPage from '../../utils/refresh';

function AccountUpdate({
  setLoading, setError, setCookie, loggedIn,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // TODO: Figure out how to use this for required input fields
  const {
    register, handleSubmit, watch, errors,
  } = useForm();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [user, setUser] = useState('');
  const [college, setCollege] = useState();

  // **********************************************************************
  // AXIOS FUNCTIONS (GET/POST)
  // **********************************************************************

  /*
    TODO: code database connection and write comment.
  */
  async function postAccountInfo() {
    try {
      const { data } = await axios.post(`/api/account_update?username=${user}&college=${college}`);
      console.log('response: ', data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleOnAccountInfoSubmit = async () => {
    setLoading(true);
    console.log('input', {
      username: user,
      college,
    });
    await postAccountInfo();
    setCookie('loggedIn', true);
    setCookie('user', user);
    refreshPage();
    navigate('/');
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="AccountUpdate">
      <form
        onSubmit={(e) => { e.preventDefault(); handleOnAccountInfoSubmit(); }}
      >
        <label htmlFor="username">
          {'Username: '}
          <br />
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
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
        <input
          className="action-button"
          type="submit"
          value="Submit"
          onClick={handleOnAccountInfoSubmit}
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

export default AccountUpdate;
