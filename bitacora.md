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

## MiniReto 3: eliminación

### Eliminar la cabeza (A)

```
Antes:   cabeza -> [A] -> [B] -> [C] -> null     cola -> [C]     tamanio = 3
Después: cabeza -> [B] -> [C] -> null     cola -> [C]     tamanio = 2
Cambia:  cabeza (pasa a B) y tamanio. La cola no cambia. A queda desconectado.
```

### Eliminar un nodo intermedio (B)

```
Antes:   cabeza -> [A] -> [B] -> [C] -> null     cola -> [C]     tamanio = 3
Después: cabeza -> [A] -> [C] -> null     cola -> [C]     tamanio = 2
Cambia:  el siguiente de A (salta a C) y tamanio. Cabeza y cola no cambian.
```

### Eliminar la cola (C)

```
Antes:   cabeza -> [A] -> [B] -> [C] -> null     cola -> [C]     tamanio = 3
Después: cabeza -> [A] -> [B] -> null     cola -> [B]     tamanio = 2
Cambia:  el siguiente de B (pasa a null), cola (pasa a B) y tamanio. La cabeza no cambia.
```

## Complejidad

| Método | Complejidad | Por qué |
|---|---|---|
| `buscar` | O(n) | En el peor caso el dato está al final o no existe, y visita los n nodos. |
| `insertarDespuesDe` | O(n) | Encontrar el nodo cuesta O(n) en el peor caso. Enlazar el nodo nuevo es O(1). |
| `eliminar` | O(n) | Encontrar el nodo cuesta O(n) en el peor caso. Reconectar las referencias es O(1). Si el nodo es la cabeza, solo hace una comparación. |

## ¿Por qué eliminar la cola requiere recorrer la lista?

Para eliminar la cola hay que hacer que el nodo anterior quede con `siguiente` en `null` y que pase a ser la nueva cola. Pero en una lista simplemente enlazada cada nodo solo apunta hacia adelante, y la cola no sabe quién la precede. La referencia `cola` solo señala el último nodo, no el penúltimo. La única forma de llegar al penúltimo es empezar en `cabeza` y avanzar hasta el nodo cuyo `siguiente` es la cola, lo que visita casi todos los nodos: O(n). Es la diferencia con `agregarAlFinal`, que es O(1) porque solo necesita la cola, y no su anterior.

## MiniReto 4: lista enlazada vs. arreglo

| Operación | Lista enlazada (con cola) | Arreglo | Por qué |
|---|---|---|---|
| Agregar al final | O(1) | O(1) | Lista: la `cola` evita recorrer. Arreglo: `push` escribe en la última posición. |
| Agregar al inicio | O(1) | O(n) | Lista: solo cambia `cabeza`. Arreglo: `unshift` desplaza los n elementos una posición. |
| Acceder a la atención número k | O(n) | O(1) | Lista: hay que avanzar k nodos desde la cabeza. Arreglo: el índice lleva directo a la posición. |
| Buscar | O(n) | O(n) | En ambas hay que revisar elemento por elemento en el peor caso. |
| Eliminar la primera | O(1) | O(n) | Lista: `cabeza` pasa al siguiente nodo. Arreglo: `shift` desplaza los demás una posición. |

Notas: `push` es O(1) amortizado. Si en vez de la primera atención se elimina la primera que cumpla una condición, ambas estructuras son O(n), porque primero hay que encontrarla.