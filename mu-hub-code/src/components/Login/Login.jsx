import * as React from 'react';
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

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading) {
    return <Loader />;
  }
  // else if not loading
  return (
    <div className="Login">
      <h1 id="login-msg">MetaU Hub Login</h1>
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
  );
}

export default Login;
