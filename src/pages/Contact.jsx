import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    servicio: '',
    descripcionCarga: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.servicio) newErrors.servicio = 'Seleccione un tipo de servicio';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store in localStorage
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

      toast({
        title: "¡Solicitud enviada!",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        servicio: '',
        descripcionCarga: '',
        mensaje: ''
      });
    } else {
      toast({
        title: "Error en el formulario",
        description: "Por favor, completa todos los campos requeridos.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contacto - RIVEX TRANSPORTES</title>
        <meta
          name="description"
          content="Contáctanos para solicitar una cotización o resolver tus dudas sobre nuestros servicios de transporte de contenedores."
        />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-16 sm:pt-20 min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Solicita tu cotización o resuelve tus dudas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Solicitar Cotización
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                          errors.nombre ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Juan Pérez"
                      />
                      {errors.nombre && (
                        <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="juan@ejemplo.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                          errors.telefono ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+52 XXX XXX XXXX"
                      />
                      {errors.telefono && (
                        <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Servicio *
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                        errors.servicio ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="rastreo">Rastreo Satelital 24/7</option>
                      <option value="fulles">Planas Fulles 40-20</option>
                      <option value="portacontenedores">Porta Contenedores</option>
                      <option value="refrigerados">Cajas Refrigeradas</option>
                      <option value="especializado">Transporte Especializado</option>
                    </select>
                    {errors.servicio && (
                      <p className="mt-1 text-sm text-red-500">{errors.servicio}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="descripcionCarga" className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción de Carga
                    </label>
                    <input
                      type="text"
                      id="descripcionCarga"
                      name="descripcionCarga"
                      value={formData.descripcionCarga}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Tipo de mercancía, dimensiones, peso..."
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none ${
                        errors.mensaje ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Cuéntanos más sobre tus necesidades de transporte..."
                    />
                    {errors.mensaje && (
                      <p className="mt-1 text-sm text-red-500">{errors.mensaje}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Solicitud
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 rounded-full p-3">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Ubicación</h3>
                      <p className="text-gray-600">México</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 rounded-full p-3">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                      <a
                        href="https://wa.me/523121434919"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        +52 312 143 4919
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 rounded-full p-3">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a
                        href="mailto:contacto@rivextransportes.com"
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        contacto@rivextransportes.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">¿Prefieres WhatsApp?</h3>
                <p className="mb-6 text-green-50">
                  Contáctanos directamente por WhatsApp para una respuesta rápida
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <a
                    href="https://wa.me/523121434919"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <FaWhatsapp className="h-5 w-5 mr-2" />
                    Chatear en WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default Contact;