package com.sw2.gateway.models.ventas;

public record Venta(
        String id,
        String tipo_venta,
        String tipo_transaccion,
        String fecha,
        int a_plazos,
        float subtotal,
        float descuento,
        float total,
        String observacion_proforma,
        int estado,
        int reingreso,
        String cliente,
        String usuario
) {}
