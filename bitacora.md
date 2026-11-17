## MiniReto 1: repositorio y el nodo

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


## MiniReto 2: referencias al agregar

### 1. Lista vacía + agregarAlFinal('A')

```
Antes:   cabeza -> null     cola -> null     tamanio = 0
Después: cabeza -> [A] -> null     cola -> [A]     tamanio = 1
Cambia:  cabeza, cola y tamanio. No hay ningún nodo existente al que enlazar.
```

### 2. Lista vacía + agregarAlInicio('A')

```
Antes:   cabeza -> null     cola -> null     tamanio = 0
Después: cabeza -> [A] -> null     cola -> [A]     tamanio = 1
Cambia:  cabeza, cola y tamanio. Igual que el caso 1.
```

### 3. Un nodo + agregarAlFinal('B')

```
Antes:   cabeza -> [A] -> null     cola -> [A]     tamanio = 1
Después: cabeza -> [A] -> [B] -> null     cola -> [B]     tamanio = 2
Cambia:  el siguiente de A (ahora apunta a B), cola y tamanio. La cabeza no cambia.
```

### 4. Un nodo + agregarAlInicio('B')

```
Antes:   cabeza -> [A] -> null     cola -> [A]     tamanio = 1
Después: cabeza -> [B] -> [A] -> null     cola -> [A]     tamanio = 2
Cambia:  cabeza, tamanio y el siguiente de B (el nodo nuevo, que apunta a A). La cola no cambia.
```

### 5. Varios nodos + agregarAlFinal('D')

```
Antes:   cabeza -> [A] -> [B] -> [C] -> null     cola -> [C]     tamanio = 3
Después: cabeza -> [A] -> [B] -> [C] -> [D] -> null     cola -> [D]     tamanio = 4
Cambia:  el siguiente de C (ahora apunta a D), cola y tamanio. La cabeza no cambia.
```

### 6. Varios nodos + agregarAlInicio('D')

```
Antes:   cabeza -> [A] -> [B] -> [C] -> null     cola -> [C]     tamanio = 3
Después: cabeza -> [D] -> [A] -> [B] -> [C] -> null     cola -> [C]     tamanio = 4
Cambia:  cabeza, tamanio y el siguiente de D (el nodo nuevo, que apunta a A). La cola no cambia.
```

## Complejidad

| Método | Complejidad | Por qué |
|---|---|---|
| `agregarAlFinal` | O(1) | Usa la referencia `cola`, así que no recorre la lista. Hace un número fijo de asignaciones sin importar cuántos nodos haya. |
| `agregarAlInicio` | O(1) | Usa la referencia `cabeza` y hace un número fijo de asignaciones. No hay ciclo. |
| `recorrer` | O(n) | Visita cada uno de los n nodos una vez, de `cabeza` hasta `null`. |
| `aArreglo` | O(n) | Llama a `recorrer`, que visita los n nodos, y hace un `push` por cada uno. También usa memoria extra proporcional a n. |
| `estaVacia` | O(1) | Solo compara `cabeza` con `null`. |
| `obtenerTamanio` | O(1) | Devuelve el contador `tamanio`, que se mantiene al agregar. No cuenta los nodos. |