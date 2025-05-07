import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/dasboard.css';

const BottomNavigator = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extraer la ruta actual para resaltar el ítem de menú correspondiente
    const path = location.pathname.split('/')[1] || 'dashboard';
    setActiveItem(path);
  }, [location]);

  const handleLogout = () => {
    // Eliminar tokens y datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    
    // Redireccionar al login
    navigate('/login');
  };

  return (
    <div className="side-nav">
      <div className="side-nav-items">
        <Link to="/dashboard" className={`side-nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-dashboard">⊞</i>
          </div>
          <div className="side-nav-text">Dashboard</div>
        </Link>
        
        <Link to="/procesos" className={`side-nav-item ${activeItem === 'procesos' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-procesos">⟳</i>
          </div>
          <div className="side-nav-text">Procesos</div>
        </Link>
        
        <Link to="/recepcion" className={`side-nav-item ${activeItem === 'recepcion' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-recepcion">🚗</i>
          </div>
          <div className="side-nav-text">Recepción</div>
        </Link>
        
        <Link to="/almacenamiento" className={`side-nav-item ${activeItem === 'almacenamiento' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-almacenamiento">◆</i>
          </div>
          <div className="side-nav-text">Almacenamiento</div>
        </Link>
        
        <Link to="/personal" className={`side-nav-item ${activeItem === 'personal' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-personal">👤</i>
          </div>
          <div className="side-nav-text">Personal</div>
        </Link>
        
        <Link to="/reportes" className={`side-nav-item ${activeItem === 'reportes' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-reportes">📊</i>
          </div>
          <div className="side-nav-text">Reportes</div>
        </Link>
        
        <Link to="/insumos" className={`side-nav-item ${activeItem === 'insumos' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-insumos">📄</i>
          </div>
          <div className="side-nav-text">Insumos</div>
        </Link>
        
        <Link to="/costos" className={`side-nav-item ${activeItem === 'costos' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-costos">🧮</i>
          </div>
          <div className="side-nav-text">Costos</div>
        </Link>
      </div>
      
      <div className="side-nav-footer">
        <Link to="/configuracion" className={`side-nav-item ${activeItem === 'configuracion' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-configuracion">⚙️</i>
          </div>
          <div className="side-nav-text">Configuración</div>
        </Link>
        
        <Link to="/ayuda" className={`side-nav-item ${activeItem === 'ayuda' ? 'active' : ''}`}>
          <div className="side-nav-icon">
            <i className="icon-ayuda">❓</i>
          </div>
          <div className="side-nav-text">Ayuda</div>
        </Link>
        
        <div className="side-nav-item logout" onClick={handleLogout}>
          <div className="side-nav-icon">
            <i className="icon-logout">↪</i>
          </div>
          <div className="side-nav-text">Cerrar Sesión</div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigator;