const RegistroClinico = require('./dominio/RegistroClinico');

function formatearCosto(costo) {
    return '$' + costo.toLocaleString('es-CO');
}

const registro = new RegistroClinico();

registro.registrarAtencion('Lola', { fecha: '02/02', motivo: 'Vacunación anual', veterinario: 'Dra. Ríos', costo: 85000 });
registro.registrarAtencion('Lola', { fecha: '15/03', motivo: 'Control de peso', veterinario: 'Dr. Gómez', costo: 40000 });
registro.registrarAtencion('Lola', { fecha: '20/05', motivo: 'Limpieza dental', veterinario: 'Dra. Ríos', costo: 150000 });

registro.registrarAtencion('Toby', { fecha: '10/01', motivo: 'Consulta por cojera', veterinario: 'Dr. Gómez', costo: 60000 });
registro.registrarAtencion('Toby', { fecha: '12/01', motivo: 'Radiografía de pata', veterinario: 'Dr. Gómez', costo: 120000 });
registro.registrarAtencion('Toby', { fecha: '05/04', motivo: 'Vacunación anual', veterinario: 'Dra. Ríos', costo: 85000 });

registro.registrarAtencion('Mía', { fecha: '18/02', motivo: 'Esterilización', veterinario: 'Dra. Ríos', costo: 280000 });
registro.registrarAtencion('Mía', { fecha: '25/02', motivo: 'Control posquirúrgico', veterinario: 'Dra. Ríos', costo: 0 });

for (const mascota of registro.obtenerMascotas()) {
    const historial = registro.obtenerHistorial(mascota);
    let total = 0;

    console.log('=== ' + mascota + ' ===');
    historial.recorrer(atencion => {
        console.log(atencion.fecha + ' - ' + atencion.motivo + ' - ' + atencion.veterinario + ' - ' + formatearCosto(atencion.costo));
        total += atencion.costo;
    });
    console.log('Atenciones: ' + historial.obtenerTamanio());
    console.log('Costo total: ' + formatearCosto(total));

    const vacuna = historial.buscar(atencion => atencion.motivo.includes('Vacunación'));
    if (vacuna === null) {
        console.log('Última vacunación: sin registro');
    } else {
        console.log('Última vacunación: ' + vacuna.fecha);
    }
    console.log('');
}