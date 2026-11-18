# patitas-motor

Motor de historial clínico para la clínica veterinaria Patitas (v0.1). Guarda las atenciones de cada mascota en una lista enlazada y genera un reporte con los historiales, el número de atenciones, el costo total y la última vacunación.

## Ejecutar

Requiere Node.js.

Reporte de historiales:

```bash
node src/reporte.js
```

Pruebas:

```bash
node pruebas/nodos.js
node pruebas/lista.js
node pruebas/correcciones.js
```

## Estructuras

- `Nodo` (`src/Nodo.js`): guarda un dato y la referencia al siguiente nodo.
- `ListaEnlazada` (`src/ListaEnlazada.js`): lista simplemente enlazada con cabeza, cola y tamaño. Agrega al inicio y al final, recorre, busca, inserta después de un nodo y elimina.
- `RegistroClinico` (`src/RegistroClinico.js`): guarda un historial (`ListaEnlazada`) por mascota en un `Map`.
- `bitacora.md`: diagramas de nodos, casos borde, complejidades y comparación entre lista enlazada y arreglo.