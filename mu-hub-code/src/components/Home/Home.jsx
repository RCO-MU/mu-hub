/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import Loader from '../Loader/Loader';
import './Home.css';

export default function Home({
  userInfo, loading, setLoading, setCookie,
}) {
  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************
  if (loading) {
    return <Loader />;
  }
  // TODO: display user info... better
  // else if not loading
  return (
    <div className="Home">
      <p>Announcements and Tools coming soon!</p>
    </div>
  );
}
