package com.sw2.gateway.models.ventas;

public record DetalleVenta(
        String id,
        Venta venta,
        float espesor,
        float ancho,
        float largo,
        float largo_mt,
        String detalle,
        String estado_inventario,
        int cantidad,
        float precio_venta,
        float subtotal,
        float total_pie,
        int reingreso,
        String especie
) {}