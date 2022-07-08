/* eslint-disable no-console */
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        <button type="button" onClick={() => console.log('hi')}>
          Click Me
        </button>
      </main>
    </div>
  );
}

export default App;
