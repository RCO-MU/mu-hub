import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Select, { createFilter } from 'react-select';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Loader/Loader';
import refreshPage from '../../../../utils/refreshPage';
import colleges from '../../../../data/colleges.json';
import startDates from '../../../../data/startDates.json';
import divisions from '../../../../data/divisions.json';
import customStyles from '../../../../data/reactSelectStyles';
import './AnnouncementCreate.css';
import scrollToBottom from '../../../../utils/scrollToBottom';
import delay from '../../../../utils/delay';

export default function AnnouncementCreate({ userInfo, loading, setLoading }) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

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

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState(undefined);
  const [startDate, setStartDate] = useState(false);
  const [division, setDivision] = useState(false);
  const [residence, setResidence] = useState(false);
  const [college, setCollege] = useState(false);
  const [role, setRole] = useState(false);
  const [error, setError] = useState('');

  // **********************************************************************
  // AXIOS FUNCTIONS
  // **********************************************************************

  /*
    Posts data to backend /api/announcement endpoint using axios.
    loading is true while this function runs and false otherwise.
      (loading -> false is handled by page refresh in client function)
    Adds announcement to database.
    If an error occurs, the error is logged.
  */
  async function postAnnouncement() {
    setLoading(true);
    let body;
    if (userInfo.user.role === 'intern') {
      body = {
        posterInfo: {
          unixname: userInfo.unixname,
          name: userInfo.user.name,
          role: userInfo.user.role,
          photoURL: userInfo.user.ssoInfo.photoURL,
        },
        title,
        content,
        attachment,
        startDate: startDate ? userInfo.intern.startDate : undefined,
        division: division ? userInfo.intern.division : undefined,
        residence: residence ? userInfo.intern.residence : undefined,
        college: college ? userInfo.intern.college : undefined,
        role: role || undefined,
      };
    } else {
      body = {
        posterInfo: {
          unixname: userInfo.unixname,
          name: userInfo.user.name,
          role: userInfo.user.role,
          photoURL: userInfo.user.ssoInfo.photoURL,
        },
        title,
        content,
        attachment,
        startDate: startDate ? startDate.value : undefined,
        division: division ? division.value : undefined,
        residence: undefined,
        college: college ? college.value : undefined,
        role: role ? 'admin' : undefined,
      };
      // console.log(body);
    }
    try {
      await axios.post('api/announcements', body);
      await delay(3000);
    } catch (err) {
      console.error(err);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleOnAnnouncementSubmit = async () => {
    if (title === '') {
      setError('Please enter an announcement title.');
      scrollToBottom();
    } else if (content === '') {
      setError('Please input announcement content.');
      scrollToBottom();
    } else {
      setError('');
      await postAnnouncement();
      navigate('/');
      refreshPage();
    }
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (loading) {
    return <Loader loggedIn />;
  }

  return (
    <div className="AnnouncementCreate">
      <h3>Create Announcement</h3>
      <br />
      <label htmlFor="title">
        {'Title: '}
        <input
          type="text"
          id="title"
          className="input-field text ac"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label htmlFor="content">
        <textarea
          id="content"
          className="input-field text ic"
          placeholder="Announce something here!"
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <br />
      {/* Interns and admins have different announcement creation abilities */
      userInfo.user.role === 'intern' ? (
        <>
          <h5>Filters:</h5>
          <br />
          <div id="filters">
            <label htmlFor="startDate" className="filter">
              <input
                type="checkbox"
                id="startDate"
                className="input-field checkbox ac"
                name="startDate"
                onChange={() => setStartDate(!startDate)}
              />
              <span id="admin-span">
                <b>{`Start Date - Visible only to ${userInfo.intern.startDate} starts`}</b>
              </span>
            </label>
            <br />
            <label htmlFor="division" className="filter">
              <input
                type="checkbox"
                id="division"
                className="input-field checkbox ac"
                name="division"
                onChange={() => setDivision(!division)}
              />
              <span id="admin-span">
                <b>{`Division - Visible only to ${userInfo.intern.division} interns`}</b>
              </span>
            </label>
            <br />
            <label htmlFor="residence" className="filter">
              <input
                type="checkbox"
                id="residence"
                className="input-field checkbox ac"
                name="residence"
                onChange={() => setResidence(!residence)}
              />
              <span id="admin-span">
                <b>
                  {`Residence - Visible only to interns that live in 
                  ${userInfo.intern.residence.name.split(',')[0]}`}
                </b>
              </span>
            </label>
            <br />
            <label htmlFor="college" className="filter">
              <input
                type="checkbox"
                id="college"
                className="input-field checkbox ac"
                name="college"
                onChange={() => setCollege(!college)}
              />
              <span id="admin-span">
                <b>{`College - Visible only to interns that go to ${userInfo.intern.college}`}</b>
              </span>
            </label>
            <br />
          </div>
        </>
      ) : (
        <>
          <h5>Filters:</h5>
          <br />
          <label htmlFor="role">
            <input
              type="checkbox"
              id="role"
              className="input-field checkbox ac"
              name="role"
              onChange={() => setRole(!role)}
            />
            <span id="admin-span">
              <b>Visible only to admins?</b>
            </span>
          </label>
          <br />
          {!role ? (
            <>
              <label htmlFor="startDate">
                {'Start Date: '}
                <Select
                  name="startDate"
                  classNamePrefix="select"
                  options={startDateOptions}
                  filterOption={createFilter({ ignoreAccents: false })}
                  onChange={(e) => setStartDate(e)}
                  placeholder="Select..."
                  styles={customStyles}
                  isClearable
                />
              </label>
              <br />
              <label htmlFor="division">
                {'Division: '}
                <Select
                  name="division"
                  classNamePrefix="select"
                  options={divisionOptions}
                  filterOption={createFilter({ ignoreAccents: false })}
                  onChange={(e) => setDivision(e)}
                  placeholder="Select..."
                  styles={customStyles}
                  isClearable
                />
              </label>
              <br />
              <label htmlFor="college">
                {'College: '}
                <Select
                  name="colleges"
                  classNamePrefix="select"
                  options={collegeOptions}
                  filterOption={createFilter({ ignoreAccents: false })}
                  onChange={(e) => setCollege(e)}
                  placeholder="Search colleges..."
                  styles={customStyles}
                  isClearable
                />
              </label>
              <br />
            </>
          ) : null}
        </>
      )
    }
      <input
        className="action-button ic"
        type="submit"
        value="Submit"
        onClick={handleOnAnnouncementSubmit}
      />
      <h3>{error}</h3>
    </div>
  );
}
