import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, PlusCircle, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-black text-gray-900 tracking-tight">Task<span className="text-indigo-600">Master</span></span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
              <Link
                to="/"
                className="text-gray-500 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-indigo-50 flex items-center"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/tasks/new"
                className="text-gray-500 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-indigo-50 flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Task
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account</span>
              <span className="text-sm font-bold text-gray-900">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center p-2.5 border border-gray-100 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 rounded-xl transition-all active:scale-95 shadow-sm bg-white"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
