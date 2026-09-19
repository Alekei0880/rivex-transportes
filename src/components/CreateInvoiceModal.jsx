import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Printer, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialForm = { total_distancia_recorrida:'', ub1_rfc:'',ub1_nombre:'',ub1_fecha:'',ub1_dom_cp:'',ub1_dom_estado:'',ub1_dom_municipio:'',ub1_dom_localidad:'',ub1_dom_calle:'', ub2_rfc:'',ub2_nombre:'',ub2_fecha:'',ub2_dom_cp:'',ub2_dom_estado:'',ub2_dom_municipio:'',ub2_dom_localidad:'',ub2_dom_colonia:'',ub2_dom_calle:'', peso_bruto_total:'',peso_neto_total:'',numero_total:'',placa_vm:'',anio_modelo_vm:'',aseguradora_resp_civil:'',poliza_resp_civil:'',numero_licencia:'' };
const sections = [
 ['Datos generales',[['total_distancia_recorrida','Total de la distancia recorrida','343']]],
 ['Ubicación de origen',[['ub1_rfc','RFC del remitente o destinatario','SMH030404NT7'],['ub1_nombre','Nombre del remitente o destinatario','SSA MEXICO HOLDINGS'],['ub1_fecha','Fecha y hora de salida o llegada','24/04/2026 07:00'],['ub1_dom_cp','Código postal','28218'],['ub1_dom_estado','Estado','Colima'],['ub1_dom_municipio','Municipio','Manzanillo'],['ub1_dom_localidad','Localidad','Manzanillo'],['ub1_dom_calle','Calle','BLVD MIGUEL DE LA MADRID HURTADO']]],
 ['Ubicación de destino',[['ub2_rfc','RFC del remitente o destinatario','BATM810608M74'],['ub2_nombre','Nombre del remitente o destinatario','MARCO ANTONIO BASULTO TORRES'],['ub2_fecha','Fecha y hora de salida o llegada','24/04/2026 19:00'],['ub2_dom_cp','Código postal','47899'],['ub2_dom_estado','Estado','Jalisco'],['ub2_dom_municipio','Municipio','Ocotlán'],['ub2_dom_localidad','Localidad','Ocotlán'],['ub2_dom_colonia','Colonia','Lázaro Cárdenas'],['ub2_dom_calle','Calle','LUCIO BLANCO']]],
 ['Mercancías',[['peso_bruto_total','Peso bruto total','54000.000'],['peso_neto_total','Peso neto total','54000.000'],['numero_total','Número total de mercancías','1']]],
 ['Vehículo, seguro y operador',[['placa_vm','Placa VM','62BL3W'],['anio_modelo_vm','Año modelo VM','2017'],['aseguradora_resp_civil','Aseguradora de responsabilidad civil','QUALITAS'],['poliza_resp_civil','Póliza de responsabilidad civil','1340434473'],['numero_licencia','Número de licencia','COL0117525']]],
];
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const formatDate = (value) => {
  if (!value) return '';
  const [date, time = '00:00'] = value.split('T');
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year} ${time}:00`;
};
const replaceOnce = (html, source, value) => {
  if (!source || value === undefined || value === null || value === '') return html;
  const escapedSource = source.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
  return html.replace(new RegExp(`(>[^<>]*?)${escapedSource}([^<>]*?<)`, 'i'), `$1${esc(value)}$2`);
};
const applyFormValues = (template, form, platforms) => {
  const fields = sections.flatMap(([, items]) => items);
  let html = template;
  fields.forEach(([name, , hint]) => {
    const value = name.endsWith('_fecha') ? formatDate(form[name]) : form[name];
    html = replaceOnce(html, hint, value);
  });
  // The template has one vehicle row (rem1). A second platform is inserted as a matching row.
  const first = platforms[0];
  html = replaceOnce(html, 'REM1', first.subtipo);
  html = replaceOnce(html, '62BL3W', first.placa);
  if (platforms[1]) {
    const secondRow = `<tr class="generated-platform"><td>${esc(platforms[1].subtipo)}</td><td>${esc(platforms[1].placa)}</td></tr>`;
    html = html.replace('</body>', `<style>@media print{.generated-platform{display:table-row}}</style>${secondRow}</body>`);
  }
  return html;
};
export default function CreateInvoiceModal({ isOpen, onClose, onSubmit }) {
 const [form,setForm]=useState(initialForm); const [platforms,setPlatforms]=useState([{subtipo:'',placa:''}]); const [errors,setErrors]=useState({});
 const update=(name,value)=>{setForm((f)=>({...f,[name]:value}));setErrors((e)=>({...e,[name]:''}));};
 const generate=async(e)=>{e.preventDefault();const required=[...Object.keys(initialForm),...platforms.flatMap((_,i)=>[`platform_${i}_subtipo`,`platform_${i}_placa`])];const next={};required.forEach((key)=>{const value=key.startsWith('platform_')?platforms[Number(key.split('_')[1])][key.endsWith('subtipo')?'subtipo':'placa']:form[key];if(!String(value||'').trim())next[key]='Campo requerido';});if(Object.keys(next).length){setErrors(next);return;}const template=await fetch('/carta-porte-template.html').then((r)=>r.text());const html=applyFormValues(template,form,platforms);const win=window.open('','_blank');if(!win)return;win.document.write(html);win.document.close();win.onload=()=>win.print();onSubmit(form);setForm(initialForm);setPlatforms([{subtipo:'',placa:''}]);};
 return <AnimatePresence>{isOpen&&<><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 z-40 bg-black/50"/><motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20"><div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white shadow-2xl"><header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4"><div className="flex items-center gap-3"><FileText className="text-red-600"/><div><h2 className="text-xl font-bold">Nueva Carta Porte</h2><p className="text-sm text-gray-500">Los valores existentes del template se conservan.</p></div></div><button type="button" onClick={onClose} aria-label="Cerrar"><X/></button></header><form onSubmit={generate} className="flex flex-col gap-7 p-6">{sections.map(([title,items])=><section key={title}><h3 className="mb-3 border-b pb-2 font-semibold">{title}</h3><div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map(([name,label,hint])=><label key={name} className="flex flex-col gap-1 text-sm font-medium">{label}<input name={name} value={form[name]} onChange={(e)=>update(name,e.target.value)} placeholder={hint} type={name.endsWith('_fecha')?'datetime-local':'text'} className={`rounded-lg border px-3 py-2 font-normal outline-none focus:ring-2 focus:ring-red-600 ${errors[name]?'border-red-500':'border-gray-300'}`}/>{errors[name]&&<span className="text-xs text-red-600">{errors[name]}</span>}</label>)}</div></section>)}<section><div className="mb-3 flex items-center justify-between border-b pb-2"><h3 className="font-semibold">Plataforma(s)</h3>{platforms.length===1?<Button type="button" variant="outline" size="sm" onClick={()=>setPlatforms((p)=>[...p,{subtipo:'',placa:''}])}><Plus data-icon="inline-start"/>Agregar segunda</Button>:<Button type="button" variant="outline" size="sm" onClick={()=>setPlatforms((p)=>p.slice(0,1))}><Trash2 data-icon="inline-start"/>Usar una</Button>}</div><div className="grid gap-4 md:grid-cols-2">{platforms.map((p,i)=><React.Fragment key={i}><input value={p.subtipo} placeholder="Plataforma" required onChange={(e)=>setPlatforms((all)=>all.map((x,j)=>j===i?{...x,subtipo:e.target.value}:x))} className="rounded-lg border px-3 py-2"/><input value={p.placa} placeholder="26VA5L" required onChange={(e)=>setPlatforms((all)=>all.map((x,j)=>j===i?{...x,placa:e.target.value}:x))} className="rounded-lg border px-3 py-2"/></React.Fragment>)}</div></section><div className="flex gap-3 border-t pt-4"><Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancelar</Button><Button type="submit" className="flex-1 bg-red-600 text-white"><Printer data-icon="inline-start"/>Generar PDF</Button></div></form></div></motion.div></>}</AnimatePresence>;
}
export { initialForm };
