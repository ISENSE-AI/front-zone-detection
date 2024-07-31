"use client"; //
import React, { useEffect } from 'react';
import Hls from 'hls.js';
import Stream from '@/components/stream';
import Grid from '@/components/gridVideo';
import Navbar from '@/components/NavBar';
import { useUser } from '@/userContext'

const Home = () => {
  const user = useUser();
  console.log('user', user.user.userId)
  console.log('institutionId', user.user.institutionId)
  return (
    
    <>
      <Navbar />
      <main className="relative min-h-screen min-w-full bg-blue-100 p-6 sm:p-10">
        <div className="container mx-auto mt-10">
          <h1 className="text-4xl font-bold  mb-4">Cameras</h1>
          <hr className="border-t-2 border-gray-300 mb-8" />
          <Grid />
        </div>
      </main>
    </>
    
  );
};

export default Home;
