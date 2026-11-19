const Pila = require('../src/Pila');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

console.log('Caso 1: pila vacía');
const pila = new Pila();
verificar('estaVacia es true', pila.estaVacia() === true);
verificar('tamanio es 0', pila.tamanio() === 0);
verificar('verTope devuelve null', pila.verTope() === null);
verificar('desapilar devuelve null', pila.desapilar() === null);
verificar('tope es null', pila.tope === null);

console.log('Caso 2: apilar');
pila.apilar('A');
pila.apilar('B');
pila.apilar('C');
verificar('tamanio es 3', pila.tamanio() === 3);
verificar('verTope es C', pila.verTope() === 'C');
verificar('verTope no saca nada', pila.tamanio() === 3);
verificar('estaVacia es false', pila.estaVacia() === false);

console.log('Caso 3: desapilar sale en orden inverso (LIFO)');
verificar('sale C', pila.desapilar() === 'C');
verificar('sale B', pila.desapilar() === 'B');
verificar('sale A', pila.desapilar() === 'A');

console.log('Caso 4: pila vaciada queda en estado válido');
verificar('estaVacia es true', pila.estaVacia() === true);
verificar('tamanio es 0', pila.tamanio() === 0);
verificar('tope es null', pila.tope === null);
verificar('desapilar devuelve null', pila.desapilar() === null);

console.log('Caso 5: se puede volver a usar');
pila.apilar('X');
verificar('verTope es X', pila.verTope() === 'X');
verificar('tamanio es 1', pila.tamanio() === 1);