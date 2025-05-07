'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
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
            <div className="hidden md:flex w-1/2 bg-[#22A39F] flex-col justify-center p-12 items-center">
                <h2 className="text-4xl font-bold text-[#F3EFE0] mb-4">¡BIENVENIDO!</h2>
                <div className="mt-6">
                    <img src="/register-illustration.svg" alt="Ilustración de registro" className="w-64" />
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F3EFE0]">
                <div className="w-full max-w-md p-8">
                    <div className="flex justify-center mb-6">
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#222222]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-[#222222]">Registrar</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full p-2 border border-[#222222] rounded text-[#222222] bg-white focus:outline-none focus:border-[#22A39F]"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full p-2 border border-[#222222] rounded text-[#222222] bg-white focus:outline-none focus:border-[#22A39F]"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full p-2 border border-[#222222] rounded text-[#222222] bg-white focus:outline-none focus:border-[#22A39F]"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Número de Teléfono"
                            value={formData.numeroTelefono}
                            onChange={(e) => setFormData({...formData, numeroTelefono: e.target.value})}
                            className="w-full p-2 border border-[#222222] rounded text-[#222222] bg-white focus:outline-none focus:border-[#22A39F]"
                            required
                        />
                        <input
                            type="date"
                            placeholder="Fecha de Nacimiento"
                            value={formData.cumpleaños}
                            onChange={(e) => setFormData({...formData, cumpleaños: e.target.value})}
                            className="w-full p-2 border border-[#222222] rounded text-[#222222] bg-white focus:outline-none focus:border-[#22A39F]"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={formData.contraseña}
                            onChange={(e) => setFormData({...formData, contraseña: e.target.value})}
                            className="w-full p-2 border border-[#222222] rounded text-[#222222] bg-white focus:outline-none focus:border-[#22A39F]"
                            required
                        />
                        <button 
                            type="submit"
                            className="w-full bg-[#22A39F] text-[#F3EFE0] p-2 rounded hover:bg-[#22A39F]/90 font-semibold"
                        >
                            Registrar
                        </button>
                        <p className="text-center text-sm text-[#222222]">
                            ¿Ya tienes una cuenta? <button onClick={() => router.push('/login')} className="text-[#22A39F] hover:text-[#22A39F]/70">Iniciar Sesión</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}