package com.sw2.gateway.models.ventas;

import com.sw2.gateway.models.cliente.Cliente;

import java.util.List;

public record PagosXVenta(
        List<Pago> pagos,
        VentaxPago venta,
        Cliente cliente
) {}


