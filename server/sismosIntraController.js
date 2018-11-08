const Sismo = require('./model/sismo');

function insertSismo(sismo) {

    Sismo.findOne({id: sismo.id}, (err, sismo_encontrado) => {
        if (err) {
            return false;
        } else {
            if (!sismo_encontrado) {
                const sismoGuardar = new Sismo();

                sismoGuardar.id = sismo.id;
                sismoGuardar.horaLocal = sismo.horaLocal;
                sismoGuardar.horaUtc = sismo.horaUtc;
                sismoGuardar.latitud = sismo.latitud;
                sismoGuardar.longitud = sismo.longitud;
                sismoGuardar.profundidad = sismo.profundidad;
                sismoGuardar.geoReferencia = sismo.geoReferencia;
                sismoGuardar.imagen = sismo.imagen;
                sismoGuardar.magnitudes = sismo.magnitudes;

                sismoGuardar.save((err, sismo_guardado) => {
                    return !err;
                })
            } else {
                if (!containsObject(sismo.magnitudes[0], sismo_encontrado.magnitudes)) {
                    Sismo.updateOne(
                        {id: sismo.id},
                        {$push: {magnitudes: sismo.magnitudes[0]}},
                        function (error, datoModificado) {
                            return !error;
                        }
                    );
                } else {
                    return true;
                }
            }
        }
    });
}

function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].magnitud === obj.magnitud) {
            return true;
        }
    }

    return false;
}

module.exports = {
    insertSismo,
};