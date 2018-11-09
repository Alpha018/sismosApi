const request = require('request');
const tabletojson = require('tabletojson');
const textVersion = require('textversionjs');
const sismoController = require('./server/sismosIntraController');
const format = require('date-format');

function getData() {
    tabletojson.convertUrl('http://www.sismologia.cl/links/tabla.html', {
            stripHtmlFromCells: false
        }, function (tablesAsJson) {

            for (let i = 0; i < tablesAsJson[0].length; i++) {
                const styleConfig = {
                    linkProcess: function (href, linkText) {
                        return JSON.stringify({href: href, horaLocal: linkText});
                    }
                };
                const data = JSON.parse(textVersion(tablesAsJson[0][i]['Fecha Local'], styleConfig));

                request(`http://www.sismologia.cl${data.href}`, function (error, response, body) {

                    const converted = tabletojson.convert(body);
                    let m, urls = [],
                        rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

                    while (m = rex.exec(body)) {
                        urls.push(m[1]);
                    }

                    let salida = {
                        id: '',
                        horaLocal: '',
                        horaUtc: '',
                        latitud: '',
                        longitud: '',
                        profundidad: '',
                        geoReferencia: '',
                        imagen: '',
                        localDate: '',
                        magnitudes: []
                    };

                    const id = format.parse('hh:mm:ss dd/MM/yyyy', converted[0][0]['1']).href.split('/');
                    salida.id = id[id.length - 1].replace('.html', '');
                    salida.enlace = `http://www.sismologia.cl${format.parse('hh:mm:ss dd/MM/yyyy', converted[0][0]['1']).href}`;
                    salida.horaLocal = converted[0][0]['1'];
                    salida.horaUtc = converted[0][1]['1'];
                    salida.latitud = converted[0][2]['1'];
                    salida.longitud = converted[0][3]['1'];
                    salida.profundidad = converted[0][4]['1'];
                    salida.geoReferencia = converted[0][6]['1'];

                    const aux = converted[0][0]['1'].split(' ');
                    const date = aux[1].split('/');
                    const fecha = moment(aux[0] + " " + date[1] + "/" + date[0] + "/" + date[2]).toDate();

                    salida.localDate = fecha;
                    salida.imagen = `http://www.sismologia.cl${urls[1]}`;

                    const mag = converted[0][5]['1'].split(' ');
                    const dataMagnitud = {
                        magnitud: mag[0],
                        medida: mag[1],
                        fuente: mag[2],
                        fechaIngreso: new Date()
                    };

                    salida.magnitudes.push(dataMagnitud);
                    sismoController.insertSismo(salida);

                });

            }

        }
    );
}

module.exports = {
    getData,
};