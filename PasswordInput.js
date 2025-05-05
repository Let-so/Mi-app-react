// EntradaContrasena.jsx
import React from 'react';

function EntradaContrasena({ password, setPassword, showPassword, setShowPassword }) {
  function manejarCambio(e) {
    setPassword(e.target.value);
  }

  function alternarVisibilidad() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <label>Contraseña:</label>
      <div>
        <input 
          type={showPassword ? 'text' : 'password'} 
          value={password} 
          onChange={manejarCambio} 
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
        <button onClick={alternarVisibilidad} style={{ marginLeft: '0.5rem' }}>
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </div>
  );
}

export default EntradaContrasena;
