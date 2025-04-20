'use client';
import React from 'react';
import UserForm from './UserForm';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  numeroTelefono: string;
  cumpleaños: string;
  isActive: boolean;
  createdAt: string;
  passwordHash: string;
  salt: string;

}

const UserTable = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [searchId, setSearchId] = React.useState('');

  React.useEffect(() => {
    fetchUsers();
  }, []);

  // Al inicio del archivo, después de los imports
  const API_URL = 'https://backendcrudapiservice20250420164400.azurewebsites.net';
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/Users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreate = async (userData: any) => {
    try {
      const dataWithCreatedAt = {
        ...userData,
        createdAt: new Date().toISOString()
      };
      console.log('Creating user:', dataWithCreatedAt);
      const response = await fetch(`${API_URL}/api/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithCreatedAt),
      });

      const responseData = await response.text();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error(responseData || 'Error al crear usuario');
      }

      await fetchUsers();
      setIsFormOpen(false);
    } catch (error: any) {
      console.error('Create error:', error);
      alert(error?.message || 'Error al crear usuario');
    }
  };

  const handleUpdate = async (userData: any) => {
    try {
      const updateData = {
        id: selectedUser?.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        numeroTelefono: userData.numeroTelefono,
        cumpleaños: userData.cumpleaños,
        isActive: userData.isActive,
        createdAt: selectedUser?.createdAt
      };

      console.log('Updating user:', updateData);
      const response = await fetch(`${API_URL}/api/Users/${selectedUser?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const responseData = await response.text();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error(responseData || 'Error al actualizar usuario');
      }

      await fetchUsers();
      setIsFormOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      console.error('Update error:', error);
      alert(error?.message || 'Error al actualizar usuario');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        const response = await fetch(`${API_URL}/api/Users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchUsers();
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSearch = async () => {
    if (searchId) {
      try {
        const response = await fetch(`${API_URL}/api/Users/${searchId}`);
        if (response.ok) {
          const data = await response.json();
          setUsers([data]);
        }
      } catch (error) {
        console.error('Error searching user:', error);
      }
    } else {
      fetchUsers();
    }
  };

  return (
    <div className="container mx-auto">
      {isFormOpen ? (
        <UserForm
          onSubmit={selectedUser ? handleUpdate : handleCreate}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Buscar por ID"
                className="px-4 py-2 border rounded bg-[#F5EEDC] text-[#183B4E] placeholder-[#27548A] border-[#DDA853]"
              />
              <button
                onClick={handleSearch}
                className="bg-[#27548A] text-[#F5EEDC] px-4 py-2 rounded hover:bg-[#183B4E] transition-colors"
              >
                Buscar
              </button>
            </div>
            <button
              onClick={() => {
                setSelectedUser(null);
                setIsFormOpen(true);
              }}
              className="bg-[#DDA853] text-[#183B4E] px-4 py-2 rounded hover:bg-[#F5EEDC] hover:text-[#27548A] transition-colors"
            >
              Nuevo Usuario
            </button>
          </div>

          <table className="min-w-full bg-[#183B4E] border border-[#DDA853] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#27548A]">
                <th className="px-6 py-3 border-b border-[#DDA853] text-[#F5EEDC]">ID</th>
                <th className="px-6 py-3 border-b border-[#DDA853] text-[#F5EEDC]">Nombre</th>
                <th className="px-6 py-3 border-b border-[#DDA853] text-[#F5EEDC]">Apellido</th>
                <th className="px-6 py-3 border-b border-[#DDA853] text-[#F5EEDC]">Email</th>
                <th className="px-6 py-3 border-b border-[#DDA853] text-[#F5EEDC]">Teléfono</th>
                <th className="px-6 py-3 border-b border-[#DDA853] text-[#F5EEDC]">Cumpleaños</th>
                <th className="px-6 py-3 border-b border-[#DDA853] text-[#F5EEDC]">Estado</th>
                <th className="px-6 py-3 border-b border-[#DDA853] text-[#F5EEDC]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#27548A] transition-colors">
                  <td className="px-6 py-4 border-b border-[#27548A] text-[#F5EEDC]">{user.id}</td>
                  <td className="px-6 py-4 border-b border-[#27548A] text-[#F5EEDC]">{user.firstName}</td>
                  <td className="px-6 py-4 border-b border-[#27548A] text-[#F5EEDC]">{user.lastName}</td>
                  <td className="px-6 py-4 border-b border-[#27548A] text-[#F5EEDC]">{user.email}</td>
                  <td className="px-6 py-4 border-b border-[#27548A] text-[#F5EEDC]">{user.numeroTelefono}</td>
                  <td className="px-6 py-4 border-b border-[#27548A] text-[#F5EEDC]">{new Date(user.cumpleaños).toLocaleDateString()}</td>
                  <td className="px-6 py-4 border-b border-[#27548A] text-[#F5EEDC]">{user.isActive ? 'Activo' : 'Inactivo'}</td>
                  <td className="px-6 py-4 border-b border-[#27548A]">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsFormOpen(true);
                        }}
                        className="bg-[#DDA853] text-[#183B4E] px-4 py-2 rounded hover:bg-[#F5EEDC] w-full"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-700 text-[#F5EEDC] px-4 py-2 rounded hover:bg-red-800 w-full"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
);
};

export default UserTable;