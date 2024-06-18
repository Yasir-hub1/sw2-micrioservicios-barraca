package com.sw2.gateway.models.cliente;


import com.fasterxml.jackson.annotation.JsonProperty;

public record Cliente(@JsonProperty("_id")String id,
                      Integer code,
                      String nit,
                      String ci,
                      String complement,
                      String name,
                      String phone,
                      String address,
                      String email,
                      Integer state,
                      @JsonProperty("city_id")String city_id) {}

