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

  // blog posts content format (formatting array)
  function contentFormat(cont) {
    return (
      <>
        {cont.map((line) => <p>{line}</p>)}
        <br />
      </>
    );
  }

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
          {contentFormat(content)}
        </p>
      </div>
    </div>
  );
}
