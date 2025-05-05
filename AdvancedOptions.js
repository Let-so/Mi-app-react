// OpcionesAvanzadas.jsx
import React from 'react';

function OpcionesAvanzadas({ opciones, setOpciones }) {

  function cambiarCasilla(e) {
    const { name, checked } = e.target;
    setOpciones({ ...opciones, [name]: checked });
  }

  function cambiarLargo(e) {
    setOpciones({ ...opciones, length: parseInt(e.target.value) });
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
      <h3>Opciones Avanzadas</h3>

      <div>
        <label>
          Largo de la contraseña: 
          <input 
            type="number" 
            name="length" 
            value={opciones.length} 
            min="4" 
            onChange={cambiarLargo} 
            style={{ marginLeft: '0.5rem', width: '50px' }}
          />
        </label>
      </div>

      <div>
        <label>
          <input 
            type="checkbox" 
            name="includeLowercase" 
            checked={opciones.includeLowercase} 
            onChange={cambiarCasilla} 
          />
          Incluir minúsculas
        </label>
      </div>

      <div>
        <label>
          <input 
            type="checkbox" 
            name="includeUppercase" 
            checked={opciones.includeUppercase} 
            onChange={cambiarCasilla} 
          />
          Incluir mayúsculas
        </label>
      </div>

      <div>
        <label>
          <input 
            type="checkbox" 
            name="includeNumbers" 
            checked={opciones.includeNumbers} 
            onChange={cambiarCasilla} 
          />
          Incluir números
        </label>
      </div>

      <div>
        <label>
          <input 
            type="checkbox" 
            name="includeSpecial" 
            checked={opciones.includeSpecial} 
            onChange={cambiarCasilla} 
          />
          Incluir símbolos
        </label>
      </div>
    </div>
  );
}

export default OpcionesAvanzadas;
