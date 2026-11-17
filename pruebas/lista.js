const ListaEnlazada = require('../src/ListaEnlazada');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

function iguales(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

console.log('Caso 1: lista vacía + agregarAlFinal');
const lista1 = new ListaEnlazada();
lista1.agregarAlFinal('A');
verificar('aArreglo es [A]', iguales(lista1.aArreglo(), ['A']));
verificar('cabeza es A', lista1.cabeza.dato === 'A');
verificar('cola es A', lista1.cola.dato === 'A');
verificar('tamanio es 1', lista1.obtenerTamanio() === 1);
verificar('cabeza y cola son el mismo nodo', lista1.cabeza === lista1.cola);

console.log('Caso 2: lista vacía + agregarAlInicio');
const lista2 = new ListaEnlazada();
lista2.agregarAlInicio('A');
verificar('aArreglo es [A]', iguales(lista2.aArreglo(), ['A']));
verificar('cabeza es A', lista2.cabeza.dato === 'A');
verificar('cola es A', lista2.cola.dato === 'A');
verificar('tamanio es 1', lista2.obtenerTamanio() === 1);
verificar('cabeza y cola son el mismo nodo', lista2.cabeza === lista2.cola);

console.log('Caso 3: Un nodo + agregarAlFinal');
const lista3 = new ListaEnlazada();
lista3.agregarAlFinal('A');
lista3.agregarAlFinal('B');
verificar('aArreglo es [A, B]', iguales(lista3.aArreglo(), ['A', 'B']));
verificar('cabeza es A', lista3.cabeza.dato === 'A');
verificar('cola es B', lista3.cola.dato === 'B');
verificar('tamanio es 2', lista3.obtenerTamanio() === 2);
verificar('cabeza y cola son nodos diferentes', lista3.cabeza !== lista3.cola);

console.log('Caso 4: Un nodo + agregarAlInicio');
const lista4 = new ListaEnlazada();
lista4.agregarAlInicio('A');
lista4.agregarAlInicio('B');
verificar('aArreglo es [B, A]', iguales(lista4.aArreglo(), ['B', 'A']));
verificar('cabeza es B', lista4.cabeza.dato === 'B');
verificar('cola es A', lista4.cola.dato === 'A');
verificar('tamanio es 2', lista4.obtenerTamanio() === 2);
verificar('cabeza y cola son nodos diferentes', lista4.cabeza !== lista4.cola);

console.log('Caso 5: tres nodos + agregarAlFinal');
const lista5 = new ListaEnlazada();
lista5.agregarAlFinal('A');
lista5.agregarAlFinal('B');
lista5.agregarAlFinal('C');
lista5.agregarAlFinal('D');
verificar('aArreglo es [A, B, C, D]', iguales(lista5.aArreglo(), ['A', 'B', 'C', 'D']));
verificar('cabeza es A', lista5.cabeza.dato === 'A');
verificar('cola es D', lista5.cola.dato === 'D');
verificar('tamanio es 4', lista5.obtenerTamanio() === 4);
verificar('cabeza y cola son nodos diferentes', lista5.cabeza !== lista5.cola);

console.log('Caso 6: tres nodos + agregarAlInicio');
const lista6 = new ListaEnlazada();
lista6.agregarAlFinal('A');
lista6.agregarAlFinal('B');
lista6.agregarAlFinal('C');
lista6.agregarAlInicio('D');
verificar('aArreglo es [D, A, B, C]', iguales(lista6.aArreglo(), ['D', 'A', 'B', 'C']));
verificar('cabeza es D', lista6.cabeza.dato === 'D');
verificar('cola es C', lista6.cola.dato === 'C');
verificar('tamanio es 4', lista6.obtenerTamanio() === 4);
verificar('cabeza y cola son nodos diferentes', lista6.cabeza !== lista6.cola);