// Aquí pegas todo el código del componente RefrigeracionNaissSystem
// (el código completo del artefacto)

import React, { useState, useEffect } from 'react';
import { Calendar, Users, Wrench, Package, DollarSign, BarChart3, Plus, Search, Filter, Upload, Phone, MapPin, Clock, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Eye, Edit, Trash2, LogOut, User, Camera, Settings, Home, Snowflake } from 'lucide-react';

const RefrigeracionNaissSystem = () => {

};import React, { useState, useEffect } from 'react';
import { Calendar, Users, Wrench, Package, DollarSign, BarChart3, Plus, Search, Filter, Upload, Phone, MapPin, Clock, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Eye, Edit, Trash2, LogOut, User, Camera, Settings, Home, Snowflake } from 'lucide-react';

const RefrigeracionNaissSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('admin');
  const [currentUser, setCurrentUser] = useState({ id: 1, nombre: 'Administrador', tipo: 'admin' });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [vistaCalendario, setVistaCalendario] = useState('semana');
  const [fechaActual, setFechaActual] = useState(new Date());
  const [showLogin, setShowLogin] = useState(false);
  
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan Pérez', telefono: '811-123-4567', direccion: 'Col. Centro, Monterrey', email: 'juan@email.com', servicios: 3 },
    { id: 2, nombre: 'María González', telefono: '811-987-6543', direccion: 'Col. San Pedro, San Pedro', email: 'maria@email.com', servicios: 1 }
  ]);
  
  const [servicios, setServicios] = useState([
    { 
      id: 1, 
      clienteId: 1,
      cliente: 'Juan Pérez', 
      especialistaId: 1,
      especialista: 'Carlos López', 
      equipo: 'Refrigerador Samsung', 
      fecha: '2025-09-02', 
      hora: '10:00', 
      estado: 'Completado', 
      monto: 850,
      colonia: 'Centro',
      evidencias: [],
      descripcion: 'Reparación de compresor',
      observaciones: 'Cliente muy satisfecho con el servicio'
    },
    { 
      id: 2, 
      clienteId: 2,
      cliente: 'María González', 
      especialistaId: 2,
      especialista: 'Roberto Díaz', 
      equipo: 'Lavadora LG', 
      fecha: '2025-09-02', 
      hora: '14:00', 
      estado: 'En Proceso', 
      monto: 620,
      colonia: 'San Pedro',
      evidencias: [],
      descripcion: 'Cambio de bomba de agua',
      observaciones: ''
    },
    { 
      id: 3, 
      clienteId: 1,
      cliente: 'Juan Pérez', 
      especialistaId: 1,
      especialista: 'Carlos López', 
      equipo: 'Máquina de Hielo', 
      fecha: '2025-09-03', 
      hora: '09:00', 
      estado: 'Programado', 
      monto: 0,
      colonia: 'Centro',
      evidencias: [],
      descripcion: 'Mantenimiento preventivo',
      observaciones: ''
    }
  ]);

  const [especialistas, setEspecialistas] = useState([
    { id: 1, nombre: 'Carlos López', telefono: '811-111-2222', especialidad: 'Refrigeración', servicios: 15, facturado: 12750, usuario: 'carlos', password: '123456', activo: true },
    { id: 2, nombre: 'Roberto Díaz', telefono: '811-333-4444', especialidad: 'Lavadoras', servicios: 12, facturado: 9800, usuario: 'roberto', password: '123456', activo: true },
    { id: 3, nombre: 'Miguel Torres', telefono: '811-555-6666', especialidad: 'Máquinas de Hielo', servicios: 8, facturado: 6400, usuario: 'miguel', password: '123456', activo: true }
  ]);

  const [inventario, setInventario] = useState([
    { id: 1, pieza: 'Compresor Universal', stock: 5, minimo: 2, precio: 450, proveedor: 'RepuestosMax', categoria: 'Refrigeración' },
    { id: 2, pieza: 'Bomba de Agua LG', stock: 8, minimo: 3, precio: 180, proveedor: 'ElectroPartes', categoria: 'Lavadoras' },
    { id: 3, pieza: 'Termostato Samsung', stock: 1, minimo: 2, precio: 95, proveedor: 'RepuestosMax', categoria: 'Refrigeración' },
    { id: 4, pieza: 'Motor Ventilador', stock: 6, minimo: 2, precio: 220, proveedor: 'MotorTech', categoria: 'General' }
  ]);

  const [formData, setFormData] = useState({});
  const [loginData, setLoginData] = useState({ usuario: '', password: '' });

  const abrirModal = (tipo, data = {}) => {
    setModalType(tipo);
    setFormData(data);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setModalType('');
    setFormData({});
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (loginData.usuario === 'admin' && loginData.password === 'admin123') {
      setCurrentUser({ id: 0, nombre: 'Administrador', tipo: 'admin' });
      setUserRole('admin');
      setShowLogin(false);
    } else {
      const especialista = especialistas.find(e => e.usuario === loginData.usuario && e.password === loginData.password);
      if (especialista) {
        setCurrentUser({ id: especialista.id, nombre: especialista.nombre, tipo: 'especialista' });
        setUserRole('especialista');
        setShowLogin(false);
        setActiveTab('mi-agenda');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole('');
    setActiveTab('dashboard');
    setShowLogin(true);
  };

  const handleSubmit = () => {
    switch(modalType) {
      case 'cliente':
        if (!formData.nombre || !formData.telefono) {
          alert('Por favor complete los campos obligatorios');
          return;
        }
        const nuevoCliente = {
          id: Math.max(...clientes.map(c => c.id), 0) + 1,
          nombre: formData.nombre || '',
          telefono: formData.telefono || '',
          email: formData.email || '',
          direccion: formData.direccion || '',
          servicios: 0
        };
        setClientes([...clientes, nuevoCliente]);
        break;
        
      case 'especialista':
        if (!formData.nombre || !formData.telefono || !formData.especialidad) {
          alert('Por favor complete los campos obligatorios');
          return;
        }
        const nuevoEspecialista = {
          id: Math.max(...especialistas.map(e => e.id), 0) + 1,
          nombre: formData.nombre || '',
          telefono: formData.telefono || '',
          especialidad: formData.especialidad || '',
          usuario: formData.usuario || formData.nombre.toLowerCase().replace(/\s+/g, ''),
          password: formData.password || '123456',
          servicios: 0,
          facturado: 0,
          activo: true
        };
        setEspecialistas([...especialistas, nuevoEspecialista]);
        break;
        
      case 'servicio':
        if (!formData.clienteId || !formData.especialistaId || !formData.fecha) {
          alert('Por favor complete los campos obligatorios');
          return;
        }
        const nuevoServicio = {
          id: Math.max(...servicios.map(s => s.id), 0) + 1,
          clienteId: parseInt(formData.clienteId) || 0,
          cliente: clientes.find(c => c.id === parseInt(formData.clienteId))?.nombre || '',
          especialistaId: parseInt(formData.especialistaId) || 0,
          especialista: especialistas.find(e => e.id === parseInt(formData.especialistaId))?.nombre || '',
          equipo: formData.equipo || '',
          fecha: formData.fecha || '',
          hora: formData.hora || '09:00',
          estado: 'Programado',
          monto: parseFloat(formData.monto) || 0,
          colonia: formData.colonia || '',
          evidencias: [],
          descripcion: formData.descripcion || '',
          observaciones: ''
        };
        setServicios([...servicios, nuevoServicio]);
        break;
        
      case 'inventario':
        if (!formData.pieza || !formData.stock || !formData.precio) {
          alert('Por favor complete los campos obligatorios');
          return;
        }
        const nuevaPieza = {
          id: Math.max(...inventario.map(i => i.id), 0) + 1,
          pieza: formData.pieza || '',
          stock: parseInt(formData.stock) || 0,
          minimo: parseInt(formData.minimo) || 0,
          precio: parseFloat(formData.precio) || 0,
          proveedor: formData.proveedor || '',
          categoria: formData.categoria || 'General'
        };
        setInventario([...inventario, nuevaPieza]);
        break;
    }
    cerrarModal();
  };

  const subirEvidencia = (servicioId, files) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const nuevaEvidencia = {
          id: Date.now() + Math.random(),
          nombre: file.name,
          tipo: formData.tipoEvidencia || 'durante',
          url: e.target.result
        };
        
        setServicios(prev => prev.map(servicio => 
          servicio.id === servicioId 
            ? { ...servicio, evidencias: [...servicio.evidencias, nuevaEvidencia] }
            : servicio
        ));
      };
      reader.readAsDataURL(file);
    });
  };

  const actualizarEstadoServicio = (servicioId, nuevoEstado, observaciones = '') => {
    setServicios(prev => prev.map(servicio =>
      servicio.id === servicioId
        ? { ...servicio, estado: nuevoEstado, observaciones: observaciones || servicio.observaciones }
        : servicio
    ));
  };

  if (showLogin || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Snowflake className="h-12 w-12 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Refrigeración Naiss</h1>
                  <p className="text-sm text-gray-600 italic">"Tu mundo fresco con Pepe Naiss"</p>
                </div>
              </div>
              <h2 className="text-xl text-gray-800">Iniciar Sesión</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                <input
                  type="text"
                  value={loginData.usuario}
                  onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese su usuario"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese su contraseña"
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Iniciar Sesión
              </button>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Usuarios de prueba:</p>
                <p className="text-xs text-gray-500">Admin: usuario "admin", contraseña "admin123"</p>
                <p className="text-xs text-gray-500">Especialista: usuario "carlos", contraseña "123456"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Dashboard = () => {
    const serviciosHoy = servicios.filter(s => s.fecha === '2025-09-02').length;
    const facturadoMes = servicios.reduce((sum, s) => sum + s.monto, 0);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
            <p className="text-gray-600">Bienvenido, {currentUser.nombre}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-600 font-medium">Refrigeración Naiss</p>
            <p className="text-xs text-gray-500">"Tu mundo fresco con Pepe Naiss"</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Servicios Hoy</p>
                <p className="text-3xl font-bold">{serviciosHoy}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Facturado Mes</p>
                <p className="text-3xl font-bold">${facturadoMes.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Clientes Activos</p>
                <p className="text-3xl font-bold">{clientes.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Especialistas</p>
                <p className="text-3xl font-bold">{especialistas.filter(e => e.activo).length}</p>
              </div>
              <Wrench className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Servicios de Hoy</h3>
          <div className="space-y-3">
            {servicios.filter(s => s.fecha === '2025-09-02').map(servicio => (
              <div key={servicio.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{servicio.cliente} - {servicio.equipo}</p>
                    <p className="text-sm text-gray-600">{servicio.hora} | {servicio.especialista}</p>
                    <p className="text-xs text-gray-500">{servicio.descripcion}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      servicio.estado === 'Completado' ? 'bg-green-100 text-green-800' :
                      servicio.estado === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {servicio.estado}
                    </span>
                    {servicio.monto > 0 && (
                      <p className="text-sm text-green-600 font-medium mt-1">${servicio.monto.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventario Bajo Stock</h3>
            <div className="space-y-3">
              {inventario.filter(item => item.stock <= item.minimo).map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-red-600">{item.pieza}</span>
                  <span className="text-sm text-red-600">Stock: {item.stock}</span>
                </div>
              ))}
              {inventario.filter(item => item.stock <= item.minimo).length === 0 && (
                <p className="text-gray-500 text-center">Todo el inventario en buen estado</p>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Especialistas Activos</h3>
            <div className="space-y-3">
              {especialistas.filter(e => e.activo).map(especialista => (
                <div key={especialista.id} className="flex justify-between items-center">
                  <span>{especialista.nombre}</span>
                  <span className="text-sm text-gray-600">{especialista.especialidad}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = userRole === 'admin' ? [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'clientes', name: 'Clientes', icon: Users },
    { id: 'servicios', name: 'Servicios', icon: Wrench },
    { id: 'especialistas', name: 'Especialistas', icon: User },
    { id: 'inventario', name: 'Inventario', icon: Package },
    { id: 'reportes', name: 'Reportes', icon: BarChart3 }
  ] : [
    { id: 'mi-agenda', name: 'Mi Agenda', icon: Calendar },
    { id: 'servicios', name: 'Mis Servicios', icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Snowflake className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Refrigeración Naiss</h1>
                <p className="text-xs text-gray-600 italic">"Tu mundo fresco con Pepe Naiss"</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{currentUser.nombre}</div>
                <div className="text-xs text-gray-600">{userRole === 'admin' ? 'Administrador' : 'Especialista'}</div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 flex items-center gap-2"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="w-64 bg-white shadow-sm h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'clientes' && userRole === 'admin' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Módulo de Clientes - En desarrollo</p>
              <button 
                onClick={() => abrirModal('cliente')}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Agregar Cliente
              </button>
            </div>
          )}
          {activeTab === 'servicios' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Módulo de Servicios - En desarrollo</p>
              <button 
                onClick={() => abrirModal('servicio')}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Agregar Servicio
              </button>
            </div>
          )}
          {activeTab === 'especialistas' && userRole === 'admin' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Módulo de Especialistas - En desarrollo</p>
              <button 
                onClick={() => abrirModal('especialista')}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Agregar Especialista
              </button>
            </div>
          )}
          {activeTab === 'inventario' && userRole === 'admin' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Módulo de Inventario - En desarrollo</p>
              <button 
                onClick={() => abrirModal('inventario')}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Agregar Pieza
              </button>
            </div>
          )}
          {activeTab === 'reportes' && userRole === 'admin' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Módulo de Reportes - En desarrollo</p>
            </div>
          )}
          {activeTab === 'mi-agenda' && userRole === 'especialista' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Mi Agenda - En desarrollo</p>
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalType === 'cliente' && 'Nuevo Cliente'}
                {modalType === 'servicio' && 'Nuevo Servicio'}
                {modalType === 'especialista' && 'Nuevo Especialista'}
                {modalType === 'inventario' && 'Nueva Pieza'}
              </h3>
              <button onClick={cerrarModal} className="text-gray-400 hover:text-gray-600">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {modalType === 'cliente' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre completo *"
                    value={formData.nombre || ''}
                    onChange={(e) => handleFormChange('nombre', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono *"
                    value={formData.telefono || ''}
                    onChange={(e) => handleFormChange('telefono', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email || ''}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Dirección completa"
                    rows="3"
                    value={formData.direccion || ''}
                    onChange={(e) => handleFormChange('direccion', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefrigeracionNaissSystem;