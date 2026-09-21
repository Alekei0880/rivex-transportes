import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Printer, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Objeto de formulario adaptado a las variables del template
const initialForm = {
  cp_total_distancia_recorrida: '',
  
  // Origen (ub1)
  ub1_rfc: '', ub1_nombre: '', ub1_fecha_hora: '', 
  ub1_dom_cp: '', ub1_dom_estado: '', ub1_dom_municipio: '', ub1_dom_localidad: '', ub1_dom_calle: '',
  
  // Destino (ub2)
  ub2_rfc: '', ub2_nombre: '', ub2_fecha_hora: '', 
  ub2_dom_cp: '', ub2_dom_estado: '', ub2_dom_municipio: '', ub2_dom_localidad: '', ub2_dom_colonia: '', ub2_dom_calle: '',
  
  // Mercancías (merc)
  merc_peso_bruto_total: '', merc_peso_neto_total: '', merc_numero_total: '',
  
  // Vehículo y Seguros (auto, seg, fig)
  auto_iv_placa_vm: '', auto_iv_anio_modelo_vm: '',
  seg_aseg_resp_civil: '', seg_poliza_resp_civil: '',
  fig_op_numero_licencia: ''
};

const sections = [
  ['Datos generales', [
    ['cp_total_distancia_recorrida', 'Total de la distancia recorrida', '343']
  ]],
  ['Ubicación de origen', [
    ['ub1_rfc', 'RFC del remitente o destinatario', 'SMH030404NT7'],
    ['ub1_nombre', 'Nombre del remitente o destinatario', 'SSA MEXICO HOLDINGS'],
    ['ub1_fecha_hora', 'Fecha y hora de salida', '2026-04-24T07:00'],
    ['ub1_dom_cp', 'Código postal', '28218'],
    ['ub1_dom_estado', 'Estado', 'Colima'],
    ['ub1_dom_municipio', 'Municipio', 'Manzanillo'],
    ['ub1_dom_localidad', 'Localidad', 'Manzanillo'],
    ['ub1_dom_calle', 'Calle', 'BLVD MIGUEL DE LA MADRID HURTADO']
  ]],
  ['Ubicación de destino', [
    ['ub2_rfc', 'RFC del remitente o destinatario', 'BATM810608M74'],
    ['ub2_nombre', 'Nombre del remitente o destinatario', 'MARCO ANTONIO BASULTO TORRES'],
    ['ub2_fecha_hora', 'Fecha y hora de llegada', '2026-04-24T19:00'],
    ['ub2_dom_cp', 'Código postal', '47899'],
    ['ub2_dom_estado', 'Estado', 'Jalisco'],
    ['ub2_dom_municipio', 'Municipio', 'Ocotlán'],
    ['ub2_dom_localidad', 'Localidad', 'Ocotlán'],
    ['ub2_dom_colonia', 'Colonia', 'Lázaro Cárdenas'],
    ['ub2_dom_calle', 'Calle', 'LUCIO BLANCO']
  ]],
  ['Mercancías', [
    ['merc_peso_bruto_total', 'Peso bruto total', '54000.000'],
    ['merc_peso_neto_total', 'Peso neto total', '54000.000'],
    ['merc_numero_total', 'Número total de mercancías', '1']
  ]],
  ['Vehículo, seguros y operador', [
    ['auto_iv_placa_vm', 'Placa VM', '62BL3W'],
    ['auto_iv_anio_modelo_vm', 'Año modelo VM', '2017'],
    ['seg_aseg_resp_civil', 'Aseguradora de resp. civil', 'QUALITAS'],
    ['seg_poliza_resp_civil', 'Póliza de resp. civil', '1340434473'],
    ['fig_op_numero_licencia', 'Número de licencia del operador', 'COL0117525']
  ]],
];

const esc = (value) => String(value || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default function CreateInvoiceModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [platforms, setPlatforms] = useState([{ subtipo: '', placa: '' }]);
  const [errors, setErrors] = useState({});

  const update = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: '' }));
  };

  const generate = async (e) => {
    e.preventDefault();

    // Validar campos requeridos
    const required = [
      ...Object.keys(initialForm),
      ...platforms.flatMap((_, i) => [`platform_${i}_subtipo`, `platform_${i}_placa`])
    ];
    const next = {};
    required.forEach((key) => {
      const value = key.startsWith('platform_')
        ? platforms[Number(key.split('_')[1])][key.endsWith('subtipo') ? 'subtipo' : 'placa']
        : form[key];
      
      
    });

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    const template = await fetch('/carta-porte-template.html').then((r) => r.text());

    // Verificamos si existe la segunda plataforma activada en el estado
    const tieneSegundaPlataforma = platforms.length > 1;

    // Mapeo unificado para las plataformas con lógica condicional de espacios " "
    const customValues = {
      ...form,
      'rem1_subtipo': platforms[0]?.subtipo || ' ',
      'rem1_placa': platforms[0]?.placa || ' ',
      'rem1.subtipo': platforms[0]?.subtipo || ' ',
      'rem1.placa': platforms[0]?.placa || ' ',

      // Si está seleccionada la 2da plataforma, manda lo ingresado; si no, manda " "
      'rem2_subtipo': tieneSegundaPlataforma ? (platforms[1]?.subtipo || ' ') : ' ',
      'rem2_placa': tieneSegundaPlataforma ? (platforms[1]?.placa || ' ') : ' ',
      'rem2.subtipo': tieneSegundaPlataforma ? (platforms[1]?.subtipo || ' ') : ' ',
      'rem2.placa': tieneSegundaPlataforma ? (platforms[1]?.placa || ' ') : ' ',
    };

    // Reemplazo inteligente de variables en la plantilla HTML
    let html = template.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (match, token) => {
      const normalizedKey = token.replaceAll('.', '_');
      const val = customValues[token] ?? customValues[normalizedKey];

      return (val !== undefined && val !== '') ? esc(val) : match;
    });

    // Abrir ventana e imprimir PDF
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.onload = () => win.print();

    if (onSubmit) {
      onSubmit({
        ...form,
        rem1: { subtipo: customValues['rem1_subtipo'], placa: customValues['rem1_placa'] },
        rem2: { subtipo: customValues['rem2_subtipo'], placa: customValues['rem2_placa'] }
      });
    }

    setForm(initialForm);
    setPlatforms([{ subtipo: '', placa: '' }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-black/50" />
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20">
            <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white shadow-2xl">
              <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="text-red-600" />
                  <div>
                    <h2 className="text-xl font-bold">Nueva Carta Porte</h2>
                    <p className="text-sm text-gray-500">Los datos ingresados se inyectarán directamente en la plantilla PDF.</p>
                  </div>
                </div>
                <button type="button" onClick={onClose} aria-label="Cerrar"><X /></button>
              </header>

              <form onSubmit={generate} className="flex flex-col gap-7 p-6">
                {sections.map(([title, items]) => (
                  <section key={title}>
                    <h3 className="mb-3 border-b pb-2 font-semibold">{title}</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {items.map(([name, label, hint]) => (
                        <label key={name} className="flex flex-col gap-1 text-sm font-medium">
                          {label}
                          <input
                            name={name}
                            value={form[name] || ''}
                            onChange={(e) => update(name, e.target.value)}
                            placeholder={hint}
                            type={name.endsWith('_fecha_hora') ? 'datetime-local' : 'text'}
                            className={`rounded-lg border px-3 py-2 font-normal outline-none focus:ring-2 focus:ring-red-600 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors[name] && <span className="text-xs text-red-600">{errors[name]}</span>}
                        </label>
                      ))}
                    </div>
                  </section>
                ))}

                {/* Sección de Plataformas / Remolques */}
                <section>
                  <div className="mb-3 flex items-center justify-between border-b pb-2">
                    <h3 className="font-semibold">Plataforma(s) / Remolques</h3>
                    {platforms.length === 1 ? (
                      <Button type="button" variant="outline" size="sm" onClick={() => setPlatforms((p) => [...p, { subtipo: '', placa: '' }])}>
                        <Plus data-icon="inline-start" />Agregar segunda
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" size="sm" onClick={() => setPlatforms((p) => p.slice(0, 1))}>
                        <Trash2 data-icon="inline-start" />Usar una
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {platforms.map((p, i) => (
                      <React.Fragment key={i}>
                        <div className="flex flex-col gap-1 text-sm font-medium">
                          <span>Subtipo Plataforma {i + 1}</span>
                          <input
                            value={p.subtipo}
                            placeholder={`Ej. CTR004 (rem${i + 1}.subtipo)`}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPlatforms((all) => all.map((x, j) => j === i ? { ...x, subtipo: val } : x));
                              setErrors((err) => ({ ...err, [`platform_${i}_subtipo`]: '' }));
                            }}
                            className={`rounded-lg border px-3 py-2 ${errors[`platform_${i}_subtipo`] ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors[`platform_${i}_subtipo`] && <span className="text-xs text-red-600">{errors[`platform_${i}_subtipo`]}</span>}
                        </div>
                        <div className="flex flex-col gap-1 text-sm font-medium">
                          <span>Placa Plataforma {i + 1}</span>
                          <input
                            value={p.placa}
                            placeholder={`Ej. 20VA7J (rem${i + 1}.placa)`}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPlatforms((all) => all.map((x, j) => j === i ? { ...x, placa: val } : x));
                              setErrors((err) => ({ ...err, [`platform_${i}_placa`]: '' }));
                            }}
                            className={`rounded-lg border px-3 py-2 ${errors[`platform_${i}_placa`] ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors[`platform_${i}_placa`] && <span className="text-xs text-red-600">{errors[`platform_${i}_placa`]}</span>}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </section>

                <div className="flex gap-3 border-t pt-4">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancelar</Button>
                  <Button type="submit" className="flex-1 bg-red-600 text-white"><Printer data-icon="inline-start" />Generar PDF</Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { initialForm };