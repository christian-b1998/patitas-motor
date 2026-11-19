# patitas-motor

Motor de historial clínico para la clínica veterinaria Patitas (v0.2). Guarda las atenciones de cada mascota en listas enlazadas, organiza la sala de espera con colas de prioridad y permite deshacer y rehacer cambios en los historiales con pilas.

## Funcionalidades

- Historiales por mascota en listas enlazadas, con búsqueda, inserción y eliminación.
- Sala de espera con dos colas: las urgencias se atienden antes que las consultas generales, y dentro de cada tipo se respeta el orden de llegada.
- Simulación de la mañana: orden de atención, horas de inicio, minutos de espera y promedios.
- Cada atención terminada queda registrada en el historial de su mascota.
- Deshacer y rehacer sobre el registro clínico, con la corrección de un error de la recepcionista.
- Llamar al siguiente con la sala vacía muestra un aviso y no falla.

## Ejecutar

Requiere Node.js.

Simulación completa de la mañana:

```bash
node src/simulacion.js
```

Reporte de historiales:

```bash
node src/reporte.js
```

Pruebas:

```bash
node pruebas/nodos.js
node pruebas/lista.js
node pruebas/correcciones.js
node pruebas/cola.js
node pruebas/pila.js
node pruebas/editor.js
node pruebas/recepcion.js
```

Comparación de la cola con un arreglo (puede tardar unos segundos):

```bash
node pruebas/comparacion.js
```

## Estructuras

- `Nodo` (`src/Nodo.js`): guarda un dato y la referencia al siguiente nodo.
- `ListaEnlazada` (`src/ListaEnlazada.js`): lista simplemente enlazada con cabeza, cola y tamaño. Agrega al inicio y al final, recorre, busca, inserta después de un nodo y elimina.
- `RegistroClinico` (`src/RegistroClinico.js`): guarda un historial (`ListaEnlazada`) por mascota en un `Map`.
- `Cola` (`src/Cola.js`): cola FIFO basada en nodos, con referencias a frente y final.
- `Recepcion` (`src/Recepcion.js`): usa dos colas, una de urgencias y otra de consultas generales, y llama primero a las urgencias.
- `Pila` (`src/Pila.js`): pila LIFO basada en nodos, con referencia al tope.
- `Editor` (`src/Editor.js`): envuelve al `RegistroClinico` y permite agregar y eliminar atenciones con deshacer y rehacer, usando dos pilas.
- `bitacora.md`: diagramas, trazas, casos borde, complejidades y comparaciones de cada reto.