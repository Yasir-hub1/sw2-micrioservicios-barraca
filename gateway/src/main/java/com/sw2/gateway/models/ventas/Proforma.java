package com.sw2.gateway.models.ventas;

public record Proforma(
        Long id,
        String fecha,
        String total,
        String name,
        int nro_proforma
) {}
