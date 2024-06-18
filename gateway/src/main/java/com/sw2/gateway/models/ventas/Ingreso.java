package com.sw2.gateway.models.ventas;

public record Ingreso(
        String id,
        String fecha,
        String fecha_registro,
        String concepto,
        float monto_total,
        String tipo_registro,
        boolean estado,
        String usuario
) {}
