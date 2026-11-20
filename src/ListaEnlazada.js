const Nodo = require('./Nodo');

function contarDesde(nodo) {
    if (nodo === null) {
        return 0;
    }
    return 1 + contarDesde(nodo.siguiente);
}

function sumarCostosDesde(nodo) {
    if (nodo === null) {
        return 0;
    }
    return nodo.dato.costo + sumarCostosDesde(nodo.siguiente);
}

function buscarDesde(nodo, condicion) {
    if (nodo === null) {
        return null;
    }
    if (condicion(nodo.dato)) {
        return nodo.dato;
    }
    return buscarDesde(nodo.siguiente, condicion);
}

function imprimirAlRevesDesde(nodo, mostrar) {
    if (nodo === null) {
        return;
    }
    imprimirAlRevesDesde(nodo.siguiente, mostrar);
    mostrar(nodo.dato);
}

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
        this.recorrer(dato => {
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

    costoTotal() {
        let total = 0;
        let actual = this.cabeza;
        while (actual !== null) {
            total += actual.dato.costo;
            actual = actual.siguiente;
        }
        return total;
    }

    tamanioRecursivo() {
        return contarDesde(this.cabeza);
    }

    costoTotalRecursivo() {
        return sumarCostosDesde(this.cabeza);
    }

    buscarRecursivo(condicion) {
        return buscarDesde(this.cabeza, condicion);
    }

    imprimirAlReves(mostrar = dato => console.log(dato)) {
        imprimirAlRevesDesde(this.cabeza, mostrar);
    }
}

module.exports = ListaEnlazada;