const {
    catalogo,
    contarServicios,
    listarCatalogo,
    profundidad,
    buscarServicio,
    rutaDeServicio,
    sumarPrecios,
    precioPaquete,
    serviciosEnRango
} = require('./src/dominio/catalogo');
const Recepcion = require('./src/dominio/Recepcion');
const RegistroClinico = require('./src/dominio/RegistroClinico');
const Editor = require('./src/dominio/Editor');
const { LLEGADAS_SABADO, aHora, simularManana, promedioEspera } = require('./src/dominio/simulacion');

function titulo(numero, texto) {
    console.log('');
    console.log('=== ' + numero + '. ' + texto + ' ===');
}

function pesos(valor) {
    return '$' + valor.toLocaleString('es-CO');
}

function crearAtencion(item) {
    return { hora: aHora(item.inicio), motivo: item.turno.motivo, tipo: item.turno.tipo };
}

function mostrarHistorial(editor, mascota) {
    const historial = editor.registro.obtenerHistorial(mascota);
    if (historial === null || historial.estaVacia()) {
        console.log('   Historial de ' + mascota + ': sin atenciones');
        return;
    }
    console.log('   Historial de ' + mascota + ':');
    historial.recorrer(registro => {
        console.log('      ' + registro.hora + ' - ' + registro.motivo + ' (' + registro.tipo + ')');
    });
}

function mostrarPilas(editor) {
    console.log('   Pila de deshacer: ' + editor.pilaDeshacer.tamanio() + ' acciones. Pila de rehacer: ' + editor.pilaRehacer.tamanio() + ' acciones.');
}

console.log('PATITAS MOTOR v1.0 - DEMOSTRACIÓN');

// 1. Catálogo
titulo(1, 'Catálogo de servicios');
listarCatalogo(catalogo);
console.log('');
console.log('Servicios en total: ' + contarServicios(catalogo) + '. Niveles de profundidad: ' + profundidad(catalogo) + '.');

// 2. Simulación de la mañana
titulo(2, 'Simulación de la mañana con urgencias');
const salaVacia = new Recepcion();
if (salaVacia.llamarSiguiente() === null) {
    console.log('Aviso: la sala de espera está vacía, no hay a quién llamar.');
}
console.log('');
const atenciones = simularManana(LLEGADAS_SABADO);
console.log('Mascota'.padEnd(8) + 'Tipo'.padEnd(10) + 'Llegada'.padEnd(9) + 'Atención'.padEnd(10) + 'Espera');
for (const item of atenciones) {
    console.log(
        item.turno.mascota.padEnd(8) +
        item.turno.tipo.padEnd(10) +
        aHora(item.turno.llegada).padEnd(9) +
        aHora(item.inicio).padEnd(10) +
        item.espera + ' min'
    );
}
console.log('');
console.log('Espera promedio urgencias: ' + promedioEspera(atenciones, 'Urgencia').toFixed(2) + ' min');
console.log('Espera promedio generales: ' + promedioEspera(atenciones, 'General').toFixed(2) + ' min');

// 3. Corrección con deshacer y rehacer
titulo(3, 'Corrección con deshacer y rehacer');
const editor = new Editor(new RegistroClinico());
editor.agregar(atenciones[0].turno.mascota, crearAtencion(atenciones[0]));
console.log('Se registra la atención de ' + atenciones[0].turno.mascota + ' en su historial.');

const luna = atenciones[1];
editor.agregar('Kira', crearAtencion(luna));
console.log('Error: la atención de Luna se registra en el historial de Kira.');
mostrarHistorial(editor, 'Kira');
mostrarPilas(editor);

editor.deshacer();
console.log('Deshacer: la atención sale del historial de Kira.');
mostrarHistorial(editor, 'Kira');
mostrarPilas(editor);

editor.rehacer();
console.log('Rehacer: la acción se vuelve a aplicar (todavía equivocada).');
mostrarHistorial(editor, 'Kira');
mostrarPilas(editor);

editor.deshacer();
console.log('Deshacer otra vez.');
mostrarPilas(editor);

editor.agregar('Luna', crearAtencion(luna));
console.log('Se registra la atención de Luna donde corresponde. Una acción nueva vacía la pila de rehacer.');
mostrarHistorial(editor, 'Luna');
mostrarPilas(editor);

const hizoAlgo = editor.rehacer();
console.log('Rehacer ahora no tiene efecto: ' + (hizoAlgo ? 'hizo algo' : 'no hace nada') + '.');

for (let i = 2; i < atenciones.length; i++) {
    editor.agregar(atenciones[i].turno.mascota, crearAtencion(atenciones[i]));
}

// 4. Historiales finales
titulo(4, 'Historiales finales');
let totalRegistradas = 0;
for (const item of atenciones) {
    const mascota = item.turno.mascota;
    mostrarHistorial(editor, mascota);
    totalRegistradas += editor.registro.obtenerHistorial(mascota).obtenerTamanio();
}
console.log('');
console.log('Atenciones registradas en los historiales: ' + totalRegistradas);

// 5. Búsqueda de un servicio
titulo(5, 'Búsqueda de un servicio, su ruta y el precio del paquete');
const gata = buscarServicio(catalogo, 'Gata');
console.log('Servicio: ' + gata.nombre + ', precio ' + pesos(gata.precio));
console.log('Ruta: ' + rutaDeServicio(catalogo, 'Gata').join(' > '));

const cirugias = catalogo.subcategorias.find(categoria => categoria.nombre === 'Cirugías');
console.log('Paquete completo de ' + cirugias.nombre + ': suma ' + pesos(sumarPrecios(cirugias)) + ', con 10 % de descuento ' + pesos(precioPaquete(cirugias)));

const enRango = serviciosEnRango(catalogo, 80000, 150000);
console.log('Servicios entre ' + pesos(80000) + ' y ' + pesos(150000) + ': ' + enRango.map(s => s.nombre).join(', '));

if (buscarServicio(catalogo, 'Peluquería') === null) {
    console.log('Peluquería no existe en el catálogo (ruta: ' + rutaDeServicio(catalogo, 'Peluquería') + ').');
}

console.log('');
console.log('Fin de la demostración.');