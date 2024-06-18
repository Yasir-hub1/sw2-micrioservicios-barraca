package com.sw2.gateway.resolvers.cliente;

import com.sw2.gateway.models.cliente.Ciudad;
import com.sw2.gateway.models.cliente.Cliente;
import com.sw2.gateway.models.cliente.ClienteResponse;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ClienteMutationResolver implements GraphQLMutationResolver {

  @Autowired
  private RestTemplate restTemplate;

  @Value("${endpoint.cliente.url}")
  private String gatewayEndpoint;

  @MutationMapping
  public Cliente createCliente(@Argument("input") Cliente input) {
    ClienteResponse.Single response = restTemplate.postForObject(gatewayEndpoint + "/customer", input, ClienteResponse.Single.class);
    return response != null ? response.getData() : null;
  }

  @MutationMapping
  public Cliente updateCliente(@Argument("input") Cliente input) {
    restTemplate.put(gatewayEndpoint + "/customer-update", input);
    return restTemplate.getForObject(gatewayEndpoint + "/customers_for_id?id=" + input.id(), Cliente.class);
  }

  @MutationMapping
  public Cliente disableCliente(@Argument("input") Cliente input) {
    return restTemplate.postForObject(gatewayEndpoint + "/customer-delete", input, Cliente.class);
  }

  @MutationMapping
  public Ciudad createCiudad(@Argument("input") Ciudad input) {
    return restTemplate.postForObject(gatewayEndpoint + "/city/store", input, Ciudad.class);
  }

  @MutationMapping
  public Ciudad updateCiudad(@Argument("input") Ciudad input) {
    restTemplate.put(gatewayEndpoint + "/city/update", input);
    return restTemplate.getForObject(gatewayEndpoint + "/city/get_cities?id=" + input.id(), Ciudad.class);
  }
}