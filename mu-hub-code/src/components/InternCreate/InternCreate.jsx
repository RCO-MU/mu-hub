import * as React from 'react';
import axios from 'axios';
import './InternCreate.css';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { localhost } from '../../utils/constants';
import delay from '../../utils/delay';
import refreshPage from '../../utils/refreshPage';

// TODO: Fix start date bug
function InternCreate({
  user, loading, setLoading,
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
  // AXIOS FUNCTIONS (GET/POST)
  // **********************************************************************

  // TODO: Store account info in database
  // TODO: Write function comment
  async function postNewIntern() {
    try {
      const url = 'api/intern'
      + `?unixname=${user}`
      + `&startDate=${startDate}`
      + `&division=${division}`
      + `&residence=${residence}`
      + `&college=${college}`
      + `&bio=${bio}`;
      console.log('start date in interncreate.jsx: ', startDate);
      await axios.post(localhost + url);
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
      setLoading(true);
      await postNewIntern();
      await delay(3000);
      refreshPage();
    }
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    loading ? <Loader /> : (
      <div className="InternCreate">
        <h1>Create your intern account!</h1>
        <label htmlFor="startDate">
          {'Start Date: '}
          <br />
          <input
            type="text"
            id="startDate"
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
            name="college"
            onChange={(e) => setCollege(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="bio">
          {'Bio: '}
          <br />
          <input
            type="textarea"
            id="bio"
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
    )
  );
}

export default InternCreate;
