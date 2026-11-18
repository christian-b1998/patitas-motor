const Recepcion = require('./Recepcion');

const DURACION = 20;

function aMinutos(hora) {
    const partes = hora.split(':');
    return Number(partes[0]) * 60 + Number(partes[1]);
}

function aHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const resto = minutos % 60;
    return String(horas).padStart(2, '0') + ':' + String(resto).padStart(2, '0');
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
const atenciones = [];
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
        atenciones.push({ turno: turno, inicio: reloj, espera: reloj - turno.llegada });
        reloj += DURACION;
    }
}

let sumaUrgencias = 0;
let cantidadUrgencias = 0;
let sumaGenerales = 0;
let cantidadGenerales = 0;

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