import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Wand2, Dice6, BookOpen, Trophy, Grid3x3, Layers, Heart, Users, Brain, Lightbulb, Accessibility, Speaker, Eye, Globe } from 'lucide-react';
import { AgentSVG } from './AgentSVG';

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
// DIAPOSITIVA 6: ¿QUÉ SON LOS AGENTES DE IA?
// =======================================================================
const Diapositiva6 = () => {
  const baseFontSize = '16px';
  const [videoExpanded, setVideoExpanded] = useState(false);

  const funcionalidades = [
    { text: 'Personalizan el aprendizaje según el perfil del estudiante', icon: BookOpen },
    { text: 'Automatizan correcciones y tareas administrativas', icon: Zap },
    { text: 'Ofrecen tutoría virtual 24/7', icon: Users },
    { text: 'Detectan dificultades de aprendizaje tempranas', icon: Eye }
  ];

  const ventajas = [
    { text: 'Aprendizaje más eficaz', icon: Trophy },
    { text: 'Educación accesible y flexible', icon: Globe },
    { text: 'Apoyo continuo al docente', icon: Heart }
  ];

  const areasUso = [
    { text: 'Plataformas de e-learning', icon: Grid3x3 },
    { text: 'Aulas virtuales', icon: Users },
    { text: 'Formación básica y superior', icon: BookOpen }
  ];

  return (
    <div
      className="h-screen flex flex-col relative overflow-hidden"
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
        className="text-center pt-8 pb-4 px-6 text-4xl md:text-5xl lg:text-6xl font-bold"
        style={{
          fontFamily: 'Aglet Mono, monospace',
          color: colors.azulOscuro,
          lineHeight: '1.1',
          letterSpacing: '-0.02em'
        }}
      >
        AGENTES DE IA EN EDUCACIÓN - 2025
      </motion.h1>

      <div className="flex-1 px-6 md:px-10 pb-6 overflow-y-auto">
        <div className="w-full h-full flex gap-8 items-center max-w-[1800px] mx-auto">

          {/* Video a la izquierda - 45% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex-shrink-0"
            style={{ width: '45%' }}
          >
            <div
              onClick={() => setVideoExpanded(true)}
              className="block rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: `2px solid ${colors.azulOscuro}20`
              }}
            >
              <div className="relative" style={{ paddingBottom: '56.25%', backgroundColor: '#000' }}>
                <video
                  src="/videoplayback.mp4"
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: 'contain' }}
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                    <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl relative">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <div className="absolute inset-0 rounded-full animate-ping bg-red-600 opacity-30" style={{ animationDuration: '2s' }} />
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="p-4" style={{ background: `linear-gradient(135deg, ${colors.azulOscuro} 0%, ${colors.azulOscuro}dd 100%)` }}>
                <p style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: `calc(${baseFontSize} * 1.05)`,
                  color: colors.blanco,
                  textAlign: 'center',
                  fontWeight: 700
                }}>
                  ¿Qué son los agentes de IA?
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contenido a la derecha en 3 columnas - 55% */}
          <div className="flex-1 grid grid-cols-3 gap-5">
            {/* Funcionalidades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-7"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <h2 style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: `calc(${baseFontSize} * 1.35)`,
                fontWeight: 700,
                color: colors.azulOscuro,
                marginBottom: '20px'
              }}>
                Funcionalidades
              </h2>
              <div className="space-y-4">
                {funcionalidades.map((func, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div style={{ color: colors.azulOscuro, flexShrink: 0, marginTop: '3px' }}>
                      {React.createElement(func.icon, { size: 24, strokeWidth: 2.5 })}
                    </div>
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: `calc(${baseFontSize} * 1.1)`,
                      color: colors.grisOscuro,
                      lineHeight: '1.6'
                    }}>
                      {func.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ventajas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-7"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <h2 style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: `calc(${baseFontSize} * 1.35)`,
                fontWeight: 700,
                color: colors.azulOscuro,
                marginBottom: '20px'
              }}>
                Ventajas
              </h2>
              <div className="space-y-4">
                {ventajas.map((ventaja, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div style={{ color: colors.lila, flexShrink: 0, marginTop: '3px' }}>
                      {React.createElement(ventaja.icon, { size: 24, strokeWidth: 2.5 })}
                    </div>
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: `calc(${baseFontSize} * 1.1)`,
                      color: colors.grisOscuro,
                      lineHeight: '1.6'
                    }}>
                      {ventaja.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Áreas de uso */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-7"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <h2 style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: `calc(${baseFontSize} * 1.35)`,
                fontWeight: 700,
                color: colors.azulOscuro,
                marginBottom: '20px'
              }}>
                Áreas de uso
              </h2>
              <div className="space-y-4">
                {areasUso.map((area, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div style={{ color: colors.amarillo, flexShrink: 0, marginTop: '3px' }}>
                      {React.createElement(area.icon, { size: 24, strokeWidth: 2.5 })}
                    </div>
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: `calc(${baseFontSize} * 1.1)`,
                      color: colors.grisOscuro,
                      lineHeight: '1.6'
                    }}>
                      {area.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal de video - Formato Vertical (Short) */}
      <AnimatePresence>
        {videoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoExpanded(false)}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black rounded-2xl shadow-2xl overflow-hidden relative"
              style={{
                width: '500px',
                height: '85vh',
                maxHeight: '900px'
              }}
            >
              <video
                src="/videoplayback.mp4"
                autoPlay
                controls
                loop
                className="w-full h-full object-cover"
                style={{ backgroundColor: '#000' }}
              >
                Tu navegador no soporta el elemento de video.
              </video>
              <button
                onClick={() => setVideoExpanded(false)}
                className="absolute top-4 right-4 text-white bg-black/60 rounded-full p-3 hover:bg-black/80 transition-colors shadow-lg"
                aria-label="Cerrar video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
// COMPONENTE: TARJETA CON EFECTO FLIP
// =======================================================================
const FlipCard = ({ front, back }: {
  front: { title: string; icon: React.ReactNode; accentColor: string };
  back: { content: string; accentColor: string };
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{
        height: '100%',
        maxHeight: '270px',
        perspective: '1000px'
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s'
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0
        }}
      >
        {/* Cara frontal */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="mb-4">
              {front.icon}
            </div>
            <h3
              className="text-xl font-bold text-center"
              style={{
                fontFamily: 'Aglet Mono, monospace',
                color: colors.azulOscuro
              }}
            >
              {front.title}
            </h3>
            <div
              className="w-12 h-1 rounded-full mt-4"
              style={{ background: front.accentColor }}
            />
          </div>
        </div>

        {/* Cara trasera */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div
              className="w-12 h-1 rounded-full mb-4"
              style={{ background: back.accentColor }}
            />
            <p
              className="text-lg text-center leading-relaxed"
              style={{
                fontFamily: 'Raleway, sans-serif',
                color: colors.grisOscuro,
                fontWeight: 600
              }}
            >
              {back.content}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// =======================================================================
// DIAPOSITIVA 7: ANIMACIÓN INTERACTIVA "AGENT"
// =======================================================================
const Diapositiva7 = () => {
  return (
    <div
      className="h-screen flex flex-col relative overflow-hidden"
      style={{
        background: '#E8E6DA'
      }}
    >
      {/* Header con título */}
      <div className="relative w-full py-6">
        {/* Título AgentiaELE */}
        <div className="text-center">
          <h1
            className="font-bold"
            style={{
              fontFamily: 'Aglet Mono, monospace',
              color: colors.azulOscuro,
              textShadow: '3px 3px 6px rgba(0,0,0,0.15)',
              fontSize: '5.5rem',
              letterSpacing: '0.05em'
            }}
          >
            AgentIAele
          </h1>
        </div>

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
      </div>

      {/* Tarjetas de vocabulario con efecto flip */}
      <div className="flex-1 overflow-y-auto px-8 pb-6 pt-2">
        <div className="grid grid-cols-3 gap-6 h-full" style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
          {/* Tarjeta 1 */}
          <FlipCard
            front={{
              title: "¿QUÉ ES?",
              icon: <Lightbulb size={40} color={colors.naranja} />,
              accentColor: colors.naranja
            }}
            back={{
              content: "Una plataforma revolucionaria con asistentes de IA —adorables gatos expertos— para transformar cómo enseñas y tus estudiantes aprenden español.",
              accentColor: colors.naranja
            }}
          />

          {/* Tarjeta 2 */}
          <FlipCard
            front={{
              title: "EL DESAFÍO",
              icon: <Users size={40} color={colors.azulOscuro} />,
              accentColor: colors.azulOscuro
            }}
            back={{
              content: "Estudiantes que necesitan más tiempo, alumnos que no se atreven a preguntar, diferentes ritmos de aprendizaje. AgentIAele nace para resolver esto.",
              accentColor: colors.azulOscuro
            }}
          />

          {/* Tarjeta 3 */}
          <FlipCard
            front={{
              title: "APRENDIZAJE PAUTADO",
              icon: <Layers size={40} color={colors.verdeTurquesa} />,
              accentColor: colors.verdeTurquesa
            }}
            back={{
              content: "Los gatos IA siguen tus instrucciones, se adaptan al nivel del estudiante, ofrecen progresión gradual y celebran logros. Tú defines las pautas, ellos las ejecutan.",
              accentColor: colors.verdeTurquesa
            }}
          />

          {/* Tarjeta 4 */}
          <FlipCard
            front={{
              title: "TE AMPLIFICA",
              icon: <Users size={40} color={colors.lila} />,
              accentColor: colors.lila
            }}
            back={{
              content: "Tú diseñas actividades y defines pautas, los gatos las ejecutan 24/7. Tú atiendes casos complejos, ellos liberan tu tiempo. Te dan datos de interacciones.",
              accentColor: colors.lila
            }}
          />

          {/* Tarjeta 6 */}
          <FlipCard
            front={{
              title: "BENEFICIOS",
              icon: <Heart size={40} color={colors.naranja} />,
              accentColor: colors.naranja
            }}
            back={{
              content: "Atención personalizada para cada estudiante. Más tiempo para enseñar.",
              accentColor: colors.naranja
            }}
          />

          {/* Tarjeta 8 */}
          <FlipCard
            front={{
              title: "RESULTADOS",
              icon: <Heart size={40} color={colors.verdeTurquesa} />,
              accentColor: colors.verdeTurquesa
            }}
            back={{
              content: "4371 estudiantes confirman: experiencia personalizada que se adapta a lo que necesitan. Quieren a los gatos.",
              accentColor: colors.verdeTurquesa
            }}
          />
        </div>
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
// DIAPOSITIVA 8: MATERIAELE
// =======================================================================
const Diapositiva8 = () => {
  return (
    <div
      className="h-screen flex flex-col relative overflow-hidden"
      style={{
        background: '#E8E6DA'
      }}
    >
      {/* Header con logo */}
      <div className="relative w-full py-6">
        {/* Logo */}
        <div className="absolute top-6 right-6 z-30">
          <img
            src="/hablandis.png"
            alt="Hablandis"
            className="h-52 md:h-60"
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
      </div>

      {/* Contenido - Título y QR Codes */}
      <div className="flex-1 flex flex-col items-center justify-center px-16 gap-12">
        {/* Título principal */}
        <div className="text-center">
          <h1
            className="font-bold mb-4"
            style={{
              fontFamily: 'Aglet Mono, monospace',
              color: colors.azulOscuro,
              fontSize: '3.5rem',
              lineHeight: '1.2',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Descubre <span style={{ color: colors.naranja }}>MATER<span style={{ color: colors.azulOscuro }}>IA</span>ELE</span>
          </h1>
          <p
            style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: colors.verdeTurquesa,
              marginBottom: '0.5rem'
            }}
          >
            un espacio para visualizar los materiales que usas en clase
          </p>
          <p
            style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '1.3rem',
              fontWeight: 500,
              color: colors.azulOscuro
            }}
          >
            Trabajo en parejas con los móviles
          </p>
        </div>

        {/* Códigos QR */}
        <div className="grid grid-cols-3 gap-12 w-full max-w-6xl">
          {/* QR Izquierda - codigoem */}
          <div className="flex flex-col items-center">
            <div
              style={{
                background: 'white',
                padding: '1.2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: `3px solid ${colors.naranja}`
              }}
            >
              <img
                src="/codigoem.png"
                alt="QR Español en Marcha"
                style={{
                  width: '220px',
                  height: '220px',
                  display: 'block'
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  img.parentElement!.innerHTML = `
                    <div style="width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 0.5rem;">
                      <div style="text-align: center; font-family: 'Raleway', sans-serif; color: ${colors.azulOscuro};">
                        <div style="font-size: 48px; margin-bottom: 8px;">📱</div>
                        <div style="font-size: 14px;">codigoem</div>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
            <p
              className="text-center mt-4"
              style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: colors.azulOscuro,
                lineHeight: '1.4',
                maxWidth: '260px'
              }}
            >
              Acceso a la unidad de muestra de Español en Marcha 1
            </p>
          </div>

          {/* QR Centro - codigomateria */}
          <div className="flex flex-col items-center">
            <div
              style={{
                background: 'white',
                padding: '1.2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: `3px solid ${colors.verdeTurquesa}`
              }}
            >
              <img
                src="/codigomateriaele.png"
                alt="QR Material Complementario"
                style={{
                  width: '220px',
                  height: '220px',
                  display: 'block'
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  img.parentElement!.innerHTML = `
                    <div style="width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 0.5rem;">
                      <div style="text-align: center; font-family: 'Raleway', sans-serif; color: ${colors.azulOscuro};">
                        <div style="font-size: 48px; margin-bottom: 8px;">📚</div>
                        <div style="font-size: 14px;">codigomateria</div>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
            <p
              className="text-center mt-4"
              style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: colors.azulOscuro,
                lineHeight: '1.4',
                maxWidth: '260px'
              }}
            >
              Acceso al material complementario
            </p>
          </div>

          {/* QR Derecha - agente */}
          <div className="flex flex-col items-center">
            <div
              style={{
                background: 'white',
                padding: '1.2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: `3px solid ${colors.lila}`
              }}
            >
              <img
                src="/agente.png"
                alt="QR Crea tu agente"
                style={{
                  width: '220px',
                  height: '220px',
                  display: 'block'
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  img.parentElement!.innerHTML = `
                    <div style="width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 0.5rem;">
                      <div style="text-align: center; font-family: 'Raleway', sans-serif; color: ${colors.azulOscuro};">
                        <div style="font-size: 48px; margin-bottom: 8px;">🤖</div>
                        <div style="font-size: 14px;">Crea tu agente</div>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
            <p
              className="text-center mt-4"
              style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: colors.azulOscuro,
                lineHeight: '1.4',
                maxWidth: '260px'
              }}
            >
              Crea tu agente
            </p>
          </div>
        </div>
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
// DIAPOSITIVA 9: FLUJO DE PROCESAMIENTO TEXTUAL IA
// =======================================================================
const Diapositiva9 = () => {
  const year = new Date().getFullYear();

  const colors = {
    verdeClaro: '#C4D4A4', azulOscuro: '#12055F', amarillo: '#FFC846',
    verdeTurquesa: '#007567', negro: '#111827', lila: '#B9ABE4',
    white: '#FFFFFF', fondoBase: '#E8E6DA', panelBg: '#FFFFFF',
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
          <p><strong>La Quinqui:</strong> ¡Buah, flipas! <Highlight color={colors.amarillo}>Si es que no nos dejan ni traer unas birras de casa, ¿pa' qué tanto rollo?</Highlight></p>
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
          const lineColor = isActive ? colors.connectionActive : colors.lineaRojaPrincipal + '90';
          const lineThickness = isActive ? 5 : 4;

          drawBrushStrokeLine(
            ctx, startX, startY, endX, endY,
            lineColor,
            lineThickness,
            colors.puntoConexionAzul,
            colors.puntoConexionAzul,
            (node.id === 'extraction' && targetNode.id === 'refinement') ? colors.puntoConexionVerde : undefined
          );
        }
      });
    });
  }, [selectedNodeId, hoveredNodeId, nodes, colors]);
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
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 overflow-hidden relative" style={{ background: colors.fondoBase }}>
      <div className={LogoConfig.position}>
        <LogoHablandisUnified />
      </div>

      <motion.div className="text-center my-8 sm:my-10 md:my-12 w-full max-w-4xl z-10 flex-shrink-0 transition-all duration-500 ease-in-out" initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0, x: selectedNodeId ? `-${panelWidthPercentage / titleShiftFactor}%` : '0%', }} transition={{ type: "spring", stiffness: 180, damping: 22 }}>
        <MainTitle className="mb-2">
          Flujo de Procesamiento Textual IA
        </MainTitle>
        <Subtitle>
          Haz clic en una etapa para explorar los detalles de transformación.
        </Subtitle>
      </motion.div>

      <motion.div id="network-container" className="relative flex-grow w-full max-w-5xl xl:max-w-6xl mb-6 rounded-lg transition-all duration-500 ease-in-out" style={{minHeight: '45vh'}} animate={{ x: selectedNodeId ? `-${panelWidthPercentage / networkShiftFactor}%` : '0%', width: selectedNodeId ? `${100 - panelWidthPercentage + (panelWidthPercentage / (networkShiftFactor + 0.5))}%` : '100%', }} transition={{ type: "spring", stiffness: 180, damping: 22 }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
        {nodes.map((node, index) => ( <motion.div key={node.id} className="absolute cursor-pointer z-10 flex flex-col items-center justify-center transition-all duration-200 ease-out" style={{ left: `calc(${node.position.x}% - ${(nodeDisplaySize + nodeClickAreaPadding) / 2}px)`, top: `calc(${node.position.y}% - ${(nodeDisplaySize + nodeClickAreaPadding) / 2}px)`, width: `${nodeDisplaySize + nodeClickAreaPadding}px`, height: `${nodeDisplaySize + nodeClickAreaPadding}px`, }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness:150, damping:20 }} onClick={() => setSelectedNodeId(selectedNodeId === node.id ? null : node.id)} onMouseEnter={() => setHoveredNodeId(node.id)} onMouseLeave={() => setHoveredNodeId(null)} > <motion.div className="rounded-full flex flex-col items-center justify-center bg-white shadow-lg" style={{ width: `${nodeDisplaySize}px`, height: `${nodeDisplaySize}px`, border: `3.5px solid ${selectedNodeId === node.id || hoveredNodeId === node.id ? node.baseColor : colors.azulOscuro + 'B0'}`, color: selectedNodeId === node.id || hoveredNodeId === node.id ? node.baseColor : colors.azulOscuro, boxShadow: selectedNodeId === node.id || hoveredNodeId === node.id ? `0 0 18px ${node.baseColor}70, 0 0 0 3.5px ${node.baseColor}30`  : `0 5px 12px rgba(0,0,0,0.1)`, }} animate={{ scale: selectedNodeId === node.id ? 1.1 : hoveredNodeId === node.id ? 1.05 : 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} >
            {React.cloneElement(node.icon as React.ReactElement<{ className?: string }>, { className: "w-9 h-9 sm:w-10 sm:h-10 stroke-current" })}
            </motion.div> <span className="mt-2.5 text-center text-xs sm:text-sm font-semibold leading-tight tracking-normal" style={{ fontFamily: 'Raleway Semibold', color: colors.negro, opacity: 0.95 }}> {node.shortTitle} </span> </motion.div> ))}
      </motion.div>
      <AnimatePresence>
        {selectedNodeId && currentSelectedNodeDetails && currentSelectedNodeContent && (
          <motion.div key="details-panel-complete" initial={{ x: "100%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: "spring", stiffness: 280, damping: 30, duration:0.4 }} className="fixed top-0 right-0 bottom-0 shadow-2xl z-40 flex flex-col border-l-4" style={{ width: `${panelWidthPercentage}%`, minWidth: '380px', maxWidth: '650px', borderColor: currentSelectedNodeDetails.baseColor, backgroundColor: colors.panelBg }}>
            <div className="flex items-center justify-between p-5 sm:p-6 border-b" style={{borderColor: colors.panelBorder, backgroundColor: colors.white }}> <h2 className="text-xl sm:text-2xl font-medium" style={{fontFamily: 'Aglet Mono Light, monospace', color: currentSelectedNodeDetails.baseColor, letterSpacing:'-0.5px'}}> {currentSelectedNodeDetails.title} </h2> <button onClick={() => setSelectedNodeId(null)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"> <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg> </button> </div>
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-8 custom-scrollbar-minimalist" style={{ fontFamily:'Raleway, sans-serif', color: colors.negro, fontSize: '1.1rem', lineHeight:'1.8', backgroundColor: colors.white }}>
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
// DIAPOSITIVA 10: IA PARA DETERMINAR (Y ADAPTAR) EL NIVEL DE UN TEXTO
// =======================================================================
interface SvgIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const Diapositiva10 = () => {
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
    bgBase: '#E8E6DA',
    bgGradientEnd: '#E8E6DA',
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
        return ( <motion.div key="inst2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col h-full"> <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ fontFamily: 'Aglet Mono Light, monospace', color: slideColors.textPrimary }}>Factores de Centralidad</h2> <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"> {factors.map((factor, idx) => ( <motion.div key={factor.id} className="p-4 rounded-xl border-l-4 flex flex-col" style={{ borderColor: factor.color, backgroundColor: slideColors.bgGradientEnd, boxShadow: '0 4px 15px rgba(0,0,0,0.07)' }} initial={{opacity:0, x: idx % 2 === 0 ? -20 : 20, y:10}} animate={{opacity:1, x:0, y:0}} transition={{delay: idx * 0.15, duration:0.4}} > <div className="flex items-center mb-2"> <factor.icon className="w-6 h-6 mr-2 flex-shrink-0" style={{color: factor.color}}/> <h3 className="text-lg font-semibold" style={{ fontFamily: 'Raleway SemiBold, sans-serif', color: slideColors.textPrimary }}>{factor.name}</h3> </div> <p className="text-xs mb-1 flex-grow" style={{color: slideColors.textSecondary}}>{factor.description}</p> <p className="text-xs italic font-medium" style={{color: slideColors.textPrimary}}>{factor.example}</p> </motion.div> ))} </div> <div className="w-full h-60 md:h-72 flex items-center justify-center mt-4 mb-2 flex-grow"> <svg viewBox="0 0 250 200" className="w-full max-w-lg h-auto"> {highlightedFactorInMap && factorNodePositions.map(targetPos => { if (targetPos.data.id === highlightedFactorInMap) return null;  const sourcePos = factorNodePositions.find(p => p.data.id === highlightedFactorInMap); if (!sourcePos) return null; return ( <motion.line key={`line-${sourcePos.data.id}-${targetPos.data.id}`} x1={sourcePos.x} y1={sourcePos.y} x2={targetPos.x} y2={targetPos.y} stroke={slideColors.textSecondary} strokeWidth="1.5" initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 0.4, pathLength: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} /> ); })} {factorNodePositions.map(({ data, x, y }) => ( <motion.g key={data.id} onClick={() => setHighlightedFactorInMap(highlightedFactorInMap === data.id ? null : data.id)} style={{ cursor: 'pointer' }} initial={{ scale: 0.9, opacity: 0.7 }} animate={{  scale: highlightedFactorInMap === data.id ? 1.15 : 0.9,  opacity: highlightedFactorInMap === data.id ? 1 : (highlightedFactorInMap ? 0.5 : 0.7)  }} whileHover={{ scale: highlightedFactorInMap === data.id ? 1.2 : 1.0 }} transition={{ duration: 0.25, ease: "circOut" }} > <circle cx={x} cy={y} r="24"  fill={data.color} stroke={highlightedFactorInMap === data.id ? data.color : slideColors.bgGradientEnd}  strokeWidth={highlightedFactorInMap === data.id ? 3 : 2} /> <foreignObject x={x - 12} y={y - 12} width="24" height="24"> <div className="flex items-center justify-center w-full h-full"> <data.icon  className="w-[18px] h-[18px]" style={{ color: slideColors.bgBase }}  /> </div> </foreignObject> <text  x={x} y={y + 38}  fontSize="11"  textAnchor="middle"  fill={highlightedFactorInMap === data.id ? data.color : slideColors.textSecondary} style={{fontFamily: 'Raleway Bold, sans-serif', fontWeight: highlightedFactorInMap === data.id ? 700 : 500}} > {data.name} </text> </motion.g> ))} </svg> </div> </motion.div>);

      case 3:
        const selectedLevelData = levelsData.find(l => l.id === activeLevel);
        const levelNodesForDisplay = [ { ...levelsData[0], x: 75, y: 50 }, { ...levelsData[1], x: 150, y: 50 }, { ...levelsData[2], x: 225, y: 50 }, ];
        return (  <motion.div key="inst3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col h-full"> <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ fontFamily: 'Aglet Mono Light, monospace', color: slideColors.textPrimary }}>Errores Centrales por Nivel</h2> <div className="flex justify-center mb-6 space-x-2 md:space-x-3"> {levelsData.map(level => (
          <button key={level.id} onClick={() => setActiveLevel(level.id)} className={`py-2.5 px-4 md:px-6 rounded-lg text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${activeLevel === level.id ? 'font-semibold shadow-xl scale-105' : 'opacity-80 hover:opacity-100 shadow-md'}`}
            style={{
              backgroundColor: activeLevel === level.id ? level.color : `${level.color}55`,
              color: activeLevel === level.id ? (['B1-B2', 'A1-A2'].includes(level.id) ? slideColors.textPrimary : '#fff') : slideColors.textPrimary,
              fontFamily:'Raleway SemiBold, sans-serif'
            }}
          >
            {level.id}
          </button>
        ))} </div> {selectedLevelData && ( <motion.div key={activeLevel} initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} transition={{duration:0.4}} className="p-6 md:p-8 rounded-xl shadow-lg text-center mb-8 mx-auto w-full max-w-xl lg:max-w-2xl" style={{backgroundColor: `${selectedLevelData.color}20`}} > <h3 className="text-xl md:text-2xl font-semibold mb-3" style={{fontFamily: 'Raleway Bold, sans-serif', color: slideColors.textPrimary}}>{selectedLevelData.name}</h3> <p className="text-md md:text-lg mb-2" style={{color: slideColors.accent1}}> <strong>Error Central:</strong> {selectedLevelData.error} </p> <p className="text-sm md:text-base" style={{color: slideColors.textSecondary}}>{selectedLevelData.details}</p> </motion.div> )} <div className="w-full h-48 md:h-56 flex items-center justify-center mt-auto mb-4 flex-grow"> <svg viewBox="0 0 300 100" className="w-full max-w-xl h-auto"> <path d={`M ${levelNodesForDisplay[0].x} ${levelNodesForDisplay[0].y} L ${levelNodesForDisplay[1].x} ${levelNodesForDisplay[1].y} L ${levelNodesForDisplay[2].x} ${levelNodesForDisplay[2].y}`} stroke={slideColors.textSecondary} strokeWidth="3.5" fill="none" /> {levelNodesForDisplay.map((nodeData, index) => ( <MetroNode key={`node-${nodeData.id}`} instante={currentInstante} id={3 + (index * 0.1)} x={nodeData.x} y={nodeData.y} size={activeLevel === nodeData.id ? 16 : 11} color={nodeData.color} pulse={activeLevel === nodeData.id} label={null} /> ))} </svg> </div> </motion.div>);

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
      style={{ background: slideColors.bgBase }}
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
// DIAPOSITIVA 11: CREACIÓN DE TAREAS DE IA - PROMPTS
// =======================================================================
const Diapositiva11 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Logo y Título unificados ---
  const LogoHablandisUnificado = () => (
    <div className="absolute top-6 left-6 z-30 flex flex-col items-start">
      <img
        src="/hablandis.png"
        alt="Hablandis"
        className="h-24 md:h-32 lg:h-36 drop-shadow-[0_4px_8px_rgba(0,0,0,0.10)] rounded-xl"
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
        background: '#E8E6DA'
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
// DIAPOSITIVA 12: CREACIÓN DE TAREAS DE MATCHING (DISEÑO POR FASES)
// =======================================================================
const Diapositiva12 = () => {
  const [faseActiva, setFaseActiva] = useState(1);

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
    <div className="w-full h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: '#E8E6DA' }}>
      {/* Logo Unificado */}
      <div className="absolute top-6 left-6 z-30">
        <img
          src="/hablandis.png"
          alt="Hablandis"
          className="h-24 md:h-32 lg:h-36 drop-shadow-[0_4px_8px_rgba(0,0,0,0.10)] rounded-xl"
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

      {/* Título Unificado */}
      <div className="pt-12 pb-2 flex flex-col items-center">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6 text-center"
          style={{
            fontFamily: "Aglet Mono, monospace",
            color: colors.azulOscuro,
            letterSpacing: "-0.01em"
          }}
        >
          Creación de tareas de matching
        </h1>
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
      <div className="flex-grow flex overflow-hidden pb-8">
        {/* Fase 1 */}
        <div className={`${faseActiva === 1 ? 'w-full' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <div className="h-full p-4 md:p-6 overflow-y-auto">
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
          <div className="h-full p-4 md:p-6 overflow-y-auto">
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
          <div className="h-full p-4 md:p-6 overflow-y-auto">
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
          <div className="h-full p-4 md:p-6 overflow-y-auto">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Unificado Minimalista */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <p className="text-xs" style={{
          fontFamily: 'Raleway, sans-serif',
          color: colors.azulOscuro,
          opacity: 0.6
        }}>
          © {new Date().getFullYear()} Hablandis. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

// =======================================================================
// DIAPOSITIVA 13: La complejidad en la interpretación y análisis de la expresión e interacción oral. Un ejemplo con los imperativos
// =======================================================================

// Definir colores y animaciones específicos para Diapositiva13
const diap13Colors = {
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

const diap13Animations = {
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
      <div style={{ backgroundColor: diap13Colors.azulOscuro }} className="text-white p-3 md:p-4 rounded-t-lg">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace' }}>¡DETECTIVE DE MODALIDADES!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap13Colors.lila }}>Dictum vs Modus: Descubriendo las Intenciones 🕵️‍♂️</h4>
      </div>
      
      <div className="p-3 md:p-4 mb-2 md:mb-3 rounded-lg" style={{ backgroundColor: diap13Colors.lila+'30' }}>
        <p className="text-sm md:text-base font-medium" style={{ color: diap13Colors.azulOscuro }}>
          La modalidad expresa la actitud del hablante hacia el contenido.
          <strong style={{color: diap13Colors.verdeTurquesa}}> DICTUM</strong> = lo que se dice | <strong style={{color: diap13Colors.amarillo}}>MODUS</strong> = actitud del hablante
        </p>
      </div>
      
      <div className="flex-grow p-3 md:p-6 rounded-lg mb-2 md:mb-3 min-h-[150px] md:min-h-[200px]" style={{ backgroundColor: diap13Colors.grisClaro }}>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: diap13Colors.azulOscuro }}>
            "{examples[currentExample].sentence}"
          </p>
          <p className="text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>🔍 Analiza esta oración y encuentra el DICTUM y MODUS</p>
        </div>
        
        {showAnalysis ? (
          <motion.div {...diap13Animations.fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="p-3 md:p-4 rounded-lg border-l-4" style={{ backgroundColor: diap13Colors.verdeClaro+'50', borderColor: diap13Colors.verdeTurquesa}}>
              <h5 className="font-bold mb-2" style={{ color: diap13Colors.verdeTurquesa, fontFamily: 'Raleway Bold, sans-serif' }}>📝 DICTUM (Contenido)</h5>
              <p className="text-md md:text-lg">"{examples[currentExample].dictum}"</p>
              <p className="text-xs md:text-sm mt-2" style={{color: diap13Colors.grisOscuro}}>Lo que se comunica objetivamente</p>
            </div>
            
            <div className="p-3 md:p-4 rounded-lg border-l-4" style={{ backgroundColor: diap13Colors.amarillo+'50', borderColor: diap13Colors.amarillo}}>
              <h5 className="font-bold mb-2" style={{ color: diap13Colors.amarillo, fontFamily: 'Raleway Bold, sans-serif' }}>🎭 MODUS (Actitud)</h5>
              <p className="text-md md:text-lg">"{examples[currentExample].modus}"</p>
              <p className="text-xs md:text-sm mt-2" style={{color: diap13Colors.grisOscuro}}>{examples[currentExample].explanation}</p>
            </div>
          </motion.div>
        ) : (
          <div className="text-center">
            <div className="mb-3 md:mb-4">
              <p className="mb-2" style={{color: diap13Colors.grisOscuro}}>Piensa en:</p>
              <p className="text-xs md:text-sm">• ¿Cuál es el contenido objetivo?</p>
              <p className="text-xs md:text-sm">• ¿Qué actitud muestra el hablante?</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-4 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap13Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-2" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap13Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap13Colors.grisOscuro }}>
          Para los sistemas de IA, distinguir DICTUM y MODUS es fundamental para comprender intención comunicativa. 
          Un chatbot que entiende que "¿Podrías ayudarme?" no es solo una pregunta sobre capacidad sino una solicitud 
          educada, puede generar respuestas más apropiadas y naturales.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <div className="text-xs md:text-sm mb-2 sm:mb-0" style={{color: diap13Colors.grisOscuro}}>
          Puntuación: {score} / {examples.length}
        </div>
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
            style={{ backgroundColor: showAnalysis ? diap13Colors.grisMedio : diap13Colors.verdeTurquesa, fontFamily: 'Raleway Semibold, sans-serif' }}
            onClick={revealAnalysis}
            disabled={showAnalysis}
          >
            🔍 Revelar Análisis
          </button>
          <button 
            className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
            style={{ backgroundColor: diap13Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
            onClick={nextExample}
          >
            Siguiente Ejemplo
          </button>
        </div>
      </div>
      <div className="mt-2 text-center text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>
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
      <div style={{ backgroundColor: diap13Colors.verdeTurquesa }} className="text-white p-3 md:p-4 rounded-t-lg">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace' }}>¡BATALLA DE MODALIDADES!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap13Colors.lila }}>Proposicional vs Extraproposicional: El Duelo Lingüístico ⚔️</h4>
      </div>

      <div className="p-3 md:p-4 mb-2 md:mb-3 rounded-lg" style={{ backgroundColor: diap13Colors.lila+'30' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="text-center">
            <h5 className="font-bold" style={{ color: diap13Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>🎯 PROPOSICIONAL</h5>
            <p className="text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>Actitud hacia la VERDAD de lo dicho</p>
          </div>
          <div className="text-center">
            <h5 className="font-bold" style={{ color: diap13Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>👥 EXTRAPROPOSICIONAL</h5>
            <p className="text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>Actitud hacia los PARTICIPANTES</p>
          </div>
        </div>
      </div>

      <div className="flex-grow p-3 md:p-6 rounded-lg mb-2 md:mb-3 min-h-[150px] md:min-h-[200px]" style={{ backgroundColor: diap13Colors.grisClaro }}>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: diap13Colors.verdeTurquesa }}>
            "{examples[currentExample].sentence}"
          </p>
          <p className="text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>⚔️ ¿Qué tipo de modalidad detectas?</p>
        </div>
        
        {!showResult ? (
          <motion.div {...diap13Animations.fadeIn} className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <button 
              className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
              style={{ backgroundColor: diap13Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
              onClick={() => checkAnswer('proposicional')}
            >
              🎯 PROPOSICIONAL<br/>
              <span className="text-xs">(hacia la verdad)</span>
            </button>
            <button 
              className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
              style={{ backgroundColor: diap13Colors.amarillo, color: diap13Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
              onClick={() => checkAnswer('extraproposicional')}
            >
              👥 EXTRAPROPOSICIONAL<br/>
              <span className="text-xs">(hacia participantes)</span>
            </button>
          </motion.div>
        ) : (
          <motion.div {...diap13Animations.scaleIn} className="text-center">
            <div className={`p-3 md:p-4 rounded-lg mb-3 md:mb-4 border-2 ${
              selectedType === examples[currentExample].type ? 'border-green-500' : 'border-red-500'
            }`} style={{ backgroundColor: selectedType === examples[currentExample].type ? diap13Colors.exito+'30' : diap13Colors.error+'30' }}>
              <h5 className={`font-bold text-lg ${
                selectedType === examples[currentExample].type ? 'text-green-700' : 'text-red-700'
              }`} style={{ fontFamily: 'Raleway Bold, sans-serif' }}>
                {selectedType === examples[currentExample].type ? '🎉 ¡CORRECTO!' : '❌ Incorrecto'}
              </h5>
              <p className="mt-2 text-sm md:text-base">
                <strong>Respuesta correcta:</strong> {examples[currentExample].type.toUpperCase()}
              </p>
              <p className="text-xs md:text-sm mt-2" style={{color: diap13Colors.grisOscuro}}>{examples[currentExample].explanation}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 md:p-4 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap13Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-2" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap13Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap13Colors.grisOscuro }}>
          Esta distinción es crucial para que las IA interpreten intenciones. La proposicional requiere procesamiento semántico, la extraproposicional requiere procesamiento pragmático.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <div className="text-xs md:text-sm mb-2 sm:mb-0" style={{color: diap13Colors.grisOscuro}}>
          Puntuación: {score} / {examples.length}
        </div>
        <button 
          className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: !showResult ? diap13Colors.grisMedio : diap13Colors.verdeTurquesa, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={nextExample}
          disabled={!showResult}
        >
          Siguiente Batalla
        </button>
      </div>
      <div className="mt-2 text-center text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>
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
      <div style={{ backgroundColor: diap13Colors.amarillo }} className="p-3 md:p-4 rounded-t-lg flex-shrink-0">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace', color: diap13Colors.azulOscuro }}>¡ORACIÓN VS ENUNCIADO!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap13Colors.verdeTurquesa }}>Del Laboratorio a la Vida Real: El Contexto lo Cambia Todo 🔬➡️🌍</h4>
      </div>

      <div className="p-3 md:p-3 mb-2 rounded-lg flex-shrink-0" style={{ backgroundColor: diap13Colors.lila+'30' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          <div className="text-center">
            <h5 className="font-bold text-sm md:text-base" style={{ color: diap13Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>⚗️ ORACIÓN</h5>
            <p className="text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>Unidad sintáctica abstracta</p>
          </div>
          <div className="text-center">
            <h5 className="font-bold text-sm md:text-base" style={{ color: diap13Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>💬 ENUNCIADO</h5>
            <p className="text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>Proposición + Contexto = Comunicación</p>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col p-3 md:p-4 rounded-lg mb-2 overflow-auto" style={{ backgroundColor: diap13Colors.grisClaro }}>
        <div className="mb-3 text-center">
          <div className="p-3 md:p-4 rounded-lg mb-3" style={{ backgroundColor: diap13Colors.verdeClaro+'50' }}>
            <h5 className="font-bold text-sm md:text-base mb-1" style={{ color: diap13Colors.verdeTurquesa, fontFamily: 'Raleway Bold, sans-serif' }}>📝 ORACIÓN ABSTRACTA:</h5>
            <p className="text-lg md:text-xl font-bold" style={{ color: diap13Colors.azulOscuro }}>"{examples[currentExample].oracion}"</p>
          </div>
          <p className="text-sm md:text-base mb-3" style={{color: diap13Colors.grisOscuro}}>🎭 Elige un contexto para transformarla en enunciado:</p>
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
                backgroundColor: selectedContextIdx === index ? diap13Colors.exito+'30' : diap13Colors.blanco,
                fontFamily: 'Raleway Semibold, sans-serif'
              }}
              onClick={() => selectContext(index)}
            >
              🎬 {trans.context}
            </button>
          ))}
        </div>
        
        {showTransformation && selectedContextIdx !== null && (
          <motion.div {...diap13Animations.fadeIn} className="p-3 md:p-4 rounded-lg mt-auto" style={{ backgroundColor: diap13Colors.amarillo+'50' }}>
            <h5 className="font-bold mb-2 text-sm md:text-base" style={{ color: diap13Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>✨ TRANSFORMACIÓN:</h5>
            <p className="text-base md:text-lg font-medium">
              Enunciado: <span style={{ color: diap13Colors.verdeTurquesa }}>"{examples[currentExample].transformations[selectedContextIdx].enunciado}"</span>
            </p>
            <p className="text-sm md:text-base mt-2">
              Función: <strong>{examples[currentExample].transformations[selectedContextIdx].funcion}</strong>
            </p>
          </motion.div>
        )}
      </div>

      <div className="p-3 md:p-3 rounded-lg mb-2 flex-shrink-0" style={{ backgroundColor: diap13Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-1 text-sm md:text-base" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap13Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap13Colors.grisOscuro }}>
          Crucial para IA conversacional. Los modelos deben procesar estructura gramatical y contexto situacional. GPT-4 lo hace bien. Ayuda a entender que la misma forma tiene múltiples funciones.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center flex-shrink-0">
        <div className="text-xs md:text-sm mb-2 sm:mb-0" style={{color: diap13Colors.grisOscuro, fontFamily: 'Raleway Medium, sans-serif'}}>
          Fórmula: ENUNCIADO = PROPOSICIÓN + CONTEXTO
        </div>
        <button 
          className="px-3 py-2 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: diap13Colors.amarillo, color: diap13Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={nextExample}
        >
          Siguiente Transformación
        </button>
      </div>
      <div className="text-center text-xs md:text-sm mt-1 flex-shrink-0" style={{color: diap13Colors.grisOscuro}}>
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
      <div style={{ backgroundColor: diap13Colors.lila }} className="p-3 md:p-4 rounded-t-lg">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace', color: diap13Colors.azulOscuro }}>¡TRIPLE IMPERATIVO!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap13Colors.blanco }}>Modo Verbal, Tipo de Oración y Acto de Habla</h4>
      </div>

      {/* Selector de Sets */}
      <div className="p-2 md:p-3 mb-2 flex flex-wrap gap-1 md:gap-2 justify-center" style={{ backgroundColor: diap13Colors.grisClaro }}>
        {exampleSets.map((set, index) => (
          <button
            key={index}
            onClick={() => changeSet(index)}
            className={`px-2 py-1 md:px-3 md:py-1.5 rounded text-xs md:text-sm transition-all ${
              selectedSet === index ? 'font-bold shadow-lg' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: selectedSet === index ? diap13Colors.amarillo : diap13Colors.blanco,
              color: selectedSet === index ? diap13Colors.azulOscuro : diap13Colors.grisOscuro,
              fontFamily: 'Raleway Semibold, sans-serif'
            }}
          >
            {set.name}
          </button>
        ))}
      </div>

      <div className="p-2 md:p-3 mb-1 rounded-lg text-center" style={{ backgroundColor: diap13Colors.amarillo+'20' }}>
        <p className="text-xs md:text-sm font-medium" style={{ color: diap13Colors.azulOscuro }}>{currentSet.description}</p>
      </div>

      <div className="p-3 md:p-4 mb-2 md:mb-3 rounded-lg" style={{ backgroundColor: diap13Colors.azulOscuro+'15' }}>
        <div className="grid grid-cols-3 gap-1 md:gap-2 text-center text-xs md:text-sm">
          <div className="p-1 md:p-2 rounded" style={{backgroundColor: diap13Colors.verdeClaro+'80'}}>
            <strong style={{color: diap13Colors.verdeTurquesa}}>MODO VERBAL</strong><br/>Forma morfológica
          </div>
          <div className="p-1 md:p-2 rounded" style={{backgroundColor: diap13Colors.amarillo+'80'}}>
            <strong style={{color: diap13Colors.azulOscuro}}>TIPO ORACIÓN</strong><br/>Unidad sintáctica
          </div>
          <div className="p-1 md:p-2 rounded" style={{backgroundColor: diap13Colors.lila+'80'}}>
            <strong style={{color: diap13Colors.azulOscuro}}>ACTO DE HABLA</strong><br/>Fuerza ilocutiva
          </div>
        </div>
      </div>
      
      <div className="flex-grow p-3 md:p-6 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap13Colors.grisClaro }}>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ color: diap13Colors.azulOscuro }}>
            "{currentSet.examples[currentExample].ejemplo}"
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
          {[
            { title: "📝 MODO", condition: currentSet.examples[currentExample].modoVerbal, question: "¿Forma imperativa?", color: diap13Colors.verdeTurquesa },
            { title: "🏗️ ORACIÓN", condition: currentSet.examples[currentExample].tipoOracion, question: "¿Tipo imperativo?", color: diap13Colors.amarillo },
            { title: "💬 ACTO", condition: currentSet.examples[currentExample].actoHabla, question: "¿Fuerza de mandato?", color: diap13Colors.lila }
          ].map(item => (
            <div key={item.title} className={`p-2 md:p-4 rounded-lg text-center border-2`}
                 style={{ 
                   backgroundColor: showAnalysis ? (item.condition ? item.color+'30' : diap13Colors.grisMedio+'30') : diap13Colors.blanco, 
                   borderColor: showAnalysis ? (item.condition ? item.color : diap13Colors.grisMedio) : diap13Colors.grisClaro 
                 }}>
              <h5 className="font-bold mb-1 md:mb-2 text-xs sm:text-sm md:text-base" 
                  style={{ 
                    fontFamily: 'Raleway Bold, sans-serif', 
                    color: showAnalysis ? (item.condition ? item.color : diap13Colors.grisOscuro) : diap13Colors.azulOscuro 
                  }}>
                {item.title}
              </h5>
              <div className="text-xl md:text-2xl mb-1 md:mb-2">
                {showAnalysis ? (item.condition ? '✅' : '❌') : '❓'}
              </div>
              <p className="text-xs" style={{color: diap13Colors.grisOscuro}}>{item.question}</p>
            </div>
          ))}
        </div>
        
        {showAnalysis && (
          <motion.div {...diap13Animations.fadeIn} className="p-3 md:p-4 rounded-lg" style={{ backgroundColor: diap13Colors.amarillo+'30' }}>
            <h5 className="font-bold mb-2 md:mb-3" style={{ color: diap13Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>🔍 ANÁLISIS LINGÜÍSTICO:</h5>
            <div className="grid grid-cols-1 gap-1 md:gap-2 text-xs md:text-sm">
              <p><strong>Modo verbal:</strong> {currentSet.examples[currentExample].analisis.modoVerbal}</p>
              <p><strong>Tipo de oración:</strong> {currentSet.examples[currentExample].analisis.tipoOracion}</p>
              <p><strong>Acto de habla:</strong> {currentSet.examples[currentExample].analisis.actoHabla}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 md:p-4 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap13Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-2" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap13Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap13Colors.grisOscuro }}>
          La distinción entre estos tres niveles es crucial para el procesamiento del lenguaje natural. Una IA debe reconocer que una misma intención comunicativa (acto de habla) puede expresarse mediante diferentes formas gramaticales.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <button 
          className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg mb-2 sm:mb-0 text-xs md:text-sm"
          style={{ backgroundColor: diap13Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={toggleAnalysis}
        >
          {showAnalysis ? 'Ocultar Análisis' : '🔍 Mostrar Análisis'}
        </button>
        <button 
          className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: diap13Colors.lila, color: diap13Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={nextExample}
        >
          Siguiente Ejemplo ({currentExample + 1}/{currentSet.examples.length})
        </button>
      </div>
      <div className="mt-2 text-center text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>
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
      <div style={{ backgroundColor: diap13Colors.negro }} className="text-white p-3 md:p-4 rounded-t-lg">
        <h3 className="text-lg md:text-xl font-bold text-center" style={{ fontFamily: 'Aglet Mono, monospace' }}>¡IMPERATIVOS ESPECIALES!</h3>
        <h4 className="text-sm md:text-base text-center" style={{ color: diap13Colors.lila }}>Más Allá del Mandato: Actos de Habla Creativos 🎭✨</h4>
      </div>

      <div className="p-3 md:p-4 mb-2 md:mb-3 rounded-lg" style={{ backgroundColor: diap13Colors.lila+'30' }}>
        <div className="grid grid-cols-3 gap-1 md:gap-2 text-center text-xs">
          {[
            { label: "CONDICIONALES", detail: "Expresan consecuencias", color: diap13Colors.verdeTurquesa },
            { label: "RETÓRICOS", detail: "Ironía o imposibilidad", color: diap13Colors.amarillo },
            { label: "PASIVOS", detail: "Destinatario ausente", color: diap13Colors.lila }
          ].map(item => (
            <div key={item.label} className="p-1 md:p-2 rounded" style={{backgroundColor: item.color+'30'}}>
              <strong style={{color: item.color, fontFamily: 'Raleway Bold, sans-serif'}}>{item.label}</strong><br/>{item.detail}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow p-3 md:p-6 rounded-lg mb-2 md:mb-3 min-h-[200px] md:min-h-[250px]" style={{ backgroundColor: diap13Colors.grisClaro }}>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: diap13Colors.negro }}>
            "{examples[currentExample].imperativo}"
          </p>
          <p className="text-xs md:text-sm mb-3 md:mb-4" style={{color: diap13Colors.grisOscuro}}>🎭 ¿Qué tipo de imperativo especial es?</p>
        </div>
        
        {!showInterpretation ? (
          <motion.div {...diap13Animations.fadeIn} className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4">
            {[
              { label: "CONDICIONAL", type: "condicional", color: diap13Colors.verdeTurquesa, detail: "(consecuencia)" },
              { label: "RETÓRICO", type: "retorico", color: diap13Colors.amarillo, detail: "(ironía)", textColor: diap13Colors.azulOscuro },
              { label: "PASIVO", type: "pasivo", color: diap13Colors.lila, detail: "(diferido)", textColor: diap13Colors.azulOscuro }
            ].map(item => (
              <button 
                key={item.type}
                className="w-full sm:w-auto px-3 py-2 md:px-6 md:py-3 text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
                style={{ backgroundColor: item.color, color: item.textColor || diap13Colors.blanco, fontFamily: 'Raleway Semibold, sans-serif' }}
                onClick={() => checkType(item.type)}
              >
                🔄 {item.label}<br/>
                <span className="text-xs">{item.detail}</span>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div {...diap13Animations.scaleIn}>
            <div className={`p-3 md:p-4 rounded-lg mb-3 md:mb-4 border-2 ${
              selectedType === examples[currentExample].tipo ? 'border-green-500' : 'border-red-500'
            }`} style={{ backgroundColor: selectedType === examples[currentExample].tipo ? diap13Colors.exito+'30' : diap13Colors.error+'30' }}>
              <h5 className={`font-bold text-lg ${
                selectedType === examples[currentExample].tipo ? 'text-green-700' : 'text-red-700'
              }`} style={{ fontFamily: 'Raleway Bold, sans-serif' }}>
                {selectedType === examples[currentExample].tipo ? '🎉 ¡CORRECTO!' : '❌ Incorrecto'}
              </h5>
              <p className="mt-2 text-sm md:text-base">
                <strong>Tipo correcto:</strong> {examples[currentExample].tipo.toUpperCase()}
              </p>
            </div>
            
            <div className="p-3 md:p-4 rounded-lg" style={{ backgroundColor: diap13Colors.amarillo+'30' }}>
              <h5 className="font-bold mb-2" style={{ color: diap13Colors.azulOscuro, fontFamily: 'Raleway Bold, sans-serif' }}>🔍 INTERPRETACIÓN:</h5>
              <p className="mb-1 md:mb-2 text-sm md:text-base"><strong>Función real:</strong> {examples[currentExample].funcionReal}</p>
              <p className="mb-1 md:mb-2 text-sm md:text-base"><strong>Paráfrasis:</strong> "{examples[currentExample].parafrasis}"</p>
              <p className="text-xs md:text-sm"><strong>Explicación:</strong> {examples[currentExample].explicacion}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 md:p-4 rounded-lg mb-2 md:mb-3" style={{ backgroundColor: diap13Colors.amarillo+'30' }}>
        <h5 className="font-bold mb-2" style={{ fontFamily: 'Raleway Bold, sans-serif', color: diap13Colors.azulOscuro }}>🤖 Relevancia para IA:</h5>
        <p className="text-xs md:text-sm" style={{ color: diap13Colors.grisOscuro }}>
          Estos representan el mayor desafío para la IA, requieren inferencia pragmática avanzada. Interpretar literalmente "Vete tú a encontrar trabajo" como orden real fallaría en captar la ironía.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto">
        <div className="text-xs md:text-sm mb-2 sm:mb-0" style={{color: diap13Colors.grisOscuro, fontFamily: 'Raleway Medium, sans-serif'}}>
          💡 Clave: Inferencia pragmática en contexto
        </div>
        <button 
          className="px-3 py-1 md:px-4 md:py-2 text-white rounded-lg text-xs md:text-sm"
          style={{ backgroundColor: diap13Colors.negro, fontFamily: 'Raleway Semibold, sans-serif' }}
          onClick={nextExample}
        >
          Siguiente Especial
        </button>
      </div>
      <div className="mt-2 text-center text-xs md:text-sm" style={{color: diap13Colors.grisOscuro}}>
        Ejemplo {currentExample + 1} de {examples.length}
      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL
const Diapositiva13 = () => {
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
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${diap13Colors.verdeTurquesa}25 0%, transparent 60%)`,
      }}
    >
      <motion.div {...diap13Animations.fadeIn} className="mb-2 text-center">
        <h1 className="text-lg md:text-2xl font-bold" style={{ fontFamily: 'Aglet Mono, monospace', color: diap13Colors.azulOscuro }}>
          Complejidad en la Interpretación Oral
        </h1>
        <h2 className="text-sm md:text-base mt-1" style={{ fontFamily: 'Raleway, sans-serif', color: diap13Colors.verdeTurquesa }}>
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
        {...diap13Animations.fadeIn} 
        transition={{delay:0.3}} 
        className="p-2 md:p-3 rounded-lg mt-auto" 
        style={{ 
            backgroundColor: diap13Colors.blanco + 'A6',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${diap13Colors.amarillo}66`
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <button 
            className="px-2 py-1 md:px-3 md:py-2 text-white rounded-lg text-xs mb-2 sm:mb-0"
            style={{ backgroundColor: currentSubSlide === 0 ? diap13Colors.grisMedio : diap13Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
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
                  backgroundColor: currentSubSlide === index ? diap13Colors.amarillo : diap13Colors.grisMedio,
                  color: currentSubSlide === index ? diap13Colors.azulOscuro : diap13Colors.blanco,
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
            style={{ backgroundColor: currentSubSlide === subSlideComponents.length - 1 ? diap13Colors.grisMedio : diap13Colors.azulOscuro, fontFamily: 'Raleway Semibold, sans-serif' }}
            onClick={nextSubSlide}
            disabled={currentSubSlide === subSlideComponents.length - 1}
          >
            Siguiente ▶
          </button>
        </div>
        
        <div className="mt-2 text-center text-xs" style={{color: diap13Colors.grisOscuro}}>
          <p className="font-medium" style={{fontFamily: 'Raleway Medium, sans-serif'}}>Tiempo recomendado: 2-3 minutos por actividad</p>
          <p style={{fontFamily: 'Raleway, sans-serif'}}>Actividad {currentSubSlide + 1} de {subSlideComponents.length} - <span style={{fontFamily: 'Raleway Semibold, sans-serif'}}>{subSlideTitles[currentSubSlide]}</span></p>
        </div>
      </motion.div>
    </div>
  );
};
// =======================================================================
// FIN DIAPOSITIVA 13
// =======================================================================
// =======================================================================
// DIAPOSITIVA 14: AGRADECIMIENTO CON Dziękuję INTERACTIVO Y ANIMADO
// =======================================================================

const Diapositiva14 = ({
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
        background: '#E8E4DB'
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
            dziękuje
          </span>
        ))}
      </div>

      <div className="relative z-20 h-screen flex flex-col p-8">
        {/* Logo pequeño en esquina superior izquierda */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: showElements.logo ? 1 : 0,
            scale: showElements.logo ? 1 : 0.5
          }}
          transition={{ duration: 1, type: "spring" }}
          className="absolute top-4 left-4 z-30"
        >
          <img
            src="/hablandis.png"
            alt="Hablandis"
            className="h-20"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              maxWidth: '200px'
            }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Contenido en 2 columnas */}
        <div className="flex-1 flex items-center justify-center gap-12 px-8">

          {/* COLUMNA IZQUIERDA - Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: showElements.logo ? 1 : 0,
              x: showElements.logo ? 0 : -50
            }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 flex items-center justify-center"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '640px',
                aspectRatio: '16/9',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                border: '4px solid rgba(255,255,255,0.3)'
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/f5L9arSvlEw"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              ></iframe>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA - Texto y contacto */}
          <div className="flex-1 flex flex-col justify-center items-center">

            {/* ¡MUCHAS GRACIAS! */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: showElements.title ? 1 : 0,
                y: showElements.title ? 0 : 50
              }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="mb-8 text-center"
            >
              <h1
                style={{
                  fontFamily: 'Aglet Mono, monospace',
                  fontSize: 'clamp(50px, 8vw, 100px)',
                  fontWeight: 900,
                  letterSpacing: '4px',
                  textShadow: '0 8px 40px rgba(0,0,0,0.07)',
                  lineHeight: '1.2'
                }}
              >
                <span style={{ color: '#5B7591' }}>M</span>
                <span style={{ color: '#CBE1C9' }}>U</span>
                <span style={{ color: '#7FA8C6' }}>C</span>
                <span style={{ color: '#E9DCB0' }}>H</span>
                <span style={{ color: '#C8BDDA' }}>A</span>
                <span style={{ color: '#B9B5AC' }}>S</span>
                <br />
                <span style={{ color: '#646964' }}>G</span>
                <span style={{ color: '#5B7591' }}>R</span>
                <span style={{ color: '#646964' }}>A</span>
                <span style={{ color: '#CBE1C9' }}>C</span>
                <span style={{ color: '#7FA8C6' }}>I</span>
                <span style={{ color: '#E9DCB0' }}>A</span>
                <span style={{ color: '#C8BDDA' }}>S</span>
              </h1>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: showElements.subtitle ? 1 : 0
              }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2
                className="mb-3"
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '28px',
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
                  fontSize: '22px',
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
            >
              <div
                className="inline-block rounded-2xl px-8 py-6"
                style={{
                  backgroundColor: colors.blanco + '80',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center gap-6">
                  <div className="w-28 h-28 bg-gray-50 rounded-xl flex items-center justify-center shadow-inner">
                    <img
                      src="/qr.png"
                      alt="QR Code Presentación EVALIA"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="text-left">
                    <h3 style={{
                      fontFamily: 'Aglet Mono, monospace',
                      fontSize: '20px',
                      fontWeight: 800,
                      color: uniformColor,
                      marginBottom: '4px'
                    }}>
                      Materiales
                    </h3>
                    <p style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '14px',
                      color: colors.grisOscuro
                    }}>
                      Recursos y documentación
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
// FIN DIAPOSITIVA 13
// =======================================================================
// =======================================================================
// COMPONENTE PRINCIPAL DE PRESENTACIÓN - CORREGIDO
// =======================================================================
const Presentacion = () => {
  const [diapositivaActual, setDiapositivaActual] = useState(1);
  const totalDiapositivas = 14; // Diapositivas: 1-Intro, 2-Blindapalabras, 3-Laboratorio, 4-Apoyo, 5-EVALIA, 6-Agentes IA, 7-AgentIAele, 8-MATERIAELE, 9-Flujo IA, 10-Nivel Texto, 11-Prompts, 12-Matching, 13-Imperativos, 14-Despedida

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
  else if (diapositivaActual === 14) SlideComponent = () => <Diapositiva14 />;
  else {
    // Fallback por si acaso
    SlideComponent = () => <div className="flex items-center justify-center h-screen text-2xl">Diapositiva {diapositivaActual} no encontrada</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {SlideComponent && <SlideComponent />}
      {/* Navegación con número de diapositiva */}
      <div className="absolute bottom-4 right-4 flex items-center justify-end z-20">
        <div className="flex items-center space-x-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <button
            className={`p-1.5 rounded-full bg-white bg-opacity-60 text-gray-800 transition-all shadow-sm ${diapositivaActual === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-opacity-90 hover:scale-110'}`}
            onClick={() => cambiarDiapositiva('prev')}
            disabled={diapositivaActual === 1}
            aria-label="Diapositiva anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex items-center space-x-2 px-3">
            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px', fontWeight: 700, color: colors.azulOscuro }}>
              {diapositivaActual}
            </span>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 400, color: colors.grisOscuro }}>
              / {totalDiapositivas}
            </span>
          </div>

          <button
            className={`p-1.5 rounded-full bg-white bg-opacity-60 text-gray-800 transition-all shadow-sm ${diapositivaActual === totalDiapositivas ? 'opacity-30 cursor-not-allowed' : 'hover:bg-opacity-90 hover:scale-110'}`}
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
    </div>
  );
};

export default Presentacion;
