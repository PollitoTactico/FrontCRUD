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
            <div className="hidden md:flex w-1/2 bg-[#27548A] flex-col justify-center p-12">
                <h2 className="text-4xl font-bold text-[#F5EEDC] mb-4">Inicia Sesión</h2>
                <p className="text-[#F5EEDC] text-xl">¡Bienvenido de vuelta!</p>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F5EEDC]">
                <div className="w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold mb-6 text-[#183B4E]">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                            Iniciar Sesión
                        </button>
                        <p className="text-center text-sm text-[#183B4E]">
                            ¿No tienes una cuenta? <button type="button" onClick={() => router.push('/')} className="text-[#27548A] hover:text-[#DDA853]">Regístrate</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}