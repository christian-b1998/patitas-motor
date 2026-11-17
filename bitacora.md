## Diagrama de nodos y flechas

```
cabeza -> [ 02/02 vacunación | siguiente ] -> [ 15/03 control de peso | siguiente ] -> [ 20/05 limpieza dental | siguiente ] -> null
```

## Diagrama con enlace perdido

```
cabeza -> [ 02/02 vacunación | siguiente ] -> null

[ 15/03 control de peso | siguiente ] -> [ 20/05 limpieza dental | siguiente ] -> null
```

## Enlace perdido

Al asignar `null` al `siguiente` del primer nodo, el recorrido solo imprime la vacunación. El `while (actual !== null)` avanza a `actual.siguiente`, encuentra `null` y se detiene.

`nodo2` y `nodo3` siguen existiendo y enlazados entre sí, pero desde `cabeza` ya no hay camino hasta ellos. Es lo que dijo la directora: si alguien saca una hoja de la carpeta, ya no sabemos qué pasó después.