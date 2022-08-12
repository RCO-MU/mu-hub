/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import Loader from '../Loader/Loader';
import Announcements from './Announcements/Announcements';
import Tools from './Tools/Tools';
import './Home.css';

export default function Home({ userInfo }) {
  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // admin view
  if (userInfo.user.role === 'admin') {
    return (
      <div className="Home">
        <Announcements userInfo={userInfo} />
      </div>
    );
  }
  // intern view
  return (
    <div className="Home">
      <div className="left-container">
        <Announcements userInfo={userInfo} />
      </div>
      <div className="right-container">
        <Tools />
      </div>
    </div>
  );
}
