// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('isAuthenticated'); // Elimina la cookie de autenticación
    localStorage.removeItem('isAuthenticated'); // Opcional, en caso de que uses localStorage también
    router.push('/login'); // Redirigir a la página de login
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/isenseLogo.png" alt="Logo" className="h-10 w-20 mr-2" />
        </div>
        <div className="flex space-x-4">
          <Link href="/home" className="text-gray-700 hover:text-green-600">Home</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-green-600">Dashboard</Link>
          <Link href="/devices" className="text-gray-700 hover:text-green-600">Devices</Link>
          <Link href="/calls" className="text-gray-700 hover:text-green-600">Calls</Link>
          <Link href="/profile" className="text-gray-700 hover:text-green-600">FaulDevices</Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-green-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
