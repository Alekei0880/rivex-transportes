import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Satellite, Truck, Container, Snowflake, Radio, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Services = () => {
  const [currentImage, setCurrentImage] = React.useState(0);

  const galleryImages = [
    {
      src: '/images/camiones/refrigerada.png',
      alt: "Caja refrigerada",
      caption: "Transporte especializado para productos que requieren cadena de frío.",
      message: "¡Hola! quisiera más información sobre Caja Refrigerada"
    },
    {
      src: '/images/camiones/plataforma_porta_c.png',
      alt: "Plataforma porta contenedores",
      caption: "Unidades versátiles para el transporte de contenedores marítimos.",
      message: "¡Hola! quisiera más información sobre Plataforma Porta Contenedores"
    },
    {
      src: '/images/camiones/caja_seca.png',
      alt: "Caja seca de 53 pies",
      caption: "Flota moderna para carga general con máxima seguridad y eficiencia.",
      message: "¡Hola! quisiera más información sobre Caja Seca de 53 pies"
    },
    {
      src: '/images/camiones/t_contenedor.png',
      alt: "Transportes con contenedor",
      caption: "Nuestra flota, equipada con contenedores de última generación para un transporte seguro y eficiente.",
      message: "¡Hola! quisiera más información sobre Transportes con Contenedor"
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const services = [
    {
      icon: Satellite,
      title: 'RASTREO SATELITAL 24/7',
      description: 'Monitoreo continuo de su carga en tiempo real para garantizar seguridad y puntualidad en cada trayecto.'
    },
    {
      icon: Truck,
      title: 'PLANAS FULLES 40-20',
      description: 'Configuraciones de doble remolque optimizadas para maximizar la capacidad de carga y reducir costos operativos.'
    },
    {
      icon: Container,
      title: 'PORTA CONTENEDORES 40 - 20',
      description: 'Unidades especializadas y versátiles para el transporte seguro de contenedores marítimos de diversas dimensiones.'
    },
    {
      icon: Snowflake,
      title: 'CAJAS REFRIGERADAS DE 53 PIES',
      description: 'Transporte con temperatura controlada para productos perecederos, garantizando la cadena de frío de principio a fin.'
    },
    {
      icon: Radio,
      title: 'COMUNICACIÓN DE DOS VÍAS',
      description: 'Enlace constante con el operador mediante radio y celular para una coordinación logística impecable.'
    },
    {
      icon: Lock,
      title: 'SEGURIDAD AVANZADA',
      description: 'Uso de candados y dispositivos de alarma de inmovilización de la unidad para máxima protección contra robos.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  React.useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Servicios - RIVEX TRANSPORTES</title>
        <meta
          name="description"
          content="Descubre nuestros servicios: Rastreo Satelital, Planas Fulles, Porta Contenedores, Cajas Refrigeradas, y más. Soluciones integrales de transporte."
        />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-16 sm:pt-20"
      >
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/fondo-servicios.png')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',

            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-gray-900/85 to-red-800/90" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Nuestros Servicios
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-red-100 max-w-2xl mx-auto"
            >
              Excelencia operativa y tecnología de punta en cada kilómetro
            </motion.p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="bg-white py-12 md:py-16">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
               <motion.div
                 key={currentImage}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.7 }}
                 className="absolute inset-0"
               >
                 <img
                   src={galleryImages[currentImage].src}
                   alt={galleryImages[currentImage].alt}
                   className="w-full h-full object-cover object-center"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                 
                 <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {galleryImages[currentImage].alt}
                    </h3>
                    <p className="text-lg text-gray-200 mb-6 max-w-2xl">
                      {galleryImages[currentImage].caption}
                    </p>
                    <a 
                      href={`https://wa.me/523121434919?text=${encodeURIComponent(galleryImages[currentImage].message)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#C1121F] hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Más Información
                    </a>
                 </div>
               </motion.div>

               {/* Navigation Buttons */}
               <button 
                 onClick={prevImage}
                 className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all z-10"
                 aria-label="Previous image"
               >
                 <ChevronLeft className="w-6 h-6" />
               </button>
               <button 
                 onClick={nextImage}
                 className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all z-10"
                 aria-label="Next image"
               >
                 <ChevronRight className="w-6 h-6" />
               </button>

               {/* Dots */}
               <div className="absolute bottom-8 right-8 flex space-x-2 z-10 hidden sm:flex">
                 {galleryImages.map((_, idx) => (
                   <button
                     key={idx}
                     onClick={() => setCurrentImage(idx)}
                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
                       idx === currentImage ? 'bg-red-500 w-8' : 'bg-white/50 hover:bg-white'
                     }`}
                     aria-label={`Go to slide ${idx + 1}`}
                   />
                 ))}
               </div>
             </div>
           </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-lg self-start">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </motion.main>
    </>
  );
};

export default Services;