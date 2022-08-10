import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { initializeApp } from 'firebase/app';
import {
  getAuth, FacebookAuthProvider, signInWithRedirect, getRedirectResult,
} from 'firebase/auth';
import Home from '../Home/Home';
import Banner from '../Banner/Banner';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import AccountCreate from '../AccountCreate/AccountCreate';
import InternCreate from '../InternCreate/InternCreate';
import AccountUpdate from '../AccountUpdate/AccountUpdate';
import DocumentUpload from '../DocumentUpload/DocumentUpload';
import Sidebar from '../Sidebar/Sidebar';
import ResidenceSearch from '../ResidenceSearch/ResidenceSearch';
import './App.css';
import InternDiscover from '../InternDiscover/InternDiscover';

export default function App() {
  // **********************************************************************
  // CONSTANTS & VARIABLES
  // **********************************************************************

  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  // Initialize Firebase for Facebook SDK Login
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCniwbenknrUkxP9agmSDRdlhRmrYPTHOs',
    authDomain: 'famous-sunbeam-292718.firebaseapp.com',
    projectId: 'famous-sunbeam-292718',
    storageBucket: 'famous-sunbeam-292718.appspot.com',
    messagingSenderId: '634039612718',
    appId: '1:634039612718:web:89cc402dc8979a1aeb76bf',
    measurementId: 'G-FT77JZ4EDZ',
  });
  const provider = new FacebookAuthProvider();
  const auth = getAuth();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [ssoInfo, setSsoInfo] = useState({});
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
      const { data } = await axios.get('api/user', { params: { unixname: username } });
      setUserInfo(data);
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
        setSsoInfo(cookies.ssoInfo);
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

  // if user is not logged in
  if (!loggedIn) {
    return (
      <div className="App">
        <Banner />
        <Login
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          loading={loading}
          setLoading={setLoading}
          setCookie={setCookie}
          auth={auth}
          provider={provider}
        />
      </div>
    );
  }

  // if user does not have account
  if (!hasAccount) {
    return (
      <div className="App">
        <Banner />
        <AccountCreate
          loading={loading}
          setLoading={setLoading}
          setCookie={setCookie}
          removeCookie={removeCookie}
          ssoInfo={ssoInfo}
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

  // user is logged in and account is complete.
  // display navbar and sidebar and have routes accessible
  return (
    <div className="App">
      <main>
        <Sidebar
          userInfo={userInfo}
          setLoading={setLoading}
          setCookie={setCookie}
          auth={auth}
        />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={(
              <Home userInfo={userInfo} loading={loading} />
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
                auth={auth}
              />
            )}
          />
          <Route
            path="/document_upload"
            element={(
              <DocumentUpload
                userInfo={userInfo}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          />
          <Route
            path="/intern_discover"
            element={(
              <InternDiscover
                userInfo={userInfo}
                loading={loading}
                setLoading={setLoading}
                setCookie={setCookie}
              />
            )}
          />
          <Route
            path="*"
            element={(
              <NotFound
                loggedIn={loggedIn && accountComplete}
              />
            )}
          />
        </Routes>
      </main>
    </div>
  );
}

// TODO: Create a footer (login only maybe?)
