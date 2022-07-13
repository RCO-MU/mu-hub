import * as React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import AccountCreate from '../AccountCreate/AccountCreate';
import AccountUpdate from '../AccountUpdate/AccountUpdate';
import refreshPage from '../../utils/refreshPage';
import testUser from '../../utils/testUser';
import './App.css';

function App() {
  // **********************************************************************
  // CONSTANTS & VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  // TODO LATER: Refactor certain state variables to non-global context?
  const [testResponse, setTestResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  // **********************************************************************
  // COOKIES (DEFINE & RETRIEVE)
  // **********************************************************************

  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  let loggedIn;
  let user;
  if (cookies.data !== undefined) {
    loggedIn = cookies.data.loggedIn;
    user = cookies.data.user;
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleLogout = async () => {
    setLoading(true);
    setCookie('data', {
      loggedIn: false,
      user: testUser,
    });
    refreshPage();
    navigate('/');
  };

  // **********************************************************************
  // USE EFFECT (re-renders app on certain state changes)
  // **********************************************************************

  useEffect(() => {}, [loggedIn, user, hasAccount, loading]);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // if user has never logged in / has logged out
  if (loggedIn === undefined || loggedIn === false) {
    return (
      <div className="App">
        <h1>You are not logged in.</h1>
        <Login
          setLoading={setLoading}
          setCookie={setCookie}
          loading={loading}
        />
      </div>
    );
  }
  if (!hasAccount) {
    return (
      <div className="App">
        <h1>Create your account!</h1>
        <p>{'(We see you are logged in but don\'t have an account yet.)'}</p>
        <AccountCreate
          setLoading={setLoading}
          setCookie={setCookie}
          setHasAccount={setHasAccount}
          setError={setError}
        />
      </div>
    );
  }
  // TODO LATER: Optimize props
  return (
    <div className="App">
      <main>
        <h1>You are logged in and you have an account.</h1>
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
                user={user}
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
