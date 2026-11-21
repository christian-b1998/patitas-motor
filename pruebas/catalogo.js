const { catalogo, contarServicios, listarCatalogo, profundidad } = require('../src/dominio/catalogo');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

const consultas = catalogo.subcategorias[0];
const especializada = consultas.subcategorias[0];
const cirugias = catalogo.subcategorias[1];
const vacunas = catalogo.subcategorias[2];

console.log('Caso 1: catálogo original, contarServicios');
verificar('todo el catálogo tiene 9 servicios', contarServicios(catalogo) === 9);
verificar('Consultas tiene 4 (2 propios + 2 de Especializada)', contarServicios(consultas) === 4);
verificar('Especializada tiene 2', contarServicios(especializada) === 2);
verificar('Cirugías tiene 3 (no tiene servicios propios, solo subcategorías)', contarServicios(cirugias) === 3);
verificar('Vacunas tiene 2', contarServicios(vacunas) === 2);

console.log('Caso 2: catálogo original, profundidad');
verificar('Patitas tiene 3 niveles', profundidad(catalogo) === 3);
verificar('Consultas tiene 2 niveles', profundidad(consultas) === 2);
verificar('Especializada tiene 1 nivel', profundidad(especializada) === 1);
verificar('Vacunas tiene 1 nivel', profundidad(vacunas) === 1);

console.log('Caso 3: catálogo original, listarCatalogo');
listarCatalogo(catalogo);

console.log('Caso 4: se agrega Oftalmología dentro de Especializada, sin cambiar las funciones');
especializada.subcategorias.push({
    nombre: 'Oftalmología',
    servicios: [{ nombre: 'Examen de la vista', precio: 95000 }],
    subcategorias: []
});
verificar('todo el catálogo ahora tiene 10 servicios', contarServicios(catalogo) === 10);
verificar('Consultas ahora tiene 5', contarServicios(consultas) === 5);
verificar('Especializada ahora tiene 3', contarServicios(especializada) === 3);
verificar('Cirugías y Vacunas no cambian', contarServicios(cirugias) === 3 && contarServicios(vacunas) === 2);
verificar('Patitas ahora tiene 4 niveles', profundidad(catalogo) === 4);
verificar('Consultas ahora tiene 3 niveles', profundidad(consultas) === 3);
verificar('Vacunas sigue con 1 nivel', profundidad(vacunas) === 1);

console.log('Caso 5: catálogo con Oftalmología, listarCatalogo');
listarCatalogo(catalogo);

console.log('Caso 6: una categoría sin servicios ni subcategorías');
const vacia = { nombre: 'Vacía', servicios: [], subcategorias: [] };
verificar('contarServicios devuelve 0', contarServicios(vacia) === 0);
verificar('profundidad devuelve 1', profundidad(vacia) === 1);
listarCatalogo(vacia);