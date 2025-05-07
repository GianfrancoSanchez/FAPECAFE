import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/dasboard.css';

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    // Obtener nombre del usuario desde localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Eliminar tokens y datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    
    // Redireccionar al login
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <h2>FAPECAFE</h2>
      </div>
      
      <div className="navbar-user">
        <div className="user-name-display">
          {userName}
        </div>
        
        <div className="user-profile" onClick={toggleDropdown}>
          <div className="user-avatar">
            <span className="avatar-placeholder">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <button onClick={() => {
                navigate('/perfil');
                setDropdownOpen(false);
              }}>
                Mi Perfil
              </button>
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;