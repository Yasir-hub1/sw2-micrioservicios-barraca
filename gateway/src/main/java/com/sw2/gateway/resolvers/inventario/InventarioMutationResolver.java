package com.sw2.gateway.resolvers.inventario;

import com.sw2.gateway.models.inventario.Especie;
import com.sw2.gateway.models.inventario.Producto;
import com.sw2.gateway.models.inventario.Romaneo;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
public class InventarioMutationResolver implements GraphQLMutationResolver {
  @Autowired
  private RestTemplate restTemplate;

  @Value("${endpoint.inventario.url}")
  private String gatewayEndpoint;

  @MutationMapping
  public Especie createEspecie(@Argument("input") Especie input) {
    return restTemplate.postForObject(gatewayEndpoint + "/especies", input, Especie.class);
  }

  @MutationMapping
  public Especie updateEspecie(@Argument("input") Especie input) {
    restTemplate.put(gatewayEndpoint + "/especies/" + input.id(), input);
    return restTemplate.getForObject(gatewayEndpoint + "/especies/" + input.id(), Especie.class);
  }

  @MutationMapping
  public Producto createProducto(@Argument("input") Producto input) {
    return restTemplate.postForObject(gatewayEndpoint + "/productos", input, Producto.class);
  }

  @MutationMapping
  public Producto updateProducto(@Argument("input") Producto input) {
    restTemplate.put(gatewayEndpoint + "/productos/" + input.id(), input);
    return restTemplate.getForObject(gatewayEndpoint + "/productos/" + input.id(), Producto.class);
  }

  @MutationMapping
  public Romaneo createRomaneo(@Argument("input") Romaneo input) {
    return restTemplate.postForObject(gatewayEndpoint + "/romaneo", input, Romaneo.class);
  }

  @MutationMapping
  public Romaneo updateRomaneo(@Argument("input") Romaneo input) {
    restTemplate.put(gatewayEndpoint + "/romaneo/" + input.id(), input);
    return restTemplate.getForObject(gatewayEndpoint + "/romaneo/" + input.id(), Romaneo.class);
  }
}
