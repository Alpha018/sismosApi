/**
 * Created by Tomás on 09-11-2018.
 */
'use strict';
//modelos
const sismo = require('../model/sismo');
const format = require('date-format');

function getSismos(req, res) {
    const fecha = req.query.fecha;

    if (fecha) {
        if (/^\d{8}$/.test(fecha)) {
            //crear date con fecha

            try {
                const data = format.parse('yyyyMMdd', fecha);
                const fechaBuscar = new Date(data);

                const anio = format('yyyy', data);
                const mes = format('MM', data);
                const dia = format('dd', data);

                const query = sismo.find({horaLocal: {$regex: `.* ${dia}/${mes}/${anio}`}}, {'_id': 0, 'magnitudes._id': 0, '__v': 0, 'localDate': 0}).sort({horaLocal: -1}).limit(10);
                query.exec(function (err, sismos_encontrados) {
                    if (err) {
                        res.status(500).send({
                            error: 'Error en el servidor'
                        })
                    } else {
                        if (sismos_encontrados.length === 0) {
                            res.status(404).send({
                                error: 'No hay sismos para la fecha dada'
                            })
                        } else {
                            res.status(200).send(sismos_encontrados);
                        }
                    }
                });
            } catch (e) {
                res.status(500).send({
                    error: 'Formato de fecha invalido (aaaammdd)'
                })
            }

        } else {
            res.status(500).send({
                error: 'Ingresó una formato de fecha invalida'
            })
        }
    } else {
        //buscar los ultimos 10 sismos
        const query = sismo.find({}, {'_id': 0, 'magnitudes._id': 0, '__v': 0, 'localDate': 0}).sort({localDate: -1}).limit(10);
        query.exec(function (err, sismos_encontrados) {
            if (err) {
                res.status(500).send({
                    error: 'Error en el servidor'
                })
            } else {
                if (sismos_encontrados.length === 0) {
                    res.status(404).send({
                        error: 'No hay sismos para la fecha dada'
                    })
                } else {
                    res.status(200).send(sismos_encontrados);
                }
            }
        });
    }

}

module.exports = {
    getSismos
};