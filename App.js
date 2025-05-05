// App.jsx
import React, { useState, useEffect } from 'react';
import OpcionesAvanzadas from './OpcionesAvanzadas';
import EntradaContrasena from './EntradaContrasena';
import MedidorFortaleza from './MedidorFortaleza';

function App() {
  // Estados principales
  const [contrasena, setContrasena] = useState('');
  const [verContrasena, setVerContrasena] = useState(false);
  const [fortaleza, setFortaleza] = useState('');
  const [mensajeCopiado, setMensajeCopiado] = useState('');
  const [mostrarAvanzado, setMostrarAvanzado] = useState(false);

  const [opciones, setOpciones] = useState({
    length: 8,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecial: false,
  });

  // Función para evaluar la seguridad de la contraseña
  function evaluarFortaleza(pwd) {
    if (pwd.length < 6) return 'Poco segura';

    const tieneMinus = /[a-z]/.test(pwd);
    const tieneMayus = /[A-Z]/.test(pwd);
    const tieneNum = /[0-9]/.test(pwd);
    const tieneEspecial = /[^A-Za-z0-9]/.test(pwd);

    if (pwd.length >= 8 && tieneMinus && tieneMayus && tieneNum && tieneEspecial) {
      return 'Muy segura';
    } else if (pwd.length >= 6 && ((tieneMinus && tieneNum) || (tieneMayus && tieneNum))) {
      return 'Segura';
    } else {
      return 'Poco segura';
    }
  }

  // Actualizar fortaleza al cambiar la contraseña
  useEffect(() => {
    setFortaleza(evaluarFortaleza(contrasena));
  }, [contrasena]);

  // Copiar al portapapeles
  function copiar() {
    navigator.clipboard.writeText(contrasena)
      .then(() => {
        setMensajeCopiado('¡Contraseña copiada!');
        setTimeout(() => setMensajeCopiado(''), 3000);
      })
      .catch(() => {
        setMensajeCopiado('Error al copiar');
        setTimeout(() => setMensajeCopiado(''), 3000);
      });
  }

  // Generar contraseña aleatoria
  function generarContrasena() {
    const { length, includeLowercase, includeUppercase, includeNumbers, includeSpecial } = opciones;
    let caracteres = '';
    if (includeLowercase) caracteres += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) caracteres += '0123456789';
    if (includeSpecial) caracteres += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (caracteres === '') return;

    let generada = '';
    for (let i = 0; i < length; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      generada += caracteres[indice];
    }

    setContrasena(generada);
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h1>Fortaleza de Contraseña</h1>

      <EntradaContrasena 
        password={contrasena}
        setPassword={setContrasena}
        showPassword={verContrasena}
        setShowPassword={setVerContrasena}
      />

      <MedidorFortaleza strength={fortaleza} />

      <button onClick={copiar} style={{ marginTop: '1rem' }}>
        Copiar al portapapeles
      </button>
      {mensajeCopiado && <p style={{ color: 'green' }}>{mensajeCopiado}</p>}

      <button onClick={generarContrasena} style={{ marginTop: '1rem' }}>
        Generar contraseña aleatoria
      </button>

      <button onClick={() => setMostrarAvanzado(!mostrarAvanzado)} style={{ marginTop: '1rem' }}>
        {mostrarAvanzado ? 'Ocultar Opciones Avanzadas' : 'Mostrar Opciones Avanzadas'}
      </button>

      {mostrarAvanzado && (
        <OpcionesAvanzadas opciones={opciones} setOpciones={setOpciones} />
      )}
    </div>
  );
}

export default App;
