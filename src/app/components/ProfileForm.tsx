import React, { useEffect, useState } from "react";

interface ProfileFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const API_URL = "https://backendcrudapiservice20250420164400.azurewebsites.net";

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    NombrePerfil: initialData?.NombrePerfil || "",
    MisionCargo: initialData?.MisionCargo || "",
    Empresa: initialData?.Empresa || "",
    TituloCargo: initialData?.TituloCargo || "",
    Departamento: initialData?.Departamento || "",
    FormacionAcademica: initialData?.FormacionAcademica || "",
    ConocimientosCargo: initialData?.ConocimientosCargo || "",
    Experiencia: initialData?.Experiencia || "",
    FuncionesEsenciales: initialData?.FuncionesEsenciales || "",
    ConocimientoTecnologico: initialData?.ConocimientoTecnologico || ""
  });
  const [empresas, setEmpresas] = useState<string[]>([]);
  const [formaciones, setFormaciones] = useState<string[]>([]);

  useEffect(() => { 
    setEmpresas(["SG CONSULTIN", "INCOOP", "ADWA", "EMPORIUM"]);
    setFormaciones(["Pregrado", "Postgrado", "Técnico", "Tecnólogo"]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const required = [
      "NombrePerfil",
      "MisionCargo",
      "Empresa",
      "TituloCargo",
      "Departamento",
      "FormacionAcademica"
    ];
    for (const key of required) {
      if (!formData[key as keyof typeof formData]) {
        alert("Por favor complete todos los campos obligatorios.");
        return;
      }
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#222222] p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#F3EFE0] flex items-center gap-3">
        {/* Aquí puedes poner el icono de usuario */}
        <img src="/usurarioprofile.svg" alt="Perfil" className="w-8 h-8 inline" />
        Crear Perfil de Usuario
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-bold text-[#F3EFE0] mb-2">
            Nombre del perfil <span className="text-red-400">*</span>
          </label>
          <input
            title="Nombre del perfil"
            name="NombrePerfil"
            type="text"
            value={formData.NombrePerfil}
            onChange={handleChange}
            className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F] placeholder-[#222222]"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-[#F3EFE0] mb-2">
            Misión del cargo <span className="text-red-400">*</span>
          </label>
          <input
            title="Misión del cargo"
            name="MisionCargo"
            type="text"
            value={formData.MisionCargo}
            onChange={handleChange}
            className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F] placeholder-[#222222]"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-[#F3EFE0] mb-2">
            Empresa <span className="text-red-400">*</span>
          </label>
          <select
            title="Empresa"
            name="Empresa"
            value={formData.Empresa}
            onChange={handleChange}
            className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F]"
            required
          >
            <option value="">Seleccione una empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa} value={empresa}>{empresa}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-lg font-bold text-[#F3EFE0] mb-2">
            Título del cargo <span className="text-red-400">*</span>
          </label>
          <input
            title="Título del cargo"
            name="TituloCargo"
            type="text"
            value={formData.TituloCargo}
            onChange={handleChange}
            className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F] placeholder-[#222222]"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-[#F3EFE0] mb-2">
            Departamento <span className="text-red-400">*</span>
          </label>
          <input
            title="Departamento"
            name="Departamento"
            type="text"
            value={formData.Departamento}
            onChange={handleChange}
            className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F] placeholder-[#222222]"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-bold text-[#F3EFE0] mb-2">
            Formación académica <span className="text-red-400">*</span>
          </label>
          <select
            title="Formación académica"
            name="FormacionAcademica"
            value={formData.FormacionAcademica}
            onChange={handleChange}
            className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F]"
            required
          >
            <option value="">Seleccione una formación</option>
            {formaciones.map((form) => (
              <option key={form} value={form}>{form}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label htmlFor="FuncionesEsenciales" className="block text-lg font-bold text-[#F3EFE0] mb-2">Funciones Esencial</label>
          <textarea
            id="FuncionesEsenciales"
            name="FuncionesEsenciales"
            value={formData.FuncionesEsenciales}
            onChange={handleChange}
            className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold min-h-[80px] focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F] placeholder-[#222222]"
          />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="ConocimientosCargo" className="block text-lg font-bold text-[#F3EFE0] mb-2">Conocimientos del cargo</label>
            <textarea
              id="ConocimientosCargo"
              name="ConocimientosCargo"
              value={formData.ConocimientosCargo}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold min-h-[60px] focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F] placeholder-[#222222]"
            />
          </div>
          <div>
            <label htmlFor="Experiencia" className="block text-lg font-bold text-[#F3EFE0] mb-2">Experiencia</label>
            <textarea
              id="Experiencia"
              name="Experiencia"
              value={formData.Experiencia}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold min-h-[60px] focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F] placeholder-[#222222]"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="ConocimientoTecnologico" className="block text-lg font-bold text-[#F3EFE0] mb-2">Conocimiento Tecnológico</label>
          <textarea
            id="ConocimientoTecnologico"
            name="ConocimientoTecnologico"
            value={formData.ConocimientoTecnologico}
            onChange={handleChange}
            className="block w-full rounded-md border-2 border-[#22A39F] bg-[#22A39F] p-2 text-[#222222] font-semibold min-h-[60px] focus:border-[#22A39F] focus:ring-1 focus:ring-[#22A39F] placeholder-[#222222]"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-lg font-bold text-[#222222] bg-[#F3EFE0] rounded-md hover:bg-[#22A39F] hover:text-[#F3EFE0] transition-colors flex items-center gap-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-lg font-bold text-[#F3EFE0] bg-[#22A39F] rounded-md hover:bg-[#183B4E] transition-colors flex items-center gap-2"
        >
          <img src="/Images/guardaricon.svg" alt="Guardar" className="w-6 h-6" />
          Guardar Perfil
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;