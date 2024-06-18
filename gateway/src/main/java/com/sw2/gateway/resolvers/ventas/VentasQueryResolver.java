package com.sw2.gateway.resolvers.ventas;

import com.sw2.gateway.models.ventas.PagosXVenta;
import com.sw2.gateway.models.ventas.Venta;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Arrays;
import java.util.Objects;
import com.sw2.gateway.models.ventas.Proforma;
import com.sw2.gateway.models.ventas.IngresoVenta;

@Controller
public class VentasQueryResolver implements GraphQLQueryResolver {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${endpoint.ventas.url}")
    private String gatewayEndpoint;

    @QueryMapping
    public List<Venta> ventaList() {
        return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/list/", Venta[].class)));
    }

    @QueryMapping
    public Venta verVentaId(@Argument String id) {
        return Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/" + id, Venta.class));
    }

    @QueryMapping
    public List<Proforma> getProformas() {
        return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/proformas", Proforma[].class)));
    }

    @QueryMapping
    public PagosXVenta pagosXVenta(@Argument String id) {
        return restTemplate.getForObject(gatewayEndpoint + "/pagos_x_venta/" + id, PagosXVenta.class);
    }
}
