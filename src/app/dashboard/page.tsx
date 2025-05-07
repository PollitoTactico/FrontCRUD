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
        <main className="min-h-screen bg-[#F3EFE0] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-[#222222]">Panel de Control</h1>
                    <button 
                        onClick={() => {
                            Cookies.remove('auth_token');
                            router.push('/login');
                        }}
                        className="bg-[#22A39F] text-[#F3EFE0] px-4 py-2 rounded hover:bg-[#22A39F]/80"
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