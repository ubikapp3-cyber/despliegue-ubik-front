import React, { useState } from 'react';
import { downloadAsJson, copyJsonToClipboard } from '../../utils/jsonExporter';
import './RegisterSelect.css';

/**
 * RegisterSelect Component
 * A form component that collects user data and exports it to JSON
 * instead of logging to console
 */
const RegisterSelect = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    categoria: '',
    mensaje: '',
  });

  const [savedData, setSavedData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   * Instead of console.log, we save to JSON
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add timestamp to the data
    const dataWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };

    // Add to saved data array
    const updatedData = [...savedData, dataWithTimestamp];
    setSavedData(updatedData);

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      categoria: '',
      mensaje: '',
    });

    // Log to console for debugging (optional, can be removed)
    console.log('Datos guardados:', dataWithTimestamp);
  };

  /**
   * Export all saved data to JSON file
   */
  const handleExportJson = () => {
    if (savedData.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const filename = `registro-datos-${new Date().toISOString().split('T')[0]}`;
    downloadAsJson(savedData, filename);
  };

  /**
   * Export current form data to JSON file
   */
  const handleExportCurrent = () => {
    if (!formData.nombre && !formData.email) {
      alert('Por favor, complete al menos el nombre y el email');
      return;
    }

    const dataWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };

    const filename = `registro-actual-${new Date().toISOString().split('T')[0]}`;
    downloadAsJson(dataWithTimestamp, filename);
  };

  /**
   * Copy data to clipboard
   */
  const handleCopyToClipboard = async () => {
    if (savedData.length === 0) {
      alert('No hay datos para copiar');
      return;
    }

    const success = await copyJsonToClipboard(savedData);
    if (success) {
      alert('Datos copiados al portapapeles');
    }
  };

  /**
   * Clear all saved data
   */
  const handleClearData = () => {
    if (window.confirm('¿Está seguro de que desea borrar todos los datos guardados?')) {
      setSavedData([]);
    }
  };

  return (
    <div className="register-select-container">
      <h1>Registro y Selección</h1>
      <p className="subtitle">
        Los datos se guardan localmente y pueden exportarse a archivo JSON
      </p>

      {showSuccess && (
        <div className="success-message">
          ✓ Datos guardados exitosamente
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ingrese su nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="123-456-7890"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="cliente">Cliente</option>
            <option value="proveedor">Proveedor</option>
            <option value="empleado">Empleado</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="4"
            placeholder="Ingrese un mensaje (opcional)"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Datos
        </button>
      </form>

      <div className="data-actions">
        <h2>Datos Guardados: {savedData.length}</h2>
        
        <div className="action-buttons">
          <button 
            onClick={handleExportJson} 
            className="btn btn-success"
            disabled={savedData.length === 0}
          >
            📥 Exportar Todos a JSON
          </button>
          
          <button 
            onClick={handleExportCurrent} 
            className="btn btn-info"
          >
            📄 Exportar Formulario Actual
          </button>
          
          <button 
            onClick={handleCopyToClipboard} 
            className="btn btn-secondary"
            disabled={savedData.length === 0}
          >
            📋 Copiar al Portapapeles
          </button>
          
          <button 
            onClick={handleClearData} 
            className="btn btn-danger"
            disabled={savedData.length === 0}
          >
            🗑️ Borrar Datos
          </button>
        </div>

        {savedData.length > 0 && (
          <div className="data-preview">
            <h3>Vista Previa de Datos:</h3>
            <pre>{JSON.stringify(savedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterSelect;
