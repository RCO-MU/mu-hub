import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import refreshPage from '../../utils/refreshPage';
import delay from '../../utils/delay';
import './Login.css';

function Login({
  userInfo, setLoading, setCookie, loading,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  // IMPORTANT TODO: Use SSO to login user and obtain their information, remove delay
  const handleLogin = async () => {
    setLoading(true);
    setCookie('data', {
      loggedIn: true,
      user: userInfo.unixname,
    });
    await delay(3000);
    refreshPage();
    navigate('/');
  };

  const handleDBTest = async () => {
    setLoading(true);
    console.log('WORKING...');
    try {
      await axios.get('/api/dbtest');
      await delay(3000);
      refreshPage();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    loading ? <Loader /> : (
      <div className="Login">
        <button
          className="login-button"
          id="sso"
          type="button"
          onClick={handleLogin}
        >
          Log in with SSO
        </button>
        <p><i>(Currently not actually functional)</i></p>
      </div>
    )
  );
}

export default Login;
