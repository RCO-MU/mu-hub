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

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [hasAccount, setHasAccount] = useState(false);
  const [isIntern, setIsIntern] = useState(false);
  const [hasInternAccount, setHasInternAccount] = useState(false);

  // **********************************************************************
  // AXIOS FUNCTIONS (GET)
  // **********************************************************************

  /*
    Retrieves data from backend /api/user endpoint using axios.
    loading is true while this function runs and false otherwise.
    If response is valid, userInfo is set to the data that was fetched.
    If an error occurs, the error is logged.
  */
  async function fetchUserInfo(username) {
    setLoading(true);
    try {
      const url = 'api/user'
      + `?unixname=${username}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

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
    async function effect() {
      // get cookie information
      let user;
      if (cookies.data !== undefined) {
        setLoggedIn(cookies.data.loggedIn);
        user = cookies.data.user;
      }
      console.log('current user: ', user);
      // if current user is defined, fetch user info, set state vars accordingly
      if (user) {
        const data = await fetchUserInfo(user);
        setUserInfo(data);
        console.log('current user info: ', data);
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
    effect();
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
          userInfo={userInfo}
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
          userInfo={userInfo}
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
                userInfo={userInfo}
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
                userInfo={userInfo}
                loading={loading}
                setLoading={setLoading}
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
