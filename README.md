# Patitas Motor v1.0

Motor de gestión para la clínica veterinaria Patitas. Guarda el historial clínico de cada mascota, organiza la sala de espera dando prioridad a las urgencias, permite deshacer y rehacer los errores de registro y consulta el catálogo de servicios con sus rutas y paquetes. La lista, la cola y la pila están implementadas desde cero con nodos, sin librerías.

## Requisitos

Node.js (probado con la versión 22). No hay dependencias que instalar.

## Cómo ejecutarlo

```bash
git clone https://github.com/christian-b1998/patitas-motor.git
cd patitas-motor
node demo.js
```

La demostración tiene cinco secciones numeradas: catálogo de servicios, simulación de la mañana con urgencias, corrección con deshacer y rehacer, historiales finales, y búsqueda de un servicio con su ruta y el precio del paquete.

## Pruebas

Pruebas finales de todas las estructuras, con un caso normal y uno borde de cada una. Muestran `OK` o `FALLA` y un resumen al final:

```bash
node pruebas/todo.js
```

Pruebas detalladas de cada reto:

```bash
node pruebas/nodos.js
node pruebas/lista.js
node pruebas/correcciones.js
node pruebas/cola.js
node pruebas/pila.js
node pruebas/editor.js
node pruebas/recepcion.js
node pruebas/catalogo.js
node pruebas/busqueda.js
node pruebas/recursivas.js
node pruebas/desbordamiento.js
```

Otros programas:

```bash
node src/reporte.js
node pruebas/comparacion.js
```

`reporte.js` muestra los historiales de Lola, Toby y Mía con sus totales. `comparacion.js` compara la cola con un arreglo usando 100.000 turnos y puede tardar unos segundos.

## Organización del proyecto

```
demo.js                  demostración completa
src/
  estructuras/           Nodo, ListaEnlazada, Cola, Pila
  dominio/               RegistroClinico, Recepcion, Editor, catalogo, simulacion
  reporte.js             reporte de historiales
pruebas/                 pruebas de cada estructura y pruebas finales (todo.js)
bitacora.md              diagramas, trazas, mediciones y resumen de cada reto
```

## Estructuras y su uso en Patitas

| Estructura | Principio | Uso en Patitas |
|---|---|---|
| `Nodo` | Pieza básica: un dato y la referencia al siguiente | Base de la lista, la cola y la pila |
| `ListaEnlazada` | Secuencial | Historial de atenciones de cada mascota, con inserción, búsqueda y eliminación |
| `Cola` | FIFO | Turnos de la sala de espera |
| `Pila` | LIFO | Acciones para deshacer y rehacer |
| `RegistroClinico` | Índice por nombre (`Map`) | Una lista enlazada por mascota |
| `Recepcion` | FIFO con prioridad (dos colas) | Atiende las urgencias antes que las consultas generales |
| `Editor` | LIFO (dos pilas) | Agrega y elimina atenciones con deshacer y rehacer |
| Catálogo | Recursión sobre datos anidados | Servicios y categorías a cualquier profundidad, con búsqueda, ruta y paquetes |

`src/dominio/simulacion.js` simula una mañana de atención con un solo consultorio de 20 minutos por consulta y calcula la espera de cada mascota.

## Complejidad de las operaciones

Aquí `n` es la cantidad de elementos de la estructura.

| Estructura | Operación | Complejidad |
|---|---|---|
| `Nodo` | crear un nodo | O(1) |
| `ListaEnlazada` | `agregarAlInicio`, `agregarAlFinal` | O(1) |
| | `obtenerTamanio`, `estaVacia` | O(1) |
| | `recorrer`, `aArreglo` | O(n) |
| | `buscar`, `insertarDespuesDe`, `eliminar` | O(n) |
| | `costoTotal` (iterativa) | O(n) en tiempo, O(1) en memoria |
| | `tamanioRecursivo`, `costoTotalRecursivo`, `buscarRecursivo`, `imprimirAlReves` | O(n) en tiempo y O(n) en memoria (pila de llamadas) |
| `Cola` | `encolar`, `desencolar`, `verFrente`, `estaVacia`, `tamanio` | O(1) |
| `Pila` | `apilar`, `desapilar`, `verTope`, `estaVacia`, `tamanio` | O(1) |
| `RegistroClinico` | `registrarAtencion`, `obtenerHistorial` | O(1) en promedio |
| | `obtenerMascotas` | O(m), con m mascotas |
| `Recepcion` | `registrarLlegada`, `llamarSiguiente` | O(1) |
| `Editor` | `agregar` | O(1) |
| | `eliminar`, `deshacer`, `rehacer` | O(n), con n las atenciones del historial de esa mascota |
| Catálogo | `contarServicios`, `listarCatalogo`, `profundidad`, `buscarServicio`, `rutaDeServicio`, `precioPaquete`, `serviciosEnRango` | O(n) en tiempo, con n las categorías y servicios del catálogo, y O(p) de pila de llamadas, con p la profundidad |

Las operaciones de las pilas del `Editor` son O(1). La n de `eliminar`, `deshacer` y `rehacer` viene de buscar un nodo en la lista del historial.

## Límite de la recursión

Las versiones recursivas de la lista lanzan `RangeError: Maximum call stack size exceeded` con listas de decenas de miles de nodos (con 100.000 falla). Por eso las versiones oficiales de `tamanio`, `costoTotal` y `buscar` son las iterativas. Más detalles en `bitacora.md`.