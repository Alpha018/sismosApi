/**
 * Created by Tomás on 09-11-2018.
 */
'use strict';

const express = require('express');
const sismosController = require('../controllers/sismos');
const rateLimit = require("express-rate-limit");

const createAccountLimiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 min window
    max: 1, // start blocking after 5 requests
    message: {
        error: 'Demasiadas peticiones, por favor espere 20 minutos'
    }
});

const api = express.Router();

api.get('/', createAccountLimiter,sismosController.getSismos);

module.exports = api;