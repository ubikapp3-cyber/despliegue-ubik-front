# Solución: Guardar Datos en JSON en Lugar de Console.log

## 📋 Descripción

Este proyecto implementa una solución completa para guardar datos en archivos JSON en lugar de usar `console.log()` en el navegador. La solución incluye:

- ✅ Componente React (`RegisterSelect`) con formulario para capturar datos
- ✅ Exportación de datos a archivos JSON descargables
- ✅ API REST en Spring Boot para guardar JSON en el servidor (opcional)
- ✅ Múltiples opciones de exportación (descarga, portapapeles, servidor)
- ✅ Interfaz de usuario responsiva y profesional

## 🚀 Inicio Rápido

### Opción 1: Solo Frontend (Descarga de archivos)

```bash
# Navegar a la aplicación React
cd ubik-app

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

La aplicación se abrirá en `http://localhost:3000`

### Opción 2: Frontend + Backend (Guardar en servidor)

**Terminal 1 - Backend:**
```bash
# Navegar al backend
cd gestion-clientes-backend

# Compilar y ejecutar
./mvnw spring-boot:run
```

El backend se ejecutará en `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
# Navegar a la aplicación React
cd ubik-app

# Instalar dependencias (si no se ha hecho)
npm install

# Iniciar la aplicación
npm start
```

## 📁 Estructura del Proyecto

```
despliegue-ubik-front/
├── ubik-app/                           # Aplicación React
│   └── src/
│       ├── views/
│       │   └── register-select/        # Componente principal
│       │       ├── RegisterSelect.js   # Lógica del componente
│       │       ├── RegisterSelect.css  # Estilos
│       │       ├── index.js            # Exportación
│       │       └── README.md           # Documentación del componente
│       ├── utils/
│       │   └── jsonExporter.js         # Utilidades de exportación
│       └── App.js                      # App principal (actualizado)
│
├── gestion-clientes-backend/          # Backend Spring Boot
│   └── src/main/java/.../
│       ├── controller/
│       │   └── DataStorageController.java  # API REST
│       └── model/
│           └── JsonDataRequest.java        # DTO
│
├── BACKEND_INTEGRATION.md             # Guía de integración backend
└── README_JSON_EXPORT.md              # Este archivo
```

## 💡 Características Principales

### 1. Formulario de Registro
- Campos: Nombre, Email, Teléfono, Categoría, Mensaje
- Validación de datos
- Almacenamiento temporal en estado del componente

### 2. Exportación de Datos

#### a) Descarga de Archivo JSON
- Exportar todos los datos guardados
- Exportar solo el formulario actual
- Archivos con timestamp automático
- Formato JSON legible (pretty-printed)

#### b) Copiar al Portapapeles
- Copia rápida de datos en formato JSON
- Compatible con todos los navegadores modernos

#### c) Guardar en Servidor (Opcional)
- Requiere backend ejecutándose
- Guarda archivos en `gestion-clientes-backend/data/json-exports/`
- API REST completa para gestionar archivos

### 3. Vista Previa
- Visualización en tiempo real de los datos guardados
- Formato JSON indentado para fácil lectura
- Contador de registros guardados

## 🔧 Uso del Componente

### Uso Básico

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

### Uso de Utilidades de Exportación

```javascript
import { downloadAsJson, copyJsonToClipboard, saveToServer } from './utils/jsonExporter';

// Descargar como archivo JSON
const datos = { nombre: 'Juan', email: 'juan@ejemplo.com' };
downloadAsJson(datos, 'mis-datos');

// Copiar al portapapeles
await copyJsonToClipboard(datos);

// Guardar en servidor (requiere backend)
await saveToServer(datos, 'registro.json');
```

## 🌐 API REST (Backend)

### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/data/save` | Guarda datos en archivo JSON |
| GET | `/api/data/list` | Lista todos los archivos JSON |
| GET | `/api/data/read/{filename}` | Lee un archivo JSON específico |
| DELETE | `/api/data/delete/{filename}` | Elimina un archivo JSON |

### Ejemplo de Uso con curl

```bash
# Guardar datos
curl -X POST http://localhost:8080/api/data/save \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "registro.json",
    "data": {
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com"
    }
  }'

# Listar archivos
curl http://localhost:8080/api/data/list

# Leer archivo
curl http://localhost:8080/api/data/read/registro.json
```

Ver [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) para más detalles.

## 📊 Formato de Datos

Los datos exportados incluyen automáticamente:
- Todos los campos del formulario
- `timestamp`: Fecha y hora de creación (ISO 8601)
- `id`: Identificador único basado en timestamp

**Ejemplo de JSON generado:**

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

## 🎨 Personalización

### Modificar Campos del Formulario

Edita el estado `formData` en `RegisterSelect.js`:

```javascript
const [formData, setFormData] = useState({
  // Agrega o modifica campos aquí
  campo_nuevo: '',
  otro_campo: '',
});
```

### Cambiar Estilos

Edita `RegisterSelect.css` para personalizar la apariencia del componente.

### Agregar Validaciones

Modifica la función `handleSubmit` en `RegisterSelect.js`:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Agrega validaciones personalizadas aquí
  if (formData.telefono && !validarTelefono(formData.telefono)) {
    alert('Teléfono inválido');
    return;
  }
  
  // ... resto del código
};
```

## 🔒 Seguridad

### Frontend
- Validación de datos en el formulario
- No se almacenan datos sensibles en localStorage
- Datos temporales solo en memoria del componente

### Backend
- CORS configurado (actualizar para producción)
- Validación de nombres de archivo
- Directorio de datos fuera del classpath
- Preparado para agregar autenticación

**Recomendaciones para Producción:**
1. Implementar autenticación (JWT, OAuth)
2. Restringir CORS a dominios específicos
3. Agregar límites de tamaño de archivo
4. Validar y sanitizar todos los inputs
5. Implementar rate limiting

## 🧪 Testing

### Frontend
```bash
cd ubik-app
npm test
```

### Backend
```bash
cd gestion-clientes-backend
./mvnw test
```

## 📦 Build de Producción

### Frontend
```bash
cd ubik-app
npm run build
```

Los archivos optimizados estarán en `ubik-app/build/`

### Backend
```bash
cd gestion-clientes-backend
./mvnw clean package
```

El JAR ejecutable estará en `gestion-clientes-backend/target/`

## 🆚 Ventajas sobre console.log()

| console.log() | Solución JSON |
|---------------|---------------|
| ❌ Datos perdidos al cerrar | ✅ Datos persistentes |
| ❌ Solo en navegador | ✅ Archivos portables |
| ❌ Difícil de compartir | ✅ Fácil de compartir |
| ❌ No estructurado | ✅ Formato estándar (JSON) |
| ❌ No profesional | ✅ Solución profesional |

## 🐛 Troubleshooting

### Error: "Cannot find module 'react'"
```bash
cd ubik-app
npm install
```

### Error: Backend no responde
1. Verificar que el backend esté ejecutándose en el puerto 8080
2. Verificar configuración de CORS
3. Revisar logs del backend

### Error: "Permission denied" al ejecutar mvnw
```bash
chmod +x gestion-clientes-backend/mvnw
```

### Los datos no se descargan
- Verificar permisos de descarga en el navegador
- Deshabilitar bloqueadores de pop-ups
- Probar en modo incógnito

## 📚 Recursos Adicionales

- [Documentación del Componente](ubik-app/src/views/register-select/README.md)
- [Guía de Integración Backend](BACKEND_INTEGRATION.md)
- [React Documentation](https://react.dev/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)

## 📝 Notas Importantes

1. **Seguridad del Navegador**: Los navegadores no pueden escribir archivos directamente al sistema de archivos por razones de seguridad. Esta solución usa la API de descarga del navegador.

2. **Persistencia**: Los datos se mantienen en memoria mientras la aplicación está abierta. Para persistencia real, usa la opción de backend o considera localStorage.

3. **CORS**: En producción, actualiza la configuración CORS para permitir solo tu dominio específico.

4. **Ubicación de Archivos**: Los archivos del servidor se guardan en `data/json-exports/` (este directorio se crea automáticamente).

## 🤝 Contribuir

Para agregar nuevas funcionalidades:
1. Crea una nueva rama
2. Implementa los cambios
3. Prueba exhaustivamente
4. Envía un pull request

## 📄 Licencia

Este proyecto es parte del repositorio `ubikapp3-cyber/despliegue-ubik-front`.

---

**¿Preguntas o problemas?** Abre un issue en el repositorio.

**Última actualización:** Diciembre 2025
