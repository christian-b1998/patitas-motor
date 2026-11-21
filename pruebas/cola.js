const Cola = require('../src/estructuras/Cola');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

function iguales(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

const turnos = [
    { mascota: 'Lola', tutor: 'Ana Gómez', horaLlegada: '08:00', motivo: 'Vacunación anual' },
    { mascota: 'Toby', tutor: 'Carlos Ruiz', horaLlegada: '08:10', motivo: 'Consulta por cojera' },
    { mascota: 'Mía', tutor: 'Laura Pérez', horaLlegada: '08:15', motivo: 'Control posquirúrgico' },
    { mascota: 'Rocky', tutor: 'Pedro Mora', horaLlegada: '08:25', motivo: 'Desparasitación' },
    { mascota: 'Nala', tutor: 'Sofía Díaz', horaLlegada: '08:40', motivo: 'Limpieza dental' }
];

console.log('Caso 1: cola vacía');
const vacia = new Cola();
verificar('estaVacia es true', vacia.estaVacia() === true);
verificar('tamanio es 0', vacia.tamanio() === 0);
verificar('verFrente devuelve null', vacia.verFrente() === null);
verificar('desencolar devuelve null', vacia.desencolar() === null);
verificar('frente es null', vacia.frente === null);
verificar('final es null', vacia.final === null);
verificar('tamanio sigue en 0', vacia.tamanio() === 0);

console.log('Caso 2: encolar el primer turno');
const cola = new Cola();
cola.encolar(turnos[0]);
verificar('tamanio es 1', cola.tamanio() === 1);
verificar('frente es Lola', cola.frente.dato.mascota === 'Lola');
verificar('final es Lola', cola.final.dato.mascota === 'Lola');
verificar('frente y final son el mismo nodo', cola.frente === cola.final);

console.log('Caso 3: encolar los cinco turnos');
for (let i = 1; i < turnos.length; i++) {
    cola.encolar(turnos[i]);
}
verificar('tamanio es 5', cola.tamanio() === 5);
verificar('estaVacia es false', cola.estaVacia() === false);
verificar('frente es Lola', cola.frente.dato.mascota === 'Lola');
verificar('final es Nala', cola.final.dato.mascota === 'Nala');
verificar('final.siguiente es null', cola.final.siguiente === null);

console.log('Caso 4: verFrente no saca a nadie');
verificar('verFrente devuelve a Lola', cola.verFrente().mascota === 'Lola');
verificar('tamanio sigue en 5', cola.tamanio() === 5);

console.log('Caso 5: desencolar sale en orden de llegada (FIFO)');
const atendidos = [];
while (!cola.estaVacia()) {
    const turno = cola.desencolar();
    atendidos.push(turno.mascota);
}
verificar('orden: Lola, Toby, Mía, Rocky, Nala', iguales(atendidos, ['Lola', 'Toby', 'Mía', 'Rocky', 'Nala']));

console.log('Caso 6: cola vaciada queda en estado válido');
verificar('estaVacia es true', cola.estaVacia() === true);
verificar('tamanio es 0', cola.tamanio() === 0);
verificar('frente es null', cola.frente === null);
verificar('final es null', cola.final === null);
verificar('desencolar devuelve null', cola.desencolar() === null);

console.log('Caso 7: se puede volver a usar después de vaciarse');
cola.encolar(turnos[1]);
verificar('tamanio es 1', cola.tamanio() === 1);
verificar('frente es Toby', cola.frente.dato.mascota === 'Toby');
verificar('frente y final son el mismo nodo', cola.frente === cola.final);

console.log('Caso 8: desencolar de a uno actualiza el frente');
const c2 = new Cola();
c2.encolar(turnos[0]);
c2.encolar(turnos[1]);
c2.encolar(turnos[2]);
verificar('desencolar devuelve a Lola', c2.desencolar().mascota === 'Lola');
verificar('frente es Toby', c2.frente.dato.mascota === 'Toby');
verificar('final sigue siendo Mía', c2.final.dato.mascota === 'Mía');
verificar('tamanio es 2', c2.tamanio() === 2);