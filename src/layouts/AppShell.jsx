import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useRights } from '../contexts/UserRightsContext'; 

const navLinks = [
  { to: '/customers', label: 'Customers' },
  { to: '/sales', label: 'Sales' },
  { to: '/products', label: 'Products' },
  { to: '/admin', label: 'Admin', requiredRight: 'VIEW_ADMIN' },
  { to: '/deleted-customers', label: 'Deleted Customers', requiredRight: 'CUST_VIEW_DELETED' },
];

export default function AppShell({ currentUser, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { hasRight } = useRights(); 

  async function handleLogout() {
    if (onLogout) await onLogout();
    navigate('/login');
  }

  // Filter the links dynamically based on the user's permissions
  const visibleLinks = navLinks.filter(link => {
    if (link.requiredRight) {
      return hasRight(link.requiredRight);
    }
    return true; 
  });

  const displayName =
    currentUser?.username ||
    currentUser?.user_metadata?.full_name ||
    currentUser?.email ||
    'User';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gray-500 hover:text-gray-800"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-gray-800 tracking-tight">Hope CMS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">{displayName}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex pt-14 min-h-screen">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-14 left-0 bottom-0 z-20 w-56 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}>
          <nav className="flex flex-col gap-1 p-3 pt-4">
            {visibleLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}