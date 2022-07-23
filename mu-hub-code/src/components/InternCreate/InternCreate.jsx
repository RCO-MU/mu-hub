import * as React from 'react';
import axios from 'axios';
import './InternCreate.css';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import delay from '../../utils/delay';
import refreshPage from '../../utils/refreshPage';

export default function InternCreate({
  userInfo, loading, setLoading,
}) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [startDate, setStartDate] = useState('');
  const [division, setDivision] = useState('');
  const [residence, setResidence] = useState('');
  const [college, setCollege] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  // **********************************************************************
  // AXIOS FUNCTIONS (POST)
  // **********************************************************************

  /*
    Posts data to backend /api/intern endpoint using axios.
    loading is true while this function runs and false otherwise.
      (loading -> false is handled by page refresh in client function)
    Adds intern info (unixname, start date, division, residence, college, bio) to database.
    If an error occurs, the error is logged.
  */
  async function postNewIntern() {
    setLoading(true);
    try {
      const url = 'api/intern'
      + `?unixname=${userInfo.unixname}`
      + `&startDate=${startDate}`
      + `&division=${division}`
      + `&residence=${residence}`
      + `&college=${college}`
      + `&bio=${bio}`;
      await axios.post(url);
    } catch (err) {
      console.error(err);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleOnInternInfoSubmit = async () => {
    if (startDate === '') {
      setError('Please enter your start date.');
    } else if (division === '') {
      setError('Please select your MetaU division.');
    } else if (college === '') {
      setError('Please select your college.');
    } else {
      setError('');
      await postNewIntern();
      await delay(3000); // artificial delay for occasional database latency
      refreshPage();
    }
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // TODO: make form more user-friendly (dropdowns, default values, placeholders, etc.)

  // loading
  if (loading) {
    return <Loader />;
  }
  // else if not loading
  return (
    <div className="InternCreate">
      <h1>Create your intern account!</h1>
      <label htmlFor="startDate">
        {'Start Date: '}
        <br />
        <input
          type="text"
          id="startDate"
          className="input-field text"
          name="startDate"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="division">
        {'Division: '}
        <br />
        <input
          type="text"
          id="division"
          className="input-field text"
          name="division"
          onChange={(e) => setDivision(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="residence">
        {'Residence: '}
        <br />
        <input
          type="text"
          id="residence"
          className="input-field text"
          name="residence"
          onChange={(e) => setResidence(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="college">
        {'College: '}
        <br />
        <input
          type="text"
          id="college"
          className="input-field text"
          name="college"
          onChange={(e) => setCollege(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="bio">
        {'Bio: '}
        <br />
        <textarea
          id="bio"
          className="input-field text"
          placeholder="Enter a fun bio!"
          name="bio"
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <br />
      <input
        className="action-button"
        type="submit"
        value="Submit"
        onClick={handleOnInternInfoSubmit}
      />
      <h3>{error}</h3>
    </div>
  );
}
