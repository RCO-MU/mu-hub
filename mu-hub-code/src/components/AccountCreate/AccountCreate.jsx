import * as React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AccountCreate.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import testUser from '../../utils/testUser';

function AccountCreate({
  setLoading, setError, setCookie, setHasAccount, loggedIn,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // TODO: Figure out how to use this to enforce required input fields
  const {
    register, handleSubmit, watch, errors,
  } = useForm();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [user, setUser] = useState('');
  const [college, setCollege] = useState();
  const [otherInput, setOtherInput] = useState();

  // **********************************************************************
  // AXIOS FUNCTIONS (GET/POST)
  // **********************************************************************

  // TODO: Store account info in database
  // TODO: Write function comment
  async function postNewAccount() {
    try {
      const { data } = await axios.post(`/api/account_create?username=${user}&college=${college}&other=${otherInput}`);
      // console.log('response: ', data);
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
    await postNewAccount();
    setCookie('data', {
      loggedIn: true,
      user: testUser,
    });
    setHasAccount(true);
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="AccountCreate">
      <form
        onSubmit={(e) => { e.preventDefault(); handleOnAccountInfoSubmit(); }}
      >
        <label htmlFor="username">
          {'Username: '}
          <br />
          <i>(Will retrieve automatically from login)</i>
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

export default AccountCreate;
