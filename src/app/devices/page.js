// pages/Devices.js
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from "@/components/NavBar";
import { TableDevice } from "@/components/tableDevice";
import { SidePanel } from "@/components/sidePanel";
import ModalDevice from "@/components/modalDevice";
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';

export default function Devices() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [editDevice, setEditDevice]=useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const connect = useMemo(() => new Connect(), []);

  useEffect(() => {
    const fetchDevices = async () => {
      if (!user || !user.institutionId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      // Fetch logic here
    };
    fetchDevices();
  }, [connect, user]);

  const handleOpenSidePanel = () => {
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeArea = () => {
    setIsSidePanelOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6 sm:p-10">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">All Devices</h1>
            <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded">
              + New Device
            </button>
          </div>
          <TableDevice setEditDevice= {setEditDevice} onChangeArea={handleChangeArea} />
        </div>
      </div>
      <SidePanel editDevice={editDevice} isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} />
      <ModalDevice isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
