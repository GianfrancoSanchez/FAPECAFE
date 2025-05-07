import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/auth/cliente/dashboard';
import './App.css';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Si no hay token, redirigir al login
    return <Navigate to="/login" replace />;
  }
  
  // Si hay token, renderizar las rutas hijas (Outlet es un componente de React Router)
  return <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas que requieren autenticación */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Aquí puedes añadir más rutas protegidas como:
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/productos" element={<Productos />} /> 
          etc. */}
        </Route>
        
        {/* Ruta por defecto: redirige al login */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        
        {/* Ruta para URLs no encontradas */}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
