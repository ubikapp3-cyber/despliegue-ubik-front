# Backend Integration Example

## Overview

This document shows how to integrate the frontend RegisterSelect component with the backend DataStorageController.

## Backend Endpoints

The `DataStorageController` provides the following REST endpoints:

### 1. Save Data
**POST** `/api/data/save`

Saves data to a JSON file on the server.

**Request Body:**
```json
{
  "filename": "registro-datos.json",
  "data": {
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "telefono": "123-456-7890",
    "categoria": "cliente",
    "mensaje": "Mensaje de ejemplo",
    "timestamp": "2025-12-15T13:30:00.000Z",
    "id": 1734270600000
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Datos guardados exitosamente",
  "filename": "registro-datos.json",
  "path": "data/json-exports/registro-datos.json",
  "timestamp": "2025-12-15T13:30:00"
}
```

### 2. List Files
**GET** `/api/data/list`

Lists all saved JSON files.

**Response:**
```json
{
  "success": true,
  "files": ["registro-datos.json", "backup-2025-12-15.json"],
  "count": 2,
  "directory": "data/json-exports"
}
```

### 3. Read File
**GET** `/api/data/read/{filename}`

Reads a specific JSON file.

**Response:**
```json
{
  "success": true,
  "filename": "registro-datos.json",
  "data": { ... }
}
```

### 4. Delete File
**DELETE** `/api/data/delete/{filename}`

Deletes a specific JSON file.

**Response:**
```json
{
  "success": true,
  "message": "Archivo eliminado exitosamente",
  "filename": "registro-datos.json"
}
```

## Frontend Integration

### Update jsonExporter.js to use backend

```javascript
// Updated saveToServer function
export const saveToServer = async (data, filename = 'data.json') => {
  try {
    const response = await fetch('http://localhost:8080/api/data/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: filename,
        data: data,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Data successfully saved to server:', result);
    return result;
  } catch (error) {
    console.error('Error saving data to server:', error);
    throw error;
  }
};
```

### Update RegisterSelect.js to add backend save option

Add this button to the component:

```javascript
const handleSaveToServer = async () => {
  if (savedData.length === 0) {
    alert('No hay datos para guardar en el servidor');
    return;
  }

  try {
    const filename = `registro-datos-${new Date().toISOString().split('T')[0]}.json`;
    const result = await saveToServer(savedData, filename);
    
    if (result.success) {
      alert(`Datos guardados en el servidor: ${result.filename}`);
    }
  } catch (error) {
    alert('Error al guardar en el servidor. Verifique que el backend esté ejecutándose.');
  }
};

// In the render section, add:
<button 
  onClick={handleSaveToServer} 
  className="btn btn-warning"
  disabled={savedData.length === 0}
>
  💾 Guardar en Servidor
</button>
```

## CORS Configuration

The controller already includes `@CrossOrigin(origins = "*")` to allow requests from the React app.

For production, update this to specify the exact frontend URL:

```java
@CrossOrigin(origins = "http://your-frontend-domain.com")
```

## Running the Application

### Start Backend
```bash
cd gestion-clientes-backend
./mvnw spring-boot:run
```

The backend will run on `http://localhost:8080`

### Start Frontend
```bash
cd ubik-app
npm start
```

The frontend will run on `http://localhost:3000`

## File Storage Location

JSON files are saved in: `gestion-clientes-backend/data/json-exports/`

To change this location, update the `DATA_DIRECTORY` constant in `DataStorageController.java`:

```java
private static final String DATA_DIRECTORY = "your/custom/path";
```

## Security Considerations

1. **Authentication**: Add authentication to protect the endpoints
2. **Input Validation**: Validate filenames to prevent path traversal attacks
3. **File Size Limits**: Add limits to prevent disk space issues
4. **CORS**: Restrict origins in production

Example with authentication:

```java
@PostMapping("/save")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<Map<String, Object>> saveData(@RequestBody JsonDataRequest request) {
    // ... existing code
}
```

## Testing the API

### Using curl

```bash
# Save data
curl -X POST http://localhost:8080/api/data/save \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "test-data.json",
    "data": {"test": "value"}
  }'

# List files
curl http://localhost:8080/api/data/list

# Read file
curl http://localhost:8080/api/data/read/test-data.json

# Delete file
curl -X DELETE http://localhost:8080/api/data/delete/test-data.json
```

### Using Postman or Insomnia

1. Import the endpoints
2. Set Content-Type: application/json
3. Test each endpoint with sample data

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "ErrorType"
}
```

Handle these in the frontend:

```javascript
try {
  const result = await saveToServer(data, filename);
  if (result.success) {
    // Success handling
  }
} catch (error) {
  console.error('Error:', error);
  alert('Error al comunicarse con el servidor');
}
```
