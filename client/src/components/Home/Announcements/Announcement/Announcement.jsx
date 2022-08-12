import * as React from 'react';
import axios from 'axios';
import './Announcement.css';

export default function Announcement({ announcement }) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const role = announcement.posterInfo.role === 'intern' ? 'Intern' : 'Admin';

  const filters = () => {
    if (announcement.role === 'admin') {
      return 'To Admins Only';
    }
    let filterStr = 'To ';
    if (announcement.startDate) {
      filterStr += `${announcement.startDate} Starts, `;
    }
    if (announcement.division) {
      filterStr += `${announcement.division} Interns, `;
    }
    if (announcement.residence) {
      filterStr += `${announcement.residence.name.split(',')[0]} Residents, `;
    }
    if (announcement.college) {
      filterStr += `${announcement.college} Interns, `;
    }
    if (filterStr !== 'To ') {
      return filterStr.substring(0, filterStr.length - 2);
    }
    return '';
  };

  const filterStr = filters();

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="Announcement">
      <div id="announcement-header">
        <img
          src={announcement.posterInfo.photoURL}
          alt="profile"
          className="profile announcement"
        />
        <p className="announcer">
          {`${announcement.posterInfo.name} - ${role}`}
          <br />
          {` (${announcement.posterInfo.unixname})`}
        </p>
      </div>
      <br />
      <h4>{announcement.title}</h4>
      <p id="announcement-content">{announcement.content}</p>
      {filterStr !== '' ? (
        <>
          <hr />
          <p className="announcement-filters">
            <i>
              {filterStr}
            </i>
          </p>
        </>
      ) : null}

    </div>
  );
}
