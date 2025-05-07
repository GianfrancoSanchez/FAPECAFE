import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../common/siderbar'; // Barra de navegación superior
import BottomNavigator from '../common/bottonnavigator'; // Barra de navegación lateral
import '../../../styles/dasboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  // Usar el userData en un elemento del UI para evitar warning
  const [userData, setUserData] = useState({
    nombre: 'Usuario FAPECAFE',
    rol: 'Cliente'
  });
  const [isLoading, setIsLoading] = useState(false);
  // Eliminar setProcesoActual de la desestructuración si no se usa
  const [procesoActual] = useState({
    tiempoTranscurrido: "1:36:05",
    tiempoEstimado: "2:30:00",
    fecha: "18-Jun 24",
    finca: "Finca Santa María",
    kgEntrada: 5.9,
    kgSalida: 4.9,
    fase: 2, // Fase actual (1, 2, 3, o 4)
  });
  
  // Eliminar setCafeQuintales de la desestructuración si no se usa
  const [cafeQuintales] = useState([
    { tipo: 1, cantidad: 80, fecha: "18-Jun 24" },
    { tipo: 2, cantidad: 180, fecha: "18-Jun 24" },
    { tipo: 3, cantidad: 78, fecha: "18-Jun 24" },
    { tipo: 1, cantidad: 80, fecha: "18-Jun 24" }
  ]);
  
  // Comprobar autenticación al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Aquí podrías hacer una solicitud a tu API para obtener los datos del usuario
    setIsLoading(true);
    setTimeout(() => {
      // Simulamos la carga de datos
      const nombreUsuario = localStorage.getItem('userName') || 'Usuario FAPECAFE';
      setUserData({
        nombre: nombreUsuario,
        rol: 'Cliente'
      });
      setIsLoading(false);
    }, 500);
  }, [navigate]);

  // Función para renderizar los indicadores de fase
  const renderFaseIndicators = () => {
    const indicators = [];
    for (let i = 1; i <= 4; i++) {
      indicators.push(
        <div 
          key={i} 
          className={`fase-indicator ${i <= procesoActual.fase ? 'active' : ''}`}
        >
          {i}
        </div>
      );
    }
    return indicators;
  };
  
  // Función para renderizar los QR codes
  const renderQRCodes = () => {
    return (
      <div className="qr-code-container">
        <div className="qr-code-item real-qr">
          <div className="qr-pattern"></div>
        </div>
        <div className="qr-code-item real-qr">
          <div className="qr-pattern"></div>
        </div>
        <div className="qr-code-item real-qr">
          <div className="qr-pattern"></div>
        </div>
        <div className="qr-code-item real-qr qr-with-logo">
          <div className="qr-pattern"></div>
          <div className="qr-logo"></div>
        </div>
      </div>
    );
  };
  
  // Datos para la gráfica de barras con Y-axis labels
  const chartData = [
    { value: 150, month: 0 },
    { value: 650, month: 1 }, 
    { value: 550, month: 2 }, 
    { value: 500, month: 3 }, 
    { value: 250, month: 4 }, 
    { value: 650, month: 5 }, 
    { value: 850, month: 6 }, 
    { value: 800, month: 7 }, 
    { value: 150, month: 8 }, 
    { value: 750, month: 9 }
  ];

  // Etiquetas del eje Y para el gráfico
  const yAxisLabels = [
    { value: 1000, label: "1000" },
    { value: 750, label: "750" },
    { value: 500, label: "500" },
    { value: 250, label: "250" },
    { value: 0, label: "0" }
  ];

  return (
    <div className="app-container">
      {/* Barra superior */}
      <Sidebar />
      
      <div className="dashboard-container">
        {/* Barra lateral */}
        <BottomNavigator />
        
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div className="dashboard-title">DASHBOARD</div>
            <div className="search-container">
              <input type="text" placeholder="Buscar..." className="search-input" />
              <button className="search-button">🔍</button>
            </div>
            <div className="date-range">
              <span className="date-label">12 May 25 - 12 Jun 25</span>
              <button className="export-button">Exportar</button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="loading">Cargando datos...</div>
          ) : (
            <div className="dashboard-main">
              {/* Panel de Tiempo Real del proceso actual */}
              <div className="panel proceso-actual">
                <div className="proceso-titulo">Tiempo Real del proceso actual</div>
                <div className="proceso-content">
                  <div className="proceso-tiempo">
                    <div className="tiempo-transcurrido">{procesoActual.tiempoTranscurrido}</div>
                    <div className="tiempo-label">Tiempo transcurrido</div>
                    <div className="tiempo-estimado">{procesoActual.tiempoEstimado}</div>
                    <div className="tiempo-label">Tiempo estimado</div>
                  </div>
                  
                  <div className="proceso-info">
                    <div className="info-row">
                      <span className="info-icon">📅</span>
                      <span className="info-text">{procesoActual.fecha}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">📍</span>
                      <span className="info-text">{procesoActual.finca}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">⬆️</span>
                      <span className="info-text">{procesoActual.kgEntrada} Kg entrada</span>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">⬇️</span>
                      <span className="info-text">{procesoActual.kgSalida} Kg salida</span>
                    </div>
                  </div>
                  
                  <div className="proceso-fases">
                    <div className="fase-indicators">
                      {renderFaseIndicators()}
                    </div>
                    <div className="fase-progress-bar">
                      <div 
                        className="fase-progress" 
                        style={{ width: `${(procesoActual.fase / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="proceso-qr-codes">
                    {renderQRCodes()}
                  </div>
                  
                  <div className="proceso-buttons">
                    <button className="btn-finalizar">Finalizar proceso</button>
                    <button className="btn-avanzar">Avanzar proceso</button>
                  </div>
                </div>
              </div>
              
              {/* Contadores de Quintales de Café */}
              <div className="quintales-container">
                {cafeQuintales.map((item, idx) => (
                  <div className="panel quintales-item" key={idx}>
                    <div className="quintales-fecha">{item.fecha}</div>
                    <div className="quintales-cantidad">{item.cantidad}</div>
                    <div className="quintales-tipo">
                      <span className="quintales-icon">☕</span>
                      <span>Quintales de café tipo {item.tipo}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Panel de Tiempo Mensual - Gráfico de barras */}
              <div className="panel tiempo-mensual">
                <div className="tiempo-mensual-titulo">Tiempo mensual</div>
                <div className="chart-with-times">
                  <div className="chart-area">
                    <div className="y-axis">
                      {yAxisLabels.map((label, idx) => (
                        <div className="y-axis-label" key={idx} style={{ bottom: `${(label.value/1000)*100}%` }}>
                          {label.label}
                        </div>
                      ))}
                    </div>
                    
                    <div className="chart-container">
                      <div className="chart-grid">
                        {yAxisLabels.map((label, idx) => (
                          <div className="grid-line" key={idx} style={{ bottom: `${(label.value/1000)*100}%` }}></div>
                        ))}
                      </div>
                      <div className="bar-chart">
                        {chartData.map((item, idx) => (
                          <div className="chart-column" key={idx}>
                            <div 
                              className="chart-bar" 
                              style={{ height: `${(item.value / 1000) * 100}%` }}
                            ></div>
                            <div className="chart-label">{item.month}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="tiempos-info">
                    <div className="tiempo-row">
                      <div className="tiempo-item">
                        <div className="tiempo-valor" style={{ color: "#1F77B4" }}>2:30:00</div>
                        <div className="tiempo-titulo">Tiempo contratado</div>
                      </div>
                      
                      <div className="tiempo-item">
                        <div className="tiempo-valor" style={{ color: "#00A651" }}>0:10:00</div>
                        <div className="tiempo-titulo">Tiempo consumido</div>
                      </div>
                    </div>
                    
                    <div className="tiempo-row">
                      <div className="tiempo-item">
                        <div className="tiempo-valor" style={{ color: "#1F77B4" }}>10:30:00</div>
                        <div className="tiempo-monto" style={{ color: "#00A651" }}>$ 50.00</div>
                        <div className="tiempo-titulo">Tiempo contratado</div>
                      </div>
                      
                      <div className="tiempo-item">
                        <div className="tiempo-valor" style={{ color: "#1F77B4" }}>9:30:00</div>
                        <div className="tiempo-monto" style={{ color: "#00A651" }}>$ 250.00</div>
                        <div className="tiempo-titulo">Tiempo contratado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;