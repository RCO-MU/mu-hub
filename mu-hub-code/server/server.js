const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const DB = require('./db');

// server setup
const app = express();
const port = process.env.PORT || 5000;

// use packages
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// initialize DB using constructor
const db = new DB();

// CONSTANTS FOR TESTING
const name = 'baby';
const age = 1;

// Saving your First Data Object on Back4App
app.get('/api/dbtest', async (req, res) => {
  try {
    await DB.saveNewPerson(name, age);
    res.send({ msg: 'success' });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// Retrieving your First Data Object on Back4App
app.get('/api/dbtest2', async (req, res) => {
  try {
    const result = await DB.retrievePerson();
    res.send({ msg: result });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

app.post('/api/account_create', (req, res) => {
  res.send({
    username: req.query.username,
    college: req.query.college,
    other: req.query.other,
  });
});

app.post('/api/account_update', (req, res) => {
  res.send({
    college: req.query.college,
    other: req.query.other,
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// default get request (test)
app.get('/api/test', (req, res) => {
  res.send({ randomNumber: 'n/a' });
});

// default get request (test 2)
app.get('/api/test2', (req, res) => {
  res.send({ randomNumber: Math.floor(Math.random() * 1000) });
});

// log port number and confirm server is launched
app.listen(port, () => {
  console.log(`🚀 Parse app listening on port ${port}`);
});
