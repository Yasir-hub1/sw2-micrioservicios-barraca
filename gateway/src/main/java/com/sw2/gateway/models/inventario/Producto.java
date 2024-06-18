package com.sw2.gateway.models.inventario;

public record Producto(
    String id,
    String codigo,
    Float espesor,
    Float ancho,
    Float largo,
    Integer cantidad,
    Float cantidadPies,
    String estado,
    Integer cantidadIngresada,
    Integer romaneoId,
    Integer especieId
) {}