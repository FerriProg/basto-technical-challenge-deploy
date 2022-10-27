const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler.js');
const setHeaders = require('./middlewares/setHeaders.js');
const routes = require('./routes/index.js');

const { mongoose } = require('./db.js');

const server = express();

//Middlewares

server.use(express.json());
server.use(morgan('dev'));
server.use(setHeaders);

//Routes

server.use('/', routes);

// Error catching endware.

server.use(errorHandler);

module.exports = server;
