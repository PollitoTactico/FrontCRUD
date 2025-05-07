'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import axios from 'axios';
import Cookies from 'js-cookie';  

export default function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        contraseña: ''
    });

    interface AxiosErrorResponse {
        response?: {
            data?: {
                message?: string;
            };
        };
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const instance = axios.create({
                baseURL: 'https://backendcrudapiservice20250420164400.azurewebsites.net',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const response = await instance.post('/api/Auth/login', formData);
            console.log('Login response:', response.data);

            if (response.status === 200) {
                const token = response.data.token || response.data;
                if (token) {
                    Cookies.set('auth_token', token, { expires: 7 });
                    localStorage.setItem('token', token);
                    alert('Inicio de sesión exitoso');
                    router.push('/dashboard');
                } else {
                    throw new Error('No se recibió el token de autenticación');
                }
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosErrorResponse;
                const errorMessage = axiosError.response?.data?.message || 'Error en el inicio de sesión';
                console.error('Error detallado:', error.response?.data);
                alert(`Error: ${errorMessage}`);
            } else {
                console.error('Error completo:', error);
                alert('Error de conexión con el servidor');
            }
        }
    };

    return (
        <div className="flex w-full h-screen">
            <div className="hidden md:flex w-1/2 bg-[#22A39F] flex-col justify-center p-12 items-center">
                <h2 className="text-4xl font-bold text-[#F3EFE0] mb-4">¡BIENVENIDO!</h2>
                <div className="mt-6">
                    <img src="/register-illustration.svg" alt="Ilustración de login" className="w-64" />
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
                            <h1 className="text-2xl font-bold text-[#222222]">Login</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                            Iniciar Sesión
                        </button>
                        <p className="text-center text-sm text-[#222222]">
                            ¿No tienes una cuenta? <button type="button" onClick={() => router.push('/')} className="text-[#22A39F] hover:text-[#22A39F]/70">Regístrate</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}