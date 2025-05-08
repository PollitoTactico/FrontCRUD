'use client'
import React, { useState, useEffect } from "react";

const navOptions = [
  "Perfil Usuario",
  "Comparación",
  "Análisis de Riesgo"
];

const HomeMain: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const [form, setForm] = useState({
    NombrePerfil: "",
    MisionCargo: "",
    Empresa: "SG CONSULTING",
    TituloCargo: "",
    Departamento: "",
    FormacionAcademica: "Pregrado",
    ConocimientosCargo: "",
    Experiencia: "",
    FuncionesEsenciales: "",
    ConocimientoTecnologico: ""
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.title]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    try {
      const res = await fetch("/api/ProfileUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess(true);
        setForm({
          NombrePerfil: "",
          MisionCargo: "",
          Empresa: "SG CONSULTING",
          TituloCargo: "",
          Departamento: "",
          FormacionAcademica: "Pregrado",
          ConocimientosCargo: "",
          Experiencia: "",
          FuncionesEsenciales: "",
          ConocimientoTecnologico: ""
        });
      }
    } catch (err) {
      console.error(err);
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3EFE0] flex flex-col items-start">
      
      <div className="pl-8 pt-6">
        <img src="/Images/logoSG.svg" alt="Logo SG" className="w-12 h-12" />
      </div>
      
      <div className="flex flex-row w-full">
        <aside className="bg-[#222222] w-64 min-h-[80vh] mt-4 ml-6 rounded-xl flex flex-col items-center pt-6 pb-4 shadow-lg">
          <nav className="flex flex-col gap-8 w-full mt-2">
            {navOptions.map((option, idx) => (
              <button
                key={option}
                className={`mx-4 flex items-center justify-center px-2 py-3 rounded-lg text-lg font-bold transition-colors
                  ${selected === idx ? "bg-[#22A39F] text-[#222222]" : "text-[#F3EFE0] hover:bg-[#22A39F]/60"}
                `}
                onClick={() => setSelected(idx)}
                disabled={idx !== 0}
              >
                <span>{option}</span>
                {idx !== 0 && (
                  <span className="ml-2 text-xs bg-[#F3EFE0] text-[#222222] px-2 py-1 rounded">
                    Coming soon
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>
       
        <main className="flex-1 flex flex-col items-center justify-start pt-10">
          <div className="relative bg-[#222222] rounded-xl shadow-lg p-8 w-[1200px]">
            
            <button
              type="submit"
              form="profileForm"
              className="absolute -top-8 right-8 bg-[#22A39F] text-[#222222] font-bold px-8 py-4 rounded-xl shadow-md hover:bg-[#F3EFE0] hover:text-[#22A39F] transition-colors flex items-center justify-center"
              title="Guardar"
            >
              <img src="/Images/save.svg" alt="Guardar" className="w-8 h-8" />
            </button>
            <h2 className="text-2xl font-bold text-[#F3EFE0] mb-6">Crear Perfil de Usuario</h2>
            <form id="profileForm" className="flex flex-col gap-4" onSubmit={handleSubmit}>
             
              <div className="flex gap-6">
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Nombre del perfil:</label>
                  <input
                    title="NombrePerfil"
                    value={form.NombrePerfil}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] placeholder-[#222222] font-semibold"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Empresa:</label>
                  <select
                    title="Empresa"
                    value={form.Empresa}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] font-bold"
                  >
                    <option>SG CONSULTING</option>
                    <option>INCOOP</option>
                    <option>ADWA</option>
                    <option>EMPORIUM</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Misión del cargo:</label>
                  <input
                    title="MisionCargo"
                    value={form.MisionCargo}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] placeholder-[#222222] font-semibold"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Título del cargo:</label>
                  <input
                    title="TituloCargo"
                    value={form.TituloCargo}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] placeholder-[#222222] font-semibold"
                  />
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Departamento:</label>
                  <input
                    title="Departamento"
                    value={form.Departamento}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] placeholder-[#222222] font-semibold"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Formación académica:</label>
                  <select
                    title="FormacionAcademica"
                    value={form.FormacionAcademica}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] font-bold"
                  >
                    <option>Pregrado</option>
                    <option>Postgrado</option>
                    <option>Técnico</option>
                    <option>Tecnológico</option>
                    <option>Maestría</option>
                    <option>Doctorado</option>
                    <option>Diplomado</option>
                    <option>Certificación</option>
                  </select>
                </div>
              </div>
              {/* Fila 4: Conocimientos del cargo y Experiencia */}
              <div className="flex gap-6">
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Conocimientos del cargo:</label>
                  <textarea
                    title="ConocimientosCargo"
                    value={form.ConocimientosCargo}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] placeholder-[#222222] font-semibold"
                    rows={3}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Experiencia:</label>
                  <textarea
                    title="Experiencia"
                    value={form.Experiencia}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] placeholder-[#222222] font-semibold"
                    rows={3}
                  />
                </div>
              </div>
              {/* Fila 5: Funciones Esenciales y Conocimiento Tecnológico */}
              <div className="flex gap-6">
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Funciones Esenciales:</label>
                  <textarea
                    title="FuncionesEsenciales"
                    value={form.FuncionesEsenciales}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] placeholder-[#222222] font-semibold"
                    rows={3}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="block text-[#F3EFE0] font-semibold mb-1">Conocimiento Tecnológico:</label>
                  <textarea
                    title="ConocimientoTecnologico"
                    value={form.ConocimientoTecnologico}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 bg-[#22A39F] text-[#222222] placeholder-[#222222] font-semibold"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                {success && (
                  <span className="text-[#22A39F] font-bold mr-4 transition-opacity duration-500">
                    ¡Perfil guardado correctamente!
                  </span>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeMain;