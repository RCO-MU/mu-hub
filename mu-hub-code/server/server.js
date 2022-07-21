const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const DB = require('./db');
const { PORT } = require('../src/utils/constants');

// server setup
const app = express();
const port = process.env.PORT || PORT;

// use packages
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// initialize DB using constructor
const db = new DB();

// ENDPOINTS

// get user information
app.get('/api/user', async (req, res) => {
  const { unixname } = req.query;
  try {
    const info = await DB.getUserInfo(unixname);
    res.send(info);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// create user account
app.post('/api/user', async (req, res) => {
  const { unixname, name, role } = req.query;
  try {
    await DB.createUserAccount(unixname, name, role);
    res.status(201).send({ account: { unixname, name, role } });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// create intern account
app.post('/api/intern', async (req, res) => {
  const {
    unixname, startDate, division, residence, college, bio,
  } = req.query;
  try {
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

// log port number and confirm server is launched
app.listen(port, () => {
  console.log(`🚀 Parse app listening on port ${port}`);
});
