import * as React from 'react';
import axios from 'axios';
import './InternCreate.css';
import { useState } from 'react';
import Select, { createFilter } from 'react-select';
import Loader from '../Loader/Loader';
import delay from '../../utils/delay';
import refreshPage from '../../utils/refreshPage';
import colleges from '../../data/colleges.json';
import startDates from '../../data/startDates.json';
import divisions from '../../data/divisions.json';

export default function InternCreate({
  userInfo, loading, setLoading,
}) {
  // **********************************************************************
  // CONSTANTS
  // **********************************************************************

  const collegeOptions = colleges.map((college) => ({
    value: college, label: college,
  }));

  const startDateOptions = startDates.map((date) => ({
    value: date, label: date,
  }));

  const divisionOptions = divisions.map((division) => ({
    value: division, label: division,
  }));

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
        <Select
          name="startDate"
          className="input-field dropdown ic"
          options={startDateOptions}
          filterOption={createFilter({ ignoreAccents: false })}
          onChange={(e) => setStartDate(e.value)}
        />
      </label>
      <br />
      <label htmlFor="division">
        {'Division: '}
        <br />
        <Select
          name="division"
          className="input-field dropdown ic"
          options={divisionOptions}
          filterOption={createFilter({ ignoreAccents: false })}
          onChange={(e) => setDivision(e.value)}
        />
      </label>
      <br />
      <label htmlFor="residence">
        {'Residence: '}
        <br />
        <input
          type="text"
          id="residence"
          className="input-field text ic"
          name="residence"
          onChange={(e) => setResidence(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="college">
        {'College: '}
        <br />
        <Select
          name="colleges"
          className="input-field dropdown ic"
          options={collegeOptions}
          filterOption={createFilter({ ignoreAccents: false })}
          onChange={(e) => setCollege(e.value)}
        />
      </label>
      <br />
      <label htmlFor="bio">
        {'Bio: '}
        <br />
        <textarea
          id="bio"
          className="input-field text ic"
          placeholder="Tell us about yourself! (You may edit this later.)"
          name="bio"
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <br />
      <input
        className="action-button ic"
        type="submit"
        value="Submit"
        onClick={handleOnInternInfoSubmit}
      />
      <h3>{error}</h3>
    </div>
  );
}
