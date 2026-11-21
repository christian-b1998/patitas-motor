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

## MiniReto 5: la cola de turnos

### Estado de la cola

Después de encolar a Lola, Toby y Mía:

```
frente -> [Lola] -> [Toby] -> [Mía] -> null     final -> [Mía]     cantidad = 3
```

Después de desencolar una vez (sale Lola):

```
frente -> [Toby] -> [Mía] -> null     final -> [Mía]     cantidad = 2
Cambia:  frente (pasa a Toby) y cantidad. El final no cambia.
```

### Medición con 100.000 turnos

| Operación | Tiempo |
|---|---|
| Cola: encolar | ___ ms |
| Cola: desencolar | ___ ms |
| Arreglo: push | ___ ms |
| Arreglo: shift | ___ |

### Complejidad

| Operación | Cola (nodos) | Arreglo | Por qué |
|---|---|---|---|
| Encolar | O(1) | `push`: O(1) amortizado | Cola: usa `final`, sin recorrer. Arreglo: escribe en la última posición. |
| Desencolar | O(1) | `shift`: O(n) | Cola: solo mueve `frente`. Arreglo: mueve los n-1 elementos restantes una posición. |
| Ver el frente | O(1) | `arreglo[0]`: O(1) | Ambos acceden directo al primer elemento. |
| Saber si está vacía | O(1) | `length === 0`: O(1) | Ambos comparan un valor guardado. |
| Tamaño | O(1) | `length`: O(1) | La cola lleva un contador, el arreglo guarda su longitud. |

### Explicación de la diferencia

En la `Cola`, `encolar` solo usa `final` y `desencolar` solo mueve `frente`. Hacen un número fijo de asignaciones sin importar cuántos turnos haya, por eso son O(1). En el arreglo, `push` es barato, pero `shift` saca el primer elemento y debe mover todos los demás una posición, O(n). Al desencolar 100.000 turnos, ese movimiento se repite 100.000 veces, unos n²/2 movimientos en total, y por eso tarda segundos mientras que la cola tarda milisegundos. La `Cola` encola un poco más lento que `push` porque crea un nodo por turno, pero ese costo es pequeño y constante frente al de `shift`.

## MiniReto 6: urgencias primero

### Cálculo manual

Cada atención dura 20 minutos y hay un solo consultorio. Solo se atiende a quien ya llegó, y si alguien llega justo cuando el consultorio queda libre, cuenta como ya llegado.

| Hora | Qué pasa | Esperando | Atiende |
|---|---|---|---|
| 8:00 | Llega Toby y el consultorio está libre | nadie | Toby (8:00 a 8:20) |
| 8:20 | Termina Toby. Ya llegaron Max, Luna y Simón | Urgencias: Luna. Generales: Max, Simón | Luna (8:20 a 8:40) |
| 8:40 | Termina Luna. Ya llegaron Kira y Nala | Urgencias: Kira. Generales: Max, Simón, Nala | Kira (8:40 a 9:00) |
| 9:00 | Termina Kira. Llega Rocky | Urgencias: Rocky. Generales: Max, Simón, Nala | Rocky (9:00 a 9:20) |
| 9:20 | Termina Rocky | Generales: Max, Simón, Nala | Max (9:20 a 9:40) |
| 9:40 | Termina Max | Generales: Simón, Nala | Simón (9:40 a 10:00) |
| 10:00 | Termina Simón | Generales: Nala | Nala (10:00 a 10:20) |

### Resultado manual

| Orden | Mascota | Tipo | Llegada | Inicio | Espera |
|---|---|---|---|---|---|
| 1 | Toby | General | 8:00 | 8:00 | 0 min |
| 2 | Luna | Urgencia | 8:10 | 8:20 | 10 min |
| 3 | Kira | Urgencia | 8:25 | 8:40 | 15 min |
| 4 | Rocky | Urgencia | 9:00 | 9:00 | 0 min |
| 5 | Max | General | 8:05 | 9:20 | 75 min |
| 6 | Simón | General | 8:20 | 9:40 | 80 min |
| 7 | Nala | General | 8:40 | 10:00 | 80 min |

Promedio de espera en urgencias: (10 + 15 + 0) / 3 = 8,33 min.
Promedio de espera en generales: (0 + 75 + 80 + 80) / 4 = 58,75 min.

### Comparación con el programa

`node src/simulacion.js` produce el mismo orden, las mismas horas de inicio, las mismas esperas y los mismos promedios que el cálculo manual. No hubo diferencias que documentar.

## MiniReto 7: la pila y el deshacer

### Decisión: pila con nodos

La `Pila` se construyó con nodos, reutilizando `Nodo`. `apilar` y `desapilar` operan siempre sobre el tope, sin recorrer nada, y son O(1) en el peor caso. Con un arreglo (`push` y `pop`) también serían O(1), pero `push` solo es O(1) amortizado, porque a veces el arreglo debe crecer y copiar sus elementos.

### Complejidad de la pila

| Operación | Complejidad | Por qué |
|---|---|---|
| `apilar` | O(1) | Crea un nodo y mueve el tope. |
| `desapilar` | O(1) | Mueve el tope al siguiente nodo. |
| `verTope` | O(1) | Lee el dato del tope. |
| `estaVacia` | O(1) | Compara el tope con `null`. |
| `tamanio` | O(1) | Devuelve el contador. |

### Traza de la secuencia

Las pilas se muestran con el tope primero. El historial es el de Lola.

| Paso | Acción | Historial | Pila deshacer | Pila rehacer |
|---|---|---|---|---|
| 1 | agregar A | [A] | [agregar A] | [] |
| 2 | agregar B | [A, B] | [agregar B, agregar A] | [] |
| 3 | eliminar A | [B] | [eliminar A, agregar B, agregar A] | [] |
| 4 | deshacer | [A, B] | [agregar B, agregar A] | [eliminar A] |
| 5 | deshacer | [A] | [agregar A] | [agregar B, eliminar A] |
| 6 | rehacer | [A, B] | [agregar B, agregar A] | [eliminar A] |
| 7 | agregar C | [A, B, C] | [agregar C, agregar B, agregar A] | [] |
| 8 | rehacer | [A, B, C] | [agregar C, agregar B, agregar A] | [] |

- **Paso 4:** deshacer la eliminación de A la repone en su lugar original, al inicio del historial.
- **Paso 7:** agregar C es una acción nueva, así que vacía la pila de rehacer y se pierde "eliminar A".
- **Paso 8:** rehacer no hace nada porque la pila de rehacer está vacía, y no produce errores.

## MiniReto 8: estructuras del motor v0.2

| Estructura | Principio | Uso en Patitas | Operaciones principales y complejidad |
|---|---|---|---|
| `Nodo` | Pieza básica: un dato y la referencia al siguiente | Base de la lista, la cola y la pila | Crear un nodo: O(1) |
| `ListaEnlazada` | Secuencial | Historial de atenciones de cada mascota | agregarAlInicio O(1), agregarAlFinal O(1), recorrer O(n), buscar O(n), insertarDespuesDe O(n), eliminar O(n) |
| `RegistroClinico` | Índice por nombre (Map) con una lista por mascota | Guarda el historial de cada mascota | registrarAtencion O(1) en promedio, obtenerHistorial O(1) en promedio |
| `Cola` | FIFO | Turnos en la sala de espera | encolar O(1), desencolar O(1), verFrente O(1) |
| `Recepcion` | FIFO con prioridad (dos colas) | Atiende las urgencias antes que las consultas generales | registrarLlegada O(1), llamarSiguiente O(1) |
| `Pila` | LIFO | Acciones para deshacer y rehacer | apilar O(1), desapilar O(1), verTope O(1) |
| `Editor` | LIFO (dos pilas) | Agregar y eliminar atenciones con deshacer y rehacer | agregar O(1), eliminar O(n), deshacer O(n), rehacer O(n) |

En `Editor`, las operaciones de las pilas son O(1). La n de `eliminar`, `deshacer` y `rehacer` son las atenciones del historial de esa mascota, porque revertir o aplicar una acción puede requerir buscar un nodo en la lista.

## MiniReto 9: catálogo de servicios (recursión)

### Diseño de cada función

| Función | Caso base | Reducción | Combinación |
|---|---|---|---|
| `contarServicios(categoria)` | Una categoría sin subcategorías: el `for...of` no se ejecuta y devuelve solo sus servicios | Cada subcategoría es una categoría más pequeña, con un nivel menos | Suma los servicios propios más lo que devuelve cada subcategoría |
| `listarCatalogo(categoria, nivel)` | Una categoría sin subcategorías: imprime su nombre y sus servicios y no hace más llamadas | Llama con cada subcategoría y `nivel + 1` | No devuelve nada: la categoría se imprime antes que sus subcategorías y la sangría (`nivel * 2` espacios) muestra la jerarquía |
| `profundidad(categoria)` | Una categoría sin subcategorías tiene 1 nivel | Llama con cada subcategoría | 1 más la mayor profundidad entre sus subcategorías |

En las tres, el caso base es implícito: no hay un `if` que lo detecte, simplemente el `for...of` no tiene nada que recorrer. La profundidad cuenta la categoría misma, así que Patitas, Consultas y Especializada son 3 niveles.

### Traza de la pila de llamadas: `contarServicios(Cirugías)`

Cirugías no tiene servicios propios y sus subcategorías son Esterilización (2 servicios) y Limpieza dental (1 servicio). La pila se lee de abajo hacia el tope.

| Paso | Evento | Pila de llamadas | Valor |
|---|---|---|---|
| 1 | Se llama `contarServicios(Cirugías)` | Cirugías | `total = 0` |
| 2 | El `for...of` toma Esterilización y la llama | Cirugías, Esterilización | `total = 2` en Esterilización |
| 3 | Esterilización no tiene subcategorías y devuelve 2 | Cirugías | `total = 0 + 2 = 2` |
| 4 | El `for...of` toma Limpieza dental y la llama | Cirugías, Limpieza dental | `total = 1` en Limpieza dental |
| 5 | Limpieza dental devuelve 1 | Cirugías | `total = 2 + 1 = 3` |
| 6 | Cirugías termina el `for...of` y devuelve 3 | (vacía) | resultado: 3 |

## MiniReto 10: el error del descuento repetido

El descuento del 10 % se aplica una sola vez, al final, sobre la suma total. El error común es aplicarlo dentro de la función recursiva, en cada llamada:

```javascript
function precioPaqueteIncorrecto(categoria) {
    let total = 0;
    for (const servicio of categoria.servicios) {
        total += servicio.precio;
    }
    for (const subcategoria of categoria.subcategorias) {
        total += precioPaqueteIncorrecto(subcategoria);
    }
    return total * 0.9;
}
```

Resultado con la categoría Cirugías (Esterilización: Gata 280.000 y Perra 350.000; Limpieza dental: Con anestesia 150.000):

| Llamada | Suma | Con descuento en cada llamada |
|---|---|---|
| Esterilización | 280.000 + 350.000 = 630.000 | 630.000 × 0,9 = 567.000 |
| Limpieza dental | 150.000 | 150.000 × 0,9 = 135.000 |
| Cirugías | 567.000 + 135.000 = 702.000 | 702.000 × 0,9 = 631.800 |

El resultado incorrecto es 631.800. El correcto es 780.000 × 0,9 = 702.000. La diferencia es de 70.200.

Está mal porque los servicios de Esterilización y de Limpieza dental se descuentan dos veces: una al calcular su propia categoría y otra cuando Cirugías suma esos resultados, que ya traían el descuento. Cada servicio queda en 0,9 × 0,9 = 81 % de su precio, es decir, 19 % de descuento y no 10 %. En un catálogo más profundo es peor, porque cada nivel por el que pasa el servicio vuelve a aplicar el descuento: en todo el catálogo de Patitas daría 970.380 en vez de 1.170.000.

La corrección es separar las dos tareas: `sumarPrecios` es recursiva y solo suma, y `precioPaquete` la llama una vez y aplica el descuento una sola vez, al final.

## MiniReto 11: el historial de forma recursiva

### Por qué la pila de llamadas invierte el orden en `imprimirAlReves`

`imprimirAlRevesDesde(nodo)` llama primero a sí misma con `nodo.siguiente` y solo después muestra el dato de su nodo. Con el historial de Lola (02/02, 15/03, 20/05) las llamadas se apilan hasta llegar a `null`, el caso base, y luego van terminando de la última a la primera:

| Paso | Qué ocurre | Pila de llamadas (base al tope) |
|---|---|---|
| 1 | Se llama con el nodo 02/02, que llama al siguiente | 02/02 |
| 2 | Se llama con el nodo 15/03 | 02/02, 15/03 |
| 3 | Se llama con el nodo 20/05 | 02/02, 15/03, 20/05 |
| 4 | Se llama con `null` y termina | 02/02, 15/03, 20/05 |
| 5 | 20/05 muestra su dato y termina | 02/02, 15/03 |
| 6 | 15/03 muestra su dato y termina | 02/02 |
| 7 | 02/02 muestra su dato y termina | (vacía) |

La última llamada en entrar es la primera en terminar (LIFO), así que la atención más reciente se muestra primero. La pila de llamadas hace el trabajo de la pila explícita que habría que construir con una versión iterativa, y el método no usa arreglos ni pilas propios.

### Desbordamiento de pila con 100.000 atenciones

`tamanioRecursivo()` sobre una lista con 100.000 atenciones lanza `RangeError: Maximum call stack size exceeded`. La versión iterativa funciona con la misma lista (tamaño 100.000 y costo total 100.000.000). En este equipo la versión recursiva funcionó con 15000 atenciones y falló con 20000.

La causa: cada llamada debe esperar el resultado de la siguiente para sumarle 1, así que ninguna termina antes de llegar al final y las n llamadas quedan apiladas a la vez. La memoria que usa la pila crece con el largo de la lista, O(n), y Node le da un espacio fijo. Cuando se acaba, lanza el error. Que la última instrucción sea una llamada recursiva tampoco lo evita, porque Node no optimiza ese caso.

### Tiempo y memoria de cada operación

| Operación | Iterativa: tiempo | Iterativa: memoria | Recursiva: tiempo | Recursiva: memoria |
|---|---|---|---|---|
| Tamaño | O(1) con el contador `obtenerTamanio()` (O(n) si se cuenta con un ciclo) | O(1) | O(n) | O(n) |
| Costo total | O(n) | O(1) | O(n) | O(n) |
| Buscar | O(n) en el peor caso | O(1) | O(n) en el peor caso | O(n) en el peor caso, una llamada pendiente por cada nodo recorrido |
| Imprimir al revés | O(n) | O(n), hay que guardar los datos en un arreglo o una pila | O(n) | O(n), la pila de llamadas |

### Versión oficial de cada operación

| Operación | Versión oficial | Justificación |
|---|---|---|
| Tamaño | `obtenerTamanio()` (contador) | Es O(1) en tiempo y memoria: no recorre nada, y no puede desbordar la pila. |
| Costo total | `costoTotal()` (iterativa) | Tiene el mismo tiempo que la recursiva, pero usa memoria constante y funciona con historiales de cualquier largo. |
| Buscar | `buscar(condicion)` (iterativa) | Igual que el costo total: mismo tiempo, memoria constante y sin riesgo de `RangeError`. |
| Imprimir al revés | `imprimirAlReves()` (recursiva) | Es la única donde la recursión ahorra construir una estructura auxiliar, y el código es mucho más corto. El historial de una mascota tiene decenas o cientos de atenciones, lejos del límite de la pila. Si algún día los historiales llegaran a decenas de miles, habría que cambiarla por una versión iterativa con un arreglo. |

## MiniReto 12: Patitas v1.0, resumen de la semana

| MiniReto | Qué construí | Estructura elegida y por qué |
|---|---|---|
| 1. La consulta cero | La clase `Nodo`, las atenciones de Lola enlazadas a mano, el recorrido con `while` y el enlace perdido | Nodos con referencias: cada atención apunta a la siguiente, como la carpeta de la directora |
| 2. El historial como lista | `ListaEnlazada` con cabeza, cola y tamaño, e inserción al inicio y al final | Lista enlazada con cola: el historial crece por el final, y agregar sin recorrer es O(1) |
| 3. Corregir el historial | `buscar`, `insertarDespuesDe` y `eliminar` con los casos borde | La misma lista, recorrida con nodo anterior y actual, para quitar o insertar en medio sin romper la cadena |
| 4. Patitas v0.1 | `RegistroClinico`, el reporte y la tabla de lista contra arreglo | Un `Map` con una lista por mascota: acceso por nombre en O(1) en promedio y listas para agregar atenciones |
| 5. La sala de espera | `Cola` FIFO con frente y final, y la medición con 100.000 turnos | Cola de nodos: encolar y desencolar son O(1), mientras que `shift` en un arreglo mueve todos los elementos |
| 6. Urgencias primero | `Recepcion` con dos colas y la simulación por tiempo | Dos colas: la prioridad se resuelve eligiendo cuál cola atender primero, y cada una conserva el orden de llegada |
| 7. Deshacer y rehacer | `Pila` y `Editor` con acciones reversibles | Dos pilas LIFO: la última acción es la primera en revertirse y una acción nueva vacía la de rehacer |
| 8. Patitas v0.2 | La simulación integrada: atenciones registradas con el `Editor`, error corregido y aviso de sala vacía | La combinación: colas para los turnos, pilas para las correcciones y listas para los historiales |
| 9. El catálogo anidado | `contarServicios`, `listarCatalogo` y `profundidad` | Recursión sobre objetos anidados: una subcategoría tiene la misma forma que la categoría, y el código sirve a cualquier profundidad |
| 10. Rutas y paquetes | `buscarServicio`, `rutaDeServicio`, `precioPaquete` y `serviciosEnRango` | Recursión con retorno temprano y una función auxiliar: la suma recursiva se separa del descuento, que se aplica una sola vez |
| 11. El historial recursivo | Versiones recursivas de la lista, el desbordamiento con 100.000 nodos y la tabla de tiempo y memoria | Iterativa para tamaño, costo total y búsqueda (memoria O(1)), y recursiva solo para imprimir al revés |
| 12. Patitas v1.0 | `demo.js`, `src/` en `estructuras/` y `dominio/`, las pruebas finales, el README de producto y este cierre | Integración: cada estructura se usa donde mejor resuelve su problema |

### Qué estructura para cada problema

- **Historial de cada mascota:** lista enlazada, porque se agrega por el final, se lee en orden y no hace falta acceder por posición.
- **Buscar la mascota por nombre:** `Map`, porque ahí se necesita acceso directo por clave.
- **Sala de espera:** cola, porque quien llega primero se atiende primero (FIFO).
- **Urgencias antes que consultas:** dos colas, porque cada tipo conserva su orden de llegada y la prioridad se decide al llamar.
- **Deshacer y rehacer:** pilas, porque lo último que se hizo es lo primero que se revierte (LIFO).
- **Catálogo con categorías dentro de categorías:** recursión, porque la estructura se repite a cualquier profundidad.
- **Operaciones sobre listas largas:** iteración, porque la recursión gasta memoria de pila en proporción al largo de la lista.