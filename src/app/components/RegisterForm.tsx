'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
// Remover la importación no utilizada
// import { Cutive_Mono } from 'next/font/google';
import axios from 'axios';

export default function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData]= useState({
        firstName: '',
        lastName:'',
        email:'',
        numeroTelefono:'',
        cumpleaños:'',
        contraseña:''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Datos a enviar:', formData);

            //Aqui igual xd
            const instance = axios.create({
                baseURL: 'https://backendcrudapiservice20250420164400.azurewebsites.net',
                headers: {
                    'Content-Type': 'application/json'
                }
                
            });

            const response = await instance.post('/api/Auth/register', formData);
            console.log('Respuesta del servidor:', response);

            if (response.status === 200 || response.status === 201) {
                // Guardamos el email para la verificación
                sessionStorage.setItem('verification_email', formData.email);
                alert('Pre-registro exitoso. Por favor verifica tu correo.');
                window.location.href = '/verify';
                return;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data || 'Error en el registro';
                console.error('Error del servidor:', error.response?.data);
                alert(`Error: ${errorMessage}`);
            } else {
                console.error('Error de conexión:', error);
                alert('Error de conexión con el servidor');
            }
        }
    };
    return (
        <div className="flex w-full h-screen">
            <div className="hidden md:flex w-1/2 bg-[#27548A] flex-col justify-center p-12">
                <h2 className="text-4xl font-bold text-[#F5EEDC] mb-4">Crea tu Cuenta</h2>
                <p className="text-[#F5EEDC] text-xl">¡Únete a nuestra comunidad!</p>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F5EEDC]">
                <div className="w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold mb-6 text-[#183B4E]">Sign Up</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full p-2 border border-[#27548A] rounded text-[#183B4E] bg-white focus:outline-none focus:border-[#DDA853]"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full p-2 border border-[#27548A] rounded text-[#183B4E] bg-white focus:outline-none focus:border-[#DDA853]"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full p-2 border border-[#27548A] rounded text-[#183B4E] bg-white focus:outline-none focus:border-[#DDA853]"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Número de Teléfono"
                            value={formData.numeroTelefono}
                            onChange={(e) => setFormData({...formData, numeroTelefono: e.target.value})}
                            className="w-full p-2 border border-[#27548A] rounded text-[#183B4E] bg-white focus:outline-none focus:border-[#DDA853]"
                            required
                        />
                        <input
                            type="date"
                            placeholder="Fecha de Nacimiento"
                            value={formData.cumpleaños}
                            onChange={(e) => setFormData({...formData, cumpleaños: e.target.value})}
                            className="w-full p-2 border border-[#27548A] rounded text-[#183B4E] bg-white focus:outline-none focus:border-[#DDA853]"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={formData.contraseña}
                            onChange={(e) => setFormData({...formData, contraseña: e.target.value})}
                            className="w-full p-2 border border-[#27548A] rounded text-[#183B4E] bg-white focus:outline-none focus:border-[#DDA853]"
                            required
                        />
                        <button 
                            type="submit"
                            className="w-full bg-[#DDA853] text-[#183B4E] p-2 rounded hover:bg-[#DDA853]/90 font-semibold"
                        >
                            Registrarse
                        </button>
                        <p className="text-center text-sm text-[#183B4E]">
                            ¿Ya tienes una cuenta? <button onClick={() => router.push('/login')} className="text-[#27548A] hover:text-[#DDA853]">Iniciar Sesión</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}