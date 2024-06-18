package com.sw2.gateway.models.ventas;

public record TipoIngresoEgreso(
        String id,
        String descripcion,
        String tipo,
        int estado
) {}