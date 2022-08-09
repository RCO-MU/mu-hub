import * as React from 'react';
import { useState, useEffect } from 'react';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import Loader from '../Loader/Loader';
import './Login.css';
import refreshPage from '../../utils/refreshPage';

function Login({
  userInfo, setCookie, loading, auth, provider,
}) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [loginPending, setLoginPending] = useState(false);

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  // **********************************************************************
  // USE EFFECT
  // **********************************************************************

  useEffect(() => {
    async function effect() {
      try {
        console.log('here1');
        setLoginPending(true);
        console.log('here2');
        const result = await getRedirectResult(auth);
        console.log('here3');
        console.log('login result: ', result);
        if (result) {
          const ssoInfo = {
            name: result.user.displayName,
            email: result.user.email,
            phoneNumber: result.user.phoneNumber,
            photoURL: result.user.photoURL,
          };
          setCookie('data', {
            loggedIn: true,
            user: userInfo.unixname,
          });
          setCookie('ssoInfo', ssoInfo);
          refreshPage();
        } else {
          setLoginPending(false);
        }
      } catch (error) {
        console.log('here4');
        console.error(error);
      }
    }
    effect();
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading || loginPending) {
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
      <p><i>(Facebook SSO)</i></p>
    </div>
  );
}

export default Login;
