/* eslint-disable no-console */
import * as React from 'react';
import axios from 'axios';
import './Tools.css';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import refreshPage from '../../utils/refreshPage';

export default function Tools() {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // If user is an intern, allow bio editing. Else, no account edits can be made
  // Only display update button if bio has changed.
  return (
    <div className="Tools">
      <h2>Tools</h2>
      <button
        className="action-button tool"
        type="button"
        onClick={() => navigate('/intern_discover')}
      >
        Discover Interns
      </button>
      <br />
      <button
        className="action-button tool"
        type="button"
        onClick={() => navigate('/document_upload')}
      >
        Upload Documents
      </button>
      <br />
      <button
        className="action-button tool"
        type="button"
        onClick={() => {}}
      >
        More coming soon...
      </button>
    </div>
  );
}
