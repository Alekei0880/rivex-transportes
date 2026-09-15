import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import DistributionMap from '@/components/DistributionMap';
const Home = () => {
  const whatsappMessage = "¡Hola! quisiera más información de tus servicios.";
  const whatsappUrl = `https://wa.me/523121434919?text=${encodeURIComponent(whatsappMessage)}`;

  const features = [{
    icon: MapPin,
    title: 'Cobertura Nacional',
    description: 'Servicio de transporte a todas las ciudades y puertos de México con rutas optimizadas.'
  }, {
    icon: Shield,
    title: 'Innovación y Compromiso',
    description: 'Somos una empresa nueva y moderna, comprometida con la excelencia y una visión de crecimiento constante para brindar el mejor servicio.'
  }, {
    icon: Sparkles,
    title: 'Modernidad',
    description: 'Flota moderna equipada con tecnología GPS y seguimiento en tiempo real.'
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  return <>
      <Helmet>
        <title>RIVEX TRANSPORTES - Transporte de Contenedores a Todo México</title>
        <meta name="description" content="Servicio profesional de transporte de contenedores a todo México. Cobertura nacional, confiabilidad y seguimiento en tiempo real." />
      </Helmet>

      <motion.main initial="hidden" animate="visible" exit={{
      opacity: 0
    }} className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" 
          style={{
          backgroundImage: "url('/images/camiones_fondo_home.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',

        }}>
            {/* Adjusted overlay for better contrast with white trucks */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-red-800/40 to-gray-900/50" />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="mb-8 flex justify-center">
              <img src="/images/logo.png" alt="RIVEX TRANSPORTES" className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] h-auto object-contain drop-shadow-2xl" />
            </motion.div>
            <motion.p initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="text-xl sm:text-2xl md:text-3xl text-white mb-8 font-medium drop-shadow-lg shadow-black">Movemos tu carga con seguridad, puntualidad y confianza a todo México.</motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50 text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <FaWhatsapp className="h-5 w-5" />
                  <span>Solicitar Cotización</span>
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* About/Company Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                ¿Por Qué Elegir RIVEX?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Somos una nueva fuerza en el transporte multicarga, decididos a marcar la diferencia mediante un servicio de excelencia, tecnología moderna y atención personalizada.</p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true
          }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => <motion.div key={index} variants={itemVariants} whileHover={{
              scale: 1.05,
              y: -5
            }} className="bg-gradient-to-br from-red-50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100">
                  <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>)}
            </motion.div>

            {/* Added Distribution Map Component */}
            <motion.div initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              <DistributionMap />
            </motion.div>
          </div>
        </section>
      </motion.main>
    </>;
};
export default Home;