/**
 * Created by Tomás on 17-12-2017.
 */
'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.enable("trust proxy");
app.use(cors());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Allow', 'GET, POST, OPTION, PUT, DELETE');

    next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cargar rutas
const sismos_routes = require('./server/routes/sismos');

//Ruta Base
app.use('/sismos', sismos_routes);


//rutas body-parser
module.exports = app;