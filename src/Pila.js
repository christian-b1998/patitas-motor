const Nodo = require('./Nodo');

class Pila {
    constructor() {
        this.tope = null;
        this.cantidad = 0;
    }

    apilar(dato) {
        const nuevoNodo = new Nodo(dato);
        nuevoNodo.siguiente = this.tope;
        this.tope = nuevoNodo;
        this.cantidad++;
    }

    desapilar() {
        if (this.estaVacia()) {
            return null;
        }
        const nodoRetirado = this.tope;
        this.tope = nodoRetirado.siguiente;
        nodoRetirado.siguiente = null;
        this.cantidad--;
        return nodoRetirado.dato;
    }

    verTope() {
        if (this.estaVacia()) {
            return null;
        }
        return this.tope.dato;
    }

    estaVacia() {
        return this.tope === null;
    }

    tamanio() {
        return this.cantidad;
    }
}

module.exports = Pila;