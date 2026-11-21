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

const LLEGADAS_SABADO = [
    { mascota: 'Toby', tipo: 'General', motivo: 'Control de vacunas', llegada: aMinutos('8:00') },
    { mascota: 'Max', tipo: 'General', motivo: 'Revisión de piel', llegada: aMinutos('8:05') },
    { mascota: 'Luna', tipo: 'Urgencia', motivo: 'Intoxicación', llegada: aMinutos('8:10') },
    { mascota: 'Simón', tipo: 'General', motivo: 'Corte de uñas', llegada: aMinutos('8:20') },
    { mascota: 'Kira', tipo: 'Urgencia', motivo: 'Herida en pata', llegada: aMinutos('8:25') },
    { mascota: 'Nala', tipo: 'General', motivo: 'Desparasitación', llegada: aMinutos('8:40') },
    { mascota: 'Rocky', tipo: 'Urgencia', motivo: 'Dificultad para respirar', llegada: aMinutos('9:00') }
];

function simularManana(llegadas) {
    const atenciones = [];
    if (llegadas.length === 0) {
        return atenciones;
    }

    const recepcion = new Recepcion();
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
    return atenciones;
}

function promedioEspera(atenciones, tipo) {
    let suma = 0;
    let cantidad = 0;
    for (const atencion of atenciones) {
        if (atencion.turno.tipo === tipo) {
            suma += atencion.espera;
            cantidad++;
        }
    }
    if (cantidad === 0) {
        return 0;
    }
    return suma / cantidad;
}

module.exports = { DURACION, LLEGADAS_SABADO, aMinutos, aHora, simularManana, promedioEspera };