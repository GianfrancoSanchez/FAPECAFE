import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Verificar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Aquí puedes configurar la llamada a tu API de backend
      await axios.post('http://localhost:8000/api/users/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword, 
        first_name: formData.firstName,
        last_name: formData.lastName
      });
      
      setSuccess('¡Registro exitoso! Redirigiendo al inicio de sesión...');
      
      // Redirigir al usuario a la página de login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        // Manejar errores específicos del backend
        let errorMsg = '';
        if (typeof err.response.data === 'object') {
          // Formatear los errores del objeto de respuesta
          Object.keys(err.response.data).forEach(key => {
            const value = err.response.data[key];
            if (Array.isArray(value)) {
              errorMsg += `${value.join(' ')} `;
            } else if (typeof value === 'string') {
              errorMsg += `${value} `;
            }
          });
        } else {
          errorMsg = 'Error en el registro. Por favor, inténtelo de nuevo.';
        }
        setError(errorMsg.trim() || 'Error en el registro. Por favor, inténtelo de nuevo.');
      } else {
        setError('Error en el registro. Por favor, inténtelo de nuevo.');
      }
      console.error('Error de registro:', err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        {/* Esta sección muestra la imagen de fondo de granos de café */}
      </div>
      <div className="register-form-container">
        <h1 className="app-name">FAPECAFE</h1>
        <div className="register-title">REGISTRO DE USUARIO</div>
        
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nombre</label>
              <div className="input-icon">
                <span className="input-icon-prefix">👤</span>
                <input
                  type="text"
                  className="form-control input-with-icon"
                  id="firstName"
                  name="firstName"
                  placeholder="Nombre"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <div className="input-icon">
                <span className="input-icon-prefix">👤</span>
                <input
                  type="text"
                  className="form-control input-with-icon"
                  id="lastName"
                  name="lastName"
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <div className="input-icon">
              <span className="input-icon-prefix">👤</span>
              <input
                type="text"
                  className="form-control input-with-icon"
                  id="username"
                  name="username"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-icon">
              <span className="input-icon-prefix">✉️</span>
              <input
                type="email"
                className="form-control input-with-icon"
                id="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-icon">
              <span className="input-icon-prefix">🔒</span>
              <input
                type="password"
                className="form-control input-with-icon"
                id="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className="input-icon">
              <span className="input-icon-prefix">🔒</span>
              <input
                type="password"
                className="form-control input-with-icon"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn-register">
            Registrarse
          </button>
          
          <div className="login-link">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;