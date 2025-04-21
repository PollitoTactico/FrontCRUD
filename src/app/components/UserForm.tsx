'use client';
import React from 'react';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    numeroTelefono: string;
    cumpleaños: string;
    isActive: boolean;
    password?: string;
    createdAt: string;
}

// Actualizar props
interface UserFormProps {
    user?: UserData;
    onSubmit: (userData: UserData) => void;
    onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    numeroTelefono: user?.numeroTelefono || '',
    cumpleaños: user?.cumpleaños ? new Date(user.cumpleaños).toISOString().split('T')[0] : '',
    isActive: user?.isActive ?? true,
    createdAt: user?.createdAt || new Date().toISOString(),
    password: ''  // Nuevo campo
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.numeroTelefono || !formData.cumpleaños) {
        alert('Por favor complete todos los campos');
        return;
      }
      const formattedData = {
        ...formData,
        isActive: Boolean(formData.isActive),
        cumpleaños: new Date(formData.cumpleaños + 'T00:00:00').toISOString()
      };

      console.log('Sending data:', formattedData); 
      onSubmit(formattedData);
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      alert('Error al procesar el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#578FCA] p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#F5EEDC] text-center">
        {user ? 'Editar Usuario' : 'Nuevo Usuario'}
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#F5EEDC] mb-2">Nombre</label>
          <input
            title='Nombre'
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="mt-1 block w-full rounded-md border border-[#DDA853] bg-[#F5EEDC] p-2 text-[#183B4E] focus:border-[#27548A] focus:ring-1 focus:ring-[#27548A]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#F5EEDC] mb-2">Apellido</label>
          <input
            title='Apellido'
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="mt-1 block w-full rounded-md border border-[#DDA853] bg-[#F5EEDC] p-2 text-[#183B4E] focus:border-[#27548A] focus:ring-1 focus:ring-[#27548A]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#F5EEDC] mb-2">Email</label>
          <input
            title='Email'
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="mt-1 block w-full rounded-md border border-[#DDA853] bg-[#F5EEDC] p-2 text-[#183B4E] focus:border-[#27548A] focus:ring-1 focus:ring-[#27548A]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#F5EEDC] mb-2">Teléfono</label>
          <input
            type="tel"
            title='Teléfono'
            value={formData.numeroTelefono}
            onChange={(e) => setFormData({...formData, numeroTelefono: e.target.value})}
            className="mt-1 block w-full rounded-md border border-[#DDA853] bg-[#F5EEDC] p-2 text-[#183B4E] focus:border-[#27548A] focus:ring-1 focus:ring-[#27548A]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#F5EEDC] mb-2">Cumpleaños</label>
          <input
            title='Cumpleaños'
            type="date"
            value={formData.cumpleaños}
            onChange={(e) => setFormData({...formData, cumpleaños: e.target.value})}
            className="mt-1 block w-full rounded-md border border-[#DDA853] bg-[#F5EEDC] p-2 text-[#183B4E] focus:border-[#27548A] focus:ring-1 focus:ring-[#27548A]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#F5EEDC] mb-2">Estado</label>
          <select
            title='Estado'
            value={formData.isActive.toString()}
            onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
            className="mt-1 block w-full rounded-md border border-[#DDA853] bg-[#F5EEDC] p-2 text-[#183B4E] focus:border-[#27548A] focus:ring-1 focus:ring-[#27548A]"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-sm font-medium text-[#183B4E] bg-[#F5EEDC] rounded-md hover:bg-[#DDA853] transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-[#F5EEDC] bg-[#27548A] rounded-md hover:bg-[#183B4E] transition-colors"
        >
          {user ? 'Guardar Cambios' : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
