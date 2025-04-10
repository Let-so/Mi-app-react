// AdvancedOptions.js
import React from 'react';

const AdvancedOptions = ({ options, setOptions }) => {

  // Función para actualizar las opciones
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setOptions({
      ...options,
      [name]: type === 'checkbox' ? checked : parseInt(value)
    });
  };

  return (
    <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3>Opciones Avanzadas</h3>
      <div>
        <label>Largo de la contraseña:</label>
        <input 
          type="number" 
          name="length" 
          min="4" 
          value={options.length} 
          onChange={handleChange}
          style={{ marginLeft: '0.5rem', width: '50px' }}
        />
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            name="includeLowercase" 
            checked={options.includeLowercase} 
            onChange={handleChange} 
          />
          Incluir letras minúsculas
        </label>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            name="includeUppercase" 
            checked={options.includeUppercase} 
            onChange={handleChange} 
          />
          Incluir letras mayúsculas
        </label>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            name="includeNumbers" 
            checked={options.includeNumbers} 
            onChange={handleChange} 
          />
          Incluir números
        </label>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            name="includeSpecial" 
            checked={options.includeSpecial} 
            onChange={handleChange} 
          />
          Incluir caracteres especiales
        </label>
      </div>
    </div>
  );
};

export default AdvancedOptions;
