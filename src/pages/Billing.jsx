'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, LogOut, Loader2, Search, ChevronDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateInvoiceModal from '@/components/CreateInvoiceModal';
import ContainerTable from '@/components/ContainerTable';

export default function Billing() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCartaPorteModal, setShowCartaPorteModal] = useState(false);
  const [containers, setContainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  useEffect(() => {
    // Verificar sesión y cargar datos
    const loadData = async () => {
      try {
        // Sesión temporal para el prototipo; la autorización final será server-side con MySQL.
        if (sessionStorage.getItem('rivex_session') !== 'active') {
          navigate('/login');
          return;
        }

        const storedUser = sessionStorage.getItem('rivex_user');
        setUser(storedUser ? JSON.parse(storedUser) : { nombre: 'Usuario', rol: 'Administrador' });

        // Por ahora, cargar datos de demostración
        // Estos serán reemplazados con datos reales de la BD
        const demoContainers = [
          {
            id: 1,
            numero: 'CONT-001',
            tipo: '20 pies',
            estado: 'En tránsito',
            remitente: 'Empresa A',
            destino: 'Ciudad X',
            fecha_inicio: '2024-01-15',
            fecha_entrega_estimada: '2024-01-20',
            contenido: 'Productos electrónicos',
            peso: '18 toneladas',
            costo: 5000,
          },
          {
            id: 2,
            numero: 'CONT-002',
            tipo: '40 pies',
            estado: 'Entregado',
            remitente: 'Empresa B',
            destino: 'Ciudad Y',
            fecha_inicio: '2024-01-10',
            fecha_entrega_estimada: '2024-01-18',
            contenido: 'Maquinaria',
            peso: '35 toneladas',
            costo: 8500,
          },
          {
            id: 3,
            numero: 'CONT-003',
            tipo: '20 pies',
            estado: 'En espera',
            remitente: 'Empresa C',
            destino: 'Ciudad Z',
            fecha_inicio: '2024-01-16',
            fecha_entrega_estimada: '2024-01-22',
            contenido: 'Textiles',
            peso: '15 toneladas',
            costo: 4200,
          },
          {
            id: 4,
            numero: 'CONT-004',
            tipo: '40 pies',
            estado: 'En tránsito',
            remitente: 'Empresa D',
            destino: 'Ciudad W',
            fecha_inicio: '2024-01-14',
            fecha_entrega_estimada: '2024-01-21',
            contenido: 'Alimentos',
            peso: '32 toneladas',
            costo: 7800,
          },
        ];
        setContainers(demoContainers);
      } catch (err) {
        console.error('[v0] Error loading data:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = async () => {
    sessionStorage.removeItem('rivex_session');
    sessionStorage.removeItem('rivex_user');
    navigate('/login');
  };

  const handleCreateInvoice = (invoiceData) => {
    // Por ahora solo mostrar en consola
    console.log('[v0] Nueva factura:', invoiceData);
    // Aquí se conectaría a la API de creación
    setShowCartaPorteModal(false);
  };

  const filteredContainers = containers.filter((container) => {
    const matchesSearch =
      container.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.remitente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.destino.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'todos' || container.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Control de Facturación</h1>
              <p className="text-gray-600 mt-1">
                Bienvenido, {user?.nombre || 'Usuario'}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600"
          >
            <p className="text-gray-600 text-sm font-medium">Total Contenedores</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{containers.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600"
          >
            <p className="text-gray-600 text-sm font-medium">En Tránsito</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {containers.filter((c) => c.estado === 'En tránsito').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600"
          >
            <p className="text-gray-600 text-sm font-medium">En Espera</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {containers.filter((c) => c.estado === 'En espera').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600"
          >
            <p className="text-gray-600 text-sm font-medium">Entregados</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {containers.filter((c) => c.estado === 'Entregado').length}
            </p>
          </motion.div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar contenedor, remitente o destino..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white text-gray-700 cursor-pointer"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="En tránsito">En tránsito</option>
                  <option value="En espera">En espera</option>
                  <option value="Entregado">Entregado</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>

            {/* Billing actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                onClick={() => console.info('[v0] Nueva factura pendiente de conexión')}
                variant="outline"
                className="whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Factura
              </Button>
              <Button
                type="button"
                onClick={() => setShowCartaPorteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap"
              >
                <FileText className="h-4 w-4 mr-2" />
                Nueva Carta Porte
              </Button>
            </div>
          </div>
        </div>

        {/* Containers Table */}
        <ContainerTable containers={filteredContainers} />
      </div>

      {/* Create Invoice Modal */}
      {showCartaPorteModal && (
        <CreateInvoiceModal
          isOpen={showCartaPorteModal}
          onClose={() => setShowCartaPorteModal(false)}
          onSubmit={handleCreateInvoice}
        />
      )}
    </div>
  );
}
