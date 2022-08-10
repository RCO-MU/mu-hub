import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import './InternDiscover.css';

export default function InternDiscover({
  userInfo, loading, setLoading,
}) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [interns, setInterns] = useState([]);

  // **********************************************************************
  // AXIOS FUNCTIONS (GET)
  // **********************************************************************

  async function fetchRankedInterns(username) {
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
      const data = await fetchRankedInterns(userInfo.unixname);
      setInterns(data);
      setLoading(false);
    }
    // call defined function
    effect();
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading) {
    return <Loader />;
  }
  // else if not loading, return intern list
  return (
    <div className="InternDiscover">
      <h1>Discover MetaU Interns!</h1>
      {interns.map((intern) => (
        <div className="intern-card">
          <p>{intern.unixname}</p>
        </div>
      ))}
    </div>
  );
}
