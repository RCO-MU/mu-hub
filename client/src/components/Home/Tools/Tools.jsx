/* eslint-disable no-console */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tools.css';

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
      <button
        className="action-button tool"
        type="button"
        onClick={() => navigate('/document_upload')}
      >
        Upload Documents
      </button>
      <button
        className="action-button tool"
        type="button"
        onClick={() => navigate('/blog')}
      >
        Blog Posts
      </button>
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
