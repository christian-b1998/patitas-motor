const Nodo = require('../src/estructuras/Nodo');
const ListaEnlazada = require('../src/estructuras/ListaEnlazada');
const Cola = require('../src/estructuras/Cola');
const Pila = require('../src/estructuras/Pila');
const RegistroClinico = require('../src/dominio/RegistroClinico');
const Recepcion = require('../src/dominio/Recepcion');
const Editor = require('../src/dominio/Editor');
const { catalogo, contarServicios, profundidad, buscarServicio, rutaDeServicio, precioPaquete, serviciosEnRango } = require('../src/dominio/catalogo');
const { LLEGADAS_SABADO, simularManana, promedioEspera } = require('../src/dominio/simulacion');

let totalOk = 0;
let totalFalla = 0;

function verificar(descripcion, condicion) {
    if (condicion) {
        totalOk++;
    } else {
        totalFalla++;
    }
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

function iguales(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function turno(mascota, tipo) {
    return { mascota: mascota, tipo: tipo, motivo: 'prueba', llegada: 0 };
}

console.log('--- Nodo ---');
const nodoA = new Nodo('A');
verificar('normal: guarda el dato y su siguiente empieza en null', nodoA.dato === 'A' && nodoA.siguiente === null);
const nodoB = new Nodo('B');
nodoA.siguiente = nodoB;
verificar('normal: se enlaza con otro nodo', nodoA.siguiente === nodoB);
nodoA.siguiente = null;
verificar('borde: al perder el enlace, el nodo B queda inalcanzable desde A', nodoA.siguiente === null && nodoB.dato === 'B');

console.log('--- ListaEnlazada ---');
const lista = new ListaEnlazada();
lista.agregarAlFinal('B');
lista.agregarAlFinal('C');
lista.agregarAlInicio('A');
verificar('normal: agregar al inicio y al final deja [A, B, C]', iguales(lista.aArreglo(), ['A', 'B', 'C']));
verificar('normal: cabeza, cola y tamaño correctos', lista.cabeza.dato === 'A' && lista.cola.dato === 'C' && lista.obtenerTamanio() === 3);
verificar('normal: buscar encuentra el primero que cumple', lista.buscar(d => d === 'B') === 'B');
verificar('normal: insertar después de B', lista.insertarDespuesDe(d => d === 'B', 'X') === true && iguales(lista.aArreglo(), ['A', 'B', 'X', 'C']));
verificar('normal: eliminar la cola actualiza la cola', lista.eliminar(d => d === 'C') === 'C' && lista.cola.dato === 'X' && lista.cola.siguiente === null);
const vaciaLista = new ListaEnlazada();
verificar('borde: eliminar en lista vacía devuelve null', vaciaLista.eliminar(d => d === 'A') === null);
const unica = new ListaEnlazada();
unica.agregarAlFinal('A');
unica.eliminar(d => d === 'A');
verificar('borde: eliminar el único nodo deja cabeza y cola en null', unica.cabeza === null && unica.cola === null && unica.obtenerTamanio() === 0);
verificar('borde: buscar algo que no existe devuelve null', lista.buscar(d => d === 'Z') === null);
const conCostos = new ListaEnlazada();
conCostos.agregarAlFinal({ costo: 100 });
conCostos.agregarAlFinal({ costo: 250 });
verificar('normal: versiones recursivas coinciden con las iterativas', conCostos.tamanioRecursivo() === conCostos.obtenerTamanio() && conCostos.costoTotalRecursivo() === conCostos.costoTotal() && conCostos.costoTotal() === 350);
verificar('borde: las recursivas en lista vacía devuelven 0', vaciaLista.tamanioRecursivo() === 0 && vaciaLista.costoTotalRecursivo() === 0 && vaciaLista.buscarRecursivo(d => true) === null);
const alReves = [];
lista.imprimirAlReves(d => alReves.push(d));
verificar('normal: imprimirAlReves va de la última a la primera', iguales(alReves, ['X', 'B', 'A']));

console.log('--- Cola ---');
const cola = new Cola();
cola.encolar('A');
cola.encolar('B');
cola.encolar('C');
verificar('normal: verFrente no saca a nadie', cola.verFrente() === 'A' && cola.tamanio() === 3);
verificar('normal: sale en orden de llegada (FIFO)', cola.desencolar() === 'A' && cola.desencolar() === 'B' && cola.desencolar() === 'C');
verificar('borde: al vaciarse, frente y final quedan en null', cola.frente === null && cola.final === null && cola.estaVacia());
verificar('borde: desencolar en cola vacía devuelve null', cola.desencolar() === null);

console.log('--- Pila ---');
const pila = new Pila();
pila.apilar('A');
pila.apilar('B');
pila.apilar('C');
verificar('normal: verTope no saca nada', pila.verTope() === 'C' && pila.tamanio() === 3);
verificar('normal: sale en orden inverso (LIFO)', pila.desapilar() === 'C' && pila.desapilar() === 'B' && pila.desapilar() === 'A');
verificar('borde: al vaciarse, el tope queda en null', pila.tope === null && pila.estaVacia());
verificar('borde: desapilar en pila vacía devuelve null', pila.desapilar() === null);

console.log('--- RegistroClinico ---');
const registro = new RegistroClinico();
registro.registrarAtencion('Lola', { motivo: 'A' });
registro.registrarAtencion('Lola', { motivo: 'B' });
registro.registrarAtencion('Toby', { motivo: 'C' });
verificar('normal: guarda un historial por mascota', registro.obtenerHistorial('Lola').obtenerTamanio() === 2 && registro.obtenerHistorial('Toby').obtenerTamanio() === 1);
verificar('normal: obtenerMascotas devuelve los nombres en orden de registro', iguales(registro.obtenerMascotas(), ['Lola', 'Toby']));
verificar('borde: obtenerHistorial de una mascota desconocida devuelve null', registro.obtenerHistorial('Nala') === null);

console.log('--- Recepcion ---');
const recepcion = new Recepcion();
recepcion.registrarLlegada(turno('G1', 'General'));
recepcion.registrarLlegada(turno('G2', 'General'));
recepcion.registrarLlegada(turno('U1', 'Urgencia'));
verificar('normal: la urgencia sale primero', recepcion.llamarSiguiente().mascota === 'U1');
verificar('normal: las generales salen en orden de llegada', recepcion.llamarSiguiente().mascota === 'G1' && recepcion.llamarSiguiente().mascota === 'G2');
verificar('borde: llamar con la sala vacía devuelve null', recepcion.llamarSiguiente() === null);

console.log('--- Editor ---');
const editor = new Editor(new RegistroClinico());
const atA = { motivo: 'A' };
const atB = { motivo: 'B' };
editor.agregar('Lola', atA);
editor.agregar('Lola', atB);
editor.deshacer();
verificar('normal: deshacer quita la última atención', iguales(editor.registro.obtenerHistorial('Lola').aArreglo().map(a => a.motivo), ['A']));
editor.rehacer();
verificar('normal: rehacer la vuelve a poner', iguales(editor.registro.obtenerHistorial('Lola').aArreglo().map(a => a.motivo), ['A', 'B']));
editor.deshacer();
editor.agregar('Lola', { motivo: 'C' });
verificar('borde: una acción nueva vacía la pila de rehacer y rehacer no hace nada', editor.rehacer() === false && editor.pilaRehacer.estaVacia());
const editorVacio = new Editor(new RegistroClinico());
verificar('borde: deshacer y rehacer sin acciones no fallan', editorVacio.deshacer() === false && editorVacio.rehacer() === false);
const editorEliminar = new Editor(new RegistroClinico());
editorEliminar.agregar('Lola', { motivo: 'A' });
editorEliminar.agregar('Lola', { motivo: 'B' });
editorEliminar.agregar('Lola', { motivo: 'C' });
editorEliminar.eliminar('Lola', a => a.motivo === 'B');
editorEliminar.deshacer();
verificar('normal: deshacer una eliminación la deja en su lugar', iguales(editorEliminar.registro.obtenerHistorial('Lola').aArreglo().map(a => a.motivo), ['A', 'B', 'C']));

console.log('--- Catálogo (recursión) ---');
verificar('normal: contarServicios del catálogo original es 9', contarServicios(catalogo) === 9);
verificar('normal: profundidad del catálogo original es 3', profundidad(catalogo) === 3);
verificar('normal: ruta de Gata', iguales(rutaDeServicio(catalogo, 'Gata'), ['Patitas', 'Cirugías', 'Esterilización', 'Gata']));
verificar('normal: paquete de Cirugías con descuento es 702.000', precioPaquete(catalogo.subcategorias[1]) === 702000);
verificar('normal: serviciosEnRango entre 80.000 y 150.000 devuelve 5', serviciosEnRango(catalogo, 80000, 150000).length === 5);
verificar('borde: servicio que no existe devuelve null en búsqueda y ruta', buscarServicio(catalogo, 'Peluquería') === null && rutaDeServicio(catalogo, 'Peluquería') === null);
const categoriaVacia = { nombre: 'Vacía', servicios: [], subcategorias: [] };
verificar('borde: categoría vacía tiene 0 servicios, 1 nivel y paquete de 0', contarServicios(categoriaVacia) === 0 && profundidad(categoriaVacia) === 1 && precioPaquete(categoriaVacia) === 0);

console.log('--- Simulación ---');
const atenciones = simularManana(LLEGADAS_SABADO);
verificar('normal: orden de atención del sábado', iguales(atenciones.map(a => a.turno.mascota), ['Toby', 'Luna', 'Kira', 'Rocky', 'Max', 'Simón', 'Nala']));
verificar('normal: esperas de Luna, Kira y Max', atenciones[1].espera === 10 && atenciones[2].espera === 15 && atenciones[4].espera === 75);
verificar('normal: promedios 8,33 y 58,75', promedioEspera(atenciones, 'Urgencia').toFixed(2) === '8.33' && promedioEspera(atenciones, 'General').toFixed(2) === '58.75');
verificar('borde: sin llegadas la simulación devuelve una lista vacía', simularManana([]).length === 0);
verificar('borde: promedio sin atenciones de ese tipo es 0', promedioEspera([], 'Urgencia') === 0);

console.log('');
console.log('Resultado: ' + totalOk + ' OK, ' + totalFalla + ' FALLA');
if (totalFalla > 0) {
    process.exitCode = 1;
}