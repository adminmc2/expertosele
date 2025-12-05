import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Wand2, Dice6, BookOpen, Trophy, Grid3x3, Layers, Heart, Users, Brain, Lightbulb, Accessibility, Speaker, Eye, Globe } from 'lucide-react';

// Paleta de colores corporativa Hablandis + EVALIA
const colors = {
  // Colores principales Hablandis
  verdeClaro: '#C4D4A4',      // PANTONE 580 C - Verde suave
  azulOscuro: '#12055F',      // PANTONE 2755 C - Azul profundo
  amarillo: '#FFC846',        // PANTONE 1225 C - Amarillo vibrante
  verdeTurquesa: '#007567',   // PANTONE 3295 C - Verde turquesa
  negro: '#000000',           // Negro puro
  lila: '#B9ABE4',           // PANTONE 2092 C - Lila suave

  // Colores adicionales
  verde: '#007567',          // Alias para verdeTurquesa
  naranja: '#FF9800',        // Naranja para alertas
  verdeHablandis: '#C4D4A4', // Alias para verdeClaro

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
        background: `linear-gradient(135deg, ${colors.verdeClaro}40 0%, ${colors.amarillo}20 50%, ${colors.verdeTurquesa}30 100%)`
      }}
    >
      {/* Efectos de fondo decorativos */}
      <div
        className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{ backgroundColor: colors.amarillo }}
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: colors.verdeTurquesa }}
      />
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
    { imagen: '/uno.png', tipo: 'letra', nombre: 'Tarjeta de pregunta - 1 pto', puntos: 1 },
    { imagen: '/dos.png', tipo: 'letra', nombre: 'Tarjeta de pregunta - 2 ptos', puntos: 2 },
    { imagen: '/tres.png', tipo: 'letra', nombre: 'Tarjeta de pregunta - 3 ptos', puntos: 3 },
    { imagen: '/cuatro.png', tipo: 'letra', nombre: 'Tarjeta de pregunta - 4 ptos', puntos: 4 },
    { imagen: '/cinco.png', tipo: 'letra', nombre: 'Tarjeta de pregunta - 5 ptos', puntos: 5 },
    { imagen: '/conquista.png', tipo: 'accion', nombre: 'CONQUISTA' },
    { imagen: '/defensa.png', tipo: 'accion', nombre: 'ESCUDO' },
    { imagen: '/comodin.png', tipo: 'accion', nombre: 'PALABRA MÁGICA' },
  ];

  return (
    <div className="min-h-screen flex flex-col p-8 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #C4D4A440 0%, #FFC84620 50%, #00756730 100%)'}}>
      {/* Efectos de fondo decorativos */}
      <div
        className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{ backgroundColor: '#FFC846' }}
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: '#007567' }}
      />

      {/* Logo ENORME */}
      <div className="absolute top-0 left-0">
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
                <div style="font-family: 'Aglet Mono', monospace; color: #12055F; font-size: 96px; font-weight: 900;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: #007567; font-size: 24px; margin-top: 10px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </div>
      {/* Título minimalista */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-agletmono text-center mb-12"
        style={{letterSpacing: '1px', color: '#12055F'}}>
        REGLAS OFICIALES Blindapalabras
      </motion.h1>

      {/* Pestañas Material Design */}
      <div className="flex gap-6 justify-center mb-8 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTabActivo(tab.id)}
              className="relative px-3 py-2 font-raleway text-sm transition-all flex flex-col items-center gap-1.5 bg-transparent"
              style={{
                opacity: tabActivo === tab.id ? 1 : 0.6
              }}
            >
              <Icon
                size={20}
                style={{color: tabActivo === tab.id ? tab.color : '#12055F'}}
                strokeWidth={tabActivo === tab.id ? 2.5 : 2}
              />
              <span style={{
                color: tabActivo === tab.id ? tab.color : '#12055F',
                fontWeight: tabActivo === tab.id ? 600 : 400,
                fontSize: '13px'
              }}>
                {tab.label}
              </span>
              {/* Barra indicadora inferior */}
              {tabActivo === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: tab.color }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
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
                    className="rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <img src={carta.imagen} alt={carta.nombre} className="w-full h-56 object-contain p-2" style={{background: 'rgba(255, 255, 255, 0.15)'}} />
                    <div className="p-4 text-center">
                      <h3 className="font-agletmono text-xs" style={{color: '#12055F', fontWeight: 600}}>{carta.nombre}</h3>
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
              <div className="rounded-xl p-10 shadow-sm" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.25)'
              }}>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-agletmono text-4xl mb-6" style={{color: '#12055F'}}>1. PREPARACIÓN (Setup)</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 rounded-lg border-l-4" style={{
                      borderLeftColor: '#12055F',
                      background: 'rgba(18, 5, 95, 0.08)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(18, 5, 95, 0.15)',
                      borderLeft: '4px solid #12055F'
                    }}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#12055F'}}>Mazo Único</h4>
                      <p className="text-xl text-gray-700">Se barajan TODAS las cartas (Letras y Acciones juntas).</p>
                    </div>
                    <div className="p-6 rounded-lg border-l-4" style={{
                      borderLeftColor: '#51CF66',
                      background: 'rgba(81, 207, 102, 0.08)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(81, 207, 102, 0.15)',
                      borderLeft: '4px solid #51CF66'
                    }}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#51CF66'}}>Reparto Inicial</h4>
                      <p className="text-xl text-gray-700">Se reparten <strong>5 cartas</strong> a cada jugador/equipo para empezar. (¡Nadie baja nada todavía!)</p>
                    </div>
                    <div className="p-6 rounded-lg border-l-4" style={{
                      borderLeftColor: '#FFC846',
                      background: 'rgba(255, 200, 70, 0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 200, 70, 0.2)',
                      borderLeft: '4px solid #FFC846'
                    }}>
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
              <div className="rounded-xl p-10 shadow-sm" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.25)'
              }}>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-agletmono text-4xl mb-6" style={{color: '#12055F'}}>2. EL TURNO (La Mecánica "Quiz")</h3>
                    <p className="text-2xl text-gray-700 mb-8">El juego funciona por <strong>turnos rotativos</strong> en sentido del reloj.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 rounded-lg border-l-4" style={{
                      borderLeftColor: '#B9ABE4',
                      background: 'rgba(185, 171, 228, 0.08)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(185, 171, 228, 0.15)',
                      borderLeft: '4px solid #B9ABE4'
                    }}>
                      <h4 className="font-agletmono text-2xl mb-3" style={{color: '#B9ABE4'}}>El Lector</h4>
                      <p className="text-xl text-gray-700">El jugador activo elige una carta de su mano y <strong>lee la pregunta</strong> al jugador de su izquierda.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 rounded-lg border-l-4" style={{
                      borderLeftColor: '#51CF66',
                      background: 'rgba(81, 207, 102, 0.08)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(81, 207, 102, 0.15)',
                      borderLeft: '4px solid #51CF66'
                    }}>
                        <h4 className="font-agletmono text-2xl mb-3" style={{color: '#51CF66'}}>✅ Si ACIERTA</h4>
                        <p className="text-xl text-gray-700">El jugador se queda la carta (gana la Letra) y la pone en su zona de juego.</p>
                      </div>
                      <div className="p-6 rounded-lg border-l-4" style={{
                        borderLeftColor: '#FF6B6B',
                        background: 'rgba(255, 107, 107, 0.08)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 107, 107, 0.15)',
                        borderLeft: '4px solid #FF6B6B'
                      }}>
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
              <div className="rounded-xl p-10 shadow-sm" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.25)'
              }}>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-agletmono text-4xl mb-6" style={{color: '#12055F'}}>3. FASE DE CONSTRUCCIÓN (Tu Colonia)</h3>
                    <p className="text-2xl text-gray-700 mb-8">Con las letras ganadas, los jugadores construyen palabras en su propia zona.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-lg border-l-4" style={{
                      borderLeftColor: '#007567',
                      background: 'rgba(0, 117, 103, 0.08)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0, 117, 103, 0.15)',
                      borderLeft: '4px solid #007567'
                    }}>
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
              <div className="rounded-xl p-10 shadow-sm" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.25)'
              }}>
                <h3 className="font-agletmono text-4xl mb-8" style={{color: '#12055F'}}>4. ACCIONES ESPECIALES (El Conflicto)</h3>
                <p className="text-2xl text-gray-700 mb-8">Se juegan en tu turno <strong>en lugar de construir</strong>.</p>
                <div className="grid grid-cols-3 gap-8">
                  <div className="rounded-lg p-8 border-l-4" style={{
                    borderLeftColor: '#FFC846',
                    background: 'rgba(255, 200, 70, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 200, 70, 0.2)',
                    borderLeft: '4px solid #FFC846'
                  }}>
                    <div className="flex items-center gap-3 mb-4">
                      <Zap size={32} style={{color: '#FFC846'}} strokeWidth={2.5} />
                      <h4 className="font-agletmono text-2xl" style={{color: '#12055F'}}>CONQUISTA</h4>
                    </div>
                    <p className="text-lg text-gray-700 mb-3">🔥 Ataque</p>
                    <p className="text-xl text-gray-700 leading-relaxed">Roba una palabra <strong>vulnerable</strong> de un oponente. Condición: Debes poder <strong>conectarla inmediatamente</strong> a tus propias palabras.</p>
                  </div>

                  <div className="rounded-lg p-8 border-l-4" style={{
                    borderLeftColor: '#007567',
                    background: 'rgba(0, 117, 103, 0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 117, 103, 0.15)',
                    borderLeft: '4px solid #007567'
                  }}>
                    <div className="flex items-center gap-3 mb-4">
                      <Shield size={32} style={{color: '#007567'}} strokeWidth={2.5} />
                      <h4 className="font-agletmono text-2xl" style={{color: '#12055F'}}>ESCUDO</h4>
                    </div>
                    <p className="text-lg text-gray-700 mb-3">🛡️ Defensa</p>
                    <p className="text-xl text-gray-700 leading-relaxed">Protege una palabra <strong>vulnerable</strong> de ser robada.</p>
                  </div>

                  <div className="rounded-lg p-8 border-l-4" style={{
                    borderLeftColor: '#B9ABE4',
                    background: 'rgba(185, 171, 228, 0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(185, 171, 228, 0.15)',
                    borderLeft: '4px solid #B9ABE4'
                  }}>
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
              <div className="rounded-xl p-10 shadow-sm" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.25)'
              }}>
                <div className="space-y-8">
                  <h3 className="font-agletmono text-4xl" style={{color: '#12055F'}}>5. FIN DEL JUEGO</h3>

                  <div className="p-8 rounded-lg border-l-4" style={{
                    borderLeftColor: '#FFC846',
                    background: 'rgba(255, 200, 70, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 200, 70, 0.2)',
                    borderLeft: '4px solid #FFC846'
                  }}>
                    <h4 className="font-agletmono text-2xl mb-4" style={{color: '#FFC846'}}>🎯 VICTORIA INMEDIATA</h4>
                    <p className="text-2xl text-gray-700 leading-relaxed"><strong>Un jugador forma una FRASE de DOS PALABRAS</strong> en su zona (pueden estar cruzadas o no).</p>
                    <p className="text-xl text-gray-600 mt-4">Ejemplo: "GATO" + "GRANDE" = <strong>¡GANA!</strong></p>
                  </div>

                  <div className="p-8 rounded-lg border-l-4" style={{
                    borderLeftColor: '#FF6B6B',
                    background: 'rgba(255, 107, 107, 0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 107, 107, 0.15)',
                    borderLeft: '4px solid #FF6B6B'
                  }}>
                    <h4 className="font-agletmono text-2xl mb-4" style={{color: '#FF6B6B'}}>Fin por Agotamiento</h4>
                    <p className="text-2xl text-gray-700">Si nadie forma 2 palabras: Se acaba cuando <strong>se agota el mazo de robo</strong> y un jugador <strong>se queda sin cartas</strong>.</p>
                  </div>

                  <div className="p-8 rounded-lg border-l-4" style={{
                    borderLeftColor: '#51CF66',
                    background: 'rgba(81, 207, 102, 0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(81, 207, 102, 0.15)',
                    borderLeft: '4px solid #51CF66'
                  }}>
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
// DIAPOSITIVA 3: LABORATORIO DE EXPERIMENTACIÓN
// =======================================================================
const Diapositiva3 = () => {
  const [showElements, setShowElements] = useState({
    logo: false,
    title: false,
    content: false
  });
  
  const [typewriterText, setTypewriterText] = useState('');
  const fullTitle = 'LABORATORIO DE EXPERIMENTACIÓN';
  
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Datos reales de las 6 tarjetas de Errores de Precisión Lingüística (1-6)
  const tarjetasReales = [
    {
      id: 1,
      categoria: 'Errores de Precisión Lingüística',
      enfoque: 'Fundamental',
      prompt: 'Crea 10 ejercicios de gramática alemana para nivel B1 sobre el dativo.',
      problemaTitle: 'Variantes Regionales Incorrectas',
      problema: 'La herramienta genera ejercicios correctos pero utiliza expresiones del alemán suizo como "Velo" en lugar de "Fahrrad" (alemán estándar).',
      accion: 'Especifica la variante exacta: "Crea ejercicios en alemán estándar (Hochdeutsch)" o "Usa español peninsular, no americano".',
      colorCategoria: '#B8D8B8'
    },
    {
      id: 2,
      categoria: 'Errores de Precisión Lingüística',
      enfoque: 'Fundamental',
      prompt: 'Explica cuándo se usa el subjuntivo después de "aunque" en español.',
      problemaTitle: 'Falta de Matices Gramaticales',
      problema: 'La herramienta explica que siempre se usa subjuntivo después de "aunque", ignorando que se puede usar indicativo cuando expresamos certeza.',
      accion: 'Pide ejemplos contrastivos: "Dame ejemplos donde \'aunque\' lleve indicativo y subjuntivo, explicando la diferencia de significado".',
      colorCategoria: '#B8D8B8'
    },
    {
      id: 3,
      categoria: 'Errores de Precisión Lingüística',
      enfoque: 'Fundamental',
      prompt: 'Explica cuándo usar "ser" o "estar" con estos adjetivos: nervioso, listo, rico, aburrido.',
      problemaTitle: 'Simplificación Excesiva de Ser/Estar',
      problema: 'La herramienta ignora que estos adjetivos cambian de significado: "es listo" (inteligente) vs "está listo" (preparado).',
      accion: 'Pide ejemplos específicos contrastivos: "Dame pares de oraciones con el mismo adjetivo mostrando cómo cambia el significado con ser/estar".',
      colorCategoria: '#B8D8B8'
    },
    {
      id: 4,
      categoria: 'Errores de Precisión Lingüística',
      enfoque: 'Fundamental',
      prompt: 'Analiza sintácticamente esta oración: "María corre rápidamente por el parque".',
      problemaTitle: 'Identificación Incorrecta de Funciones',
      problema: 'La herramienta identifica "rápidamente" como objeto directo cuando es un adverbio de modo.',
      accion: 'Pide justificación con pruebas: "Aplica la prueba de sustitución por pronombres para confirmar qué palabras son objetos directos".',
      colorCategoria: '#B8D8B8'
    },
    {
      id: 5,
      categoria: 'Errores de Precisión Lingüística',
      enfoque: 'Fundamental',
      prompt: 'Crea un diálogo formal entre un médico y un paciente para practicar consultas médicas.',
      problemaTitle: 'Mezcla de Registros Formales e Informales',
      problema: 'El diálogo mezcla tratamiento formal inicial con expresiones coloquiales inadecuadas para contexto médico formal.',
      accion: 'Especifica el registro exacto: "Diálogo formal con \'usted\' únicamente. El paciente debe usar \'Doctor/a\' y lenguaje respetuoso".',
      colorCategoria: '#B8D8B8'
    },
    {
      id: 6,
      categoria: 'Errores de Precisión Lingüística',
      enfoque: 'Fundamental',
      prompt: '¿Cómo se dice "costar un ojo de la cara" en español de México?',
      problemaTitle: 'Desconocimiento de Variantes Regionales',
      problema: 'La herramienta ignora que en México es más común "estar carísimo" o "costar un dineral".',
      accion: 'Para variantes regionales especifica: "Dame las expresiones más comunes en México para este concepto, no solo traducciones directas".',
      colorCategoria: '#B8D8B8'
    }
  ];

  // Datos reales de las 6 tarjetas de Competencia Intercultural (7-12)
  const tarjetasInterculturales = [
    {
      id: 7,
      categoria: 'Competencia Intercultural',
      enfoque: 'Fundamental',
      prompt: 'Genera 8 diálogos modelo para enseñar estrategias de cortesía en contextos profesionales a estudiantes latinoamericanos de nivel B2. RESPUESTA GENERADA: "1. - ¿Podría revisar mi informe? - Por supuesto, con mucho gusto. 2. - ¿Tendría tiempo para una reunión? - Sí, cuando guste. 3. - ¿Sería posible cambiar la fecha? - Claro, sin problema..."',
      problemaTitle: 'Homogeneización de Normas Pragmáticas',
      problema: 'Genera fórmulas uniformes sin considerar variaciones culturales latinoamericanas en formalidad y distancia social.',
      accion: 'Requiere clustering cultural por países específicos y precisión en niveles de formalidad variables. Aplicar few-shot prompting con ejemplos contrastivos por país y constraint prompting especificando distribución de frecuencias balanceadas entre registros formales/informales.',
      colorCategoria: '#FFB499'
    },
    {
      id: 8,
      categoria: 'Competencia Intercultural',
      enfoque: 'Fundamental',
      prompt: 'Analiza los actos de habla indirectos en esta conversación telefónica: "- ¿Te apetece que cenemos juntos mañana? - Es que tengo bastante trabajo últimamente".',
      problemaTitle: 'Incomprensión de Implicaturas Culturales',
      problema: 'No identifica el acto de habla indirecto de rechazo cortés. Interpreta literalmente sin reconocer estrategias de cortesía negativa.',
      accion: 'Necesita precisión en identificación de actos de habla indirectos y clustering de estrategias de cortesía por culturas. Aplicar chain of thought prompting solicitando análisis paso a paso y structured prompting con frecuencia balanceada de niveles: literal → pragmático → función social.',
      colorCategoria: '#FFB499'
    },
    {
      id: 9,
      categoria: 'Competencia Intercultural',
      enfoque: 'Fundamental',
      prompt: 'Diseña 6 personajes diversos con profesiones variadas para role-plays sobre presentaciones profesionales, incluyendo nombres de diferentes orígenes culturales.',
      problemaTitle: 'Sesgos de Representación Cultural',
      problema: 'Asigna profesiones estereotipadas según origen étnico implícito en nombres. Reproduce sesgos ocupacionales sistemáticos.',
      accion: 'Requiere clustering balanceado de profesiones por género/origen y precisión en distribución equitativa con frecuencias controladas. Aplicar constraint prompting con restricciones anti-sesgo explícitas y negative prompting prohibiendo estereotipos ocupacionales específicos.',
      colorCategoria: '#FFB499'
    },
    {
      id: 10,
      categoria: 'Competencia Intercultural',
      enfoque: 'Fundamental',
      prompt: 'Proporciona estrategias para declinar invitaciones sociales de manera educada en español, considerando diferentes grados de relación interpersonal.',
      problemaTitle: 'Estrategias Monoculturales de Rechazo',
      problema: 'Propone solo estrategias directas occidentales sin considerar culturas de alta distancia social que requieren mayor indirectness.',
      accion: 'Necesita clustering por culturas directas vs indirectas y precisión en gradación de formalidad con frecuencias de estrategias de atenuación. Aplicar comparative prompting solicitando estrategias contrastivas por culturas y graduated prompting pidiendo niveles escalonados de indirectness.',
      colorCategoria: '#FFB499'
    },
    {
      id: 11,
      categoria: 'Competencia Intercultural',
      enfoque: 'Fundamental',
      prompt: 'Explica el uso pragmático de "igual y" en español mexicano: "¿Vienes a la reunión?" - "Igual y sí voy".',
      problemaTitle: 'Análisis Pragmático Incompleto',
      problema: 'Se limita al significado proposicional sin analizar la función de atenuación de compromiso social específica del contexto mexicano.',
      accion: 'Requiere precisión en análisis de funciones pragmáticas regionales y clustering de marcadores de cortesía por variantes con frecuencia de uso sociolingüístico. Aplicar multi-layer prompting solicitando análisis en múltiples niveles y function-focused prompting pidiendo análisis de función social específica.',
      colorCategoria: '#FFB499'
    },
    {
      id: 12,
      categoria: 'Competencia Intercultural',
      enfoque: 'Fundamental',
      prompt: 'Busca equivalencias funcionales en inglés para "estar en la onda" considerando registro informal y uso generacional en contextos juveniles.',
      problemaTitle: 'Equivalencias Sin Validación Pragmática',
      problema: 'Propone equivalencias sin verificar vigencia generacional actual ni autenticidad en contextos juveniles contemporáneos.',
      accion: 'Necesita clustering por vigencia temporal de expresiones y precisión en registro generacional específico con frecuencias de uso real actual. Aplicar temporal-validation prompting solicitando verificación de vigencia y authenticity-check prompting pidiendo validación en comunidades juveniles específicas.',
      colorCategoria: '#FFB499'
    }
  ];

  // Técnicas de prompting para la columna izquierda
  const tecnicasPrompting = [
    {
      nombre: "Few-shot Prompting",
      descripcion: "Proporciona ejemplos específicos para guiar el comportamiento deseado",
      ejemplo: "Ejemplo: Correcto: 'Él está nervioso (temporal)' vs 'Él es nervioso (carácter)'. Ahora analiza: 'María está/es lista'"
    },
    {
      nombre: "Chain of Thought",
      descripcion: "Guía el razonamiento paso a paso para tareas complejas",
      ejemplo: "Ejemplo: 'Paso 1: Identifica el sujeto. Paso 2: Determina si la acción es temporal o permanente. Paso 3: Elige ser/estar'"
    },
    {
      nombre: "Constraint Prompting",
      descripcion: "Establece limitaciones específicas para evitar sesgos",
      ejemplo: "Ejemplo: 'Crea 10 ejercicios de subjuntivo. RESTRICCIÓN: Solo presente de subjuntivo, no pasado'"
    },
    {
      nombre: "Role Prompting",
      descripcion: "Asigna un rol específico de experto a la IA",
      ejemplo: "Ejemplo: 'Actúa como profesor de ELE certificado por el Instituto Cervantes con 10 años de experiencia'"
    },
    {
      nombre: "Negative Prompting",
      descripcion: "Especifica qué NO debe incluir en la respuesta",
      ejemplo: "Ejemplo: 'Explica presente perfecto pero NO uses ejemplos con verbos irregulares, NO menciones tiempos pasados'"
    },
    {
      nombre: "Contextualized Prompting",
      descripcion: "Proporciona contexto cultural y pragmático rico",
      ejemplo: "Ejemplo: 'Enseña saludos formales para reuniones de negocios en México, considerando jerarquías empresariales'"
    },
    {
      nombre: "Self-Consistency Prompting",
      descripcion: "Genera múltiples respuestas para verificar coherencia",
      ejemplo: "Ejemplo: 'Explica cuándo usar subjuntivo después de \"ojalá\" de 3 maneras diferentes y compáralas'"
    },
    {
      nombre: "Iterative Prompting",
      descripcion: "Refina progresivamente mediante retroalimentación",
      ejemplo: "Ejemplo: 'Mejora este ejercicio basándote en que los estudiantes confundieron pretérito con presente perfecto'"
    },
    {
      nombre: "Meta-Prompting",
      descripcion: "Solicita que la IA genere prompts especializados",
      ejemplo: "Ejemplo: 'Genera 5 prompts diferentes para enseñar pronombres de objeto directo a estudiantes japoneses'"
    },
    {
      nombre: "Step-Back Prompting",
      descripcion: "Retrocede a principios fundamentales antes de responder",
      ejemplo: "Ejemplo: 'Antes de explicar subjuntivo, recuerda los conceptos básicos de modo, tiempo y aspecto verbal'"
    },
    {
      nombre: "Comparative Prompting",
      descripcion: "Utiliza comparaciones sistemáticas entre conceptos",
      ejemplo: "Ejemplo: 'Compara el uso de \"por\" vs \"para\" mostrando 5 pares contrastivos con explicación'"
    },
    {
      nombre: "Scaffolding Prompting",
      descripcion: "Construye apoyo gradual reduciendo complejidad",
      ejemplo: "Ejemplo: 'Nivel 1: Solo presente. Nivel 2: Añade pretérito. Nivel 3: Incluye subjuntivo presente'"
    },
    {
      nombre: "Retrieval Prompting",
      descripcion: "Busca información específica de fuentes concretas",
      ejemplo: "Ejemplo: 'Basándote en el MCER nivel B2, lista competencias específicas para expresar opinión'"
    },
    {
      nombre: "Directional Stimulus Prompting",
      descripcion: "Proporciona pistas direccionales para guiar respuestas",
      ejemplo: "Ejemplo: 'Para explicar diferencias ser/estar, enfócate SOLO en estados temporales vs permanentes'"
    },
    {
      nombre: "Emotional Prompting",
      descripcion: "Incorpora elementos emocionales para mejorar rendimiento",
      ejemplo: "Ejemplo: 'Esto es CRUCIAL para mis estudiantes. Necesito explicación clara de subjuntivo que evite frustración'"
    },
    {
      nombre: "Socratic Method Prompting",
      descripcion: "Utiliza preguntas guía para descubrimiento autónomo",
      ejemplo: "Ejemplo: '¿Qué diferencia hay entre \"Juan canta\" y \"Juan está cantando\"? ¿Cuándo usarías cada uno?'"
    },
    {
      nombre: "Maieutic Prompting",
      descripcion: "Ayuda a extraer conocimiento mediante cuestionamiento",
      ejemplo: "Ejemplo: 'Sin dar la respuesta directa, ayuda al estudiante a descubrir por qué se dice \"estoy contento\" no \"soy contento\"'"
    },
    {
      nombre: "Balanced Prompting",
      descripcion: "Equilibra múltiples aspectos contradictorios en una sola instrucción",
      ejemplo: "Ejemplo: 'Corrige errores gramáticales PERO mantén autoestima del estudiante. Sé honesto PERO motivador'"
    },
    {
      nombre: "RAG-Enhanced Prompting",
      descripcion: "Combina recuperación de información con generación",
      ejemplo: "Ejemplo: 'Usando datos del corpus CREA, explica frecuencia de uso real de futuro simple vs perifrástico'"
    },
    {
      nombre: "Structured Prompting",
      descripcion: "Organiza instrucciones en formatos específicos y estructurados",
      ejemplo: "Ejemplo: 'FORMATO: 1. Objetivo 2. Procedimiento 3. Materiales 4. Evaluación. Crea actividad sobre subjuntivo'"
    },
    {
      nombre: "Graduated Prompting",
      descripcion: "Incrementa gradualmente la complejidad o dificultad",
      ejemplo: "Ejemplo: 'Nivel 1: Solo presente indicativo. Nivel 2: Añade pretérito. Nivel 3: Incluye subjuntivo presente'"
    },
    {
      nombre: "Multi-layer Prompting",
      descripcion: "Solicita análisis en múltiples niveles simultáneamente",
      ejemplo: "Ejemplo: 'Analiza: 1) Nivel literal 2) Nivel pragmático 3) Nivel sociocultural 4) Función comunicativa'"
    },
    {
      nombre: "Function-focused Prompting",
      descripcion: "Especifica la función o propósito exacto que debe cumplir",
      ejemplo: "Ejemplo: 'FUNCIÓN: Evaluación formativa. Crea preguntas que identifiquen errores comunes de ser/estar'"
    },
    {
      nombre: "Temporal-validation Prompting",
      descripcion: "Verifica coherencia temporal y secuencial en contenidos",
      ejemplo: "Ejemplo: 'Asegúrate que cada actividad conecte con la anterior y prepare la siguiente en la secuencia'"
    },
    {
      nombre: "Authenticity-check Prompting",
      descripcion: "Solicita verificación de autenticidad y uso real",
      ejemplo: "Ejemplo: 'Verifica que estas expresiones se usen realmente en contextos juveniles contemporáneos'"
    }
  ];

  // Generación de todas las 50 tarjetas según la tabla original
  const generarTarjetasCompletas = () => {
    // Categorías que generan tarjetas automáticas
    const categorias = [
      { nombre: 'Creación de Textos', cantidad: 6, enfoque: 'Fundamental', color: '#E8F4FD', inicio: 13 },
      { nombre: 'Fallas en Actividades', cantidad: 5, enfoque: 'Común', color: '#FFF9C4', inicio: 19 },
      { nombre: 'Flujo de Trabajo', cantidad: 5, enfoque: 'Común', color: '#98E4D6', inicio: 24 },
      { nombre: 'Limitaciones en Retroalimentación', cantidad: 5, enfoque: 'Común', color: '#F4C2A1', inicio: 29 },
      { nombre: 'Problemas Técnicos', cantidad: 4, enfoque: 'Específico', color: '#E8D4F0', inicio: 34 },
      { nombre: 'Niveles y Progresión', cantidad: 4, enfoque: 'Específico', color: '#FFE4E1', inicio: 38 },
      { nombre: 'Extensión y Formato', cantidad: 4, enfoque: 'Específico', color: '#D6E3F8', inicio: 42 },
      { nombre: 'Variación y Creatividad', cantidad: 0, enfoque: 'Emergente', color: '#E8B892', inicio: 49 }
    ];

    let tarjetas = [...tarjetasReales, ...tarjetasInterculturales]; // Tarjetas 1-6 y 7-12

    // Agregar tarjetas 19-23 de Fallas en Actividades con contenido real
    const fallasActividadesData = [
      {
        id: 19,
        categoria: 'Fallas en Actividades',
        enfoque: 'Común',
        prompt: 'Prompt del profesor: "Crea un ejercicio de comprensión auditiva de selección múltiple para un audio sobre reciclaje urbano, nivel B1. El ejercicio debe tener una pregunta clara con 3 opciones: una correcta y dos incorrectas bien diferenciadas." \n\nEjercicio generado: "Según el audio, ¿cuál es la principal ventaja del reciclaje urbano? a) Es beneficioso para el medio ambiente b) Ayuda a proteger la naturaleza c) Reduce la contaminación ambiental"',
        problemaTitle: 'Opciones de Selección Múltiple Semánticamente Equivalentes',
        problema: 'Las tres opciones son semánticamente equivalentes (todas refieren al mismo beneficio ambiental) sin diferenciación conceptual, imposibilitando la evaluación de comprensión específica del contenido del audio.',
        accion: 'Requiere diferenciar conceptos en dominios distintos y especificar tipos de información diferentes. Aplicar prompting específico: "Crea opciones que evalúen aspectos diferentes: a) beneficio económico, b) impacto social, c) efecto ambiental" y prompting comparativo: "Asegúrate que cada opción requiera haber entendido información específica y distinta del audio".',
        colorCategoria: '#FFF9C4'
      },
      {
        id: 20,
        categoria: 'Fallas en Actividades',
        enfoque: 'Común',
        prompt: 'Prompt del profesor: "Crea 5 actividades comunicativas para practicar el pretérito perfecto con estudiantes A2. Las actividades deben integrar la gramática en situaciones reales de comunicación." \n\nActividades generadas: "Diálogo comunicativo: Ana: \'Buenos días, Pedro. ¿Has desayunado esta mañana?\' Pedro: \'Sí, Ana. He tomado café y he comido tostadas. ¿Y tú? ¿Has desayunado también?\' Ana: \'Por supuesto. He bebido zumo de naranja y he comido cereales. Siempre he sido una persona muy sana.\' Pedro: \'Perfecto. Yo también he mantenido siempre una dieta equilibrada.\'"',
        problemaTitle: 'Actividades de Gramática Sin Contexto Comunicativo',
        problema: 'El diálogo fuerza artificialmente el uso del pretérito perfecto en cada intervención sin propósito comunicativo genuino, resultando en conversación antinatural que nadie tendría en la vida real.',
        accion: 'Requiere situaciones comunicativas auténticas donde la estructura gramatical surja naturalmente. Aplicar prompting contextual: "Crea situación donde necesiten hablar de experiencias recientes relevantes para ellos" y prompting de autenticidad: "El diálogo debe sonar como conversación real entre personas, no como demostración gramatical".',
        colorCategoria: '#FFF9C4'
      },
      {
        id: 21,
        categoria: 'Fallas en Actividades',
        enfoque: 'Común',
        prompt: 'Prompt del profesor: "Diseña una tarea de escritura para estudiantes B1 donde redacten un ensayo argumentativo de 250 palabras sobre redes sociales. Incluye andamiaje y apoyo para completar la tarea exitosamente." \n\nTarea generada: "Escriban un ensayo argumentativo de 250 palabras sobre las ventajas y desventajas de las redes sociales. Deben incluir introducción, desarrollo con argumentos y conclusión. Fecha de entrega: próxima clase."',
        problemaTitle: 'Tareas de Escritura Sin Andamiaje Adecuado',
        problema: 'La tarea no proporciona apoyo estructural, vocabulario específico, modelos textuales o pasos intermedios necesarios para que estudiantes B1 puedan completar exitosamente un ensayo argumentativo.',
        accion: 'Requiere clustering de procesos de escritura secuenciales y frecuencias de apoyo pedagógico graduado. Aplicar multi-layer prompting estructurando pasos intermedios y scaffolding prompting proporcionando marcos, vocabulario y modelos específicos.',
        colorCategoria: '#FFF9C4'
      },
      {
        id: 22,
        categoria: 'Fallas en Actividades',
        enfoque: 'Común',
        prompt: 'Prompt del profesor: "Crea una actividad para practicar las preposiciones de lugar con estudiantes A2. Debe ser clara y apropiada para el nivel." \n\nActividad generada: "Completa las frases usando las preposiciones correctas: en, sobre, bajo, entre, detrás de, delante de, al lado de, a través de, alrededor de, a lo largo de, en el interior de, en medio de. 1) El libro está ___ la mesa. 2) El gato camina ___ el jardín. 3) Los niños corren ___ el río. 4) La pelota rueda ___ toda la cancha."',
        problemaTitle: 'Sobrecarga de Elementos Lingüísticos Sin Consideración Pedagógica',
        problema: 'La actividad presenta 12 preposiciones simultáneamente cuando para A2 es apropiado trabajar con 3-4 preposiciones básicas primero, creando confusión y sobrecarga cognitiva.',
        accion: 'Requiere secuenciación apropiada y cantidad manejable. Aplicar prompting graduado: "Usa solo las 4 preposiciones más básicas: en, sobre, bajo, al lado de" y prompting de progresión: "Introduce nuevas preposiciones después de dominar las básicas".',
        colorCategoria: '#FFF9C4'
      },
      {
        id: 23,
        categoria: 'Fallas en Actividades',
        enfoque: 'Común',
        prompt: 'Prompt del profesor: "Diseña una actividad para que estudiantes A2 practiquen los tiempos pasados en español de manera integrada y efectiva." \n\nActividad generada: "Completa las frases seleccionando del recuadro la colocación verbal correcta y conjugándola en el tiempo adecuado (pretérito perfecto, indefinido, imperfecto, pluscuamperfecto). Recuadro: tomar una decisión, hacer caso, poner en práctica, dar cuenta, llevar a cabo, tener en cuenta. 1) Ayer ___ de que mi hermana ya ___ sus estudios. 2) Cuando era niño siempre ___ a mis padres, pero ahora ___ de ser más independiente."',
        problemaTitle: 'Sobrecarga de Objetivos y Falta de Progresión Pedagógica',
        problema: 'La actividad combina simultáneamente colocaciones complejas, cuatro tiempos verbales y análisis contextual sin evaluar previamente el dominio real del estudiante A2 sobre tiempos pasados básicos. Además, la IA interpreta "A2" según referencias curriculares inconsistentes (MCER vs. Plan Curricular del Instituto Cervantes vs. sistemas nacionales) generando contenidos inadecuados.',
        accion: 'Requiere evaluación diagnóstica previa y especificación curricular precisa. Aplicar prompting diagnóstico: "Primero evalúa qué tiempos pasados domina el estudiante según criterios específicos" y prompting de referencia: "Usa exclusivamente criterios del Plan Curricular del Instituto Cervantes".',
        colorCategoria: '#FFF9C4'
      }
    ];
    
    tarjetas.push(...fallasActividadesData);

    categorias.forEach(cat => {
      for (let i = 0; i < cat.cantidad; i++) {
        const id = cat.inicio + i;
        
        // Casos especiales para categorías con contenido real
        if (cat.nombre === 'Fallas en Actividades') {
          // Las tarjetas 19-23 se agregan arriba con contenido real
          continue;
        } else if (cat.nombre === 'Flujo de Trabajo') {
          const flujoDeTrabajoData = [
            {
              id: 24,
              categoria: 'Flujo de Trabajo',
              enfoque: 'Común',
              prompt: 'Necesito que actúes como un experto pedagogo especializado en enseñanza de español como lengua extranjera con más de 15 años de experiencia en instituciones reconocidas internacionalmente, que entiende perfectamente el Marco Común Europeo de Referencia para las Lenguas y tiene conocimiento profundo de las metodologías comunicativas modernas incluyendo el enfoque por tareas, aprendizaje basado en proyectos y enseñanza mediante historias digitales. Crea un ejercicio de gramática sobre el pretérito indefinido para estudiantes de nivel A2 que hayan completado al menos 80 horas de instrucción formal, considerando que provienen de contextos lingüísticos diversos pero principalmente angloparlantes, que sea engaging, motivador, contextualizado en situaciones reales de la vida cotidiana española contemporánea, que incluya elementos multimedia cuando sea posible, que tenga en cuenta diferentes estilos de aprendizaje (visual, auditivo, kinestésico), que permita evaluación formativa y sumativa, y que esté alineado con los principios del diseño universal para el aprendizaje... RESPUESTA GENERADA: "Como pedagogo experimentado, debo mencionar que el diseño de actividades requiere considerar múltiples factores... En primer lugar, es importante entender que el pretérito indefinido..." (IA se pierde en la introducción, nunca llega al ejercicio concreto)',
              problemaTitle: 'Sobrecarga Informacional de Contexto',
              problema: 'Exceso de especificaciones contextuales causa que la IA se enfoque en el marco teórico en lugar del objetivo principal, diluyendo la precisión del output.',
              accion: 'Requiere precision en jerarquización de prioridades y clustering de instrucciones esenciales. Aplicar constraint prompting con máximo 3 especificaciones y function-focused prompting priorizando el objetivo central.',
              colorCategoria: '#98E4D6'
            },
            {
              id: 25,
              categoria: 'Flujo de Trabajo',
              enfoque: 'Común',
              prompt: 'Crea 10 preguntas de comprensión sobre turismo sostenible para nivel B1. Iteración 2: "Las preguntas son muy básicas, hazlas más desafiantes." Iteración 3: "Ahora son muy difíciles, encuentra un punto medio." Iteración 4: "Incluye una pregunta de opinión personal." Iteración 5: "Cambia el formato a opción múltiple." Iteración 6: "Algunas opciones son muy obvias..."',
              problemaTitle: 'Refinamiento Incremental Ineficiente',
              problema: 'Ausencia de especificaciones completas iniciales genera ciclo de ajustes menores que consume tiempo exponencialmente sin optimizar calidad final.',
              accion: 'Necesita precision en criterios evaluativos y frecuencias de especificación completa. Aplicar structured prompting con todos los parámetros iniciales y multi-layer prompting especificando formato, dificultad y tipo simultáneamente.',
              colorCategoria: '#98E4D6'
            },
            {
              id: 26,
              categoria: 'Flujo de Trabajo',
              enfoque: 'Común',
              prompt: '[Conversación iniciada hace 45 minutos] "Ahora adapta el ejercicio anterior para estudiantes con dislexia y añade las instrucciones de la actividad de role-play que mencionamos antes, pero cambia el tema de la conversación sobre el medio ambiente que creamos al principio por algo relacionado con tecnología, manteniendo el mismo nivel de dificultad que acordamos." RESPUESTA GENERADA: "Me disculpo, pero no tengo registro de ejercicios anteriores específicos. ¿Podrías proporcionarme más detalles sobre el ejercicio base y las características que mencionas?"',
              problemaTitle: 'Ruptura de Contexto Acumulativo',
              problema: 'IA pierde referencias a elementos discutidos previamente en conversaciones extendidas, requiriendo re-especificación constante de contexto ya establecido.',
              accion: 'Requiere clustering de información contextual y precision en referencias incrementales. Aplicar contextualized prompting recapitulando elementos clave y temporal-validation prompting vinculando nuevas instrucciones con outputs previos.',
              colorCategoria: '#98E4D6'
            },
            {
              id: 27,
              categoria: 'Flujo de Trabajo',
              enfoque: 'Común',
              prompt: 'Diseña una unidad didáctica completa sobre "Comida y cultura" para nivel A2: 1) texto de lectura sobre gastronomía española, 2) ejercicios de vocabulario, 3) actividad oral de role-play en restaurante, 4) tarea de escritura descriptiva, 5) evaluación final. Todo debe estar conectado temáticamente. RESPUESTA GENERADA: Texto sobre gastronomía española (paella, tapas) → Vocabulario sobre comida italiana (pasta, pizza) → Role-play en cafetería francesa → Escritura sobre comida casera familiar → Evaluación sobre nutrición y salud (desconectado del tema cultural)',
              problemaTitle: 'Fragmentación Temática en Secuencias Didácticas',
              problema: 'IA genera componentes individuales coherentes pero pierde la conexión temática y progresión lógica entre elementos de una misma unidad didáctica.',
              accion: 'Necesita clustering temático unificado y frecuencias de coherencia transversal. Aplicar chain of thought prompting conectando explícitamente cada elemento y balanced prompting distribuyendo vocabulario común entre actividades.',
              colorCategoria: '#98E4D6'
            },
            {
              id: 28,
              categoria: 'Flujo de Trabajo',
              enfoque: 'Común',
              prompt: 'Crea un examen de gramática español nivel B2 con 25 preguntas sobre subjuntivo, condicional y tiempos pasados. Incluye instrucciones claras para estudiantes. RESPUESTA GENERADA: Examen generado en 30 segundos → 2.5 horas de edición para: corregir errores gramaticales en las opciones, balancear dificultad entre preguntas, ajustar formato para plataforma LMS, verificar clave de respuestas, reescribir instrucciones ambiguas, eliminar preguntas repetitivas, añadir contexto cultural apropiado.',
              problemaTitle: 'Inversión Temporal Contraproductiva',
              problema: 'El tiempo requerido para editar y perfeccionar el contenido generado supera significativamente el tiempo que tomaría crear el material desde cero manualmente.',
              accion: 'Requiere precision en especificaciones técnicas completas y clustering de criterios de calidad. Aplicar graduated prompting especificando niveles de pulimiento y negative prompting excluyendo errores comunes típicos.',
              colorCategoria: '#98E4D6'
            }
          ];
          
          const index = id - 24;
          if (index < flujoDeTrabajoData.length) {
            tarjetas.push(flujoDeTrabajoData[index]);
          }
        } else if (cat.nombre === 'Creación de Textos') {
          const problemasTextosData = [
            {
              id: 13,
              categoria: 'Creación de Textos',
              enfoque: 'Fundamental',
              prompt: 'Prompt del profesor: "Genera una carta de reclamación formal para estudiantes B2 sobre un problema con el servicio de internet. Debe seguir el formato y registro apropiado para correspondencia comercial española." \n\nTexto generado: "Estimados señores: Les escribo para informarles sobre los problemas que estoy experimentando con mi conexión a internet. Desde hace dos semanas, la velocidad de conexión ha disminuido considerablemente y tengo interrupciones frecuentes. Me gustaría que revisaran mi línea y solucionaran este inconveniente lo antes posible. Quedo a la espera de su respuesta. Atentamente, [Nombre]"',
              problemaTitle: 'Textos que No Respetan Géneros Discursivos',
              problema: 'Aunque usa registro formal, falta la estructura específica de reclamación comercial: ausencia de datos de contacto, referencia de contrato, petición de compensación, y plazos específicos de respuesta.',
              accion: 'Requiere clustering de géneros textuales específicos con elementos estructurales obligatorios. Aplicar constraint prompting especificando componentes del género y few-shot prompting con ejemplos de cartas comerciales auténticas.',
              colorCategoria: '#E8F4FD'
            },
            {
              id: 14,
              categoria: 'Creación de Textos',
              enfoque: 'Fundamental',
              prompt: 'Prompt del profesor: "Crea un texto sobre rutinas diarias para estudiantes A2. Debe usar vocabulario y estructuras apropiadas para este nivel específico del MCER." \n\nFragmento generado: "Cada mañana me levanto a las siete. Después de ducharme, desayuno café con tostadas. Luego me dirijo al trabajo en transporte público. Durante la jornada laboral, gestiono diferentes tareas administrativas y coordino reuniones con clientes..."',
              problemaTitle: 'Vocabulario Inadecuado para el Nivel',
              problema: 'El texto combina vocabulario A2 adecuado con términos B1-B2 ("gestiono", "administrativas", "coordino") creando inconsistencia que confunde al estudiante sobre su nivel real.',
              accion: 'Requiere frecuencias léxicas homogéneas por nivel MCER y precisión en rangos de complejidad controlados. Aplicar constraint prompting limitando a listas de vocabulario A2 verificadas y graduated prompting con control de complejidad morfológica.',
              colorCategoria: '#E8F4FD'
            },
            {
              id: 15,
              categoria: 'Creación de Textos',
              enfoque: 'Fundamental',
              prompt: 'Prompt del profesor: "Crea 8 preguntas de comprensión para este artículo sobre inmigración juvenil, nivel B2. Debe incluir preguntas literales, inferenciales y críticas para desarrollar pensamiento analítico." \n\nPreguntas generadas: "1. ¿Cuántos jóvenes emigraron según el texto? 2. ¿En qué año ocurrió esto? 3. ¿Qué países se mencionan? 4. ¿Cuáles son las tres causas citadas? 5. ¿Qué porcentaje representa? 6. ¿Quién es el experto entrevistado? 7. ¿Dónde viven ahora? 8. ¿Cuándo terminó el estudio?"',
              problemaTitle: 'Preguntas Exclusivamente Literales Sin Gradación Cognitiva',
              problema: 'Todas las preguntas evalúan solo comprensión literal (localizar información explícita) sin desarrollar inferencia, interpretación o pensamiento crítico necesario para B2.',
              accion: 'Requiere clustering de tipos de comprensión (literal/inferencial/crítica) y frecuencias balanceadas por nivel cognitivo. Aplicar structured prompting especificando taxonomía de Bloom y graduated prompting escalando dificultad cognitiva progresivamente.',
              colorCategoria: '#E8F4FD'
            },
            {
              id: 16,
              categoria: 'Creación de Textos',
              enfoque: 'Fundamental',
              prompt: 'Prompt del profesor: "Diseña actividades de comprensión lectora para un artículo sobre tecnología y trabajo, nivel B1. Las actividades deben evaluar diferentes estrategias de lectura y comprensión profunda." \n\nActividades generadas: "1. Subraya las palabras que no conoces. 2. Haz un resumen del texto en 3 líneas. 3. Traduce las palabras nuevas. 4. Lee el texto otra vez y responde: ¿Te gusta el tema? 5. Copia la frase más importante."',
              problemaTitle: 'Actividades que No Desarrollan Estrategias de Comprensión',
              problema: 'Las actividades se centran en vocabulario y tareas mecánicas sin desarrollar estrategias cognitivas de comprensión (predicción, inferencia, síntesis, evaluación crítica).',
              accion: 'Requiere clustering de estrategias metacognitivas específicas y frecuencias de procesos cognitivos por nivel. Aplicar function-focused prompting especificando objetivos de comprensión y chain-of-thought prompting desarrollando secuencias cognitivas progresivas.',
              colorCategoria: '#E8F4FD'
            },
            {
              id: 17,
              categoria: 'Creación de Textos',
              enfoque: 'Fundamental',
              prompt: 'Prompt del profesor: "Crea una secuencia completa de actividades de lectura para un reportaje sobre cambio climático, nivel B2. Debe incluir pre-lectura, durante la lectura y post-lectura para maximizar comprensión." \n\nSecuencia generada: "Pre-lectura: Lee el título y responde si te interesa el tema. Durante: Lee el texto completo de una vez. Post-lectura: 1.¿Cuál es la idea principal? 2.¿Estás de acuerdo? 3.Resume en 5 líneas."',
              problemaTitle: 'Secuenciación Pedagógica Inadecuada en Fases de Lectura',
              problema: 'No aprovecha las fases de lectura para activar conocimientos previos, desarrollar estrategias específicas de comprensión o integrar aprendizaje de manera significativa.',
              accion: 'Requiere clustering de estrategias específicas por fase de lectura y frecuencias balanceadas de actividades cognitivas. Aplicar multi-layer prompting estructurando fases con objetivos específicos y temporal-validation prompting asegurando progresión pedagógica coherente.',
              colorCategoria: '#E8F4FD'
            },
            {
              id: 18,
              categoria: 'Creación de Textos',
              enfoque: 'Fundamental',
              prompt: 'Prompt del profesor: "Diseña preguntas de comprensión para un artículo sobre emprendimiento juvenil que realmente evalúen comprensión profunda, no solo localización de información. Nivel B2." \n\nEjemplos generados: "1.¿Cuáles son los tres obstáculos principales que menciona el artículo? 2.¿Qué porcentaje de jóvenes emprendedores tiene éxito según el texto? 3.¿En qué párrafo se habla de financiación? 4.¿Cuál es la definición de emprendimiento que da el autor?"',
              problemaTitle: 'Preguntas que Evalúan Localización en Lugar de Comprensión',
              problema: 'Las preguntas se responden copiando frases directamente del texto sin requerir procesamiento cognitivo, interpretación o integración de información para demostrar comprensión real.',
              accion: 'Requiere clustering de procesos cognitivos evaluables y frecuencias equilibradas entre localización, inferencia y aplicación. Aplicar comparative prompting contrastando preguntas superficiales vs profundas y function-focused prompting especificando objetivos de evaluación cognitiva.',
              colorCategoria: '#E8F4FD'
            }
          ];
          
          const index = id - 13;
          if (index < problemasTextosData.length) {
            tarjetas.push(problemasTextosData[index]);
          }
        } else if (cat.nombre === 'Limitaciones en Retroalimentación') {
          const limitacionesRetroalimentacionData = [
            {
              id: 29,
              categoria: 'Limitaciones en Retroalimentación',
              enfoque: 'Común',
              prompt: 'Prompt del profesor: "Analiza este ensayo de un estudiante B2 sobre migración económica en Europa. Proporciona retroalimentación detallada sobre: cohesión textual, uso de conectores, registro académico, precisión argumental y desarrollo de ideas. El estudiante es economista y necesita feedback específico para mejorar su escritura académica en español." \n\nRespuesta generada: "Tu ensayo está bien estructurado. Hay algunos errores gramaticales menores. Los conectores están bien usados. El vocabulario es apropiado. Podrías mejorar algunos aspectos de cohesión. En general, es un buen trabajo que demuestra comprensión del tema."',
              problemaTitle: 'Evaluación Generalizante Sin Especificidad',
              problema: 'IA proporciona comentarios vagos sin identificar errores específicos, patrones problemáticos o estrategias concretas de mejora, evitando análisis profundo solicitado.',
              accion: 'Requiere precision en criterios evaluativos específicos y clustering de elementos textuales. Aplicar structured prompting con taxonomías de error y function-focused prompting especificando ejemplos concretos del texto.',
              colorCategoria: '#F4C2A1'
            },
            {
              id: 30,
              categoria: 'Limitaciones en Retroalimentación',
              enfoque: 'Común',
              prompt: 'Prompt del profesor: "Este estudiante colombiano de 19 años estudia ingeniería en Barcelona, lleva 6 meses aprendiendo catalán, viene de contexto socioeconómico vulnerable y esta es su primera redacción formal en catalán para una beca universitaria. Necesita feedback que considere su situación específica y le dé confianza mientras mejora aspectos técnicos críticos para el éxito de su solicitud." \n\nRespuesta generada: "El texto presenta varios errores de concordancia y sintaxis. La estructura no es apropiada para escritura formal. Recomiendo revisar las reglas básicas de gramática catalana y practicar más la escritura académica. El vocabulario es limitado y hay interferencias del español."',
              problemaTitle: 'Insensibilidad Contextual y Socioemocional',
              problema: 'IA ignora factores contextuales críticos (situación personal, objetivos específicos, tiempo de aprendizaje) y proporciona feedback desalentador sin consideración pedagógica.',
              accion: 'Necesita clustering contextual multifactorial y frecuencias de feedback constructivo. Aplicar contextualized prompting integrando factores personales y balanced prompting combinando corrección con motivación.',
              colorCategoria: '#F4C2A1'
            },
            {
              id: 31,
              categoria: 'Limitaciones en Retroalimentación',
              enfoque: 'Común',
              prompt: 'Prompt del profesor: "Proporciona feedback conciso y accionable sobre esta presentación oral de 3 minutos de un estudiante A2. El estudiante tiene 15 minutos para revisar antes de la evaluación final. Enfócate en 3 aspectos prioritarios que pueda mejorar inmediatamente." \n\nRespuesta generada: [847 palabras de comentarios] "En primer lugar, es importante reconocer el esfuerzo realizado en esta presentación, ya que hablar en público en una segunda lengua requiere valentía y dedicación. Dicho esto, hay varios aspectos que merecen atención detallada. Comenzando por la pronunciación, se observan dificultades sistemáticas con ciertos fonemas específicos del español que no existen en tu lengua materna..." [continúa con análisis exhaustivo de múltiples aspectos]',
              problemaTitle: 'Desproporción Entre Urgencia y Extensión',
              problema: 'IA genera comentarios excesivamente largos que exceden el tiempo disponible del estudiante y diluyen la información prioritaria en texto secundario.',
              accion: 'Requiere precision en jerarquización temporal y clustering de prioridades inmediatas. Aplicar constraint prompting limitando extensión y graduated prompting priorizando aspectos según urgencia.',
              colorCategoria: '#F4C2A1'
            },
            {
              id: 32,
              categoria: 'Limitaciones en Retroalimentación',
              enfoque: 'Común',
              prompt: 'Prompt del profesor: "Evalúa esta actividad oral según los criterios específicos del examen DELE B1: fluidez, coherencia, corrección gramatical, riqueza léxica, y adecuación funcional. El estudiante se presenta al examen en 2 semanas y necesita saber exactamente qué aspectos trabajar para alcanzar la puntuación mínima de aprobado." \n\nRespuesta generada: "Tu pronunciación ha mejorado mucho y se nota que practicas regularmente. El uso de gestos es muy natural y ayuda a la comunicación. Me gusta cómo incluiste anécdotas personales, eso hace la conversación más interesante. Para seguir mejorando, podrías leer más libros en español y ver series sin subtítulos."',
              problemaTitle: 'Divergencia Entre Evaluación y Estándares Requeridos',
              problema: 'IA ignora criterios de evaluación específicos solicitados y proporciona feedback general irrelevante para objetivos de certificación concretos.',
              accion: 'Necesita clustering de criterios evaluativos oficiales y precision en estándares certificativos. Aplicar constraint prompting limitando comentarios a criterios DELE y function-focused prompting alineando con objetivos específicos.',
              colorCategoria: '#F4C2A1'
            },
            {
              id: 33,
              categoria: 'Limitaciones en Retroalimentación',
              enfoque: 'Común',
              prompt: 'Prompt del profesor: "Proporciona feedback personalizado para estos tres estudiantes diferentes: Maria (brasileña, nivel C1, estudia traducción, perfeccionista, se frustra con errores menores), Ahmed (sirio, nivel A2, refugiado, muy motivado pero inseguro), y Jean (francés, nivel B2, intercambio Erasmus, confiado pero comete errores fosilizados). Todos escribieron sobre el mismo tema pero necesitan enfoques de feedback completamente diferentes." \n\nRespuesta generada: "Para Maria: Tu ensayo muestra buen dominio del idioma. Hay algunas áreas de mejora en cuanto a conectores. Para Ahmed: Tu ensayo muestra buen dominio del idioma. Hay algunas áreas de mejora en cuanto a conectores. Para Jean: Tu ensayo muestra buen dominio del idioma. Hay algunas áreas de mejora en cuanto a conectores."',
              problemaTitle: 'Homogeneización de Perfiles Diferenciados',
              problema: 'IA aplica plantillas idénticas de feedback ignorando características individuales, niveles diferentes y necesidades específicas de cada estudiante.',
              accion: 'Requiere clustering de perfiles estudiantiles y frecuencias de personalización adaptativa. Aplicar comparative prompting diferenciando explícitamente entre estudiantes y multi-layer prompting especificando enfoques individualizados.',
              colorCategoria: '#F4C2A1'
            }
          ];
          
          const index = id - 29;
          if (index < limitacionesRetroalimentacionData.length) {
            tarjetas.push(limitacionesRetroalimentacionData[index]);
          }
        } else if (cat.nombre === 'Problemas Técnicos') {
          const problemasTecnicosData = [
            {
              id: 34,
              categoria: 'Problemas Técnicos',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Diseña una actividad comunicativa sobre el tema \'vacaciones de verano\' para estudiantes nivel B1. Debe durar 20 minutos e incluir interacción oral." \n\nEjecución 1: Role-play en parejas + 6 preguntas guía (formato estructurado) \nEjecución 2: Debate grupal + presentación individual (formato abierto) \nEjecución 3: Cuestionario + discusión plenaria (formato mixto)',
              problemaTitle: 'Variabilidad de Formato en Instrucciones Idénticas',
              problema: 'IA genera diferentes metodologías pedagógicas (role-play vs. debate vs. cuestionario) para la misma instrucción. Esto impide planificar secuencias didácticas coherentes porque cada formato evalúa competencias diferentes, requiere preparación distinta del aula y criterios de evaluación incompatibles.',
              accion: 'Requiere precision en especificación metodológica y clustering de formatos pedagógicos consistentes. Aplicar constraint prompting especificando "role-play en parejas" (no solo "actividad comunicativa") y structured prompting fijando metodología+organización+materiales para evitar variabilidad curricular.',
              colorCategoria: '#E8D4F0'
            },
            {
              id: 35,
              categoria: 'Problemas Técnicos',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Necesito 3 referencias académicas recientes (2020-2024) sobre adquisición de lenguas extranjeras en contextos de inmersión digital para incluir en mi investigación sobre enseñanza virtual post-COVID." \n\nRespuesta generada: "1. García-Mendoza, L. & Villanueva, R. (2023). \'Digital Immersion and L2 Acquisition in Post-Pandemic Contexts.\' Journal of Applied Linguistics, 45(3), 234-267. DOI: 10.1080/jal.2023.8847291 2. Thompson, K., Lee, S. & Martinez, C. (2022). \'Virtual Reality and Language Learning Efficacy.\' Modern Language Teaching, 38(7), 445-482..."',
              problemaTitle: 'Fabricación de Fuentes Académicas Falsas',
              problema: 'IA genera referencias bibliográficas inexistentes con estructura realista, creando DOIs falsos y autores ficticios que parecen auténticos.',
              accion: 'Necesita clustering de limitaciones de conocimiento y frecuencias de verificabilidad. Aplicar negative prompting excluyendo citas específicas y authenticity-check prompting solicitando solo conceptos generales verificables.',
              colorCategoria: '#E8D4F0'
            },
            {
              id: 36,
              categoria: 'Problemas Técnicos',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Adapta este texto sobre tecnología para estudiantes de nivel A1. El vocabulario debe limitarse a las 1000 palabras más frecuentes del español. Evita tiempos verbales complejos y estructuras sintácticas avanzadas." \n\nRespuesta generada: "La inteligencia artificial constituye una herramienta fundamental cuya implementación ha revolucionado paradigmas tecnológicos contemporáneos. Los algoritmos de machine learning posibilitan que dispositivos autónomos ejecuten tareas cognitivas sofisticadas mediante procesamiento de datasets masivos..."',
              problemaTitle: 'Incomprensión de Escalas de Competencia Lingüística',
              problema: 'IA no diferencia realmente entre niveles del MCER, generando contenido con complejidad inversa a la solicitada debido a activación de corpus especializados.',
              accion: 'Requiere clustering léxico por frecuencias MCER y precision en límites sintácticos. Aplicar constraint prompting con listas de vocabulario específicas y graduated prompting con ejemplos validados por nivel.',
              colorCategoria: '#E8D4F0'
            },
            {
              id: 37,
              categoria: 'Problemas Técnicos',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Crea un examen sobre los tiempos pasados para mis estudiantes intermedios. Necesito que evalúe bien su conocimiento del tema." \n\nInterpretación A: 20 preguntas múltiple opción (interpretando "evalúe bien" = comprensivo) \nInterpretación B: 5 ejercicios de transformación (interpretando "evalúe bien" = calidad) \nInterpretación C: Texto con huecos + preguntas abiertas (interpretando "estudiantes intermedios" = B1 vs. B2)',
              problemaTitle: 'Ambigüedad en Especificaciones Pedagógicas',
              problema: 'IA interpreta términos ambiguos ("evalúe bien", "intermedios") de formas diferentes, generando formatos de evaluación incompatibles con las expectativas del profesor.',
              accion: 'Necesita precision en especificaciones técnicas pedagógicas y clustering de variables evaluativas. Aplicar structured prompting definiendo formato+nivel+criterios y constraint prompting especificando parámetros cuantitativos exactos.',
              colorCategoria: '#E8D4F0'
            }
          ];
          
          const index = id - 34;
          if (index < problemasTecnicosData.length) {
            tarjetas.push(problemasTecnicosData[index]);
          }
        } else if (cat.nombre === 'Niveles y Progresión') {
          const nivelesProgresionData = [
            {
              id: 38,
              categoria: 'Niveles y Progresión',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Crea una actividad de comprensión auditiva nivel A2 sobre hacer compras en el supermercado. Los estudiantes han completado 60 horas de instrucción y pueden usar presente, pasado simple y futuro próximo. Necesitan practicar vocabulario de comida básica y expresiones de cantidad." \n\nRespuesta generada: "Audio (familia): - ¿Qué compramos hoy?<br>- Necesitamos leche, pan y fruta.<br>- ¿Cuánta leche?<br>- Dos botellas. Y manzanas también.<br>- Vale. ¿Compramos queso?<br>- Sí, me gustaría probar ese queso nuevo.<br>- También me gustaría comprar algo especial para cenar.<br>- Buena idea. Vamos a elegir vino también."',
              problemaTitle: 'Desalineación Funcional del Marco MCER',
              problema: 'IA mantiene conversación natural A2 pero usa repetidamente "me gustaría" (condicional) cuando las especificaciones priorizan presente, pasado simple y futuro próximo. Aunque algunos materiales A2 incluyen el condicional de cortesía como chunk, esta debe ser una decisión metodológica explícita del profesor, no asunción automática de la IA.',
              accion: 'Requiere clustering de variación estructural por niveles y frecuencias balanceadas de tiempos especificados. Aplicar constraint prompting priorizando estructuras A2 básicas y graduated prompting limitando condicional a uso ocasional específico solo si explícitamente autorizado.',
              colorCategoria: '#FFE4E1'
            },
            {
              id: 39,
              categoria: 'Niveles y Progresión',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Crea 4 ejercicios progresivos sobre el presente simple para estudiantes A1. Deben practicar verbos de rutina diaria. Cada ejercicio debe ser un poco más difícil que el anterior." \n\nRespuesta generada: "Ejercicio 1: Completa: \'Yo _____ (levantarse) a las 7.\' Ejercicio 2: Ordena las palabras: \'trabajo / lunes / los / a / voy\' Ejercicio 3: Conjuga: \'María _____ (desayunar) café y tostadas cada mañana.\' Ejercicio 4: Describe tu rutina matutina completa desde que te despiertas hasta que sales de casa, incluyendo todos los pasos detallados y el tiempo que dedicas a cada actividad."',
              problemaTitle: 'Progresión Inadecuada de Dificultad',
              problema: 'IA crea ejercicios 1-3 mecánicos con respuestas simples (completar, ordenar, conjugar) pero el ejercicio 4 salta abruptamente a producción libre extensa que requiere vocabulario amplio, estructuras temporales y capacidad narrativa superior al nivel A1 básico.',
              accion: 'Necesita clustering de tipos de ejercicios por complejidad cognitiva y frecuencias graduales de autonomía estudiantil. Aplicar graduated prompting especificando incremento controlado de demanda y structured prompting manteniendo coherencia en formato de respuesta.',
              colorCategoria: '#FFE4E1'
            },
            {
              id: 40,
              categoria: 'Niveles y Progresión',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Crea un ejercicio de escritura nivel A2 donde los estudiantes escriban un email informal a un amigo contándole qué hicieron el fin de semana. Deben usar vocabulario de actividades de ocio y pasado simple." \n\nRespuesta generada: "Redacte una comunicación epistolar dirigida a un conocido de su círculo social, empleando un registro apropiado para establecer correspondencia con personas de confianza. Deberá informar detalladamente sobre las actividades de esparcimiento realizadas durante el período sabático semanal, utilizando formas verbales pretéritas de carácter perfectivo y manteniendo la coherencia discursiva a lo largo del texto."',
              problemaTitle: 'Complejidad Instruccional Inadecuada',
              problema: 'IA genera instrucciones con terminología académica excesiva ("comunicación epistolar", "período sabático semanal", "formas verbales pretéritas de carácter perfectivo") cuando los estudiantes A2 necesitan instrucciones simples y directas que puedan comprender fácilmente.',
              accion: 'Requiere clustering de metalenguaje pedagógico por niveles y precisión en simplicidad instruccional. Aplicar constraint prompting limitando a vocabulario de instrucciones A2 y function-focused prompting priorizando claridad comunicativa sobre precisión terminológica.',
              colorCategoria: '#FFE4E1'
            },
            {
              id: 41,
              categoria: 'Niveles y Progresión',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Organiza una unidad didáctica completa sobre \'la familia\' para nivel A2: presentación de vocabulario, práctica controlada, actividad comunicativa y evaluación. Debe seguir una progresión lógica donde cada etapa prepare la siguiente." \n\nRespuesta generada: "1. Presentación: Vocabulario de parentesco (madre, padre, hermana, abuelos)<br>2. Práctica controlada: Ejercicios de gramática sobre adjetivos posesivos (mi, tu, su)<br>3. Actividad comunicativa: Presentación oral libre de 5 minutos describiendo tu familia<br>4. Evaluación: Test escrito sobre vocabulario y posesivos"',
              problemaTitle: 'Saltos en Andamiaje Pedagógico',
              problema: 'IA crea secuencia con orden correcto pero elimina etapas intermedias críticas. Salta directamente de práctica controlada mecánica (ejercicios de posesivos) a producción libre compleja (presentación oral de 5 minutos) sin práctica semi-controlada que conecte gramática con comunicación.',
              accion: 'Necesita clustering de etapas de andamiaje pedagógico y precisión en gradación de autonomía estudiantil. Aplicar graduated prompting especificando práctica guiada intermedia y structured prompting incluyendo actividades puente entre control y libertad comunicativa.',
              colorCategoria: '#FFE4E1'
            }
          ];
          
          const index = id - 38;
          if (index < nivelesProgresionData.length) {
            tarjetas.push(nivelesProgresionData[index]);
          }
        } else if (cat.nombre === 'Extensión y Formato') {
          const extensionFormatoData = [
            {
              id: 42,
              categoria: 'Extensión y Formato',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Crea un texto de lectura de 700 palabras para nivel B2 sobre \'Innovaciones tecnológicas en medicina moderna\'. Debe incluir: introducción del tema, 3 avances específicos (robótica quirúrgica, telemedicina, IA diagnóstica), vocabulario técnico apropiado para B2, y conclusión reflexiva." \n\nRespuesta generada: "La medicina moderna ha experimentado una revolución tecnológica sin precedentes en las últimas décadas. Desde la implementación de sistemas de inteligencia artificial hasta el desarrollo de robots quirúrgicos de alta precisión, estos avances han transformado tanto el diagnóstico como el tratamiento de enfermedades complejas. La robótica quirúrgica representa uno de los avances más significativos. Los sistemas como Da Vinci permiten intervenciones mínimamente invasivas con una precisión milimétrica que supera las capacidades humanas... [texto continúa durante 350 palabras y se corta abruptamente sin conclusión]"',
              problemaTitle: 'Fragmentación por Límites Técnicos de Tokens',
              problema: 'Múltiples profesores han documentado que las IAs tienen límites de tokens por respuesta (~4000 tokens = ~500-600 palabras español) que fragmentan contenidos extensos cuando solicitan lecturas de 600-800 palabras, requiriendo múltiples solicitudes con pérdida de coherencia narrativa.',
              accion: 'Requiere precisión en cálculo de tokens por idioma y clustering de contenido en bloques temáticos específicos. Aplicar constraint prompting con límites de palabras por sección y structured prompting solicitando outline detallado antes del desarrollo completo.',
              colorCategoria: '#D6E3F8'
            },
            {
              id: 43,
              categoria: 'Extensión y Formato',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Diseña una secuencia de 6 actividades para A2 sobre \'Describir la rutina diaria\' siguiendo metodología PPP (Presentación-Práctica-Producción). Actividad 1-2: presentación vocabulario (levantarse, desayunar, trabajar). Actividad 3-4: práctica controlada con tiempos verbales presente simple. Actividad 5-6: producción libre con expresiones temporales básicas (por la mañana, por la tarde)." \n\nRespuesta generada: "ACTIVIDAD 1: Presentación de vocabulario básico - levantarse, desayunar, trabajar, almorzar [correcto para A2] ACTIVIDAD 3: Práctica controlada Complete las frases: \'Yo _____ (desayunar) cereales\' [correcto para A2] ACTIVIDAD 5: Producción libre Describa su rutina utilizando perífrasis verbales de aspecto iterativo y construcciones temporales complejas con subordinadas adverbiales... [salta abruptamente a nivel C1/C2]"',
              problemaTitle: 'Deriva de Parámetros en Secuencias Largas',
              problema: 'Rebecca Eller-Molitas (2024) documentó cómo ChatGPT cambió el nivel de vocabulario a mitad de diálogo médico. La IA pierde consistencia de parámetros iniciales (nivel, metodología, vocabulario) en proyectos multiactividad, creando materiales desarticulados que no mantienen coherencia pedagógica progresiva.',
              accion: 'Requiere clustering de actividades por fase metodológica y precisión en mantenimiento de parámetros constantes mediante refuerzo. Aplicar role prompting con identidad pedagógica fija y temporal-validation prompting recordando nivel y metodología cada 2-3 actividades.',
              colorCategoria: '#D6E3F8'
            },
            {
              id: 44,
              categoria: 'Extensión y Formato',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Crea una rúbrica de evaluación oral en formato tabla para nivel B1. 4 criterios en filas (Fluidez, Precisión gramatical, Vocabulario, Pronunciación). 5 niveles en columnas (Excelente 4pts, Bueno 3pts, Satisfactorio 2pts, Necesita mejora 1pt, Insuficiente 0pts). Cada celda debe contener descriptor específico observable de 15-20 palabras." \n\nRespuesta generada: "RÚBRICA DE EVALUACIÓN ORAL B1 **Fluidez:** • Excelente: Se expresa con naturalidad y ritmo apropiado • Bueno: Habla con pocas pausas, ritmo generalmente fluido • Satisfactorio: Algunas pausas pero mantiene comunicación [formato lista, no tabla] **Precisión gramatical** - Nivel excelente presenta estructuras complejas con precisión, bueno utiliza estructuras intermedias correctamente... [formato párrafo, inconsistente] | Vocabulario | Rico y variado | Apropiado | Básico | [tabla incompleta, faltan columnas y descriptores específicos]"',
              problemaTitle: 'Inconsistencia en Formatos Estructurados',
              problema: 'Profesores han reportado que las IAs no mantienen estructuras tabulares consistentes en contenidos pedagógicos. La IA alterna entre formatos (lista, párrafo, tabla parcial) dentro del mismo documento, generando contenido desestructurado que requiere reformateo manual completo y pérdida de precisión en descriptores.',
              accion: 'Requiere precisión en especificación de formato único obligatorio y clustering de información por celdas específicas. Aplicar structured prompting con plantilla explícita en markdown/HTML y constraint prompting especificando formato no negociable con ejemplos de celda modelo.',
              colorCategoria: '#D6E3F8'
            },
            {
              id: 45,
              categoria: 'Extensión y Formato',
              enfoque: 'Específico',
              prompt: 'Prompt del profesor: "Redacta un ensayo argumentativo de 500 palabras para estudiantes C1 sobre \'El impacto de la inteligencia artificial en el mercado laboral contemporáneo\'. Mantén registro académico formal constante: conectores complejos (no obstante, en consecuencia, por consiguiente), vocabulario especializado en economía laboral, estructura argumentativa con tesis explícita, argumentos con evidencia y contraargumentos." \n\nRespuesta generada: "En la era contemporánea, la implementación progresiva de sistemas de inteligencia artificial ha suscitado un debate considerable respecto a sus implicaciones en el mercado laboral. No obstante, es imperativo analizar esta transformación desde una perspectiva multidimensional... [párrafo 1-2: registro académico correcto] ...Sin embargo, hay que reconocer que no todo es negativo. La IA también puede crear nuevos puestos de trabajo, ¿no? Es como cuando llegó Internet y todos pensaban que iba a ser el fin del mundo... [párrafo 3: cambio a registro coloquial] ...En conclusión, la evidencia empírica demuestra que la disrupción tecnológica contemporánea requiere una reconceptualización paradigmática de los marcos regulatorios laborales... [párrafo final: vuelta a registro academicista excesivo]"',
              problemaTitle: 'Deriva de Registro Comunicativo',
              problema: 'Leticia Maria Barbano (2023) reportó errores gramaticales tipo "ESL speaker" en ChatGPT por mezcla de registros en textos largos. La IA no mantiene registros comunicativos homogéneos en textos extensos, alternando entre académico formal, coloquial conversacional y academicista artificioso, creando incoherencia estilística que compromete objetivos pedagógicos.',
              accion: 'Requiere precisión en definición de registro único y frecuencias específicas de marcadores estilísticos obligatorios. Aplicar role prompting con identidad comunicativa específica fija y function-focused prompting recordando registro objetivo cada 150-200 palabras mediante verificación sistemática.',
              colorCategoria: '#D6E3F8'
            }
          ];
          
          const index = id - 42;
          if (index < extensionFormatoData.length) {
            tarjetas.push(extensionFormatoData[index]);
          }
        } else {
          // Resto de categorías con Lorem ipsum
          tarjetas.push({
            id: id,
            categoria: cat.nombre,
            enfoque: cat.enfoque,
            prompt: `Lorem ipsum prompt para ${cat.nombre} ${id}. Consectetur adipiscing elit, sed do eiusmod tempor.`,
            problemaTitle: `Problema ${cat.enfoque}`,
            problema: `Lorem ipsum dolor sit amet, consectetur adipiscing elit para categoría ${cat.nombre}.`,
            accion: `Lorem ipsum acción correctiva para problema de tipo ${cat.enfoque} en ${cat.nombre}.`,
            colorCategoria: cat.color
          });
        }
      }
    });

    // Ordenar por ID para mantener secuencia 1-50
    return tarjetas.sort((a, b) => a.id - b.id);
  };

  // TARJETAS FINALES 46, 47, 48, 49 y 50
  const tarjetasPrueba = [
    {
      id: 46,
      categoria: 'Personalización',
      enfoque: 'Emergente',
      prompt: 'Prompt del profesor: "Como te expliqué ayer, mi grupo de B1 usa metodología comunicativa con enfoque léxico. Evita ejercicios de rellenar huecos y céntrate en actividades significativas. Crea un ejercicio sobre \'expresar opiniones\' que practique \'me parece que\', \'creo que\', \'en mi opinión\' en contextos auténticos de debate." \n\nRespuesta generada: "Aquí tienes un ejercicio para practicar expresar opiniones: **Ejercicio: Completa los espacios** 1. _____ parece que el fútbol es aburrido. 2. _____ que los videojuegos son educativos. 3. _____ opinión, estudiar es importante. Instrucciones: Rellena los huecos con las expresiones correctas (me parece que / creo que / en mi)."',
      problemaTitle: 'Ausencia de Memoria Contextual Docente',
      problema: 'Cada sesión con IA es completamente independiente y no puede recordar preferencias metodológicas, correcciones previas o contexto pedagógico específico del profesor, requiriendo re-explicar constantemente las mismas preferencias y restricciones.',
      accion: 'Requiere clustering de preferencias por sesión individual (agrupar: metodología, grupo, prohibiciones) y precisión en re-especificación completa (nivel + contexto + restricciones cada vez). Aplicar structured prompting incluyendo metodología en cada interacción ("CONTEXTO: PPP + B1 + universitarios chinos") y constraint prompting especificando restricciones ("PROHIBIDO: rellenar huecos, traducciones, gramática explícita").',
      colorCategoria: '#F9D789'
    },
    {
      id: 47,
      categoria: 'Personalización',
      enfoque: 'Emergente',
      prompt: 'Prompt del profesor: "Diseña una actividad de nivel A2 siguiendo metodología PPP (Presentación-Práctica-Producción) para enseñar presente continuo. La presentación debe usar situaciones visuales reales, la práctica debe ser controlada con retroalimentación inmediata, y la producción debe ser libre con interacción genuina entre estudiantes." \n\nRespuesta generada: "**Actividad: Presente Continuo** 1. Explica la forma: sujeto + estar + gerundio 2. Practica con estos ejercicios: - Conjuga: Yo _____ (estudiar) - Transforma: Juan come → Juan está comiendo 3. Conversación libre: ¿Qué haces normalmente? [No diferencia entre fases PPP, mezcla explicación gramatical tradicional con práctica estructural, la \'producción\' no es libre sino pregunta directa]"',
      problemaTitle: 'Incomprensión de Marcos Metodológicos Específicos',
      problema: 'Cooper (2023) documentó que las IAs generan outputs "generic" que requieren adaptación manual. La IA no distingue entre metodologías pedagógicas específicas (PPP, enfoque por tareas, aprendizaje cooperativo), tratando todas las solicitudes como ejercicios tradicionales genéricos.',
      accion: 'Requiere precisión en definición explícita de cada fase metodológica y clustering de actividades por enfoque pedagógico específico. Aplicar role prompting como especialista en metodología específica y structured prompting con fases claramente diferenciadas y objetivos por etapa.',
      colorCategoria: '#F9D789'
    },
    {
      id: 48,
      categoria: 'Personalización',
      enfoque: 'Emergente',
      prompt: 'Prompt del profesor: "Mis estudiantes usan \'Aula Internacional 3\' unidad 7. Ya han visto presente de subjuntivo con expresiones de sentimiento (me molesta que, me gusta que) y están trabajando el subjuntivo con expresiones de opinión (no creo que, dudo que). Crea ejercicios adicionales que refuercen estos usos específicos sin introducir contenido nuevo como subjuntivo de mandato o imperfecto." \n\nRespuesta generada: "**Ejercicios de Subjuntivo** 1. Completa con subjuntivo: - Es importante que tú _____ (estudiar) más - Ojalá _____ (llover) mañana - Cuando _____ (terminar) el curso, celebraremos 2. Transforma a subjuntivo: - El profesor dice: \'Venid mañana\' → El profesor dice que vengáis mañana [Introduce subjuntivo de mandato (es importante que), subjuntivo de deseo (ojalá), subjuntivo temporal (cuando) y estilo indirecto - contenidos no estudiados]"',
      problemaTitle: 'Desconexión del Currículo Específico en Uso',
      problema: 'La investigación documenta "respuestas genéricas sin consideración del contexto educativo específico". La IA no conoce contenidos, secuenciación ni progresión de libros de texto concretos, generando materiales que introducen contenido no estudiado o contradicen la metodología del manual.',
      accion: 'Requiere precisión en especificación de contenidos previos y clustering de elementos curriculares por manual específico. Aplicar constraint prompting limitando estrictamente a contenidos estudiados y negative prompting excluyendo explícitamente elementos no trabajados en el currículo.',
      colorCategoria: '#F9D789'
    },
    {
      id: 49,
      categoria: 'Variación y Creatividad',
      enfoque: 'Emergente',
      prompt: 'Prompt del profesor: "Crea 5 actividades diferentes para practicar pretérito perfecto en nivel B1. Necesito variedad metodológica: una actividad comunicativa, una de descubrimiento inductivo, una gamificada, una de producción creativa, y una de evaluación formativa. Cada actividad debe tener objetivos, procedimiento, materiales y duración específicos." \n\nRespuesta generada: "**Actividad 1**: Línea temporal personal - Estudiantes crean línea con eventos importantes usando pretérito perfecto **Actividad 2**: Entrevista sobre experiencias - Parejas se preguntan sobre experiencias usando pretérito perfecto **Actividad 3**: Juego experiencias - Estudiantes adivinan experiencias de compañeros usando pretérito perfecto **Actividad 4**: Historia creativa - Escribir historia personal usando pretérito perfecto **Actividad 5**: Autoevaluación - Reflexionar sobre uso correcto del pretérito perfecto [Todas siguen el mismo patrón: uso personal del pretérito perfecto, sin diversidad metodológica real]"',
      problemaTitle: 'Limitación en Variación Estructural',
      problema: 'Múltiples profesores reportan que las IAs generan actividades que siguen patrones estructurales repetitivos, utilizando los mismos marcos conceptuales (experiencias personales, entrevistas, líneas temporales) independientemente de la variedad metodológica solicitada, limitando la diversidad pedagógica real.',
      accion: 'Requiere clustering de metodologías por enfoque específico (comunicativo ≠ inductivo ≠ gamificado) y precisión en especificación de marcos teóricos distintos. Aplicar comparative prompting contrastando metodologías explícitamente ("NO repetir estructura de entrevista personal") y function-focused prompting especificando objetivos cognitivos diferenciados por actividad.',
      colorCategoria: '#E8B892'
    },
    {
      id: 50,
      categoria: 'Variación y Creatividad',
      enfoque: 'Emergente',
      prompt: 'Prompt del profesor: "Genera 8 tipos de ejercicios completamente diferentes para practicar vocabulario de \'ropa y complementos\' en nivel A2. Incluye ejercicios visuales, kinestésicos, auditivos, creativos, colaborativos, individuales, digitales y analógicos. Cada ejercicio debe trabajar una destreza diferente (comprensión oral, expresión escrita, interacción oral, mediación, etc.)." \n\nRespuesta generada: "1. **Identificar imágenes**: Estudiantes nombran ropa en fotos 2. **Relacionar**: Unir palabras con imágenes de ropa 3. **Describir outfit**: Describir ropa de una persona en imagen 4. **Categorizar**: Clasificar ropa por categorías (formal/informal) 5. **Completar frases**: \'En invierno llevo ____\' 6. **Verdadero/Falso**: Afirmaciones sobre ropa apropiada 7. **Describir compañero**: Decir qué ropa lleva el compañero 8. **Lista**: Hacer lista de ropa necesaria para viaje [Todos son ejercicios de identificación/descripción visual, sin diversidad real de tipologías]"',
      problemaTitle: 'Homogeneización de Tipologías de Ejercicios',
      problema: 'La investigación documenta necesidad de que profesores "critically assess and tailor" contenido generado porque las IAs tienden a producir ejercicios que varían en tema pero mantienen la misma tipología cognitiva (identificación, descripción, clasificación), sin diversificar realmente los tipos de procesamiento mental requerido.',
      accion: 'Requiere clustering de destrezas por procesamiento cognitivo específico (visual ≠ kinestésico ≠ analítico ≠ creativo) y frecuencias equilibradas entre tipologías. Aplicar structured prompting con taxonomía de Bloom explícita por ejercicio y constraint prompting prohibiendo repetición de estructura cognitiva entre ejercicios consecutivos.',
      colorCategoria: '#E8B892'
    }
  ];

  const todasLasTarjetas = [...generarTarjetasCompletas(), ...tarjetasPrueba].sort((a, b) => a.id - b.id);

  console.log("Tarjetas manuales:", tarjetasPrueba.map(t => t.id));
  console.log("Total tarjetas:", todasLasTarjetas.length);

  // Efecto máquina de escribir para el título
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitle.length && showElements.title) {
        setTypewriterText(fullTitle.slice(0, index));
        index++;
      } else if (index > fullTitle.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [showElements.title]);

  // Secuencia de aparición
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({...prev, logo: true})), 100),
      setTimeout(() => setShowElements(prev => ({...prev, title: true})), 500),
      setTimeout(() => setShowElements(prev => ({...prev, content: true})), 1200)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleCardClick = (cardId: number) => {
    if (selectedCard === cardId) {
      // Si la tarjeta ya está seleccionada
      if (flippedCards.has(cardId)) {
        // Si está girada, la desgiramos
        setFlippedCards(prev => {
          const newSet = new Set(prev);
          newSet.delete(cardId);
          return newSet;
        });
      } else {
        // Si no está girada, la giramos
        setFlippedCards(prev => {
          const newSet = new Set(prev);
          newSet.add(cardId);
          return newSet;
        });
      }
    } else {
      // Si es una tarjeta nueva, la seleccionamos
      setSelectedCard(cardId);
      setFlippedCards(new Set()); // Reset flip state
    }
  };

  const CardComponent = ({ tarjeta, isSelected, isFlipped }: { tarjeta: any, isSelected: boolean, isFlipped: boolean }) => (
    <motion.div
      onClick={() => handleCardClick(tarjeta.id)}
      style={{
        width: isSelected ? '500px' : '90px',
        height: isSelected ? '400px' : '130px',
        backgroundColor: tarjeta.colorCategoria,
        borderRadius: '15px',
        padding: isSelected ? '25px' : '12px',
        margin: '6px',
        cursor: 'pointer',
        color: '#2D2D54',
        boxShadow: isSelected ? '0 25px 50px rgba(0,0,0,0.3)' : '0 6px 12px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden',
        border: `2px solid rgba(45,45,84,0.3)`,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 2px, transparent 2px),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 1.5px, transparent 1.5px),
          radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px, 25px 25px, 20px 20px'
      }}
      whileHover={{ scale: isSelected ? 1 : 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Decoraciones esquinas estilo tarot */}
      <div style={{
        position: 'absolute',
        top: '6px',
        left: '6px',
        width: '15px',
        height: '15px',
        border: `2px solid #2D2D54`,
        borderRight: 'none',
        borderBottom: 'none',
        borderRadius: '3px 0 0 0'
      }} />
      <div style={{
        position: 'absolute',
        top: '6px',
        right: '6px',
        width: '15px',
        height: '15px',
        border: `2px solid #2D2D54`,
        borderLeft: 'none',
        borderBottom: 'none',
        borderRadius: '0 3px 0 0'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '6px',
        left: '6px',
        width: '15px',
        height: '15px',
        border: `2px solid #2D2D54`,
        borderRight: 'none',
        borderTop: 'none',
        borderRadius: '0 0 0 3px'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '6px',
        right: '6px',
        width: '15px',
        height: '15px',
        border: `2px solid #2D2D54`,
        borderLeft: 'none',
        borderTop: 'none',
        borderRadius: '0 0 3px 0'
      }} />

      {!isSelected ? (
        // Vista miniatura
        <div style={{
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'DM Mono, monospace'
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '8px',
            textShadow: '0 1px 2px rgba(255,255,255,0.8)',
            fontWeight: 'bold'
          }}>
            {tarjeta.id}
          </div>
          <div style={{
            fontSize: '7px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            opacity: 0.95,
            lineHeight: '1.1',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            fontWeight: 'bold'
          }}>
            {tarjeta.categoria.length > 18 ? 
              tarjeta.categoria.substring(0, 18) + '...' : 
              tarjeta.categoria}
          </div>
        </div>
      ) : (
        // Vista expandida
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            // Lado frontal con scroll
            <motion.div
              key="front"
              initial={{ rotateY: 0 }}
              exit={{ rotateY: 180 }}
              style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                overflowY: 'auto'
              }}
            >
              {/* Botón cerrar */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(null);
                  setFlippedCards(new Set());
                }}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(45,45,84,0.1)',
                  border: `1px solid rgba(45,45,84,0.3)`,
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'normal',
                  zIndex: 1000,
                  color: '#2D2D54',
                  fontFamily: 'DM Mono, monospace',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(45,45,84,0.2)';
                  (e.target as HTMLElement).style.borderColor = 'rgba(45,45,84,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(45,45,84,0.1)';
                  (e.target as HTMLElement).style.borderColor = 'rgba(45,45,84,0.3)';
                }}
                title="Cerrar"
              >
                ✕
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: 'bold',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'DM Mono, monospace',
                color: '#2D2D54'
              }}>
                #{tarjeta.id} - {tarjeta.categoria}
              </div>
              <div style={{
                fontSize: '14px',
                lineHeight: '1.5',
                fontWeight: '500',
                fontFamily: 'DM Mono, monospace',
                flex: 1,
                maxHeight: '300px',
                overflowY: 'auto',
                paddingRight: '10px'
              }}>
                <strong>Prompt del profesor:</strong><br/>
                {tarjeta.prompt}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                fontSize: '10px',
                opacity: 0.9,
                fontFamily: 'DM Mono, monospace',
                backgroundColor: 'rgba(45,45,84,0.15)',
                padding: '4px 8px',
                borderRadius: '15px'
              }}>
                Clic para ver solución →
              </div>
            </motion.div>
          ) : (
            // Lado posterior con solución y scroll
            <motion.div
              key="back"
              initial={{ rotateY: -180 }}
              animate={{ rotateY: 0 }}
              style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                overflowY: 'auto'
              }}
            >
              {/* Botón cerrar */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(null);
                  setFlippedCards(new Set());
                }}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(45,45,84,0.1)',
                  border: `1px solid rgba(45,45,84,0.3)`,
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'normal',
                  zIndex: 1000,
                  color: '#2D2D54',
                  fontFamily: 'DM Mono, monospace',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(45,45,84,0.2)';
                  (e.target as HTMLElement).style.borderColor = 'rgba(45,45,84,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(45,45,84,0.1)';
                  (e.target as HTMLElement).style.borderColor = 'rgba(45,45,84,0.3)';
                }}
                title="Cerrar"
              >
                ✕
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#D35400',
                fontFamily: 'DM Mono, monospace'
              }}>
                {tarjeta.problemaTitle}
              </div>
              <div style={{
                fontSize: '14px',
                marginBottom: '20px',
                lineHeight: '1.5',
                fontFamily: 'DM Mono, monospace'
              }}>
                <strong>Problema:</strong> {tarjeta.problema}
              </div>
              <div style={{
                fontSize: '14px',
                lineHeight: '1.5',
                backgroundColor: 'rgba(255,255,255,0.4)',
                padding: '15px',
                borderRadius: '8px',
                fontFamily: 'DM Mono, monospace',
                flex: 1,
                border: `1px solid rgba(45,45,84,0.3)`
              }}>
                <strong>Acción correctiva:</strong> {tarjeta.accion}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.verdeClaro}40 0%, ${colors.amarillo}20 50%, ${colors.verdeTurquesa}30 100%)`
      }}
    >
      {/* Círculo difuminado 1 */}
      <div
        className="absolute rounded-full"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${colors.verde}30 0%, transparent 70%)`,
          filter: 'blur(80px)',
          top: '-100px',
          left: '-100px',
          pointerEvents: 'none'
        }}
      />
      {/* Círculo difuminado 2 */}
      <div
        className="absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${colors.amarillo}25 0%, transparent 70%)`,
          filter: 'blur(90px)',
          bottom: '-50px',
          right: '-50px',
          pointerEvents: 'none'
        }}
      />

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

      <div className="relative z-10 h-screen flex flex-col p-8">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showElements.title ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 style={{ 
            fontFamily: 'DM Mono, monospace',
            fontSize: '48px',
            fontWeight: 700,
            color: colors.azulOscuro,
            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            🧪 {typewriterText}
            <span 
              className="animate-pulse"
              style={{
                opacity: typewriterText.length < fullTitle.length ? 1 : 0
              }}
            >|</span>
          </h1>
          <p style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '18px',
            color: colors.naranja,
            marginTop: '10px',
            fontWeight: 600
          }}>
            Técnicas de Prompting + 50 Situaciones Reales
          </p>
        </motion.div>

        {/* Contenido principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showElements.content ? 1 : 0,
            y: showElements.content ? 0 : 20
          }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex gap-6"
        >
          
          {/* Columna izquierda - Técnicas de Prompting */}
          <div style={{
            width: '600px',
            padding: '25px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: `2px solid ${colors.azulOscuro}20`
          }}>
            <h3 style={{
              color: colors.azulOscuro,
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontFamily: 'DM Mono, monospace',
              textAlign: 'center'
            }}>
              Técnicas de Prompting
            </h3>

            <div style={{
              height: 'calc(100vh - 220px)',
              overflowY: 'auto',
              paddingRight: '10px'
            }}>
              {tecnicasPrompting.map((tecnica, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.05 }}
                  style={{
                    color: colors.azulOscuro,
                    fontSize: '11px',
                    marginBottom: '12px',
                    fontFamily: 'DM Mono, monospace',
                    lineHeight: '1.4',
                    padding: '8px',
                    backgroundColor: `${colors.verdeHablandis}10`,
                    borderRadius: '8px',
                    borderLeft: `3px solid ${colors.verdeHablandis}`
                  }}
                >
                  <div style={{
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    fontSize: '18px'
                  }}>
                    {tecnica.nombre}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    opacity: 0.9,
                    lineHeight: '1.3'
                  }}>
                    {tecnica.descripcion}
                  </div>
                  {tecnica.ejemplo && (
                    <div style={{
                      fontSize: '14px',
                      opacity: 0.8,
                      lineHeight: '1.2',
                      marginTop: '5px',
                      fontStyle: 'italic',
                      backgroundColor: `${colors.azulOscuro}08`,
                      padding: '5px',
                      borderRadius: '4px',
                      borderLeft: `2px solid ${colors.azulOscuro}40`
                    }}>
                      {tecnica.ejemplo}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Columna derecha - 50 Tarjetas */}
          <div className="flex-1 relative">

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              height: 'calc(100vh - 140px)',
              overflowY: 'auto',
              padding: '10px',
              position: 'relative'
            }}>
              {todasLasTarjetas.map((tarjeta) => (
                <CardComponent
                  key={tarjeta.id}
                  tarjeta={tarjeta}
                  isSelected={selectedCard === tarjeta.id}
                  isFlipped={flippedCards.has(tarjeta.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// =======================================================================
// FIN DIAPOSITIVA 3
// =======================================================================

// =======================================================================
// DIAPOSITIVA 4: EL APOYO PEDAGÓGICO - ESTUDIANTES CON NECESIDADES DE APRENDIZAJE PAUTADO
// =======================================================================
const Diapositiva4 = () => {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const baseFontSize = '16px';

  const estudiantesNecesidades = [
    {
      id: 'poco-autonomos',
      titulo: 'Estudiantes poco autónomos',
      descripcion: 'Requieren mayor seguimiento y orientación en su proceso de aprendizaje.',
      color: colors.amarillo,
      icon: Accessibility
    },
    {
      id: 'monolingues',
      titulo: 'Hablantes monolingües',
      descripcion: 'No tienen experiencia previa con otras lenguas o culturas.',
      color: colors.lila,
      icon: Speaker
    },
    {
      id: 'estudiantes-mayores',
      titulo: 'Estudiantes mayores',
      descripcion: 'Adultos con contextos y experiencias de vida particulares.',
      color: colors.verdeTurquesa,
      icon: Heart
    },
    {
      id: 'memoristica',
      titulo: 'Aprendientes de forma memorística',
      descripcion: 'Utilizan estrategias de memorización como principal método de aprendizaje.',
      color: colors.verdeClaro,
      icon: Brain
    },
    {
      id: 'lengua-distante',
      titulo: 'Hablantes de una lengua materna distante del español',
      descripcion: 'Enfrentan mayores desafíos en la adquisición del idioma.',
      color: colors.azulOscuro,
      icon: Globe
    },
    {
      id: 'sin-seguridad',
      titulo: 'Estudiantes que no hablan si no se sienten seguros',
      descripcion: 'Necesitan construir confianza antes de participar activamente.',
      color: colors.azulOscuro,
      icon: Shield
    },
    {
      id: 'expuestos',
      titulo: 'Estudiantes que temen sentirse expuestos',
      descripcion: 'Evitan situaciones que los coloquen en el centro de atención.',
      color: colors.verdeClaro,
      icon: Eye
    },
    {
      id: 'otra-cultura',
      titulo: 'Estudiantes con otra cultura de aprendizaje',
      descripcion: 'Proceden de sistemas educativos con enfoques diferentes.',
      color: colors.amarillo,
      icon: Users
    }
  ];

  return (
    <div
      className="h-screen flex flex-col relative"
      style={{ background: `linear-gradient(135deg, ${colors.verdeClaro}40 0%, ${colors.amarillo}20 50%, ${colors.verdeTurquesa}30 100%)` }}
    >
      {/* Logo pequeño */}
      <div className="absolute top-6 right-6 z-30">
        <img
          src="/hablandis.png"
          alt="Hablandis"
          className="h-20 md:h-24"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            img.parentElement!.innerHTML = `
              <div>
                <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 28px; font-weight: 700;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 12px; margin-top: 2px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </div>

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
                {/* Icono de Lucide */}
                <div className="mb-3" style={{ color: estudiante.color }}>
                  {React.createElement(estudiante.icon, { size: 24, strokeWidth: 2 })}
                </div>

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
                color: colors.amarillo,
                icon: Layers
              },
              {
                titulo: 'Trabajo colaborativo',
                desc: 'Creamos espacios seguros para la participación y el aprendizaje mutuo.',
                color: colors.verdeTurquesa,
                icon: Users
              },
              {
                titulo: 'Retroalimentación personalizada',
                desc: 'Ofrecemos orientación específica para mejorar el desempeño académico.',
                color: colors.lila,
                icon: Lightbulb
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
                <div className="mb-3" style={{ color: estrategia.color }}>
                  {React.createElement(estrategia.icon, { size: 28, strokeWidth: 2 })}
                </div>
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
// DIAPOSITIVA 5: PROCESO FORMATIVO Y EVALUACIÓN - DISEÑO UNIFICADO
// =======================================================================
const Diapositiva5 = () => {
  const [activeProcess, setActiveProcess] = useState<string | null>(null);
  const [evaluationTab, setEvaluationTab] = useState<'hablandis' | 'integracion' | null>(null); // CORREGIDO: Eliminado 'polonia'
  const [videoModalSrc, setVideoModalSrc] = useState<string | null>(null);

  const LineIcons = {
    pencil: ( 
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"> 
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeLinecap="round" strokeLinejoin="round"/> 
      </svg> 
    ),
    puzzle: ( 
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"> 
        <path d="M20 7h-2.5c-1.5 0-2.5-1-2.5-2.5s-2-2.5-3.5-2.5-2.5 1-2.5 2.5-1 2.5-2.5 2.5H4v3c0 1.5-1 2.5-2.5 2.5s-2.5 2-2.5 3.5 1 2.5 2.5 2.5S4 17.5 4 16v-3h2.5c1.5 0 2.5 1 2.5 2.5s2 2.5 3.5 2.5 2.5-1 2.5-2.5 1-2.5 2.5-2.5H20v-6z" strokeLinecap="round" strokeLinejoin="round"/> 
      </svg> 
    ),
    target: ( 
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"> 
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/> 
        <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round"/> 
        <circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round"/> 
      </svg> 
    ),
    play: ( 
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"> 
        <path d="M8 5v14l11-7z"/> 
      </svg> 
    ),
    close: ( 
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"> 
        <line x1="18" y1="6" x2="6" y2="18" /> 
        <line x1="6" y1="6" x2="18" y2="18" /> 
      </svg> 
    )
  };

  const baseFontSize = '16px';
  const pastelColors = {
    amarillo: colors.amarillo + '30', 
    lila: colors.lila + '30', 
    verdeTurquesa: colors.verdeTurquesa + '30', 
    azulOscuro: colors.azulOscuro + '15'
  };

  const procesosFormativos = {
    ejercicio: { 
      titulo: 'Ejercicio', 
      subtitulo: 'Acción descontextualizada', 
      descripcion: 'Acción descontextualizada no referida a la vida real, que se ejercita de forma mecánica. Requiere de repetición, memorización y reproducción.', 
      icon: LineIcons.pencil, 
      color: pastelColors.amarillo, 
      borderColor: colors.amarillo 
    },
    actividad: { 
      titulo: 'Actividad', 
      subtitulo: 'Proceso mental sencillo', 
      descripcion: 'Requiere un proceso mental sencillo para su resolución. Implica comprensión y toma de decisiones.', 
      icon: LineIcons.puzzle, 
      color: pastelColors.lila, 
      borderColor: colors.lila 
    },
    tarea: { 
      titulo: 'Tarea o Proyecto', 
      subtitulo: 'Producto significativo', 
      descripcion: 'Producto relevante y significativo con referencia a la vida real que requiere una activación de las competencias.', 
      icon: LineIcons.target, 
      color: pastelColors.verdeTurquesa, 
      borderColor: colors.verdeTurquesa 
    }
  };

  const evaluacionCompleta = {
    hablandis: { 
      titulo: 'Evaluación en Hablandis', 
      contenido: ( 
        <div className="space-y-5"> 
          {[ 
            { 
              title: "Test de nivel al principio", 
              desc: "Evaluación diagnóstica completa para establecer el punto de partida real del estudiante." 
            }, 
            { 
              title: "Diagnóstico del aprendizaje lingüístico", 
              desc: "Análisis profundo de competencias comunicativas, gramaticales y culturales." 
            }, 
            { 
              title: "Preparación de una propuesta educativa personalizada", 
              desc: "Diseño específico según objetivos del centro y necesidades del grupo." 
            }, 
            { 
              title: "Evaluación formativa integrativa a través de una tarea", 
              desc: "Se evalúa el nuevo nivel del estudiante considerando toda su labor durante el período del viaje de estudio. Esto incluye minitareas y la tarea final." 
            }, 
          ].map((item, index) => ( 
            <div key={index} className="flex items-start gap-4"> 
              <div className="w-7 h-7 rounded-full flex-shrink-0 mt-1 flex items-center justify-center" 
                   style={{ backgroundColor: colors.verdeTurquesa + '20' }}> 
                <span className="block w-3 h-3 rounded-full" style={{backgroundColor: colors.verdeTurquesa}}></span> 
              </div> 
              <div> 
                <h5 style={{ 
                  fontFamily: 'Raleway, sans-serif', 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  color: colors.azulOscuro 
                }}> 
                  {item.title} 
                </h5> 
                <p style={{ 
                  fontFamily: 'Raleway, sans-serif', 
                  fontSize: '0.95rem', 
                  color: colors.grisOscuro, 
                  lineHeight: '1.6' 
                }}> 
                  {item.desc} 
                </p> 
              </div> 
            </div> 
          ))} 
        </div> 
      ) 
    },
    integracion: { 
      titulo: 'Integración', 
      contenido: ( 
        <div className="space-y-6"> 
          <div className="text-center mb-6"> 
            <h5 style={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontSize: '1.2rem', 
              fontWeight: 600, 
              color: colors.azulOscuro 
            }}> 
              Adaptamos la propuesta evaluativa a la demanda curricular del centro 
            </h5> 
            <p style={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontSize: '1rem', 
              color: colors.grisOscuro, 
              marginTop: '10px' 
            }}> 
              Personalizamos nuestra propuesta para cada institución educativa 
            </p> 
          </div> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> 
            {[ 
              {
                title: "Respetamos",
                desc: "Currículo inglés y objetivos institucionales.",
                bgColor: pastelColors.azulOscuro
              }, 
              { 
                title: "Enriquecemos", 
                desc: "Con metodologías comunicativas y contextos reales.", 
                bgColor: pastelColors.lila 
              }, 
              { 
                title: "Documentamos", 
                desc: "Portfolio digital con evidencias del progreso.", 
                bgColor: pastelColors.verdeTurquesa 
              }, 
              { 
                title: "Certificamos", 
                desc: "Certificado como centro acreditado del Instituto Cervantes.", 
                bgColor: pastelColors.amarillo 
              }, 
            ].map(item => ( 
              <div key={item.title} className="p-5 rounded-xl" style={{ backgroundColor: item.bgColor }}> 
                <h6 style={{ 
                  fontFamily: 'Raleway, sans-serif', 
                  fontSize: '1.05rem', 
                  fontWeight: 600, 
                  color: colors.azulOscuro, 
                  marginBottom: '6px' 
                }}> 
                  {item.title} 
                </h6> 
                <p style={{ 
                  fontFamily: 'Raleway, sans-serif', 
                  fontSize: '0.95rem', 
                  color: colors.grisOscuro, 
                  lineHeight: '1.6' 
                }}> 
                  {item.desc} 
                </p> 
              </div> 
            ))} 
          </div> 
        </div> 
      ) 
    }
  };

  const VideoModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
      onClick={onClose} 
    > 
      <motion.div 
        initial={{ scale: 0.5, y: 50 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.5, y: 50 }} 
        className="bg-black rounded-lg shadow-2xl overflow-hidden relative max-w-4xl w-full aspect-video" 
        onClick={(e) => e.stopPropagation()} 
      > 
        <video src={src} controls autoPlay className="w-full h-full" /> 
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors" 
          aria-label="Cerrar vídeo" 
        > 
          {LineIcons.close} 
        </button> 
      </motion.div> 
    </motion.div>
  );

  const videosData = [
    { 
      id: 'video_media2',
      title: 'Grupo de estudiantes italiano',
      file: '/media2.mp4', 
    },
    { 
      id: 'video_media3',
      title: 'Rápidas 2.0',
      file: '/media3.mp4',
    }
  ];

  return (
    <div
      className="h-screen flex flex-col relative"
      style={{ background: `linear-gradient(135deg, ${colors.verdeClaro}40 0%, ${colors.amarillo}20 50%, ${colors.verdeTurquesa}30 100%)` }}
    >
      {/* Logo pequeño */}
      <div className="absolute top-6 right-6 z-30">
        <img
          src="/hablandis.png"
          alt="Hablandis"
          className="h-20 md:h-24"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            img.parentElement!.innerHTML = `
              <div>
                <div style="font-family: 'Aglet Mono', monospace; color: ${colors.azulOscuro}; font-size: 28px; font-weight: 700;">
                  Hablandis
                </div>
                <div style="font-family: 'Raleway', sans-serif; color: ${colors.verdeTurquesa}; font-size: 12px; margin-top: 2px;">
                  Centro Internacional de Idiomas
                </div>
              </div>
            `;
          }}
        />
      </div>

      {/* Título UNIFICADO */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center pt-10 pb-6 md:pt-12 md:pb-8 px-6 shrink-0 text-3xl md:text-4xl lg:text-5xl font-semibold"
        style={{ 
          fontFamily: 'Aglet Mono, monospace',
          color: colors.azulOscuro,
          lineHeight: '1.2'
        }}
      >
        ¿Cómo se estructura el proceso de aprendizaje en los viajes escolares?
      </motion.h1>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 xl:gap-10 px-8 md:px-12 pb-6 overflow-y-auto custom-scrollbar">
        <div className="flex-1 flex flex-col gap-8 xl:gap-10 lg:overflow-y-auto custom-scrollbar pr-2">
          <motion.section
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{delay: 0.1}} 
          > 
            <h2 style={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontSize: `calc(${baseFontSize} * 1.6)`, 
              fontWeight: 700, 
              color: colors.azulOscuro, 
              marginBottom: '18px' 
            }}> 
              Del ejercicio a la tarea 
            </h2> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> 
              {Object.entries(procesosFormativos).map(([key, proceso], index) => ( 
                <motion.div 
                  key={key} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.2 + index * 0.1 }} 
                  className="flex-1 relative rounded-xl shadow-lg cursor-pointer transition-all duration-300 min-h-[160px] flex flex-col" 
                  style={{ 
                    backgroundColor: activeProcess === key ? proceso.color : colors.blanco, 
                    border: `2px solid ${activeProcess === key ? proceso.borderColor : (colors.grisClaro || '#e0e0e0')}` 
                  }} 
                  onClick={() => setActiveProcess(activeProcess === key ? null : key)} 
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} 
                > 
                  <div className="p-5 flex flex-col flex-grow"> 
                    <div className="flex items-center gap-4 mb-3"> 
                      <div style={{ color: proceso.borderColor }}> 
                        {proceso.icon} 
                      </div> 
                      <div> 
                        <h3 style={{ 
                          fontFamily: 'Raleway, sans-serif', 
                          fontSize: `calc(${baseFontSize} * 1.15)`, 
                          fontWeight: 600, 
                          color: colors.azulOscuro 
                        }}> 
                          {proceso.titulo} 
                        </h3> 
                        <p style={{ 
                          fontFamily: 'Raleway, sans-serif', 
                          fontSize: `calc(${baseFontSize} * 0.9)`, 
                          color: colors.grisOscuro 
                        }}> 
                          {proceso.subtitulo} 
                        </p> 
                      </div> 
                    </div> 
                    {activeProcess === key && ( 
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }} 
                        className="mt-auto" 
                        style={{ 
                          fontFamily: 'Raleway, sans-serif', 
                          fontSize: `calc(${baseFontSize} * 0.9)`, 
                          color: colors.grisOscuro, 
                          lineHeight: '1.6' 
                        }} 
                      > 
                        {proceso.descripcion} 
                      </motion.p> 
                    )} 
                  </div> 
                </motion.div> 
              ))} 
            </div> 
          </motion.section>
          
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{delay: 0.2}} 
            className="flex flex-col"
          >
            <h2 style={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontSize: `calc(${baseFontSize} * 1.6)`, 
              fontWeight: 700, 
              color: colors.azulOscuro, 
              marginBottom: '10px' 
            }}> 
              Una propuesta evaluativa adaptativa 
            </h2>
            <p style={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontSize: baseFontSize, 
              color: colors.grisOscuro, 
              marginBottom: '20px', 
              lineHeight: '1.6' 
            }}> 
              Integramos el sistema educativo polaco con metodologías comunicativas innovadoras. 
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              {Object.keys(evaluacionCompleta).map((key) => (
                <button 
                  key={key}
                  onClick={() => setEvaluationTab(evaluationTab === key ? null : key as 'hablandis' | 'integracion')} 
                  className="px-5 py-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md" 
                  style={{ 
                    backgroundColor: evaluationTab === key ? colors.azulOscuro : colors.blanco, 
                    color: evaluationTab === key ? colors.blanco : colors.azulOscuro, 
                    fontFamily: 'Raleway, sans-serif', 
                    fontSize: `calc(${baseFontSize} * 0.90)`, 
                    fontWeight: 500, 
                    border: `1px solid ${evaluationTab === key ? colors.azulOscuro : (colors.grisClaro || '#e0e0e0')}` 
                  }} 
                > 
                  {evaluacionCompleta[key as keyof typeof evaluacionCompleta].titulo.split(' - ')[0]} 
                </button>
              ))}
            </div>
            <div 
              className="bg-white rounded-xl shadow-lg p-5 md:p-6 overflow-y-auto custom-scrollbar"
              style={{ minHeight: '300px', maxHeight: '50vh' }}
            >
              <AnimatePresence mode="wait">
                {evaluationTab ? (
                  <motion.div 
                    key={evaluationTab} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } }} 
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} 
                  > 
                    <h4 style={{ 
                      fontFamily: 'Raleway, sans-serif', 
                      fontSize: `calc(${baseFontSize} * 1.25)`, 
                      fontWeight: 600, 
                      color: colors.azulOscuro, 
                      marginBottom: '18px' 
                    }}> 
                      {evaluacionCompleta[evaluationTab].titulo} 
                    </h4> 
                    {evaluacionCompleta[evaluationTab].contenido} 
                  </motion.div>
                ) : (
                  <motion.div 
                    key="placeholder-eval" 
                    initial={{opacity:0}} 
                    animate={{opacity:1}} 
                    exit={{opacity:0}} 
                    className="h-full flex items-center justify-center text-center"
                  > 
                    <p style={{ 
                      fontFamily: 'Raleway, sans-serif', 
                      fontSize: baseFontSize, 
                      color: colors.grisOscuro, 
                      opacity: 0.7 
                    }}> 
                      Haz clic en una pestaña para ver más información. 
                    </p> 
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>

        <motion.aside 
          className="w-full lg:w-[300px] xl:w-[340px] flex flex-col gap-6 shrink-0 lg:overflow-y-auto custom-scrollbar pr-2"
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{delay: 0.3}}
        >
          {videosData.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + videosData.indexOf(video) * 0.15 }}
              className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer aspect-[4/3]"
              style={{ backgroundColor: colors.grisOscuro }}
              onClick={() => setVideoModalSrc(video.file)}
            >
              <video
                src={video.file}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
                onError={(e) => { console.error("Error al cargar vídeo:", video.file, e); }}
              ></video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent flex flex-col justify-between p-4">
                <div/>
                <div className="flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors duration-300 transform group-hover:scale-110">
                    {React.cloneElement(LineIcons.play, { 
                      style: { color: colors.azulOscuro, width: '28px', height: '28px' }
                    })}
                  </div>
                </div>
                <h4 style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: `calc(${baseFontSize} * 1.05)`,
                  color: colors.blanco,
                  fontWeight: 600,
                  textShadow: '1px 1px 4px rgba(0,0,0,0.9)'
                }}>
                  {video.title}
                </h4>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.9 }} 
            className="text-center mt-2 p-2"
          > 
            <img 
              src="/qr.png" 
              alt="Código QR para más información" 
              className="w-36 h-36 md:w-40 md:h-40 object-contain mx-auto mb-2.5" 
            /> 
            <p style={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontSize: `calc(${baseFontSize} * 0.9)`, 
              color: colors.azulOscuro, 
              fontWeight: 500, 
              lineHeight: '1.4' 
            }}> 
              Completa el formulario y recibe<br/>todo este material 
            </p> 
          </motion.div>
        </motion.aside>
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

      <AnimatePresence>
        {videoModalSrc && <VideoModal src={videoModalSrc} onClose={() => setVideoModalSrc(null)} />}
      </AnimatePresence>
    </div>
  );
};


// =======================================================================
// COMPONENTE PRINCIPAL DE PRESENTACIÓN - CORREGIDO
// =======================================================================
const Presentacion = () => {
  const [diapositivaActual, setDiapositivaActual] = useState(1);
  const totalDiapositivas = 5; // Diapositivas: 1-Intro, 2-Blindapalabras, 3-Laboratorio, 4-Vacía, 5-EVALIA

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
