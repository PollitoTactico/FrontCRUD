'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function VerifyForm() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');

    // Agregar router a las dependencias
    useEffect(() => {
        const storedEmail = sessionStorage.getItem('verification_email');
        if (!storedEmail) {
            router.push('/');
            return;
        }
        setEmail(storedEmail);
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //Aqui tambien cambiamos la url
        try {
            const instance = axios.create({
                baseURL: 'https://backendcrudapiservice20250420164400.azurewebsites.net',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

           
            const verificationData = {
                Token: code  
            };

            console.log('Token a enviar:', code);
            console.log('Datos a enviar:', JSON.stringify(verificationData));

            const response = await instance.post('/api/Auth/verify', verificationData);

            if (response.status === 200) {
                alert('Verificación exitosa');
                sessionStorage.removeItem('verification_email');
                router.push('/login');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorData = error.response?.data;
                console.error('Error completo:', {
                    status: error.response?.status,
                    data: errorData,
                    message: error.message
                });
                
                let errorMessage = 'Error en la verificación';
                if (typeof errorData === 'string') {
                    errorMessage = errorData;
                } else if (errorData?.message) {
                    errorMessage = errorData.message;
                }
                alert(errorMessage);
            } else {
                console.error('Error no Axios:', error);
                alert('Error de conexión con el servidor');
            }
        }
    };

    const handleResendCode = async () => {
        try {
            const instance = axios.create({
                baseURL: 'https://backendcrudapiservice20250420164400.azurewebsites.net',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const response = await instance.post('/api/Auth/resend-code', { email });
            
            if (response.status === 200) {
                alert('Código reenviado exitosamente');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data || 'Error al reenviar el código';
                alert(errorMessage);
            } else {
                alert('Error de conexión con el servidor');
            }
        }
    };

    
    <p className="text-center text-sm text-[#222222]">
        ¿No recibiste el código? <button 
            type="button" 
            onClick={handleResendCode}
            className="text-[#22A39F] hover:text-[#22A39F]/70"
        >
            Reenviar
        </button>
    </p>
    return (
        <div className="flex w-full h-screen">
            <div className="hidden md:flex w-1/2 bg-[#22A39F] flex-col justify-center p-12 items-center">
                <h2 className="text-4xl font-bold text-[#F3EFE0] mb-4">Verificación</h2>
                <p className="text-[#F3EFE0] text-xl">Ingresa el código enviado a tu correo</p>
                <div className="mt-6">
                    <img src="/register-illustration.svg" alt="Ilustración de verificación" className="w-64" />
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F3EFE0]">
                <div className="w-full max-w-md p-8">
                    <div className="flex justify-center mb-6">
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#222222]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-[#222222]">Verificar Cuenta</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Código de verificación"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full p-2 border border-[#222222] rounded text-[#222222] bg-white focus:outline-none focus:border-[#22A39F]"
                            required
                        />
                        <button 
                            type="submit"
                            className="w-full bg-[#22A39F] text-[#F3EFE0] p-2 rounded hover:bg-[#22A39F]/90 font-semibold"
                        >
                            Verificar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}