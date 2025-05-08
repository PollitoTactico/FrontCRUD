'use client'
import { useState, useEffect } from 'react';
import HomeMain from '../components/HomeMain';

export default function Dashboard() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || 'Usuario';
    setUserName(storedName);
  }, []);

  return (
    <main className="w-full h-screen">
      <HomeMain userName={userName} />
    </main>
  );
}