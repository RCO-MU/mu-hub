/* eslint-disable no-console */
import express from 'express';

// server setup
const app = express();
const port = process.env.PORT || 5000;

// default get request (test)
app.get('/api/test', (req, res) => {
  res.send({ randomNumber: 'n/a' });
});

// default get request (test 2)
app.get('/api/test2', (req, res) => {
  res.send({ randomNumber: Math.floor(Math.random() * 1000) });
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

// log port number and confirm server is launched
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
