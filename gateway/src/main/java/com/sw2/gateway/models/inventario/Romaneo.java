package com.sw2.gateway.models.inventario;

public record Romaneo(
    String id,
    String fechaRegistro,
    String fechaEntrega,
    String descripcion,
    Float totalPieCuadrado,
    String estado,
    String tipoRomaneo,
    Integer cantidadProductos
) {}