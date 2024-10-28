'use client';

import React, { useEffect, useState, useTransition } from 'react';
import Header from '../Header';
import Loading from '../Loading';
import Sidebar from '../Sidebar';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Iniciar o loading durante a transição
    if (isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isPending]);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-boxdark-2 dark:text-bodydark">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto">
          <div className="mb-4 max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {loading ? <Loading /> : children}
          </div>
        </main>

        {/* Footer */}
        {/* <FooterDashboard /> */}
      </div>
    </div>
  );
}
