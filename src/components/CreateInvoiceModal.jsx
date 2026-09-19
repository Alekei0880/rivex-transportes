import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, CalendarDays, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialForm = {
  transporte_internacional: '',
  entrada_salida_mercancia: '',
  pais_origen_destino: '',
  via_entrada_salida: '',
  total_distancia_recorrida: '',
  registro_istmo: '',
  ub1_tipo_ubicacion: 'Origen',
  ub1_id_ubicacion: '',
  ub1_rfc: '',
  ub1_nombre: '',
  ub1_num_reg_id_trib: '',
  ub1_residencia_fiscal: '',
  ub1_numero_estacion: '',
  ub1_nombre_estacion: '',
  ub1_navegacion_trafico: '',
  ub1_fecha_hora: '',
  ub1_tipo_estacion: '',
  ub1_distancia_recorrida: '',
  ub1_dom_pais: 'MEX',
  ub1_dom_cp: '',
  ub1_dom_estado: '',
  ub1_dom_municipio: '',
  ub1_dom_localidad: '',
  ub1_dom_colonia: '',
  ub1_dom_calle: '',
  ub1_dom_num_ext: '',
  ub1_dom_num_int: '',
  ub1_dom_referencia: '',
  ub2_tipo_ubicacion: 'Destino',
  ub2_id_ubicacion: '',
  ub2_rfc: '',
  ub2_nombre: '',
  ub2_num_reg_id_trib: '',
  ub2_residencia_fiscal: '',
  ub2_numero_estacion: '',
  ub2_nombre_estacion: '',
  ub2_navegacion_trafico: '',
  ub2_fecha_hora: '',
  ub2_tipo_estacion: '',
  ub2_distancia_recorrida: '',
  ub2_dom_pais: 'MEX',
  ub2_dom_cp: '',
  ub2_dom_estado: '',
  ub2_dom_municipio: '',
  ub2_dom_localidad: '',
  ub2_dom_colonia: '',
  ub2_dom_calle: '',
  ub2_dom_num_ext: '',
  ub2_dom_num_int: '',
  ub2_dom_referencia: '',
  peso_bruto_total: '',
  unidad_peso: 'KGM',
  peso_neto_total: '',
  numero_total: '',
  tipo_permiso_sct: '',
  num_permiso_sct: '',
  configuracion_vehicular: '',
  placa_vm: '',
  anio_modelo_vm: '',
  aseguradora_resp_civil: '',
  poliza_resp_civil: '',
};

const sections = [
  { title: 'Carta porte', fields: [
    ['transporte_internacional', 'Transporte internacional'], ['entrada_salida_mercancia', 'Entrada / salida de mercancía'],
    ['pais_origen_destino', 'País de origen / destino'], ['via_entrada_salida', 'Vía de entrada / salida'],
    ['total_distancia_recorrida', 'Distancia total recorrida'], ['registro_istmo', 'Registro Istmo']
  ] },
  { title: 'Ubicación de origen', prefix: 'ub1_', fields: [
    ['tipo_ubicacion', 'Tipo de ubicación'], ['id_ubicacion', 'ID de ubicación'], ['rfc', 'RFC'], ['nombre', 'Nombre'],
    ['num_reg_id_trib', 'Registro tributario'], ['residencia_fiscal', 'Residencia fiscal'], ['numero_estacion', 'No. estación'],
    ['nombre_estacion', 'Nombre de estación'], ['navegacion_trafico', 'Navegación / tráfico'], ['fecha_hora', 'Fecha y hora', 'date'],
    ['tipo_estacion', 'Tipo de estación'], ['distancia_recorrida', 'Distancia recorrida'], ['dom_pais', 'País'], ['dom_cp', 'Código postal'],
    ['dom_estado', 'Estado'], ['dom_municipio', 'Municipio'], ['dom_localidad', 'Localidad'], ['dom_colonia', 'Colonia'],
    ['dom_calle', 'Calle'], ['dom_num_ext', 'Número exterior'], ['dom_num_int', 'Número interior'], ['dom_referencia', 'Referencia']
  ] },
  { title: 'Ubicación de destino', prefix: 'ub2_', fields: [
    ['tipo_ubicacion', 'Tipo de ubicación'], ['id_ubicacion', 'ID de ubicación'], ['rfc', 'RFC'], ['nombre', 'Nombre'],
    ['num_reg_id_trib', 'Registro tributario'], ['residencia_fiscal', 'Residencia fiscal'], ['numero_estacion', 'No. estación'],
    ['nombre_estacion', 'Nombre de estación'], ['navegacion_trafico', 'Navegación / tráfico'], ['fecha_hora', 'Fecha y hora', 'date'],
    ['tipo_estacion', 'Tipo de estación'], ['distancia_recorrida', 'Distancia recorrida'], ['dom_pais', 'País'], ['dom_cp', 'Código postal'],
    ['dom_estado', 'Estado'], ['dom_municipio', 'Municipio'], ['dom_localidad', 'Localidad'], ['dom_colonia', 'Colonia'],
    ['dom_calle', 'Calle'], ['dom_num_ext', 'Número exterior'], ['dom_num_int', 'Número interior'], ['dom_referencia', 'Referencia']
  ] },
  { title: 'Mercancía y autotransporte', fields: [
    ['peso_bruto_total', 'Peso bruto total'], ['unidad_peso', 'Unidad de peso'], ['peso_neto_total', 'Peso neto total'], ['numero_total', 'Número total'],
    ['tipo_permiso_sct', 'Tipo de permiso SCT'], ['num_permiso_sct', 'Número de permiso SCT'], ['configuracion_vehicular', 'Configuración vehicular'],
    ['placa_vm', 'Placa del vehículo'], ['anio_modelo_vm', 'Año modelo'], ['aseguradora_resp_civil', 'Aseguradora responsabilidad civil'], ['poliza_resp_civil', 'Póliza responsabilidad civil']
  ] }
];

function formatTemplateDate(value) {
  return value ? `${value}T07:00:00` : '';
}

function getTemplateValue(formData, key) {
  const value = formData[key];
  return key.endsWith('fecha_hora') ? formatTemplateDate(value) : value?.trim?.() || value || '';
}

const placeholderExamples = {
  transporte_internacional: 'No',
  entrada_salida_mercancia: 'Entrada',
  pais_origen_destino: 'México / Estados Unidos',
  via_entrada_salida: 'Autotransporte',
  total_distancia_recorrida: '850',
  registro_istmo: 'ISTMO-0001',
  ub1_id_ubicacion: 'OR000001', ub1_rfc: 'RIX010101ABC', ub1_nombre: 'Remitente de ejemplo', ub1_residencia_fiscal: 'MEX', ub1_numero_estacion: 'EST-001', ub1_nombre_estacion: 'Terminal de origen', ub1_navegacion_trafico: 'Altura', ub1_fecha_hora: 'Seleccione fecha', ub1_tipo_estacion: 'Intermedia', ub1_distancia_recorrida: '0', ub1_dom_cp: '64000', ub1_dom_estado: 'Nuevo León', ub1_dom_municipio: 'Monterrey', ub1_dom_localidad: 'Monterrey', ub1_dom_colonia: 'Centro', ub1_dom_calle: 'Av. Constitución', ub1_dom_num_ext: '100', ub1_dom_num_int: '1', ub1_dom_referencia: 'Frente a la terminal',
  ub2_id_ubicacion: 'DE000001', ub2_rfc: 'CLI010101XYZ', ub2_nombre: 'Destinatario de ejemplo', ub2_residencia_fiscal: 'MEX', ub2_numero_estacion: 'EST-002', ub2_nombre_estacion: 'Terminal de destino', ub2_navegacion_trafico: 'Altura', ub2_fecha_hora: 'Seleccione fecha', ub2_tipo_estacion: 'Final', ub2_distancia_recorrida: '850', ub2_dom_cp: '44100', ub2_dom_estado: 'Jalisco', ub2_dom_municipio: 'Guadalajara', ub2_dom_localidad: 'Guadalajara', ub2_dom_colonia: 'Centro', ub2_dom_calle: 'Av. Juárez', ub2_dom_num_ext: '200', ub2_dom_int: '2', ub2_dom_referencia: 'Acceso principal',
  peso_bruto_total: '18000', peso_neto_total: '17500', numero_total: '1', tipo_permiso_sct: 'TPAF01', num_permiso_sct: 'PERM-0001', configuracion_vehicular: 'C2', placa_vm: 'ABC-123-D', anio_modelo_vm: '2024', aseguradora_resp_civil: 'Aseguradora de ejemplo', poliza_resp_civil: 'POL-000001'
};

export default function CreateInvoiceModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const requiredFields = useMemo(() => ['ub1_rfc', 'ub1_nombre', 'ub1_fecha_hora', 'ub2_rfc', 'ub2_nombre', 'ub2_fecha_hora', 'peso_bruto_total', 'unidad_peso', 'numero_total'], []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    requiredFields.forEach((field) => {
      if (!String(formData[field] || '').trim()) nextErrors[field] = 'Campo requerido';
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const generatePdf = async () => {
    if (!validateForm()) return;
    const response = await fetch('/carta-porte-template.html');
    const template = await response.text();
    const documentHtml = template.replace(/<div class="ph ([^"]+)"([^>]*)>\{\{\s*([^}]+?)\s*\}\}<\/div>/g, (full, classes, attributes, token) => {
      const [group, ...fieldParts] = token.trim().split('.');
      const key = group === 'ub1' || group === 'ub2' ? `${group}_${fieldParts.join('_')}` : fieldParts.join('_');
      const value = getTemplateValue(formData, key);
      return value ? `<div class="ph ${classes}"${attributes}>${value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])}</div>` : '';
    }).replace('</head>', '<style>@media print{body{background:#fff}.page{margin:0;box-shadow:none}} .ph{font-family:Arial,Helvetica,sans-serif;font-size:8px;color:#000}</style></head>');
    const printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) return;
    printWindow.document.write(documentHtml);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
    onSubmit(formData);
    setFormData(initialForm);
  };

  return <AnimatePresence>{isOpen && <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />
    <motion.div initial={{ opacity: 0, scale: .95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95, y: 20 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3"><FileText className="h-6 w-6 text-red-600" /><div><h2 className="text-xl font-bold text-gray-900">Nueva Carta Porte</h2><p className="text-sm text-gray-500">Los campos vacíos no se imprimen en el documento.</p></div></div>
          <button type="button" onClick={onClose} aria-label="Cerrar formulario" className="text-gray-500 hover:text-gray-700"><X className="h-6 w-6" /></button>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); generatePdf(); }} className="p-6 flex flex-col gap-8">
          {sections.map(({ title, prefix = '', fields }) => <section key={title} className="flex flex-col gap-4"><h3 className="text-base font-semibold text-gray-900 border-b pb-2">{title}</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{fields.map(([field, label, type]) => { const name = `${prefix}${field}`; const hasError = errors[name]; return <label key={name} className="flex flex-col gap-1 text-sm font-medium text-gray-700">{label}{requiredFields.includes(name) && <span className="text-red-600"> *</span>}<div className="relative"><input name={name} value={formData[name] || ''} onChange={handleChange} type={type === 'date' ? 'date' : 'text'} placeholder={placeholderExamples[name] || ''} required={requiredFields.includes(name)} aria-invalid={Boolean(hasError)} className={`w-full rounded-lg border px-3 py-2 font-normal outline-none focus:ring-2 focus:ring-red-600 ${hasError ? 'border-red-500' : 'border-gray-300'}`} />{type === 'date' && <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />}</div>{hasError && <span className="text-xs text-red-600">{hasError}</span>}</label>; })}</div></section>)}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t"><Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancelar</Button><Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white"><Printer className="h-4 w-4 mr-2" />Generar PDF</Button></div>
        </form>
      </div>
    </motion.div>
  </>}</AnimatePresence>;
}

export { initialForm };

