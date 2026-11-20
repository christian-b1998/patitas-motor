const catalogo = {
    nombre: 'Patitas',
    servicios: [],
    subcategorias: [
        {
            nombre: 'Consultas',
            servicios: [
                { nombre: 'Consulta general', precio: 60000 },
                { nombre: 'Consulta a domicilio', precio: 90000 }
            ],
            subcategorias: [
                {
                    nombre: 'Especializada',
                    servicios: [
                        { nombre: 'Dermatología', precio: 110000 },
                        { nombre: 'Cardiología', precio: 130000 }
                    ],
                    subcategorias: []
                }
            ]
        },
        {
            nombre: 'Cirugías',
            servicios: [],
            subcategorias: [
                {
                    nombre: 'Esterilización',
                    servicios: [
                        { nombre: 'Gata', precio: 280000 },
                        { nombre: 'Perra', precio: 350000 }
                    ],
                    subcategorias: []
                },
                {
                    nombre: 'Limpieza dental',
                    servicios: [
                        { nombre: 'Con anestesia', precio: 150000 }
                    ],
                    subcategorias: []
                }
            ]
        },
        {
            nombre: 'Vacunas',
            servicios: [
                { nombre: 'Rabia', precio: 45000 },
                { nombre: 'Triple felina', precio: 85000 }
            ],
            subcategorias: []
        }
    ]
};

function contarServicios(categoria) {
    let total = categoria.servicios.length;
    for (const subcategoria of categoria.subcategorias) {
        total += contarServicios(subcategoria);
    }
    return total;
}

function listarCatalogo(categoria, nivel = 0) {
    const sangria = ' '.repeat(nivel * 2);
    console.log(sangria + categoria.nombre);
    for (const servicio of categoria.servicios) {
        console.log(sangria + '  - ' + servicio.nombre + ': $' + servicio.precio.toLocaleString('es-CO'));
    }
    for (const subcategoria of categoria.subcategorias) {
        listarCatalogo(subcategoria, nivel + 1);
    }
}

function profundidad(categoria) {
    let maxima = 0;
    for (const subcategoria of categoria.subcategorias) {
        const nivelSubcategoria = profundidad(subcategoria);
        if (nivelSubcategoria > maxima) {
            maxima = nivelSubcategoria;
        }
    }
    return 1 + maxima;
}

module.exports = { catalogo, contarServicios, listarCatalogo, profundidad };