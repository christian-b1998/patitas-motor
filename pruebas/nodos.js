const Nodo = require('../src/estructuras/Nodo');

const atencion1 = {
    fecha: '02/02',
    motivo: 'vacunación',
    veterinario: 'Dra. Ríos',
    costo: 85000
};

const atencion2 = {
    fecha: '15/03',
    motivo: 'control de peso',
    veterinario: 'Dr. Gómez',
    costo: 40000
};

const atencion3 = {
    fecha: '20/05',
    motivo: 'limpieza dental',
    veterinario: 'Dra. Ríos',
    costo: 150000
};

const nodo1 = new Nodo(atencion1);
const nodo2 = new Nodo(atencion2);
const nodo3 = new Nodo(atencion3);

nodo1.siguiente = nodo2;
nodo2.siguiente = nodo3;

const cabeza = nodo1;

let actual = cabeza;

while (actual !== null) {
    console.log(actual.dato);
    actual = actual.siguiente;
}

let total = 0;

actual = cabeza;

while (actual !== null) {
    total += actual.dato.costo;
    actual = actual.siguiente;
}

console.log('Costo total:', total);