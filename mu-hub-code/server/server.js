/* eslint-disable no-console */
import express from 'express';

// server setup
const app = express();
const port = process.env.PORT || 5000;

// default get request (test)
app.get('/api/test', (req, res) => {
  res.send({ ping: 'pong' });
});

// default get request (test 2)
app.get('/api/test2', (req, res) => {
  res.send({ ding: 'dong' });
});

// console log port number
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
