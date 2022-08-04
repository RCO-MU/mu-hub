// TODO: Refactor code like in student_store_v2, with
// routes separate from error handling and listener.

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const { createProxyMiddleware } = require('http-proxy-middleware');
const DB = require('./db');
const { PORT, localhostURL } = require('./config');

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
app.use(createProxyMiddleware('mu-hub.herokuapp.com/api/**', { target: localhostURL }));

// initialize DB using constructor
const db = new DB();

// multer set up for file reading
const upload = multer();

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
    res.send({ errorMsg: error.message });
  }
});

// get user information
app.get('/api/user', async (req, res) => {
  const { unixname } = req.query; // url params
  try {
    // call DB method
    const info = await DB.getUserInfo(unixname);
    res.status(200).send(info);
  } catch (error) {
    res.send({ errorMsg: error.message });
  }
});

// delete user
app.delete('/api/user', async (req, res) => {
  const { unixname } = req.query; // url params
  try {
    // call DB method
    const info = await DB.deleteUser(unixname);
    res.status(200).send(info);
  } catch (error) {
    res.send({ errorMsg: error.message });
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
    res.send({ errorMsg: error.message });
  }
});

// update intern information
app.put('/api/intern', async (req, res) => {
  const { unixname, bio } = req.query; // url params
  try {
    // call DB method
    const info = await DB.putInternInfo(unixname, bio);
    res.status(200).send({ update: { unixname, bio } });
  } catch (error) {
    res.send({ errorMsg: error.message });
  }
});

// upload file
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { file } = req;
  const { unixname } = req.body;
  try {
    const info = await DB.uploadFile(unixname, file);
    if (info === 201) {
      res.status(201).send({ response: `${file.originalname} uploaded successfully by ${unixname}` });
    } else {
      res.status(500).send({ response: `${file.originalname} could not be uploaded` });
    }
  } catch (error) {
    res.send({ errorMsg: error.message });
  }
});

// **********************************************************************
// LISTENER
// **********************************************************************

// log port number and confirm server is launched
app.listen(port, () => {
  console.log(`🚀 Parse app listening on port ${port}`);
});
