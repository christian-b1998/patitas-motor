const Nodo = require('./Nodo');

class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    }

    agregarAlFinal(dato) {
        const nuevoNodo = new Nodo(dato);
        if (this.estaVacia()) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            this.cola.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }
        this.tamanio++;
    }

    agregarAlInicio(dato) {
        const nuevoNodo = new Nodo(dato);
        if (this.estaVacia()) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza = nuevoNodo;
        }
        this.tamanio++;
    }

    recorrer(callback) {
        let actual = this.cabeza;
        while (actual !== null) {
            callback(actual.dato);
            actual = actual.siguiente;
        }   
    }

    aArreglo() {
        const resultado = [];
        this.recorrer(  dato => {
            resultado.push(dato);
        });
        return resultado;
    }

    estaVacia() {
        return this.cabeza === null;
    }

    obtenerTamanio() {
        return this.tamanio;
    }
}

module.exports = ListaEnlazada;