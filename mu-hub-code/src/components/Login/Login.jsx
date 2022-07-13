/* eslint-disable no-console */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import refreshPage from '../../utils/refreshPage';
import testUser from '../../utils/testUser';
import delay from '../../utils/delay';
import './Login.css';

function Login({
  setLoading, setCookie, loading,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  // IMPORTANT TODO: Use SSO to login user and obtain their information
  // TODO: Remove delay
  const handleLogin = async () => {
    setLoading(true);
    setCookie('data', {
      loggedIn: true,
      user: testUser,
    });
    await delay(3000);
    refreshPage();
    navigate('/');
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="Home">
      {loading ? <Loader /> : (
        <div className="Login">
          <button
            id="login-sso-button"
            type="button"
            onClick={handleLogin}
          >
            Log in with SSO
          </button>
          <p><i>(Currently not actually functional)</i></p>
        </div>
      )}
    </div>
  );
}

export default Login;
