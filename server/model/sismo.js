/**
 * Created by Tomás on 08-11-2018.
 */

'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sismoSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },

    horaLocal: {
        type: String,
        required: true
    },

    horaUtc: {
        type: String,
        required: true
    },

    latitud: {
        type: Number,
        required: true
    },

    longitud: {
        type: Number,
        required: true
    },

    profundidad: {
        type: String,
        required: true
    },

    geoReferencia: {
        type: String,
        required: true
    },

    imagen: {
        type: String,
        required: true
    },

    magnitudes: [{

        magnitud: {
            type: String,
            required: true
        },

        medida: {
            type: String,
            required: true
        },

        fuente: {
            type: String,
            required: true
        },

        fechaIngreso: {
            type: Date,
            required: true
        }

    }]
});

module.exports = mongoose.model('sismo', sismoSchema);