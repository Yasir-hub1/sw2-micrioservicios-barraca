package com.sw2.gateway.models.ventas;

public record Pago(
        String id,
        int nro_recibo,
        String fecha_pago,
        float monto_total,
        float monto_pagado,
        float monto_saldo,
        String observacion,
        int tipo_pago,
        float monto_gift_card,
        String numero_tarjeta
) {}

