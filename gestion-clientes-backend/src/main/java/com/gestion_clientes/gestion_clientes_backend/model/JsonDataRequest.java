package com.gestion_clientes.gestion_clientes_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;

/**
 * DTO para recibir datos del frontend y guardarlos en formato JSON
 */
public class JsonDataRequest {
    
    @JsonProperty("filename")
    private String filename;
    
    @JsonProperty("data")
    private Object data;
    
    public JsonDataRequest() {
    }
    
    public JsonDataRequest(String filename, Object data) {
        this.filename = filename;
        this.data = data;
    }
    
    public String getFilename() {
        return filename;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
    
    public Object getData() {
        return data;
    }
    
    public void setData(Object data) {
        this.data = data;
    }
}
