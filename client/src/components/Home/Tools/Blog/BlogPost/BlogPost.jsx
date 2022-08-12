import * as React from 'react';
import { useState } from 'react';
import './BlogPost.css';

export default function BlogPost({ title, content }) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [isOpen, setIsOpen] = useState(false);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="BlogPost">
      <button
        type="button"
        className={isOpen ? 'collapsible active' : 'collapsible'}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div className={isOpen ? 'content open' : 'content'}>
        <p>
          {content}
        </p>
      </div>
    </div>
  );
}
