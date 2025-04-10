// PasswordStrengthMeter.js
import React from 'react';

const PasswordStrengthMeter = ({ strength }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <strong>Fortaleza:</strong> {strength}
    </div>
  );
};

export default PasswordStrengthMeter;
