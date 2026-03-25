import { Bell, Search } from 'lucide-react'
import Avatar from '../ui/Avatar'
import useAuthStore from '@/store/authStore'

export default function TopNav({ title }) {
  const { user } = useAuthStore()

  return (
    <header className="glass-nav sticky top-0 z-10 px-6 py-3.5 flex items-center justify-between">
      <div>
        {title && (
          <h1 className="font-display font-semibold text-white/95 text-[18px]">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all">
          <Search size={17} />
        </button>

        {/* Bell */}
        <button className="relative p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-ss-teal" />
        </button>

        {/* Avatar */}
        <Avatar name={user?.name || 'User'} size="sm" className="ml-1" />
      </div>
    </header>
  )
}
