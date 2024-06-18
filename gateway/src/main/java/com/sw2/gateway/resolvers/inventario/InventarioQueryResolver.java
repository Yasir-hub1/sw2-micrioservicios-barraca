package com.sw2.gateway.resolvers.inventario;

import com.sw2.gateway.models.inventario.Especie;
import com.sw2.gateway.models.inventario.Producto;
import com.sw2.gateway.models.inventario.Romaneo;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.*;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Controller
public class InventarioQueryResolver implements GraphQLQueryResolver {
  @Autowired
  private RestTemplate restTemplate;

  @Value("${endpoint.inventario.url}")
  private String gatewayEndpoint;

  @QueryMapping
  public List<Especie> getEspecies() {
    return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/especies", Especie[].class)));
  }

  @QueryMapping
  public Especie getEspecieById(@Argument String id) {
    return restTemplate.getForObject(gatewayEndpoint + "/especies/" + id, Especie.class);
  }

  @QueryMapping
  public List<Producto> getProductos() {
    return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/productos", Producto[].class)));
  }

  @QueryMapping
  public Producto getProductoById(@Argument String id) {
    return restTemplate.getForObject(gatewayEndpoint + "/productos/" + id, Producto.class);
  }

  @QueryMapping
  public List<Romaneo> getRomaneos() {
    return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/romaneo", Romaneo[].class)));
  }

  @QueryMapping
  public Romaneo getRomaneoById(@Argument String id) {
    return restTemplate.getForObject(gatewayEndpoint + "/romaneo/" + id, Romaneo.class);
  }
}
