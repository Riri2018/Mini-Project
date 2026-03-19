import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppShell = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex page-bg min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(v => !v)} />
      <main className="flex-1 min-w-0 overflow-auto relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
