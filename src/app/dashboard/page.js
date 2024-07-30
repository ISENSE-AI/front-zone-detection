"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Title, Card, BarChart } from '@tremor/react';
import Navbar from '@/components/NavBar';
import { TableData } from '@/componentsDashboard/tableDashBoard';
import { LineChartData } from '@/componentsDashboard/lineChart';
import { CardData } from '@/componentsDashboard/card';
import { BarChartData } from '@/componentsDashboard/barChart';
import Connect from '@/connect/Connect';
import { useUser } from '@/userContext';
import { SideBarDashboard } from '@/componentsDashboard/sidePanelDashboard';




export default function Dashboard() {

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [enabledDevice, setEnableDevice] = useState(0)
    const [disabledDevice, setDisabledDevice] = useState(0)
    const [totalDevices, setTotalDevices] = useState(0);
    const [editDevice, setEditDevice]=useState();
    const connect = useMemo(() => new Connect(), []);
    const user = useUser();
    


    useEffect(() => {
        const fetchStreams = async () => {
          try {
            const queryParams = {
              institutionId: `${user.user.institutionId}`
            };
            const response = await connect.get('/device', queryParams);
    
            
            const enabledCount = response.filter(device => device.status === 'Enabled').length;
            const disabledCount = response.filter(device => device.status === 'Disabled').length; // Cambia "Desactivado" si tu estado es diferente
            const totalCount = response.length;
    
            setEnableDevice(enabledCount);
            setDisabledDevice(disabledCount);
            setTotalDevices(totalCount);
    
          } catch (error) {
            console.error("Error al cargar dispositivos:", error);
          }
        };
    
        fetchStreams();
      }, [connect, user.user.institutionId]);
    
      const handleChangeArea = () => {
        setIsSidePanelOpen(true);
      };
      const handleCloseSidePanel = () => {
        setIsSidePanelOpen(false);
      };

    return(
        <>
        <Navbar />
        <main className="relative min-h-screen min-w-full bg-blue-100 p-6 sm:p-10">
            <TabGroup>
                <TabList>
                    <Tab>vision 1</Tab>
                    <Tab>vision 2</Tab>
                </TabList>
                <TabPanels>
                <TabPanel>

                    <div className='grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-2 '>
                        <div>
                            <div>
                                <LineChartData></LineChartData>
                            </div>
                            <div className='mt-6 grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3'>
                                <CardData title= "Enable Device" statusDevice={enabledDevice}></CardData>
                                <CardData title= "Disabled Device" statusDevice={disabledDevice} ></CardData>
                                <CardData title= "Total Devices" statusDevice={totalDevices}></CardData>
                            </div>
                        </div>
                        <div>
                            <TableData setEditDevice= {setEditDevice} onChangeArea={handleChangeArea}></TableData>
                            <SideBarDashboard editDevice={editDevice} isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} />
                        </div>
                    </div>
                    <div>
                        <BarChartData></BarChartData>
                    </div>
                </TabPanel>

                <TabPanel>
                    <Card>
                        <Title>xdddd</Title>
                    </Card>

                </TabPanel>

                </TabPanels>
            </TabGroup>
        </main>

        </>
    )



}