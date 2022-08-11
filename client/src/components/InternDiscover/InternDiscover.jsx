import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import './InternDiscover.css';
import InternCard from '../InternCard/InternCard';

export default function InternDiscover({ userInfo, loading }) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [interns, setInterns] = useState([]);
  const [pending, setPending] = useState(false);

  // **********************************************************************
  // AXIOS FUNCTIONS (GET)
  // **********************************************************************

  async function fetchRankedInterns(username) {
    setPending(true);
    try {
      const { data } = await axios.get('api/interns', { params: { unixname: username } });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // **********************************************************************
  // USE EFFECT
  // **********************************************************************

  useEffect(() => {
    async function effect() {
      if (userInfo.user.role !== 'admin') {
        try {
          const data = await fetchRankedInterns(userInfo.unixname);
          setInterns(data);
          console.log(data);
          setPending(false);
        } catch (err) {
          console.error(err);
        }
      }
    }
    // call defined function
    effect();
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading || pending) {
    return <Loader loggedIn />;
  }
  // admins can not access this page
  if (userInfo.user.role === 'admin') {
    return (
      <div className="InternDiscover blocked">
        <h1>No admin access.</h1>
        <h2 className="home-link">
          <Link to="/">
            Return home?
          </Link>
        </h2>
      </div>
    );
  }
  // return intern list
  return (
    <div className="InternDiscover">
      <h1>Discover MetaU Interns!</h1>
      <div className="intern-grid">
        {interns.map((intern) => (
          <InternCard key={intern.unixname} userInfo={userInfo} intern={intern} />
        ))}
      </div>
    </div>
  );
}
