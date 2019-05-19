const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const io = require('socket.io')(server);
const socket = require('./socket')(io);
const path = require('path');
const port = process.env.PORT || 5000;

const url = 'mongodb://pim123:pim123@ds044787.mlab.com:44787/button-game';

mongoose.connect(url, { useNewUrlParser: true });
let connection = mongoose.connection;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

connection.once('open', () => {
  console.log('Connected to database.');

  server.listen(port, () =>
    console.log(`Server listening on port ${port}`));
});