const ListaEnlazada = require('../src/ListaEnlazada');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

function iguales(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function construir(...datos) {
    const lista = new ListaEnlazada();
    for (const dato of datos) {
        lista.agregarAlFinal(dato);
    }
    return lista;
}

function verificarLista(lista, esperado) {
    verificar('aArreglo es [' + esperado.join(', ') + ']', iguales(lista.aArreglo(), esperado));
    verificar('tamanio es ' + esperado.length, lista.obtenerTamanio() === esperado.length);
    if (esperado.length === 0) {
        verificar('cabeza es null', lista.cabeza === null);
        verificar('cola es null', lista.cola === null);
    } else {
        verificar('cabeza es ' + esperado[0], lista.cabeza.dato === esperado[0]);
        verificar('cola es ' + esperado[esperado.length - 1], lista.cola.dato === esperado[esperado.length - 1]);
        verificar('cola.siguiente es null', lista.cola.siguiente === null);
    }
}

console.log('Borde 1: eliminar en lista vacía');
const l1 = new ListaEnlazada();
verificar('devuelve null', l1.eliminar(d => d === 'A') === null);
verificarLista(l1, []);

console.log('Borde 2: eliminar el único nodo');
const l2 = construir('A');
verificar('devuelve A', l2.eliminar(d => d === 'A') === 'A');
verificarLista(l2, []);

console.log('Borde 3: eliminar la cabeza');
const l3 = construir('A', 'B', 'C');
verificar('devuelve A', l3.eliminar(d => d === 'A') === 'A');
verificarLista(l3, ['B', 'C']);

console.log('Borde 4: eliminar la cola');
const l4 = construir('A', 'B', 'C');
verificar('devuelve C', l4.eliminar(d => d === 'C') === 'C');
verificarLista(l4, ['A', 'B']);

console.log('Borde 5: eliminar algo que no existe');
const l5 = construir('A', 'B', 'C');
verificar('devuelve null', l5.eliminar(d => d === 'Z') === null);
verificarLista(l5, ['A', 'B', 'C']);

console.log('Borde 6: insertar después de la cola');
const l6 = construir('A', 'B', 'C');
verificar('devuelve true', l6.insertarDespuesDe(d => d === 'C', 'D') === true);
verificarLista(l6, ['A', 'B', 'C', 'D']);

console.log('Extra: eliminar un nodo intermedio');
const l7 = construir('A', 'B', 'C');
verificar('devuelve B', l7.eliminar(d => d === 'B') === 'B');
verificarLista(l7, ['A', 'C']);

console.log('Extra: insertar en medio');
const l8 = construir('A', 'C');
verificar('devuelve true', l8.insertarDespuesDe(d => d === 'A', 'B') === true);
verificarLista(l8, ['A', 'B', 'C']);

console.log('Extra: insertar después de algo que no existe');
const l9 = construir('A', 'B');
verificar('devuelve false', l9.insertarDespuesDe(d => d === 'Z', 'X') === false);
verificarLista(l9, ['A', 'B']);

console.log('Extra: buscar');
const l10 = construir('A', 'B', 'A');
verificar('encuentra el primero que cumple', l10.buscar(d => d === 'B') === 'B');
verificar('no existe devuelve null', l10.buscar(d => d === 'Z') === null);
verificar('en lista vacía devuelve null', new ListaEnlazada().buscar(d => d === 'A') === null);
verificarLista(l10, ['A', 'B', 'A']);

console.log('Extra: con atenciones (objetos)');
const historial = new ListaEnlazada();
historial.agregarAlFinal({ fecha: '02/02', motivo: 'vacunación' });
historial.agregarAlFinal({ fecha: '15/03', motivo: 'control de peso' });
historial.agregarAlFinal({ fecha: '20/05', motivo: 'vacunación' });
const ultimaVacuna = historial.buscar(a => a.motivo === 'vacunación');
verificar('buscar devuelve la primera vacunación', ultimaVacuna.fecha === '02/02');
verificar('eliminar por fecha devuelve el objeto', historial.eliminar(a => a.fecha === '15/03').motivo === 'control de peso');
verificar('tamanio es 2', historial.obtenerTamanio() === 2);