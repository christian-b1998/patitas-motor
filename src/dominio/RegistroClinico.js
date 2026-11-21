const ListaEnlazada = require('../estructuras/ListaEnlazada');

class RegistroClinico {
    constructor() {
        this.historiales = new Map();
    }

    registrarAtencion(mascota, atencion) {
        if (!this.historiales.has(mascota)) {
            this.historiales.set(mascota, new ListaEnlazada());
        }
        this.historiales.get(mascota).agregarAlFinal(atencion);
    }

    obtenerHistorial(mascota) {
        if (!this.historiales.has(mascota)) {
            return null;
        }
        return this.historiales.get(mascota);
    }

    obtenerMascotas() {
        return Array.from(this.historiales.keys());
    }
}

module.exports = RegistroClinico;