package com.gestion_clientes.gestion_clientes_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestion_clientes.gestion_clientes_backend.model.JsonDataRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

/**
 * Controlador REST para guardar datos en archivos JSON
 * Proporciona endpoints para que el frontend pueda guardar datos
 * en el servidor en lugar de solo en la consola del navegador
 */
@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = "*") // Permitir solicitudes desde el frontend
public class DataStorageController {
    
    private static final String DATA_DIRECTORY = "data/json-exports";
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limit
    private final ObjectMapper objectMapper;
    
    public DataStorageController() {
        this.objectMapper = new ObjectMapper();
        // Crear directorio si no existe
        createDataDirectory();
    }
    
    /**
     * Crear directorio para almacenar archivos JSON
     */
    private void createDataDirectory() {
        try {
            Path path = Paths.get(DATA_DIRECTORY);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
                System.out.println("Directorio creado: " + DATA_DIRECTORY);
            }
        } catch (IOException e) {
            System.err.println("Error al crear directorio: " + e.getMessage());
        }
    }
    
    /**
     * Sanitize filename to prevent path traversal attacks
     */
    private String sanitizeFilename(String filename) {
        if (filename == null || filename.isEmpty()) {
            return "data-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss")) + ".json";
        }
        
        // Remove any path separators and dangerous characters
        filename = filename.replaceAll("[/\\\\]", "")
                          .replaceAll("\\.\\.", "")
                          .replaceAll("[^a-zA-Z0-9._-]", "_");
        
        // Ensure .json extension
        if (!filename.endsWith(".json")) {
            filename += ".json";
        }
        
        return filename;
    }
    
    /**
     * Endpoint for guardar datos en archivo JSON
     * POST /api/data/save
     * 
     * Body ejemplo:
     * {
     *   "filename": "registro-datos.json",
     *   "data": { ... datos ... }
     * }
     */
    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveData(@RequestBody JsonDataRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Sanitize and validate filename
            String filename = sanitizeFilename(request.getFilename());
            
            // Validate data size
            String jsonString = objectMapper.writeValueAsString(request.getData());
            if (jsonString.length() > MAX_FILE_SIZE) {
                response.put("success", false);
                response.put("message", "Data size exceeds maximum allowed size of " + (MAX_FILE_SIZE / 1024 / 1024) + " MB");
                return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(response);
            }
            
            // Create ruta completa del archivo
            Path filePath = Paths.get(DATA_DIRECTORY, filename);
            
            // Escribir datos en archivo JSON con formato
            objectMapper.writerWithDefaultPrettyPrinter()
                       .writeValue(filePath.toFile(), request.getData());
            
            response.put("success", true);
            response.put("message", "Datos guardados exitosamente");
            response.put("filename", filename);
            response.put("path", filePath.toString());
            response.put("timestamp", LocalDateTime.now().toString());
            
            System.out.println("Archivo guardado: " + filePath.toString());
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Error al guardar datos: " + e.getMessage());
            response.put("error", e.getClass().getSimpleName());
            
            System.err.println("Error al guardar archivo: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para listar archivos JSON guardados
     * GET /api/data/list
     */
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> listFiles() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Path dirPath = Paths.get(DATA_DIRECTORY);
            
            if (!Files.exists(dirPath)) {
                response.put("success", true);
                response.put("files", new String[0]);
                response.put("count", 0);
                return ResponseEntity.ok(response);
            }
            
            File[] files = dirPath.toFile().listFiles((dir, name) -> name.endsWith(".json"));
            
            if (files == null) {
                files = new File[0];
            }
            
            String[] fileNames = new String[files.length];
            for (int i = 0; i < files.length; i++) {
                fileNames[i] = files[i].getName();
            }
            
            response.put("success", true);
            response.put("files", fileNames);
            response.put("count", files.length);
            response.put("directory", DATA_DIRECTORY);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al listar archivos: " + e.getMessage());
            response.put("error", e.getClass().getSimpleName());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para leer un archivo JSON específico
     * GET /api/data/read/{filename}
     */
    @GetMapping("/read/{filename}")
    public ResponseEntity<Map<String, Object>> readFile(@PathVariable String filename) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Sanitize filename
            filename = sanitizeFilename(filename);
            
            Path filePath = Paths.get(DATA_DIRECTORY, filename);
            
            if (!Files.exists(filePath)) {
                response.put("success", false);
                response.put("message", "Archivo no encontrado: " + filename);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            // Leer contenido del archivo
            Object data = objectMapper.readValue(filePath.toFile(), Object.class);
            
            response.put("success", true);
            response.put("filename", filename);
            response.put("data", data);
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Error al leer archivo: " + e.getMessage());
            response.put("error", e.getClass().getSimpleName());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Endpoint para eliminar un archivo JSON
     * DELETE /api/data/delete/{filename}
     */
    @DeleteMapping("/delete/{filename}")
    public ResponseEntity<Map<String, Object>> deleteFile(@PathVariable String filename) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Sanitize filename
            filename = sanitizeFilename(filename);
            
            Path filePath = Paths.get(DATA_DIRECTORY, filename);
            
            if (!Files.exists(filePath)) {
                response.put("success", false);
                response.put("message", "Archivo no encontrado: " + filename);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            Files.delete(filePath);
            
            response.put("success", true);
            response.put("message", "Archivo eliminado exitosamente");
            response.put("filename", filename);
            
            System.out.println("Archivo eliminado: " + filePath.toString());
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Error al eliminar archivo: " + e.getMessage());
            response.put("error", e.getClass().getSimpleName());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
