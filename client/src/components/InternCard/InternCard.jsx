import { User } from 'parse';
import * as React from 'react';
import './InternCard.css';

export default function InternCard({ userInfo, intern }) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const bold = { fontWeight: 'bolder' };

  let residenceLine = null;
  if (intern.residence.name) {
    residenceLine = (
      <p
        className="intern-info"
        style={userInfo.intern.residence.name === intern.residence.name ? bold : null}
      >
        <i>{`• Lives in ${intern.residence.name.split(',')[0]}`}</i>
      </p>
    );
  }

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="InternCard col">
      <img
        src={intern.ssoInfo.photoURL}
        alt="profile"
        className="profile card"
      />
      <p>
        {intern.name}
        <br />
        {` (${intern.unixname})`}
      </p>
      <p
        className="intern-info"
        style={(userInfo.intern.division === intern.division) ? bold : null}
      >
        <i>{`• ${intern.division} (${intern.startDate} Start)`}</i>
      </p>
      {residenceLine}
      <p
        className="intern-info"
        style={(userInfo.intern.college === intern.college) ? bold : null}
      >
        <i>{`• Goes to ${intern.college}`}</i>
      </p>
      {intern.bio !== '' ? (
        <>
          <hr />
          <p className="intern-bio">{intern.bio}</p>
        </>
      ) : null}
    </div>
  );
}
