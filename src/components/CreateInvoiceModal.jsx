import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CreateInvoiceModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    numero_contenedor: '',
    remitente: '',
    destino: '',
    tipo_contenedor: '20 pies',
    peso: '',
    contenido: '',
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_entrega_estimada: '',
    costo: '',
    notas: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario comience a editar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.numero_contenedor.trim()) newErrors.numero_contenedor = 'Campo requerido';
    if (!formData.remitente.trim()) newErrors.remitente = 'Campo requerido';
    if (!formData.destino.trim()) newErrors.destino = 'Campo requerido';
    if (!formData.peso.trim()) newErrors.peso = 'Campo requerido';
    if (!formData.contenido.trim()) newErrors.contenido = 'Campo requerido';
    if (!formData.fecha_entrega_estimada) newErrors.fecha_entrega_estimada = 'Campo requerido';
    if (!formData.costo) newErrors.costo = 'Campo requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        numero_contenedor: '',
        remitente: '',
        destino: '',
        tipo_contenedor: '20 pies',
        peso: '',
        contenido: '',
        fecha_inicio: new Date().toISOString().split('T')[0],
        fecha_entrega_estimada: '',
        costo: '',
        notas: '',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20"
          >
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-900">Nueva Factura</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Row 1: Número de Contenedor y Tipo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Contenedor *
                    </label>
                    <input
                      type="text"
                      name="numero_contenedor"
                      value={formData.numero_contenedor}
                      onChange={handleChange}
                      placeholder="CONT-001"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        errors.numero_contenedor ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.numero_contenedor && (
                      <p className="text-red-500 text-sm mt-1">{errors.numero_contenedor}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Contenedor
                    </label>
                    <select
                      name="tipo_contenedor"
                      value={formData.tipo_contenedor}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="20 pies">20 pies</option>
                      <option value="40 pies">40 pies</option>
                      <option value="High Cube">High Cube</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Remitente y Destino */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remitente *
                    </label>
                    <input
                      type="text"
                      name="remitente"
                      value={formData.remitente}
                      onChange={handleChange}
                      placeholder="Nombre de la empresa"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        errors.remitente ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.remitente && (
                      <p className="text-red-500 text-sm mt-1">{errors.remitente}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destino *
                    </label>
                    <input
                      type="text"
                      name="destino"
                      value={formData.destino}
                      onChange={handleChange}
                      placeholder="Ciudad o ubicación"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        errors.destino ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.destino && (
                      <p className="text-red-500 text-sm mt-1">{errors.destino}</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Peso y Contenido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peso (kg) *
                    </label>
                    <input
                      type="number"
                      name="peso"
                      value={formData.peso}
                      onChange={handleChange}
                      placeholder="20000"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        errors.peso ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.peso && (
                      <p className="text-red-500 text-sm mt-1">{errors.peso}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenido *
                    </label>
                    <input
                      type="text"
                      name="contenido"
                      value={formData.contenido}
                      onChange={handleChange}
                      placeholder="Descripción del contenido"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        errors.contenido ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.contenido && (
                      <p className="text-red-500 text-sm mt-1">{errors.contenido}</p>
                    )}
                  </div>
                </div>

                {/* Row 4: Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      name="fecha_inicio"
                      value={formData.fecha_inicio}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Entrega Estimada *
                    </label>
                    <input
                      type="date"
                      name="fecha_entrega_estimada"
                      value={formData.fecha_entrega_estimada}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        errors.fecha_entrega_estimada ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.fecha_entrega_estimada && (
                      <p className="text-red-500 text-sm mt-1">{errors.fecha_entrega_estimada}</p>
                    )}
                  </div>
                </div>

                {/* Row 5: Costo y Notas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Costo ($) *
                    </label>
                    <input
                      type="number"
                      name="costo"
                      value={formData.costo}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        errors.costo ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.costo && (
                      <p className="text-red-500 text-sm mt-1">{errors.costo}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notas Adicionales
                    </label>
                    <input
                      type="text"
                      name="notas"
                      value={formData.notas}
                      onChange={handleChange}
                      placeholder="Información adicional"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Crear Factura
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
