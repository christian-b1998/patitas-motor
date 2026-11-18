# patitas-motor

Motor de historial clínico para la clínica veterinaria Patitas (v0.1). Guarda las atenciones de cada mascota en una lista enlazada y genera un reporte con los historiales, el número de atenciones, el costo total y la última vacunación.

## Ejecutar

Requiere Node.js.

Reporte de historiales:

```bash
node src/reporte.js
```

Simulación de la sala de espera con urgencias:

```bash
node src/simulacion.js
```

Pruebas:

```bash
node pruebas/nodos.js
node pruebas/lista.js
node pruebas/correcciones.js
node pruebas/cola.js
```

Comparación de la cola con un arreglo (puede tardar unos segundos):

```bash
node pruebas/comparacion.js
```

## Estructuras

- `Nodo` (`src/Nodo.js`): guarda un dato y la referencia al siguiente nodo.
- `ListaEnlazada` (`src/ListaEnlazada.js`): lista simplemente enlazada con cabeza, cola y tamaño. Agrega al inicio y al final, recorre, busca, inserta después de un nodo y elimina.
- `RegistroClinico` (`src/RegistroClinico.js`): guarda un historial (`ListaEnlazada`) por mascota en un `Map`.
- `Cola` (`src/Cola.js`): cola FIFO basada en nodos, con referencias a frente y final. Encolar y desencolar en tiempo constante.
- `Recepcion` (`src/Recepcion.js`): usa dos colas, una de urgencias y otra de consultas generales, y llama primero a las urgencias.
- `bitacora.md`: diagramas de nodos, casos borde, complejidades y comparaciones.