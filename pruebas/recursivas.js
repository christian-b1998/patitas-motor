const ListaEnlazada = require('../src/estructuras/ListaEnlazada');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

function iguales(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function crearHistorial(atenciones) {
    const lista = new ListaEnlazada();
    for (const atencion of atenciones) {
        lista.agregarAlFinal(atencion);
    }
    return lista;
}

function contarConCiclo(lista) {
    let cantidad = 0;
    let actual = lista.cabeza;
    while (actual !== null) {
        cantidad++;
        actual = actual.siguiente;
    }
    return cantidad;
}

const lola = crearHistorial([
    { fecha: '02/02', motivo: 'Vacunación anual', veterinario: 'Dra. Ríos', costo: 85000 },
    { fecha: '15/03', motivo: 'Control de peso', veterinario: 'Dr. Gómez', costo: 40000 },
    { fecha: '20/05', motivo: 'Limpieza dental', veterinario: 'Dra. Ríos', costo: 150000 }
]);
const toby = crearHistorial([
    { fecha: '10/01', motivo: 'Consulta por cojera', veterinario: 'Dr. Gómez', costo: 60000 },
    { fecha: '12/01', motivo: 'Radiografía de pata', veterinario: 'Dr. Gómez', costo: 120000 },
    { fecha: '05/04', motivo: 'Vacunación anual', veterinario: 'Dra. Ríos', costo: 85000 }
]);
const mia = crearHistorial([
    { fecha: '18/02', motivo: 'Esterilización', veterinario: 'Dra. Ríos', costo: 280000 },
    { fecha: '25/02', motivo: 'Control posquirúrgico', veterinario: 'Dra. Ríos', costo: 0 }
]);
const historiales = [['Lola', lola, 3, 275000], ['Toby', toby, 3, 265000], ['Mía', mia, 2, 280000]];

console.log('Caso 1: tamanioRecursivo es igual a la versión iterativa');
for (const [nombre, lista, cantidad] of historiales) {
    verificar(nombre + ': ' + cantidad + ' atenciones', lista.tamanioRecursivo() === lista.obtenerTamanio() && lista.tamanioRecursivo() === contarConCiclo(lista) && lista.tamanioRecursivo() === cantidad);
}

console.log('Caso 2: costoTotalRecursivo es igual a la versión iterativa');
for (const [nombre, lista, cantidad, costo] of historiales) {
    verificar(nombre + ': costo total ' + costo, lista.costoTotalRecursivo() === lista.costoTotal() && lista.costoTotalRecursivo() === costo);
}

console.log('Caso 3: buscarRecursivo es igual a buscar');
const esVacuna = atencion => atencion.motivo.includes('Vacunación');
const noExiste = atencion => atencion.motivo === 'Peluquería';
verificar('Lola: devuelve la misma vacunación', lola.buscarRecursivo(esVacuna) === lola.buscar(esVacuna) && lola.buscarRecursivo(esVacuna).fecha === '02/02');
verificar('Toby: devuelve la misma vacunación', toby.buscarRecursivo(esVacuna) === toby.buscar(esVacuna) && toby.buscarRecursivo(esVacuna).fecha === '05/04');
verificar('Mía: ambas devuelven null (sin vacunación)', mia.buscarRecursivo(esVacuna) === null && mia.buscar(esVacuna) === null);
verificar('algo que no existe: ambas devuelven null', lola.buscarRecursivo(noExiste) === null && lola.buscar(noExiste) === null);

console.log('Caso 4: imprimirAlReves va de la más reciente a la más antigua');
for (const [nombre, lista] of historiales) {
    const recogidas = [];
    lista.imprimirAlReves(atencion => recogidas.push(atencion.fecha));
    const esperado = lista.aArreglo().map(a => a.fecha).reverse();
    verificar(nombre + ': ' + recogidas.join(', '), iguales(recogidas, esperado));
}

console.log('Caso 5: lista vacía');
const vacia = new ListaEnlazada();
const recogidasVacia = [];
vacia.imprimirAlReves(dato => recogidasVacia.push(dato));
verificar('tamanioRecursivo devuelve 0', vacia.tamanioRecursivo() === 0);
verificar('costoTotalRecursivo devuelve 0', vacia.costoTotalRecursivo() === 0);
verificar('buscarRecursivo devuelve null', vacia.buscarRecursivo(esVacuna) === null);
verificar('imprimirAlReves no muestra nada y no falla', recogidasVacia.length === 0);

console.log('Historial de Lola, de la atención más reciente a la más antigua:');
lola.imprimirAlReves(atencion => {
    console.log('   ' + atencion.fecha + ' - ' + atencion.motivo + ' - ' + atencion.veterinario + ' - $' + atencion.costo.toLocaleString('es-CO'));
});