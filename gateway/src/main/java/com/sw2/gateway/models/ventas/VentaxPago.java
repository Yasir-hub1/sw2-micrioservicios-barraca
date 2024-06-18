package com.sw2.gateway.models.ventas;

public record VentaxPago(
        int id,
        String fecha,
        String total,
        String cliente_id
) {}
