/* eslint-disable no-console */
import * as React from 'react';
import axios from 'axios';
import './AccountUpdate.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import refreshPage from '../../utils/refreshPage';

export default function AccountUpdate({
  userInfo, loading, setLoading, setCookie,
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

  /*
    Deletes user account through api/user endpoint using axios.
    loading is true while this function runs and false otherwise.
      (loading -> false is handled by page navigation in client function)
    Deletes all user account information from database.
    If an error occurs, the error is logged.
  */
  async function deleteAccount() {
    setLoading(true);
    try {
      const url = 'api/user'
        + `?unixname=${userInfo.unixname}`;
      await axios.delete(url);
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

  const handleDeleteAccount = async () => {
    await deleteAccount();
    setCookie('data', {
      loggedIn: false,
      user: undefined,
    });
    navigate('/');
    refreshPage();
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading) {
    return <Loader />;
  }
  // TODO: Display old values in their respective input fields
  // if user is an intern, allow bio editing. Else, no account edits can be made
  return (
    <div className="AccountUpdate">
      <p>{`Here's the existing info: ${JSON.stringify(userInfo)}`}</p>
      <br />
      {userInfo.user.role === 'intern' ? (
        <>
          <label htmlFor="bio">
            {'Update Bio: '}
            <br />
            <textarea
              id="bio"
              className="input-field text"
              placeholder="Enter a fun bio!"
              name="bio"
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <br />
          <input
            className="action-button"
            type="submit"
            value="Update"
            onClick={handleOnInternUpdateSubmit}
          />
          <br />
        </>
      ) : (<h2>Admins cannot edit their account information.</h2>)}
      <button
        className="action-button"
        type="button"
        onClick={() => navigate('/')}
      >
        Return Home
      </button>
      <br />
      <button
        className="action-button delete"
        type="button"
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>

    </div>
  );
}
