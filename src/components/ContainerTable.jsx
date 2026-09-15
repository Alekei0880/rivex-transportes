import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Calendar, Weight, DollarSign, MapPin } from 'lucide-react';

const statusColors = {
  'En tránsito': 'bg-blue-100 text-blue-800',
  'En espera': 'bg-orange-100 text-orange-800',
  'Entregado': 'bg-green-100 text-green-800',
};

const statusBorders = {
  'En tránsito': 'border-l-blue-600',
  'En espera': 'border-l-orange-600',
  'Entregado': 'border-l-green-600',
};

export default function ContainerTable({ containers }) {
  if (containers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow p-12 text-center"
      >
        <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No se encontraron contenedores
        </h3>
        <p className="text-gray-600">
          Intenta cambiar los filtros o crear un nuevo contenedor
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Contenedor
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Remitente
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Destino
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Detalles
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Costo
              </th>
            </tr>
          </thead>
          <tbody>
            {containers.map((container, index) => (
              <motion.tr
                key={container.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors border-l-4 ${
                  statusBorders[container.estado]
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      {container.numero}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {container.tipo}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[container.estado]
                    }`}
                  >
                    {container.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {container.remitente}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {container.destino}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="space-y-1 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{container.fecha_entrega_estimada}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-gray-400" />
                      <span>{container.peso}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    {container.costo.toLocaleString('es-CO')}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Total: {containers.length} contenedores
        </span>
        <span className="text-sm font-semibold text-gray-900">
          Costo Total: ${containers
            .reduce((sum, c) => sum + c.costo, 0)
            .toLocaleString('es-CO')}
        </span>
      </div>
    </motion.div>
  );
}
