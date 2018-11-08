/**
 * Created by Tomás on 17-04-2018.
 */
'use strict';

const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const api = require('./api');
var cron = require('node-cron');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://@localhost:27017/sismos', {useNewUrlParser: true})
    .then(() => {
        console.log('La conexion a la base de datos se a realizado Correctamente');

        const task = cron.schedule('10 * * * * *', () =>  {
            api.getData();
        }, {
            scheduled: false
        });

        task.start();

    })
    .catch(err => console.log(err));