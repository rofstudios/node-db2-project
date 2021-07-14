const express = require("express");
let carRouter = require('./cars/cars-router');
let cors = require('cors'),
    helmet = require('helmet');

const server = express()

// middlewares
server.use(cors());
server.use(helmet());
server.use(express.json());
// DO YOUR MAGIC

// router endpoints
server.use('/api/cars', carRouter)

module.exports = server
