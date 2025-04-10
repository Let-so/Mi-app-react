// PasswordInput.js
import React from 'react';

const PasswordInput = ({ password, setPassword, showPassword, setShowPassword }) => {
  return (
    <div>
      <label>Contraseña:</label>
      <div>
        <input 
          type={showPassword ? 'text' : 'password'} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
        <button onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: '0.5rem' }}>
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
