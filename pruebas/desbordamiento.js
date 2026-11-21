const ListaEnlazada = require('../src/estructuras/ListaEnlazada');

function crearLista(cantidad) {
    const lista = new ListaEnlazada();
    for (let i = 0; i < cantidad; i++) {
        lista.agregarAlFinal({ fecha: '01/01', motivo: 'Consulta ' + i, veterinario: 'Dra. Ríos', costo: 1000 });
    }
    return lista;
}

function probarRecursivo(lista) {
    try {
        return 'resultado ' + lista.tamanioRecursivo();
    } catch (error) {
        return error.name + ': ' + error.message;
    }
}

const N = 100000;
const grande = crearLista(N);

console.log('Lista con ' + N + ' atenciones');
console.log('Versión iterativa, costoTotal: ' + grande.costoTotal());
console.log('Versión iterativa, tamaño: ' + grande.obtenerTamanio());
console.log('Versión recursiva, tamanioRecursivo: ' + probarRecursivo(grande));

console.log('');
console.log('Hasta qué tamaño aguanta la versión recursiva en este equipo:');
const tamanios = [1000, 5000, 8000, 10000, 12000, 15000, 20000, 50000];
for (const tamanio of tamanios) {
    console.log(String(tamanio).padStart(6) + ' atenciones: ' + probarRecursivo(crearLista(tamanio)));
}