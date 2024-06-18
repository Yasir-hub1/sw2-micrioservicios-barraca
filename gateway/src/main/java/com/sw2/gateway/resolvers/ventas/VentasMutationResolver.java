package com.sw2.gateway.resolvers.ventas;

import com.sw2.gateway.models.ventas.Venta;
import com.sw2.gateway.models.ventas.Pago;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
public class VentasMutationResolver implements GraphQLMutationResolver {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${endpoint.ventas.url}")
    private String gatewayEndpoint;

    @MutationMapping
    public Venta registrarVenta(@Argument("input") Venta input) {
        return restTemplate.postForObject(gatewayEndpoint + "/registrar_venta/", input, Venta.class);
    }

    @MutationMapping
    public Pago realizarPago(@Argument("input") Pago input) {
        return restTemplate.postForObject(gatewayEndpoint + "/realizar_pago/", input, Pago.class);
    }

    @MutationMapping
    public Venta anularVenta(@Argument String id) {
        try {
            return restTemplate.postForObject(gatewayEndpoint + "/anular_nota_venta/" + id, null, Venta.class);
        } catch (Exception e) {
            throw new RuntimeException("Error al anular la venta: " + e.getMessage());
        }
    }
}
