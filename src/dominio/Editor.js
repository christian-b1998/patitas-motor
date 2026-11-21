const Pila = require('../estructuras/Pila');

class Editor {
    constructor(registro) {
        this.registro = registro;
        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
    }

    agregar(mascota, atencion) {
        const accion = { tipo: 'agregar', mascota: mascota, atencion: atencion };
        this.aplicar(accion);
        this.pilaDeshacer.apilar(accion);
        this.pilaRehacer = new Pila();
    }

    eliminar(mascota, condicion) {
        const historial = this.registro.obtenerHistorial(mascota);
        if (historial === null) {
            return null;
        }

        let previo = null;
        let encontrado = false;
        historial.recorrer(dato => {
            if (!encontrado) {
                if (condicion(dato)) {
                    encontrado = true;
                } else {
                    previo = dato;
                }
            }
        });

        const atencion = historial.eliminar(condicion);
        if (atencion === null) {
            return null;
        }

        this.pilaDeshacer.apilar({ tipo: 'eliminar', mascota: mascota, atencion: atencion, despuesDe: previo });
        this.pilaRehacer = new Pila();
        return atencion;
    }

    deshacer() {
        const accion = this.pilaDeshacer.desapilar();
        if (accion === null) {
            return false;
        }
        this.revertir(accion);
        this.pilaRehacer.apilar(accion);
        return true;
    }

    rehacer() {
        const accion = this.pilaRehacer.desapilar();
        if (accion === null) {
            return false;
        }
        this.aplicar(accion);
        this.pilaDeshacer.apilar(accion);
        return true;
    }

    aplicar(accion) {
        if (accion.tipo === 'agregar') {
            this.registro.registrarAtencion(accion.mascota, accion.atencion);
        } else {
            const historial = this.registro.obtenerHistorial(accion.mascota);
            historial.eliminar(dato => dato === accion.atencion);
        }
    }

    revertir(accion) {
        const historial = this.registro.obtenerHistorial(accion.mascota);
        if (accion.tipo === 'agregar') {
            historial.eliminar(dato => dato === accion.atencion);
        } else if (accion.despuesDe === null) {
            historial.agregarAlInicio(accion.atencion);
        } else {
            historial.insertarDespuesDe(dato => dato === accion.despuesDe, accion.atencion);
        }
    }
}

module.exports = Editor;