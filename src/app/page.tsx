import RegisterForm from './components/RegisterForm';
// Remover la importación no utilizada
// import Link from 'next/link'

export default function Home() {
  return (
    <main className="w-full h-screen">
      <RegisterForm />
    </main>
  );
}