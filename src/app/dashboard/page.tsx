'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import UserTable from '../components/UserTable';

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('auth_token');
        if (!token) {
            router.replace('/login');
        }
    }, [router]);

    return (
        <main className="min-h-screen bg-[#F5EEDC] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-[#183B4E]">Panel de Control</h1>
                    <button 
                        onClick={() => {
                            Cookies.remove('auth_token');
                            router.push('/login');
                        }}
                        className="bg-[#27548A] text-[#F5EEDC] px-4 py-2 rounded hover:bg-[#183B4E]"
                    >
                        Cerrar Sesión
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <UserTable />
                </div>
            </div>
        </main>
    );
}