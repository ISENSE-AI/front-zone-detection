"use client";
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setUser } = useUser();

  const connect = useMemo(() => new Connect(), []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await connect.post('/login', { email, password });

      if (response.status === 200) {
        const { userId, institutionId } = response.data.data;
        console.log('userId', userId);
        console.log('institutionId', institutionId);
        setUser({ userId, institutionId });
        Cookies.set('isAuthenticated', 'true', { expires: 1 });
        router.push('/home');
      } else {
        alert('Las credenciales son incorrectas');
      }
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute top-10 w-full flex justify-center z-0">
        <Image src="/isenseLogo.png" alt="Avatar" width={400} height={600} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-10 relative">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              id="emailInput"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="passwordInput"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
