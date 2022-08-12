import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../../Loader/Loader';
import Announcement from './Announcement/Announcement';
import './Announcements.css';

export default function Announcements({ userInfo }) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [announcements, setAnnouncements] = useState([]);
  const [pending, setPending] = useState(false);

  // **********************************************************************
  // AXIOS FUNCTIONS (GET)
  // **********************************************************************

  async function fetchAnnouncements(username) {
    setPending(true);
    try {
      const { data } = await axios.get('api/announcements', { params: { unixname: username } });
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
      try {
        const data = await fetchAnnouncements(userInfo.unixname);
        setAnnouncements(data);
        setPending(false);
      } catch (err) {
        console.error(err);
      }
    }
    // call defined function
    effect();
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (pending) {
    return <Loader loggedIn />;
  }
  return (
    <div className="Announcements">
      <h2>Announcements</h2>
      <button
        className="action-button post"
        type="button"
        onClick={() => navigate('/create_announcement')}
      >
        + Create Post
      </button>
      <br />
      <div className="announcement-feed">
        { announcements.length > 0
          ? (announcements.map(
            (announcement) => <Announcement key={announcement.title} announcement={announcement} />,
          )) : null }
      </div>
    </div>
  );
}
