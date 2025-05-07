import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // URL actualizada al endpoint correcto según la configuración de tu backend
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password
      });
      
      // Guardar el token en localStorage (ajustando nombres de campos según sea necesario)
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
      } else if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }
      
      // Redirigir al usuario a la página principal
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas. Por favor, inténtelo de nuevo.');
      console.error('Error de inicio de sesión:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        {/* Esta sección muestra la imagen de fondo de granos de café */}
      </div>
      <div className="login-form-container">
        <h1 className="app-name">FAPECAFE</h1>
        <div className="login-title">INGRESO AL SISTEMA</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <div className="input-icon">
              <span className="input-icon-prefix">👤</span>
              <input
                type="text"
                className="form-control input-with-icon"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-login">
            Ingresar
          </button>
          <div className="register-link">
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;