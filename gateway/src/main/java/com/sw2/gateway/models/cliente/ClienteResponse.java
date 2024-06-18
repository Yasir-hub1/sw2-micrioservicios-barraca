package com.sw2.gateway.models.cliente;

import java.util.List;
import java.util.Map;

public class ClienteResponse {
  public static class Single {
    private Cliente data;

    public Cliente getData() {
      return data;
    }

    public void setData(Cliente data) {
      this.data = data;
    }
  }

  public static class Multiple {
    private Map<String, Cliente> data;

    public Map<String, Cliente> getData() {
      return data;
    }

    public void setData(Map<String, Cliente> data) {
      this.data = data;
    }
  }
}

