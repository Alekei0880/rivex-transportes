import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialForm = {
  total_distancia_recorrida: '', ub1_rfc: '', ub1_nombre: '', ub1_fecha: '', ub1_dom_cp: '', ub1_dom_estado: '', ub1_dom_municipio: '', ub1_dom_localidad: '', ub1_dom_calle: '',
  ub2_rfc: '', ub2_nombre: '', ub2_fecha: '', ub2_dom_cp: '', ub2_dom_estado: '', ub2_dom_municipio: '', ub2_dom_localidad: '', ub2_dom_colonia: '', ub2_dom_calle: '',
  peso_bruto_total: '', peso_neto_total: '', numero_total: '', placa_vm: '', anio_modelo_vm: '', aseguradora_resp_civil: '', poliza_resp_civil: '', numero_licencia: '',
};

const sections = [
  ['Datos generales', [['total_distancia_recorrida', 'Total de la distancia recorrida', '343']]],
  ['Ubicación de origen', [['ub1_rfc', 'RFC del remitente o destinatario', 'SMH030404NT7'], ['ub1_nombre', 'Nombre del remitente o destinatario', 'SSA MEXICO HOLDINGS'], ['ub1_fecha', 'Fecha y hora de salida o llegada', '2026-04-24T07:00'], ['ub1_dom_cp', 'Código postal', '28218'], ['ub1_dom_estado', 'Estado', 'Colima'], ['ub1_dom_municipio', 'Municipio', 'Manzanillo'], ['ub1_dom_localidad', 'Localidad', 'Manzanillo'], ['ub1_dom_calle', 'Calle', 'BLVD MIGUEL DE LA MADRID HURTADO']]],
  ['Ubicación de destino', [['ub2_rfc', 'RFC del remitente o destinatario', 'BATM810608M74'], ['ub2_nombre', 'Nombre del remitente o destinatario', 'MARCO ANTONIO BASULTO TORRES'], ['ub2_fecha', 'Fecha y hora de salida o llegada', '2026-04-24T19:00'], ['ub2_dom_cp', 'Código postal', '47899'], ['ub2_dom_estado', 'Estado', 'Jalisco'], ['ub2_dom_municipio', 'Municipio', 'Ocotlán'], ['ub2_dom_localidad', 'Localidad', 'Ocotlán'], ['ub2_dom_colonia', 'Colonia', 'Lázaro Cárdenas'], ['ub2_dom_calle', 'Calle', 'LUCIO BLANCO']]],
  ['Mercancías', [['peso_bruto_total', 'Peso bruto total', '54000.000'], ['peso_neto_total', 'Peso neto total', '54000.000'], ['numero_total', 'Número total de mercancías', '1']]],
  ['Vehículo, seguro y operador', [['placa_vm', 'Placa VM', '62BL3W'], ['anio_modelo_vm', 'Año modelo VM', '2017'], ['aseguradora_resp_civil', 'Aseguradora de responsabilidad civil', 'QUALITAS'], ['poliza_resp_civil', 'Póliza de responsabilidad civil', '1340434473'], ['numero_licencia', 'Número de licencia', 'COL0117525']]],
];

const defaults = {
  total_distancia_recorrida: '343', ub1_rfc: 'SMH030404NT7', ub1_nombre: 'SSA MEXICO HOLDINGS', ub1_fecha: '2026-04-24T07:00', ub1_dom_cp: '28218', ub1_dom_estado: 'Colima', ub1_dom_municipio: 'Manzanillo', ub1_dom_localidad: 'Manzanillo', ub1_dom_calle: 'BLVD MIGUEL DE LA MADRID HURTADO',
  ub2_rfc: 'BATM810608M74', ub2_nombre: 'MARCO ANTONIO BASULTO TORRES', ub2_fecha: '2026-04-24T19:00', ub2_dom_cp: '47899', ub2_dom_estado: 'Jalisco', ub2_dom_municipio: 'Ocotlán', ub2_dom_localidad: 'Ocotlán', ub2_dom_colonia: 'Lázaro Cárdenas', ub2_dom_calle: 'LUCIO BLANCO',
  peso_bruto_total: '54000.000', peso_neto_total: '54000.000', numero_total: '1', placa_vm: '62BL3W', anio_modelo_vm: '2017', aseguradora_resp_civil: 'QUALITAS', poliza_resp_civil: '1340434473', numero_licencia: 'COL0117525',
};

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const dateForTemplate = (value) => value ? `${value}:00` : '';

function replaceTemplateValue(html, oldValue, newValue) {
  if (!oldValue || oldValue === newValue) return html;
  return html.split(oldValue).join(esc(newValue));
}

export default function CreateInvoiceModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [platforms, setPlatforms] = useState([{ subtipo: '', placa: '' }]);
  const [errors, setErrors] = useState({});

  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const generate = async (event) => {
    event.preventDefault();
    const required = [...Object.keys(initialForm), ...platforms.flatMap((_, index) => [`platform_${index}_subtipo`, `platform_${index}_placa`])];
    const nextErrors = {};
    required.forEach((key) => {
      const value = key.startsWith('platform_') ? platforms[Number(key.split('_')[1])][key.endsWith('subtipo') ? 'subtipo' : 'placa'] : form[key];
      if (!String(value || '').trim()) nextErrors[key] = 'Campo requerido';
    });
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    let html = await fetch('/carta-porte-template.html').then((response) => response.text());
    const values = { ...form, ub1_fecha: dateForTemplate(form.ub1_fecha), ub2_fecha: dateForTemplate(form.ub2_fecha) };

    // El template ya contiene todos los datos no editables del script de Python.
    // Solo se sustituyen los valores que el usuario capturó; lo demás permanece intacto.
    Object.entries(values).forEach(([field, value]) => {
      html = replaceTemplateValue(html, defaults[field], value);
    });

    html = replaceTemplateValue(html, '26VA5L', platforms[0].placa);
    html = replaceTemplateValue(html, 'Plataforma', platforms[0].subtipo);

    if (platforms.length === 2) {
      const secondRow = `<div class="generated-remolque-row" style="position:fixed;left:12%;right:12%;bottom:42px;padding:8px 12px;border:1px solid #777;background:#fff;font:11px Arial;display:flex;gap:28px"><span>Remolque 2</span><span>${esc(platforms[1].subtipo)}</span><span>${esc(platforms[1].placa)}</span></div>`;
      html = html.replace('</body>', `<div class="generated-remolques">${secondRow}</div></body>`);
    }

    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.onload = () => win.print();
    onSubmit(form);
    setForm(initialForm);
    setPlatforms([{ subtipo: '', placa: '' }]);
  };

  return <AnimatePresence>{isOpen && <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-black/50" />
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4"><div className="flex items-center gap-3"><FileText className="text-red-600" /><div><h2 className="text-xl font-bold">Nueva Carta Porte</h2><p className="text-sm text-gray-500">Los datos no capturados conservan los valores de la plantilla.</p></div></div><button type="button" onClick={onClose} aria-label="Cerrar"><X /></button></header>
        <form onSubmit={generate} className="flex flex-col gap-7 p-6">
          {sections.map(([title, items]) => <section key={title}><h3 className="mb-3 border-b pb-2 font-semibold">{title}</h3><div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map(([name, label, hint]) => <label key={name} className="flex flex-col gap-1 text-sm font-medium">{label}<input name={name} value={form[name]} onChange={(event) => update(name, event.target.value)} placeholder={hint} type={name.endsWith('_fecha') ? 'datetime-local' : 'text'} className={`rounded-lg border px-3 py-2 font-normal outline-none focus:ring-2 focus:ring-red-600 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`} />{errors[name] && <span className="text-xs text-red-600">{errors[name]}</span>}</label>)}</div></section>)}
          <section><div className="mb-3 flex items-center justify-between border-b pb-2"><h3 className="font-semibold">Remolque(s)</h3>{platforms.length === 1 ? <Button type="button" variant="outline" size="sm" onClick={() => setPlatforms((current) => [...current, { subtipo: '', placa: '' }])}><Plus data-icon="inline-start" />Agregar segundo</Button> : <Button type="button" variant="outline" size="sm" onClick={() => setPlatforms((current) => current.slice(0, 1))}><Trash2 data-icon="inline-start" />Quitar segundo</Button>}</div><div className="grid grid-cols-1 gap-4 md:grid-cols-2">{platforms.map((platform, index) => <React.Fragment key={index}><label className="flex flex-col gap-1 text-sm font-medium">Plataforma {index + 1}<input value={platform.subtipo} placeholder="Plataforma" onChange={(event) => setPlatforms((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, subtipo: event.target.value } : item))} className="rounded-lg border border-gray-300 px-3 py-2 font-normal" />{errors[`platform_${index}_subtipo`] && <span className="text-xs text-red-600">Campo requerido</span>}</label><label className="flex flex-col gap-1 text-sm font-medium">Placa {index + 1}<input value={platform.placa} placeholder="26VA5L" onChange={(event) => setPlatforms((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, placa: event.target.value } : item))} className="rounded-lg border border-gray-300 px-3 py-2 font-normal" />{errors[`platform_${index}_placa`] && <span className="text-xs text-red-600">Campo requerido</span>}</label></React.Fragment>)}</div></section>
          <div className="flex justify-end gap-3 border-t pt-5"><Button type="button" variant="outline" onClick={onClose}>Cancelar</Button><Button type="submit" className="bg-red-600 hover:bg-red-700">Generar PDF</Button></div>
        </form>
      </div>
    </motion.div>
  </>}</AnimatePresence>;
}

export { initialForm };
