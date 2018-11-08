const Sismo = require('./model/sismo');

function insertSismo(sismo) {

    Sismo.findOne({id: sismo.id}, (err, sismo_encontrado) => {
        if (err) {
            console.log('Error en la base de datos');
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
                    if (err) {
                        console.log('Error al guardar un sismo');
                        return false;
                    } else {
                        console.log('Sismo guardado correctamente');
                        return true;
                    }
                })
            } else {
                if (!containsObject(sismo.magnitudes[0], sismo_encontrado.magnitudes)) {
                    Sismo.update(
                        { id: sismo.id },
                        { $push: { magnitudes: sismo.magnitudes[0] } },
                        function (error, datoModificado) {
                            if (error) {
                                console.log('Error al pushear una magnitud');
                                return false;
                            } else {
                                console.log('dato pusheado');
                                return true;
                            }
                        }
                    );
                } else {
                    console.log('Ya existe la magnitud dada');
                    return true;
                }
            }
        }
    });
}

function containsObject(obj, list) {
    let x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }

    return false;
}

module.exports = {
    insertSismo,
};