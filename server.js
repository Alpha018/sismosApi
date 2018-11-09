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

        /*app.listen(port, () => {
            console.log('El servidor esta corriendo en el puerto: 8000')
        })*/

        const format = require('date-format');
        const sismo = require('./server/model/sismo');
        const moment = require('moment');

        sismo.find({}, (err, listaSismos) => {
            for(let i = 0; i < listaSismos.length; i++) {

                const aux = listaSismos[i].horaLocal.split(' ');
                const date = aux[1].split('/');
                const fecha = moment(aux[0] + " " + date[1] + "/" + date[0] + "/" + date[2]).toDate();

                listaSismos[i].localDate = fecha;

                listaSismos[i].save((err, sismoG) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('sismo guardado')
                    }
                })
            }
        })
        /*const task = cron.schedule('10 * * * * *', () =>  {
            api.getData();
        }, {
            scheduled: false
        });

        task.start();*/

    })
    .catch(err => console.log(err));