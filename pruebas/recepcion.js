const Recepcion = require('../src/dominio/Recepcion');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

function turno(mascota, tipo) {
    return { mascota: mascota, tipo: tipo, motivo: 'prueba', llegada: 0 };
}

console.log('Caso 1: sala vacía');
const vacia = new Recepcion();
verificar('llamarSiguiente devuelve null', vacia.llamarSiguiente() === null);
verificar('urgencias sigue vacía', vacia.urgencias.estaVacia());
verificar('generales sigue vacía', vacia.generales.estaVacia());

console.log('Caso 2: registrarLlegada manda cada turno a su cola');
const r2 = new Recepcion();
r2.registrarLlegada(turno('Toby', 'General'));
r2.registrarLlegada(turno('Luna', 'Urgencia'));
verificar('urgencias tiene 1', r2.urgencias.tamanio() === 1);
verificar('generales tiene 1', r2.generales.tamanio() === 1);

console.log('Caso 3: las urgencias salen antes que las generales');
const r3 = new Recepcion();
r3.registrarLlegada(turno('Toby', 'General'));
r3.registrarLlegada(turno('Max', 'General'));
r3.registrarLlegada(turno('Luna', 'Urgencia'));
verificar('primero Luna', r3.llamarSiguiente().mascota === 'Luna');
verificar('luego Toby', r3.llamarSiguiente().mascota === 'Toby');
verificar('luego Max', r3.llamarSiguiente().mascota === 'Max');

console.log('Caso 4: orden de llegada dentro de cada tipo');
const r4 = new Recepcion();
r4.registrarLlegada(turno('G1', 'General'));
r4.registrarLlegada(turno('U1', 'Urgencia'));
r4.registrarLlegada(turno('G2', 'General'));
r4.registrarLlegada(turno('U2', 'Urgencia'));
const orden = [];
let siguiente = r4.llamarSiguiente();
while (siguiente !== null) {
    orden.push(siguiente.mascota);
    siguiente = r4.llamarSiguiente();
}
verificar('orden: U1, U2, G1, G2', JSON.stringify(orden) === JSON.stringify(['U1', 'U2', 'G1', 'G2']));

console.log('Caso 5: una urgencia nueva pasa por delante de las generales que esperan');
const r5 = new Recepcion();
r5.registrarLlegada(turno('G1', 'General'));
r5.registrarLlegada(turno('G2', 'General'));
verificar('sale G1', r5.llamarSiguiente().mascota === 'G1');
r5.registrarLlegada(turno('U1', 'Urgencia'));
verificar('sale U1 antes que G2', r5.llamarSiguiente().mascota === 'U1');
verificar('sale G2', r5.llamarSiguiente().mascota === 'G2');

console.log('Caso 6: al terminar, la sala queda vacía y llamar no falla');
verificar('llamarSiguiente devuelve null', r5.llamarSiguiente() === null);
verificar('urgencias vacía', r5.urgencias.estaVacia());
verificar('generales vacía', r5.generales.estaVacia());