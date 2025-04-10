// App.js
import React, { useState, useEffect } from 'react';
import PasswordInput from './PasswordInput';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import AdvancedOptions from './AdvancedOptions';

const App = () => {
  // Estado principal: contraseña, visibilidad, parámetros de generación, mensaje de copia
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [options, setOptions] = useState({
    length: 8,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecial: false,
  });

  // Función para evaluar la fortaleza de la contraseña
  const evaluateStrength = (pwd) => {
    if (pwd.length < 6) {
      return 'Poco segura';
    }
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    
    if (pwd.length >= 8 && hasLower && hasUpper && hasNumber && hasSpecial) {
      return 'Muy segura';
    } else if (pwd.length >= 6 && ((hasLower && hasNumber) || (hasUpper && hasNumber))) {
      return 'Segura';
    } else {
      return 'Poco segura';
    }
  };

  // Actualizar fortaleza cuando la contraseña cambia
  useEffect(() => {
    setStrength(evaluateStrength(password));
  }, [password]);

  // Función para copiar la contraseña al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopyMessage('¡Contraseña copiada!');
        setTimeout(() => setCopyMessage(''), 3000);
      })
      .catch(() => {
        setCopyMessage('Error al copiar');
        setTimeout(() => setCopyMessage(''), 3000);
      });
  };

  // Función para generar una contraseña aleatoria
  const generatePassword = () => {
    const { length, includeLowercase, includeUppercase, includeNumbers, includeSpecial } = options;
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecial) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (charset === '') return ''; // Evitar cadena vacía
    let generated = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }
    setPassword(generated);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h1>Fortaleza de Contraseña</h1>
      {/* Componente de entrada de contraseña */}
      <PasswordInput 
        password={password} 
        setPassword={setPassword} 
        showPassword={showPassword} 
        setShowPassword={setShowPassword} 
      />
      
      {/* Botón para evaluar la fortaleza (también se actualiza automáticamente al escribir) */}
      <PasswordStrengthMeter strength={strength} />

      {/* Botón para copiar la contraseña */}
      <button onClick={copyToClipboard} style={{ marginTop: '1rem' }}>
        Copiar al portapapeles
      </button>
      {copyMessage && <p style={{ color: 'green' }}>{copyMessage}</p>}

      {/* Botón para generar una contraseña aleatoria */}
      <button onClick={generatePassword} style={{ marginTop: '1rem' }}>
        Generar contraseña aleatoria
      </button>

      {/* Botón para mostrar/ocultar panel avanzado */}
      <button onClick={() => setShowAdvanced(!showAdvanced)} style={{ marginTop: '1rem' }}>
        {showAdvanced ? 'Ocultar Opciones Avanzadas' : 'Mostrar Opciones Avanzadas'}
      </button>

      {/* Panel avanzado para configuración de generación de contraseña */}
      {showAdvanced && <AdvancedOptions options={options} setOptions={setOptions} />}
    </div>
  );
};

export default App;
