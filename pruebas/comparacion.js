const Cola = require('../src/Cola');

const N = 100000;

function crearTurno(i) {
    return { mascota: 'Mascota' + i, tutor: 'Tutor' + i, horaLlegada: '08:00', motivo: 'Consulta' };
}

console.log('Turnos: ' + N);

const cola = new Cola();
console.time('Cola: encolar');
for (let i = 0; i < N; i++) {
    cola.encolar(crearTurno(i));
}
console.timeEnd('Cola: encolar');

console.time('Cola: desencolar');
while (!cola.estaVacia()) {
    cola.desencolar();
}
console.timeEnd('Cola: desencolar');

const arreglo = [];
console.time('Arreglo: push');
for (let i = 0; i < N; i++) {
    arreglo.push(crearTurno(i));
}
console.timeEnd('Arreglo: push');

console.time('Arreglo: shift');
while (arreglo.length > 0) {
    arreglo.shift();
}
console.timeEnd('Arreglo: shift');