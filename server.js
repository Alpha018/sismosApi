/**
 * Created by Tomás on 17-04-2018.
 */
'use strict';

const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const api = require('./api');
const app = require('./app');
const cron = require('node-cron');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://@localhost:27017/sismos', {useNewUrlParser: true})
    .then(() => {
        console.log('La conexion a la base de datos se a realizado Correctamente');

        app.listen(port, () => {
            console.log('El servidor esta corriendo en el puerto: 8000')
        });

        const task = cron.schedule('10 * * * * *', () =>  {
            api.getData();
        }, {
            scheduled: false
        });

        task.start();

    })
    .catch(err => console.log(err));