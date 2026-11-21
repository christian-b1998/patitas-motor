const Nodo = require('./Nodo');

class Cola {
    constructor() {
        this.frente = null;
        this.final = null;
        this.cantidad = 0;
    }

    encolar(dato) {
        const nuevoNodo = new Nodo(dato);
        if (this.estaVacia()) {
            this.frente = nuevoNodo;
        } else {
            this.final.siguiente = nuevoNodo;
        }
        this.final = nuevoNodo;
        this.cantidad++;
    }

    desencolar() {
        if (this.estaVacia()) {
            return null;
        }
        const nodoAtendido = this.frente;
        this.frente = nodoAtendido.siguiente;
        if (this.frente === null) {
            this.final = null;
        }
        nodoAtendido.siguiente = null;
        this.cantidad--;
        return nodoAtendido.dato;
    }

    verFrente() {
        if (this.estaVacia()) {
            return null;
        }
        return this.frente.dato;
    }

    estaVacia() {
        return this.frente === null;
    }

    tamanio() {
        return this.cantidad;
    }
}

module.exports = Cola;