/* eslint-disable no-console */
import * as React from 'react';
import { useState } from 'react';
import './Account.css';

function Account() {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  // TODO LATER: REFACTOR STATE VARIABLES TO NON-GLOBAL CONTEXT
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // TODO LATER: PASS ONLY PROPS THAT ARE NECESSARY
  return (
    <div className="Account">
      <form action="/account_update">
        <label htmlFor="unixname">
          {'Meta Unixname: '}
          <br />
          <input type="text" id="unixname" name="unixname" />
        </label>
        <br />
        <label htmlFor="college">
          {'College: '}
          <br />
          <input type="text" id="college" name="college" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Account;
