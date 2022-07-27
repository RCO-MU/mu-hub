import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from '../Home/Home';
import Banner from '../Banner/Banner';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import AccountCreate from '../AccountCreate/AccountCreate';
import InternCreate from '../InternCreate/InternCreate';
import AccountUpdate from '../AccountUpdate/AccountUpdate';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';

export default function App() {
  // **********************************************************************
  // CONSTANTS & VARIABLES
  // **********************************************************************

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['cookie-name']);

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [hasAccount, setHasAccount] = useState(false);
  const [isIntern, setIsIntern] = useState(false);
  const [accountComplete, setAccountComplete] = useState(false);

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
      setUserInfo(data);
      console.log(data);
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
    Fetches userInfo to be used throughout the application
    Also assesses current user account state, several possibilities:
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
      // if current user is defined, fetch user info, set state vars accordingly
      if (user) {
        const data = await fetchUserInfo(user);
        if (data.user) {
          setHasAccount(true);
          if (data.user.role === 'intern') {
            setIsIntern(true);
          } else {
            setAccountComplete(true);
          }
        }
        if (data.intern) {
          setAccountComplete(true);
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
    return (
      <div className="App">
        <Loader />
      </div>
    );
  }

  // elements rendered for "/" endpoint
  const mainElement = () => {
    // if user has never logged in, or has logged out
    if (loggedIn === undefined || loggedIn === false) {
      return (
        <div className="App">
          <Banner />
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
          <Banner />
          <AccountCreate
            loading={loading}
            setLoading={setLoading}
            setCookie={setCookie}
          />
        </div>
      );
    }
    // if user is an intern with no intern info
    if (isIntern && !accountComplete) {
      return (
        <div className="App">
          <Banner />
          <InternCreate
            userInfo={userInfo}
            loading={loading}
            setLoading={setLoading}
            setCookie={setCookie}
          />
        </div>
      );
    }
    // else, logged in with all account info
    return (
      <Home
        userInfo={userInfo}
        loading={loading}
      />
    );
  };

  return (
    <div className="App">
      <main>
        {accountComplete && loggedIn ? (
          <>
            <Sidebar
              userInfo={userInfo}
              setLoading={setLoading}
              setCookie={setCookie}
            />
            <Navbar />
          </>
        ) : null}
        <Routes>
          <Route
            path="/"
            element={(
            mainElement()
)}
          />
          <Route
            path="/account_update"
            element={(
              <AccountUpdate
                userInfo={userInfo}
                loading={loading}
                setLoading={setLoading}
                setCookie={setCookie}
              />
)}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

// TODO: Create a footer
