import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Database, Plus, Search } from 'lucide-react';
import { options } from '@/components/RegisterDataModal';

const schemas = {
  clientes: { title: 'Clientes', singular: 'cliente', fields: [{ key: 'rfc', label: 'RFC', required: true }, { key: 'razon_social', label: 'Razón social', required: true }, { key: 'codigo_postal', label: 'Código postal', required: true }] },
  camiones: { title: 'Camiones', singular: 'camión', fields: [{ key: 'placa', label: 'Placa', required: true }, { key: 'anio_modelo', label: 'Año modelo', type: 'number', required: true }, { key: 'config_vehicular', label: 'Configuración vehicular', required: true }, { key: 'peso_bruto_vehicular', label: 'Peso bruto vehicular', type: 'number', required: true }, { key: 'tipo_permiso_sict', label: 'Tipo de permiso SICT', required: true }, { key: 'num_permiso_sict', label: 'Número de permiso SICT', required: true }, { key: 'aseguradora_rc', label: 'Aseguradora RC', required: true }, { key: 'poliza_rc', label: 'Póliza RC', required: true }] },
  remolques: { title: 'Remolques', singular: 'remolque', fields: [{ key: 'placa', label: 'Placa', required: true }, { key: 'subtipo_remolque', label: 'Subtipo de remolque', required: true }] },
  contenedores: { title: 'Contenedores', singular: 'contenedor', fields: [{ key: 'num_identificador', label: 'Número identificador', required: true }, { key: 'tipo_contenedor', label: 'Tipo de contenedor' }] },
  operadores: { title: 'Operadores', singular: 'operador', fields: [{ key: 'nombre', label: 'Nombre completo', required: true }, { key: 'rfc', label: 'RFC' }, { key: 'num_licencia', label: 'Número de licencia', required: true }] },
};

export default function DataRegistry() {
  const { table = 'clientes' } = useParams();
  const navigate = useNavigate();
  const schema = schemas[table] || schemas.clientes;
  const [records, setRecords] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({});
  const visibleRecords = records.filter((record) => Object.values(record).some((value) => String(value || '').toLowerCase().includes(query.toLowerCase())));

  const saveRecord = (event) => {
    event.preventDefault();
    setRecords((current) => [...current, { ...form, id: current.length + 1 }]);
    setForm({});
    setShowForm(false);
  };

  return <div className="min-h-screen bg-slate-50 pt-20"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><button type="button" onClick={() => navigate('/facturacion')} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Volver"><ArrowLeft size={20} /></button><div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-600"><Database size={14} /> Catálogos</div><h1 className="mt-1 text-2xl font-bold text-slate-900">{schema.title}</h1></div></div><button type="button" onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"><Plus size={17} /> Nuevo {schema.singular}</button></div></header>
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><p className="text-sm text-slate-500">Administra los registros disponibles en la tabla <strong className="text-slate-700">{table}</strong>.</p><label className="relative block sm:w-72"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar registro..." className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" /></label></div><div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead className="bg-slate-50"><tr><th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">ID</th>{schema.fields.map((field) => <th key={field.key} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{field.label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{visibleRecords.map((record) => <tr key={record.id} className="hover:bg-slate-50"><td className="px-5 py-4 text-sm text-slate-500">{record.id}</td>{schema.fields.map((field) => <td key={field.key} className="px-5 py-4 text-sm text-slate-700">{record[field.key] || '—'}</td>)}</tr>)}</tbody></table>{visibleRecords.length === 0 && <div className="px-6 py-16 text-center"><Database className="mx-auto text-slate-300" size={38} /><p className="mt-3 font-semibold text-slate-800">Aún no hay registros</p><p className="mt-1 text-sm text-slate-500">Agrega el primer {schema.singular} para comenzar.</p></div>}</div></div></main>
    {showForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><form onSubmit={saveRecord} className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"><div className="border-b border-slate-200 px-6 py-5"><h2 className="text-lg font-bold text-slate-900">Nuevo {schema.singular}</h2><p className="mt-1 text-sm text-slate-500">Completa los campos para registrar la información.</p></div><div className="grid gap-4 p-6 sm:grid-cols-2">{schema.fields.map((field) => <label key={field.key} className={`flex flex-col gap-1.5 ${field.key === 'config_vehicular' ? 'sm:col-span-2' : ''}`}><span className="text-sm font-medium text-slate-700">{field.label}{field.required && <span className="text-red-600"> *</span>}</span><input required={field.required} type={field.type || 'text'} value={form[field.key] || ''} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" /></label>)}</div><div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4"><button type="button" onClick={() => setShowForm(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white">Cancelar</button><button type="submit" className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Guardar registro</button></div></form></div>}
  </div>;
}

export { schemas };
