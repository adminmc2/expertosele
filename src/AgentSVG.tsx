import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const colors = {
  naranjaMuySuave: '#ffd5b6',     // Naranja muy suave - tono pastel muy claro
  naranjaMuyClaro: '#fec193',     // Naranja muy claro - tono claro
  naranjaMedioClaro: '#ffa664',   // Naranja medio claro - tono medio-claro
  naranjaMediaClaro: '#ff9445',   // Naranja medio-claro - tono medio
  naranjaMedio: '#ff7918',        // Naranja medio - tono medio intenso
  naranjaOscuroIntenso: '#e96e14', // Naranja oscuro intenso - tono oscuro
  blanco: '#FFFFFF',
};

export const AgentSVG = () => {
  const [key, setKey] = useState(0);

  // Auto-repetir la animación cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev: number) => prev + 1);
    }, 5000); // 5 segundos = duración de la animación completa

    return () => clearInterval(interval);
  }, []);

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: 0.5 + i * 0.08,
          duration: 0.8,
          ease: 'easeInOut',
        },
        opacity: {
          delay: 0.5 + i * 0.08,
          duration: 0.3,
        },
      },
    }),
  };

  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.2 + i * 0.1,
        duration: 0.4,
        type: 'spring',
        stiffness: 200,
      },
    }),
  };

  // Definición de paths para AGENTIAELE con tonos naranjas
  const svgPaths = [
    // Letra A
    { d: 'M 50 220 L 90 100', stroke: colors.naranjaOscuroIntenso, index: 0 },
    { d: 'M 90 100 L 130 220', stroke: colors.naranjaOscuroIntenso, index: 1 },
    { d: 'M 65 170 L 115 170', stroke: colors.naranjaMedio, index: 2 },

    // Letra G
    { d: 'M 210 100 L 150 100', stroke: colors.naranjaMedioClaro, index: 3 },
    { d: 'M 150 100 L 150 220', stroke: colors.naranjaMedio, index: 4 },
    { d: 'M 150 220 L 210 220', stroke: colors.naranjaMedioClaro, index: 5 },
    { d: 'M 210 220 L 210 160', stroke: colors.naranjaMediaClaro, index: 6 },
    { d: 'M 210 160 L 180 160', stroke: colors.naranjaOscuroIntenso, index: 7 },

    // Letra E
    { d: 'M 240 100 L 240 220', stroke: colors.naranjaMedio, index: 8 },
    { d: 'M 240 100 L 290 100', stroke: colors.naranjaOscuroIntenso, index: 9 },
    { d: 'M 240 160 L 280 160', stroke: colors.naranjaMediaClaro, index: 10 },
    { d: 'M 240 220 L 290 220', stroke: colors.naranjaOscuroIntenso, index: 11 },

    // Letra N
    { d: 'M 320 220 L 320 100', stroke: colors.naranjaMedio, index: 12 },
    { d: 'M 320 100 L 380 220', stroke: colors.naranjaMediaClaro, index: 13 },
    { d: 'M 380 220 L 380 100', stroke: colors.naranjaMedio, index: 14 },

    // Letra T
    { d: 'M 410 100 L 470 100', stroke: colors.naranjaOscuroIntenso, index: 15 },
    { d: 'M 440 100 L 440 220', stroke: colors.naranjaMedioClaro, index: 16 },

    // Letra I
    { d: 'M 490 100 L 490 220', stroke: colors.naranjaMedio, index: 17 },
    { d: 'M 480 100 L 500 100', stroke: colors.naranjaOscuroIntenso, index: 18 },
    { d: 'M 480 220 L 500 220', stroke: colors.naranjaOscuroIntenso, index: 19 },

    // Letra A (segunda)
    { d: 'M 530 220 L 570 100', stroke: colors.naranjaOscuroIntenso, index: 20 },
    { d: 'M 570 100 L 610 220', stroke: colors.naranjaOscuroIntenso, index: 21 },
    { d: 'M 545 170 L 595 170', stroke: colors.naranjaMedio, index: 22 },

    // Letra E (segunda)
    { d: 'M 640 100 L 640 220', stroke: colors.naranjaMedio, index: 23 },
    { d: 'M 640 100 L 690 100', stroke: colors.naranjaOscuroIntenso, index: 24 },
    { d: 'M 640 160 L 680 160', stroke: colors.naranjaMediaClaro, index: 25 },
    { d: 'M 640 220 L 690 220', stroke: colors.naranjaOscuroIntenso, index: 26 },

    // Letra L
    { d: 'M 720 100 L 720 220', stroke: colors.naranjaMedio, index: 27 },
    { d: 'M 720 220 L 770 220', stroke: colors.naranjaOscuroIntenso, index: 28 },

    // Letra E (tercera)
    { d: 'M 800 100 L 800 220', stroke: colors.naranjaMedio, index: 29 },
    { d: 'M 800 100 L 850 100', stroke: colors.naranjaOscuroIntenso, index: 30 },
    { d: 'M 800 160 L 840 160', stroke: colors.naranjaMediaClaro, index: 31 },
    { d: 'M 800 220 L 850 220', stroke: colors.naranjaOscuroIntenso, index: 32 },
  ];

  const circles = [
    { cx: 90, cy: 100, fill: colors.naranjaMuyClaro, index: 0 },
    { cx: 210, cy: 100, fill: colors.naranjaMedioClaro, index: 1 },
    { cx: 240, cy: 160, fill: colors.naranjaMuySuave, index: 2 },
    { cx: 380, cy: 100, fill: colors.naranjaMedio, index: 3 },
    { cx: 440, cy: 100, fill: colors.naranjaOscuroIntenso, index: 4 },
    { cx: 490, cy: 160, fill: colors.naranjaMuyClaro, index: 5 },
    { cx: 570, cy: 100, fill: colors.naranjaMedioClaro, index: 6 },
    { cx: 640, cy: 160, fill: colors.naranjaMedio, index: 7 },
    { cx: 720, cy: 100, fill: colors.naranjaMediaClaro, index: 8 },
    { cx: 800, cy: 160, fill: colors.naranjaOscuroIntenso, index: 9 },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full" key={key}>
      <svg
        className="svg-agent"
        width="100%"
        height="300"
        viewBox="0 0 900 300"
        preserveAspectRatio="xMinYMin meet"
        style={{
          display: 'block',
          maxWidth: '100%',
        }}
      >
        <g style={{ isolation: 'isolate' }}>
          {svgPaths.map((path, idx) => (
            <motion.path
              key={idx}
              d={path.d}
              custom={path.index}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              fill="none"
              stroke={path.stroke}
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="miter"
              style={{ mixBlendMode: 'multiply' }}
            />
          ))}

          {circles.map((circle, idx) => (
            <motion.circle
              key={idx}
              cx={circle.cx}
              cy={circle.cy}
              r="15"
              custom={circle.index}
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              fill={circle.fill}
              style={{ mixBlendMode: 'multiply' }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
