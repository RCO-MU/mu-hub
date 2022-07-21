import * as React from 'react';
import axios from 'axios';
import './AccountCreate.css';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { localhost } from '../../utils/constants';
import delay from '../../utils/delay';
import refreshPage from '../../utils/refreshPage';

function AccountCreate({
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
  // AXIOS FUNCTIONS (GET/POST)
  // **********************************************************************

  // TODO: Store account info in database
  // TODO: Write function comment
  async function postNewAccount() {
    try {
      const url = 'api/user'
      + `?unixname=${unixname}`
      + `&name=${name}`
      + `&role=${isAdmin ? 'admin' : 'intern'}`;
      await axios.post(localhost + url);
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
      setLoading(true);
      await postNewAccount();
      setCookie('data', {
        loggedIn: true,
        user: unixname,
      });
      await delay(3000);
      refreshPage();
    }
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    loading ? <Loader /> : (
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
            name="is-admin"
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </label>
        <br />
        <input
          className="action-button"
          type="submit"
          value="Submit"
          onClick={handleOnAccountSubmit}
        />
        <h3>{error}</h3>
      </div>
    )
  );
}

export default AccountCreate;
