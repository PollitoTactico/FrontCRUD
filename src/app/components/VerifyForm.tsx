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

    
    <p className="text-center text-sm text-[#183B4E]">
        ¿No recibiste el código? <button 
            type="button" 
            onClick={handleResendCode}
            className="text-[#27548A] hover:text-[#DDA853]"
        >
            Reenviar
        </button>
    </p>
    return (
        <div className="flex w-full h-screen">
            <div className="hidden md:flex w-1/2 bg-[#27548A] flex-col justify-center p-12">
                <h2 className="text-4xl font-bold text-[#F5EEDC] mb-4">Verificación</h2>
                <p className="text-[#F5EEDC] text-xl">Ingresa el código enviado a tu correo</p>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F5EEDC]">
                <div className="w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold mb-6 text-[#183B4E]">Verificar Cuenta</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Código de verificación"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full p-2 border border-[#27548A] rounded text-[#183B4E] bg-white focus:outline-none focus:border-[#DDA853]"
                            required
                        />
                        <button 
                            type="submit"
                            className="w-full bg-[#DDA853] text-[#183B4E] p-2 rounded hover:bg-[#DDA853]/90 font-semibold"
                        >
                            Verificar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}