/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import Loader from '../Loader/Loader';
import './Home.css';

export default function Home({
  loading,
}) {
  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading) {
    return <Loader />;
  }
  // else if not loading
  return (
    <div className="Home">
      <p>Announcements and Tools coming soon!</p>
    </div>
  );
}
