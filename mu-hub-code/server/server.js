// TODO: Refactor code like in student_store_v2, with
// routes separate from error handling and listener.

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const DB = require('./db');
const { PORT } = require('../src/utils/constants');

// **********************************************************************
// SERVER SETUP
// **********************************************************************

// server setup
const app = express();
const port = process.env.PORT || PORT;

// use packages
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// initialize DB using constructor
const db = new DB();

// **********************************************************************
// ENDPOINTS
// **********************************************************************

// create user account
app.post('/api/user', async (req, res) => {
  const { unixname, name, role } = req.query; // url params
  try {
    // call DB method
    await DB.createUserAccount(unixname, name, role);
    res.status(201).send({ account: { unixname, name, role } });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// get user information
app.get('/api/user', async (req, res) => {
  const { unixname } = req.query; // url params
  try {
    // call DB method
    const info = await DB.getUserInfo(unixname);
    res.send(info);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// update user information
app.put('/api/intern', async (req, res) => {
  const { unixname, bio } = req.query; // url params
  try {
    // call DB method
    const info = await DB.putInternInfo(unixname, bio);
    res.status(200).send({ update: { unixname, bio } });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// create intern account
app.post('/api/intern', async (req, res) => {
  const {
    unixname, startDate, division, residence, college, bio,
  } = req.query; // url params
  try {
    // call DB method
    await DB.createInternAccount(unixname, startDate, division, residence, college, bio);
    res.status(201).send({
      intern: {
        unixname, startDate, division, residence, college, bio,
      },
    });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// basic test
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// **********************************************************************
// LISTENER
// **********************************************************************

// log port number and confirm server is launched
app.listen(port, () => {
  console.log(`🚀 Parse app listening on port ${port}`);
});
