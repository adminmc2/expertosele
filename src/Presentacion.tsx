import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Wand2, Dice6, BookOpen, Trophy, Grid3x3, Layers } from 'lucide-react';

// Paleta de colores corporativa Hablandis + EVALIA
const colors = {
  // Colores principales Hablandis
  verdeClaro: '#C4D4A4',      // PANTONE 580 C - Verde suave
  azulOscuro: '#12055F',      // PANTONE 2755 C - Azul profundo
  amarillo: '#FFC846',        // PANTONE 1225 C - Amarillo vibrante
  verdeTurquesa: '#007567',   // PANTONE 3295 C - Verde turquesa
  negro: '#000000',           // Negro puro
  lila: '#B9ABE4',           // PANTONE 2092 C - Lila suave
  
  // Colores adicionales para EVALIA
  blanco: '#FFFFFF',
  grisClaro: '#F5F5F5',
  grisMedio: '#E0E0E0',
  grisOscuro: '#666666',
  
  // Colores de estado/feedback
  exito: '#4CAF50',
  alerta: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Gradientes para fondos
  degradadoAzul: 'linear-gradient(135deg, #12055F 0%, #1a0a7a 100%)',
  degradadoVerde: 'linear-gradient(135deg, #007567 0%, #00a090 100%)',
  degradadoLila: 'linear-gradient(135deg, #B9ABE4 0%, #d4c7f0 100%)',
};

// Configuración de animaciones reutilizables
// OPCIÓN 1: Exportar para uso en otros componentes
export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  },
  slideIn: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.4 }
  },
  bounceIn: {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  }
};

// OPCIÓN 2: Si no se va a usar inmediatamente, comentarlo
// const animations = { ... };

// OPCIÓN 3: Si se planea usar pero aún no está implementado, 
// agregar un comentario de deshabilitación de ESLint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const animations = { ... };


// =======================================================================
// DIAPOSITIVA 1: PORTADA CON FOOTER MINIMALISTA
// =======================================================================
const Diapositiva1 = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, letter: string}>>([]);
  const [showElements, setShowElements] = useState({
    logo: false,
    title: false,
    subtitle: false,
    info: false
  });

  // Elementos que aparecen y desaparecen en la parte inferior
  const bottomElements = [
    { text: '¿', x: 10, delay: 0, color: colors.azulOscuro },
    { text: '¡', x: 15, delay: 0.4, color: colors.verdeTurquesa },
    { text: 'ñ', x: 20, delay: 0.8, color: colors.lila },
    { text: 'á', x: 25, delay: 1.2, color: colors.azulOscuro },
    { text: 'MCER', x: 30, delay: 1.6, color: colors.verdeTurquesa },
    { text: 'B2', x: 35, delay: 2.0, color: colors.lila },
    { text: 'é', x: 40, delay: 2.4, color: colors.azulOscuro },
    { text: 'í', x: 45, delay: 2.8, color: colors.verdeTurquesa },
    { text: 'DELE', x: 50, delay: 3.2, color: colors.lila },
    { text: 'ó', x: 55, delay: 3.6, color: colors.azulOscuro },
    { text: 'A1→C2', x: 60, delay: 4.0, color: colors.verdeTurquesa },
    { text: 'ú', x: 65, delay: 4.4, color: colors.lila },
    { text: '✓', x: 70, delay: 4.8, color: colors.azulOscuro },
    { text: '¡Olé!', x: 75, delay: 5.2, color: colors.verdeTurquesa },
    { text: '✗', x: 80, delay: 5.6, color: colors.lila },
    { text: '¿?¡!', x: 85, delay: 6.0, color: colors.azulOscuro },
  ];

  // Seguimiento del mouse - crear partículas solo en zona inferior
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      
      // Crear partículas SOLO si el mouse está en el 30% inferior de la pantalla
      if (y > 70 && Math.random() > 0.94) {
        const letters = ['a', 'e', 'i', 'o', 'u', 'ñ', '¿', '?', '¡', '!'];
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          letter: letters[Math.floor(Math.random() * letters.length)]
        };
        setParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Limpiar partículas antiguas cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 3000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({...prev, logo: true})), 300),
      setTimeout(() => setShowElements(prev => ({...prev, title: true})), 600),
      setTimeout(() => setShowElements(prev => ({...prev, subtitle: true})), 900),
      setTimeout(() => setShowElements(prev => ({...prev, info: true})), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${colors.verdeClaro} 0%, #E8E0F0 50%, ${colors.lila}80 100%)`
      }}
    >
      {/* Efecto de gradiente interactivo */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${colors.verdeTurquesa}20 0%, transparent 60%)`,
          transition: 'background 0.5s ease'
        }}
      />

      {/* Zona de partículas - SOLO EN LA PARTE INFERIOR */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, x: particle.x, y: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.8, 0], 
              y: -150,
              x: particle.x + (Math.random() - 0.5) * 100,
              rotate: 540
            }}
            transition={{ duration: 3 }}
            className="absolute text-2xl font-bold"
            style={{ 
              color: colors.lila,
              bottom: window.innerHeight - particle.y,
              left: particle.x - 15,
              textShadow: '0 3px 6px rgba(0,0,0,0.1)',
              fontFamily: 'Aglet Mono, monospace'
            }}
          >
            {particle.letter}
          </motion.div>
        ))}
      </div>

      {/* Todos los elementos de abajo con animación uniforme */}
      <div className="absolute bottom-16 left-0 right-0 h-20 pointer-events-none">
        {bottomElements.map((elem, index) => (
          <motion.div
            key={index}
            className="absolute font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.6, 0],
              scale: [0, 1.3, 1.3, 0],
              y: [0, -180, -200, -300]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              delay: elem.delay,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
            style={{ 
              left: `${elem.x}%`,
              bottom: '0px',
              color: elem.color + 'CC',
              fontSize: elem.text.length > 2 ? '28px' : '48px',
              fontFamily: 'Aglet Mono, monospace',
              fontWeight: elem.text.length > 2 ? 600 : 'bold',
              textShadow: '0 4px 8px rgba(0,0,0,0.15)',
              filter: 'brightness(1.1)'
            }}
          >
            {elem.text}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 h-screen flex flex-col p-8">
        
        {/* Logo ENORME */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: showElements.logo ? 1 : 0, 
            scale: showElements.logo ? 1 : 0.5
          }}
          transition={{ duration: 1, type: "spring" }}
          className="absolute top-0 left-0"
        >
          <img 
            src="/hablandis.png" 
            alt="Hablandis" 
            className="h-96"
            style={{ 
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
              maxWidth: '500px'
            }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              img.parentElement!.innerHTML = `
                <div style="padding: 30px;">
                  <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 96px; font-weight: 900;">
                    Hablandis
                  </div>
                  <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 24px; margin-top: 10px;">
                    Centro Internacional de Idiomas
                  </div>
                </div>
              `;
            }}
          />
        </motion.div>

        {/* Contenido central */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-6xl">
            
            {/* EVALIA sin círculo de fondo */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: showElements.title ? 1 : 0, 
                y: showElements.title ? 0 : 50 
              }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="mb-12"
            >
              <h1 
                style={{ 
                  fontFamily: 'Aglet Mono, monospace',
                  fontSize: '48px',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  color: colors.azulOscuro,
                  textShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                Herramientas prácticas para crear sesiones de clase inclusivas y personalizadas con Inteligencia Artificial Generativa
              </h1>
            </motion.div>

            {/* Subtítulo */}
            {/* Subtítulo eliminado */}

            {/* Información del ponente */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: showElements.info ? 1 : 0,
                scale: showElements.info ? 1 : 0.9
              }}
              transition={{ delay: 0.6, type: "spring" }}
              className="mt-20"
            >
              <div 
                className="inline-block rounded-3xl px-20 py-10"
                style={{ 
                  backgroundColor: colors.blanco + '70',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                }}
              >
                <p style={{ 
                  fontFamily: 'Aglet Mono, monospace',
                  fontSize: '36px',
                  fontWeight: 800,
                  color: colors.azulOscuro,
                  marginBottom: '12px'
                }}>
                  Armando Cruz Crespillo
                </p>
                <p style={{ 
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: colors.verdeTurquesa,
                  marginBottom: '20px'
                }}>
                  Innovador Edtech / Inmersion / Hablandis
                </p>
                <div className="text-center" 
                     style={{ 
                       fontFamily: 'Raleway, sans-serif',
                       fontSize: '18px',
                       color: colors.grisOscuro 
                     }}>
                  <span>7 de diciembre de 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

       
        {/* Footer Minimalista - NUEVO DISEÑO */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <p className="text-xs" style={{ 
            fontFamily: 'Raleway, sans-serif',
            color: colors.azulOscuro,
            opacity: 0.6
          }}>
            © 2025 Hablandis. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 1
// =======================================================================
// =======================================================================
// DIAPOSITIVA 2: REGLAS OFICIALES (WORD COLONY) - JUEGO INTERACTIVO
// =======================================================================
const Diapositiva2 = () => {
  const [tabActivo, setTabActivo] = useState('cartas');

  const tabs = [
    { id: 'cartas', label: 'Las Cartas', icon: Grid3x3, color: '#007567' },
    { id: 'preparacion', label: 'Preparación', icon: Dice6, color: '#C4D4A4' },
    { id: 'turno', label: 'El Turno', icon: Zap, color: '#FFC846' },
    { id: 'construccion', label: 'Construcción', icon: Layers, color: '#FFC846' },
    { id: 'acciones', label: 'Acciones', icon: Shield, color: '#B9ABE4' },
    { id: 'finJuego', label: 'Fin del Juego', icon: Trophy, color: '#51CF66' },
    { id: 'estrategia', label: 'Estrategia', icon: BookOpen, color: '#12055F' },
  ];

  const cartasData = [
    { imagen: '/uno.png', tipo: 'letra', nombre: 'UNO', puntos: 1 },
    { imagen: '/dos.png', tipo: 'letra', nombre: 'DOS', puntos: 2 },
    { imagen: '/tres.png', tipo: 'letra', nombre: 'TRES', puntos: 3 },
    { imagen: '/cuatro.png', tipo: 'letra', nombre: 'CUATRO', puntos: 4 },
    { imagen: '/cinco.png', tipo: 'letra', nombre: 'CINCO', puntos: 5 },
    { imagen: '/conquista.png', tipo: 'accion', nombre: 'CONQUISTA' },
    { imagen: '/defensa.png', tipo: 'accion', nombre: 'ESCUDO' },
    { imagen: '/comodin.png', tipo: 'accion', nombre: 'PALABRA MÁGICA' },
  ];

  return (
    <div className="min-h-screen flex flex-col p-8" style={{background: 'linear-gradient(135deg, #C4D4A4 0%, #E8E0F0 50%, #B9ABE4 80%)'}}>
      {/* Título minimalista */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-agletmono text-center mb-12" 
        style={{letterSpacing: '1px', color: '#12055F'}}>
        REGLAS OFICIALES (Blindapalabras)
      </motion.h1>

      {/* Pestañas minimalistas */}
      <div className="flex gap-2 justify-center mb-8 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTabActivo(tab.id)}
              className={`px-4 py-2 rounded-lg font-raleway text-sm transition-all flex items-center gap-2 ${
                tabActivo === tab.id
                  ? 'bg-white/90 shadow-md'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            >
              <Icon size={18} style={{color: tab.color}} strokeWidth={2.5} />
              <span style={{color: tab.color, fontWeight: tabActivo === tab.id ? 600 : 400}}>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Contenido */}
      <div className="flex-1 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* LAS CARTAS */}
          {tabActivo === 'cartas' && (
            <motion.div
              key="cartas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-y-auto max-h-[70vh] pr-4"
            >
              <div className="grid grid-cols-4 gap-6">
                {cartasData.map((carta, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <img src={carta.imagen} alt={carta.nombre} className="w-full h-56 object-contain bg-gray-50 p-2" />
                    <div className="p-4 text-center">
                      <h3 className="font-agletmono text-sm" style={{color: '#007567', fontWeight: 600}}>{carta.nombre}</h3>
                      <p className="text-xs text-gray-500 mt-1">{carta.puntos ? `${carta.puntos} pts` : 'Acción'}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <style>{`
                .overflow-y-auto::-webkit-scrollbar { width: 4px; }
                .overflow-y-auto::-webkit-scrollbar-thumb { background: #007567; opacity: 0.4; border-radius: 2px; }
              `}</style>
            </motion.div>
          )}

          {/* PREPARACIÓN */}
          {tabActivo === 'preparacion' && (
            <motion.div
              key="preparacion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/80 rounded-xl p-10 shadow-sm">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-agletmono text-4xl mb-6" style={{color: '#12055F'}}>1. PREPARACIÓN (Setup)</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-50 rounded-lg border-l-4" style={{borderLeftColor: '#12055F'}}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#12055F'}}>Mazo Único</h4>
                      <p className="text-xl text-gray-700">Se barajan TODAS las cartas (Letras y Acciones juntas).</p>
                    </div>
                    <div className="p-6 bg-green-50 rounded-lg border-l-4" style={{borderLeftColor: '#51CF66'}}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#51CF66'}}>Reparto Inicial</h4>
                      <p className="text-xl text-gray-700">Se reparten <strong>5 cartas</strong> a cada jugador/equipo para empezar. (¡Nadie baja nada todavía!)</p>
                    </div>
                    <div className="p-6 bg-yellow-50 rounded-lg border-l-4" style={{borderLeftColor: '#FFC846'}}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#FFC846'}}>Mazo de Robo</h4>
                      <p className="text-xl text-gray-700">El resto se deja en el centro <strong>boca abajo</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* EL TURNO */}
          {tabActivo === 'turno' && (
            <motion.div
              key="turno"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/80 rounded-xl p-10 shadow-sm">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-agletmono text-4xl mb-6" style={{color: '#12055F'}}>2. EL TURNO (La Mecánica "Quiz")</h3>
                    <p className="text-2xl text-gray-700 mb-8">El juego funciona por <strong>turnos rotativos</strong> en sentido del reloj.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-purple-50 rounded-lg border-l-4" style={{borderLeftColor: '#B9ABE4'}}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#B9ABE4'}}>El Lector</h4>
                      <p className="text-xl text-gray-700">El jugador activo elige una carta de su mano y <strong>lee la pregunta</strong> al jugador de su izquierda.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-green-50 rounded-lg border-l-4" style={{borderLeftColor: '#51CF66'}}>
                        <h4 className="font-agletmono text-2xl mb-3" style={{color: '#51CF66'}}>✅ Si ACIERTA</h4>
                        <p className="text-xl text-gray-700">El jugador se queda la carta (gana la Letra) y la pone en su zona de juego.</p>
                      </div>
                      <div className="p-6 bg-red-50 rounded-lg border-l-4" style={{borderLeftColor: '#FF6B6B'}}>
                        <h4 className="font-agletmono text-2xl mb-3" style={{color: '#FF6B6B'}}>❌ Si FALLA</h4>
                        <p className="text-xl text-gray-700">La carta se va al mazo de descartes (nadie gana la letra).</p>
                      </div>
                    </div>

                    <div className="p-6 bg-orange-50 rounded-lg border-l-4" style={{borderLeftColor: '#FFC846'}}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#FFC846'}}>Reposición</h4>
                      <p className="text-xl text-gray-700">El Lector roba una carta del mazo central para volver a tener <strong>5 en la mano</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CONSTRUCCIÓN */}
          {tabActivo === 'construccion' && (
            <motion.div
              key="construccion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/80 rounded-xl p-10 shadow-sm">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-agletmono text-4xl mb-6" style={{color: '#12055F'}}>3. FASE DE CONSTRUCCIÓN (Tu Colonia)</h3>
                    <p className="text-2xl text-gray-700 mb-8">Con las letras ganadas, los jugadores construyen palabras en su propia zona.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-blue-50 rounded-lg border-l-4" style={{borderLeftColor: '#007567'}}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#007567'}}>Regla de Puntuación</h4>
                      <p className="text-xl text-gray-700">Cada carta tiene un <strong>valor en la esquina</strong>.</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-green-50 to-red-50 rounded-lg border-2" style={{borderColor: '#007567'}}>
                      <h4 className="font-agletmono text-2xl mb-5" style={{color: '#12055F'}}>Regla de Seguridad (La Colonia)</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="text-2xl" style={{color: '#FF6B6B'}}>⚠️</div>
                          <div>
                            <p className="font-agletmono text-xl mb-2" style={{color: '#FF6B6B'}}>Una palabra SOLA (lineal)</p>
                            <p className="text-xl text-gray-700">es <strong>VULNERABLE</strong></p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="text-2xl" style={{color: '#51CF66'}}>🛡️</div>
                          <div>
                            <p className="font-agletmono text-xl mb-2" style={{color: '#51CF66'}}>Si CRUZAS una palabra con otra</p>
                            <p className="text-xl text-gray-700">(formando una estructura) se vuelven <strong>SEGURAS</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ACCIONES ESPECIALES */}
          {tabActivo === 'acciones' && (
            <motion.div
              key="acciones"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/80 rounded-xl p-10 shadow-sm">
                <h3 className="font-agletmono text-4xl mb-8" style={{color: '#12055F'}}>4. ACCIONES ESPECIALES (El Conflicto)</h3>
                <p className="text-2xl text-gray-700 mb-8">Se juegan en tu turno <strong>en lugar de construir</strong>.</p>
                <div className="grid grid-cols-3 gap-8">
                  <div className="bg-yellow-50 rounded-lg p-8 border-l-4" style={{borderLeftColor: '#FFC846'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <Zap size={32} style={{color: '#FFC846'}} strokeWidth={2.5} />
                      <h4 className="font-agletmono text-2xl" style={{color: '#12055F'}}>CONQUISTA</h4>
                    </div>
                    <p className="text-lg text-gray-700 mb-3">🔥 Ataque</p>
                    <p className="text-xl text-gray-700 leading-relaxed">Roba una palabra <strong>vulnerable</strong> de un oponente. Condición: Debes poder <strong>conectarla inmediatamente</strong> a tus propias palabras.</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-8 border-l-4" style={{borderLeftColor: '#007567'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <Shield size={32} style={{color: '#007567'}} strokeWidth={2.5} />
                      <h4 className="font-agletmono text-2xl" style={{color: '#12055F'}}>ESCUDO</h4>
                    </div>
                    <p className="text-lg text-gray-700 mb-3">🛡️ Defensa</p>
                    <p className="text-xl text-gray-700 leading-relaxed">Protege una palabra <strong>vulnerable</strong> de ser robada.</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-8 border-l-4" style={{borderLeftColor: '#B9ABE4'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <Wand2 size={32} style={{color: '#B9ABE4'}} strokeWidth={2.5} />
                      <h4 className="font-agletmono text-2xl" style={{color: '#12055F'}}>MÁGICA</h4>
                    </div>
                    <p className="text-lg text-gray-700 mb-3">✨ Comodín</p>
                    <p className="text-xl text-gray-700 leading-relaxed">Sustituye a <strong>cualquier letra</strong>.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* FIN DEL JUEGO */}
          {tabActivo === 'finJuego' && (
            <motion.div
              key="finJuego"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/80 rounded-xl p-10 shadow-sm">
                <div className="space-y-8">
                  <h3 className="font-agletmono text-4xl" style={{color: '#12055F'}}>5. FIN DEL JUEGO</h3>

                  <div className="p-8 bg-yellow-50 rounded-lg border-l-4" style={{borderLeftColor: '#FFC846'}}>
                    <h4 className="font-agletmono text-2xl mb-4" style={{color: '#FFC846'}}>🎯 VICTORIA INMEDIATA</h4>
                    <p className="text-2xl text-gray-700 leading-relaxed"><strong>Un jugador forma una FRASE de DOS PALABRAS</strong> en su zona (pueden estar cruzadas o no).</p>
                    <p className="text-xl text-gray-600 mt-4">Ejemplo: "GATO" + "GRANDE" = <strong>¡GANA!</strong></p>
                  </div>

                  <div className="p-8 bg-red-50 rounded-lg border-l-4" style={{borderLeftColor: '#FF6B6B'}}>
                    <h4 className="font-agletmono text-2xl mb-4" style={{color: '#FF6B6B'}}>Fin por Agotamiento</h4>
                    <p className="text-2xl text-gray-700">Si nadie forma 2 palabras: Se acaba cuando <strong>se agota el mazo de robo</strong> y un jugador <strong>se queda sin cartas</strong>.</p>
                  </div>

                  <div className="p-8 bg-green-50 rounded-lg border-l-4" style={{borderLeftColor: '#51CF66'}}>
                    <h4 className="font-agletmono text-2xl mb-4" style={{color: '#51CF66'}}>Puntuación Final (por agotamiento)</h4>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold" style={{color: '#12055F'}}>
                        (Suma de puntos en la mesa) - (Resta de puntos de cartas en mano)
                      </div>
                      <p className="text-xl text-gray-700"><strong>Mayor puntuación = GANA</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ESTRATEGIA / GUIÓN */}
          {tabActivo === 'estrategia' && (
            <motion.div
              key="estrategia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/80 rounded-xl p-10 shadow-sm max-h-[75vh] overflow-y-auto">
                
                <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                  <div className="p-6 bg-blue-50 rounded-lg border-l-4" style={{borderLeftColor: '#12055F'}}>
                    <p className="text-2xl mb-3"><strong>"En cada mesa vais a jugar una partida REAL siguiendo estas reglas oficiales"</strong></p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#C4D4A4'}}>Mano Inicial</h4>
                      <p className="text-xl text-gray-700">Cada uno empieza con <strong>5 cartas en la mano</strong>. ¡Ojo! Esas cartas <strong>NO son vuestras letras todavía</strong>. Son las <strong>preguntas que haréis a los demás</strong>.</p>
                    </div>

                    <div>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#FFC846'}}>Cómo Ganar Letras</h4>
                      <p className="text-xl text-gray-700">Yo te hago una pregunta de mi mano. Si <strong>la aciertas, te regalo la carta</strong> y ya tienes la letra 'A' para ti. Si <strong>fallas, la carta se tira a la basura</strong>.</p>
                    </div>

                    <div>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#007567'}}>El Objetivo</h4>
                      <p className="text-xl text-gray-700">Acumular letras para <strong>escribir palabras</strong> en vuestra zona.</p>
                    </div>

                    <div>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#FF6B6B'}}>El Peligro</h4>
                      <p className="text-xl text-gray-700">Si tenéis una carta de 'Conquista', podéis <strong>robarle una palabra al vecino</strong>, pero <strong>solo si esa palabra no está cruzada</strong> con otra.</p>
                    </div>

                    <div>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#51CF66'}}>Estrategia</h4>
                      <p className="text-xl text-gray-700"><strong>¡Cruzad vuestras palabras rápido para blindarlas!</strong></p>
                    </div>
                  </div>

                  <div className="p-6 bg-purple-50 rounded-lg border-l-4" style={{borderLeftColor: '#B9ABE4'}}>
                    <p className="text-xl text-gray-700"><strong>Ahora os toca jugar. ¡Que gane el mejor!</strong></p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// =======================================================================
// DIAPOSITIVA 3: EL DRAMA DE LA EVALUACIÓN - DISEÑO UNIFICADO
// =======================================================================
const Diapositiva3Antigua = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const karaokeRef = useRef<HTMLDivElement>(null);

  // Timeline correcto basado en la letra completa
  const lyrics = [
    // Intro hablado
    { time: 2.3, text: "Son las tres de la mañana...", type: "spoken" },
    { time: 5.2, text: "El café ya está frío...", type: "spoken" },
    { time: 6.8, text: "Y todavía me quedan 47 exámenes...", type: "spoken" },
    
    // Verso 1
    { time: 9.2, text: "Mi vida es un plato de sopa fría", type: "verse" },
    { time: 11.3, text: "Corrigiendo hasta que salga el día", type: "verse" },
    { time: 13.7, text: "El subjuntivo me persigue en mis sueños", type: "verse" },
    { time: 16.1, text: "\"Ser y estar\" son ya mis dueños", type: "verse" },
    { time: 18.2, text: "Las tildes bailan la macarena", type: "verse" },
    { time: 20.6, text: "En cada examen veo la misma pena", type: "verse" },
    { time: 23, text: "\"Yo soy en el baño\" escribió María", type: "verse" },
    { time: 25.1, text: "\"Ayer yo he ido\" - ¡qué melodía!", type: "verse" },
    
    // Verso 2
    { time: 27.5, text: "Test de nivel, comprensión lectora", type: "verse" },
    { time: 29.9, text: "Expresión escrita que me deteriora", type: "verse" },
    { time: 32, text: "\"Mi perro está muy bueno\" leo atónito", type: "verse" },
    { time: 34.4, text: "\"Es muy frío hoy\" - error sintomático", type: "verse" },
    { time: 37.1, text: "Evaluar no es solo gramática", type: "verse" },
    { time: 39.5, text: "Competencias, contexto, pragmática", type: "verse" },
    { time: 42.1, text: "¿Diagnóstica o formativa?", type: "verse" },
    { time: 44.5, text: "Mi cabeza ya no es productiva", type: "verse" },
    
    // Estribillo (primera vez)
    { time: 46.4, text: "¡ELLA LLEGÓ! Como pizza a domicilio", type: "chorus" },
    { time: 48.8, text: "¡ELLA LLEGÓ! Mi salvación con brillo", type: "chorus" },
    { time: 51.4, text: "Comprende cada nivel del MCER", type: "chorus" },
    { time: 53.5, text: "¡Analiza todo en un dos por tres!", type: "chorus" },
    { time: 55.7, text: "¡ELLA LLEGÓ! Con su magia digital", type: "chorus" },
    { time: 57.8, text: "¡ELLA LLEGÓ! Es algo sensacional", type: "chorus" },
    { time: 60.7, text: "Evalúa competencias integradas", type: "chorus" },
    { time: 62.8, text: "¡Adiós a las noches desveladas!", type: "chorus" },
    
    // Verso 3
    { time: 74, text: "\"Voy a coger el autobús\" dice Roberto", type: "verse" },
    { time: 76.4, text: "(No sabe que en América es desacierto)", type: "verse" },
    { time: 78.8, text: "\"Llévame este libro\" escribe Juan", type: "verse" },
    { time: 81.2, text: "(Traer y llevar siempre confundirán)", type: "verse" },
    { time: 83.6, text: "ELLA detecta patrones por lengua materna", type: "verse" },
    { time: 85.7, text: "ELLA sabe si es polaco o si es de Berna", type: "verse" },
    { time: 88.1, text: "Retroalimenta con pedagogía", type: "verse" },
    { time: 91, text: "¡Por fin llegó la tecnología!", type: "verse" },
    
    // Estribillo (repetición final)
    { time: 93.2, text: "¡ELLA LLEGÓ! Como pizza a domicilio", type: "chorus" },
    { time: 95.4, text: "¡ELLA LLEGÓ! Mi salvación con brillo", type: "chorus" },
    { time: 97.6, text: "Comprende cada nivel del MCER", type: "chorus" },
    { time: 99.8, text: "¡Analiza todo en un dos por tres!", type: "chorus" },
    { time: 102, text: "¡ELLA LLEGÓ! Con su magia digital", type: "chorus" },
    { time: 104.2, text: "¡ELLA LLEGÓ! Es algo sensacional", type: "chorus" },
    { time: 106.4, text: "Evalúa competencias integradas", type: "chorus" },
    { time: 108.6, text: "¡Adiós a las noches desveladas!", type: "chorus" }
  ];

  // Iconos minimalistas lineales
  const MinimalIcons = {
    book: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    error: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    star: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    volume: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
    music: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )
  };

  // Secciones para análisis con iconos minimalistas
  const sections = {
    vida: {
      title: "La vida del profesor",
      icon: MinimalIcons.book,
      content: [
        "Son las 3 AM corrigiendo exámenes",
        "El café frío como compañero",
        "47 exámenes por revisar",
        "Evaluación manual repetitiva",
        "Agotamiento mental y físico"
      ],
      color: colors.azulOscuro
    },
    errores: {
      title: "Errores que se presentan",
      icon: MinimalIcons.error,
      content: [
        "\"Yo soy en el baño\" (ser/estar)",
        "\"Mi perro está muy bueno\" (contexto)",
        "\"Es muy frío hoy\" (hacer/estar)",
        "\"Voy a coger el autobús\" (variantes)",
        "Confusión traer/llevar"
      ],
      color: colors.amarillo
    },
    esperamos: {
      title: "Lo que esperamos",
      icon: MinimalIcons.star,
      content: [
        "Análisis automático instantáneo",
        "Detección de patrones por L1",
        "Evaluación de competencias integradas",
        "Retroalimentación pedagógica",
        "¡Adiós noches desveladas!"
      ],
      color: colors.verdeTurquesa
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    
    // Establecer volumen inicial
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Auto-scroll del karaoke
  useEffect(() => {
    const currentLyricIndex = getCurrentLyricIndex();
    if (currentLyricIndex >= 0 && karaokeRef.current) {
      const currentElement = karaokeRef.current.children[currentLyricIndex] as HTMLElement;
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime]);

  // Actualizar volumen cuando cambie
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const getCurrentLyricIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return i;
      }
    }
    return -1;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSection(expandedSection === sectionKey ? null : sectionKey);
  };

  const currentLyricIndex = getCurrentLyricIndex();

  // Calcular el tipo actual (verso, coro, etc.) para efectos visuales
  const currentLyricType = currentLyricIndex >= 0 ? lyrics[currentLyricIndex].type : null;

  return (
    <div 
      className="min-h-screen relative p-12 flex flex-col"
      style={{ 
        background: `linear-gradient(135deg, ${colors.lila}80 0%, ${colors.amarillo}20 50%, ${colors.azulOscuro}15 100%)`
      }}
    >
      {/* Indicadores musicales animados */}
      <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden">
        <motion.div
          className="h-full"
          animate={{
            background: isPlaying 
              ? `linear-gradient(90deg, ${colors.amarillo}40 0%, ${colors.verdeTurquesa}40 50%, ${colors.amarillo}40 100%)`
              : `linear-gradient(90deg, ${colors.grisOscuro}20 0%, ${colors.grisOscuro}20 100%)`
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            transform: isPlaying ? 'translateX(0%)' : 'translateX(-100%)',
          }}
        />
      </div>

      {/* Patrón de ondas sonoras minimalista */}
      <div className="absolute top-20 right-20 opacity-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              scale: isPlaying ? [1, 1.5, 2] : 1,
              opacity: isPlaying ? [0.3, 0.1, 0] : 0,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
            style={{
              width: `${i * 40}px`,
              height: `${i * 40}px`,
              border: `1px solid ${colors.azulOscuro}`,
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Logo Hablandis UNIFICADO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 z-30"
      >
        <img 
          src="/hablandis.png" 
          alt="Hablandis" 
          className="h-24 md:h-32"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            img.parentElement!.innerHTML = `
              <div>
                <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 36px; font-weight: 700;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 14px; margin-top: 2px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </motion.div>

      {/* Elementos decorativos flotantes minimalistas */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
        {['♪', '♫', '♬'].map((note, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{ 
              color: colors.amarillo + '30',
              left: `${(i - 1) * 100}px`
            }}
            animate={{
              y: isPlaying ? [0, -20, 0] : 0,
              opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.2,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {note}
          </motion.span>
        ))}
      </div>

      {/* Título Principal UNIFICADO */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-4 md:mb-6"
        style={{ 
          color: colors.azulOscuro, 
          fontFamily: 'Aglet Mono, monospace',
          marginTop: '80px'
        }}
      >
        El drama de la evaluación
      </motion.h1>

      {/* Indicador visual del ritmo */}
      {isPlaying && (
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{
            scale: currentLyricType === 'chorus' ? [1, 1.2, 1] : [1, 1.05, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: currentLyricType === 'chorus' ? 0.5 : 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-96 h-96 rounded-full"
            style={{ 
              background: `radial-gradient(circle, ${currentLyricType === 'chorus' ? colors.amarillo : colors.verdeTurquesa}20 0%, transparent 70%)`
            }}
          />
        </motion.div>
      )}

      {/* Contenido Principal - 2 columnas ajustadas */}
      <div className="flex gap-12 max-w-7xl mx-auto w-full" style={{ marginBottom: '80px' }}>
        
        {/* Columna Izquierda - Análisis */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-3/5"
        >
          <h2 
            className="text-2xl font-semibold mb-8"
            style={{ color: colors.azulOscuro, fontFamily: 'Aglet Mono, monospace' }}
          >
            Analicemos la canción
          </h2>

          <div className="space-y-4">
            {Object.entries(sections).map(([key, section]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: colors.blanco + '70',
                  border: `1px solid ${expandedSection === key ? section.color + '40' : 'transparent'}`,
                  transform: expandedSection === key ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full p-7 text-left transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        style={{ color: section.color }}
                        animate={{ 
                          rotate: expandedSection === key ? 360 : 0 
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {section.icon}
                      </motion.div>
                      <h3 
                        className="text-xl font-medium"
                        style={{ 
                          color: colors.azulOscuro,
                          fontFamily: 'Raleway, sans-serif'
                        }}
                      >
                        {section.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === key ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: colors.grisOscuro }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedSection === key ? 'auto' : 0,
                    opacity: expandedSection === key ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-7 pb-7">
                    <ul className="space-y-3">
                      {section.content.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-lg flex items-start gap-3"
                          style={{ 
                            fontFamily: 'Raleway, sans-serif',
                            color: colors.grisOscuro
                          }}
                        >
                          <span 
                            className="mt-2"
                            style={{ 
                              width: '6px', 
                              height: '6px', 
                              backgroundColor: section.color,
                              borderRadius: '50%',
                              display: 'block',
                              flexShrink: 0
                            }}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Columna Derecha - Reproductor y Karaoke */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-2/5 flex flex-col"
        >
          {/* Reproductor Mejorado con Controles Adicionales */}
          <div className="mb-6 relative">
            <audio ref={audioRef} src="/ella.mp3" />
            
            <div className="flex items-center gap-4">
              {/* Botón Play/Pause con animación */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all relative"
                style={{ 
                  backgroundColor: colors.azulOscuro + '10',
                  border: `2px solid ${colors.azulOscuro}`,
                  color: colors.azulOscuro
                }}
              >
                {/* Animación de pulso cuando está reproduciendo */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ backgroundColor: colors.amarillo }}
                  />
                )}
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </motion.button>

              {/* Barra de progreso y tiempo */}
              <div className="flex-1">
                <div 
                  className="h-2 bg-black/10 rounded-full overflow-hidden mb-2 cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = x / rect.width;
                    if (audioRef.current && duration) {
                      audioRef.current.currentTime = percentage * duration;
                    }
                  }}
                >
                  <motion.div 
                    className="h-full relative"
                    style={{ 
                      backgroundColor: colors.azulOscuro,
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {/* Indicador de posición */}
                    <div 
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full"
                      style={{ 
                        backgroundColor: colors.amarillo,
                        border: `2px solid ${colors.blanco}`,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    />
                  </motion.div>
                </div>
                <div className="flex justify-between text-base" style={{ color: colors.grisOscuro }}>
                  <span style={{ fontFamily: 'monospace' }}>{formatTime(currentTime)}</span>
                  <div className="flex items-center gap-4">
                    {/* Control de volumen */}
                    <div className="relative">
                      <button
                        onClick={() => setShowVolumeControl(!showVolumeControl)}
                        className="p-1 hover:opacity-70 transition-opacity"
                      >
                        {MinimalIcons.volume}
                      </button>
                      {showVolumeControl && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2"
                          style={{ backgroundColor: colors.blanco + 'F0', padding: '8px', borderRadius: '8px' }}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-20 transform -rotate-90"
                            style={{ cursor: 'pointer' }}
                          />
                        </motion.div>
                      )}
                    </div>
                    <span style={{ fontFamily: 'monospace' }}>{formatTime(duration || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Área de Karaoke con indicadores musicales */}
          <div 
            className="rounded-xl p-6 overflow-hidden relative"
            style={{
              backgroundColor: colors.blanco + '50',
              border: `1px solid ${colors.azulOscuro}10`,
              height: '420px'
            }}
          >
            {/* Indicador de música en la esquina */}
            <motion.div 
              className="absolute top-4 right-4"
              animate={{ 
                rotate: isPlaying ? 360 : 0,
                opacity: isPlaying ? 1 : 0.3
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.3 }
              }}
              style={{ color: colors.amarillo }}
            >
              {MinimalIcons.music}
            </motion.div>

            <div 
              ref={karaokeRef}
              className="h-full overflow-y-auto space-y-2 pr-4"
              style={{ 
                maxHeight: 'calc(100% - 10px)',
                scrollBehavior: 'smooth'
              }}
            >
              {lyrics.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: index <= currentLyricIndex ? 0.9 : 0.3,
                    scale: index === currentLyricIndex ? 1.02 : 0.98,
                    x: index === currentLyricIndex ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    line.type === 'spoken' ? 'italic' : ''
                  } ${
                    line.type === 'chorus' ? 'text-xl font-bold' : 'text-lg'
                  } leading-relaxed py-2`}
                  style={{ 
                    color: index <= currentLyricIndex 
                      ? (line.type === 'chorus' ? colors.azulOscuro : colors.grisOscuro)
                      : colors.grisOscuro + '60',
                    fontFamily: 'Raleway, sans-serif',
                    borderLeft: index === currentLyricIndex ? `3px solid ${colors.azulOscuro}` : '3px solid transparent',
                    paddingLeft: '16px',
                    transition: 'all 0.3s ease',
                    backgroundColor: index === currentLyricIndex 
                      ? (line.type === 'chorus' ? colors.amarillo + '15' : colors.verdeTurquesa + '10')
                      : 'transparent'
                  }}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Minimalista */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <p className="text-xs" style={{ 
          fontFamily: 'Raleway, sans-serif',
          color: colors.azulOscuro,
          opacity: 0.6
        }}>
          © 2025 Hablandis. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

// =======================================================================
// DIAPOSITIVA 3: EL APOYO PEDAGÓGICO - ESTUDIANTES CON NECESIDADES DE APRENDIZAJE PAUTADO
// =======================================================================
const Diapositiva3 = () => {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const baseFontSize = '16px';

  const estudiantesNecesidades = [
    {
      id: 'poco-autonomos',
      titulo: 'Estudiantes poco autónomos',
      descripcion: 'Requieren mayor seguimiento y orientación en su proceso de aprendizaje.',
      color: colors.amarillo
    },
    {
      id: 'monolingues',
      titulo: 'Hablantes monolingües',
      descripcion: 'No tienen experiencia previa con otras lenguas o culturas.',
      color: colors.lila
    },
    {
      id: 'estudiantes-mayores',
      titulo: 'Estudiantes mayores',
      descripcion: 'Adultos con contextos y experiencias de vida particulares.',
      color: colors.verdeTurquesa
    },
    {
      id: 'memoristica',
      titulo: 'Aprendientes de forma memorística',
      descripcion: 'Utilizan estrategias de memorización como principal método de aprendizaje.',
      color: colors.verdeClaro
    },
    {
      id: 'lengua-distante',
      titulo: 'Hablantes de una lengua materna distante del español',
      descripcion: 'Enfrentan mayores desafíos en la adquisición del idioma.',
      color: colors.azulOscuro
    },
    {
      id: 'sin-seguridad',
      titulo: 'Estudiantes que no hablan si no se sienten seguros',
      descripcion: 'Necesitan construir confianza antes de participar activamente.',
      color: colors.azulOscuro
    },
    {
      id: 'expuestos',
      titulo: 'Estudiantes que temen sentirse expuestos',
      descripcion: 'Evitan situaciones que los coloquen en el centro de atención.',
      color: colors.verdeClaro
    },
    {
      id: 'otra-cultura',
      titulo: 'Estudiantes con otra cultura de aprendizaje',
      descripcion: 'Proceden de sistemas educativos con enfoques diferentes.',
      color: colors.amarillo
    }
  ];

  return (
    <div 
      className="h-screen flex flex-col"
      style={{ background: `linear-gradient(135deg, ${colors.verdeClaro}40 0%, ${colors.amarillo}20 50%, ${colors.verdeTurquesa}30 100%)` }}
    >
      {/* Título */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center pt-10 pb-6 md:pt-12 md:pb-8 px-6 shrink-0 text-2xl md:text-3xl lg:text-4xl font-semibold"
        style={{ 
          fontFamily: 'Aglet Mono, monospace',
          color: colors.azulOscuro,
          lineHeight: '1.3'
        }}
      >
        El apoyo pedagógico en las actividades para los estudiantes con necesidades de aprendizaje pautado
      </motion.h1>

      {/* Contenido principal */}
      <div className="flex-1 px-8 md:px-12 pb-8 overflow-y-auto custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {estudiantesNecesidades.map((estudiante, index) => (
            <motion.div
              key={estudiante.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="relative rounded-xl shadow-lg cursor-pointer transition-all duration-300 overflow-hidden"
              style={{
                backgroundColor: colors.blanco,
                border: `2px solid ${estudiante.color}`,
                minHeight: expandedStudent === estudiante.id ? 'auto' : '180px'
              }}
              onClick={() => setExpandedStudent(expandedStudent === estudiante.id ? null : estudiante.id)}
              whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
            >
              {/* Barra de color en la parte superior */}
              <div
                className="h-1"
                style={{ backgroundColor: estudiante.color }}
              />
              
              <div className="p-5 flex flex-col">
                {/* Punto de color pequeño */}
                <div
                  className="w-4 h-4 rounded-full mb-3"
                  style={{ backgroundColor: estudiante.color }}
                />
                
                {/* Título */}
                <h3
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: `calc(${baseFontSize} * 1.05)`,
                    fontWeight: 700,
                    color: colors.azulOscuro,
                    marginBottom: '10px',
                    lineHeight: '1.3'
                  }}
                >
                  {estudiante.titulo}
                </h3>

                {/* Descripción expandible */}
                <AnimatePresence>
                  {expandedStudent === estudiante.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontSize: `calc(${baseFontSize} * 0.9)`,
                        color: colors.grisOscuro,
                        lineHeight: '1.5',
                        marginTop: '10px'
                      }}
                    >
                      {estudiante.descripcion}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Indicador de expandible */}
                <div className="mt-auto pt-3 text-xs" style={{ color: estudiante.color }}>
                  {expandedStudent === estudiante.id ? '▼ Menos' : '▶ Más'}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de estrategias */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2
            style={{
              fontFamily: 'Aglet Mono, monospace',
              fontSize: `calc(${baseFontSize} * 1.8)`,
              fontWeight: 700,
              color: colors.azulOscuro,
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            Estrategias de apoyo pedagógico
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                titulo: 'Diferenciación curricular',
                desc: 'Adaptamos actividades según el nivel y ritmo de aprendizaje de cada estudiante.',
                color: colors.amarillo
              },
              {
                titulo: 'Trabajo colaborativo',
                desc: 'Creamos espacios seguros para la participación y el aprendizaje mutuo.',
                color: colors.verdeTurquesa
              },
              {
                titulo: 'Retroalimentación personalizada',
                desc: 'Ofrecemos orientación específica para mejorar el desempeño académico.',
                color: colors.lila
              }
            ].map((estrategia, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-6 rounded-xl shadow-lg"
                style={{ backgroundColor: colors.blanco, borderLeft: `4px solid ${estrategia.color}` }}
              >
                <h4
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: `calc(${baseFontSize} * 1.2)`,
                    fontWeight: 600,
                    color: colors.azulOscuro,
                    marginBottom: '10px'
                  }}
                >
                  {estrategia.titulo}
                </h4>
                <p
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: `calc(${baseFontSize} * 0.95)`,
                    color: colors.grisOscuro,
                    lineHeight: '1.6'
                  }}
                >
                  {estrategia.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <p className="text-xs" style={{ 
          fontFamily: 'Raleway, sans-serif',
          color: colors.azulOscuro,
          opacity: 0.6
        }}>
          © 2025 Hablandis. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

// ======================================================================= 
// DIAPOSITIVA 4: PRESENTAMOS A EVALIA - DISEÑO UNIFICADO 
// ======================================================================= 
const Diapositiva4 = () => {   
  const [selectedTest, setSelectedTest] = useState<string | null>(null);   
  // Eliminada hoveredFeature que no se utilizaba
  const [showElements, setShowElements] = useState({     
    title: false,     
    cards: false,     
    info: false   
  })

  // Colores del brandbook
  const slide4Colors = {
    verdeClaro: '#C4D4A4', // PANTONE 580 C
    turquoise: '#007567', // PANTONE 3295 C
    purple: '#B9ABE4', // PANTONE 2092 C
    yellow: '#FFC846', // PANTONE 1225 C
    darkBlue: '#12055F', // PANTONE 2755 C
    white: '#FFFFFF',
    black: '#000000',
    grisOscuro: '#666666'
  };

  // Animaciones de entrada
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({...prev, title: true})), 300),
      setTimeout(() => setShowElements(prev => ({...prev, cards: true})), 600),
      setTimeout(() => setShowElements(prev => ({...prev, info: true})), 900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Datos de los tipos de test (simplificados para ganar espacio)
  const testTypes = [
    {
      id: 'rapido',
      name: 'Test Rápido',
      subtitle: 'Evaluación diagnóstica inicial',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: [
        '16 preguntas adaptativas por nivel',
        'Algoritmo de progresión validado',
        'Retroalimentación instantánea con IA',
        'Lector inmersivo integrado',
        'Tiempo estimado: 15-20 minutos'
      ],
      color: slide4Colors.yellow,
      highlight: 'Ideal para diagnóstico inicial rápido'
    },
    {
      id: 'completo',
      name: 'Test Completo',
      subtitle: 'Evaluación integral de competencias',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9h6M9 12h6M9 15h4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: [
        '20 preguntas por competencia lingüística',
        '4 módulos especializados completos',
        'Evaluación oral opcional con profesor',
        'Certificación digital de nivel incluida',
        '45-60 minutos'
      ],
      color: slide4Colors.turquoise,
      highlight: 'Certificación completa multidimensional'
    },
    {
      id: 'interactivo',
      name: 'Test Interactivo',
      subtitle: 'Conversación natural con IA',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          <circle cx="12" cy="12" r="1"/>
          <circle cx="8" cy="12" r="1"/>
          <circle cx="16" cy="12" r="1"/>
        </svg>
      ),
      features: [
        'Chatbot conversacional con IA generativa',
        'Adaptación dinámica según respuestas',
        'Análisis de patrones por lengua materna',
        'Evaluación continua y natural',
        'Duración adaptativa'
      ],
      color: slide4Colors.purple,
      highlight: 'Experiencia conversacional innovadora'
    }
  ];

  // Tabla de progresión con explicaciones detalladas
  const progressionTable = [
    {
      level: 'A1',
      ranges: [
        { min: 0, max: 50, action: 'Nivel A1 básico', detail: 'Email confirmando nivel A1 inicial', color: '#FF6B6B' },
        { min: 50, max: 80, action: 'A1.2 umbral', detail: 'Se propone prueba escrita opcional', color: '#FFE66D' },
        { min: 80, max: 100, action: 'Avanza a A2', detail: 'Pasa automáticamente al siguiente nivel', color: '#4ECDC4' }
      ]
    },
    {
      level: 'A2',
      ranges: [
        { min: 0, max: 50, action: 'A2.1 básico', detail: 'Email confirmando nivel A2.1', color: '#FF6B6B' },
        { min: 50, max: 70, action: 'A2.1 consolidación', detail: 'Se propone prueba escrita', color: '#FFE66D' },
        { min: 71, max: 85, action: 'A2.2 avanzado', detail: 'Prueba escrita y oral recomendada', color: '#95E1D3' },
        { min: 85, max: 100, action: 'Avanza a B1', detail: 'Salta automáticamente a B1', color: '#4ECDC4' }
      ]
    },
    {
      level: 'B1',
      ranges: [
        { min: 0, max: 70, action: 'B1 básico', detail: 'Email confirmando nivel B1', color: '#FF6B6B' },
        { min: 71, max: 84, action: 'B1.1 intermedio', detail: 'Puede realizar prueba adicional', color: '#FFE66D' },
        { min: 85, max: 89, action: 'B1.2 avanzado', detail: 'Prueba escrita y oral sugerida', color: '#95E1D3' },
        { min: 90, max: 100, action: 'Avanza a B2', detail: 'Progresa automáticamente a B2', color: '#4ECDC4' }
      ]
    },
    {
      level: 'B2',
      ranges: [
        { min: 0, max: 60, action: 'B2 básico', detail: 'Email confirmando nivel B2', color: '#FF6B6B' },
        { min: 60, max: 74, action: 'B2.1 intermedio', detail: 'Prueba opcional disponible', color: '#FFE66D' },
        { min: 75, max: 79, action: 'B2.2 umbral', detail: 'Evaluación completa recomendada', color: '#95E1D3' },
        { min: 80, max: 100, action: 'Pasa a C1', detail: 'Accede al test de nivel C1', color: '#4ECDC4' }
      ]
    }
  ];

  // Características principales
  const coreFeatures = [
    {
      id: 'precision',
      title: 'Precisión',
      value: '97.7%',
      description: 'Diagnóstico validado'
    },
    {
      id: 'corpus',
      title: 'Base de datos',
      value: '46K+',
      description: 'Muestras reales'
    },
    {
      id: 'lenguas',
      title: 'L1 analizadas',
      value: '11+',
      description: 'Personalización'
    },
    {
      id: 'tiempo',
      title: 'Respuesta IA',
      value: '<2s',
      description: 'Instantánea'
    }
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${slide4Colors.verdeClaro}40 0%, ${slide4Colors.yellow}20 50%, ${slide4Colors.turquoise}30 100%)`
      }}
    >
      {/* Efectos de fondo decorativos con nuevos colores */}
      <div
        className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{ backgroundColor: slide4Colors.yellow }}
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: slide4Colors.turquoise }}
      />

      {/* Logo Unificado */}
      <div className="absolute top-6 left-6 z-30">
        <img 
          src="/hablandis.png" 
          alt="Hablandis" 
          className="h-24 md:h-32"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            img.parentElement!.innerHTML = `
              <div>
                <div style="font-family: 'Aglet Mono', monospace; color: ${slide4Colors.darkBlue}; font-size: 36px; font-weight: 700;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: ${slide4Colors.turquoise}; font-size: 14px; margin-top: 2px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </div>

      <div className="relative z-10 h-screen flex flex-col p-6 pt-16">
        {/* Header Unificado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showElements.title ? 1 : 0, y: showElements.title ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-3"
            style={{
              fontFamily: 'Aglet Mono, monospace',
              color: slide4Colors.darkBlue
            }}
          >
            Presentamos a EVALIA
          </h1>
          <p
            className="text-lg md:text-xl lg:text-2xl"
            style={{
              fontFamily: 'Raleway, sans-serif',
              color: slide4Colors.turquoise
            }}
          >
            Sistema inteligente de evaluación de español con IA
          </p>
        </motion.div>

        {/* Contenido principal - Grid optimizado con QR en columna izquierda */}
        <div className="flex-1 flex gap-6 max-h-[calc(100vh-240px)]">

          {/* Columna izquierda - CON QR INTEGRADO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showElements.cards ? 1 : 0, x: showElements.cards ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[500px] overflow-y-auto pr-2"
          >
            <h3 className="text-2xl font-semibold mb-3" style={{
              color: slide4Colors.darkBlue,
              fontFamily: 'Raleway, sans-serif'
            }}>
              Modalidades de Evaluación
            </h3>

            <div className="space-y-3">
              {testTypes.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showElements.cards ? 1 : 0, y: showElements.cards ? 0 : 20 }}
                  transition={{ delay: 0.1 * index }}
                  className={`
                    bg-white rounded-xl p-4 cursor-pointer transition-all duration-300
                    ${selectedTest === test.id ? 'shadow-2xl scale-102' : 'shadow-lg hover:shadow-xl'}
                  `}
                  style={{
                    borderLeft: `5px solid ${test.color}`,
                    backgroundColor: selectedTest === test.id ? `${test.color}05` : 'white'
                  }}
                  onClick={() => setSelectedTest(selectedTest === test.id ? null : test.id)}
                >
                  <div className="flex items-start gap-3">
                    <div style={{ color: test.color }} className="flex-shrink-0">
                      {test.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold" style={{
                        color: slide4Colors.darkBlue,
                        fontFamily: 'Aglet Mono, monospace'
                      }}>
                        {test.name}
                      </h4>
                      <p className="text-base text-gray-600 mb-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        {test.subtitle}
                      </p>

                      {!selectedTest && (
                        <p className="text-sm font-semibold" style={{
                          color: test.color,
                          fontFamily: 'Raleway, sans-serif'
                        }}>
                          {test.highlight}
                        </p>
                      )}

                      {selectedTest === test.id && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-1 mt-2"
                        >
                          {test.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={test.color} strokeWidth="2" className="mr-2 mt-0.5 flex-shrink-0">
                                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-gray-700" style={{ fontFamily: 'Raleway, sans-serif' }}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Código QR con la imagen correcta del repositorio */}
              <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4 mt-4">
                <div className="w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src="/qr.png"
                    alt="QR Code Presentación EVALIA"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1" style={{
                    color: slide4Colors.darkBlue,
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Materiales de Presentación
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Escanea para acceder a recursos y documentación
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha - SIN QR */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: showElements.info ? 1 : 0, x: showElements.info ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex flex-col gap-4 overflow-y-auto pl-2"
          >
            {/* Características principales */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-xl font-semibold mb-3" style={{
                color: slide4Colors.darkBlue,
                fontFamily: 'Raleway, sans-serif'
              }}>
                Tecnología Validada
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {coreFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-2xl font-bold" style={{
                      color: slide4Colors.turquoise,
                      fontFamily: 'Aglet Mono, monospace'
                    }}>
                      {feature.value}
                    </div>
                    <div className="text-xs font-semibold text-gray-800 mt-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      {feature.title}
                    </div>
                    <div className="text-xs text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabla de Progresión con explicaciones */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-xl font-semibold mb-3" style={{
                color: slide4Colors.darkBlue,
                fontFamily: 'Raleway, sans-serif'
              }}>
                Sistema de Progresión Adaptativo
              </h3>
              <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'Raleway, sans-serif' }}>
                El estudiante avanza de nivel según su porcentaje de respuestas correctas
              </p>
              <div className="space-y-3">
                {progressionTable.map((level) => (
                  <div key={level.level}>
                    <div className="font-bold text-base mb-1" style={{ color: slide4Colors.darkBlue }}>
                      Nivel {level.level}
                    </div>
                    <div className="space-y-1">
                      {level.ranges.map((range, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div
                            className="w-24 h-6 rounded text-xs flex items-center justify-center text-white font-medium"
                            style={{ backgroundColor: range.color }}
                          >
                            {range.min}-{range.max}%
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-semibold" style={{ color: slide4Colors.darkBlue }}>
                              {range.action}:
                            </span>
                            <span className="text-sm text-gray-600 ml-1" style={{ fontFamily: 'Raleway, sans-serif' }}>
                              {range.detail}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Minimalista */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <p className="text-xs" style={{ 
            fontFamily: 'Raleway, sans-serif',
            color: slide4Colors.darkBlue,
            opacity: 0.6
          }}>
            © 2025 Hablandis. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

// =======================================================================
// DIAPOSITIVA 5: CONSTRUCCIÓN DE PROPUESTAS EVALUATIVAS CON IA
// =======================================================================
const Diapositiva5 = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'buscar' | 'descargar-av' | 'descargar-texto'>('buscar');
  const [showElements, setShowElements] = useState({
    title: false,
    categories: false,
    tools: false,
    tutorial: false
  });

  // Colores del brandbook
  const slide5Colors = {
    darkBlue: '#12055F', 
    purple: '#B9ABE4', 
    yellow: '#FFC846', 
    turquoise: '#007567',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#666666'
  };

  // Iconos SVG
  const IconYoutube = ({ className = "w-7 h-7" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.618 12.953a2.25 2.25 0 010-1.906 2.25 2.25 0 011.666-1.013c.17-.028.34-.05.516-.068a2.25 2.25 0 00-2.182-2.182 30.002 30.002 0 00-15.236 0A2.25 2.25 0 002.2 7.784a29.14 29.14 0 00-.068.516 2.25 2.25 0 01-1.013 1.666 2.25 2.25 0 010 1.906 2.25 2.25 0 011.013 1.667c.028.17.05.34.068.516a2.25 2.25 0 002.182 2.182c5.078.548 10.158.548 15.236 0a2.25 2.25 0 002.182-2.182c.018-.176.04-.346.068-.516a2.25 2.25 0 011.666-1.013zM9.75 15.75V8.25l6 3.75-6 3.75z" />
    </svg>
  );
  const IconFilmStrip = ({ className = "w-7 h-7" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
  const IconVolumeUp = ({ className = "w-7 h-7" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
  // ELIMINADO IconDownloadCloud - no se utiliza
  const IconSmartphoneVideo = ({ className = "w-7 h-7" }: { className?: string }) => ( 
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
        <path d="M10.5 8.5l3 2-3 2v-4z"/> 
        <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
  const IconFileText = ({ className = "w-7 h-7" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
  );
  const IconClock = ({ className = "w-7 h-7" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({...prev, title: true})), 300),
      setTimeout(() => setShowElements(prev => ({...prev, categories: true})), 600),
      setTimeout(() => setShowElements(prev => ({...prev, tools: true})), 900),
      setTimeout(() => setShowElements(prev => ({...prev, tutorial: true})), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const toolsData = {
    buscar: {
      title: 'Buscar audios y vídeos',
      icon: ( 
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <path d="M11 8v3m0 0v3m0-3h3m-3 0H8"/>
        </svg>
      ),
      tools: [
        {
          id: 'youglish',
          name: 'YouGlish',
          url: 'https://es.youglish.com/pronounce/perro/spanish', 
          displayText: 'es.youglish.com/pronounce/perro/spanish',
          description: 'Busca pronunciaciones reales en vídeos de YouTube',
          icon: <IconYoutube className="w-8 h-8" />, 
          tutorial: [
            'Accede a es.youglish.com (puedes cambiar "perro" y "spanish" por tu búsqueda e idioma)',
            'Escribe la palabra o frase que quieres buscar en la barra superior',
            'Selecciona el acento/país específico si lo deseas desde los filtros',
            'Navega entre los resultados con las flechas (Siguiente/Anterior)',
            'Ajusta la velocidad de reproducción y revisa el contexto del vídeo'
          ],
          features: ['Múltiples acentos', 'Contexto real', 'Velocidad ajustable']
        },
        {
          id: 'forvo',
          name: 'Forvo',
          url: 'https://es.forvo.com/languages/es/',
          displayText: 'es.forvo.com (Español)',
          description: 'Diccionario global de pronunciaciones por hablantes nativos',
          icon: <IconVolumeUp className="w-8 h-8" />,
          tutorial: [
            'Visita es.forvo.com y selecciona "Español" o el idioma deseado',
            'Introduce la palabra que quieres escuchar en la barra de búsqueda',
            'Explora las diferentes pronunciaciones de hablantes nativos de varios países',
            'Haz clic en el icono de reproducción para escuchar cada pronunciación',
            'Puedes votar por las mejores pronunciaciones o añadir la tuya si eres nativo'
          ],
          features: ['Pronunciaciones nativas', 'Múltiples acentos', 'Palabras aisladas', 'Colaborativo']
        },
        {
          id: 'filmot',
          name: 'Filmot',
          url: 'https://filmot.com/',
          displayText: 'filmot.com',
          description: 'Busca en subtítulos de millones de vídeos',
          icon: <IconFilmStrip className="w-8 h-8" />,
          tutorial: [
            'Visita filmot.com',
            'Introduce tu término de búsqueda en la barra principal',
            'Puedes filtrar por idioma (ej: Spanish/Español) y otras opciones avanzadas',
            'Explora los resultados que muestran la frase en su contexto de subtítulo, con timestamps',
            'Haz clic en el timestamp o en el título del vídeo para ir directamente al momento exacto'
          ],
          features: ['Búsqueda en subtítulos', 'Timestamps precisos', 'Filtros avanzados']
        }
      ]
    },
    'descargar-av': { 
      title: 'Descargar audios y vídeos',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      ),
      tools: [
        {
          id: 'tiktokio', 
          name: 'TikTokio',
          url: 'https://tiktokio.com/es/',
          displayText: 'tiktokio.com/es',
          description: 'Especializado en redes sociales efímeras (TikTok, Instagram Stories)',
          icon: <IconSmartphoneVideo className="w-8 h-8" />,
          tutorial: [
            'Accede a tiktokio.com/es.',
            'Pega el enlace del vídeo de TikTok que quieres descargar.',
            'Para Instagram Stories, puedes necesitar el enlace directo o el nombre de usuario.',
            'Haz clic en el botón "Descargar" o similar.',
            'Elige si quieres el vídeo (con/sin marca de agua si es opción) o extraer solo el audio (si está disponible).',
            'Guarda el archivo multimedia resultante.'
          ],
          features: ['TikTok & IG Stories', 'Extracción audio', 'Metadatos (a veces)', 'Detección tendencias']
        }
      ]
    },
    'descargar-texto': {
      title: 'Descargar y limpiar textos',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      tools: [
        {
          id: 'justread',
          name: 'Just Read',
          url: 'https://chromewebstore.google.com/detail/just-read/dgmanlpmmkibanfdgjocnabmcaclkmod?hl=es&gl=ES',
          displayText: 'Just Read (Extensión Chrome)',
          description: 'Extrae solo el texto, eliminando publicidad y distracciones',
          icon: <IconFileText className="w-8 h-8" />, 
          tutorial: [
            'Instala "Just Read" desde Chrome Web Store (o la tienda de tu navegador).',
            'Navega al artículo o página web que quieres limpiar.',
            'Haz clic en el icono de Just Read en la barra de herramientas del navegador.',
            'La página se transformará en un formato de lectura limpio. Puedes personalizar temas, fuentes y márgenes.',
            'Selecciona y copia el texto, o usa la opción de imprimir/guardar como PDF si el navegador lo permite.'
          ],
          features: ['Elimina publicidad', 'Formato limpio', 'Personalizable']
        },
        {
          id: 'wayback',
          name: 'Wayback Machine',
          url: 'https://web.archive.org/',
          displayText: 'web.archive.org',
          description: 'Recupera contenido desaparecido de internet',
          icon: <IconClock className="w-8 h-8" />,
          tutorial: [
            'Visita web.archive.org',
            'Pega la URL del sitio web o página que ha desaparecido o quieres ver en una versión anterior',
            'Explora el calendario de capturas. Las fechas marcadas indican que hay una copia guardada',
            'Selecciona una fecha y hora específica para ver la instantánea de la página',
            'Navega por el contenido histórico tal como fue archivado'
          ],
          features: ['Archivo histórico', 'Múltiples capturas', 'Contenido perdido']
        },
        {
          id: 'singlefile',
          name: 'SingleFile',
          url: 'https://chrome.google.com/webstore/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle',
          displayText: 'SingleFile (Extensión Chrome)',
          description: 'Guarda páginas completas en un solo archivo HTML',
          icon: <IconFileText className="w-8 h-8" />,
          tutorial: [
            'Instala "SingleFile" desde Chrome Web Store (u otra tienda de extensiones)',
            'Navega a la página web que quieres guardar por completo',
            'Haz clic en el icono de SingleFile en la barra de herramientas',
            'Espera a que la extensión procese y empaquete la página (puede tardar unos segundos)',
            'Se descargará automáticamente un único archivo HTML que contiene toda la página (imágenes, CSS, etc.)'
          ],
          features: ['Página completa', 'Un solo archivo', 'Preserva formato']
        }
      ]
    }
  };

  const currentTools = toolsData[activeCategory];
  const year = new Date().getFullYear();

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${slide5Colors.darkBlue}15 0%, ${slide5Colors.purple}25 50%, ${slide5Colors.yellow}15 100%)`
      }}
    >
      {/* Logo Unificado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 z-30"
      >
        <img 
          src="/hablandis.png" 
          alt="Hablandis" 
          className="h-24 md:h-32"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            img.parentElement!.innerHTML = `
              <div>
                <div style="font-family: 'Aglet Mono', monospace; color: ${slide5Colors.darkBlue}; font-size: 36px; font-weight: 700; line-height: 1;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: ${slide5Colors.turquoise}; font-size: 14px; margin-top: 2px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </motion.div>

      {/* Efectos de fondo */}
      <div 
        className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: slide5Colors.purple }}
      />
      <div 
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: slide5Colors.yellow }}
      />

      <div className="relative z-10 h-screen flex flex-col p-6">
        {/* Título y Subtítulo Unificados */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showElements.title ? 1 : 0, y: showElements.title ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6"
            style={{ 
              color: slide5Colors.darkBlue,
              fontFamily: 'Aglet Mono, monospace'
            }}
          >
            Construcción de Propuestas con IA
          </h1>
          <p 
            className="text-lg md:text-xl lg:text-2xl font-normal max-w-4xl mx-auto"
            style={{ 
              color: slide5Colors.turquoise, 
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            Herramientas esenciales para crear contenido evaluativo multimedia
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showElements.categories ? 1 : 0, scale: showElements.categories ? 1 : 0.9 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 mb-6"
        >
          {Object.entries(toolsData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key as any);
                setSelectedTool(null);
              }}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300
                ${activeCategory === key 
                  ? 'shadow-lg scale-105' 
                  : 'shadow-md hover:shadow-lg hover:scale-102'
                }
              `}
              style={{
                backgroundColor: activeCategory === key ? slide5Colors.darkBlue : slide5Colors.white,
                color: activeCategory === key ? slide5Colors.white : slide5Colors.darkBlue,
                border: `2px solid ${activeCategory === key ? slide5Colors.darkBlue : slide5Colors.purple}30`
              }}
            >
              <div style={{ 
                color: activeCategory === key ? slide5Colors.yellow : slide5Colors.purple 
              }}>
                {data.icon}
              </div>
              <span className="font-semibold" style={{ fontFamily: 'Raleway, sans-serif' }}>
                {data.title}
              </span>
            </button>
          ))}
        </motion.div>

        <div className="flex-1 flex gap-6 max-h-[calc(100vh-280px)]">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showElements.tools ? 1 : 0, x: showElements.tools ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="w-[450px] overflow-y-auto pr-2 custom-scrollbar-minimal"
          >
            <div className="space-y-3">
              {currentTools.tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showElements.tools ? 1 : 0, y: showElements.tools ? 0 : 20 }}
                  transition={{ delay: 0.1 * index }}
                  className={`
                    bg-white rounded-xl p-4 cursor-pointer transition-all duration-300
                    ${selectedTool === tool.id ? 'shadow-2xl scale-102' : 'shadow-lg hover:shadow-xl'}
                  `}
                  style={{
                    borderLeft: `5px solid ${selectedTool === tool.id ? slide5Colors.purple : slide5Colors.yellow}`,
                    backgroundColor: selectedTool === tool.id ? `${slide5Colors.purple}05` : 'white'
                  }}
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <div className="flex items-start gap-3">
                    <div style={{ color: slide5Colors.purple }} className="flex-shrink-0 mt-1">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-1" style={{ 
                        color: slide5Colors.darkBlue,
                        fontFamily: 'Aglet Mono, monospace'
                      }}>
                        {tool.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        {tool.description}
                      </p>
                      <a 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm font-medium hover:underline break-all"
                        style={{ color: slide5Colors.turquoise }}
                        onClick={(e) => e.stopPropagation()} 
                      >
                        {tool.displayText}
                      </a>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tool.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: `${slide5Colors.yellow}20`,
                              color: slide5Colors.darkBlue,
                              fontFamily: 'Raleway, sans-serif'
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: showElements.tutorial ? 1 : 0, x: showElements.tutorial ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="flex-1 overflow-y-auto pl-2 custom-scrollbar-minimal"
          >
            {selectedTool && currentTools.tools.find(t => t.id === selectedTool) ? (
              <div className="bg-white rounded-xl p-6 shadow-xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${slide5Colors.purple}10` }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={slide5Colors.purple} strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ 
                      color: slide5Colors.darkBlue,
                      fontFamily: 'Aglet Mono, monospace'
                    }}>
                      Tutorial: {currentTools.tools.find(t => t.id === selectedTool)?.name}
                    </h3>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                      Sigue estos pasos para usar la herramienta
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentTools.tools.find(t => t.id === selectedTool)?.tutorial.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 rounded-lg hover:shadow-md transition-all"
                      style={{ backgroundColor: `${slide5Colors.yellow}05` }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                        style={{ backgroundColor: slide5Colors.purple }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-2" style={{ 
                        fontFamily: 'Raleway, sans-serif',
                        fontSize: '16px',
                        lineHeight: '1.6'
                      }}>
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${slide5Colors.turquoise}10` }}>
                  <div className="flex items-start gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={slide5Colors.turquoise} strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: slide5Colors.darkBlue }}>
                        💡 Consejo profesional
                      </h4>
                      <p className="text-sm text-gray-700" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        Siempre verifica los derechos de autor antes de usar contenido descargado en tus evaluaciones. 
                        Cita las fuentes apropiadamente y respeta las licencias de uso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-xl h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 mx-auto w-24 h-24 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${slide5Colors.purple}10` }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={slide5Colors.purple} strokeWidth="1.5">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2" style={{ 
                    color: slide5Colors.darkBlue,
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Selecciona una herramienta
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Haz clic en cualquier herramienta para ver su tutorial paso a paso
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Footer Minimalista */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <p className="text-xs" style={{ 
            fontFamily: 'Raleway, sans-serif',
            color: slide5Colors.darkBlue,
            opacity: 0.6
          }}>
            © {year} Hablandis. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 5
// =======================================================================

// =======================================================================
// DIAPOSITIVA 6: BÚSQUEDA DE CONTENIDO CON IA (SIN FOOTER) - CORREGIDA
// =======================================================================

const Diapositiva6 = () => {
  const [activeGoogleOperatorId, setActiveGoogleOperatorId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSearchText, setCurrentSearchText] = useState("");

  // Colores base del diseño unificado
  const colors = {
    azulOscuro: '#12055F',
    verdeTurquesa: '#007567',
    blanco: '#FFFFFF'
  };

  // Configuración de Títulos
  const TitleConfig = {
    fontFamily: 'Aglet Mono, monospace',
    mainSize: 'text-3xl md:text-4xl lg:text-5xl',
    weight: 'font-semibold',
    color: colors.azulOscuro,
    spacing: 'mb-4 md:mb-6'
  };

  // Configuración de Subtítulos
  const SubtitleConfig = {
    fontFamily: 'Raleway, sans-serif',
    size: 'text-lg md:text-xl lg:text-2xl',
    weight: 'font-normal',
    color: colors.verdeTurquesa,
    spacing: 'mb-2'
  };

  // Componente Título Principal Unificado
  const MainTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h1 
      className={`${TitleConfig.mainSize} ${TitleConfig.weight} ${TitleConfig.spacing} ${className}`}
      style={{ 
        fontFamily: TitleConfig.fontFamily,
        color: TitleConfig.color
      }}
    >
      {children}
    </h1>
  );

  // Componente Subtítulo Unificado
  const Subtitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <p 
      className={`${SubtitleConfig.size} ${SubtitleConfig.weight} ${SubtitleConfig.spacing} ${className}`}
      style={{ 
        fontFamily: SubtitleConfig.fontFamily,
        color: SubtitleConfig.color
      }}
    >
      {children}
    </p>
  );
  
  // Colores del brandbook con énfasis en los no utilizados
  const d6Colors = {
    bgGradientStart: '#C4D4A4', // Verde claro
    bgGradientMid: '#B9ABE4',   // Lila
    bgGradientEnd: '#FFC846',   // Amarillo
    bgBase: '#FAFAFA',
    textTitle: '#12055F',
    textSubtitle: '#007567',
    textBody: '#4A5568',
    accentPrimary: '#FFC846',
    accentSecondary: '#007567',
    accentTertiary: '#B9ABE4',
    brandGreen: '#C4D4A4',
    cardBg: '#FFFFFF',
    borderColor: '#E2E8F0',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    googleBlue: '#4285F4',
    googleRed: '#EA4335',
    googleYellow: '#FBBC04',
    googleGreen: '#34A853',
  };

  const baseFontSize = '18px';

  // Iconos
  const LineIconsD6 = {
    search: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
    chatGPT: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ),
    google: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC04"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    linkExternal: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    ),
    document: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    video: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    ),
  };

  // Datos actualizados con los prompts correctos
  const chatGPTSections = [
    {
      id: 'content',
      title: 'Crear Contenido',
      icon: LineIconsD6.document,
      examples: [
        {
          id: 'b1-content',
          level: 'B1',
          tutorial: 'Soy un redactor de tareas de comprensión escrita para pruebas de certificación en español. Necesito que actúes como mi asistente en la búsqueda de textos auténticos en internet. Para ello, sugiéreme en primer lugar diez temáticas concretas, interesantes y atractivas que se ajusten al nivel B1 del MCERL.',
          link: 'https://claude.ai/public/artifacts/6b8d697b-b486-486e-9027-640730e85a10'
        },
        {
          id: 'b2-content',
          level: 'B2',
          tutorial: 'Soy un redactor de tareas de comprensión escrita para pruebas de certificación en español. Necesito que actúes como mi asistente en la búsqueda de textos auténticos en internet. Para ello, sugiéreme en primer lugar diez temáticas concretas, interesantes y atractivas que se ajusten al nivel B2 del MCERL.',
          link: 'https://claude.ai/public/artifacts/1e74caca-2e62-4105-a088-b390e0c3c675'
        }
      ]
    },
    {
      id: 'media',
      title: 'Buscar Vídeos/Audio',
      icon: LineIconsD6.video,
      examples: [
        {
          id: 'nivel-google-a2',
          level: 'A2',
          tutorial: 'Soy un redactor de tareas de comprensión auditiva para pruebas de certificación en español. Necesito que actúes como mi asistente en la búsqueda de audios/vídeos auténticos en internet. Para ello, sugiéreme en primer lugar diez temáticas concretas, interesantes y atractivas que se ajusten al nivel A2 del MCERL',
          link: 'https://docs.google.com/document/d/1ekqIkGdq-Y0gnralSDOB1M-HsQqw_hlGg-EWEpr5SOk/edit?usp=sharing'
        },
        {
          id: 'nivel-chatgpt-b1',
          level: 'B1',
          tutorial: 'Soy un redactor de tareas de comprensión auditiva para pruebas de certificación en español. Necesito que actúes como mi asistente en la búsqueda de vídeos auténticos en youtube. Para ello, sugiéreme en primer lugar diez temáticas concretas, interesantes y atractivas que se ajusten al nivel B1 del MCERL',
          link: 'https://chatgpt.com/share/68344a9a-843c-800d-b007-951cca3ec455'
        }
      ]
    }
  ];

  // Google operators se mantienen igual
  const googleOperators = [
    {
      id: 'site',
      op: 'site:',
      name: 'Buscar en un sitio específico',
      description: 'Encuentra contenido solo dentro de un dominio específico',
      example: 'ejercicios subjuntivo site:cervantes.es',
      queryHighlight: 'ejercicios subjuntivo site:cervantes.es',
      icon: '🌐'
    },
    {
      id: 'filetype',
      op: 'filetype:',
      name: 'Buscar tipos de archivo',
      description: 'Encuentra archivos PDF, PPT, DOC, etc.',
      example: 'actividades B2 filetype:pdf',
      queryHighlight: 'actividades B2 filetype:pdf',
      icon: '📄'
    },
    {
      id: 'intitle',
      op: 'intitle:',
      name: 'Palabras en el título',
      description: 'Busca páginas con palabras específicas en el título',
      example: 'intitle:"evaluación español" DELE',
      queryHighlight: 'intitle:"evaluación español" DELE',
      icon: '🏷️'
    },
    {
      id: 'quotes',
      op: '" "',
      name: 'Búsqueda exacta',
      description: 'Encuentra la frase exacta entre comillas',
      example: '"comprensión auditiva B1"',
      queryHighlight: '"comprensión auditiva B1"',
      icon: '💬'
    },
    {
      id: 'minus',
      op: '-',
      name: 'Excluir términos',
      description: 'Elimina resultados con palabras no deseadas',
      example: 'español para extranjeros -niños',
      queryHighlight: 'español para extranjeros -niños',
      icon: '🚫'
    }
  ];

  // Efecto de escritura
  useEffect(() => {
    if (activeGoogleOperatorId) {
      const operator = googleOperators.find(op => op.id === activeGoogleOperatorId);
      if (operator) {
        setIsTyping(true);
        let index = 0;
        const text = operator.queryHighlight;
        setCurrentSearchText("");
        
        const interval = setInterval(() => {
          if (index <= text.length) {
            setCurrentSearchText(text.slice(0, index));
            index++;
          } else {
            setIsTyping(false);
            clearInterval(interval);
          }
        }, 50);
        
        return () => clearInterval(interval);
      }
    } else {
      setCurrentSearchText("");
      setIsTyping(false);
    }
  }, [activeGoogleOperatorId]);

  // Barra de búsqueda de Google
  const GoogleSearchBar = ({ query }: { query: string }) => (
    <div className="relative mb-4">
      <div className="bg-white rounded-full shadow-md p-3 flex items-center gap-3 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex-shrink-0 ml-1">
          {LineIconsD6.google}
        </div>
        <input 
          type="text" 
          value={query || "Prueba un operador avanzado..."}
          readOnly 
          className="flex-grow outline-none text-base text-gray-700 bg-transparent"
          style={{ fontFamily: 'Arial, sans-serif' }}
        />
        {isTyping && (
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}
        <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors">
          Buscar
        </button>
      </div>
    </div>
  );

  const [showElementsD6, setShowElementsD6] = useState({
    title: false,
    columns: false,
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElementsD6(prev => ({...prev, title: true})), 200),
      setTimeout(() => setShowElementsD6(prev => ({...prev, columns: true})), 400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div 
      className="h-screen flex flex-col p-4 md:p-6 relative overflow-hidden"
      style={{
        backgroundColor: d6Colors.bgBase
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showElementsD6.title ? 1 : 0, y: showElementsD6.title ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 relative z-10"
      >
        <MainTitle className="mb-1">
          ¿Cómo se construye una propuesta evaluativa con IA?
        </MainTitle>
        <Subtitle>
          La búsqueda de contenido y el uso de ChatGPT/Claude/Gemini: tus asistentes creativos
        </Subtitle>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showElementsD6.columns ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch overflow-y-auto relative z-10"
      >
        {/* Columna Izquierda: Google (50%) */}
        <div>
          <div 
            className="h-full p-4 rounded-lg flex flex-col"
            style={{
              background: `linear-gradient(135deg, ${d6Colors.brandGreen}10 0%, ${d6Colors.accentSecondary}05 100%)`,
              backgroundColor: d6Colors.cardBg,
              border: `1px solid ${d6Colors.borderColor}`,
              boxShadow: `0 4px 16px ${d6Colors.shadowColor}`
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-md bg-gray-50">
                {React.cloneElement(LineIconsD6.google, { width: 24, height: 24 })}
              </div>
              <div>
                <h2 style={{ 
                  fontFamily: 'Raleway', 
                  fontSize: `calc(${baseFontSize} * 1.3)`, 
                  color: d6Colors.textTitle, 
                  fontWeight: 700 
                }}>
                  Domina Google como un Experto
                </h2>
                <p style={{ 
                  fontFamily: 'Raleway', 
                  fontSize: `calc(${baseFontSize} * 0.8)`, 
                  color: d6Colors.textBody,
                  opacity: 0.8
                }}>
                  Operadores avanzados para búsquedas precisas
                </p>
              </div>
            </div>
            
            <GoogleSearchBar query={currentSearchText} />

            <div className="space-y-2 flex-grow overflow-y-auto">
              {googleOperators.map((op, index) => (
                <motion.div
                  key={op.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative p-3 rounded-lg transition-all duration-200 cursor-pointer
                    ${activeGoogleOperatorId === op.id 
                      ? 'bg-blue-50 shadow-sm scale-[1.01]' 
                      : 'bg-gray-50 hover:bg-gray-100'}`}
                  style={{
                    border: `1px solid ${activeGoogleOperatorId === op.id ? d6Colors.googleBlue + '30' : 'transparent'}`
                  }}
                  onMouseEnter={() => setActiveGoogleOperatorId(op.id)}
                  onMouseLeave={() => setActiveGoogleOperatorId(null)}
                  onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(op.queryHighlight)}`, '_blank')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{op.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-0.5 bg-gray-800 text-white text-xs rounded font-mono">
                            {op.op}
                          </code>
                          <strong style={{ 
                            fontFamily: 'Raleway', 
                            fontSize: `calc(${baseFontSize} * 0.9)`, 
                            color: d6Colors.textTitle 
                          }}>
                            {op.name}
                          </strong>
                        </div>
                        <AnimatePresence>
                          {activeGoogleOperatorId === op.id && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-1"
                            >
                              <p className="text-sm text-gray-600">{op.description}</p>
                              <p className="text-sm text-gray-500 mt-0.5">
                                <span className="font-medium">Ejemplo:</span> {op.example}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <span className="opacity-50 text-gray-500">
                      {LineIconsD6.linkExternal}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha: ChatGPT/Claude/Gemini y QR (50%) */}
        <div className="flex flex-col gap-6">
          <div 
            className="flex-grow p-5 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${d6Colors.accentTertiary}10 0%, ${d6Colors.accentPrimary}05 100%)`,
              backgroundColor: d6Colors.cardBg,
              border: `1px solid ${d6Colors.borderColor}`,
              boxShadow: `0 4px 16px ${d6Colors.shadowColor}`
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-md" style={{ backgroundColor: d6Colors.accentTertiary + '20' }}>
                {React.cloneElement(LineIconsD6.chatGPT, { width: 24, height: 24, color: d6Colors.accentTertiary })}
              </div>
              <div>
                <h2 style={{ 
                  fontFamily: 'Raleway', 
                  fontSize: `calc(${baseFontSize} * 1.3)`, 
                  color: d6Colors.textTitle, 
                  fontWeight: 700 
                }}>
                  ChatGPT/Claude/Gemini: tus asistentes creativos
                </h2>
                <p style={{ 
                  fontFamily: 'Raleway', 
                  fontSize: `calc(${baseFontSize} * 0.8)`, 
                  color: d6Colors.textBody,
                  opacity: 0.8
                }}>
                  Prompts efectivos para cada nivel
                </p>
              </div>
            </div>

            {chatGPTSections.map((section, sectionIndex) => (
              <motion.div 
                key={section.id} 
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {React.cloneElement(section.icon, { width: 20, height: 20, color: d6Colors.textSubtitle })}
                  <h3 style={{ 
                    fontFamily: 'Raleway', 
                    fontSize: `calc(${baseFontSize} * 1)`, 
                    color: d6Colors.textTitle, 
                    fontWeight: 600 
                  }}>
                    {section.title}
                  </h3>
                </div>
                
                <div className="space-y-2 pl-2">
                  {section.examples.map((ex) => (
                    <div
                      key={ex.id}
                      className="relative flex items-start p-6 bg-[#fafaff] rounded-2xl shadow-sm group transition-all min-h-[110px] border border-[#ece9fb]"
                      style={{
                        boxShadow: "0 3px 13px 0 rgba(120, 120, 140, 0.03)",
                      }}
                    >
                      {/* Círculo de nivel */}
                      <div className="flex-shrink-0 w-16 h-10 flex items-center justify-center">
                        <div
                          className="rounded-full w-14 h-10 flex items-center justify-center"
                          style={{
                            background: "#fff",
                          }}
                        >
                          <span
                            className="font-bold"
                            style={{
                              fontFamily: "Raleway,sans-serif",
                              color:
                                ex.level === "B1"
                                  ? d6Colors.accentPrimary
                                  : ex.level === "B2"
                                    ? d6Colors.accentSecondary
                                    : ex.level === "A2"
                                      ? d6Colors.accentPrimary
                                      : d6Colors.accentSecondary,
                              fontSize: "19px",
                              letterSpacing: "1px",
                            }}
                          >
                            {ex.level}
                          </span>
                        </div>
                      </div>
                      {/* Prompt y enlace */}
                      <div className="flex-1 pl-2">
                        <div
                          className="font-semibold text-gray-700"
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            fontSize: "19px",
                            marginBottom: "6px",
                          }}
                        >
                          Prompt sugerido:
                        </div>
                        <div
                          className="italic text-gray-600"
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            fontSize: "17px",
                            lineHeight: "1.5",
                          }}
                        >
                          {ex.tutorial}
                        </div>
                      </div>
                      {/* Icono de enlace externo */}
                      <a
                        href={ex.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-5 right-6 text-gray-350 hover:text-gray-600 opacity-70"
                        style={{ fontSize: 22 }}
                        aria-label={`Abrir prompt nivel ${ex.level}`}
                      >
                        {LineIconsD6.linkExternal}
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* QR con efecto visual */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 p-4 rounded-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${d6Colors.accentPrimary}15 0%, ${d6Colors.brandGreen}10 100%)`,
              backgroundColor: d6Colors.cardBg,
              border: `1px solid ${d6Colors.borderColor}`,
              boxShadow: `0 4px 16px ${d6Colors.shadowColor}`
            }}
          >
            <div className="relative">
              <div 
                className="absolute -inset-2 rounded-xl opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${d6Colors.accentPrimary} 0%, ${d6Colors.brandGreen} 100%)`,
                  filter: 'blur(10px)'
                }}
              />
              <img 
                src="/qr.png" 
                alt="Código QR" 
                className="relative w-40 h-40 object-contain rounded-lg bg-white p-3 shadow-lg"
              />
            </div>
            <div>
              <p style={{ 
                fontFamily: 'Raleway', 
                fontSize: `calc(${baseFontSize} * 1.2)`, 
                color: d6Colors.textTitle, 
                fontWeight: 700 
              }}>
                ¡Obtén todo el material!
              </p>
              <p style={{ 
                fontFamily: 'Raleway', 
                fontSize: `calc(${baseFontSize} * 0.9)`, 
                color: d6Colors.textBody 
              }}>
                Escanea y completa el formulario
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 6 (SIN FOOTER)
// =======================================================================

// --- Definiciones de Iconos SVG (MODIFICADAS PARA ACEPTAR style) ---
const IconTextMessage = ({ className = "w-10 h-10", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75H15.375M8.625 12.75H12M4.875 9.75V17.25A2.25 2.25 0 007.125 19.5H16.875A2.25 2.25 0 0019.125 17.25V9.75M5.625 4.5H18.375C19.274 4.5 20 5.226 20 6.125V8.25C20 9.149 19.274 9.875 18.375 9.875H5.625C4.726 9.875 4 9.149 4 8.25V6.125C4 5.226 4.726 4.5 5.625 4.5Z" /></svg> );
const IconVideoOriginal = ({ className = "w-10 h-10", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" /></svg> );
const IconAudioHighQuality = ({ className = "w-10 h-10", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.117 14.828c1.523-1.252 2.583-3.193 2.583-5.328a8.25 8.25 0 00-16.5 0c0 2.135 1.06 4.076 2.583 5.328m11.334 0a3.75 3.75 0 11-5.166 0m5.166 0H8.834M12 4.5V2.25m0 19.5V18" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM15.75 9.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM8.25 9.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" /></svg> );
const IconSparkles = ({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.25l-1.25-2.25L13.5 11l2.25-1.25L17 7.5l1.25 2.25L20.5 11l-2.25 1.25z"/></svg> );
const IconMagicWand = ({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v.01a6 6 0 01-5.84-7.38L2.07 5.62a1.5 1.5 0 01.71-2.16l18-7a1.5 1.5 0 012.16.71l-7.38 18.01zm-5.84 7.38a6 6 0 005.83-7.38L18.4 2.61M7.92 14.08L2.61 6.6M14.08 7.92L6.6 2.61" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.08 7.92l-2.55 2.55-2.55-2.55M7.92 14.08l2.55-2.55 2.55 2.55" /></svg> );
const IconElevenLabs = ({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25c-1.523 2.285-3.878 3.94-6.525 4.5M4.5 12.75S8.25 9 12 9s7.5 3.75 7.5 3.75" /></svg> );
const IconPlayCircle = ({ className = "w-6 h-6", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg> );
const IconLinkSimple = ({ className = "w-5 h-5", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg> );
const IconChevronDown = ({ className = "w-6 h-6", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg> );
const IconChevronUp = ({ className = "w-6 h-6", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg> );
const IconClose = ({ className = "w-6 h-6", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> );
const IconExternalLink = ({ className = "w-4 h-4", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg> );
const IconHeadphones = ({ className = "w-6 h-6", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H19.5a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25H8.25m-6 0h13.125c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H2.25" /></svg> );
const IconVideo = ({ className = "w-6 h-6", style }: { className?: string, style?: React.CSSProperties }) => ( <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" /></svg> );

// =======================================================================
// DIAPOSITIVA 7: IA PARA CREAR TEXTOS ORALES (CON DISEÑO UNIFICADO)
// =======================================================================
const Diapositiva7 = () => {
  const [viewState, setViewState] = useState<'wow' | 'tech_overview' | 'tool_detail'>('wow');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [modalSource, setModalSource] = useState<'wow' | 'tech_overview' | null>(null);
  // Nuevo estado para el reproductor de audio en línea
  const [activeAudio, setActiveAudio] = useState<{ cardKey: string; url: string } | null>(null);

  // Colores base del diseño unificado
  const colors = {
    azulOscuro: '#12055F',
    verdeTurquesa: '#007567',
    blanco: '#FFFFFF'
  };

  // Configuración de Logo
  const LogoConfig = {
    size: 'h-24 md:h-32',
    position: 'absolute top-6 left-6 z-30',
    fallbackFontSize: '36px md:48px',
    shadow: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
  };

  // Configuración de Títulos
  const TitleConfig = {
    fontFamily: 'Aglet Mono, monospace', // Sin "Light"
    mainSize: 'text-3xl md:text-4xl lg:text-5xl',
    weight: 'font-semibold',
    color: colors.azulOscuro,
    spacing: 'mb-4 md:mb-6'
  };

  // Configuración de Subtítulos
  const SubtitleConfig = {
    fontFamily: 'Raleway, sans-serif',
    size: 'text-lg md:text-xl lg:text-2xl',
    weight: 'font-normal',
    color: colors.verdeTurquesa,
    spacing: 'mb-2'
  };

  // Configuración de Footer (SIN LÍNEA)
  const FooterConfig = {
    position: 'absolute bottom-4 left-0 right-0',
    padding: 'py-3',
    background: `${colors.blanco}70`,
    backdropFilter: 'backdrop-blur(10px)',
    text: {
      fontFamily: 'Raleway, sans-serif',
      size: '13px',
      color: colors.azulOscuro,
      opacity: '0.8',
      weight: '500'
    }
  };

  // Componente Logo Unificado
  const LogoHablandis = ({ className = "" }: { className?: string }) => (
    <img 
      src="/hablandis.png" 
      alt="Hablandis" 
      className={`${LogoConfig.size} ${className}`}
      style={{ filter: LogoConfig.shadow }}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: ${LogoConfig.fallbackFontSize}; font-weight: 700; line-height: 1;">
              Hablandis
            </div>
            <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 14px; margin-top: 2px;">
              Centro Internacional de Idiomas
            </div>
          `;
        }
      }}
    />
  );

  // Componente Título Principal Unificado
  const MainTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h1 
      className={`${TitleConfig.mainSize} ${TitleConfig.weight} ${TitleConfig.spacing} ${className}`}
      style={{ 
        fontFamily: TitleConfig.fontFamily,
        color: TitleConfig.color
      }}
    >
      {children}
    </h1>
  );

  // Componente Subtítulo Unificado
  const Subtitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <p 
      className={`${SubtitleConfig.size} ${SubtitleConfig.weight} ${SubtitleConfig.spacing} ${className}`}
      style={{ 
        fontFamily: SubtitleConfig.fontFamily,
        color: SubtitleConfig.color
      }}
    >
      {children}
    </p>
  );

  const slide7Colors = {
    lila: '#B9ABE4',
    verdeTurquesa: '#007567',
    amarillo: '#FFC846',
    azulOscuro: '#12055F',
    verdeClaro: '#C4D4A4',
    negro: '#1A202C',
    white: '#FFFFFF',
    grayMedium: '#4A5568',
    grayLight: '#F3F4F6',
    grisClaro: '#D1D5DB',
    grisMedio: '#6B7280',
    grisOscuro: '#374151',
    exito: '#10B981',
    error: '#EF4444',
    advertencia: '#F59E0B',
    informacion: '#3B82F6',
    degradadoAzul: 'linear-gradient(to right, #3B82F6, #1E40AF)',
    degradadoLila: 'linear-gradient(to right, #8B5CF6, #6D28D9)',
  };

  const toolsData = [
    {
      id: 'textmagic',
      name: 'TextMagic TTS',
      url: 'https://www.textmagic.com/free-tools/text-to-speech/',
      displayText: 'textmagic.com',
      wow: {
        beforeIcon: <IconTextMessage style={{color: slide7Colors.verdeTurquesa}} />,
        beforeText: "Texto Simple",
        afterIcon: <IconAudioHighQuality style={{color: slide7Colors.amarillo}}/>,
        afterText: "Voz Natural",
        benefit: "Convierte texto simple en audio claro y natural ¡al instante!",
        cta: "Probar TextMagic"
      },
      icon: <IconMagicWand />,
      tutorial: [
        'Visita la página de TextMagic TTS a través del enlace proporcionado.',
        'En el área de texto principal, escribe o pega el contenido que deseas convertir a voz.',
        'Utiliza los menús desplegables para seleccionar el idioma (ej. "Spanish") y la voz que prefieras de las opciones disponibles.',
        'Ajusta los controles deslizantes de "Velocidad" (Speed) y "Tono" (Pitch) para personalizar la salida de audio.',
        'Presiona el botón "Convert to speech" o "Play". Podrás escuchar una vista previa y, usualmente, descargar el audio en formato MP3.'
      ],
      features: ['Gratuito', 'Múltiples Idiomas', 'Varias Voces', 'Control Velocidad/Tono', 'Descarga MP3'],
      comparisons: [
        {
          title: "Comparación de Audio",
          original: {
            type: "audio",
            label: "Audio Humano Original",
            url: "/magic_humano.mp3"
          },
          resultado: {
            type: "audio",
            label: "Audio Generado con TextMagic",
            url: "/magic_2.mp3"
          }
        }
      ],
      colorAcento: slide7Colors.amarillo,
      ejemplos: [ { tipo: 'audio', texto: 'Audio generado con TextMagic', url: '/magic_2.mp3' } ]
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs',
      url: 'https://elevenlabs.io/',
      displayText: 'elevenlabs.io',
      wow: {
        beforeIcon: <IconVideoOriginal style={{color: slide7Colors.verdeTurquesa}} />,
        beforeText: "Vídeo Estándar",
        afterIcon: <IconAudioHighQuality style={{color: slide7Colors.lila}}/>,
        afterText: "Voz Profesional IA",
        benefit: "Transforma cualquier voz en una narración de estudio con IA.",
        cta: "Probar ElevenLabs"
      },
      icon: <IconElevenLabs />,
      tutorial: [
        'Crea una cuenta en ElevenLabs.io (pueden ofrecer un plan gratuito con limitaciones).',
        'Navega a "Speech Synthesis". Puedes elegir voces predefinidas de la "Voice Library" o usar voces que hayas clonado ("VoiceLab").',
        'Pega tu texto en el campo correspondiente. Selecciona la voz deseada.',
        'Ajusta los "Voice Settings": "Stability" (más bajo para más expresividad, más alto para monotonía) y "Clarity + Similarity Enhancement" (para mejorar la claridad).',
        'Haz clic en "Generate". Una vez procesado, podrás escuchar el audio y descargarlo.'
      ],
      features: ['Voces Hiperrealistas', 'Clonación Vocal', 'Personalización Avanzada', 'API Disponible', 'Múltiples Idiomas'],
      comparisons: [
        {
          title: "Ejemplo 1: Voz de Anciano",
          original: {
            type: "video", // Este sigue siendo video, se abrirá en nueva pestaña
            label: "Video Original: Old Man Speaking",
            url: "https://youtu.be/mhupEfL_j4I?si=CAhsKnXa8ykRQf-G&t=586"
          },
          resultado: {
            type: "audio",
            label: 'Resultado con voz "Thomas"',
            url: "/oldman_elevenlabs_thomas.mp3"
          }
        },
        {
          title: "Ejemplo 2: Voz en Español",
          original: {
            type: "video", // Este sigue siendo video, se abrirá en nueva pestaña
            label: 'Video Original: Voz Joven',
            url: "https://www.youtube.com/watch?v=EbDy79f-RhY"
          },
          resultado: {
            type: "audio",
            label: 'Resultado con voz "Thomas"',
            url: "/chico_joven_voz_poco_sonora.mp3"
          }
        }
      ],
      colorAcento: slide7Colors.lila,
      ejemplos: [ { tipo: 'video_resultado', texto: 'Escucha voz "Thomas" (ElevenLabs)', url: '/oldman_elevenlabs_thomas.mp3' } ]
    }
  ];

const currentToolData = toolsData.find(t => t.id === selectedToolId);
// Eliminada la línea: const year = new Date().getFullYear();

  const handleWowCardClick = (toolId: string) => {
    setSelectedToolId(toolId);
    setModalSource('wow');
    setViewState('tool_detail');
    setActiveAudio(null); // Reset audio player when changing views
  };

  const handleTechOverviewClick = (toolId: string) => {
    setSelectedToolId(toolId);
    setModalSource('tech_overview');
    setViewState('tool_detail');
    setActiveAudio(null); // Reset audio player
  };

  const handleExploreClick = () => {
    if (viewState === 'tech_overview' || viewState === 'tool_detail') {
        setViewState('wow');
        setSelectedToolId(null);
        setModalSource(null);
    } else {
        setViewState('tech_overview');
    }
    setActiveAudio(null); // Reset audio player
  };

  const closeModal = () => {
    if (viewState === 'tool_detail') {
        const techOverviewSection = document.getElementById("tech-overview-section");
        if (modalSource === 'wow') { // Si venimos de WOW, volvemos a WOW
             setViewState('wow');
        } else if (techOverviewSection) {
             setViewState('tech_overview');
        } else {
             setViewState('wow');
        }
        setSelectedToolId(null);
        setModalSource(null);
        setActiveAudio(null); // Reset audio player when closing modal
    }
  };

  const handlePlayAudio = (cardKey: string, url: string, type: 'audio' | 'video') => {
    if (type === 'video') {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (activeAudio && activeAudio.cardKey === cardKey) {
      setActiveAudio(null); // Si se hace clic en el mismo, lo detenemos/ocultamos
    } else {
      setActiveAudio({ cardKey, url });
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start p-6 md:p-8"
      style={{
        background: `linear-gradient(160deg, ${slide7Colors.lila}0A 0%, ${slide7Colors.verdeTurquesa}1A 50%, ${slide7Colors.lila}0A 100%), ${slide7Colors.grayLight}`
      }}
    >
      {/* Logo Hablandis */}
      <div className={LogoConfig.position}>
        <LogoHablandis />
      </div>

      <motion.div
        className="absolute top-10 -left-20 w-72 h-72 opacity-20"
        style={{background: slide7Colors.amarillo, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 -right-20 w-80 h-80 opacity-15"
        style={{background: slide7Colors.verdeTurquesa, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'}}
        animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay:0.1 }}
        className="text-center my-8 md:my-10 w-full max-w-4xl z-10"
      >
        <MainTitle className="mb-3">
          ¡Voces que Asombran con IA!
        </MainTitle>
        <Subtitle>
          Experimenta la transformación de texto a voz y descubre su potencial.
        </Subtitle>
      </motion.div>

    <div className="w-full max-w-5xl z-10 flex-1 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {viewState === 'wow' && (
            <motion.div
                key="wow-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mb-6"
            >
                {toolsData.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.id + "-wow"}
                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                    style={{borderTop: `6px solid ${tool.colorAcento}`}}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    initial="hidden"
                    animate="visible"
                    transition={{delay:0.1 * toolIndex}} // Corrección: usar toolIndex
                  >
                    <div className="flex items-center justify-around w-full my-4 px-4">
                        <div className="flex flex-col items-center opacity-70">
                            {tool.wow.beforeIcon}
                            <p className="text-xs mt-1" style={{color: slide7Colors.grayMedium, fontFamily: 'Raleway'}}>{tool.wow.beforeText}</p>
                        </div>
                        <IconSparkles className="w-10 h-10 mx-2 sm:mx-4 text-lg" style={{color: tool.colorAcento}} />
                        <div className="flex flex-col items-center">
                            {tool.wow.afterIcon}
                            <p className="text-xs mt-1 font-semibold" style={{color: slide7Colors.azulOscuro, fontFamily: 'Raleway'}}>{tool.wow.afterText}</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold my-3" style={{fontFamily: 'Aglet Mono Light, monospace', color: slide7Colors.azulOscuro}}>{tool.name}</h3>
                    <p className="text-sm mb-5 flex-grow" style={{fontFamily: 'Raleway', color: slide7Colors.negro, minHeight: '3em'}}>
                        {tool.wow.benefit}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-auto font-semibold py-2.5 px-5 rounded-lg text-sm inline-flex items-center gap-2 shadow-md w-full justify-center"
                        style={{backgroundColor: tool.colorAcento, color: slide7Colors.azulOscuro, fontFamily: 'Raleway SemiBold'}}
                        onClick={() => handleWowCardClick(tool.id)}
                    >
                        <IconPlayCircle className="w-5 h-5" /> {tool.wow.cta}
                    </motion.button>
                  </motion.div>
                ))}
            </motion.div>
        )}

        {viewState === 'tech_overview' && (
            <motion.div
                key="tech-overview-section"
                id="tech-overview-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center" style={{fontFamily: 'Aglet Mono Light', color:slide7Colors.azulOscuro}}>
                    Herramientas de IA Vocal
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {toolsData.map(tool => (
                        <div key={tool.id + "-overview"}
                             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                             style={{borderColor: tool.colorAcento, borderLeftWidth: '4px'}}
                             onClick={() => handleTechOverviewClick(tool.id)}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div style={{color: tool.colorAcento}}>
                                  {/* MODIFICACIÓN 1: Corregido el error de 'className' */}
                                  {React.cloneElement(tool.icon as React.ReactElement<{ className?: string }>, {className: "w-7 h-7"})}
                                </div>
                                <h3 className="text-lg font-semibold" style={{fontFamily: 'Raleway SemiBold', color: slide7Colors.azulOscuro}}>{tool.name}</h3>
                            </div>
                            <p className="text-xs mb-3" style={{fontFamily: 'Raleway', color: slide7Colors.grayMedium}}>{tool.wow.benefit}</p>
                            <button
                                className="text-xs font-semibold py-1 px-3 rounded-md w-full"
                                style={{backgroundColor: `${tool.colorAcento}30`, color: slide7Colors.azulOscuro, fontFamily: 'Raleway Medium'}}
                            >
                                Ver Detalles y Tutorial
                            </button>
                        </div>
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>

<motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: (viewState === 'wow' ? 0.6 : 0.2) }}
    onClick={handleExploreClick}
    className="font-semibold py-3 px-8 rounded-full text-md inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
    style={{
        background: `linear-gradient(to right, ${slide7Colors.amarillo}, ${slide7Colors.lila})`,
        color: slide7Colors.azulOscuro,
        fontFamily: 'Raleway SemiBold',
        position: 'fixed',          // ← POSITION FIXED
        bottom: '150px',            // ← AJUSTA ESTA DISTANCIA
        left: '40%',
        transform: 'translateX(-50%)',
        zIndex: 20
    }}
>
        {viewState === 'wow' ? <IconChevronDown /> : <IconChevronUp />}
        {viewState === 'wow' ? "Explorar Herramientas a Fondo" : "Volver a la Demostración"}
    </motion.button>

      <AnimatePresence>
        {viewState === 'tool_detail' && currentToolData && (
          <motion.div
            key="tool-detail-modal"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <div
                className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5 pb-4 border-b" style={{borderColor: `${currentToolData.colorAcento}50`}}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{backgroundColor: `${currentToolData.colorAcento}20`}}>
                            {/* MODIFICACIÓN 2: Corregido el error de 'style' y 'className' */}
                            {React.cloneElement(
                                currentToolData.icon as React.ReactElement<{ style?: React.CSSProperties, className?: string }>,
                                {style:{color: currentToolData.colorAcento}, className: "w-6 h-6"}
                            )}
                        </div>
                        <h2 className="text-2xl font-bold" style={{fontFamily: 'Aglet Mono Light, monospace', color: slide7Colors.azulOscuro}}>
                            {currentToolData.name}
                        </h2>
                    </div>
                    <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                        <IconClose style={{color: slide7Colors.grayMedium}} className="w-6 h-6"/>
                    </button>
                </div>

                {modalSource === 'tech_overview' ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 overflow-y-auto custom-scrollbar-minimal pr-2">
                        {/* ... (contenido de tech_overview sin cambios) ... */}
                         <div className="space-y-3">
                            <h3 className="text-lg font-semibold" style={{fontFamily: 'Raleway SemiBold', color: slide7Colors.azulOscuro}}>Tutorial Rápido:</h3>
                            {currentToolData.tutorial.map((step, index) => (
                                <div key={`tut-modal-${index}`} className="flex items-start gap-3 p-2.5 rounded-lg text-sm" style={{ backgroundColor: `${currentToolData.colorAcento}10`, fontFamily: 'Raleway', color: slide7Colors.negro }}>
                                    <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: currentToolData.colorAcento, color: slide7Colors.azulOscuro }}>{index + 1}</div>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2" style={{fontFamily: 'Raleway SemiBold', color: slide7Colors.azulOscuro}}>Características:</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {currentToolData.features.map((feature, idx) => (
                                        <span key={`feat-modal-${idx}`} className="text-xs px-2.5 py-1 rounded-md font-medium" style={{ backgroundColor: `${currentToolData.colorAcento}20`, color: slide7Colors.azulOscuro, fontFamily: 'Raleway' }}>{feature}</span>
                                    ))}
                                </div>
                            </div>
                            {currentToolData.ejemplos && currentToolData.ejemplos.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2" style={{fontFamily: 'Raleway SemiBold', color: slide7Colors.azulOscuro}}>Ejemplos:</h3>
                                {currentToolData.ejemplos.map((ej, idx) => (
                                <a key={`ex-modal-${idx}`} href={ej.url} target={ej.tipo === 'audio' ? '_self' : '_blank'} rel="noopener noreferrer" className="mb-1.5 bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow flex items-center gap-2 text-sm w-full" style={{borderColor: `${currentToolData.colorAcento}30`, borderWidth:1}}>
                                    <IconPlayCircle className="w-4 h-4 flex-shrink-0" style={{color: currentToolData.colorAcento}}/>
                                    <span style={{fontFamily: 'Raleway', color: slide7Colors.negro}}>{ej.texto}</span>
                                    {ej.tipo !== 'audio' && <IconExternalLink className="w-3 h-3 ml-auto" style={{ color: slide7Colors.grayMedium }} />}
                                </a>
                                ))}
                            </div>
                            )}
                             <a href={currentToolData.url} target="_blank" rel="noopener noreferrer" className="mt-3 block w-full text-center font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:opacity-90 transition-opacity" style={{backgroundColor: currentToolData.colorAcento, color: slide7Colors.azulOscuro, fontFamily: 'Raleway SemiBold'}}>
                                Visitar {currentToolData.displayText} <IconLinkSimple className="inline w-3.5 h-3.5 ml-1"/>
                            </a>
                        </div>
                    </div>
                ) : ( // modalSource === 'wow'
                    <div className="flex-1 overflow-y-auto custom-scrollbar-minimal pr-2">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-medium mb-2" style={{fontFamily: 'Raleway SemiBold', color: slide7Colors.negro}}>
                                Escucha la Diferencia
                            </h3>
                            <p className="text-sm" style={{fontFamily: 'Raleway', color: slide7Colors.grayMedium}}>
                                Compara el original con el resultado procesado por IA. Haz clic para reproducir.
                            </p>
                        </div>

                        {currentToolData.comparisons.map((comparison, index) => {
                            const originalCardKey = `comp-${index}-original-${currentToolData.id}`;
                            const resultadoCardKey = `comp-${index}-resultado-${currentToolData.id}`;

                            return (
                                <motion.div
                                    key={`comparison-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="mb-8"
                                >
                                    <h4 className="text-lg font-semibold mb-4 text-center"
                                        style={{fontFamily: 'Raleway SemiBold', color: slide7Colors.azulOscuro}}>
                                        {comparison.title}
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* TARJETA ORIGINAL */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="relative"
                                        >
                                            <div className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-medium"
                                                 style={{backgroundColor: slide7Colors.verdeTurquesa + '20', color: slide7Colors.verdeTurquesa}}>
                                                Original
                                            </div>
                                            <div // Cambiado de <a> a <div> para controlar el clic
                                                onClick={() => handlePlayAudio(originalCardKey, comparison.original.url, comparison.original.type as 'audio' | 'video')}
                                                className="block p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer min-h-[150px] flex flex-col justify-center items-center"
                                                style={{
                                                    backgroundColor: slide7Colors.grayLight,
                                                    border: `2px solid ${slide7Colors.verdeTurquesa}30`
                                                }}
                                            >
                                                {activeAudio && activeAudio.cardKey === originalCardKey ? (
                                                    <audio
                                                        src={activeAudio.url}
                                                        controls
                                                        autoPlay
                                                        onEnded={() => setActiveAudio(null)}
                                                        onError={() => { console.error("Error al cargar audio"); setActiveAudio(null);}}
                                                        className="w-full h-10" // Estilo básico para el reproductor
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-3 text-center">
                                                        {comparison.original.type === 'video' ?
                                                            <IconVideo className="w-12 h-12" style={{ color: slide7Colors.verdeTurquesa }} /> :
                                                            <IconHeadphones className="w-12 h-12" style={{ color: slide7Colors.verdeTurquesa }} />
                                                        }
                                                        <span className="text-sm" style={{ fontFamily: 'Raleway', color: slide7Colors.negro }}>
                                                            {comparison.original.label}
                                                        </span>
                                                        {comparison.original.type === 'video' && <IconExternalLink className="w-4 h-4" style={{ color: slide7Colors.grayMedium }} />}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* TARJETA RESULTADO IA */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="relative"
                                        >
                                            <div className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-medium"
                                                 style={{backgroundColor: currentToolData.colorAcento + '20', color: currentToolData.colorAcento}}>
                                                Con IA
                                            </div>
                                            <div // Cambiado de <a> a <div> para controlar el clic
                                                onClick={() => handlePlayAudio(resultadoCardKey, comparison.resultado.url, comparison.resultado.type as 'audio' | 'video')}
                                                className="block p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer min-h-[150px] flex flex-col justify-center items-center"
                                                style={{
                                                    backgroundColor: currentToolData.colorAcento + '10',
                                                    border: `2px solid ${currentToolData.colorAcento}30`
                                                }}
                                            >
                                                {activeAudio && activeAudio.cardKey === resultadoCardKey ? (
                                                    <audio
                                                        src={activeAudio.url}
                                                        controls
                                                        autoPlay
                                                        onEnded={() => setActiveAudio(null)}
                                                        onError={() => { console.error("Error al cargar audio"); setActiveAudio(null);}}
                                                        className="w-full h-10" // Estilo básico para el reproductor
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-3 text-center">
                                                        <IconHeadphones className="w-12 h-12" style={{ color: currentToolData.colorAcento }} />
                                                        <span className="text-sm" style={{ fontFamily: 'Raleway', color: slide7Colors.negro }}>
                                                            {comparison.resultado.label}
                                                        </span>
                                                        {/* No external link for local audio typically */}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        })}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-6 text-center"
                        >
                            <a
                                href={currentToolData.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-lg text-sm shadow-md hover:opacity-90 transition-opacity"
                                style={{backgroundColor: currentToolData.colorAcento, color: slide7Colors.azulOscuro, fontFamily: 'Raleway SemiBold'}}
                            >
                                Probar {currentToolData.displayText} tú mismo <IconLinkSimple className="inline w-4 h-4"/>
                            </a>
                        </motion.div>
                    </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Unificado */}
      <div 
        className={FooterConfig.position}
        style={{
          backgroundColor: FooterConfig.background,
          backdropFilter: FooterConfig.backdropFilter,
          padding: FooterConfig.padding
        }}
      >
        <p 
          className="text-center"
          style={{
            fontFamily: FooterConfig.text.fontFamily,
            fontSize: FooterConfig.text.size,
            color: FooterConfig.text.color,
            opacity: FooterConfig.text.opacity,
            fontWeight: FooterConfig.text.weight
          }}
        >
          © {new Date().getFullYear()} Hablandis. Centro Internacional de Idiomas. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 7 (CON DISEÑO UNIFICADO)
// =======================================================================

const Diapositiva8 = () => {
  const year = new Date().getFullYear();

  const colors = {
    verdeClaro: '#C4D4A4', azulOscuro: '#12055F', amarillo: '#FFC846',
    verdeTurquesa: '#007567', negro: '#111827', lila: '#B9ABE4',
    white: '#FFFFFF', fondoBase: '#F8FAFC', panelBg: '#FFFFFF',
    panelBorder: '#E5E7EB',
    lineaRojaPrincipal: '#FF0000',
    puntoConexionAzul: '#0075FF',
    puntoConexionVerde: '#00C853',
    textSecondaryOnPanel: '#374151',
    connectionActive: '#FF0000',
  };

  const unifiedColors = {
    azulOscuro: '#12055F',
    verdeTurquesa: '#007567',
    blanco: '#FFFFFF'
  };

  const LogoConfig = {
    size: 'h-24 md:h-32',
    position: 'absolute top-6 left-6 z-30',
    fallbackFontSize: '36px md:48px',
    shadow: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
  };

  const TitleConfig = {
    fontFamily: 'Aglet Mono, monospace',
    mainSize: 'text-3xl md:text-4xl lg:text-5xl',
    weight: 'font-semibold',
    color: unifiedColors.azulOscuro,
    spacing: 'mb-4 md:mb-6'
  };

  const SubtitleConfig = {
    fontFamily: 'Raleway, sans-serif',
    size: 'text-lg md:text-xl lg:text-2xl',
    weight: 'font-normal',
    color: unifiedColors.verdeTurquesa,
    spacing: 'mb-2'
  };

  const FooterConfig = {
    position: 'absolute bottom-4 left-0 right-0',
    padding: 'py-3',
    background: `${unifiedColors.blanco}70`,
    backdropFilter: 'backdrop-blur(10px)',
    text: {
      fontFamily: 'Raleway, sans-serif',
      size: '13px',
      color: unifiedColors.azulOscuro,
      opacity: '0.8',
      weight: '500'
    }
  };

  const LogoHablandisUnified = ({ className = "" }: { className?: string }) => (
    <img 
      src="/hablandis.png" 
      alt="Hablandis" 
      className={`${LogoConfig.size} ${className}`}
      style={{ filter: LogoConfig.shadow }}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div style="font-family: 'Aglet Mono', monospace; color: ${unifiedColors.azulOscuro}; font-size: ${LogoConfig.fallbackFontSize}; font-weight: 700; line-height: 1;">
              Hablandis
            </div>
            <div style="font-family: 'Raleway', sans-serif; color: ${unifiedColors.verdeTurquesa}; font-size: 14px; margin-top: 2px;">
              Centro Internacional de Idiomas
            </div>
          `;
        }
      }}
    />
  );

  const MainTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h1 
      className={`${TitleConfig.mainSize} ${TitleConfig.weight} ${TitleConfig.spacing} ${className}`}
      style={{ 
        fontFamily: TitleConfig.fontFamily,
        color: TitleConfig.color
      }}
    >
      {children}
    </h1>
  );

  const Subtitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <p 
      className={`${SubtitleConfig.size} ${SubtitleConfig.weight} ${SubtitleConfig.spacing} ${className}`}
      style={{ 
        fontFamily: SubtitleConfig.fontFamily,
        color: SubtitleConfig.color
      }}
    >
      {children}
    </p>
  );

  // --- ICONOS ---
  const IconLinearDocument = ({ className = "w-9 h-9" }: { className?: string }) => ( <svg className={className} strokeWidth="1.2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg> );
  const IconLinearChat = ({ className = "w-9 h-9" }: { className?: string }) => ( <svg className={className} strokeWidth="1.2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> );
  const IconLinearSearchPlus = ({ className = "w-9 h-9" }: { className?: string }) => ( <svg className={className} strokeWidth="1.2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line><line x1="10.5" y1="7" x2="10.5" y2="14"></line><line x1="7" y1="10.5" x2="14" y2="10.5"></line></svg> );
  const IconLinearTuneSliders = ({ className = "w-9 h-9" }: { className?: string }) => ( <svg className={className} strokeWidth="1.2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg> );
  const IconPencilSimple = ({ className = "w-6 h-6" }: { className?: string }) => ( <svg className={className} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> );
  const IconAISparkles = ({ className = "w-6 h-6" }: { className?: string }) => ( <svg className={className} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3L12 2zM20 12l-2.828-2.828M6.828 6.828L4 4m0 16l2.828-2.828M20 4l-2.828 2.828"></path></svg> );
  const Highlight = ({ children, color } : { children: React.ReactNode, color: string }) => (  <mark style={{ backgroundColor: `${color}20`, padding: '0.08em 0.3em', borderRadius: '4px', color: 'inherit' }}>{children}</mark>  );

  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Tipos para textData
  interface OriginalContentData {
    title: string;
    content: () => React.ReactElement;
  }

  interface ProcessedContentData {
    promptTitle: string;
    promptContent: () => React.ReactElement;
    responseTitle: string;
    responseContent: () => React.ReactElement;
  }

  interface TextDataMap {
    originalB1: OriginalContentData;
    transformColloquial: ProcessedContentData;
    extractVocab: ProcessedContentData;
    refineB2: ProcessedContentData;
  }

  interface ProcessingNode { id: string; title: string; shortTitle: string; icon: React.ReactElement; position: { x: number; y: number }; connections: string[]; dataKey: keyof TextDataMap; baseColor: string; }
  const nodes: ProcessingNode[] = [ { id: 'original', title: "Texto original: Normas para Asistentes a Conciertos en España", shortTitle: "ORIGEN B1", icon: <IconLinearDocument />, position: { x: 20, y: 50 }, connections: ['colloquial'], dataKey: 'originalB1', baseColor: colors.verdeTurquesa }, { id: 'colloquial', title: "Transformación: Diálogo Informal", shortTitle: "DIÁLOGO", icon: <IconLinearChat />, position: { x: 45, y: 35 }, connections: ['extraction'], dataKey: 'transformColloquial', baseColor: colors.lila }, { id: 'extraction', title: "Análisis: Vocabulario A2", shortTitle: "VOCAB. A2", icon: <IconLinearSearchPlus />, position: { x: 55, y: 65 }, connections: ['refinement'], dataKey: 'extractVocab', baseColor: colors.verdeClaro }, { id: 'refinement', title: "Refinamiento: Texto Nivel B2", shortTitle: "NIVEL B2", icon: <IconLinearTuneSliders />, position: { x: 80, y: 50 }, connections: [], dataKey: 'refineB2', baseColor: colors.azulOscuro }, ];

  // TEXTDATA
  const textData: TextDataMap = {
    originalB1: {
      title: "Texto original: Normas para Asistentes a Conciertos en España",
      content: () => (
        <>
          <h3 className="text-xl font-semibold mb-4" style={{color: colors.azulOscuro, fontFamily: 'Aglet Mono Light'}}>Normas para Asistentes a Conciertos en España</h3>
          <p className="mb-4" style={{fontFamily:'Raleway', fontSize:'1rem', color: colors.textSecondaryOnPanel}}>
            <strong>Introducción</strong><br />
            Este documento presenta 15 obligaciones y prohibiciones básicas para los asistentes a conciertos en pabellones y zonas afines en España. Las normas están adaptadas para ser claras y comprensibles, y se basan en regulaciones oficiales y buenas prácticas.
          </p>
          <h4 className="font-semibold mb-2" style={{fontFamily:'Raleway', color: colors.verdeTurquesa}}>Obligaciones y Prohibiciones</h4>
          <ol className="list-decimal list-inside space-y-2 text-lg leading-relaxed" style={{fontFamily:'Raleway'}}>
            <li><Highlight color={colors.amarillo}>No puedes llevar comida o bebida externa si el recinto lo prohíbe.</Highlight></li>
            <li><Highlight color={colors.amarillo}>Debes seguir las indicaciones de seguridad (evacuación, rutas marcadas).</Highlight></li>
            <li><Highlight color={colors.amarillo}>No está permitido gritar o hacer ruido excesivo que moleste a otros.</Highlight></li>
            <li><Highlight color={colors.amarillo}>Es obligatorio respetar los horarios de entrada y salida del evento.</Highlight></li>
            <li><Highlight color={colors.amarillo}>No puedes portar objetos peligrosos (armas, sustancias prohibidas).</Highlight></li>
            <li><Highlight color={colors.amarillo}>Debes mantener los espacios limpios (no tirar basura).</Highlight></li>
            <li><Highlight color={colors.amarillo}>No está permitido grabar videos o fotos sin autorización.</Highlight></li>
            <li>Es obligatorio usar equipo de seguridad (cascos) en zonas de montaje.</li>
            <li>No puedes fumar en zonas no autorizadas (dentro del recinto, salidas de emergencia).</li>
            <li>Debes pagar la entrada antes de acceder al recinto.</li>
            <li>No está permitido correr o empujar para evitar accidentes.</li>
            <li>Es obligatorio colaborar con el personal de seguridad (inspecciones de mochilas).</li>
            <li>No puedes usar ropa o símbolos que promuevan el odio o la violencia.</li>
            <li>Debes devolver el dinero si el concierto se cancela sin justificación.</li>
            <li>No está permitido abandonar el recinto sin permiso durante una evacuación.</li>
          </ol>
          <p className="mt-5" style={{fontFamily:'Raleway', color: colors.textSecondaryOnPanel, fontSize:'1rem'}}>
            <strong>Nota:</strong> Este documento es un resumen simplificado. Para información detallada, consulta las normativas oficiales como el Real Decreto 44/2014 y normativas locales.
          </p>
          <p className="mt-4 italic text-base" style={{fontFamily:'Raleway', color: colors.textSecondaryOnPanel}}>
            © 2025 - Documento informativo. Basado en regulaciones vigentes en España.
          </p>
        </>
      ),
    },
    transformColloquial: {
      promptTitle: "Prompt para Diálogo Informal",
      promptContent: () => <p className="text-lg leading-relaxed" style={{fontFamily:'Raleway'}}>Reescribe la información básica del texto anterior con el estilo de un diálogo informal entre estudiantes, con vocabulario coloquial al estilo de La Pija y La Quinqui.</p>,
      responseTitle: "Respuesta IA: Diálogo Coloquial",
      responseContent: () => (
        <div className="text-lg leading-relaxed space-y-3" style={{fontFamily:'Raleway'}}>
          <p><strong>La Pija:</strong> O sea, tía, ¿has visto la lista de normas de los conciertos? <Highlight color={colors.amarillo}>Es que me muero, qué control, de verdad.</Highlight></p>
          <p><strong>La Quinqui:</strong> ¡Buah, flipas! <Highlight color={colors.amarillo}>Si es que no nos dejan ni traer unas birras de casa, ¿pa’ qué tanto rollo?</Highlight></p>
          <p><strong>La Pija:</strong> Literal, <Highlight color={colors.amarillo}>si llevas algo de fuera te lo requisan en la puerta. Y como grites un poco, ya está el segurata mirándote mal.</Highlight></p>
          <p><strong>La Quinqui:</strong> <Highlight color={colors.amarillo}>Pues que les den, yo grito si me da la gana, ¿o qué? Pero bueno… tampoco mola que te echen, que la entrada cuesta pasta.</Highlight></p>
          <p><strong>La Pija:</strong> Y si suena la alarma, todos en fila, monísimas, <Highlight color={colors.amarillo}>que hay que salir por donde te digan. Nada de buscar el atajo, que luego te sueltan la chapa.</Highlight></p>
          <p><strong>La Quinqui:</strong> <Highlight color={colors.amarillo}>Y lo de grabar, ¿qué? Saca el móvil y verás, te lo quitan. Ni stories ni ná, vaya bajón.</Highlight></p>
          <p><strong>La Pija:</strong> Tía, <Highlight color={colors.amarillo}>si fumas dentro, te montan el pollo. Hay zonas fuera, pero dentro ni lo sueñes.</Highlight></p>
          <p><strong>La Quinqui:</strong> Yo con la peña de seguridad no discuto, <Highlight color={colors.amarillo}>que se ponen chungos. Mejor portarse bien y ya.</Highlight></p>
          <p><strong>La Pija:</strong> Eso sí, <Highlight color={colors.amarillo}>si cancelan el concierto sin motivo, devuelven la pasta. Pero como sea por el artista, te fastidias y a llorar a casa.</Highlight></p>
          <p><strong>La Quinqui:</strong> Pues nada, tía, <Highlight color={colors.amarillo}>a seguir las normas y a disfrutar. Pero qué rabia, con lo bien que se liaba antes en los conciertos…</Highlight></p>
        </div>
      ),
    },
    extractVocab: {
      promptTitle: "Prompt para Extracción de Vocabulario A2",
      promptContent: () => <p className="text-lg leading-relaxed" style={{fontFamily:'Raleway'}}>Extrae del texto una lista con las palabras más relevantes del texto para un estudiante de español de nivel A2 del MCERL, y amplíala con la traducción al inglés de cada término, una frase de ejemplo en español, dos términos relacionados y dos colocaciones habituales en español.</p>,
      responseTitle: "Respuesta IA: Vocabulario Clave A2",
      responseContent: () => (
        <ul className="space-y-4 text-lg leading-relaxed" style={{fontFamily:'Raleway'}}>
          <li><Highlight color={colors.amarillo}><strong>1. Prohibir</strong></Highlight><br/>
            <b>Traducción</b>: To prohibit<br/>
            <b>Ejemplo</b>: No se permite llevar comida si el recinto lo prohíbe.<br/>
            <b>Términos relacionados</b>: Prohibido, norma<br/>
            <b>Colocaciones</b>: Prohibir comida, prohibir el acceso
          </li>
          <li><Highlight color={colors.amarillo}><strong>2. Regla</strong></Highlight><br/>
            <b>Traducción</b>: Rule<br/>
            <b>Ejemplo</b>: Hay reglas claras para los asistentes a conciertos.<br/>
            <b>Términos relacionados</b>: Norma, instrucción<br/>
            <b>Colocaciones</b>: Seguir las reglas, romper una regla
          </li>
          <li><Highlight color={colors.amarillo}><strong>3. Comida</strong></Highlight><br/>
            <b>Traducción</b>: Food<br/>
            <b>Ejemplo</b>: No se puede traer comida externa a algunos recintos.<br/>
            <b>Términos relacionados</b>: Alimento, bebida<br/>
            <b>Colocaciones</b>: Traer comida, comida permitida
          </li>
          <li><Highlight color={colors.amarillo}><strong>4. Seguridad</strong></Highlight><br/>
            <b>Traducción</b>: Safety<br/>
            <b>Ejemplo</b>: Debes seguir las indicaciones de seguridad.<br/>
            <b>Términos relacionados</b>: Emergencia, riesgo<br/>
            <b>Colocaciones</b>: Medidas de seguridad, salir por seguridad
          </li>
          <li><Highlight color={colors.amarillo}><strong>5. Ruido</strong></Highlight><br/>
            <b>Traducción</b>: Noise<br/>
            <b>Ejemplo</b>: No está permitido hacer ruido excesivo.<br/>
            <b>Términos relacionados</b>: Sonido, grito<br/>
            <b>Colocaciones</b>: Hacer ruido, reducir el ruido
          </li>
          <li><Highlight color={colors.amarillo}><strong>6. Fumar</strong></Highlight><br/>
            <b>Traducción</b>: To smoke<br/>
            <b>Ejemplo</b>: No puedes fumar en zonas no autorizadas.<br/>
            <b>Términos relacionados</b>: Cigarrillo, prohibido<br/>
            <b>Colocaciones</b>: Fumar en público, prohibir fumar
          </li>
          <li><Highlight color={colors.amarillo}><strong>7. Grabar</strong></Highlight><br/>
            <b>Traducción</b>: To record<br/>
            <b>Ejemplo</b>: No está permitido grabar sin autorización.<br/>
            <b>Términos relacionados</b>: Video, foto<br/>
            <b>Colocaciones</b>: Grabar un video, grabar en secreto
          </li>
          <li><Highlight color={colors.amarillo}><strong>8. Dinero</strong></Highlight><br/>
            <b>Traducción</b>: Money<br/>
            <b>Ejemplo</b>: Devuelven el dinero si el concierto se cancela.<br/>
            <b>Términos relacionados</b>: Pago, billete<br/>
            <b>Colocaciones</b>: Devolver el dinero, costo del dinero
          </li>
          <li><Highlight color={colors.amarillo}><strong>9. Emergencia</strong></Highlight><br/>
            <b>Traducción</b>: Emergency<br/>
            <b>Ejemplo</b>: Sigue las rutas marcadas en caso de emergencia.<br/>
            <b>Términos relacionados</b>: Alarma, evacuación<br/>
            <b>Colocaciones</b>: Evacuación de emergencia, llamada de emergencia
          </li>
          <li><Highlight color={colors.amarillo}><strong>10. Personal de seguridad</strong></Highlight><br/>
            <b>Traducción</b>: Security staff<br/>
            <b>Ejemplo</b>: Colabora con el personal de seguridad.<br/>
            <b>Términos relacionados</b>: Guardia, policía<br/>
            <b>Colocaciones</b>: Trabajar con el personal de seguridad, inspección del personal
          </li>
        </ul>
      ),
    },
    refineB2: {
      promptTitle: "Prompt para Refinamiento a Nivel B2",
      promptContent: () => <p className="text-lg leading-relaxed" style={{fontFamily:'Raleway'}}>Reescribe este texto para que tenga un nivel de complejidad B2.</p>,
      responseTitle: "Respuesta IA: Texto Refinado Nivel B2",
      responseContent: () => (
        <div className="text-lg leading-relaxed space-y-4" style={{fontFamily:'Raleway'}}>
          <h3 className="text-xl font-semibold" style={{color: colors.azulOscuro, fontFamily: 'Aglet Mono Light'}}>🎤 Normas para Asistentes a Conciertos en España (Nivel B2.2)</h3>
          <p><strong>Introducción</strong><br/>
          Este documento recoge 15 normas básicas que todo asistente debe conocer antes de acudir a un concierto en España, ya sea en pabellones, salas cubiertas o espacios similares. Las reglas están basadas en la legislación vigente y en prácticas habituales de seguridad y convivencia.</p>
          <h4 className="font-semibold" style={{fontFamily:'Raleway', color: colors.verdeTurquesa}}>Obligaciones y Prohibiciones</h4>
          <ul className="list-disc list-inside space-y-2">
            <li><Highlight color={colors.amarillo}>No está permitido entrar con comida ni bebida del exterior si el recinto lo indica expresamente.</Highlight></li>
            <li><Highlight color={colors.amarillo}>Es obligatorio seguir todas las indicaciones de seguridad, como las rutas de evacuación o las instrucciones del personal.</Highlight></li>
            <li><Highlight color={colors.amarillo}>Evita gritar o hacer ruidos excesivos que puedan molestar al resto del público.</Highlight></li>
            <li><Highlight color={colors.amarillo}>Respeta los horarios oficiales de entrada y salida. No se garantiza el acceso fuera del horario establecido.</Highlight></li>
            <li><Highlight color={colors.amarillo}>Queda totalmente prohibido acceder con objetos peligrosos, como armas o sustancias ilegales.</Highlight></li>
            <li><Highlight color={colors.amarillo}>Contribuye a mantener limpio el lugar: no dejes basura fuera de los contenedores.</Highlight></li>
            <li><Highlight color={colors.amarillo}>No se pueden hacer fotos ni vídeos profesionales sin autorización de la organización.</Highlight></li>
            <li>En las zonas de montaje o acceso restringido, es obligatorio usar el equipo de protección necesario, como cascos.</li>
            <li>No fumes en zonas no habilitadas, como pasillos, salidas de emergencia o zonas interiores.</li>
            <li>Para entrar al concierto, debes haber pagado la entrada correspondiente y tenerla disponible.</li>
            <li>Está prohibido correr o empujar, ya que puede generar accidentes y poner en peligro a otras personas.</li>
            <li>Colabora con el personal de seguridad si te piden mostrar tu bolso o realizar una inspección.</li>
            <li>No se permite el uso de ropa o símbolos que inciten al odio, la discriminación o la violencia.</li>
            <li>Si el concierto se cancela sin una razón justificada, tienes derecho a que te devuelvan el dinero.</li>
            <li>En caso de evacuación, no abandones el recinto por tu cuenta: sigue las instrucciones de los responsables del evento.</li>
          </ul>
          <p className="mt-3"><b>📌 Nota importante:</b><br/>
          Este texto es un resumen con fines informativos. Para conocer todos los detalles legales, consulta el Real Decreto 44/2014 y las normativas locales aplicables en tu comunidad autónoma.
          </p>
          <p className="italic text-base" style={{color: colors.textSecondaryOnPanel}}>
            © 2025 – Documento informativo basado en regulaciones oficiales del territorio español.
          </p>
        </div>
      ),
    }
  };

  const drawBrushStrokeLine = ( ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, baseThickness: number, pointColorStart?: string, pointColorEnd?: string, midPointColor?: string ) => { const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2); const steps = Math.max(10, Math.floor(distance / 3)); const dx = (x2 - x1) / steps; const dy = (y2 - y1) / steps; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; for (let i = 0; i <= steps; i++) { const currentX = x1 + dx * i; const currentY = y1 + dy * i; const thickness = baseThickness + (Math.random() - 0.5) * (baseThickness * 0.6); const offsetX = (Math.random() - 0.5) * (baseThickness * 0.4); const offsetY = (Math.random() - 0.5) * (baseThickness * 0.4); ctx.beginPath(); ctx.arc(currentX + offsetX, currentY + offsetY, thickness / 2, 0, Math.PI * 2); ctx.fillStyle = color + Math.floor((0.7 + Math.random() * 0.3) * 255).toString(16).padStart(2, '0'); ctx.fill(); } const pointRadius = baseThickness * 1.2; if (pointColorStart) { ctx.beginPath(); ctx.arc(x1, y1, pointRadius, 0, Math.PI * 2); ctx.fillStyle = pointColorStart; ctx.fill(); } if (pointColorEnd) { ctx.beginPath(); ctx.arc(x2, y2, pointRadius, 0, Math.PI * 2); ctx.fillStyle = pointColorEnd; ctx.fill(); } if (midPointColor && steps > 1) { const midX = x1 + dx * Math.floor(steps / 2); const midY = y1 + dy * Math.floor(steps / 2); ctx.beginPath(); ctx.arc(midX, midY, pointRadius * 1.2, 0, Math.PI * 2); ctx.fillStyle = midPointColor; ctx.fill(); } };
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
      node.connections.forEach(connId => {
        const targetNode = nodes.find(n => n.id === connId);
        if (targetNode) {
          const startX = node.position.x / 100 * rect.width;
          const startY = node.position.y / 100 * rect.height;
          const endX = targetNode.position.x / 100 * rect.width;
          const endY = targetNode.position.y / 100 * rect.height;

          const isActive = selectedNodeId === node.id || selectedNodeId === targetNode.id || hoveredNodeId === node.id || hoveredNodeId === targetNode.id;
          const lineColor = isActive ? colors.connectionActive : colors.lineaRojaPrincipal + '90'; // Atenuado si no activo
          const lineThickness = isActive ? 5 : 4;

          drawBrushStrokeLine(
            ctx, startX, startY, endX, endY,
            lineColor,
            lineThickness,
            colors.puntoConexionAzul, // Color para el punto de inicio
            colors.puntoConexionAzul, // Color para el punto final
            (node.id === 'extraction' && targetNode.id === 'refinement') ? colors.puntoConexionVerde : undefined // Punto especial
          );
        }
      });
    });
  }, [selectedNodeId, hoveredNodeId, nodes, colors]); // Agregado 'colors' a las dependencias
  React.useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        setHoveredNodeId(prev => prev);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentSelectedNodeDetails = selectedNodeId ? nodes.find(n => n.id === selectedNodeId) : null;
  const currentSelectedNodeContent = currentSelectedNodeDetails ? textData[currentSelectedNodeDetails.dataKey] : null;

  const nodeDisplaySize = 110;
  const nodeClickAreaPadding = 20;
  const panelWidthPercentage = 45;
  const networkShiftFactor = 1.8;
  const titleShiftFactor = 2.0;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 overflow-hidden relative" style={{ background: `linear-gradient(160deg, ${colors.verdeClaro}2A 0%, ${colors.lila}2A 100%), ${colors.fondoBase}` }}>
      {/* Logo Unificado */}
      <div className={LogoConfig.position}>
        <LogoHablandisUnified />
      </div>
      
      {/* Título y Subtítulo Unificados */}
      <motion.div className="text-center my-8 sm:my-10 md:my-12 w-full max-w-4xl z-10 flex-shrink-0 transition-all duration-500 ease-in-out" initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0, x: selectedNodeId ? `-${panelWidthPercentage / titleShiftFactor}%` : '0%', }} transition={{ type: "spring", stiffness: 180, damping: 22 }}>
        <MainTitle className="mb-2">
          Flujo de Procesamiento Textual IA
        </MainTitle>
        <Subtitle>
          Haz clic en una etapa para explorar los detalles de transformación.
        </Subtitle>
      </motion.div>
      
      {/* CORRECCIÓN 1: Eliminado 'sm' del objeto style */}
      <motion.div id="network-container" className="relative flex-grow w-full max-w-5xl xl:max-w-6xl mb-6 rounded-lg transition-all duration-500 ease-in-out" style={{minHeight: '45vh'}} animate={{ x: selectedNodeId ? `-${panelWidthPercentage / networkShiftFactor}%` : '0%', width: selectedNodeId ? `${100 - panelWidthPercentage + (panelWidthPercentage / (networkShiftFactor + 0.5))}%` : '100%', }} transition={{ type: "spring", stiffness: 180, damping: 22 }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
        {nodes.map((node, index) => ( <motion.div key={node.id} className="absolute cursor-pointer z-10 flex flex-col items-center justify-center transition-all duration-200 ease-out" style={{ left: `calc(${node.position.x}% - ${(nodeDisplaySize + nodeClickAreaPadding) / 2}px)`, top: `calc(${node.position.y}% - ${(nodeDisplaySize + nodeClickAreaPadding) / 2}px)`, width: `${nodeDisplaySize + nodeClickAreaPadding}px`, height: `${nodeDisplaySize + nodeClickAreaPadding}px`, }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness:150, damping:20 }} onClick={() => setSelectedNodeId(selectedNodeId === node.id ? null : node.id)} onMouseEnter={() => setHoveredNodeId(node.id)} onMouseLeave={() => setHoveredNodeId(null)} > <motion.div className="rounded-full flex flex-col items-center justify-center bg-white shadow-lg" style={{ width: `${nodeDisplaySize}px`, height: `${nodeDisplaySize}px`, border: `3.5px solid ${selectedNodeId === node.id || hoveredNodeId === node.id ? node.baseColor : colors.azulOscuro + 'B0'}`, color: selectedNodeId === node.id || hoveredNodeId === node.id ? node.baseColor : colors.azulOscuro, boxShadow: selectedNodeId === node.id || hoveredNodeId === node.id ? `0 0 18px ${node.baseColor}70, 0 0 0 3.5px ${node.baseColor}30`  : `0 5px 12px rgba(0,0,0,0.1)`, }} animate={{ scale: selectedNodeId === node.id ? 1.1 : hoveredNodeId === node.id ? 1.05 : 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} >
            {/* CORRECCIÓN 2: Casteo de node.icon */}
            {React.cloneElement(node.icon as React.ReactElement<{ className?: string }>, { className: "w-9 h-9 sm:w-10 sm:h-10 stroke-current" })}
            </motion.div> <span className="mt-2.5 text-center text-xs sm:text-sm font-semibold leading-tight tracking-normal" style={{ fontFamily: 'Raleway Semibold', color: colors.negro, opacity: 0.95 }}> {node.shortTitle} </span> </motion.div> ))}
      </motion.div>
      <AnimatePresence>
        {selectedNodeId && currentSelectedNodeDetails && currentSelectedNodeContent && (
          <motion.div key="details-panel-complete" initial={{ x: "100%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: "spring", stiffness: 280, damping: 30, duration:0.4 }} className="fixed top-0 right-0 bottom-0 shadow-2xl z-40 flex flex-col border-l-4" style={{ width: `${panelWidthPercentage}%`, minWidth: '380px', maxWidth: '650px', borderColor: currentSelectedNodeDetails.baseColor, backgroundColor: colors.panelBg }}>
            <div className="flex items-center justify-between p-5 sm:p-6 border-b" style={{borderColor: colors.panelBorder, backgroundColor: colors.white }}> <h2 className="text-xl sm:text-2xl font-medium" style={{fontFamily: 'Aglet Mono Light, monospace', color: currentSelectedNodeDetails.baseColor, letterSpacing:'-0.5px'}}> {currentSelectedNodeDetails.title} </h2> <button onClick={() => setSelectedNodeId(null)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"> <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg> </button> </div>
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-8 custom-scrollbar-minimalist" style={{ fontFamily:'Raleway, sans-serif', color: colors.negro, fontSize: '1.1rem', lineHeight:'1.8', backgroundColor: colors.white }}>
              {/* CORRECCIONES 3, 4, 5, 6, 7, 8: Casteo de icono y aserciones de tipo para contenido */}
              {currentSelectedNodeDetails.id === 'original' ? (
                <section>
                  <div className="flex items-center mb-4 p-3 rounded-lg" style={{backgroundColor: `${currentSelectedNodeDetails.baseColor}10`}}>
                    <div className="p-2 rounded-full mr-3 shadow-sm" style={{backgroundColor: currentSelectedNodeDetails.baseColor, color: colors.white}}>
                      {React.cloneElement(currentSelectedNodeDetails.icon as React.ReactElement<{ className?: string }>, {className:"w-5 h-5"})}
                    </div>
                    <h3 className="text-lg font-semibold" style={{fontFamily: 'Raleway Semibold', color: colors.negro}}>Contenido Original</h3>
                  </div>
                  {(currentSelectedNodeContent as OriginalContentData).content()}
                </section>
              ) : (
                <>
                  {(currentSelectedNodeContent as ProcessedContentData).promptContent && (
                    <section>
                      <div className="flex items-center mb-4 p-3 rounded-lg" style={{backgroundColor: `${colors.amarillo}10`}}>
                        <div className="p-2 rounded-full mr-3 shadow-sm" style={{backgroundColor: colors.amarillo, color: colors.azulOscuro}}><IconPencilSimple className="w-5 h-5"/></div>
                        <h3 className="text-lg font-semibold" style={{fontFamily: 'Raleway Semibold', color: colors.negro}}>Prompt (Entrada)</h3>
                      </div>
                      {(currentSelectedNodeContent as ProcessedContentData).promptContent()}
                    </section>
                  )}
                  {(currentSelectedNodeContent as ProcessedContentData).responseContent && (
                    <section>
                      <div className="flex items-center mb-4 p-3 rounded-lg" style={{backgroundColor: `${colors.verdeTurquesa}10`}}>
                        <div className="p-2 rounded-full mr-3 shadow-sm" style={{backgroundColor: colors.verdeTurquesa, color: colors.white}}><IconAISparkles className="w-5 h-5"/></div>
                        <h3 className="text-lg font-semibold" style={{fontFamily: 'Raleway Semibold', color: colors.negro}}>Respuesta IA (Salida)</h3>
                      </div>
                      {(currentSelectedNodeContent as ProcessedContentData).responseContent()}
                    </section>
                  )}
                </>
              )}
            </div>
            <div className="p-4 border-t text-xs text-center" style={{borderColor: colors.panelBorder, color: colors.textSecondaryOnPanel, fontFamily:'Raleway', backgroundColor: colors.white}}> Contenido generado y procesado por IA para fines educativos. </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer Unificado */}
      <div 
        className={FooterConfig.position}
        style={{
          backgroundColor: FooterConfig.background,
          backdropFilter: FooterConfig.backdropFilter,
          padding: FooterConfig.padding
        }}
      >
        <p 
          className="text-center"
          style={{
            fontFamily: FooterConfig.text.fontFamily,
            fontSize: FooterConfig.text.size,
            color: FooterConfig.text.color,
            opacity: FooterConfig.text.opacity,
            fontWeight: FooterConfig.text.weight
          }}
        >
          © {year} Hablandis. Centro Internacional de Idiomas. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 8 (CON DISEÑO UNIFICADO)
// =======================================================================

// =======================================================================
// DIAPOSITIVA 9: DESVELANDO LOS SECRETOS DEL PROMPTING (v. 5 Paneles)
// =======================================================================

// --- INICIO DE ICONOS ESPECÍFICOS DE ESTA DIAPOSITIVA ---
const IconPanelSearch = ({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.194-5.194M15.806 10.303a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
  </svg>
);

const IconPanelRefine = ({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m-8-9H2m18 0h-2m5.657-5.657l-1.414-1.414M5.757 5.757L4.343 4.343m14.142 14.142l-1.414 1.414M5.757 18.243l-1.414-1.414" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v-1m0 7v-1m3-3h1M8 12H7" />
  </svg>
);

const IconPanelStructure = ({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-6-8h6M4 6h16M4 10h16M4 18h16M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v16a2 2 0 002 2z" />
  </svg>
);

const IconPanelMagic = ({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.378 2.064a1 1 0 01.844.009l9 5A1 1 0 0122 8v8a1 1 0 01-.77.973l-9 4.5a1 1 0 01-.46 0l-9-4.5A1 1 0 012 16V8a1 1 0 01.778-.973l9-5a1 1 0 01.592.037zM12 13l7-3.5M12 13V7M12 13L5 9.5m7 9.5V13m0 6l-4-2m4 2l4-2m-4-9.5L8 5m4-2.5L16 5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l1.5-1.5M17 3l1-1M22 8l1.5.5" />
  </svg>
);

const IconClipboardList = ({ className = "w-8 h-8", style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

// NOTA: IconChevronDown e IconLinkSimple se asumen declarados globalmente.
// La definición de HablandisLogo9 local se elimina, se aplicarán los estilos de LogoConfig.

const Diapositiva9 = () => {
  const year = new Date().getFullYear();
  const [openPanelId, setOpenPanelId] = useState<string | null>(null);

  const slide9Colors = { // Estos son los colores locales de la Diapositiva 9
    bgGradientFrom: '#F3F4F6',
    bgGradientTo: '#E5E7EB',
    titleColor: '#12055F',     // Mapea a colors.azulOscuro de Config
    textColor: '#111827',
    panelBg: '#FFFFFF',
    panelBorder: '#D1D5DB',
    panelBorderActive: '#007567', // Mapea a colors.verdeTurquesa de Config
    accent1: '#007567',       // Mapea a colors.verdeTurquesa de Config
    accent2: '#FFC846',
    footerText: '#4B5563'
  };

  // Valores de Configuración Global (adaptados para uso directo)
  const GlobalLogoConfig = {
    size: 'h-24 md:h-32',
    position: 'absolute top-6 left-6 z-30',
    fallbackFontSize: '36px', // Usando el valor base, md: se maneja por clase de tamaño
    shadow: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
  };

  const GlobalTitleConfig = {
    fontFamily: 'Aglet Mono, monospace',
    mainSize: 'text-3xl md:text-4xl lg:text-5xl', // Tamaño base de config
    weight: 'font-semibold',
    color: slide9Colors.titleColor, // Mapeado desde slide9Colors
    spacing: 'mb-4 md:mb-6' // Espaciado base de config
  };

  const GlobalSubtitleConfig = {
    fontFamily: 'Raleway, sans-serif',
    size: 'text-lg md:text-xl lg:text-2xl', // Tamaño base de config
    weight: 'font-normal', // CSS: 400
    color: slide9Colors.accent1, // Mapeado desde slide9Colors (verdeTurquesa)
    spacing: 'mb-2' // Espaciado base de config
  };

  const GlobalFooterConfig = {
    position: 'absolute bottom-4 left-0 right-0',
    padding: 'py-3',
    background: `${'#FFFFFF'}70`, // colors.blanco -> '#FFFFFF'
    backdropFilter: 'backdrop-blur(10px)',
    text: {
      fontFamily: 'Raleway, sans-serif',
      size: '13px',
      color: slide9Colors.titleColor, // Mapeado (azulOscuro)
      opacity: '0.8',
      weight: '500' // CSS: 500
    }
  };


  const panelData = [
    {
      id: 'revelame',
      title: 'ChatGPT, revélame lo que necesito',
      icon: <IconPanelSearch />,
      content: (
        <>
          <div className="p-3 mb-3 rounded" style={{backgroundColor: `${slide9Colors.accent2}20`}}>
            <strong className="block mb-1" style={{color: slide9Colors.titleColor}}>Prompt inicial:</strong>
            <p>Haz una lista con los parámetros más relevantes para la redacción de un prompt para la creación de textos y dame un ejemplo.</p>
          </div>
          <div className="p-3 rounded" style={{backgroundColor: `${slide9Colors.accent1}15`}}>
            <strong className="block mb-1" style={{color: slide9Colors.titleColor}}>Respuesta:</strong>
            <p className="mb-2">Claro, aquí te proporciono una lista de parámetros importantes para escribir un prompt efectivo para que yo pueda crear textos, junto con un ejemplo:</p>
            <ol className="list-decimal list-outside ml-5 space-y-2">
              <li><strong>Tema:</strong> El tema debe ser claro y específico, para que el texto generado se centre en el tema deseado. <br/><em className="text-base opacity-80">Ejemplo: Escribe un texto de 500 palabras sobre la importancia del reciclaje en la conservación del medio ambiente.</em></li>
              <li><strong>Nivel de dificultad:</strong> Es importante indicar el nivel de dificultad requerido para el texto, para asegurarse de que el texto sea accesible para el público objetivo.<br/><em className="text-base opacity-80">Ejemplo: Escribe un texto de nivel B2 para estudiantes universitarios sobre el impacto de la inteligencia artificial en la economía global.</em></li>
              <li><strong>Longitud:</strong> Es importante especificar la longitud del texto para asegurarse de que cumpla con las expectativas del lector o la finalidad del texto.<br/><em className="text-base opacity-80">Ejemplo: Escribe un texto de 300 palabras sobre las ventajas y desventajas de trabajar desde casa para una revista en línea.</em></li>
              <li><strong>Tono:</strong> El tono del texto puede ser informativo, persuasivo, amistoso, neutral, entre otros, dependiendo del objetivo y la finalidad del texto.<br/><em className="text-base opacity-80">Ejemplo: Escribe un texto persuasivo de 400 palabras para concienciar a los consumidores sobre los peligros del consumo excesivo de azúcar en alimentos procesados.</em></li>
              <li><strong>Finalidad:</strong> Es importante especificar la finalidad del texto, que puede ser informar, persuadir, entretener o instruir al lector.<br/><em className="text-base opacity-80">Ejemplo: Escribe un texto instructivo de 350 palabras sobre cómo preparar una comida saludable en casa para personas con un presupuesto limitado.</em></li>
            </ol>
            <p className="mt-3 opacity-90"><em>En general, los parámetros importantes para escribir un prompt efectivo incluyen el tema, el nivel de dificultad, la longitud, el tono y la finalidad del texto. Al proporcionar detalles claros y específicos, se puede asegurar que el texto generado sea relevante y útil para el público objetivo.</em></p>
          </div>
        </>
      )
    },
    {
      id: 'refinemos',
      title: 'Refinemos',
      icon: <IconPanelRefine />,
      content: (
        <>
          <div className="p-3 mb-3 rounded" style={{backgroundColor: `${slide9Colors.accent2}20`}}>
            <strong className="block mb-1" style={{color: slide9Colors.titleColor}}>Prompt:</strong>
            <p>Dame un ejemplo para crear un prompt muy preciso para pedirte la creación de textos de nivel B1 para estudiantes de lenguas extranjeras</p>
          </div>
          <div className="p-3 rounded" style={{backgroundColor: `${slide9Colors.accent1}15`}}>
            <strong className="block mb-1" style={{color: slide9Colors.titleColor}}>Respuesta:</strong>
            <p className="mb-2">¡Por supuesto! Aquí tienes otro ejemplo de prompt preciso para que yo pueda crear textos de nivel B1 para estudiantes de lenguas extranjeras:</p>
            <p className="mb-1"><strong>Tema:</strong> Turismo sostenible</p>
            <p className="mb-1"><strong>Nivel de dificultad:</strong> B1</p>
            <p className="mb-1"><strong>Longitud:</strong> 350 palabras</p>
            <p className="mb-1"><strong>Tono:</strong> Neutral</p>
            <p className="mb-2"><strong>Finalidad:</strong> Informar sobre el concepto de turismo sostenible y su importancia para el medio ambiente y las comunidades locales.</p>
            <p className="mt-2 mb-1"><strong>Ejemplo de prompt:</strong></p>
            <blockquote className="border-l-4 pl-3 italic my-1 text-base" style={{borderColor: slide9Colors.accent1, backgroundColor: `${slide9Colors.accent1}0A`, padding: '0.5rem'}}>
              "Escribe un texto de 350 palabras sobre el turismo sostenible, dirigido a estudiantes de lenguas extranjeras de nivel B1. El texto debe presentar información objetiva sobre el concepto de turismo sostenible, sus principios y su importancia para el medio ambiente y las comunidades locales. Utiliza un tono neutro y asegúrate de utilizar un lenguaje claro y fácil de entender. Incluye ejemplos concretos de iniciativas de turismo sostenible en diferentes partes del mundo. También asegúrate de enfatizar la importancia de apoyar el turismo sostenible como una forma de proteger el medio ambiente y promover el desarrollo sostenible de las comunidades locales. Recuerda que el objetivo del texto es informar sobre el tema y concienciar a los estudiantes sobre la importancia del turismo sostenible".
            </blockquote>
          </div>
        </>
      )
    },
    {
      id: 'esqueleto',
      title: 'El Esqueleto de un Buen Prompt',
      icon: <IconPanelStructure />,
      content: (
        <>
          <div className="p-3 rounded text-base whitespace-pre-line leading-relaxed" style={{backgroundColor: `${slide9Colors.accent1}10`, fontFamily: 'Spline Sans Mono Light, monospace'}}>
            {"Escribe un (correo, receta,entrada de blog...) de (número) palabras sobre el tema (tema) y con el título (título). Describe (descripción detallada). Asegúrate de incluir datos concretos sobre (datos concretos). Tu texto debe ser atractivo y accesible para un público general, pero también debe incluir vocabulario y estructuras gramaticales apropiados para un nivel (nivel MCER) de aprendizaje de idiomas. Utiliza la siguiente lista de palabras (lista) y haz que suene (amistoso, informativo, persuasivo, coloquial, neutral...). La finalidad del texto es (informar, persuadir, entretener o instruir)"}
          </div>
        </>
      )
    },
{
  id: 'vagancia',
  title: 'El Colmo de la Vagancia',
  icon: <IconPanelMagic />,
  content: (
     <>
      <div className="p-3 mb-3 rounded" style={{backgroundColor: `${slide9Colors.accent2}20`}}>
        <strong className="block mb-1" style={{color: slide9Colors.titleColor}}>Prompt:</strong>
        <p>Crea 5 ejemplos de prompt originales y atractivos a partir de la siguiente estructura: Escribe un (correo, receta,entrada de blog, artículo de periódico, etc.) de (número) palabras sobre el tema (tema) y con el título (título). Describe (descripción detallada). Asegúrate de incluir datos concretos sobre (datos concretos). Tu texto debe ser atractivo y accesible para un público general, pero también debe incluir vocabulario y estructuras gramaticales apropiados para un nivel B2 de aprendizaje de idiomas. Utiliza la siguiente lista de palabras (lista) y haz que suene (amistoso, informativo, persuasivo, coloquial, neutral...). La finalidad del texto es (informar, persuadir, entretener o instruir). Los ejemplos de prompts deben abordar los temas desde una perspectiva poco habitual, sorprendente y atractiva para el lector.</p>
      </div>
      <div className="p-3 rounded" style={{backgroundColor: `${slide9Colors.accent1}15`}}>
        <strong className="block mb-1" style={{color: slide9Colors.titleColor}}>Respuesta:</strong>
        <p>
          <a href="https://chatgpt.com/share/68345e2b-fee0-800d-a42a-aa68ccc80a82" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 font-semibold py-2 px-4 rounded-lg text-lg transition-transform hover:scale-105"
             style={{backgroundColor: slide9Colors.accent2, color: slide9Colors.titleColor}}>
            Ver en ChatGPT <IconLinkSimple className="w-4 h-4"/>
          </a>
        </p>
      </div>
    </>
  )
},
    {
      id: 'construccion',
      title: '¿Cómo se construye un buen prompt?',
      icon: <IconClipboardList />,
      content: (
        <>
          <p className="mb-2">Nunca olvidar: <strong style={{color: slide9Colors.accent1}}>NO HAY RECETAS MÁGICAS</strong>, y de muestra un botón: <em className="opacity-80">Noticia: ChatGPT se está volviendo vago</em></p>
          <p className="mb-3">...Pero todo lo siguiente ayuda, y mucho, a conseguir mejores resultados:</p>
          <ul className="space-y-3 text-base">
            {[
              { title: "Pídele que adopte un rol determinado:", text: "Ejemplo: actúa como un profesor de idiomas experto en.... (lo más detallado posible)" },
              { title: "Especifica las características/necesidades del destinatario:", text: "Nivel: estudiantes universitarios de nivel B1. Objetivo: El objetivos es que los alumnos aprendan el uso de cortesía del verbo..." },
              { title: "Especifica qué tipo de output quieres obtener:", text: "Formato: tabla, etc, ejemplo:  Longitud. Contenido: ¿qué quiero? Sé MUY específico y evita imprecisiones: Mal: Explica la formación del perfecto en alemán. Mantén la explicación corta, solo unas pocas frases. Bien: Explica la formación del perfecto en alemán en a un estudiante universitario de nivel A1 de alemán. A poder ser: darle un ejemplo de la respuesta que deseamos obtener. Ejemplo:  Te voy a proporcionar un el ejemplo de corrección de un texto de un alumno de nivel de B2.  No hagas nada todavía. Utilízalo como modelo del output que deseo." },
              { title: "Aportar textos de referencia con los que \"entrenar\" al sistema:", text: "Ejemplo: rúbricas, descriptores, claves de corrección" },
              { title: "Si queremos respuestas en negrita, cursiva, etc, dar la instrucción que de la respuesta formateada en \"markdown\".", text: "Ejemplo:  Crea un glosario y utiliza markdown para que los términos aparezcan en negrita y las definiciones en cursiva" },
            ].map((item, idx) => (
              <li key={idx} className="p-3 rounded-md" style={{backgroundColor: `${slide9Colors.accent1}0D`}}>
                <strong className="block mb-0.5" style={{color: slide9Colors.accent1}}>{item.title}</strong>
                {item.text}
              </li>
            ))}
          </ul>
        </>
      )
    }
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(135deg, ${slide9Colors.bgGradientFrom} 0%, ${slide9Colors.bgGradientTo} 100%)`,
        padding: '24px'
      }}
    >
      {/* Logo en esquina superior izquierda - Estilos de GlobalLogoConfig aplicados */}
      <div className={GlobalLogoConfig.position}>
        <img
          src="/hablandis.png"
          alt="Hablandis"
          className={GlobalLogoConfig.size} // Tamaño de GlobalLogoConfig
          style={{ filter: GlobalLogoConfig.shadow }} // Sombra de GlobalLogoConfig
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            if (img.parentElement) {
              img.style.display = 'none';
              img.parentElement.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: flex-start;">
                  <div style="font-family: 'Aglet Mono', monospace; color: ${slide9Colors.titleColor}; font-size: ${GlobalLogoConfig.fallbackFontSize}; font-weight: 700; line-height: 1;">Hablandis</div>
                  <div style="font-family: 'Raleway', sans-serif; color: ${slide9Colors.accent1}; font-size: 14px; margin-top: 2px; line-height: 1;">Centro internacional de idiomas</div>
                </div>
              `;
            }
          }}
        />
      </div>

      {/* Título centrado - Estilos de GlobalTitleConfig aplicados */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay:0.1 }}
        className="text-center mt-8 mb-6" // Espaciado local
      >
        <h1
          // Tamaños locales, peso y espaciado de GlobalTitleConfig
          className={`text-4xl sm:text-5xl lg:text-6xl ${GlobalTitleConfig.weight} mb-2`}
          style={{
            color: GlobalTitleConfig.color,
            fontFamily: GlobalTitleConfig.fontFamily
          }}
        >
          Secretos del Prompting
        </h1>
        <p
          // Tamaño local, peso y espaciado de GlobalSubtitleConfig
          className={`text-xl sm:text-2xl ${GlobalSubtitleConfig.spacing}`} // Añadido GlobalSubtitleConfig.spacing
          style={{
            color: GlobalSubtitleConfig.color, // Color del subtítulo de config
            fontFamily: GlobalSubtitleConfig.fontFamily,
            fontWeight: GlobalSubtitleConfig.weight
          }}
        >
          Claves para una comunicación eficaz con IA.
        </p>
      </motion.div>

      {/* Contenedor principal con flex-grow para usar todo el espacio disponible */}
      <main className="w-full max-w-[1400px] mx-auto flex flex-col flex-grow">
        {/* Paneles (5) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-4">
          {panelData.map((panel, index) => (
            <motion.button
              key={panel.id}
              onClick={() => setOpenPanelId(openPanelId === panel.id ? null : panel.id)}
              className={`p-3 rounded-lg shadow-md text-left w-full flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] transition-all duration-300 ease-in-out focus:outline-none relative group`}
              style={{
                backgroundColor: slide9Colors.panelBg,
                borderWidth: '2px',
                borderColor: openPanelId === panel.id ? slide9Colors.panelBorderActive : slide9Colors.panelBorder,
                color: slide9Colors.textColor,
              }}
              whileHover={{ y: -3, borderColor: slide9Colors.panelBorderActive, boxShadow: "0 5px 10px -3px rgba(0,0,0,0.07)" }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05, type: "spring", stiffness: 190, damping: 20 }}
            >
              {React.cloneElement(panel.icon as React.ReactElement<{ className?: string; style?: React.CSSProperties }>, {
                className: "w-7 h-7 sm:w-8 sm:h-8 mb-1 transition-colors duration-300",
                style: { color: openPanelId === panel.id ? slide9Colors.panelBorderActive : slide9Colors.textColor }
              })}
              <span
                className="text-xs sm:text-sm font-semibold text-center leading-tight transition-colors duration-300"
                style={{
                  fontFamily: 'Raleway SemiBold', // Manteniendo estilo local para botones de panel
                  color: openPanelId === panel.id ? slide9Colors.panelBorderActive : slide9Colors.textColor
                }}
              >
                {panel.title}
              </span>
              <motion.div
                className="absolute bottom-1.5 right-1.5 opacity-50 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: openPanelId === panel.id ? 180 : 0 }}
              >
                <IconChevronDown className="w-4 h-4" style={{color: openPanelId === panel.id ? slide9Colors.panelBorderActive : slide9Colors.textColor}} />
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Contenedor de contenido expandible que usa el espacio restante */}
        <AnimatePresence mode="wait">
          {openPanelId && panelData.find(p => p.id === openPanelId) && (
            <motion.div
              key={openPanelId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { height: {duration: 0.35, ease: "easeInOut"}, opacity: {duration: 0.25, delay: 0.1}} }}
              exit={{ opacity: 0, height: 0, transition: { height: {duration: 0.3, ease: "easeInOut"}, opacity: {duration: 0.2}} }}
              className="w-full flex-grow p-6 sm:p-8 rounded-xl shadow-xl overflow-auto bg-white border"
              style={{
                borderColor: slide9Colors.panelBorder,
                maxHeight: 'calc(100vh - 350px)'
              }}
            >
              <div className="leading-relaxed space-y-4 text-lg" style={{fontFamily: 'Raleway, Arial, sans-serif', color: slide9Colors.textColor}}>
                {panelData.find(p => p.id === openPanelId)?.content as React.ReactNode}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer - Estilos de GlobalFooterConfig aplicados */}
      <footer
        className={`${GlobalFooterConfig.position} ${GlobalFooterConfig.padding} text-center`}
        style={{
          background: GlobalFooterConfig.background,
          backdropFilter: GlobalFooterConfig.backdropFilter,
        }}
      >
        <p style={{
          fontFamily: GlobalFooterConfig.text.fontFamily,
          fontSize: GlobalFooterConfig.text.size,
          color: GlobalFooterConfig.text.color,
          opacity: GlobalFooterConfig.text.opacity,
          fontWeight: GlobalFooterConfig.text.weight
        }}>
          © {year} Hablandis. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 9
// =======================================================================


// =======================================================================
// DIAPOSITIVA 10: PROMPTS DIALÓGICOS (LAYOUT CORREGIDO)
// =======================================================================
const Diapositiva10 = () => {
  const [highlightedLetters, setHighlightedLetters] = useState<boolean>(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [showElements, setShowElements] = useState({
    logo: false,
    title: false,
    content: false, // Controla la aparición de ambas columnas principales
    phrase: false // Específico para la frase en la columna derecha
  });

  // Colores base del diseño unificado
  const colors = {
    azulOscuro: '#12055F',
    verdeTurquesa: '#007567',
    verdeOscuro: '#007567',
    blanco: '#FFFFFF',
    amarillo: '#FFC846',
    verdeClaro: '#C4D4A4'
  };

  // Configuración de Logo
  const LogoConfig = {
    size: 'h-24 md:h-32',
    position: 'absolute top-6 left-6 z-30',
    fallbackFontSize: '36px md:48px',
    shadow: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
  };

  // Configuración de Títulos
  const TitleConfig = {
    fontFamily: 'Aglet Mono, monospace',
    mainSize: 'text-3xl md:text-4xl lg:text-5xl',
    weight: 'font-semibold',
    color: colors.azulOscuro,
    spacing: 'mb-4 md:mb-6'
  };

  // Configuración de Subtítulos
  const SubtitleConfig = {
    fontFamily: 'Raleway, sans-serif',
    size: 'text-lg md:text-xl lg:text-2xl',
    weight: 'font-normal',
    color: colors.verdeTurquesa,
    spacing: 'mb-2'
  };

  // --- FooterConfig ELIMINADO ---
  // const FooterConfig = {
  //   padding: 'py-3',
  //   background: `${colors.blanco}70`,
  //   backdropFilter: 'backdrop-blur(10px)',
  //   text: {
  //     fontFamily: 'Raleway, sans-serif',
  //     size: '13px',
  //     color: colors.azulOscuro,
  //     opacity: '0.8',
  //     weight: '500'
  //   }
  // };

  // Componente Logo Unificado
  const LogoHablandis = ({ className = "" }: { className?: string }) => (
    <img 
      src="/hablandis.png" 
      alt="Hablandis" 
      className={`${LogoConfig.size} ${className}`}
      style={{ filter: LogoConfig.shadow }}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: ${LogoConfig.fallbackFontSize}; font-weight: 700; line-height: 1;">
              Hablandis
            </div>
            <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 14px; margin-top: 2px;">
              Centro Internacional de Idiomas
            </div>
          `;
        }
      }}
    />
  );

  // Componente Título Principal Unificado
  const MainTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h1 
      className={`${TitleConfig.mainSize} ${TitleConfig.weight} ${TitleConfig.spacing} ${className}`}
      style={{ 
        fontFamily: TitleConfig.fontFamily,
        color: TitleConfig.color
      }}
    >
      {children}
    </h1>
  );

  // Componente Subtítulo Unificado
  const Subtitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <p 
      className={`${SubtitleConfig.size} ${SubtitleConfig.weight} ${SubtitleConfig.spacing} ${className}`}
      style={{ 
        fontFamily: SubtitleConfig.fontFamily,
        color: SubtitleConfig.color
      }}
    >
      {children}
    </p>
  );

  // Animación de entrada secuencial
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({ ...prev, logo: true })), 100),
      setTimeout(() => setShowElements(prev => ({ ...prev, title: true })), 600),
      setTimeout(() => setShowElements(prev => ({ ...prev, content: true })), 1000),
      setTimeout(() => setShowElements(prev => ({ ...prev, phrase: true })), 1500) // Animación de la frase
    ];
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Activa el resaltado de letras después de que la frase aparezca
  useEffect(() => {
    if (showElements.phrase) {
      const timer = setTimeout(() => setHighlightedLetters(true), 500); // Pequeño retraso
      return () => clearTimeout(timer);
    }
  }, [showElements.phrase]);


  return (
    <div className="relative w-full h-screen overflow-hidden bg-white flex flex-col">
      {/* Gradiente suave de fondo */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, #FFC846 0%, #C4D4A4 100%)`,
        }}
      />
      {/* Logo Unificado */}
      <div className={LogoConfig.position}>
        <LogoHablandis />
      </div>
      {/* Título y Subtítulo - Sección superior (ocupa su espacio sin encogerse) */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ 
          opacity: showElements.title ? 1 : 0,
          y: showElements.title ? 0 : -30
        }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center pt-16 pb-8 relative z-10 flex-shrink-0" 
      >
        <MainTitle className="mb-2">
          Prompts dialógicos
        </MainTitle>
        <Subtitle>
          Construyendo conversaciones interactivas con IA
        </Subtitle>
      </motion.div>

      {/* CONTENEDOR PRINCIPAL DEL LAYOUT CENTRAL (ocupa el espacio restante verticalmente) */}
      {/* Es flex-col en móvil (apila las columnas) y flex-row en LG (columnas lado a lado) */}
      {/* Como el footer ya no existe, este contenedor ahora puede tomar todo el espacio vertical disponible */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 flex flex-col lg:flex-row gap-8 pb-8"> 
        
        {/* Columna izquierda: Contenido scrollable (ocupa todo el ancho en móvil, 2/3 en LG) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: showElements.content ? 1 : 0,
            scale: showElements.content ? 1 : 0.9
          }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full lg:w-2/3 flex flex-col min-h-0" 
        >
          {/* Este div es el que realmente tiene el scroll */}
          <div className="flex-1 overflow-y-auto custom-scrollbar"> 
            <div 
              className="rounded-3xl px-8 py-6"
              style={{ 
                backgroundColor: colors.blanco + '70',
                backdropFilter: 'blur(30px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
              }}
            >
              {/* Sección 1: Un asistente para mejorar nuestros prompts */}
              <div className="mb-6">
                <div 
                  className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedSection(expandedSection === 1 ? null : 1)}
                >
                  <h2 className="text-xl font-bold" style={{ color: colors.azulOscuro }}>
                    Un asistente para mejorar nuestros prompts:
                  </h2>
                  <svg 
                    className={`w-5 h-5 transition-transform ${expandedSection === 1 ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedSection === 1 && (
                  <div className="px-4 pb-4">
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto">
                      <p className="mb-2">I want you to become my Expert Prompt Creator. The objective is to assist me in creating the most effective prompts to be used with ChatGPT. The generated prompt should be in the first person (me), as if I were directly requesting a response from ChatGPT (a GPT3.5/GPT4 interface). Your response will be in the following format:</p>
                      <p className="mb-2">"<br/>
                      <strong>**Prompt:**</strong><br/>
                      {'>'}{`{Provide the best possible prompt according to my request. There are no restrictions to the length of the prompt. Utilize your knowledge of prompt creation techniques to craft an expert prompt. Don't assume any details, we'll add to the prompt as we go along. Frame the prompt as a request for a response from ChatGPT. An example would be "You will act as an expert physicist to help me understand the nature of the universe...". Make this section stand out using '>' Markdown formatting. Don't add additional quotation marks.}`}</p>
                      <p className="mb-2"><strong>**Possible Additions:**</strong><br/>
                      {`{Create three possible additions to incorporate directly in the prompt. These should be additions to expand the details of the prompt. Options will be very concise and listed using uppercase-alpha. Always update with new Additions after every response.}`}</p>
                      <p className="mb-2"><strong>**Questions:**</strong><br/>
                      {`{Frame three questions that seek additional information from me to further refine the prompt. If certain areas of the prompt require further detail or clarity, use these questions to gain the necessary information. I am not required to answer all questions.}`}<br/>
                      "</p>
                      <p className="mt-2">Instructions: After sections Prompt, Possible Additions, and Questions are generated, I will respond with my chosen additions and answers to the questions. Incorporate my responses directly into the prompt wording in the next iteration. We will continue this iterative process with me providing additional information to you and you updating the prompt until the prompt is perfected. Be thoughtful and imaginative while crafting the prompt. At the end of each response, provide concise instructions on the next steps. Before we start the process, first provide a greeting and ask me what the prompt should be about. Don't display the sections on this first response.</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Sección 2: ...Y esto es lo que hace */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.verdeOscuro }}>
                  ...Y esto es lo que hace:
                </h3>
                <a 
                  href="https://chatgpt.com/share/68346207-f50c-800d-81be-db8e27815a98" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: colors.amarillo + '30',
                    border: `2px solid ${colors.amarillo}`,
                    color: colors.azulOscuro
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Ver ejemplo en ChatGPT
                </a>
              </div>
              {/* Sección 3: Construyendo un chat "dialógico" */}
              <div className="mb-6">
                <div 
                  className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedSection(expandedSection === 3 ? null : 3)}
                >
                  <h2 className="text-xl font-bold" style={{ color: colors.azulOscuro }}>
                    Construyendo un chat "dialógico"
                  </h2>
                  <svg 
                    className={`w-5 h-5 transition-transform ${expandedSection === 3 ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedSection === 3 && (
                  <div className="px-4 pb-4">
                    <p className="mb-3 font-medium">Ejemplo: Prompt para creación de textos</p>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm max-h-96 overflow-y-auto">
                      <p>Actúa como un asistente especialista en redactar textos útiles, relevantes, vibrantes, interesantes y originales para el aprendizaje de lenguas extranjeras.</p>
                      <p>- Vas a preguntarme sucesivos datos antes de crear un texto. Espera SIEMPRE a mis respuestas antes de pasar a la siguiente pregunta.</p>
                      <p>- Sugiéreme varias lenguas y pregúntame la lengua en la que deseo el texto y espera a mi respuesta.</p>
                      <p>- Dame a elegir una amplia variedad de tipos de texto y pídeme que diga cuál deseo que crees. Espera a mi respuesta.</p>
                      <p>- Pregúntame qué nivel del MCERL debe tener el texto. Espera a mi respuesta.</p>
                      <p>- Pregúntame por la temática que debe tener el texto. Espera a mi respuesta.</p>
                      <p>- Pregúntame qué longitud debe tener el texto. Espera mi respuesta.</p>
                      <p>- Sugiéreme expresiones para que aparezcan en el texto acordes a la temática, tipo de texto y nivel. Espera mi respuesta.</p>
                      <p>- ...?</p>
                    </div>
                    <p className="mt-3 text-center italic text-gray-600">
                      ... a partir de aquí vuestra imaginación es el límite.
                    </p>
                  </div>
                )}
              </div>
              {/* Sección 4: Y si no sabemos lo que queremos */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.verdeOscuro }}>
                  Y si no sabemos lo que queremos... preguntemos.
                </h3>
                <a 
                  href="https://chatgpt.com/share/683467b4-db30-800d-8db3-e10a2397341d" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: colors.verdeClaro + '30',
                    border: `2px solid ${colors.verdeClaro}`,
                    color: colors.azulOscuro
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Ver chat de ejemplo
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Columna derecha: Contenido fijo (imagen y frase) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: showElements.content ? 1 : 0,
            x: showElements.content ? 0 : 50
          }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full lg:w-1/3 flex-shrink-0 flex flex-col gap-8 justify-start items-center" 
        >
          {/* Imagen */}
          <div 
            className="w-full rounded-2xl overflow-hidden shadow-2xl min-h-[300px] lg:min-h-[400px]" 
            style={{ 
              backgroundColor: colors.blanco + '50',
              border: `3px solid ${colors.amarillo}50`
            }}
          >
            <img
              src="/20231124_110650.jpg"
              alt="Estudiantes conversando en Hablandis"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Sección inferior con frase HABLANDIS (QR Eliminado) */}
          <div className="w-full">
            <div className="flex flex-col items-center justify-center">
              {/* Frase HABLANDIS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: showElements.phrase ? 1 : 0,
                  y: showElements.phrase ? 0 : 30
                }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="text-center max-w-2xl"
              >
                <h2 className="text-3xl mb-2">
                  <span 
                    className={`transition-all duration-700 ${
                      highlightedLetters ? 'font-black text-4xl' : 'font-normal'
                    }`}
                    style={{ color: highlightedLetters ? colors.azulOscuro : '#333' }}
                  >
                    Habla
                  </span>
                  <span className="font-normal text-gray-700">, </span>
                  <span 
                    className={`transition-all duration-700 ${
                      highlightedLetters ? 'font-black text-4xl' : 'font-normal'
                    }`}
                    style={{ color: highlightedLetters ? colors.azulOscuro : '#333' }}
                  >
                    n
                  </span>
                  <span className="font-normal text-gray-700">o te calles, </span>
                  <span 
                    className={`transition-all duration-700 ${
                      highlightedLetters ? 'font-black text-4xl' : 'font-normal'
                    }`}
                    style={{ color: highlightedLetters ? colors.azulOscuro : '#333' }}
                  >
                    di
                  </span>
                  <span className="font-normal text-gray-700"> lo que sientes, </span>
                  <span 
                    className={`transition-all duration-700 ${
                      highlightedLetters ? 'font-black text-4xl' : 'font-normal'
                    }`}
                    style={{ color: highlightedLetters ? colors.azulOscuro : '#333' }}
                  >
                    s
                  </span>
                  <span className="font-normal text-gray-700">é tú</span>
                </h2>
                <p className="text-lg italic text-gray-600">
                  En Hablandis, cada conversación es una oportunidad para ser tú mismo
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- Footer Unificado ELIMINADO --- */}
      {/* <div 
        className="flex-shrink-0" 
        style={{
          backgroundColor: FooterConfig.background,
          backdropFilter: FooterConfig.backdropFilter,
          padding: FooterConfig.padding
        }}
      >
        <p 
          className="text-center"
          style={{
            fontFamily: FooterConfig.text.fontFamily,
            fontSize: FooterConfig.text.size,
            color: FooterConfig.text.color,
            opacity: FooterConfig.text.opacity,
            fontWeight: FooterConfig.text.weight
          }}
        >
          © 2025 Hablandis. Centro Internacional de Idiomas. Todos los derechos reservados.
        </p>
      </div> */}
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 10 (LAYOUT CORREGIDO)
// =======================================================================

// =======================================================================
// DIAPOSITIVA 11: IA PARA DETERMINAR (Y ADAPTAR) EL NIVEL DE UN TEXTO
// Subtítulo implícito: Centralidad de Errores - El Mapa del Aprendizaje y Aplicaciones Prácticas
// =======================================================================

interface SvgIconProps {
  className?: string;
  style?: React.CSSProperties; 
}

const Diapositiva11 = () => {
  const [currentInstante, setCurrentInstante] = useState(1);
  const [activeLevel, setActiveLevel] = useState<string | null>('A1-A2');
  const [highlightedFactorInMap, setHighlightedFactorInMap] = useState<string | null>(null);
  const year = new Date().getFullYear();

  const hablandisColors = {
    verdeClaro: "#C4D4A4",
    azulOscuro: "#12055F",
    amarillo: "#FFC846",
    verdeTurquesa: "#007567",
    negro: "#000000",
    lila: "#B9ABE4",
  };

  const slideColors = {
    bgBase: '#F7F9FC',
    bgGradientEnd: '#EFF3F8',
    textPrimary: '#2A3B4D',
    textSecondary: '#6A7889',
    accent1: hablandisColors.azulOscuro,
    accent2: hablandisColors.verdeTurquesa,
    accent3: hablandisColors.amarillo,
    accent4: hablandisColors.lila,
    lineColor1: hablandisColors.lila,
    lineColor2: hablandisColors.verdeClaro,
    cardBg: '#FFFFFF',
    link: hablandisColors.verdeTurquesa,
  };

  // --- Iconos SVG ---
  const IconFrequencyBars = ({ className = "w-7 h-7", style }: SvgIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
  const IconImpact = ({ className = "w-7 h-7", style }: SvgIconProps) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>);
  const IconComplexity = ({ className = "w-7 h-7", style }: SvgIconProps) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.333.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
  const IconRelations = ({ className = "w-7 h-7", style }: SvgIconProps) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>);
  const IconDocumentText = ({ className = "w-7 h-7", style }: SvgIconProps) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>);
  const IconChatBubbleLeftRight = ({ className = "w-7 h-7", style }: SvgIconProps) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.697-3.697c-.02.002-.039.005-.058.007H9.486c-1.136 0-2.097-.847-2.193-1.98A18.75 18.75 0 016.75 12.25c0-1.136.847-2.097 1.98-2.193.34-.027.68-.052 1.02-.072V6.75A2.25 2.25 0 0112 4.5h3.879a2.25 2.25 0 012.121 1.608M12 6.75v2.25m0 0H8.25m3.75 0M12 11.25V9m0 2.25H8.25m3.75 0a2.25 2.25 0 012.25 2.25M15 11.25h2.25" /></svg>);
  const IconExternalLink = ({ className = "w-4 h-4 ml-1", style }: SvgIconProps) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} style={style}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>);
  const IconArrowsRightLeft = ({ className = "w-7 h-7", style }: SvgIconProps) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18M16.5 3L21 7.5m0 0L16.5 12M21 7.5H3" /></svg>);

  // --------------------------------------------------------------------
  // PUNTO CRÍTICO 1: ¿Están 'factors' y 'levelsData' definidos con datos REALES?
  const factors = [
    { id: 'freq', name: 'Frecuencia', description: 'Errores que aparecen muy a menudo y afectan a muchas partes del discurso.', example: 'Ej: Uso incorrecto de ser/estar en niveles iniciales.', icon: IconFrequencyBars, color: hablandisColors.azulOscuro },
    { id: 'impact', name: 'Impacto Comunicativo', description: 'Errores que, aunque no sean frecuentes, pueden llevar a malentendidos graves o impedir la comunicación.', example: 'Ej: Confundir tiempos verbales clave en una narración.', icon: IconImpact, color: hablandisColors.verdeTurquesa },
    { id: 'complex', name: 'Complejidad Estructural', description: 'Errores relacionados con estructuras gramaticales complejas cuya corrección desbloquea un entendimiento más profundo.', example: 'Ej: Dificultades con el subjuntivo o la voz pasiva.', icon: IconComplexity, color: hablandisColors.amarillo },
    { id: 'relations', name: 'Relaciones Sistémicas', description: 'Errores que indican una falta de comprensión de cómo diferentes partes del sistema lingüístico se interconectan.', example: 'Ej: Falta de concordancia entre sujeto y verbo, o género y número.', icon: IconRelations, color: hablandisColors.lila },
  ];

  const levelsData = [
    { id: 'A1-A2', name: 'Nivel A1-A2 (Básico)', error: 'Concordancia de género y número (artículos, sustantivos, adjetivos).', details: 'Este error es fundamental porque afecta la estructura básica de la frase y es muy frecuente. Su corrección mejora drásticamente la claridad.', color: hablandisColors.verdeClaro },
    { id: 'B1-B2', name: 'Nivel B1-B2 (Intermedio)', error: 'Uso incorrecto del Subjuntivo vs. Indicativo.', details: 'A medida que los estudiantes expresan opiniones, deseos o hipótesis, el dominio del subjuntivo se vuelve crucial para la precisión y naturalidad.', color: hablandisColors.amarillo },
    { id: 'C1-C2', name: 'Nivel C1-C2 (Avanzado)', error: 'Matices en el uso de preposiciones y conectores discursivos complejos.', details: 'En niveles avanzados, la precisión en la elección de preposiciones y el uso sofisticado de conectores afinan el discurso y demuestran un dominio nativo.', color: hablandisColors.lila },
  ];
  // --------------------------------------------------------------------


  const MetroNode = ({ instante, id, x, y, label, icon: IconComponent, size = 12, color = slideColors.textSecondary, pulse = false, labelPosition = "right" }: any) => ( <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: instante >= id ? 1 : 0.3, scale: instante >= id ? 1 : 0.8 }} transition={{ duration: 0.5, delay: id * 0.1 }} > <motion.circle cx={x} cy={y} r={size} fill={color} stroke={slideColors.bgBase} strokeWidth="1.5" animate={{ scale: pulse ? [1, 1.1, 1] : 1 }} transition={pulse ? { duration: 1.2, repeat: Infinity, ease:"easeInOut" } : {}} /> {IconComponent && instante >= id && ( <foreignObject x={x - size*0.7} y={y - size*0.7} width={size*1.4} height={size*1.4}> <div className="flex items-center justify-center w-full h-full"> <IconComponent className={`w-[${Math.floor(size*0.8)}px] h-[${Math.floor(size*0.8)}px]`} style={{ color: slideColors.bgBase}} /> </div> </foreignObject> )} {label && instante >= id && ( <text x={labelPosition === "right" ? x + size + 5 : (labelPosition === "left" ? x - size - 5 : x)} y={labelPosition === "bottom" ? y + size + 14 : (labelPosition === "top" ? y - size - 8 : y + size/2.5)} fontSize="12px" fill={slideColors.textPrimary} style={{fontFamily: 'Raleway SemiBold, sans-serif'}} textAnchor={labelPosition === "left" ? "end" : (labelPosition === "middle" || labelPosition === "bottom" || labelPosition === "top" ? "middle" : "start")} > {label} </text> )} </motion.g>);
  const MetroLine = ({ instante, id, d, color = slideColors.textSecondary, strokeWidth = 2.5 }: any) => ( <motion.path d={d} stroke={color} strokeWidth={strokeWidth} fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: instante >= id ? 1 : 0, opacity: instante >= id ? 1 : 0.3 }} transition={{ duration: 0.8, delay: id * 0.2, ease: "easeInOut" }} />);

  const InfoCard = ({icon, title, link, linkText, link2, linkText2, description, items, accentColor, delay = 0}: any) => (
    <motion.div
      className="p-5 rounded-xl shadow-lg flex flex-col mb-6 w-full"
      style={{ backgroundColor: slideColors.cardBg, borderLeft: `4px solid ${accentColor}`}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center mb-3">
        {icon && React.createElement(icon, { className: "w-8 h-8 mr-3 flex-shrink-0", style: { color: accentColor }})}
        <h3 className="text-lg md:text-xl font-semibold" style={{ fontFamily: 'Raleway SemiBold, sans-serif', color: slideColors.textPrimary }}>
          {title}
        </h3>
      </div>
      {link && linkText && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm inline-flex items-center font-medium mb-1 hover:underline break-all"
          style={{ color: slideColors.link }}
        >
          {linkText} <IconExternalLink />
        </a>
      )}
      {link2 && linkText2 && (
        <a
          href={link2}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm inline-flex items-center font-medium mb-2 hover:underline break-all"
          style={{ color: slideColors.link }}
        >
          {linkText2} <IconExternalLink />
        </a>
      )}
      {description &&
        <p className="text-sm mt-1" style={{ fontFamily: 'Raleway, sans-serif', color: slideColors.textSecondary }}>
          {description}
        </p>
      }
      {items && (
        <ul className="list-decimal list-inside space-y-1 text-sm mt-2 pl-2" style={{ fontFamily: 'Raleway, sans-serif', color: slideColors.textSecondary }}>
          {items.map((item: string, index: number) => <li key={index} className="mb-1">{item}</li>)}
        </ul>
      )}
    </motion.div>
  );


  const renderInstanteContent = () => {
    const instanteBaseDelay = 0.1;

    switch (currentInstante) {
      case 1:
        return ( <motion.div key="inst1" initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} exit={{ opacity: 0, y:-20 }} className="text-center flex flex-col items-center h-full justify-center"> <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'Raleway Bold, sans-serif', color: slideColors.textPrimary }}> El Viaje del Aprendizaje: </h2> <h3 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: 'Aglet Mono Light, monospace', color: slideColors.accent1 }}> ¿Todos los Errores Pesan Igual? </h3> <p className="text-md md:text-lg mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Raleway, sans-serif', color: slideColors.textSecondary }}> En el aprendizaje de idiomas, no todos los errores tienen el mismo peso. Aquí es donde entra en juego el concepto de <strong style={{color: slideColors.accent1}}>Centralidad de Errores</strong>. Imagina que los errores gramaticales son como estaciones de metro en una gran ciudad: algunas son simples paradas, mientras que otras son <strong style={{color: slideColors.accent2}}>nodos vitales</strong> que conectan múltiples líneas y cuyo correcto funcionamiento es crucial para todo el sistema comunicativo. </p> <div className="w-full h-60 md:h-72 flex items-center justify-center"> <svg viewBox="0 0 250 120" className="w-full max-w-lg h-auto"> <MetroNode instante={currentInstante} id={1} x={40} y={60} size={12} color={slideColors.accent1} pulse label="Error Clave"/> <MetroNode instante={currentInstante} id={1.1} x={100} y={30} size={9} color={slideColors.textSecondary} label="Error Menor"/> <MetroNode instante={currentInstante} id={1.2} x={120} y={90} size={9} color={slideColors.textSecondary} label="Otro Error"/> <MetroNode instante={currentInstante} id={1.3} x={180} y={50} size={12} color={slideColors.accent2} pulse label="Error Central"/> <MetroNode instante={currentInstante} id={1.4} x={220} y={80} size={9} color={slideColors.textSecondary} label="Detalle"/> <MetroLine instante={currentInstante} id={1} d="M40 60 Q 70 45, 100 30" color={slideColors.lineColor1} /> <MetroLine instante={currentInstante} id={1.1} d="M40 60 Q 80 75, 120 90" color={slideColors.lineColor1} /> <MetroLine instante={currentInstante} id={1.2} d="M100 30 L 180 50" color={slideColors.lineColor2} /> <MetroLine instante={currentInstante} id={1.3} d="M120 90 L 180 50" color={slideColors.lineColor2} /> <MetroLine instante={currentInstante} id={1.4} d="M180 50 L 220 80" color={slideColors.lineColor2} /> </svg> </div> <p className="text-md md:text-lg mt-6 max-w-2xl mx-auto" style={{ fontFamily: 'Raleway, sans-serif', color: slideColors.textSecondary }}> Comprender la <strong style={{color: slideColors.accent1}}>centralidad</strong> nos permite identificar qué "estaciones" (errores) son prioritarias para asegurar un viaje de aprendizaje más eficiente y efectivo. </p> </motion.div>);

      case 2:
        const factorNodePositions = [ { data: factors[0], x: 125, y: 45 }, { data: factors[1], x: 205, y: 100 }, { data: factors[3], x: 125, y: 155 }, { data: factors[2], x: 45,  y: 100 }, ];
        return ( <motion.div key="inst2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col h-full"> <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ fontFamily: 'Aglet Mono Light, monospace', color: slideColors.textPrimary }}>Factores de Centralidad</h2> <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6"> {factors.map((factor, idx) => ( <motion.div key={factor.id} className="p-5 rounded-xl border-l-4 flex flex-col" style={{ borderColor: factor.color, backgroundColor: slideColors.bgGradientEnd, boxShadow: '0 4px 15px rgba(0,0,0,0.07)' }} initial={{opacity:0, x: idx % 2 === 0 ? -20 : 20, y:10}} animate={{opacity:1, x:0, y:0}} transition={{delay: idx * 0.15, duration:0.4}} > <div className="flex items-center mb-3"> 
          <factor.icon className="w-8 h-8 mr-3 flex-shrink-0" style={{color: factor.color}}/> 
          <h3 className="text-xl font-semibold" style={{ fontFamily: 'Raleway SemiBold, sans-serif', color: slideColors.textPrimary }}>{factor.name}</h3> </div> <p className="text-sm mb-2 flex-grow" style={{color: slideColors.textSecondary}}>{factor.description}</p> <p className="text-xs italic font-medium" style={{color: factor.color}}>{factor.example}</p> </motion.div> ))} </div> <div className="w-full h-60 md:h-72 flex items-center justify-center mt-4 mb-2 flex-grow"> <svg viewBox="0 0 250 200" className="w-full max-w-lg h-auto"> {highlightedFactorInMap && factorNodePositions.map(targetPos => { if (targetPos.data.id === highlightedFactorInMap) return null;  const sourcePos = factorNodePositions.find(p => p.data.id === highlightedFactorInMap); if (!sourcePos) return null; return ( <motion.line key={`line-${sourcePos.data.id}-${targetPos.data.id}`} x1={sourcePos.x} y1={sourcePos.y} x2={targetPos.x} y2={targetPos.y} stroke={slideColors.textSecondary} strokeWidth="1.5" initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 0.4, pathLength: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} /> ); })} {factorNodePositions.map(({ data, x, y }) => ( <motion.g key={data.id} onClick={() => setHighlightedFactorInMap(highlightedFactorInMap === data.id ? null : data.id)} style={{ cursor: 'pointer' }} initial={{ scale: 0.9, opacity: 0.7 }} animate={{  scale: highlightedFactorInMap === data.id ? 1.15 : 0.9,  opacity: highlightedFactorInMap === data.id ? 1 : (highlightedFactorInMap ? 0.5 : 0.7)  }} whileHover={{ scale: highlightedFactorInMap === data.id ? 1.2 : 1.0 }} transition={{ duration: 0.25, ease: "circOut" }} > <circle cx={x} cy={y} r="24"  fill={data.color} stroke={highlightedFactorInMap === data.id ? data.color : slideColors.bgGradientEnd}  strokeWidth={highlightedFactorInMap === data.id ? 3 : 2} /> <foreignObject x={x - 12} y={y - 12} width="24" height="24"> <div className="flex items-center justify-center w-full h-full"> 
          <data.icon  className="w-[18px] h-[18px]" style={{ color: slideColors.bgBase }}  /> 
          </div> </foreignObject> <text  x={x} y={y + 38}  fontSize="11"  textAnchor="middle"  fill={highlightedFactorInMap === data.id ? data.color : slideColors.textSecondary} style={{fontFamily: 'Raleway Bold, sans-serif', fontWeight: highlightedFactorInMap === data.id ? 700 : 500}} > {data.name} </text> </motion.g> ))} </svg> </div> </motion.div>);

      case 3:
        const selectedLevelData = levelsData.find(l => l.id === activeLevel);
        const levelNodesForDisplay = [ { ...levelsData[0], x: 75, y: 50 }, { ...levelsData[1], x: 150, y: 50 }, { ...levelsData[2], x: 225, y: 50 }, ];
        return (  <motion.div key="inst3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col h-full"> <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ fontFamily: 'Aglet Mono Light, monospace', color: slideColors.textPrimary }}>Errores Centrales por Nivel</h2> <div className="flex justify-center mb-6 space-x-2 md:space-x-3"> {levelsData.map(level => (
          <button key={level.id} onClick={() => setActiveLevel(level.id)} className={`py-2.5 px-4 md:px-6 rounded-lg text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${activeLevel === level.id ? 'font-semibold shadow-xl scale-105' : 'opacity-80 hover:opacity-100 shadow-md'}`} 
            // CORREGIDO: No pongas '--tw-ring-color' en style.
            style={{ 
              backgroundColor: activeLevel === level.id ? level.color : `${level.color}55`, 
              color: activeLevel === level.id ? (['B1-B2', 'A1-A2'].includes(level.id) ? slideColors.textPrimary : '#fff') : slideColors.textPrimary, 
              fontFamily:'Raleway SemiBold, sans-serif'
            }} 
          > 
            {level.id} 
          </button>
        ))} </div> {selectedLevelData && ( <motion.div key={activeLevel} initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} transition={{duration:0.4}} className="p-6 md:p-8 rounded-xl shadow-lg text-center mb-8 mx-auto w-full max-w-xl lg:max-w-2xl" style={{backgroundColor: `${selectedLevelData.color}20`}} > <h3 className="text-xl md:text-2xl font-semibold mb-3" style={{fontFamily: 'Raleway Bold, sans-serif', color: slideColors.textPrimary}}>{selectedLevelData.name}</h3> <p className="text-md md:text-lg mb-2" style={{color: slideColors.accent1}}> <strong>Error Central:</strong> {selectedLevelData.error} </p> <p className="text-sm md:text-base" style={{color: slideColors.textSecondary}}>{selectedLevelData.details}</p> </motion.div> )} <div className="w-full h-48 md:h-56 flex items-center justify-center mt-auto mb-4 flex-grow"> <svg viewBox="0 0 300 100" className="w-full max-w-xl h-auto"> <path d={`M ${levelNodesForDisplay[0].x} ${levelNodesForDisplay[0].y} L ${levelNodesForDisplay[1].x} ${levelNodesForDisplay[1].y} L ${levelNodesForDisplay[2].x} ${levelNodesForDisplay[2].y}`} stroke={slideColors.textSecondary} strokeWidth="3.5" fill="none" /> {levelNodesForDisplay.map((nodeData, index) => ( <MetroNode key={`node-${nodeData.id}`} instante={currentInstante} id={3 + (index * 0.1)} x={nodeData.x} y={nodeData.y} size={activeLevel === nodeData.id ? 16 : 11} color={nodeData.color} pulse={activeLevel === nodeData.id}
                           label={null} 
                            /> ))} </svg> </div> </motion.div>);

      case 4:
        return ( <motion.div key="inst4" initial={{ opacity: 0, scale:0.9 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.9 }} className="text-center flex flex-col items-center h-full justify-center"> <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Aglet Mono Light, monospace', color: slideColors.textPrimary }}>Restaurando el Flujo Comunicativo</h2> <div className="w-full h-60 md:h-72 flex items-center justify-center mb-8"> <svg viewBox="0 0 250 120" className="w-full max-w-lg h-auto"> <MetroNode instante={currentInstante} id={4} x={40} y={60} size={12} color={slideColors.accent1} pulse/> <MetroNode instante={currentInstante} id={4.1} x={100} y={30} size={9} color={hablandisColors.verdeTurquesa}/> <MetroNode instante={currentInstante} id={4.2} x={120} y={90} size={9} color={hablandisColors.verdeTurquesa}/> <MetroNode instante={currentInstante} id={4.3} x={180} y={50} size={12} color={slideColors.accent2} pulse/> <MetroNode instante={currentInstante} id={4.4} x={220} y={80} size={9} color={hablandisColors.verdeTurquesa}/> <MetroLine instante={currentInstante} id={4} d="M40 60 Q 70 45, 100 30" color={slideColors.lineColor1} strokeWidth={4}/> <MetroLine instante={currentInstante} id={4.1} d="M40 60 Q 80 75, 120 90" color={slideColors.lineColor1} strokeWidth={4}/> <MetroLine instante={currentInstante} id={4.2} d="M100 30 L 180 50" color={slideColors.lineColor2} strokeWidth={4}/> <MetroLine instante={currentInstante} id={4.3} d="M120 90 L 180 50" color={slideColors.lineColor2} strokeWidth={4}/> <MetroLine instante={currentInstante} id={4.4} d="M180 50 L 220 80" color={slideColors.lineColor2} strokeWidth={4}/> </svg> </div> <p className="text-lg md:text-xl max-w-3xl mx-auto p-6 rounded-xl shadow-lg" style={{ fontFamily: 'Raleway, sans-serif', color: slideColors.textPrimary, backgroundColor: slideColors.bgGradientEnd, borderLeft: `5px solid ${slideColors.accent1}` }}> "Corregir un error central es como reparar las vías del metro en hora punta: requiere paciencia, pero <strong style={{color: slideColors.accent1}}>restaura el flujo comunicativo</strong>." </p> </motion.div>);

      case 5:
        return (
          <motion.div key="inst5" initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} className="w-full flex flex-col h-full items-center justify-center px-4 md:max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ fontFamily: 'Aglet Mono Light, monospace', color: slideColors.textPrimary }}>
              Determinar Nivel y Adaptar Texto
            </h2>
            <InfoCard
              icon={IconDocumentText}
              title="Texto:"
              link="https://hablacultura.com/cultura-textos-aprender-espanol/cultura/titirimundi/"
              linkText="Titirimundi"
              accentColor={slideColors.accent1}
              delay={instanteBaseDelay}
            />
            <InfoCard
              icon={IconDocumentText}
              title="Texto original (BBC):"
              link="https://www.bbc.com/mundo/articles/cnvqrz6yzzmo"
              linkText="La felicidad"
              accentColor={slideColors.accent1}
              delay={instanteBaseDelay + 0.1}
            />
            <InfoCard
              icon={IconChatBubbleLeftRight}
              title="Evaluación del nivel y adaptación del texto:"
              link2="https://chatgpt.com/share/68346ccf-98f0-800d-851c-8e0426dfd621" 
              linkText2="Transcripción de la conversación con ChatGPT" 
              accentColor={slideColors.accent2}
              delay={instanteBaseDelay + 0.2}
            />
          </motion.div>
        );

      case 6:
        return (
          <motion.div key="inst6" initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} className="w-full flex flex-col h-full items-center justify-center px-4 md:max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ fontFamily: 'Aglet Mono Light, monospace', color: slideColors.textPrimary }}>
              Y no tenemos por qué aceptar todos los cambios...
            </h2>
            <InfoCard
              icon={IconArrowsRightLeft}
              title="Elijamos los cambios que queramos mantener de forma sencilla:"
              link="https://text-compare.com/es/"
              linkText="Text Compare - Herramienta de comparación"
              items={[
                "Creemos dos documentos: \"tiempo libre (original)\" y \"tiempo libre (adaptado)\" y peguemos en ellos los textos respectivos.",
                "Nos situamos en el texto original, y en el menú \"herramientas\" elegimos \"comparar\".",
                "Elegimos ahora el texto simplificado.",
                "Se genera una versión mixta en la que podemos aceptar o rechazar cada uno de los cambios aceptando o rechazando sugerencias."
              ]}
              accentColor={slideColors.accent4}
              delay={instanteBaseDelay}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen w-screen relative overflow-hidden flex flex-col items-center p-6 md:p-8"
      style={{ background: `linear-gradient(135deg, ${slideColors.bgBase} 0%, ${slideColors.bgGradientEnd} 100%)` }}
    >
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30">
        <img
          src="/hablandis.png"
          alt="Hablandis Logo"
          className="h-32 md:h-40 w-auto"
          onError={(e) => { const img = e.target as HTMLImageElement; img.style.display = 'none'; img.parentElement!.innerHTML = `<div style="font-family: 'Aglet Mono Light', monospace; color: ${slideColors.accent1}; font-size: 72px; font-weight: 700;">Hablandis</div>`; }}
        />
      </div>

      <motion.h1
        initial={{opacity:0, y: -20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}
        className="text-2xl md:text-3xl font-semibold mt-4 md:mt-2 mb-6 md:mb-8 text-center w-full max-w-5xl z-10"
        style={{fontFamily: 'Aglet Mono Light, monospace', color: slideColors.textPrimary}}
      >
        IA para determinar (y adaptar) el nivel de un texto
      </motion.h1>

      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-5xl z-10 mb-4">
        <AnimatePresence mode="wait">
          {renderInstanteContent()}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-5xl z-20 mt-auto">
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() => setCurrentInstante(prev => Math.max(1, prev - 1))}
            disabled={currentInstante === 1}
            className="py-2.5 px-6 rounded-lg text-sm md:text-base disabled:opacity-40 transition-all duration-200 transform hover:scale-105"
            style={{ fontFamily: 'Raleway SemiBold', backgroundColor: slideColors.accent2, color: 'white' }}
          >
            Anterior
          </button>
          <div className="flex space-x-1.5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <button
                key={i}
                onClick={() => setCurrentInstante(i)}
                className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300 ${currentInstante === i ? 'ring-2 ring-offset-2 scale-110' : 'opacity-60 hover:opacity-100'}`}
                // CORREGIDO: No pongas '--tw-ring-color' en style.
                style={{ 
                  backgroundColor: currentInstante === i ? slideColors.accent1 : slideColors.textSecondary
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentInstante(prev => Math.min(6, prev + 1))}
            disabled={currentInstante === 6}
            className="py-2.5 px-6 rounded-lg text-sm md:text-base disabled:opacity-40 transition-all duration-200 transform hover:scale-105"
            style={{ fontFamily: 'Raleway SemiBold', backgroundColor: slideColors.accent1, color: 'white' }}
          >
            Siguiente
          </button>
        </div>
        <p className="text-center mt-6 text-xs" style={{ fontFamily: 'Raleway, sans-serif', color: slideColors.textSecondary, opacity: 0.7 }}>
          © {year} Hablandis. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 11
// =======================================================================

// =======================================================================
// DIAPOSITIVA 12: CREACIÓN DE TAREAS DE IA - PROMPTS (DISEÑO UNIFICADO)
// =======================================================================

const Diapositiva12 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Logo y Título unificados ---
  const LogoHablandisUnificado = () => (
    <div className="absolute top-6 left-6 z-30 flex flex-col items-start">
      <img
        src="/hablandis.png"
        alt="Hablandis"
        className="h-24 md:h-32 lg:h-36 drop-shadow-[0_4px_8px_rgba(0,0,0,0.10)] rounded-xl" // <--- FONDO ELIMINADO
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = 'none';
          const parent = img.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 42px; font-weight: 700; line-height: 1;">
                Hablandis
              </div>
              <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 15px; margin-top: 2px;">
                Centro Internacional de Idiomas
              </div>
            `;
          }
        }}
      />
    </div>
  );

  const MainTitleUnificado = ({ children }: { children: React.ReactNode }) => (
    <h1
      className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-center pt-12"
      style={{
        fontFamily: "Aglet Mono, monospace",
        color: colors.azulOscuro,
        letterSpacing: "-0.01em"
      }}
    >
      {children}
    </h1>
  );

  // --- Footer unificado minimalista ---
  const FooterUnificado = () => (
    <div
      className="absolute bottom-3 left-0 right-0 text-center py-2"
      style={{
        fontFamily: 'Raleway, sans-serif',
        color: colors.azulOscuro,
        opacity: 0.7,
        fontWeight: 500,
        fontSize: 13,
        background: `${colors.blanco}70`,
        backdropFilter: 'blur(10px)'
      }}
    >
      © {new Date().getFullYear()} Hablandis. Todos los derechos reservados.
    </div>
  );

  // --- Slides Content ---
  const slides = [
    {
      id: 0,
      title: "Elijamos un texto:",
      content: (
        <div className="h-full overflow-y-auto p-1">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <header className="mb-8 border-b-2 border-gray-200 pb-5">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.verdeTurquesa, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.03em' }}>
                MOVILIDAD
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Aglet Mono', monospace", color: colors.azulOscuro }}>
                Movilidad en València o la transformación de una ciudad más allá de los carriles bici
              </h2>
              <p className="text-base text-gray-600" style={{ fontFamily: "'Raleway', sans-serif" }}>
                La nueva Plaça de la Reina, los carriles bici y la recuperación del espacio público marcan el camino hacia una ciudad más sostenible
              </p>
            </header>
            <div className="prose prose-lg max-w-none" style={{ fontFamily: "'Raleway', sans-serif" }}>
              <p className="mb-6 text-gray-800 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                La nueva Plaça de la Reina amanece soleada: eran los últimos días de agosto pero el reloj marcaba primera hora de la mañana, así que aún quedaba espacio en los recién estrenados aparcamientos de bicicleta. Un par de horas después empezó el trajín: familias con carritos que atraviesan las zonas de sombra mientras beben horchata, niños y niñas que se inclinan a beber agua en alguna de las fuentes habilitadas para tal fin, jóvenes que se sientan en los bancos y consultan sus dispositivos móviles, turistas que consumen en las terrazas que rodean el nuevo espacio público sin invadirlo.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-lg">
                <p className="text-base italic">
                  "La afluencia de gente que concentra la plaza desde su inauguración es la mejor muestra de que la transformación ha sido bien acogida"
                </p>
                <p className="text-xs mt-2 text-gray-600">— Giuseppe Grezzi, concejal de Movilidad Sostenible</p>
              </div>
              <h3 className="text-xl font-bold mt-8 mb-3" style={{ color: colors.verdeTurquesa }}>
                Más allá de la peatonalización: la revuelta ciclista
              </h3>
              <p className="mb-6 text-gray-800 leading-relaxed">
                La Organización de Consumidores determinó en un reciente estudio que València era una de las tres mejores ciudades españolas para montar en bicicleta. En determinados tramos de su red de casi 170 kilómetros se registran unos 7.000 vehículos diarios, y el uso de este medio de transporte sostenible se ha incrementado en un 21% en el último año.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-green-100 p-4 rounded-lg text-center border border-green-200">
                  <p className="text-2xl font-bold text-green-700">170 km</p>
                  <p className="text-xs text-gray-700">Red ciclista actual</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center border border-green-200">
                  <p className="text-2xl font-bold text-green-700">+21%</p>
                  <p className="text-xs text-gray-700">Incremento anual</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center border border-green-200">
                  <p className="text-2xl font-bold text-green-700">11%</p>
                  <p className="text-xs text-gray-700">Ahorro energético</p>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-8 mb-3" style={{ color: colors.verdeTurquesa }}>
                Urbanismo, la otra cara de la moneda
              </h3>
              <p className="mb-6 text-gray-800 leading-relaxed">
                A pesar de que los índices contaminantes se han reducido en los últimos diez años en la ciudad, València sigue incumpliendo los valores de la Organización Mundial de la Salud. El vehículo a motor de combustión es, con diferencia, el principal foco de emisión de índices contaminantes.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-5 my-6">
                <h4 className="font-bold text-base mb-2">Datos clave:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
                  <li>50% de los desplazamientos se hacen a pie</li>
                  <li>6% en bicicleta</li>
                  <li>16% en transporte público</li>
                  <li>Solo 15% utiliza vehículo privado dentro de la ciudad</li>
                </ul>
              </div>
              <p className="mb-6 text-gray-800 leading-relaxed">
                El problema metropolitano es evidente: cada día salen y entran de Valencia casi un millón de personas. La coordinación entre administraciones sigue siendo un reto pendiente para abordar esta realidad.
              </p>
              <div className="border-t border-gray-200 pt-6 mt-8">
                <p className="text-xs text-gray-600 italic">
                  Fuente: El Salto Diario - Artículo sobre movilidad sostenible en València
                </p>
              </div>
            </div>
          </article>
        </div>
      )
    },
    {
      id: 1,
      title: "Usemos un prompt 'mínimo':",
      content: (
        <div className="h-full flex flex-col p-4 sm:p-6 bg-gray-50 rounded-lg">
          <div className="mb-5 p-4 bg-white rounded-lg border-l-4 border-blue-600 shadow-sm">
            <p className="text-sm sm:text-base font-mono text-gray-800">
              Crea siete preguntas tipo test sobre el texto. Cada pregunta debe tener una respuesta correcta y tres incorrectas, con el siguiente formato: 
              Texto de la pregunta A. Respuesta correcta B. Respuesta incorrecta C. Respuesta incorrecta D. Respuesta incorrecta
            </p>
          </div>
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
            {/* ChatGPT 4o */}
            <div className="flex flex-col bg-green-50 rounded-lg p-2 sm:p-3 border border-green-200 overflow-y-auto">
              <h4 className="text-base sm:text-lg font-bold mb-2 text-green-800 sticky top-0 bg-green-50 pb-2 z-10">
                ChatGPT 4o
              </h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-white p-2 rounded border border-green-100">
                  <p className="font-semibold mb-1">¿Qué ha sido una de las principales líneas de trabajo del Ayuntamiento de València en los últimos años?</p>
                  <p className="text-green-700">A. Peatonalización</p>
                  <p>B. Construcción de rascacielos</p>
                  <p>C. Expansión de autopistas</p>
                  <p>D. Reducción de parques públicos</p>
                </div>
                <div className="bg-white p-2 rounded border border-green-100">
                  <p className="font-semibold mb-1">Según Francesc Arechavala, ¿cuál es el siguiente paso en la mejora de la movilidad urbana en València?</p>
                  <p className="text-green-700">A. Extender las políticas a todos los barrios</p>
                  <p>B. Construir más autopistas</p>
                  <p>C. Aumentar el uso de vehículos privados</p>
                  <p>D. Reducir el número de ciclovías</p>
                </div>
              </div>
            </div>
            {/* Gemini */}
            <div className="flex flex-col bg-purple-50 rounded-lg p-2 sm:p-3 border border-purple-200 overflow-y-auto">
              <h4 className="text-base sm:text-lg font-bold mb-2 text-purple-800 sticky top-0 bg-purple-50 pb-2 z-10">
                Gemini
              </h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-white p-2 rounded border border-purple-100">
                  <p className="font-semibold mb-1">¿Cuáles son las dos principales líneas de trabajo que ha seguido el Ayuntamiento de València para reducir la contaminación en la ciudad?</p>
                  <p>A. La construcción de nuevas carreteras y la ampliación de carriles para coches.</p>
                  <p className="text-purple-700">B. La peatonalización de calles y la mejora de la red de carriles bici.</p>
                  <p>C. La creación de nuevas zonas de aparcamiento para coches y la promoción del uso del transporte público.</p>
                  <p>D. La restricción del uso del vehículo privado en el centro de la ciudad y la inversión en energías renovables.</p>
                </div>
                <div className="bg-white p-2 rounded border border-purple-100">
                  <p className="font-semibold mb-1">¿Qué colectivo ciudadano critica la falta de ambición en las políticas de movilidad del Ayuntamiento de València?</p>
                  <p>A. València en Bici</p>
                  <p>B. Per l'horta per la defensa del territori</p>
                  <p className="text-purple-700">C. València per l'aire</p>
                  <p>D. Ecologistas en Acción</p>
                </div>
              </div>
            </div>
            {/* Claude */}
            <div className="flex flex-col bg-orange-50 rounded-lg p-2 sm:p-3 border border-orange-200 overflow-y-auto">
              <h4 className="text-base sm:text-lg font-bold mb-2 text-orange-800 sticky top-0 bg-orange-50 pb-2 z-10">
                Claude
              </h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-white p-2 rounded border border-orange-100">
                  <p className="font-semibold mb-1">¿Qué afirma el texto sobre la reducción de índices contaminantes en València en los últimos 10 años?</p>
                  <p className="text-orange-700">A. Aunque se han reducido, València sigue incumpliendo los valores de la Organización Mundial de la Salud</p>
                  <p>B. Los índices contaminantes se han mantenido estables</p>
                  <p>C. València es una de las ciudades con menores índices de contaminación en España</p>
                  <p>D. No se menciona nada sobre la reducción de índices contaminantes</p>
                </div>
                <div className="bg-white p-2 rounded border border-orange-100">
                  <p className="font-semibold mb-1">Según el texto, ¿cuál es una de las propuestas para reducir el uso del vehículo privado en València?</p>
                  <p className="text-orange-700">A. Implementar un peaje urbano de tarifa progresiva</p>
                  <p>B. Prohibir totalmente el uso de vehículos privados en el centro de la ciudad</p>
                  <p>C. Aumentar significativamente el precio de los combustibles</p>
                  <p>D. Limitar el acceso al centro solo a residentes</p>
                </div>
              </div>
            </div>
            {/* Microsoft Copilot */}
            <div className="flex flex-col bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-200 overflow-y-auto">
              <h4 className="text-base sm:text-lg font-bold mb-2 text-blue-800 sticky top-0 bg-blue-50 pb-2 z-10">
                Microsoft Copilot
              </h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-white p-2 rounded border border-blue-100">
                  <p className="font-semibold mb-1">¿Qué ha permitido la rehabilitación de la Plaça de la Reina?</p>
                  <p className="text-blue-700">A. La recuperación de 12.000 metros cuadrados como espacio peatonal</p>
                  <p>B. La construcción de un nuevo aparcamiento subterráneo</p>
                  <p>C. La instalación de más paradas de autobuses</p>
                  <p>D. El aumento de las zonas ajardinadas</p>
                </div>
                <div className="bg-white p-2 rounded border border-blue-100">
                  <p className="font-semibold mb-1">¿Cuál ha sido la reacción general ante la transformación de la Plaça de la Reina?</p>
                  <p className="text-blue-700">A. Bien acogida por la afluencia de gente</p>
                  <p>B. Rechazo total por la falta de vegetación</p>
                  <p>C. Indiferencia por parte de los residentes</p>
                  <p>D. Protestas por el aumento del ruido</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "¿Se puede mejorar esto? Intentémoslo:",
      content: (
        <div className="h-full flex flex-col p-4 sm:p-6 bg-gray-50 rounded-lg">
          <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-purple-600 shadow-sm">
            <p className="text-sm text-gray-700 mb-2">Intentemos con un prompt más detallado y exigente:</p>
            <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line">
              Crea siete preguntas tipo test sobre el texto <span className="font-bold text-purple-800">para estudiantes con un nivel C1 de español.</span> Cada pregunta debe tener una respuesta correcta y tres incorrectas.
- La información en la que se basan las respuestas incorrectas debe aparecer también en el texto.
- <span className="font-bold text-purple-800">Las respuestas incorrectas deben ser muy verosímiles y aparentemente correctas, de tal forma que solo sea posible identificarlas como erróneas tras una lectura atenta, y no ser descartables por mero sentido común o cultura general.</span>
- <span className="font-bold text-purple-800">Tanto la opción correcta como las incorrectas deben ser respuestas de inferencia, es decir, que la información necesaria para responderlas no aparezca de forma evidente en el texto, sino que haya de ser inferida tras una lectura atenta.</span>
- Al final de cada pregunta debe aparecer una breve explicación de por qué la respuesta correcta es verdadera y por qué las tres incorrectas son falsas.
- <span className="font-bold text-purple-800">MUY IMPORTANTE: NO CREES RESPUESTAS INCORRECTAS INVENTADAS Y NO BASADAS EN EL TEXTO.</span>
            </p>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 p-4 mt-4 sm:mt-6 shadow-sm">
            <div className="rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-xl mx-auto">
              <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-gray-200 p-1 bg-gray-50">
                <img
                  src="/qr.png"
                  alt="QR Code Presentación EVALIA"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                <h4 className="text-lg sm:text-2xl font-semibold mb-2" style={{
                  color: colors.azulOscuro,
                  fontFamily: "'Raleway', sans-serif"
                }}>
                  Materiales de Presentación
                </h4>
                <p className="text-base sm:text-lg text-gray-700" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Escanea para acceder a recursos y documentación adicional del proyecto EVALIA.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="w-full h-screen min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.verdeClaro + 'DD'} 0%, ${colors.lila + 'CC'} 100%)`
      }}
    >
      {/* Logo Unificado */}
      <LogoHablandisUnificado />

      {/* Título Unificado */}
      <MainTitleUnificado>
        Creación de Tareas de IA: Prompts
      </MainTitleUnificado>

      {/* Navegación y contenido */}
      <div className="flex-grow flex items-center justify-center px-3 sm:px-6 pb-12">
        <div className="w-full flex items-center gap-2 sm:gap-4 max-w-6xl mx-auto">
          {/* Botón anterior */}
          <button
            onClick={prevSlide}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            aria-label="Slide anterior"
            tabIndex={0}
          >
            <svg className="w-6 h-6" fill="none" stroke={colors.azulOscuro} strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Contenedor principal */}
          <div
            className="flex-grow bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
            style={{ minHeight: '480px', maxHeight: '752px', height: 'calc(100vh - 200px)' }}
          >
            {/* Header del slide */}
            <div className="bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base sm:text-lg font-semibold truncate pr-2" style={{ fontFamily: "'Raleway', sans-serif", color: colors.azulOscuro }}>
                {slides[currentSlide].title}
              </h2>
              <div className="flex gap-1 sm:gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ease-in-out ${index === currentSlide ? 'w-6 sm:w-8' : 'w-2 sm:w-2.5'}`}
                    style={{ backgroundColor: index === currentSlide ? colors.azulOscuro : colors.grisMedio }}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            {/* Contenido del slide */}
            <motion.div
              key={currentSlide}
              className="h-[calc(100%-58px)]"
              style={{ overflowY: 'auto' }}
              initial={{ opacity: 0.8, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.8, x: -30 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              {slides[currentSlide].content}
            </motion.div>
          </div>

          {/* Botón siguiente */}
          <button
            onClick={nextSlide}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            aria-label="Siguiente slide"
            tabIndex={0}
          >
            <svg className="w-6 h-6" fill="none" stroke={colors.azulOscuro} strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer Unificado */}
      <FooterUnificado />
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 12
// =======================================================================

// =======================================================================
// DIAPOSITIVA 13: CREACIÓN DE TAREAS DE MATCHING (DISEÑO POR FASES)
// =======================================================================

// CONFIGURACIÓN GLOBAL DE DISEÑO UNIFICADO (ACTUALIZADA)
const LogoConfig = {
  size: 'h-24 md:h-32',
  position: 'absolute top-6 left-6 z-30',
  fallbackFontSize: '36px md:48px',
  shadow: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
};
const TitleConfig = {
  fontFamily: 'Aglet Mono, monospace',
  mainSize: 'text-3xl md:text-4xl lg:text-5xl',
  weight: 'font-semibold',
  color: '#12055F',
  spacing: 'mb-4 md:mb-6'
};

const LogoHablandis = ({ className = "" }: { className?: string }) => (
  <img 
    src="/hablandis.png" 
    alt="Hablandis" 
    className={`${LogoConfig.size} ${className}`}
    style={{ filter: LogoConfig.shadow }}
    onError={(e) => {
      const img = e.target as HTMLImageElement;
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent) {
        parent.innerHTML = `
          <div style="font-family: 'Aglet Mono', monospace; color: #12055F; font-size: ${LogoConfig.fallbackFontSize}; font-weight: 700; line-height: 1;">
            Hablandis
          </div>
          <div style="font-family: 'Raleway', sans-serif; color: #007567; font-size: 14px; margin-top: 2px;">
            Centro Internacional de Idiomas
          </div>
        `;
      }
    }}
  />
);

const FooterMinimal = () => (
  <div className="absolute bottom-2 left-0 right-0 text-center">
    <p className="text-xs" style={{
      fontFamily: 'Raleway, sans-serif',
      color: '#12055F',
      opacity: 0.6
    }}>
      © {new Date().getFullYear()} Hablandis. Todos los derechos reservados.
    </p>
  </div>
);

const MainTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h1
    className={`${TitleConfig.mainSize} ${TitleConfig.weight} ${TitleConfig.spacing} ${className}`}
    style={{
      fontFamily: TitleConfig.fontFamily,
      color: TitleConfig.color
    }}
  >
    {children}
  </h1>
);

// =======================================================================

const Diapositiva13 = () => {
  const [faseActiva, setFaseActiva] = useState(1);

  // Paleta de colores corporativa Hablandis
  const colors = {
    verdeClaro: '#C4D4A4',
    azulOscuro: '#12055F',
    amarillo: '#FFC846',
    verdeTurquesa: '#007567',
    negro: '#000000',
    lila: '#B9ABE4',
    blanco: '#FFFFFF'
  };

  // Prompt inicial
  const promptInicial = "Actúa como un experto en creación de tareas para exámenes de certificación de ELE. Crea quince frases de nivel B1 que expresen la necesidad de encontrar un profesional o una empresa que les resuelvan quince situaciones cotidiana relacionada con vivienda, salud, mascotas, profesión, tiempo libre, celebraciones, etc.";

  // Datos estructurados FASE 1 - NUEVOS
  const situacionesGenericas = [
    "Necesito encontrar un fontanero urgente porque la tubería del baño está rota y se está saliendo el agua.",
    "Busco una empresa de mudanzas porque me cambio de piso la semana que viene.",
    "Me gustaría contratar a alguien para que pinte el salón antes de que lleguen mis padres de visita.",
    "Tengo que pedir cita con un fisioterapeuta porque me duele la espalda desde hace días.",
    "Quiero buscar una clínica dental para hacerme una limpieza bucal.",
    "Estoy buscando una peluquería canina para mi perro, porque tiene el pelo muy largo.",
    "Necesito un veterinario que atienda urgencias, mi gato no quiere comer nada.",
    "Quiero contratar a un profesor particular de inglés para preparar una entrevista de trabajo.",
    "Busco una academia que ofrezca cursos de informática para mejorar mi currículum.",
    "Me gustaría encontrar un grupo de teatro amateur para participar los fines de semana.",
    "Estoy buscando un taller de cerámica cerca de casa, quiero aprender algo nuevo.",
    "Necesitamos una empresa de catering para organizar la fiesta de cumpleaños de mi hijo.",
    "Estoy buscando un fotógrafo para hacer un reportaje de nuestra boda.",
    "Quiero encontrar un mecánico de confianza para revisar mi coche antes del viaje.",
    "Busco una agencia de viajes que organice escapadas de fin de semana por Andalucía."
  ];

  // FASE 2 - NUEVAS situaciones con palabras marcadas
  const situacionesEspecificas = [
    { base: "Necesito un fontanero", mejora: "que trabaje los fines de semana y que sepa instalar grifos inteligentes", extra: ", porque quiero modernizar la cocina." },
    { base: "Busco una empresa de mudanzas", mejora: "que ofrezca servicio de embalaje y transporte internacional", extra: ": en un mes me voy a vivir a Lisboa." },
    { base: "Me gustaría contratar a un pintor", mejora: "que trabaje con pinturas ecológicas", extra: ", porque quiero renovar el dormitorio sin dañar el medio ambiente." },
    { base: "Tengo que pedir cita con un fisioterapeuta", mejora: "especializado en lesiones deportivas", extra: ", porque me hice daño corriendo una media maratón." },
    { base: "Estoy buscando una clínica dental", mejora: "que tenga servicio en inglés", extra: ", porque mi pareja extranjera necesita una revisión y no habla español." },
    { base: "Necesito una peluquería canina", mejora: "que venga a domicilio", extra: ", porque mi perro es muy nervioso y se estresa al salir de casa." },
    { base: "Quiero encontrar un veterinario", mejora: "con experiencia en animales exóticos", extra: ", porque mi iguana tiene un comportamiento raro desde ayer." },
    { base: "Busco un profesor particular", mejora: "que prepare entrevistas de trabajo para el sector turístico", extra: ", ya que me presento a una oferta en un hotel de lujo." },
    { base: "Quiero apuntarme a una academia", mejora: "que enseñe Excel y Google Sheets para autónomos", extra: ", porque necesito mejorar mi gestión administrativa." },
    { base: "Me gustaría encontrar un grupo de teatro", mejora: "que monte obras en espacios no convencionales, como bares o parques", extra: ", para vivir una experiencia distinta." },
    { base: "Estoy buscando un taller de cerámica", mejora: "que también tenga clases para niños", extra: ", porque quiero compartir esta actividad con mi hija los sábados." },
    { base: "Necesitamos una empresa de catering", mejora: "especializada en comida vegetariana y sin gluten", extra: ", para la comunión de mi sobrino." },
    { base: "Busco un fotógrafo", mejora: "que haga sesiones espontáneas al aire libre", extra: ", porque quiero un álbum natural con mi familia sin poses artificiales." },
    { base: "Quiero un mecánico", mejora: "que haga revisiones a domicilio", extra: ", ya que tengo un coche híbrido y no quiero moverlo hasta estar seguro de que todo va bien." },
    { base: "Estoy buscando una agencia de viajes", mejora: "que organice rutas en bici por pueblos de interior y que incluya alojamiento rural con desayuno casero", extra: "." }
  ];

  const promptProfesor = `Actúa como un profesor de español como lengua extranjera experto en la creación de tareas para exámenes oficiales de acreditación de conocimientos de español. Escribe tres anuncios de entre 90 y 110 palabras en los que profesionales o empresas ofrezcan productos o servicios que parezcan ser apropiados a la situación que describiré a continuación. Los anuncios deben incluir nombres y datos muy concretos de forma que parezcan anuncios de periódico reales. Sin embargo, de los tres anuncios solo uno debe ser válido para la necesidad descrita. El anuncio válido no debe ser evidente, evitando repetir expresiones literales de la tarea, utilizando para ello sinónimos y parafraseo. Los otros dos anuncios deben ser verosímiles y parecer adecuados pero no serlo, de forma que exijan una lectura atenta por parte del estudiante para descubrir el motivo por el cual deben ser descartados como válidos.`;

  // FASE 4 - NUEVOS anuncios sobre teatro
  const anuncios = [
    {
      titulo: "Teatro nómada",
      texto: '"Teatro nómada" busca actores y actrices no profesionales para sus nuevas producciones itinerantes. Representamos obras modernas y adaptaciones clásicas en lugares poco habituales: cafeterías, terrazas, estaciones de tren y espacios abiertos. No es necesaria experiencia previa, solo compromiso y ganas de actuar. Ensayos: martes y jueves, 19:00–21:00, en la Biblioteca Pública de la calle Zamora. Estrenos en mayo y junio. Contacto: grupo.nomada@gmail.com o WhatsApp 611 924 713. ¡Ven a transformar la ciudad en un escenario!',
      valido: true,
      explicacion: "Cumple todos los requisitos: obras en espacios no convencionales como cafeterías, terrazas, estaciones y espacios abiertos."
    },
    {
      titulo: "Ficción a escena",
      texto: 'Grupo teatral "Ficción a escena" selecciona nuevos miembros para sus montajes en el Teatro Municipal del Centro Cultural Pilar Miró. Se busca gente entre 18 y 35 años con algo de experiencia o formación. Las obras se representarán entre septiembre y diciembre en el auditorio del distrito. Se valorarán conocimientos de expresión corporal. Ensayos los lunes y miércoles de 18:00 a 20:30. Interesados, escribid a ficcionaescena@correo.es con breve presentación. No se ofrece remuneración, pero sí certificado de participación.',
      valido: false,
      explicacion: "Las representaciones son en el Teatro Municipal, un espacio convencional. No ofrece la experiencia alternativa buscada."
    },
    {
      titulo: "Voces del cuerpo",
      texto: 'Taller de teatro "Voces del cuerpo" ofrece clases de interpretación centradas en el trabajo emocional, la improvisación y el análisis de texto. Dirigido a personas que buscan desarrollar su creatividad y expresividad. Las sesiones se realizan en el estudio "Artes en calma", junto al metro Guzmán el Bueno. Cursos trimestrales (160 €), con opción a participar en una muestra final en sala cerrada. Para más información: www.vocesdelcuerpo.com o Instagram @vocesdelcuerpo. Profesora: Clara Iturri, formada en la RESAD y especializada en pedagogía teatral.',
      valido: false,
      explicacion: "Es un taller de formación, no un grupo teatral. Las presentaciones son en sala cerrada, no en espacios no convencionales."
    }
  ];

  return (
    <div className="w-full h-full flex flex-col relative" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Logo Unificado */}
      <div className={LogoConfig.position}>
        <LogoHablandis />
      </div>
      {/* Título Unificado */}
      <div className="pt-8 pb-2 flex flex-col items-center">
        <MainTitle>
          Creación de tareas de matching
        </MainTitle>
      </div>

      {/* Indicadores de fase */}
      <div className="flex justify-center gap-2 py-3" style={{ backgroundColor: colors.verdeClaro + '20' }}>
        {[1, 2, 3, 4].map((fase) => (
          <button
            key={fase}
            onClick={() => setFaseActiva(fase)}
            className="px-4 py-2 rounded-full transition-all"
            style={{
              backgroundColor: faseActiva === fase ? colors.azulOscuro : colors.blanco,
              color: faseActiva === fase ? colors.blanco : colors.azulOscuro,
              fontFamily: 'Raleway, sans-serif',
              fontSize: '0.875rem',
              fontWeight: faseActiva === fase ? 'bold' : 'normal',
              border: `2px solid ${colors.azulOscuro}`
            }}
          >
            Fase {fase}
          </button>
        ))}
      </div>

      {/* Contenido de las fases */}
      <div className="flex-grow flex overflow-hidden">
        {/* Fase 1 */}
        <div className={`${faseActiva === 1 ? 'w-full' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <div className="h-full p-6 overflow-y-auto">
            <h2 className="text-lg mb-4" style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 'bold',
              color: colors.azulOscuro
            }}>
              Fase 1: Punto de partida
            </h2>
            <div className="mb-6 p-4 rounded-lg" style={{
              backgroundColor: colors.verdeTurquesa + '15',
              border: `1px solid ${colors.verdeTurquesa}`
            }}>
              <h3 className="text-base mb-2" style={{
                fontFamily: 'Raleway, sans-serif',
                color: colors.verdeTurquesa,
                fontWeight: '600'
              }}>
                Prompt para crear la primera parte de la tarea:
              </h3>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '0.85rem',
                color: colors.negro,
                lineHeight: '1.5',
                fontStyle: 'italic'
              }}>
                "{promptInicial}"
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-base mb-3" style={{
                fontFamily: 'Raleway, sans-serif',
                color: colors.verdeTurquesa,
                fontWeight: '600'
              }}>
                Resultado:
              </h3>
              <div className="space-y-2">
                {situacionesGenericas.map((situacion, index) => (
                  <div key={index} className="flex items-start">
                    <span className="mr-2 text-sm" style={{ color: colors.verdeTurquesa }}>
                      {index + 1}.
                    </span>
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.85rem',
                      color: colors.negro
                    }}>
                      {situacion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 p-4 rounded-lg text-center" style={{
              backgroundColor: colors.lila + '25',
              border: `2px dashed ${colors.lila}`
            }}>
              <p className="text-base mb-2" style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 'bold',
                color: colors.azulOscuro
              }}>
                ¿Nos llama algo la atención?
              </p>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '0.9rem',
                color: colors.negro,
                fontStyle: 'italic'
              }}>
                ...Sí, hemos sido demasiado tacaños en el prompt.
              </p>
            </div>
          </div>
        </div>
        {/* Fase 2 */}
        <div className={`${faseActiva === 2 ? 'w-full' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <div className="h-full p-6 overflow-y-auto">
            <h2 className="text-lg mb-4" style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 'bold',
              color: colors.azulOscuro
            }}>
              Fase 2: Refinamiento
            </h2>
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.lila + '20' }}>
              <h3 className="text-base mb-2" style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: '600',
                color: colors.azulOscuro
              }}>
                Enmendémonos:
              </h3>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '0.9rem',
                color: colors.negro
              }}>
                Modifica las situaciones para que sean <strong style={{ color: colors.verdeTurquesa }}>más variadas y originales</strong>, 
                e incluyan <strong style={{ color: colors.verdeTurquesa }}>detalles más específicos</strong>, de forma que la empresa o el 
                profesional tenga <strong style={{ color: colors.verdeTurquesa }}>características muy determinadas</strong>.
              </p>
            </div>
            <h3 className="text-base mb-3" style={{
              fontFamily: 'Raleway, sans-serif',
              color: colors.verdeTurquesa,
              fontWeight: '600'
            }}>
              Resultado mejorado:
            </h3>
            <div className="mb-3 p-3 rounded-lg" style={{
              backgroundColor: colors.verdeTurquesa + '10',
              border: `1px solid ${colors.verdeTurquesa}`
            }}>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '0.8rem',
                color: colors.negro,
                fontStyle: 'italic'
              }}>
                💡 La situación 10 está destacada porque será nuestro ejemplo práctico en las siguientes fases.
              </p>
            </div>
            <div className="space-y-2">
              {situacionesEspecificas.map((situacion, index) => (
                <div key={index} className={`flex items-start p-2 rounded ${index === 9 ? 'ring-2' : ''}`}
                  style={{
                    backgroundColor: index === 9 ? colors.verdeTurquesa + '15' : 'transparent',
                    borderColor: index === 9 ? colors.verdeTurquesa : 'transparent'
                  }}>
                  <span className="mr-2 text-sm" style={{ color: colors.verdeTurquesa }}>
                    {index + 1}.
                  </span>
                  <p style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '0.85rem',
                    color: colors.negro
                  }}>
                    {situacion.base} <span style={{
                      backgroundColor: colors.amarillo + '50',
                      padding: '0 4px',
                      borderRadius: '2px'
                    }}>{situacion.mejora}</span>{situacion.extra}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Fase 3 */}
        <div className={`${faseActiva === 3 ? 'w-full' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <div className="h-full p-6 overflow-y-auto">
            <h2 className="text-lg mb-4" style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 'bold',
              color: colors.azulOscuro
            }}>
              Fase 3: Metodología
            </h2>
            <div className="mb-4">
              <h3 className="text-base mb-3" style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: '600',
                color: colors.verdeTurquesa
              }}>
                Ahora creemos la otra parte de la tarea:
              </h3>
            </div>
            <div className="p-4 rounded-lg" style={{
              backgroundColor: colors.verdeClaro + '30',
              border: `1px solid ${colors.verdeClaro}`
            }}>
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full text-sm" style={{
                  backgroundColor: colors.azulOscuro,
                  color: colors.blanco,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Prompt del profesor experto
                </span>
              </div>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '0.85rem',
                color: colors.negro,
                lineHeight: '1.6'
              }}>
                {promptProfesor}
              </p>
              <p className="mt-3 font-semibold" style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '0.9rem',
                color: colors.azulOscuro
              }}>
                Ahora crea tres textos para la situación 10
              </p>
            </div>
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.lila + '15' }}>
              <h4 className="text-sm mb-2" style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: '600',
                color: colors.azulOscuro
              }}>
                Situación seleccionada:
              </h4>
              <p style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '0.9rem',
                color: colors.negro,
                fontWeight: '500'
              }}>
                10. Me gustaría encontrar un grupo de teatro que monte obras en espacios no convencionales, como bares o parques, para vivir una experiencia distinta.
              </p>
            </div>
          </div>
        </div>
        {/* Fase 4 */}
        <div className={`${faseActiva === 4 ? 'w-full' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <div className="h-full p-6 overflow-y-auto">
            <h2 className="text-lg mb-4" style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 'bold',
              color: colors.azulOscuro
            }}>
              Fase 4: Resultado final
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {anuncios.map((anuncio, index) => (
                <div key={index} className="relative p-4 rounded-lg" style={{
                  backgroundColor: colors.blanco,
                  border: `2px solid ${anuncio.valido ? colors.verdeTurquesa : colors.lila}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  <div className="absolute top-2 right-2" style={{
                    backgroundColor: anuncio.valido ? colors.verdeTurquesa : colors.lila,
                    color: colors.blanco,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {anuncio.valido ? '✓' : '✗'}
                  </div>
                  <h4 className="mb-2 pr-8" style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    color: colors.azulOscuro
                  }}>
                    Anuncio {String.fromCharCode(65 + index)}: {anuncio.titulo}
                  </h4>
                  <p className="mb-3" style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '0.75rem',
                    color: colors.negro,
                    lineHeight: '1.4'
                  }}>
                    {anuncio.texto}
                  </p>
                  <div className="pt-3 border-t" style={{ borderColor: colors.verdeClaro }}>
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.7rem',
                      color: anuncio.valido ? colors.verdeTurquesa : colors.azulOscuro,
                      fontWeight: '500'
                    }}>
                      {anuncio.explicacion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: colors.verdeClaro + '20' }}>
              <h3 className="text-base mb-2" style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: '600',
                color: colors.azulOscuro
              }}>
                Resumen de validación:
              </h3>
              <ul className="space-y-1">
                <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: colors.negro }}>
                  <span style={{ color: colors.verdeTurquesa, fontWeight: 'bold' }}>✓</span> Anuncio A: Cumple todos los requisitos (espacios no convencionales)
                </li>
                <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: colors.negro }}>
                  <span style={{ color: colors.lila, fontWeight: 'bold' }}>✗</span> Anuncio B: Teatro convencional, no espacios alternativos
                </li>
                <li style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: colors.negro }}>
                  <span style={{ color: colors.lila, fontWeight: 'bold' }}>✗</span> Anuncio C: Es un taller de formación, no un grupo teatral
                </li>
              </ul>
            </div>
            {/* Código QR */}
            <div className="rounded-xl p-4 shadow-lg flex items-center gap-4" style={{
              backgroundColor: colors.verdeTurquesa + '15',
              border: `1px solid ${colors.verdeTurquesa}`
            }}>
              <div className="w-32 h-32 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                backgroundColor: colors.blanco
              }}>
                <img
                  src="/qr.png"
                  alt="QR Code Materiales"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1" style={{
                  color: colors.azulOscuro,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Materiales de Formación
                </h3>
                <p className="text-sm" style={{
                  fontFamily: 'Raleway, sans-serif',
                  color: colors.negro
                }}>
                  Escanea para acceder a recursos adicionales y plantillas para crear tus propias tareas de matching
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Unificado Minimalista */}
      <FooterMinimal />
    </div>
  );
};

// =======================================================================
// DIAPOSITIVA 14: IA PARA CORRECCIÓN - DOS ENFOQUES (DISEÑO UNIFICADO)
// =======================================================================

const Diapositiva14 = () => {
  const [showFullText, setShowFullText] = useState(false);
  const ejemploTexto = "Hola me llamo Sara y quiero contar mi experiencia porque creo que esta iniziadiva es muy interesante. Para mi comer significa comer untos a la gente que quiero. y condivider nuestras experiencias del dia. Hace tres años había una comida que me acuerdo bien. Era un ordenario dia de Enero. Y estaba con mi madre, mi padre y mi hermana como quasi todos los días; porque en mi familia es normal comer untos. Ese dia comimos una comida preparida por mi madre, que es una bravissima cocinera. Se trataba de una pasta tipica del mi pais . «pasta a la nona» también pollo con patatas. Y al fin una tarta muy rica. Ese momentos lo acuordo con mucho gusto porque estábamos untos y feliz A lo mejor una de las ultimas veces.";
  const truncatedText = ejemploTexto.substring(0, 180) + "...";

  // Colores para esta diapositiva específica
  const slideSpecificColors = {
    lilaSuave: '#D2CDEB', 
    verdeClaroSuave: '#D9E4C8', 
  };

  const slideColors = {
    textPrimaryOnDark: colors.blanco, 
    textSecondaryOnDark: colors.grisClaro,
    cardBackground: colors.blanco + 'E6', 
    accent1: colors.amarillo,
    accent2: colors.verdeTurquesa,
  };

  const enfoqueTitleStyle = {
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 700, 
    color: colors.azulOscuro, 
    fontSize: '1.8rem', 
    marginBottom: '1.5rem',
  };

  const bodyTextStyle = {
    fontFamily: 'Raleway, sans-serif',
    color: colors.negro, 
    fontSize: '1rem', 
    lineHeight: '1.7',
  };

  const linkButtonStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    textAlign: 'center' as const, 
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden" 
      style={{ 
        background: `linear-gradient(145deg, ${slideSpecificColors.lilaSuave} 0%, ${slideSpecificColors.verdeClaroSuave} 100%)`
      }}
    >
      {/* Logo Unificado */}
      <div className={LogoConfig.position}>
        <LogoHablandis />
      </div>

      {/* Título Unificado */}
      <div className="pt-12 pb-2 flex flex-col items-center w-full">
        <MainTitle>
          Las IA para la corrección didáctica: Dos Enfoques
        </MainTitle>
      </div>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-7xl z-10">
        <motion.div 
          className="p-8 flex flex-col rounded-2xl" 
          style={{ 
            backgroundColor: slideColors.cardBackground,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)', 
            backdropFilter: 'blur(12px)', 
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{duration: 0.7, delay: 0.4, ease: "easeOut"}}
        >
          <h2 style={enfoqueTitleStyle}>
            <span style={{borderBottom: `3px solid ${slideColors.accent1}`}}>Enfoque 1:</span> Asistencia Lingüística y Estilística
          </h2>
          
          <div className="my-3" style={bodyTextStyle}>
            <p className="font-semibold" style={{color: colors.azulOscuro, fontSize: '1.1rem'}}>
              Herramienta: <a href="https://editgpt.app" target="_blank" rel="noopener noreferrer" style={{color: colors.verdeTurquesa, textDecoration: 'underline', fontWeight:700}}>editgpt.app</a>
            </p>
            <p className="text-sm mt-1" style={{color: colors.grisOscuro}}>
              (Extensión de Chrome permite uso extendido)
            </p>
          </div>
          
          <h3 style={{...bodyTextStyle, fontWeight: 600, color: colors.azulOscuro, marginTop: '1rem', marginBottom: '0.5rem'}}>Texto de Ejemplo Corregible:</h3>
          <div 
            className="text-sm p-4 rounded-lg mb-4 overflow-y-auto pretty-scrollbar"
            style={{
                ...bodyTextStyle,
                backgroundColor: colors.grisClaro + 'A6', 
                maxHeight: showFullText ? '220px' : '80px',
                transition: 'max-height 0.6s ease-in-out',
                fontSize: '0.9rem',
                border: `1px solid ${colors.grisMedio}90`, 
                color: colors.negro,
             }}
          >
            {showFullText ? ejemploTexto : truncatedText}
          </div>
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="self-start mt-auto mb-4 px-5 py-2.5 rounded-lg text-sm"
            style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 600,
              backgroundColor: slideColors.accent1,
              color: colors.azulOscuro, 
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FFDA6A'; e.currentTarget.style.transform = 'scale(1.03)';}}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = slideColors.accent1; e.currentTarget.style.transform = 'scale(1)';}}
          >
            {showFullText ? 'Mostrar Menos Texto' : 'Leer Texto Completo'}
          </button>
        </motion.div>

        <motion.div 
          className="p-8 flex flex-col rounded-2xl" 
          style={{ 
            backgroundColor: slideColors.cardBackground,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)', 
            backdropFilter: 'blur(12px)', 
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{duration: 0.7, delay: 0.55, ease: "easeOut"}}
        >
          <h2 style={enfoqueTitleStyle}>
            <span style={{borderBottom: `3px solid ${slideColors.accent2}`}}>Enfoque 2:</span> Evaluación Basada en Rúbricas
          </h2>
          <div style={{...bodyTextStyle, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div>
              <p className="mb-3">
                Utilización de IA (ChatGPT) para aplicar criterios de evaluación detallados a la producción escrita.
              </p>
              <p className="font-semibold mb-4" style={{color: colors.azulOscuro, fontSize: '1.1rem'}}>
                Marco de Referencia: <span style={{color: colors.verdeTurquesa, fontWeight:700}}>Rúbrica DELE B1</span>
              </p>
              <p className="mb-6 text-sm" style={{color: colors.grisOscuro}}>
                Se busca que la IA interprete y aplique descriptores específicos para ofrecer un feedback que simule una evaluación formal.
              </p>
            </div>

            <div className="mt-auto space-y-4">
              <a 
                href="https://chatgpt.com/share/683470a7-b6b0-800d-bc7d-1d8335ca3ffc" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  ...linkButtonStyle,
                  backgroundColor: slideColors.accent2,
                  color: colors.blanco,
                  width: '100%', 
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 7px 18px rgba(0,0,0,0.2)';}}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0px) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';}}
              >
                Ver Interacción Modelo (ChatGPT)
              </a>
              <a 
                href="https://examenes.cervantes.es/sites/default/files/guia_examen_dele_b1_1.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  ...linkButtonStyle,
                  backgroundColor: colors.azulOscuro, 
                  color: colors.blanco,
                  width: '100%',
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 7px 18px rgba(0,0,0,0.2)';}}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0px) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';}}
              >
                Consultar Guía DELE B1 (PDF)
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .pretty-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .pretty-scrollbar::-webkit-scrollbar-track {
          background: ${colors.grisClaro}40; 
          border-radius: 10px;
        }
        .pretty-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${colors.verdeTurquesa}80; 
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .pretty-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: ${colors.verdeTurquesa}B3; 
        }
      `}</style>

      {/* Footer Unificado Minimalista */}
      <FooterMinimal />
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 14
// =======================================================================

// ... (resto del código de Presentacion.tsx y Diapositiva15 sin cambios) ...

// ... (resto del código de Presentacion.tsx y Diapositiva15 sin cambios) ...

// =======================================================================
// DIAPOSITIVA 15: La complejidad en la interpretación y análisis de la expresión e interacción oral. Un ejemplo con los imperativos
// =======================================================================

// Definir colores y animaciones específicos para Diapositiva15
const diap15Colors = {
  verdeClaro: "#C4D4A4",
  azulOscuro: "#12055F",
  amarillo: "#FFC846",
  verdeTurquesa: "#007567",
  negro: "#000000",
  lila: "#B9ABE4",
  grisClaro: "#F5F5F5",
  grisOscuro: "#666666",
  grisMedio: "#999999",
  blanco: "#FFFFFF",
  exito: "#4CAF50",
  error: "#f44336"
};

const diap15Animations = {
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } },
  scaleIn: { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.3 } }
};

// SUB-DIAPOSITIVA 1: DETECTIVE DE MODALIDADES - Movida fuera del componente principal
const DetectiveModalidades = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [score, setScore] = useState(0);

  const examples = [
    { sentence: "Probablemente llueva mañana", dictum: "llueve mañana", modus: "probabilidad", explanation: "El hablante expresa incertidumbre sobre el evento futuro" },
    { sentence: "¡Ojalá vengas pronto!", dictum: "vienes pronto", modus: "deseo", explanation: "El hablante expresa su deseo de que ocurra la acción" },
    { sentence: "¿Estudiarás para el examen?", dictum: "estudias para el examen", modus: "pregunta", explanation: "El hablante solicita información sobre una acción futura" },
    { sentence: "Debes terminar la tarea", dictum: "terminas la tarea", modus: "obligación", explanation: "El hablante expresa que la acción es necesaria" },
    { sentence: "Tal vez sea cierto", dictum: "es cierto", modus: "posibilidad", explanation: "El hablante muestra duda sobre la veracidad" }
  ];

  const nextExample = () => {
    setCurrentExample(prev => (prev + 1) % examples.length);
    setShowAnalysis(false);
  };

  const revealAnalysis = () => {
    if (!showAnalysis) {
      setScore(prevScore => prevScore + 1);
    }
    setShowAnalysis(true);
  };

  return (
    <div className="flex flex-col p-3 md:p-4 bg-white rounded-lg shadow-xl h-full" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div style={{ backgroundColor: diap15Colors.azulOscuro }} className="text-white p-3 md:p-4 rounded-t-lg">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace' }}>¡DETECTIVE DE MODALIDADES!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap15Colors.lila }}>Dictum vs Modus: Descubriendo las Intenciones 🕵️‍♂️</h4>
      </div>
      
      <div className="p-3 md:p-4 mb-2 md:mb-3 rounded-lg" style={{ backgroundColor: diap15Colors.lila+'30' }}>
        <p className="text-sm md:text-base font-medium" style={{ color: diap15Colors.azulOscuro }}>
          La modalidad expresa la actitud del hablante hacia el contenido.
          <strong style={{color: diap15Colors.verdeTurquesa}}> DICTUM</strong> = lo que se dice | <strong style={{color: diap15Colors.amarillo}}>MODUS</strong> = actitud del hablante
        </p>
      </div>
      
      <div className="flex-grow p-3 md:p-6 rounded-lg mb-2 md:mb-3 min-h-[150px] md:min-h-[200px]" style={{ backgroundColor: diap15Colors.grisClaro }}>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: diap15Colors.azulOscuro }}>
            "{examples[currentExample].sentence}"
          </p>
          <p className="text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>🔍 Analiza esta oración y encuentra el DICTUM y MODUS</p>
        </div>
        
        {showAnalysis ? (
          <motion.div {...diap15Animations.fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="p-3 md:p-4 rounded-lg border-l-4" style={{ backgroundColor: diap15Colors.verdeClaro+'50', borderColor: diap15Colors.verdeTurquesa}}>
              <h5 className="font-bold mb-2" style={{ color: diap15Colors.verdeTurquesa, fontFamily: 'Raleway Bold, sans-serif' }}>📝 DICTUM (Contenido)</h5>
              <p className="text-md md:text-lg">"{examples[currentExample].dictum}"</p>
              <p className="text-xs md:text-sm mt-2" style={{color: diap15Colors.grisOscuro}}>Lo que se comunica objetivamente</p>
            </div>
            
            <div className="p-3 md:p-4 rounded-lg border-l-4" style={{ backgroundColor: diap15Colors.amarillo+'50', borderColor: diap15Colors.amarillo}}>
              <h5 className="font-bold mb-2" style={{ color: diap15Colors.amarillo, fontFamily: 'Raleway Bold, sans-serif' }}>🎭 MODUS (Actitud)</h5>
              <p className="text-md md:text-lg">"{examples[currentExample].modus}"</p>
              <p className="text-xs md:text-sm mt-2" style={{color: diap15Colors.grisOscuro}}>{examples[currentExample].explanation}</p>
            </div>
          </motion.div>
        ) : (
          <div className="text-center">
            <div className="mb-3 md:mb-4">
              <p className="mb-2" style={{color: diap15Colors.grisOscuro}}>Piensa en:</p>
              <p className="text-xs md:text-sm">• ¿Cuál es el contenido objetivo?</p>
              <p className="text-xs md:text-sm">• ¿Qué actitud muestra el hablante?</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-4 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap15Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-2" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap15Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap15Colors.grisOscuro }}>
          Para los sistemas de IA, distinguir DICTUM y MODUS es fundamental para comprender intención comunicativa. 
          Un chatbot que entiende que "¿Podrías ayudarme?" no es solo una pregunta sobre capacidad sino una solicitud 
          educada, puede generar respuestas más apropiadas y naturales.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <div className="text-xs md:text-sm mb-2 sm:mb-0" style={{color: diap15Colors.grisOscuro}}>
          Puntuación: {score} / {examples.length}
        </div>
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
            style={{ backgroundColor: showAnalysis ? diap15Colors.grisMedio : diap15Colors.verdeTurquesa, fontFamily: 'Raleway Semibold, sans-serif' }}
            onClick={revealAnalysis}
            disabled={showAnalysis}
          >
            🔍 Revelar Análisis
          </button>
          <button 
            className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
            style={{ backgroundColor: diap15Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
            onClick={nextExample}
          >
            Siguiente Ejemplo
          </button>
        </div>
      </div>
      <div className="mt-2 text-center text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>
        Ejemplo {currentExample + 1} de {examples.length}
      </div>
    </div>
  );
};

// SUB-DIAPOSITIVA 2: BATALLA DE MODALIDADES - Movida fuera
const BatallaModalidades = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const examples = [
    { sentence: "Puede que llueva", type: "proposicional", explanation: "Actitud hacia la verdad del evento - expresa posibilidad" },
    { sentence: "¡Ven aquí!", type: "extraproposicional", explanation: "Actitud hacia el interlocutor - solicita una acción" },
    { sentence: "Debe de estar enfermo", type: "proposicional", explanation: "Suposición sobre la verdad de la situación" },
    { sentence: "¿Vienes o no?", type: "extraproposicional", explanation: "Solicitud de información dirigida al oyente" },
    { sentence: "Quizás tengas razón", type: "proposicional", explanation: "Grado de certeza sobre la verdad de la afirmación" },
    { sentence: "¡Qué hermoso día!", type: "extraproposicional", explanation: "Expresión dirigida hacia el interlocutor para compartir evaluación" }
  ];

  const checkAnswer = (type: string) => {
    setSelectedType(type);
    setShowResult(true);
    if (type === examples[currentExample].type) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const nextExample = () => {
    setCurrentExample(prev => (prev + 1) % examples.length);
    setSelectedType('');
    setShowResult(false);
  };

  return (
    <div className="flex flex-col p-3 md:p-4 bg-white rounded-lg shadow-xl h-full" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div style={{ backgroundColor: diap15Colors.verdeTurquesa }} className="text-white p-3 md:p-4 rounded-t-lg">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace' }}>¡BATALLA DE MODALIDADES!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap15Colors.lila }}>Proposicional vs Extraproposicional: El Duelo Lingüístico ⚔️</h4>
      </div>

      <div className="p-3 md:p-4 mb-2 md:mb-3 rounded-lg" style={{ backgroundColor: diap15Colors.lila+'30' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="text-center">
            <h5 className="font-bold" style={{ color: diap15Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>🎯 PROPOSICIONAL</h5>
            <p className="text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>Actitud hacia la VERDAD de lo dicho</p>
          </div>
          <div className="text-center">
            <h5 className="font-bold" style={{ color: diap15Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>👥 EXTRAPROPOSICIONAL</h5>
            <p className="text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>Actitud hacia los PARTICIPANTES</p>
          </div>
        </div>
      </div>

      <div className="flex-grow p-3 md:p-6 rounded-lg mb-2 md:mb-3 min-h-[150px] md:min-h-[200px]" style={{ backgroundColor: diap15Colors.grisClaro }}>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: diap15Colors.verdeTurquesa }}>
            "{examples[currentExample].sentence}"
          </p>
          <p className="text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>⚔️ ¿Qué tipo de modalidad detectas?</p>
        </div>
        
        {!showResult ? (
          <motion.div {...diap15Animations.fadeIn} className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <button 
              className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
              style={{ backgroundColor: diap15Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
              onClick={() => checkAnswer('proposicional')}
            >
              🎯 PROPOSICIONAL<br/>
              <span className="text-xs">(hacia la verdad)</span>
            </button>
            <button 
              className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
              style={{ backgroundColor: diap15Colors.amarillo, color: diap15Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
              onClick={() => checkAnswer('extraproposicional')}
            >
              👥 EXTRAPROPOSICIONAL<br/>
              <span className="text-xs">(hacia participantes)</span>
            </button>
          </motion.div>
        ) : (
          <motion.div {...diap15Animations.scaleIn} className="text-center">
            <div className={`p-3 md:p-4 rounded-lg mb-3 md:mb-4 border-2 ${
              selectedType === examples[currentExample].type ? 'border-green-500' : 'border-red-500'
            }`} style={{ backgroundColor: selectedType === examples[currentExample].type ? diap15Colors.exito+'30' : diap15Colors.error+'30' }}>
              <h5 className={`font-bold text-lg ${
                selectedType === examples[currentExample].type ? 'text-green-700' : 'text-red-700'
              }`} style={{ fontFamily: 'Raleway Bold, sans-serif' }}>
                {selectedType === examples[currentExample].type ? '🎉 ¡CORRECTO!' : '❌ Incorrecto'}
              </h5>
              <p className="mt-2 text-sm md:text-base">
                <strong>Respuesta correcta:</strong> {examples[currentExample].type.toUpperCase()}
              </p>
              <p className="text-xs md:text-sm mt-2" style={{color: diap15Colors.grisOscuro}}>{examples[currentExample].explanation}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 md:p-4 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap15Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-2" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap15Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap15Colors.grisOscuro }}>
          Esta distinción es crucial para que las IA interpreten intenciones. La proposicional requiere procesamiento semántico, la extraproposicional requiere procesamiento pragmático.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <div className="text-xs md:text-sm mb-2 sm:mb-0" style={{color: diap15Colors.grisOscuro}}>
          Puntuación: {score} / {examples.length}
        </div>
        <button 
          className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: !showResult ? diap15Colors.grisMedio : diap15Colors.verdeTurquesa, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={nextExample}
          disabled={!showResult}
        >
          Siguiente Batalla
        </button>
      </div>
      <div className="mt-2 text-center text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>
        Batalla {currentExample + 1} de {examples.length}
      </div>
    </div>
  );
};

// SUB-DIAPOSITIVA 3: ORACIÓN VS ENUNCIADO - Movida fuera
const OracionEnunciado = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [selectedContextIdx, setSelectedContextIdx] = useState<number | null>(null);
  const [showTransformation, setShowTransformation] = useState(false);

  const examples = [
    { oracion: "Llueve", transformations: [
        { context: "Mirando por la ventana", enunciado: "¡Llueve!", funcion: "Exclamación/Información" },
        { context: "Decidiendo si salir", enunciado: "Llueve...", funcion: "Justificación" },
        { context: "Pregunta implícita", enunciado: "Llueve", funcion: "Respuesta" }]
    },
    { oracion: "Estudiar", transformations: [
        { context: "Madre a hijo perezoso", enunciado: "¡A estudiar!", funcion: "Orden" },
        { context: "Cartel en biblioteca", enunciado: "Estudiar", funcion: "Propósito del lugar" },
        { context: "Lista de tareas", enunciado: "Estudiar", funcion: "Recordatorio" }]
    },
    { oracion: "Cerrado", transformations: [
        { context: "Cartel en puerta", enunciado: "Cerrado", funcion: "Información de estado" },
        { context: "Respuesta a pregunta", enunciado: "Cerrado", funcion: "Respuesta" },
        { context: "Lamento", enunciado: "¡Cerrado!", funcion: "Exclamación de frustración" }]
    }
  ];

  const selectContext = (index: number) => {
    setSelectedContextIdx(index);
    setShowTransformation(true);
  };

  const nextExample = () => {
    setCurrentExample(prev => (prev + 1) % examples.length);
    setSelectedContextIdx(null);
    setShowTransformation(false);
  };

  return (
    <div className="flex flex-col p-3 md:p-4 bg-white rounded-lg shadow-xl h-full overflow-auto" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div style={{ backgroundColor: diap15Colors.amarillo }} className="p-3 md:p-4 rounded-t-lg flex-shrink-0">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace', color: diap15Colors.azulOscuro }}>¡ORACIÓN VS ENUNCIADO!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap15Colors.verdeTurquesa }}>Del Laboratorio a la Vida Real: El Contexto lo Cambia Todo 🔬➡️🌍</h4>
      </div>

      <div className="p-3 md:p-3 mb-2 rounded-lg flex-shrink-0" style={{ backgroundColor: diap15Colors.lila+'30' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          <div className="text-center">
            <h5 className="font-bold text-sm md:text-base" style={{ color: diap15Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>⚗️ ORACIÓN</h5>
            <p className="text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>Unidad sintáctica abstracta</p>
          </div>
          <div className="text-center">
            <h5 className="font-bold text-sm md:text-base" style={{ color: diap15Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>💬 ENUNCIADO</h5>
            <p className="text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>Proposición + Contexto = Comunicación</p>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col p-3 md:p-4 rounded-lg mb-2 overflow-auto" style={{ backgroundColor: diap15Colors.grisClaro }}>
        <div className="mb-3 text-center">
          <div className="p-3 md:p-4 rounded-lg mb-3" style={{ backgroundColor: diap15Colors.verdeClaro+'50' }}>
            <h5 className="font-bold text-sm md:text-base mb-1" style={{ color: diap15Colors.verdeTurquesa, fontFamily: 'Raleway Bold, sans-serif' }}>📝 ORACIÓN ABSTRACTA:</h5>
            <p className="text-lg md:text-xl font-bold" style={{ color: diap15Colors.azulOscuro }}>"{examples[currentExample].oracion}"</p>
          </div>
          <p className="text-sm md:text-base mb-3" style={{color: diap15Colors.grisOscuro}}>🎭 Elige un contexto para transformarla en enunciado:</p>
        </div>
        
        <div className="space-y-2 mb-3">
          {examples[currentExample].transformations.map((trans, index) => (
            <button
              key={index}
              className={`w-full p-2 md:p-3 rounded-lg border-2 transition-colors text-sm md:text-base ${
                selectedContextIdx === index 
                  ? 'border-green-500 text-green-700' 
                  : 'border-gray-300 hover:border-green-300'
              }`}
              style={{ 
                backgroundColor: selectedContextIdx === index ? diap15Colors.exito+'30' : diap15Colors.blanco,
                fontFamily: 'Raleway Semibold, sans-serif'
              }}
              onClick={() => selectContext(index)}
            >
              🎬 {trans.context}
            </button>
          ))}
        </div>
        
        {showTransformation && selectedContextIdx !== null && (
          <motion.div {...diap15Animations.fadeIn} className="p-3 md:p-4 rounded-lg mt-auto" style={{ backgroundColor: diap15Colors.amarillo+'50' }}>
            <h5 className="font-bold mb-2 text-sm md:text-base" style={{ color: diap15Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>✨ TRANSFORMACIÓN:</h5>
            <p className="text-base md:text-lg font-medium">
              Enunciado: <span style={{ color: diap15Colors.verdeTurquesa }}>"{examples[currentExample].transformations[selectedContextIdx].enunciado}"</span>
            </p>
            <p className="text-sm md:text-base mt-2">
              Función: <strong>{examples[currentExample].transformations[selectedContextIdx].funcion}</strong>
            </p>
          </motion.div>
        )}
      </div>

      <div className="p-3 md:p-3 rounded-lg mb-2 flex-shrink-0" style={{ backgroundColor: diap15Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-1 text-sm md:text-base" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap15Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap15Colors.grisOscuro }}>
          Crucial para IA conversacional. Los modelos deben procesar estructura gramatical y contexto situacional. GPT-4 lo hace bien. Ayuda a entender que la misma forma tiene múltiples funciones.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center flex-shrink-0">
        <div className="text-xs md:text-sm mb-2 sm:mb-0" style={{color: diap15Colors.grisOscuro, fontFamily: 'Raleway Medium, sans-serif'}}>
          Fórmula: ENUNCIADO = PROPOSICIÓN + CONTEXTO
        </div>
        <button 
          className="px-3 py-2 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: diap15Colors.amarillo, color: diap15Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={nextExample}
        >
          Siguiente Transformación
        </button>
      </div>
      <div className="text-center text-xs md:text-sm mt-1 flex-shrink-0" style={{color: diap15Colors.grisOscuro}}>
        Ejemplo {currentExample + 1} de {examples.length}
      </div>
    </div>
  );
};

// SUB-DIAPOSITIVA 4: TRIPLE IMPERATIVO - Movida fuera
const TripleImperativo = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedSet, setSelectedSet] = useState(0);

  const exampleSets = [
    {
      name: "Análisis Clásico",
      description: "Ejemplos fundamentales del triple análisis",
      examples: [
        { 
          ejemplo: "¡Estudia!", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Forma morfológica imperativa de 2ª persona singular", 
            tipoOracion: "Oración imperativa con verbo en modo imperativo", 
            actoHabla: "Enunciado con fuerza ilocutiva de mandato directo" 
          }
        },
        { 
          ejemplo: "Debes estudiar", 
          modoVerbal: false, 
          tipoOracion: false, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Modo indicativo (verbo 'deber')", 
            tipoOracion: "Oración enunciativa, no imperativa", 
            actoHabla: "Realiza acto de mandato indirecto mediante modalidad deóntica" 
          }
        },
        { 
          ejemplo: "¿Podrías estudiar?", 
          modoVerbal: false, 
          tipoOracion: false, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Modo condicional", 
            tipoOracion: "Oración interrogativa", 
            actoHabla: "Acto de habla de solicitud cortés (mandato atenuado)" 
          }
        },
        { 
          ejemplo: "A estudiar", 
          modoVerbal: false, 
          tipoOracion: false, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Infinitivo precedido de preposición, sin verbo conjugado", 
            tipoOracion: "Construcción no oracional (sintagma preposicional)", 
            actoHabla: "Enunciado imperativo que transmite orden" 
          }
        },
        { 
          ejemplo: "Que estudie María", 
          modoVerbal: false, 
          tipoOracion: false, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Modo subjuntivo", 
            tipoOracion: "Oración desiderativa/yusiva", 
            actoHabla: "Mandato indirecto hacia tercera persona" 
          }
        }
      ]
    },
    {
      name: "Enclisis Pronominal",
      description: "La enclisis como marca esencial del imperativo",
      examples: [
        { 
          ejemplo: "Dámelo", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Imperativo con enclisis pronominal obligatoria", 
            tipoOracion: "Oración imperativa afirmativa con pronombres enclíticos", 
            actoHabla: "Mandato directo" 
          }
        },
        { 
          ejemplo: "No me lo des", 
          modoVerbal: false, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Subjuntivo (forma subrogada por negación)", 
            tipoOracion: "Oración imperativa negativa", 
            actoHabla: "Prohibición (mandato negativo)" 
          }
        },
        { 
          ejemplo: "Siéntense ustedes", 
          modoVerbal: false, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Subjuntivo (forma subrogada para tratamiento de cortesía)", 
            tipoOracion: "Oración imperativa con enclisis", 
            actoHabla: "Mandato formal/cortés" 
          }
        },
        { 
          ejemplo: "Te lo doy ahora", 
          modoVerbal: false, 
          tipoOracion: false, 
          actoHabla: false, 
          analisis: { 
            modoVerbal: "Modo indicativo presente", 
            tipoOracion: "Oración declarativa con pronombres proclíticos", 
            actoHabla: "Aserción/compromiso, no mandato" 
          }
        },
        { 
          ejemplo: "Déselo a Juan", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Imperativo con doble enclisis pronominal", 
            tipoOracion: "Oración imperativa con complementos", 
            actoHabla: "Instrucción directa" 
          }
        }
      ]
    },
    {
      name: "Formas Exclusivas vs Subrogadas",
      description: "Formas propias del imperativo vs subjuntivo subrogado",
      examples: [
        { 
          ejemplo: "Canta tú", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Forma exclusiva imperativa 2ª persona singular", 
            tipoOracion: "Oración imperativa con sujeto explícito focal", 
            actoHabla: "Mandato con énfasis en el destinatario" 
          }
        },
        { 
          ejemplo: "Cante usted", 
          modoVerbal: false, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Subjuntivo (forma subrogada para tratamiento usted)", 
            tipoOracion: "Oración imperativa de cortesía", 
            actoHabla: "Mandato formal" 
          }
        },
        { 
          ejemplo: "Cantad vosotros", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Forma exclusiva imperativa 2ª persona plural", 
            tipoOracion: "Oración imperativa (uso peninsular)", 
            actoHabla: "Mandato directo plural" 
          }
        },
        { 
          ejemplo: "No cantes", 
          modoVerbal: false, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Subjuntivo (el imperativo es incompatible con negación)", 
            tipoOracion: "Oración imperativa negativa", 
            actoHabla: "Prohibición" 
          }
        },
        { 
          ejemplo: "Canten ustedes", 
          modoVerbal: false, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Subjuntivo (forma subrogada para ustedes)", 
            tipoOracion: "Oración imperativa formal plural", 
            actoHabla: "Mandato cortés a grupo" 
          }
        }
      ]
    },
    {
      name: "Control y Agentividad",
      description: "Verbos controlables vs no controlables",
      examples: [
        { 
          ejemplo: "Sé feliz", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Imperativo del verbo 'ser'", 
            tipoOracion: "Oración imperativa con predicado controlable", 
            actoHabla: "Consejo/mandato (la felicidad es actitud controlable)" 
          }
        },
        { 
          ejemplo: "Ten paciencia", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Imperativo del verbo 'tener'", 
            tipoOracion: "Oración imperativa con objeto controlable", 
            actoHabla: "Exhortación (la paciencia es controlable)" 
          }
        },
        { 
          ejemplo: "Aprende rápido", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Forma imperativa", 
            tipoOracion: "Oración imperativa con proceso agentivo", 
            actoHabla: "Instrucción (aprender requiere agentividad)" 
          }
        },
        { 
          ejemplo: "Ojalá tengas suerte", 
          modoVerbal: false, 
          tipoOracion: false, 
          actoHabla: false, 
          analisis: { 
            modoVerbal: "Subjuntivo desiderativo", 
            tipoOracion: "Oración desiderativa", 
            actoHabla: "Expresión de deseo, no mandato (suerte no controlable)" 
          }
        },
        { 
          ejemplo: "Descansa bien", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Forma imperativa", 
            tipoOracion: "Oración imperativa", 
            actoHabla: "Consejo/despedida ritualizada" 
          }
        }
      ]
    },
    {
      name: "Orientación Temporal",
      description: "Restricción prospectiva del imperativo",
      examples: [
        { 
          ejemplo: "Ven mañana", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Imperativo con orientación futura", 
            tipoOracion: "Oración imperativa con complemento temporal", 
            actoHabla: "Mandato anclado en tiempo posterior al habla" 
          }
        },
        { 
          ejemplo: "Hazlo ahora mismo", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Imperativo con enclisis", 
            tipoOracion: "Oración imperativa de cumplimiento inmediato", 
            actoHabla: "Orden urgente (tiempo simultáneo al habla)" 
          }
        },
        { 
          ejemplo: "Termínalo para las cinco", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Imperativo con plazo", 
            tipoOracion: "Oración imperativa con límite temporal", 
            actoHabla: "Instrucción con deadline prospectivo" 
          }
        },
        { 
          ejemplo: "Ya lo habrás terminado", 
          modoVerbal: false, 
          tipoOracion: false, 
          actoHabla: false, 
          analisis: { 
            modoVerbal: "Futuro perfecto de indicativo", 
            tipoOracion: "Oración declarativa", 
            actoHabla: "Suposición sobre acción completada, no mandato" 
          }
        },
        { 
          ejemplo: "Lee este libro hoy", 
          modoVerbal: true, 
          tipoOracion: true, 
          actoHabla: true, 
          analisis: { 
            modoVerbal: "Imperativo", 
            tipoOracion: "Oración imperativa con objeto y tiempo", 
            actoHabla: "Mandato con cumplimiento en el día presente" 
          }
        }
      ]
    }
  ];

  const currentSet = exampleSets[selectedSet];
  
  const toggleAnalysis = () => setShowAnalysis(!showAnalysis);
  
  const nextExample = () => {
    setCurrentExample(prev => (prev + 1) % currentSet.examples.length);
    setShowAnalysis(false);
  };

  const changeSet = (setIndex: number) => {
    setSelectedSet(setIndex);
    setCurrentExample(0);
    setShowAnalysis(false);
  };

  return (
    <div className="flex flex-col p-3 md:p-4 bg-white rounded-lg shadow-xl h-full" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div style={{ backgroundColor: diap15Colors.lila }} className="p-3 md:p-4 rounded-t-lg">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace', color: diap15Colors.azulOscuro }}>¡TRIPLE IMPERATIVO!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap15Colors.blanco }}>Modo Verbal, Tipo de Oración y Acto de Habla</h4>
      </div>

      {/* Selector de Sets */}
      <div className="p-2 md:p-3 mb-2 flex flex-wrap gap-1 md:gap-2 justify-center" style={{ backgroundColor: diap15Colors.grisClaro }}>
        {exampleSets.map((set, index) => (
          <button
            key={index}
            onClick={() => changeSet(index)}
            className={`px-2 py-1 md:px-3 md:py-1.5 rounded text-xs md:text-sm transition-all ${
              selectedSet === index ? 'font-bold shadow-lg' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: selectedSet === index ? diap15Colors.amarillo : diap15Colors.blanco,
              color: selectedSet === index ? diap15Colors.azulOscuro : diap15Colors.grisOscuro,
              fontFamily: 'Raleway Semibold, sans-serif'
            }}
          >
            {set.name}
          </button>
        ))}
      </div>

      <div className="p-2 md:p-3 mb-1 rounded-lg text-center" style={{ backgroundColor: diap15Colors.amarillo+'20' }}>
        <p className="text-xs md:text-sm font-medium" style={{ color: diap15Colors.azulOscuro }}>{currentSet.description}</p>
      </div>

      <div className="p-3 md:p-4 mb-2 md:mb-3 rounded-lg" style={{ backgroundColor: diap15Colors.azulOscuro+'15' }}>
        <div className="grid grid-cols-3 gap-1 md:gap-2 text-center text-xs md:text-sm">
          <div className="p-1 md:p-2 rounded" style={{backgroundColor: diap15Colors.verdeClaro+'80'}}>
            <strong style={{color: diap15Colors.verdeTurquesa}}>MODO VERBAL</strong><br/>Forma morfológica
          </div>
          <div className="p-1 md:p-2 rounded" style={{backgroundColor: diap15Colors.amarillo+'80'}}>
            <strong style={{color: diap15Colors.azulOscuro}}>TIPO ORACIÓN</strong><br/>Unidad sintáctica
          </div>
          <div className="p-1 md:p-2 rounded" style={{backgroundColor: diap15Colors.lila+'80'}}>
            <strong style={{color: diap15Colors.azulOscuro}}>ACTO DE HABLA</strong><br/>Fuerza ilocutiva
          </div>
        </div>
      </div>
      
      <div className="flex-grow p-3 md:p-6 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap15Colors.grisClaro }}>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ color: diap15Colors.azulOscuro }}>
            "{currentSet.examples[currentExample].ejemplo}"
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
          {[
            { title: "📝 MODO", condition: currentSet.examples[currentExample].modoVerbal, question: "¿Forma imperativa?", color: diap15Colors.verdeTurquesa },
            { title: "🏗️ ORACIÓN", condition: currentSet.examples[currentExample].tipoOracion, question: "¿Tipo imperativo?", color: diap15Colors.amarillo },
            { title: "💬 ACTO", condition: currentSet.examples[currentExample].actoHabla, question: "¿Fuerza de mandato?", color: diap15Colors.lila }
          ].map(item => (
            <div key={item.title} className={`p-2 md:p-4 rounded-lg text-center border-2`}
                 style={{ 
                   backgroundColor: showAnalysis ? (item.condition ? item.color+'30' : diap15Colors.grisMedio+'30') : diap15Colors.blanco, 
                   borderColor: showAnalysis ? (item.condition ? item.color : diap15Colors.grisMedio) : diap15Colors.grisClaro 
                 }}>
              <h5 className="font-bold mb-1 md:mb-2 text-xs sm:text-sm md:text-base" 
                  style={{ 
                    fontFamily: 'Raleway Bold, sans-serif', 
                    color: showAnalysis ? (item.condition ? item.color : diap15Colors.grisOscuro) : diap15Colors.azulOscuro 
                  }}>
                {item.title}
              </h5>
              <div className="text-xl md:text-2xl mb-1 md:mb-2">
                {showAnalysis ? (item.condition ? '✅' : '❌') : '❓'}
              </div>
              <p className="text-xs" style={{color: diap15Colors.grisOscuro}}>{item.question}</p>
            </div>
          ))}
        </div>
        
        {showAnalysis && (
          <motion.div {...diap15Animations.fadeIn} className="p-3 md:p-4 rounded-lg" style={{ backgroundColor: diap15Colors.amarillo+'30' }}>
            <h5 className="font-bold mb-2 md:mb-3" style={{ color: diap15Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>🔍 ANÁLISIS LINGÜÍSTICO:</h5>
            <div className="grid grid-cols-1 gap-1 md:gap-2 text-xs md:text-sm">
              <p><strong>Modo verbal:</strong> {currentSet.examples[currentExample].analisis.modoVerbal}</p>
              <p><strong>Tipo de oración:</strong> {currentSet.examples[currentExample].analisis.tipoOracion}</p>
              <p><strong>Acto de habla:</strong> {currentSet.examples[currentExample].analisis.actoHabla}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 md:p-4 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap15Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-2" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap15Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap15Colors.grisOscuro }}>
          La distinción entre estos tres niveles es crucial para el procesamiento del lenguaje natural. Una IA debe reconocer que una misma intención comunicativa (acto de habla) puede expresarse mediante diferentes formas gramaticales.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <button 
          className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg mb-2 sm:mb-0 text-xs md:text-sm"
          style={{ backgroundColor: diap15Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={toggleAnalysis}
        >
          {showAnalysis ? 'Ocultar Análisis' : '🔍 Mostrar Análisis'}
        </button>
        <button 
          className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: diap15Colors.lila, color: diap15Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={nextExample}
        >
          Siguiente Ejemplo ({currentExample + 1}/{currentSet.examples.length})
        </button>
      </div>
      <div className="mt-2 text-center text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>
        Set: {currentSet.name} - Ejemplo {currentExample + 1} de {currentSet.examples.length}
      </div>
    </div>
  );
};

// SUB-DIAPOSITIVA 5: IMPERATIVOS ESPECIALES - Movida fuera
const ImperativosEspeciales = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const examples = [
    { imperativo: "Cásate y serás feliz", tipo: "condicional", funcionReal: "Condición", parafrasis: "Si te casas, serás feliz", explicacion: "No es una orden real, sino una estructura condicional" },
    { imperativo: "Vete tú a buscar farmacia a estas horas", tipo: "retorico", funcionReal: "Evaluación irónica", parafrasis: "Es imposible/difícil encontrar farmacia a estas horas", explicacion: "Expresa ironía o imposibilidad, no una orden literal" },
    { imperativo: "Agítese antes de usar", tipo: "pasivo", funcionReal: "Instrucción diferida", parafrasis: "Quien use esto debe agitarlo antes", explicacion: "Orden dirigida a un destinatario futuro no presente" },
    { imperativo: "Come más y engordarás", tipo: "condicional", funcionReal: "Advertencia/Consecuencia", parafrasis: "Si comes más, engordarás", explicacion: "Expresa una consecuencia, no una recomendación" },
    { imperativo: "Prepárense las patatas", tipo: "pasivo", funcionReal: "Instrucción de receta", parafrasis: "Alguien debe preparar las patatas", explicacion: "Instrucción general sin destinatario específico presente" }
  ];

  const checkType = (tipo: string) => {
    setSelectedType(tipo);
    setShowInterpretation(true);
  };
  const nextExample = () => {
    setCurrentExample(prev => (prev + 1) % examples.length);
    setShowInterpretation(false);
    setSelectedType('');
  };

  return (
    <div className="flex flex-col p-3 md:p-4 bg-white rounded-lg shadow-xl h-full" style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div style={{ backgroundColor: diap15Colors.negro }} className="text-white p-3 md:p-4 rounded-t-lg">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace' }}>¡IMPERATIVOS ESPECIALES!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap15Colors.lila }}>Más Allá del Mandato: Actos de Habla Creativos 🎭✨</h4>
      </div>

      <div className="p-3 md:p-4 mb-2 md:mb-3 rounded-lg" style={{ backgroundColor: diap15Colors.lila+'30' }}>
        <div className="grid grid-cols-3 gap-1 md:gap-2 text-center text-xs">
          {[
            { label: "CONDICIONALES", detail: "Expresan consecuencias", color: diap15Colors.verdeTurquesa },
            { label: "RETÓRICOS", detail: "Ironía o imposibilidad", color: diap15Colors.amarillo },
            { label: "PASIVOS", detail: "Destinatario ausente", color: diap15Colors.lila }
          ].map(item => (
            <div key={item.label} className="p-1 md:p-2 rounded" style={{backgroundColor: item.color+'30'}}>
              <strong style={{color: item.color, fontFamily: 'Raleway Bold, sans-serif'}}>{item.label}</strong><br/>{item.detail}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow p-3 md:p-6 rounded-lg mb-2 md:mb-3 min-h-[200px] md:min-h-[250px]" style={{ backgroundColor: diap15Colors.grisClaro }}>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: diap15Colors.negro }}>
            "{examples[currentExample].imperativo}"
          </p>
          <p className="text-xs md:text-sm mb-3 md:mb-4" style={{color: diap15Colors.grisOscuro}}>🎭 ¿Qué tipo de imperativo especial es?</p>
        </div>
        
        {!showInterpretation ? (
          <motion.div {...diap15Animations.fadeIn} className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4">
            {[
              { label: "CONDICIONAL", type: "condicional", color: diap15Colors.verdeTurquesa, detail: "(consecuencia)" },
              { label: "RETÓRICO", type: "retorico", color: diap15Colors.amarillo, detail: "(ironía)", textColor: diap15Colors.azulOscuro },
              { label: "PASIVO", type: "pasivo", color: diap15Colors.lila, detail: "(diferido)", textColor: diap15Colors.azulOscuro }
            ].map(item => (
              <button 
                key={item.type}
                className="w-full sm:w-auto px-3 py-2 md:px-6 md:py-3 text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
                style={{ backgroundColor: item.color, color: item.textColor || diap15Colors.blanco, fontFamily: 'Raleway Semibold, sans-serif' }}
                onClick={() => checkType(item.type)}
              >
                🔄 {item.label}<br/>
                <span className="text-xs">{item.detail}</span>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div {...diap15Animations.scaleIn}>
            <div className={`p-3 md:p-4 rounded-lg mb-3 md:mb-4 border-2 ${
              selectedType === examples[currentExample].tipo ? 'border-green-500' : 'border-red-500'
            }`} style={{ backgroundColor: selectedType === examples[currentExample].tipo ? diap15Colors.exito+'30' : diap15Colors.error+'30' }}>
              <h5 className={`font-bold text-lg ${
                selectedType === examples[currentExample].tipo ? 'text-green-700' : 'text-red-700'
              }`} style={{ fontFamily: 'Raleway Bold, sans-serif' }}>
                {selectedType === examples[currentExample].tipo ? '🎉 ¡CORRECTO!' : '❌ Incorrecto'}
              </h5>
              <p className="mt-2 text-sm md:text-base">
                <strong>Tipo correcto:</strong> {examples[currentExample].tipo.toUpperCase()}
              </p>
            </div>
            
            <div className="p-3 md:p-4 rounded-lg" style={{ backgroundColor: diap15Colors.amarillo+'30' }}>
              <h5 className="font-bold mb-2" style={{ color: diap15Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>🔍 INTERPRETACIÓN:</h5>
              <p className="mb-1 md:mb-2 text-sm md:text-base"><strong>Función real:</strong> {examples[currentExample].funcionReal}</p>
              <p className="mb-1 md:mb-2 text-sm md:text-base"><strong>Paráfrasis:</strong> "{examples[currentExample].parafrasis}"</p>
              <p className="text-xs md:text-sm"><strong>Explicación:</strong> {examples[currentExample].explicacion}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 md:p-4 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap15Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-2" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap15Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap15Colors.grisOscuro }}>
          Estos representan el mayor desafío para la IA, requieren inferencia pragmática avanzada. Interpretar literalmente "Vete tú a encontrar trabajo" como orden real fallaría en captar la ironía.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <div className="text-xs md:text-sm mb-2 sm:mb-0" style={{color: diap15Colors.grisOscuro, fontFamily: 'Raleway Medium, sans-serif'}}>
          💡 Clave: Inferencia pragmática en contexto
        </div>
        <button 
          className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: diap15Colors.negro, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={nextExample}
        >
          Siguiente Especial
        </button>
      </div>
      <div className="mt-2 text-center text-xs md:text-sm" style={{color: diap15Colors.grisOscuro}}>
        Ejemplo {currentExample + 1} de {examples.length}
      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL
const Diapositiva15 = () => {
  const [currentSubSlide, setCurrentSubSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const subSlideComponents = [
    DetectiveModalidades,
    BatallaModalidades,
    OracionEnunciado,
    TripleImperativo,
    ImperativosEspeciales
  ];

  const subSlideTitles = [
    "¡DETECTIVE DE MODALIDADES!",
    "¡BATALLA DE MODALIDADES!",
    "¡ORACIÓN VS ENUNCIADO!",
    "¡TRIPLE IMPERATIVO!",
    "¡IMPERATIVOS ESPECIALES!"
  ];

  const nextSubSlide = () => {
    setCurrentSubSlide(prev => Math.min(prev + 1, subSlideComponents.length - 1));
  };
  
  const prevSubSlide = () => {
    setCurrentSubSlide(prev => Math.max(prev - 1, 0));
  };
  
  const goToSubSlide = (index: number) => {
    setCurrentSubSlide(index);
  };

  const CurrentSubSlideComponent = subSlideComponents[currentSubSlide];

  return (
    <div 
      className="h-screen flex flex-col p-2 md:p-4 relative overflow-hidden" 
      style={{ 
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${diap15Colors.verdeTurquesa}25 0%, transparent 60%)`,
      }}
    >
      <motion.div {...diap15Animations.fadeIn} className="mb-2 text-center">
        <h1 className="text-lg md:text-2xl font-bold" style={{ fontFamily: 'Aglet Mono, monospace', color: diap15Colors.azulOscuro }}>
          Complejidad en la Interpretación Oral
        </h1>
        <h2 className="text-sm md:text-base mt-1" style={{ fontFamily: 'Raleway, sans-serif', color: diap15Colors.verdeTurquesa }}>
          Un ejemplo con los Imperativos en ELE y su tratamiento por IA
        </h2>
      </motion.div>
      
      <div className="flex-grow mb-2 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSubSlide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full"
          >
            <CurrentSubSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <motion.div 
        {...diap15Animations.fadeIn} 
        transition={{delay:0.3}} 
        className="p-2 md:p-3 rounded-lg mt-auto" 
        style={{ 
            backgroundColor: diap15Colors.blanco + 'A6',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${diap15Colors.amarillo}66`
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <button 
            className="px-2 py-1 md:px-3 md:py-2 text-white rounded-lg text-xs mb-2 sm:mb-0"
            style={{ backgroundColor: currentSubSlide === 0 ? diap15Colors.grisMedio : diap15Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
            onClick={prevSubSlide}
            disabled={currentSubSlide === 0}
          >
            ◀ Anterior
          </button>
          
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 my-2 sm:my-0">
            {subSlideTitles.map((_, index) => (
              <button
                key={index}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm transition-all duration-300 ${
                  currentSubSlide === index ? 'transform scale-125' : ''
                }`}
                style={{ 
                  backgroundColor: currentSubSlide === index ? diap15Colors.amarillo : diap15Colors.grisMedio,
                  color: currentSubSlide === index ? diap15Colors.azulOscuro : diap15Colors.blanco,
                  fontFamily: 'Raleway Bold, sans-serif'
                }}
                onClick={() => goToSubSlide(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button 
            className="px-2 py-1 md:px-3 md:py-2 text-white rounded-lg text-xs"
            style={{ backgroundColor: currentSubSlide === subSlideComponents.length - 1 ? diap15Colors.grisMedio : diap15Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
            onClick={nextSubSlide}
            disabled={currentSubSlide === subSlideComponents.length - 1}
          >
            Siguiente ▶
          </button>
        </div>
        
        <div className="mt-2 text-center text-xs" style={{color: diap15Colors.grisOscuro}}>
          <p className="font-medium" style={{fontFamily: 'Raleway Medium, sans-serif'}}>Tiempo recomendado: 2-3 minutos por actividad</p>
          <p style={{fontFamily: 'Raleway, sans-serif'}}>Actividad {currentSubSlide + 1} de {subSlideComponents.length} - <span style={{fontFamily: 'Raleway Semibold, sans-serif'}}>{subSlideTitles[currentSubSlide]}</span></p>
        </div>
      </motion.div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 15
// =======================================================================
// =======================================================================
// DIAPOSITIVA 16: AGRADECIMIENTO CON Dziękuję INTERACTIVO Y ANIMADO
// =======================================================================

const Diapositiva16 = ({
  colors = {
    azulOscuro: '#2C3E50',
    verdeTurquesa: '#16A085',
    blanco: '#FFFFFF',
    grisClaro: '#ECEFF1',
    lila: '#D2CDEB',
    verdeClaro: '#D9E4C8',
    grisOscuro: '#555555'
  }
}) => {
  const mousePos = { x: 50, y: 50 };
  const [flyingWords, setFlyingWords] = useState<Array<{
    id: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
    size: number,
    opacity: number,
    rotation: number,
    rotationSpeed: number
  }>>([]);
  const [showElements, setShowElements] = useState({
    logo: false,
    title: false,
    subtitle: false,
    info: false
  });

  // Añadir una "Dziękuję" voladora al hacer click o cada pocos segundos
  useEffect(() => {
    // Creador automático cada 600ms
    const interval = setInterval(() => {
      createFlyingWord();
    }, 600);

    // Crear volando onClick
    const handleClick = (e: MouseEvent) => {
      createFlyingWord(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line
  }, []);

  // Animación de vuelo (posición, opacidad, rotación)
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setFlyingWords(words =>
        words
          .map(word => ({
            ...word,
            x: word.x + word.dx,
            y: word.y + word.dy,
            opacity: word.opacity - 0.008,
            rotation: word.rotation + word.rotationSpeed
          }))
          .filter(word => word.opacity > 0 && word.y > -60 && word.x > -200 && word.x < window.innerWidth + 200)
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  function createFlyingWord(x?: number, y?: number) {
    // Aparece en zona inferior si no hay mouse
    const startX = x ?? Math.random() * window.innerWidth;
    const startY = y ?? window.innerHeight * 0.6 + Math.random() * window.innerHeight * 0.3;

    // Trayectoria y tamaño aleatorios
    const dx = (Math.random() - 0.5) * 1.2; // -0.6 a 0.6 px/frame
    const dy = - (1.3 + Math.random() * 1.2); // -1.3 a -2.5 px/frame (sube)
    const size = 20 + Math.random() * 25; // px
    const rotation = Math.random() * 360;
    const rotationSpeed = (Math.random() - 0.5) * 0.4; // -0.2 a 0.2 deg/frame

    setFlyingWords(words => [
      ...words,
      {
        id: Date.now() + Math.random(),
        x: startX,
        y: startY,
        dx,
        dy,
        size,
        opacity: 0.25 + Math.random() * 0.17, // 0.25 - 0.42
        rotation,
        rotationSpeed
      }
    ]);
  }

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({ ...prev, logo: true })), 300),
      setTimeout(() => setShowElements(prev => ({ ...prev, title: true })), 600),
      setTimeout(() => setShowElements(prev => ({ ...prev, subtitle: true })), 900),
      setTimeout(() => setShowElements(prev => ({ ...prev, info: true })), 1200)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const uniformColor = colors.azulOscuro;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${colors.lila} 0%, ${colors.verdeClaro} 100%)`
      }}
    >
      {/* Gradiente interactivo */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${colors.verdeTurquesa}25 0%, transparent 60%)`,
          transition: 'background 0.5s ease'
        }}
      />

      {/* Gracias voladoras */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {flyingWords.map(word => (
          <span
            key={word.id}
            style={{
              position: 'absolute',
              left: word.x,
              top: word.y,
              fontFamily: 'Aglet Mono, monospace',
              fontWeight: 700,
              fontSize: `${word.size}px`,
              color: uniformColor,
              opacity: word.opacity,
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '2.2px',
              textShadow: '0 2px 8px rgba(0,0,0,0.07)',
              transform: `rotate(${word.rotation}deg)`
            }}
          >
            Gracias
          </span>
        ))}
      </div>

      <div className="relative z-20 h-screen flex flex-col p-8">
        {/* Logo GRANDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: showElements.logo ? 1 : 0,
            scale: showElements.logo ? 1 : 0.5
          }}
          transition={{ duration: 1, type: "spring" }}
          className="absolute top-0 left-0"
        >
          <img
            src="/hablandis.png"
            alt="Hablandis"
            className="h-80"
            style={{
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
              maxWidth: '400px'
            }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              img.parentElement!.innerHTML = `
                <div style="padding: 30px;">
                  <div style="font-family: 'Aglet Mono', monospace; color: ${uniformColor}; font-size: 72px; font-weight: 900;">
                    Hablandis
                  </div>
                  <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 20px; margin-top: 10px;">
                    Centro Internacional de Idiomas
                  </div>
                </div>
              `;
            }}
          />
        </motion.div>

        {/* Contenido central */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-6xl">

            {/* ¡MUCHAS GRACIAS! */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: showElements.title ? 1 : 0,
                y: showElements.title ? 0 : 50
              }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="mb-12"
            >
              <h1
                style={{
                  fontFamily: 'Aglet Mono, monospace',
                  fontSize: '70px',
                  fontWeight: 900,
                  letterSpacing: '4px',
                  color: uniformColor,
                  textShadow: '0 8px 40px rgba(0,0,0,0.07)',
                }}
              >
                ¡MUCHAS GRACIAS!
              </h1>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: showElements.subtitle ? 1 : 0
              }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2
                className="mb-4"
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '36px',
                  fontWeight: 600,
                  color: uniformColor,
                  letterSpacing: '1px'
                }}
              >
                Armando Cruz Crespillo
              </h2>
              <p
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '28px',
                  fontWeight: 500,
                  color: colors.verdeTurquesa,
                  textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  letterSpacing: '1px'
                }}
              >
                hola@hablandis.com
              </p>
            </motion.div>

            {/* Código QR */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: showElements.info ? 1 : 0,
                scale: showElements.info ? 1 : 0.9
              }}
              transition={{ delay: 0.6, type: "spring" }}
              className="mt-16"
            >
              <div
                className="inline-block rounded-3xl px-12 py-8"
                style={{
                  backgroundColor: colors.blanco + '80',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center gap-8">
                  <div className="w-40 h-40 bg-gray-50 rounded-2xl flex items-center justify-center shadow-inner">
                    <img
                      src="/qr.png"
                      alt="QR Code Presentación EVALIA"
                      className="w-full h-full object-contain p-3"
                    />
                  </div>
                  <div className="text-left">
                    <h3 style={{
                      fontFamily: 'Aglet Mono, monospace',
                      fontSize: '28px',
                      fontWeight: 800,
                      color: uniformColor,
                      marginBottom: '8px'
                    }}>
                      Materiales de Presentación
                    </h3>
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '18px',
                      color: colors.grisOscuro
                    }}>
                      Escanea para acceder a recursos y documentación
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Minimalista */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <p className="text-xs" style={{
            fontFamily: 'Raleway, sans-serif',
            color: uniformColor,
            opacity: 0.6
          }}>
            © {new Date().getFullYear()} Hablandis. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

// =======================================================================
// FIN DIAPOSITIVA 16
// =======================================================================

// =======================================================================
// COMPONENTE PRINCIPAL DE PRESENTACIÓN - CORREGIDO
// =======================================================================
const Presentacion = () => {
  const [diapositivaActual, setDiapositivaActual] = useState(1);
  const totalDiapositivas = 16; // Corregido de 20 a 16 diapositivas

  const cambiarDiapositiva = (direccion: 'prev' | 'next') => {
    setDiapositivaActual(actual => {
      if (direccion === 'prev') {
        return actual > 1 ? actual - 1 : 1;
      } else {
        return actual < totalDiapositivas ? actual + 1 : totalDiapositivas;
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        cambiarDiapositiva('next');
      } else if (event.key === 'ArrowLeft') {
        cambiarDiapositiva('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Removida la dependencia innecesaria de totalDiapositivas

  let SlideComponent;
  if (diapositivaActual === 1) SlideComponent = Diapositiva1;
  else if (diapositivaActual === 2) SlideComponent = Diapositiva2;
  else if (diapositivaActual === 3) SlideComponent = Diapositiva3;
  else if (diapositivaActual === 4) SlideComponent = Diapositiva4;
  else if (diapositivaActual === 5) SlideComponent = Diapositiva5;
  else if (diapositivaActual === 6) SlideComponent = Diapositiva6;
  else if (diapositivaActual === 7) SlideComponent = Diapositiva7;
  else if (diapositivaActual === 8) SlideComponent = Diapositiva8;
  else if (diapositivaActual === 9) SlideComponent = Diapositiva9;
  else if (diapositivaActual === 10) SlideComponent = Diapositiva10;
  else if (diapositivaActual === 11) SlideComponent = Diapositiva11;
  else if (diapositivaActual === 12) SlideComponent = Diapositiva12;
  else if (diapositivaActual === 13) SlideComponent = Diapositiva13;
  else if (diapositivaActual === 14) SlideComponent = Diapositiva14;
  else if (diapositivaActual === 15) SlideComponent = Diapositiva15;
  else if (diapositivaActual === 16) SlideComponent = Diapositiva16;
  else {
    // Fallback por si acaso
    SlideComponent = () => <div className="flex items-center justify-center h-screen text-2xl">Diapositiva {diapositivaActual} no encontrada</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {SlideComponent && <SlideComponent />}
      <div className="absolute bottom-4 right-4 flex items-center space-x-3 z-20">
        <button
          className={`p-1.5 rounded-full bg-white bg-opacity-40 text-gray-800 transition-all shadow-sm ${diapositivaActual === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-opacity-60'}`}
          onClick={() => cambiarDiapositiva('prev')}
          disabled={diapositivaActual === 1}
          aria-label="Diapositiva anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          className={`p-1.5 rounded-full bg-white bg-opacity-40 text-gray-800 transition-all shadow-sm ${diapositivaActual === totalDiapositivas ? 'opacity-30 cursor-not-allowed' : 'hover:bg-opacity-60'}`}
          onClick={() => cambiarDiapositiva('next')}
          disabled={diapositivaActual === totalDiapositivas}
          aria-label="Siguiente diapositiva"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Presentacion;