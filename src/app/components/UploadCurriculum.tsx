'use client';

import React, { useState } from 'react';

const UploadCurriculum = () => {
  const [file, setFile] = useState<File | null>(null);
  const [nombreCandidato, setNombreCandidato] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !nombreCandidato) {
      setMensaje('Por favor, completa todos los campos');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('nombreCandidato', nombreCandidato);

    try {
        const response = await fetch('https://backendcrudapiservice20250420164400.azurewebsites.net/api/pdf/upload', {
            method: 'POST',
            body: formData
          });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      const result = await response.json();
      setMensaje(`✅ Subido con ID: ${result.id}`);
      setFile(null);
      setNombreCandidato('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMensaje(`❌ Error: ${error.message}`);
      } else {
        setMensaje('❌ Error desconocido');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#1a1a1a] p-4 rounded-md text-white w-full max-w-md">
      <h2 className="text-xl font-bold">Subir Curriculum (PDF)</h2>

      <input
        type="text"
        placeholder="Nombre del candidato"
        value={nombreCandidato}
        onChange={(e) => setNombreCandidato(e.target.value)}
        className="p-2 rounded text-black"
      />

      <input
        title='Seleccione un archivo PDF'
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="p-2 bg-white text-black rounded"
      />

      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 transition p-2 rounded font-bold"
      >
        Subir PDF
      </button>

      {mensaje && <p className="text-sm">{mensaje}</p>}
    </form>
  );
};

export default UploadCurriculum;
