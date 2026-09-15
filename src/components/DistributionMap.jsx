import React from 'react';
import { motion } from 'framer-motion';

const DistributionMap = () => {
  // Coordinate system based on the aspect ratio of the provided map image (approx 1.54)
  const width = 1000;
  const height = 650;

  // Map Image Reference: 
  // https://horizons-cdn.hostinger.com/e2c2b7d1-5f36-4f98-ba6f-766dfbb7d803/8d4078250e5aa0129a2591c181b3adb7.png
  
  // Revised coordinates for precise geographic alignment within Mexico's landmass
  // Origin: Colima (Small state on Pacific coast, south of Jalisco)
  const origin = { id: 'col', name: 'Colima', x: 465, y: 470 }; 

  const cities = [
    // Central
    { id: 'cdmx', name: 'CDMX', x: 590, y: 460 },
    //{ id: 'pue', name: 'Puebla', x: 585, y: 495 },
    { id: 'qro', name: 'Querétaro', x: 570, y: 430 },
    { id: 'gto', name: 'Guanajuato', x: 540, y: 430 },
    //{ id: 'slp', name: 'San Luis Potosí', x: 525, y: 400 },
    
    // West / Pacific
    { id: 'gdl', name: 'Guadalajara', x: 470, y: 450 },
    
    // North West
    //{ id: 'tij', name: 'Tijuana', x: 150, y: 100 }, // Moved inland from top-left corner
    //{ id: 'her', name: 'Hermosillo', x: 260, y: 180 }, // Moved inland
    //{ id: 'chi', name: 'Chihuahua', x: 380, y: 200 },
    
    // North East
    { id: 'mty', name: 'Monterrey', x: 560, y: 290 },
    //{ id: 'laredo', name: 'Nuevo Laredo', x: 575, y: 230 },
    
    // East / Gulf
    //{ id: 'ver', name: 'Veracruz', x: 650, y: 500 },
    
    // South
    //{ id: 'oax', name: 'Oaxaca', x: 610, y: 560 },
    
    // Southeast / Peninsula
    //{ id: 'mer', name: 'Mérida', x: 860, y: 360 },
    //{ id: 'cun', name: 'Cancún', x: 920, y: 375 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
      <div className="p-6 md:p-8 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Cobertura Nacional</h3>
          <p className="text-slate-500 mt-1">Conectando Colima con los principales centros logísticos de México</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></span>
            <span className="text-slate-700">Origen (Colima)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm"></span>
            <span className="text-slate-700">Rutas Activas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-800 border-2 border-white shadow-sm"></span>
            <span className="text-slate-700">Destinos</span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[1000/650] bg-slate-50 overflow-hidden group">
        
        {/* Background Map Image Layer */}
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12">
           <img 
             src="https://horizons-cdn.hostinger.com/e2c2b7d1-5f36-4f98-ba6f-766dfbb7d803/8d4078250e5aa0129a2591c181b3adb7.png" 
             alt="Mapa de México con Estados" 
             className="w-full h-full object-contain opacity-90 contrast-110"
           />
        </div>

        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
             <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
               <feMerge>
                   <feMergeNode in="coloredBlur"/>
                   <feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
          </defs>

          {/* Routes Animation */}
          {cities.map((city, i) => {
            // Calculate control point for curved paths (quadratic bezier)
            const midX = (origin.x + city.x) / 2;
            const midY = (origin.y + city.y) / 2;
            // Add slight curvature based on distance to make it look organic
            const curveOffset = -50; 
            
            return (
              <g key={city.id}>
                {/* Route Line - Base shadow/guide */}
                <motion.path
                  d={`M ${origin.x},${origin.y} Q ${midX},${midY + curveOffset} ${city.x},${city.y}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />

                {/* Route Line - Animated */}
                <motion.path
                  d={`M ${origin.x},${origin.y} Q ${midX},${midY + curveOffset} ${city.x},${city.y}`}
                  fill="none"
                  stroke="url(#routeGradient)" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ 
                    duration: 2.5, 
                    delay: 0.2 + (i * 0.1), 
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 3
                  }}
                />
                
                {/* Moving Particle along the route */}
                <motion.circle
                  r="4"
                  fill="#2563eb"
                  stroke="white"
                  strokeWidth="1"
                >
                  <animateMotion
                    dur={`${3 + i * 0.2}s`}
                    repeatCount="indefinite"
                    path={`M ${origin.x},${origin.y} Q ${midX},${midY + curveOffset} ${city.x},${city.y}`}
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                  />
                  <animate 
                    attributeName="opacity" 
                    values="0;1;1;0" 
                    keyTimes="0;0.1;0.9;1" 
                    dur={`${3 + i * 0.2}s`} 
                    repeatCount="indefinite" 
                  />
                </motion.circle>
              </g>
            );
          })}

          {/* Destinations Markers - CLEAN VERSION (No Text) */}
          {cities.map((city, i) => (
            <motion.g 
              key={city.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + (i * 0.1), type: "spring", bounce: 0.4 }}
              className="cursor-default"
            >
              <circle cx={city.x} cy={city.y} r="5" fill="#1e293b" stroke="white" strokeWidth="2" />
              
              {/* Pulsing effect rings for major hubs */}
              {['cdmx', 'mty', 'gdl', 'cun'].includes(city.id) && (
                <circle cx={city.x} cy={city.y} r="10" stroke="#1e293b" strokeWidth="1" fill="none" opacity="0.4">
                  <animate attributeName="r" from="5" to="15" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
            </motion.g>
          ))}

          {/* Origin Marker (Colima) - CLEAN VERSION (No Text) */}
          <motion.g
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Radar ping animation effect */}
            <circle cx={origin.x} cy={origin.y} r="30" fill="#dc2626" opacity="0.2">
              <animate attributeName="r" from="10" to="50" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={origin.x} cy={origin.y} r="20" fill="#dc2626" opacity="0.3">
               <animate attributeName="r" from="5" to="30" dur="2s" repeatCount="indefinite" begin="0.5s" />
               <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            
            {/* Core marker */}
            <circle cx={origin.x} cy={origin.y} r="8" fill="#dc2626" stroke="#fff" strokeWidth="2.5" className="drop-shadow-lg" />
          </motion.g>

        </svg>
      </div>
    </div>
  );
};

export default DistributionMap;