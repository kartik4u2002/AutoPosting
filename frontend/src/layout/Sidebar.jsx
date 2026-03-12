import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Sparkles, 
  Calendar, 
  ListTodo, 
  Activity, 
  BarChart3, 
  History,
  LogOut 
} from 'lucide-react';
import { cn } from '../components/ui/Button'; // Assuming cn exists in Button file

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload Post', href: '/upload', icon: Upload },
  { name: 'AI Analysis', href: '/analysis', icon: Sparkles },
  { name: 'Scheduler', href: '/scheduler', icon: Calendar },
  { name: 'Scheduled Posts', href: '/scheduled-posts', icon: ListTodo },
  { name: 'Post Status', href: '/status', icon: Activity },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'History', href: '/history', icon: History },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-gray-200 bg-white">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Sparkles className="h-6 w-6 text-primary-600" />
        <span className="ml-3 text-lg font-bold text-gray-900 tracking-tight">InstaAuto</span>
      </div>
      <nav className="flex flex-1 flex-col px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors'
              )}
            >
              <item.icon
                className={cn(
                  isActive ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/login"
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Logout
        </Link>
      </div>
    </div>
  );
}
