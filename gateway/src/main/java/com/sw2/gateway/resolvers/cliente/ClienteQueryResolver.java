package com.sw2.gateway.resolvers.cliente;

import com.sw2.gateway.models.cliente.Ciudad;
import com.sw2.gateway.models.cliente.Cliente;
import com.sw2.gateway.models.cliente.ClienteResponse;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Controller
public class ClienteQueryResolver implements GraphQLQueryResolver {

  @Autowired
  private RestTemplate restTemplate;

  @Value("${endpoint.cliente.url}")
  private String gatewayEndpoint;

  @QueryMapping
  public List<Cliente> getClientes() {
    ClienteResponse.Multiple response = restTemplate.getForObject(gatewayEndpoint + "/customers", ClienteResponse.Multiple.class);
    return response != null ? new ArrayList<>(response.getData().values()) : new ArrayList<>();
  }

  @QueryMapping
  public Cliente getClienteById(@Argument String id) {
    String url = gatewayEndpoint + "/customers_for_id";
    Map<String, String> requestBody = new HashMap<>();
    requestBody.put("id", id);
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
    ResponseEntity<ClienteResponse.Single> response = restTemplate.exchange(
        url,
        HttpMethod.GET,
        entity,
        ClienteResponse.Single.class
    );
    return response.getBody() != null ? response.getBody().getData() : null;
  }

  @QueryMapping
  public List<Cliente> getListEnabled() {
    return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/customer/get_list_enabled", Cliente[].class)));
  }

  @QueryMapping
  public List<Cliente> selectCustomer(@Argument String name,@Argument String nit) {
    return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/customer/select_customer?name=" + name + "&nit=" + nit, Cliente[].class)));
  }

  @QueryMapping
  public List<Cliente> autocompleteCustomer(@Argument String search) {
    return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/customer/autocomplete_customer?search=" + search, Cliente[].class)));
  }

  @QueryMapping
  public List<Ciudad> getCiudades() {
    return Arrays.asList(Objects.requireNonNull(restTemplate.getForObject(gatewayEndpoint + "/city/get_cities", Ciudad[].class)));
  }

  @QueryMapping
  public Ciudad getCiudadById(@Argument String id) {
    return restTemplate.getForObject(gatewayEndpoint + "/city/get_cities?id=" + id, Ciudad.class);
  }
}
