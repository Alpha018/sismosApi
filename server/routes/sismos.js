/**
 * Created by Tomás on 09-11-2018.
 */
'use strict';

const express = require('express');
const sismosController = require('../controllers/sismos');

const api = express.Router();

api.get('/', sismosController.getSismos);

module.exports = api;