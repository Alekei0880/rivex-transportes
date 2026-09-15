import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Heart, Zap, Users, Eye } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Compromiso',
      description: 'Nos comprometemos a cumplir con los más altos estándares de calidad en cada servicio.'
    },
    {
      icon: Heart,
      title: 'Confianza',
      description: 'Construimos relaciones duraderas basadas en la confianza y la transparencia.'
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Incorporamos las últimas tecnologías para optimizar nuestros procesos.'
    },
    {
      icon: Users,
      title: 'Equipo',
      description: 'Nuestro equipo profesional está capacitado para brindar el mejor servicio.'
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

  return (
    <>
      <Helmet>
        <title>Acerca de Nosotros - RIVEX TRANSPORTES</title>
        <meta
          name="description"
          content="Conoce más sobre RIVEX TRANSPORTES, nuestra historia, misión, valores y compromiso corporativo."
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
          
          {/* Video de fondo */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/camion_movimiento.mp4" // Asegúrate de cambiar esta ruta
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Capa de degradado (Overlay) */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-gray-900/85 to-red-800/90" />

          {/* Contenido */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Acerca de Nosotros
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-red-100 max-w-2xl mx-auto"
            >
              Conoce nuestra historia, misión y la visión que impulsa a RIVEX
            </motion.p>
          </div>
        </section>
        {/* Company History */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Nuestra Historia
                </h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  RIVEX TRANSPORTES nació de la visión de ofrecer servicios de transporte multicarga con los más altos estándares de calidad, seguridad y eficiencia en México.
                </p>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  Con más de una década de experiencia, hemos establecido nuestra reputación como líderes en el sector, brindando soluciones logísticas integrales a empresas de diversos sectores industriales.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Nuestro compromiso con la innovación y la satisfacción del cliente nos ha permitido crecer constantemente y adaptarnos a las necesidades cambiantes del mercado.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/our_history.png"
                  alt="RIVEX Transportes en acción"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-red-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Nuestra Misión
              </h2>
              <p className="text-xl text-red-100 leading-relaxed">
                Proporcionar soluciones de transporte de contenedores confiables, eficientes y seguras, superando las expectativas de nuestros clientes mediante la innovación tecnológica, el compromiso de nuestro equipo y la excelencia operacional.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-16 md:py-24 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Eye className="h-10 w-10 text-red-500" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Nuestra Visión
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Redefinir el transporte de carga en México mediante soluciones logísticas inteligentes, seguras y tecnológicamente integradas, posicionando a RIVEX como un referente nacional en excelencia operacional, innovación continua y confianza absoluta para las industrias que mueven el país.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Nuestros Valores
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Los principios que guían cada decisión y acción en RIVEX
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
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

export default About;