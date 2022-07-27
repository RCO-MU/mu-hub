import * as React from 'react';
import axios from 'axios';
import './AccountCreate.css';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import delay from '../../utils/delay';
import refreshPage from '../../utils/refreshPage';

export default function AccountCreate({
  loading, setLoading, setCookie,
}) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [unixname, setUnixname] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  // **********************************************************************
  // AXIOS FUNCTIONS (POST)
  // **********************************************************************

  /*
    Posts data to backend /api/user endpoint using axios.
    loading is true while this function runs and false otherwise.
      (loading -> false is handled by page refresh in client function)
    Adds user account with unixname, full name, and role (intern/admin) to database.
    Sets cookie information to loggedIn: true, user: unixname.
    If an error occurs, the error is logged.
  */
  async function postNewAccount() {
    setLoading(true);
    try {
      const url = 'api/user'
      + `?unixname=${unixname}`
      + `&name=${name}`
      + `&role=${isAdmin ? 'admin' : 'intern'}`;
      await axios.post(url);
      setCookie('data', {
        loggedIn: true,
        user: unixname,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleOnAccountSubmit = async () => {
    if (unixname === '') {
      setError('Please enter your unixname.');
    } else if (name === '') {
      setError('Please enter your name.');
    } else {
      setError('');
      await postNewAccount();
      await delay(3000); // artificial delay for occasional database latency
      refreshPage();
    }
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading) {
    return <Loader />;
  }
  // else if not loading
  return (
    <div className="AccountCreate">
      <h1>Create your account!</h1>
      <h2>
        This is a temporary page.
        All of this information will eventually be retrieved via SSO integration.
      </h2>
      <label htmlFor="unixname">
        {'Unixname: '}
        <br />
        <input
          type="text"
          id="unixname"
          className="input-field text ac"
          name="unixname"
          onChange={(e) => setUnixname(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="Name">
        {'Name: '}
        <br />
        <input
          type="text"
          id="name"
          className="input-field text ac"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="is-admin">
        {'Are you an admin? '}
        <input
          type="checkbox"
          id="is-admin"
          className="input-field checkbox ac"
          name="is-admin"
          onChange={() => setIsAdmin(!isAdmin)}
        />
      </label>
      <br />
      <input
        className="action-button ac"
        type="submit"
        value="Submit"
        onClick={handleOnAccountSubmit}
      />
      <h3>{error}</h3>
    </div>
  );
}
