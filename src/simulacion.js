const RegistroClinico = require('./RegistroClinico');
const Recepcion = require('./Recepcion');
const Editor = require('./Editor');

const DURACION = 20;
const ERROR_SIMULADO = { mascota: 'Luna', registradaComo: 'Kira' };

function aMinutos(hora) {
    const partes = hora.split(':');
    return Number(partes[0]) * 60 + Number(partes[1]);
}

function aHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const resto = minutos % 60;
    return String(horas).padStart(2, '0') + ':' + String(resto).padStart(2, '0');
}

function llamarConAviso(recepcion) {
    const turno = recepcion.llamarSiguiente();
    if (turno === null) {
        console.log('Aviso: la sala de espera está vacía, no hay a quién llamar.');
    }
    return turno;
}

function registrarEnHistorial(editor, turno, fin) {
    const atencion = { hora: aHora(fin - DURACION), motivo: turno.motivo, tipo: turno.tipo };

    let destino = turno.mascota;
    if (turno.mascota === ERROR_SIMULADO.mascota) {
        destino = ERROR_SIMULADO.registradaComo;
        console.log(aHora(fin) + ' - La recepcionista registra la atención de ' + turno.mascota + ' en el historial de ' + destino + '.');
    }
    editor.agregar(destino, atencion);

    const ultima = editor.pilaDeshacer.verTope();
    if (ultima.mascota !== turno.mascota) {
        console.log(aHora(fin) + ' - Error detectado: la atención de ' + turno.mascota + ' quedó en el historial de ' + ultima.mascota + '. Se deshace.');
        editor.deshacer();
        editor.agregar(turno.mascota, atencion);
        console.log(aHora(fin) + ' - Corregido: la atención quedó en el historial de ' + turno.mascota + '.');
    }
}

const llegadas = [
    { mascota: 'Toby', tipo: 'General', motivo: 'Control de vacunas', llegada: aMinutos('8:00') },
    { mascota: 'Max', tipo: 'General', motivo: 'Revisión de piel', llegada: aMinutos('8:05') },
    { mascota: 'Luna', tipo: 'Urgencia', motivo: 'Intoxicación', llegada: aMinutos('8:10') },
    { mascota: 'Simón', tipo: 'General', motivo: 'Corte de uñas', llegada: aMinutos('8:20') },
    { mascota: 'Kira', tipo: 'Urgencia', motivo: 'Herida en pata', llegada: aMinutos('8:25') },
    { mascota: 'Nala', tipo: 'General', motivo: 'Desparasitación', llegada: aMinutos('8:40') },
    { mascota: 'Rocky', tipo: 'Urgencia', motivo: 'Dificultad para respirar', llegada: aMinutos('9:00') }
];

const recepcion = new Recepcion();
const editor = new Editor(new RegistroClinico());
const atenciones = [];

console.log('=== Apertura ===');
llamarConAviso(recepcion);

console.log('');
console.log('=== Mañana del sábado ===');
let reloj = llegadas[0].llegada;
let siguienteLlegada = 0;

while (atenciones.length < llegadas.length) {
    while (siguienteLlegada < llegadas.length && llegadas[siguienteLlegada].llegada <= reloj) {
        recepcion.registrarLlegada(llegadas[siguienteLlegada]);
        siguienteLlegada++;
    }

    const turno = recepcion.llamarSiguiente();
    if (turno === null) {
        reloj = llegadas[siguienteLlegada].llegada;
    } else {
        const inicio = reloj;
        reloj += DURACION;
        atenciones.push({ turno: turno, inicio: inicio, espera: inicio - turno.llegada });
        registrarEnHistorial(editor, turno, reloj);
    }
}

console.log('');
console.log('=== Fin de la mañana ===');
llamarConAviso(recepcion);

let sumaUrgencias = 0;
let cantidadUrgencias = 0;
let sumaGenerales = 0;
let cantidadGenerales = 0;

console.log('');
console.log('=== Reporte de atención ===');
console.log('Mascota'.padEnd(8) + 'Tipo'.padEnd(10) + 'Llegada'.padEnd(9) + 'Atención'.padEnd(10) + 'Espera');
for (const atencion of atenciones) {
    const turno = atencion.turno;
    console.log(
        turno.mascota.padEnd(8) +
        turno.tipo.padEnd(10) +
        aHora(turno.llegada).padEnd(9) +
        aHora(atencion.inicio).padEnd(10) +
        atencion.espera + ' min'
    );
    if (turno.tipo === 'Urgencia') {
        sumaUrgencias += atencion.espera;
        cantidadUrgencias++;
    } else {
        sumaGenerales += atencion.espera;
        cantidadGenerales++;
    }
}

console.log('');
console.log('Espera promedio urgencias: ' + (sumaUrgencias / cantidadUrgencias).toFixed(2) + ' min');
console.log('Espera promedio generales: ' + (sumaGenerales / cantidadGenerales).toFixed(2) + ' min');

console.log('');
console.log('=== Historiales actualizados ===');
let totalRegistradas = 0;
for (const atencion of atenciones) {
    const nombre = atencion.turno.mascota;
    const historial = editor.registro.obtenerHistorial(nombre);
    console.log(nombre + ':');
    historial.recorrer(registro => {
        console.log('   ' + registro.hora + ' - ' + registro.motivo + ' (' + registro.tipo + ')');
    });
    totalRegistradas += historial.obtenerTamanio();
}

console.log('');
console.log('Atenciones registradas en los historiales: ' + totalRegistradas);
console.log('Pila de deshacer: ' + editor.pilaDeshacer.tamanio() + ' acciones. Pila de rehacer: ' + editor.pilaRehacer.tamanio() + ' acciones.');