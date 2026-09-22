import React from 'react';
import { X, ArrowRight, Database, Truck, Users, Container, UserRound, Boxes } from 'lucide-react';

const options = [
  { value: 'clientes', label: 'Clientes', description: 'Razón social, RFC y código postal', icon: Users },
  { value: 'camiones', label: 'Camiones', description: 'Unidades, permisos y póliza', icon: Truck },
  { value: 'remolques', label: 'Remolques', description: 'Placas y subtipo de remolque', icon: Boxes },
  { value: 'contenedores', label: 'Contenedores', description: 'Identificador y tipo', icon: Container },
  { value: 'operadores', label: 'Operadores', description: 'Nombre, RFC y licencia', icon: UserRound },
];

export default function RegisterDataModal({ isOpen, onClose, onContinue }) {
  const [selected, setSelected] = React.useState('clientes');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="register-title">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-600"><Database size={20} /></div>
            <div><h2 id="register-title" className="text-lg font-bold text-slate-900">Registrar información</h2><p className="mt-1 text-sm text-slate-500">Selecciona el catálogo que deseas administrar.</p></div>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button>
        </div>
        <div className="grid gap-3 p-6 sm:grid-cols-2">
          {options.map(({ value, label, description, icon: Icon }) => {
            const active = selected === value;
            return <button key={value} type="button" onClick={() => setSelected(value)} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${active ? 'border-red-500 bg-red-50 ring-2 ring-red-100' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`} aria-pressed={active}>
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${active ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}><Icon size={19} /></span>
              <span><span className="block font-semibold text-slate-900">{label}</span><span className="mt-1 block text-xs text-slate-500">{description}</span></span>
            </button>;
          })}
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white">Cancelar</button><button type="button" onClick={() => onContinue(selected)} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700">Ir al registro <ArrowRight size={16} /></button></div>
      </div>
    </div>
  );
}

export { options };
