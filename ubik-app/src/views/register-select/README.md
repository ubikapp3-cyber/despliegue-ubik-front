# RegisterSelect Component

## Descripción

El componente `RegisterSelect` es una solución para guardar datos en formato JSON en lugar de usar `console.log()`. Este componente proporciona una interfaz de formulario que permite capturar datos y exportarlos a archivos JSON.

## Características

- ✅ Formulario para capturar datos del usuario
- ✅ Almacenamiento temporal de datos en el estado del componente
- ✅ Exportación de datos a archivos JSON descargables
- ✅ Copia de datos al portapapeles
- ✅ Vista previa de los datos guardados
- ✅ Interfaz responsive y amigable

## Ubicación

```
ubik-app/
└── src/
    ├── views/
    │   └── register-select/
    │       ├── RegisterSelect.js    # Componente principal
    │       ├── RegisterSelect.css   # Estilos del componente
    │       └── index.js             # Exportación del componente
    └── utils/
        └── jsonExporter.js          # Utilidades para exportar JSON
```

## Uso

### 1. Importar el componente

```javascript
import RegisterSelect from './views/register-select';

function App() {
  return (
    <div className="App">
      <RegisterSelect />
    </div>
  );
}
```

### 2. Funcionalidades disponibles

#### Guardar Datos
- Completa el formulario con la información requerida
- Haz clic en "Guardar Datos"
- Los datos se almacenan localmente en el estado del componente

#### Exportar a JSON
- **Exportar Todos**: Descarga todos los datos guardados en un archivo JSON
- **Exportar Formulario Actual**: Descarga solo los datos del formulario actual

#### Otras Opciones
- **Copiar al Portapapeles**: Copia todos los datos en formato JSON
- **Borrar Datos**: Elimina todos los datos guardados

## Utilidades de Exportación

El archivo `jsonExporter.js` proporciona funciones útiles:

### `downloadAsJson(data, filename)`
Descarga datos como archivo JSON al computador del usuario.

```javascript
import { downloadAsJson } from '../utils/jsonExporter';

const datos = { nombre: 'Juan', email: 'juan@ejemplo.com' };
downloadAsJson(datos, 'mis-datos');
// Descarga el archivo: mis-datos.json
```

### `saveToServer(data, endpoint, filename)`
Envía datos a un servidor backend para guardarlos (requiere configurar endpoint).

```javascript
import { saveToServer } from '../utils/jsonExporter';

const datos = { nombre: 'Juan', email: 'juan@ejemplo.com' };
await saveToServer(datos, 'http://localhost:8080/api/save', 'datos.json');
```

### `copyJsonToClipboard(data)`
Copia datos en formato JSON al portapapeles.

```javascript
import { copyJsonToClipboard } from '../utils/jsonExporter';

const datos = { nombre: 'Juan', email: 'juan@ejemplo.com' };
await copyJsonToClipboard(datos);
```

## Formato de los Datos

Los datos exportados incluyen:
- Todos los campos del formulario
- Timestamp (fecha y hora de registro)
- ID único para cada registro

Ejemplo de estructura JSON:

```json
[
  {
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "telefono": "123-456-7890",
    "categoria": "cliente",
    "mensaje": "Mensaje de ejemplo",
    "timestamp": "2025-12-15T13:30:00.000Z",
    "id": 1734270600000
  }
]
```

## Integración con Backend (Opcional)

Para guardar datos en el servidor en lugar de descargarlos, puedes crear un endpoint REST:

### Spring Boot (Java)

```java
@RestController
@RequestMapping("/api")
public class DataController {
    
    @PostMapping("/save")
    public ResponseEntity<?> saveData(@RequestBody Map<String, Object> request) {
        String filename = (String) request.get("filename");
        Object data = request.get("data");
        
        // Guardar en archivo
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(new File("data/" + filename), data);
        
        return ResponseEntity.ok(Map.of("success", true, "message", "Datos guardados"));
    }
}
```

### Node.js (Express)

```javascript
const express = require('express');
const fs = require('fs').promises;
const app = express();

app.post('/api/save', async (req, res) => {
  const { filename, data } = req.body;
  
  try {
    await fs.writeFile(`data/${filename}`, JSON.stringify(data, null, 2));
    res.json({ success: true, message: 'Datos guardados' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Uso en el componente

```javascript
import { saveToServer } from '../../utils/jsonExporter';

const handleSaveToServer = async () => {
  try {
    await saveToServer(savedData, 'http://localhost:8080/api/save', 'registro.json');
    alert('Datos guardados en el servidor');
  } catch (error) {
    alert('Error al guardar en el servidor');
  }
};
```

## Ventajas sobre console.log()

1. **Persistencia**: Los datos se pueden descargar y guardar permanentemente
2. **Portabilidad**: Los archivos JSON pueden ser importados en otras aplicaciones
3. **Profesionalismo**: Solución más robusta que logging en consola
4. **Análisis**: Los datos pueden ser procesados, analizados o importados a bases de datos
5. **Respaldo**: Se crean copias de seguridad de la información

## Notas Importantes

- Los navegadores no pueden escribir archivos directamente al sistema de archivos por razones de seguridad
- La solución implementada usa la API de descarga del navegador
- Para guardar en el servidor, se requiere implementar un backend
- Los datos se almacenan temporalmente en el estado del componente mientras la aplicación está abierta
- Para persistencia real, considera usar localStorage, sessionStorage o un backend

## Personalización

Puedes personalizar el componente según tus necesidades:

1. **Campos del formulario**: Modifica los campos en el estado `formData`
2. **Estilos**: Edita `RegisterSelect.css` para cambiar la apariencia
3. **Validaciones**: Agrega validaciones adicionales en `handleSubmit`
4. **Formato de exportación**: Modifica las funciones en `jsonExporter.js`

## Pruebas

Para probar el componente:

```bash
cd ubik-app
npm start
```

La aplicación se abrirá en `http://localhost:3000`
