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

    buscar(condicion) {
        let actual = this.cabeza;
        while (actual !== null) {
            if (condicion(actual.dato)) {
                return actual.dato;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    insertarDespuesDe(condicion, dato) {
        let actual = this.cabeza;
        while (actual !== null && !condicion(actual.dato)) {
            actual = actual.siguiente;
        }
        if (actual === null) {
            return false;
        }
        const nuevoNodo = new Nodo(dato);
        nuevoNodo.siguiente = actual.siguiente;
        actual.siguiente = nuevoNodo;
        if (actual === this.cola) {
            this.cola = nuevoNodo;
        }
        this.tamanio++;
        return true;
    }

    eliminar(condicion) {
        let anterior = null;
        let actual = this.cabeza;
        while (actual !== null && !condicion(actual.dato)) {
            anterior = actual;
            actual = actual.siguiente;
        }
        if (actual === null) {
            return null;
        }
        if (anterior === null) {
            this.cabeza = actual.siguiente;
        } else {
            anterior.siguiente = actual.siguiente;
        }
        if (actual === this.cola) {
            this.cola = anterior;
        }
        actual.siguiente = null;
        this.tamanio--;
        return actual.dato;
    }
}

module.exports = ListaEnlazada;