const {
    catalogo,
    buscarServicio,
    rutaDeServicio,
    precioPaquete,
    serviciosEnRango
} = require('../src/dominio/catalogo');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

function iguales(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

const consultas = catalogo.subcategorias[0];
const especializada = consultas.subcategorias[0];
const cirugias = catalogo.subcategorias[1];
const vacunas = catalogo.subcategorias[2];
const vacia = { nombre: 'Vacía', servicios: [], subcategorias: [] };

console.log('Caso 1: buscarServicio');
verificar('primer nivel: Rabia', iguales(buscarServicio(catalogo, 'Rabia'), { nombre: 'Rabia', precio: 45000 }));
verificar('nivel más profundo: Dermatología', buscarServicio(catalogo, 'Dermatología').precio === 110000);
verificar('que no existe: Peluquería devuelve null', buscarServicio(catalogo, 'Peluquería') === null);
verificar('en una categoría vacía devuelve null', buscarServicio(vacia, 'Rabia') === null);
verificar('buscando solo dentro de Cirugías no encuentra Rabia', buscarServicio(cirugias, 'Rabia') === null);

console.log('Caso 2: buscarServicio se detiene al encontrar');
const trampa = {
    nombre: 'Trampa',
    get servicios() { throw new Error('se siguió buscando después de encontrar'); },
    subcategorias: []
};
const conTrampa = {
    nombre: 'Raíz',
    servicios: [],
    subcategorias: [
        { nombre: 'A', servicios: [{ nombre: 'Buscado', precio: 1 }], subcategorias: [] },
        trampa
    ]
};
let resultado = null;
let error = null;
try {
    resultado = buscarServicio(conTrampa, 'Buscado');
} catch (e) {
    error = e;
}
verificar('encuentra el servicio', resultado !== null && resultado.nombre === 'Buscado');
verificar('no revisa la categoría que viene después', error === null);

console.log('Caso 3: rutaDeServicio');
verificar('Gata', iguales(rutaDeServicio(catalogo, 'Gata'), ['Patitas', 'Cirugías', 'Esterilización', 'Gata']));
verificar('primer nivel: Rabia', iguales(rutaDeServicio(catalogo, 'Rabia'), ['Patitas', 'Vacunas', 'Rabia']));
verificar('nivel más profundo: Dermatología', iguales(rutaDeServicio(catalogo, 'Dermatología'), ['Patitas', 'Consultas', 'Especializada', 'Dermatología']));
verificar('que no existe: Peluquería devuelve null', rutaDeServicio(catalogo, 'Peluquería') === null);
verificar('la ruta empieza en la categoría que se le pasa', iguales(rutaDeServicio(cirugias, 'Gata'), ['Cirugías', 'Esterilización', 'Gata']));
verificar('en una categoría vacía devuelve null', rutaDeServicio(vacia, 'Gata') === null);

console.log('Caso 4: precioPaquete');
verificar('Cirugías: 780.000 con 10 % de descuento son 702.000', precioPaquete(cirugias) === 702000);
verificar('primer nivel, Vacunas: 130.000 queda en 117.000', precioPaquete(vacunas) === 117000);
verificar('nivel más profundo, Especializada: 240.000 queda en 216.000', precioPaquete(especializada) === 216000);
verificar('todo el catálogo: 1.300.000 queda en 1.170.000', precioPaquete(catalogo) === 1170000);
verificar('categoría vacía: 0', precioPaquete(vacia) === 0);

console.log('Caso 5: serviciosEnRango');
const enRango = serviciosEnRango(catalogo, 80000, 150000);
const nombres = enRango.map(s => s.nombre);
verificar('entre 80.000 y 150.000 hay cinco servicios', enRango.length === 5);
verificar('son Consulta a domicilio, Dermatología, Cardiología, Con anestesia y Triple felina',
    iguales(nombres, ['Consulta a domicilio', 'Dermatología', 'Cardiología', 'Con anestesia', 'Triple felina']));
verificar('los límites cuentan: 150.000 (Con anestesia) está incluido', nombres.includes('Con anestesia'));
verificar('rango que solo tiene a Rabia', iguales(serviciosEnRango(catalogo, 0, 50000).map(s => s.nombre), ['Rabia']));
verificar('rango sin servicios devuelve []', iguales(serviciosEnRango(catalogo, 1000000, 2000000), []));
verificar('solo dentro de Especializada', iguales(serviciosEnRango(especializada, 100000, 120000).map(s => s.nombre), ['Dermatología']));
verificar('en una categoría vacía devuelve []', iguales(serviciosEnRango(vacia, 0, 999999), []));