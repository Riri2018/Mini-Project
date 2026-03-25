import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function AppShell({ children }) {
  return (
    <div className="bg-mesh-page flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  )
}
