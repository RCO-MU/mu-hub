import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import refreshPage from '../../utils/refreshPage';
import './Sidebar.css';

export default function Sidebar({ userInfo, setLoading, setCookie }) {
  // **********************************************************************
  // CONSTANTS & VARIABLES
  // **********************************************************************

  const linkElement = (link, name) => (
    <div className="link">
      <p>
        <a
          style={{ color: '#1974f3' }}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </p>
      <br />
    </div>
  );

  const navigate = useNavigate();

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  // TODO: implement delete account
  const handleLogout = async () => {
    setLoading(true);
    setCookie('data', {
      loggedIn: false,
      user: userInfo.unixname,
    });
    navigate('/');
    refreshPage();
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <section className="sidebar">
      <div id="user-info">
        <p id="name-sidebar"><b>{userInfo.user.name}</b></p>
        {userInfo.user.role === 'intern' ? (
          <p><i>{userInfo.intern.division}</i></p>
        ) : null}
        <button
          className="action-button side"
          type="button"
          onClick={() => navigate('/account_update')}
        >
          Edit Profile Info
        </button>
        <br />
        <button
          className="action-button side"
          type="button"
          onClick={handleLogout}
        >
          Log Out
        </button>
        <hr />
      </div>
      <div id="links">
        <h2>Useful Links</h2>
        {linkElement('https://sites.google.com/fb.com/internexperiencehub/home', 'Intern Experience')}
        {linkElement('https://www.internalfb.com/onboarding/n00b/plan?comm_entry_point=IO_EMAIL_SPLIT', 'Onboarding Portal')}
        {linkElement('https://www.internalfb.com/profile/view', 'Internal Profile')}
        {linkElement('https://www.internalfb.com/intern/help/portal/', 'Help Portal')}
        {linkElement('https://www.internalfb.com/officeguide', 'Office Guide')}
        {linkElement('https://www.internalfb.com/intern/people/portal/working-arrangements/', 'Ways to Work')}
        {linkElement('https://www.internalfb.com/intern/shuttle/timetable/', 'Shuttle Times')}
        {linkElement('https://www.internalfb.com/intern/noms/', 'Noms (Food)')}
        {linkElement('https://www.internalfb.com/intern/wiki/Bunny/', 'Bunny Shortcuts')}
      </div>
    </section>
  );
}
