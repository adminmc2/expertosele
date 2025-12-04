import { useState, useEffect } from 'react';
import './Portada.css';

interface PortadaProps {
  // Mantenemos el nombre 'onStartClick' como estaba en tu código original
  onStartClick: () => void;
}

const Portada: React.FC<PortadaProps> = ({ onStartClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="portada-container">
      {/* Logos sin cambios */}
      <div className="logo-container">
        <img src="/logo emc2.png" alt="Logo EMC2" />
        <img
          src="/Hablandis_Kit de marca_Logo + tagline-03_Negro.png"
          alt="Logo Hablandis"
        />
      </div>

      {/* Fondo izquierdo sin cambios */}
      <div className="left-background"></div>

      {/* Imagen derecha sin cambios */}
      <div className="background-image-container">
        <img
          src="/portada.png" // Asegúrate que esta imagen exista en /public
          alt="Málaga moderna"
          className={`background-image ${
            imageLoaded ? 'image-load-transition' : ''
          }`}
        />
      </div>

      {/* ***** NUEVO CONTENEDOR PARA EL CONTENIDO IZQUIERDO ***** */}
      <div className="content-left-column">
        {/* Título en dos líneas (sin cambios internos) */}
        <div className="title-container">
          <h1>Málaga</h1>
          <h1 className="subtitle">sin filtros</h1>
        </div>

        {/* Botón de inicio (sin cambios internos) */}
        <button className="start-button" onClick={onStartClick}>
          ¡Dale al Play!
        </button>
      </div>
      {/* ***** FIN NUEVO CONTENEDOR ***** */}
    </div>
  );
};

export default Portada;
