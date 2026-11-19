const RegistroClinico = require('../src/RegistroClinico');
const Editor = require('../src/Editor');

function verificar(descripcion, condicion) {
    console.log(condicion ? 'OK    ' : 'FALLA ', descripcion);
}

function iguales(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function describir(accion) {
    return accion.tipo + ' ' + accion.atencion.motivo;
}

function contenido(pila) {
    const textos = [];
    let actual = pila.tope;
    while (actual !== null) {
        textos.push(describir(actual.dato));
        actual = actual.siguiente;
    }
    return textos;
}

function motivos(editor, mascota) {
    const historial = editor.registro.obtenerHistorial(mascota);
    if (historial === null) {
        return [];
    }
    return historial.aArreglo().map(a => a.motivo);
}

function paso(titulo, editor, historialEsperado, deshacerEsperado, rehacerEsperado) {
    console.log(titulo);
    console.log('   historial: [' + motivos(editor, 'Lola').join(', ') + ']');
    console.log('   deshacer (tope primero): [' + contenido(editor.pilaDeshacer).join(', ') + ']');
    console.log('   rehacer (tope primero): [' + contenido(editor.pilaRehacer).join(', ') + ']');
    verificar('historial correcto', iguales(motivos(editor, 'Lola'), historialEsperado));
    verificar('pila deshacer correcta', iguales(contenido(editor.pilaDeshacer), deshacerEsperado));
    verificar('pila rehacer correcta', iguales(contenido(editor.pilaRehacer), rehacerEsperado));
    const historial = editor.registro.obtenerHistorial('Lola');
    if (historial !== null) {
        verificar('tamanio coincide', historial.obtenerTamanio() === historialEsperado.length);
        if (historialEsperado.length > 0) {
            verificar('cola.siguiente es null', historial.cola.siguiente === null);
        }
    }
}

const A = { motivo: 'A' };
const B = { motivo: 'B' };
const C = { motivo: 'C' };

console.log('=== Secuencia del reto ===');
const editor = new Editor(new RegistroClinico());

paso('Paso 0: estado inicial', editor, [], [], []);

editor.agregar('Lola', A);
paso('Paso 1: agregar A', editor, ['A'], ['agregar A'], []);

editor.agregar('Lola', B);
paso('Paso 2: agregar B', editor, ['A', 'B'], ['agregar B', 'agregar A'], []);

editor.eliminar('Lola', d => d.motivo === 'A');
paso('Paso 3: eliminar A', editor, ['B'], ['eliminar A', 'agregar B', 'agregar A'], []);

editor.deshacer();
paso('Paso 4: deshacer', editor, ['A', 'B'], ['agregar B', 'agregar A'], ['eliminar A']);

editor.deshacer();
paso('Paso 5: deshacer', editor, ['A'], ['agregar A'], ['agregar B', 'eliminar A']);

editor.rehacer();
paso('Paso 6: rehacer', editor, ['A', 'B'], ['agregar B', 'agregar A'], ['eliminar A']);

editor.agregar('Lola', C);
paso('Paso 7: agregar C', editor, ['A', 'B', 'C'], ['agregar C', 'agregar B', 'agregar A'], []);

const resultado = editor.rehacer();
paso('Paso 8: rehacer (no hace nada)', editor, ['A', 'B', 'C'], ['agregar C', 'agregar B', 'agregar A'], []);
verificar('rehacer devuelve false', resultado === false);

console.log('=== Pilas vacías ===');
const vacio = new Editor(new RegistroClinico());
verificar('deshacer sin acciones devuelve false', vacio.deshacer() === false);
verificar('rehacer sin acciones devuelve false', vacio.rehacer() === false);
verificar('pila deshacer sigue vacía', vacio.pilaDeshacer.estaVacia());
verificar('pila rehacer sigue vacía', vacio.pilaRehacer.estaVacia());

console.log('=== Eliminar algo que no existe ===');
const e2 = new Editor(new RegistroClinico());
e2.agregar('Lola', A);
e2.deshacer();
verificar('rehacer disponible antes', e2.pilaRehacer.tamanio() === 1);
verificar('eliminar inexistente devuelve null', e2.eliminar('Lola', d => d.motivo === 'Z') === null);
verificar('no apila ninguna acción', e2.pilaDeshacer.estaVacia());
verificar('no borra la pila de rehacer', e2.pilaRehacer.tamanio() === 1);
verificar('eliminar de mascota inexistente devuelve null', e2.eliminar('Toby', d => d.motivo === 'A') === null);

console.log('=== Deshacer vuelve a poner cada atención en su lugar ===');
function lista(editor) { return motivos(editor, 'Lola'); }

const e3 = new Editor(new RegistroClinico());
e3.agregar('Lola', A);
e3.agregar('Lola', B);
e3.agregar('Lola', C);
e3.eliminar('Lola', d => d.motivo === 'B');
verificar('sin B queda [A, C]', iguales(lista(e3), ['A', 'C']));
e3.deshacer();
verificar('deshacer eliminar intermedio vuelve a [A, B, C]', iguales(lista(e3), ['A', 'B', 'C']));
e3.eliminar('Lola', d => d.motivo === 'C');
verificar('sin C queda [A, B]', iguales(lista(e3), ['A', 'B']));
e3.deshacer();
verificar('deshacer eliminar cola vuelve a [A, B, C]', iguales(lista(e3), ['A', 'B', 'C']));
verificar('la cola es C', e3.registro.obtenerHistorial('Lola').cola.dato.motivo === 'C');
e3.eliminar('Lola', d => d.motivo === 'A');
e3.deshacer();
verificar('deshacer eliminar cabeza vuelve a [A, B, C]', iguales(lista(e3), ['A', 'B', 'C']));
verificar('la cabeza es A', e3.registro.obtenerHistorial('Lola').cabeza.dato.motivo === 'A');
e3.eliminar('Lola', d => d.motivo === 'A');
e3.eliminar('Lola', d => d.motivo === 'B');
e3.eliminar('Lola', d => d.motivo === 'C');
verificar('historial vacío', iguales(lista(e3), []));
e3.deshacer();
e3.deshacer();
e3.deshacer();
verificar('tres deshacer recuperan [A, B, C]', iguales(lista(e3), ['A', 'B', 'C']));
e3.rehacer();
e3.rehacer();
e3.rehacer();
verificar('tres rehacer vuelven a dejarlo vacío', iguales(lista(e3), []));