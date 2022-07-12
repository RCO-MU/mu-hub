/* eslint-disable no-console */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import './App.css';
import AccountUpdate from './components/AccountUpdate/AccountUpdate';
import refreshPage from './utils/refresh';

function App() {
  // **********************************************************************
  // CONSTANTS
  // **********************************************************************

  // TODO: replace loggedIn cookie with state variable
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  // TODO LATER: Refactor state variables to non-global context
  const [testResponse, setTestResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleLogout = async () => {
    setLoading(true);
    removeCookie('loggedIn');
    removeCookie('user');
    refreshPage();
    navigate('/');
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // TODO LATER: Optimize props
  if (cookies.loggedIn === undefined || cookies.loggedIn === false) {
    return (
      <div className="App">
        <h1>You are not logged in.</h1>
        <AccountUpdate
          setLoading={setLoading}
          setError={setError}
          setCookie={setCookie}
          loggedIn={cookies.loggedIn}
        />
      </div>
    );
  }
  return (
    <div className="App">
      <main>
        <h1>You are logged in.</h1>
        <Routes>
          <Route
            path="/"
            element={(
              <Home
                testResponse={testResponse}
                setTestResponse={setTestResponse}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
                handleLogout={handleLogout}
                user={cookies.user}
              />
)}
          />
          <Route
            path="/account_update"
            element={(
              <AccountUpdate
                setLoading={setLoading}
                setError={setError}
                setCookie={setCookie}
                loggedIn={cookies.loggedIn}
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
