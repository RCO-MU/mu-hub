/* eslint-disable no-console */
import * as React from 'react';
import { useState } from 'react';
import Home from './components/Home/Home';
import './App.css';

function App() {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************
  return (
    <div className="App">
      <main>
        <Home
          response={response}
          setResponse={setResponse}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      </main>
    </div>
  );
}

export default App;
