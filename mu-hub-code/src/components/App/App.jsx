import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from '../Home/Home';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import AccountCreate from '../AccountCreate/AccountCreate';
import InternCreate from '../InternCreate/InternCreate';
import InternUpdate from '../InternUpdate/InternUpdate';
import refreshPage from '../../utils/refreshPage';
import { localhost } from '../../utils/constants';
import './App.css';

function App() {
  // **********************************************************************
  // CONSTANTS & VARIABLES
  // **********************************************************************

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['cookie-name']);

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  // TODO LATER: Refactor certain state variables to non-global context?
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [hasAccount, setHasAccount] = useState(false);
  const [isIntern, setIsIntern] = useState(false);
  const [hasInternAccount, setHasInternAccount] = useState(false);

  // **********************************************************************
  // USE EFFECT
  // **********************************************************************

  /*
    Assesses current user account state, several possibilities:
    - User has never logged into the site, thus no cookies
    - User has logged in but has no account info. (WILL BE REPLACED WITH AUTOMATIC SSO)
    - User is a logged-in intern with no intern info.
    - User has logged in and all info is complete.
  */
  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      // get cookie information
      let currUser;
      if (cookies.data !== undefined) {
        setLoggedIn(cookies.data.loggedIn);
        currUser = cookies.data.user;
        setUser(currUser);
      }
      console.log('currUser? ', currUser);
      // fetch account information if current user is defined
      if (currUser) {
        const url = `api/user?unixname=${currUser}`;
        const { data } = await axios.get(localhost + url);
        // set state variables based on fetched data
        if (data.user) {
          setHasAccount(true);
          if (data.user.role === 'intern') {
            setIsIntern(true);
          }
        }
        if (data.internInfo) {
          setHasInternAccount(true);
        }
      }
      setLoading(false);
    }
    // call defined function
    getUserInfo();
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading) {
    return <Loader />;
  }
  // if user has never logged in / has logged out
  if (loggedIn === undefined || loggedIn === false) {
    return (
      <div className="App">
        <h1>You are not logged in.</h1>
        <Login
          user={user}
          loading={loading}
          setLoading={setLoading}
          setCookie={setCookie}
        />
      </div>
    );
  }
  // if user has no account info
  if (!hasAccount) {
    return (
      <div className="App">
        <AccountCreate
          loading={loading}
          setLoading={setLoading}
          setCookie={setCookie}
        />
      </div>
    );
  }
  // if user is an intern with no intern info
  if (isIntern && !hasInternAccount) {
    return (
      <div className="App">
        <InternCreate
          user={user}
          loading={loading}
          setLoading={setLoading}
          setCookie={setCookie}
        />
      </div>
    );
  }
  // logged in with all account info
  return (
    <div className="App">
      <main>
        <h1>You are logged in and you have completed your account!</h1>
        <Routes>
          <Route
            path="/"
            element={(
              <Home
                user={user}
                loading={loading}
                setLoading={setLoading}
                setCookie={setCookie}
              />
)}
          />
          <Route
            path="/account_update"
            element={(
              <InternUpdate
                setLoading={setLoading}
                setCookie={setCookie}
                loggedIn={loggedIn}
              />
)}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
