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
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="h-11 w-11 bg-cyan-500/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-all duration-300">
                <CheckSquare className="h-6 w-6 text-cyan-400" />
              </div>
              <span className="ml-3 text-xl font-black text-white tracking-tight">Task<span className="text-cyan-400">Master</span></span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
              <Link
                to="/"
                className="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-white/5 flex items-center"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/tasks/new"
                className="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-white/5 flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Task
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Signed in as</span>
              <span className="text-sm font-bold text-white">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center p-2.5 border border-white/10 text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 rounded-xl transition-all active:scale-95 shadow-sm bg-white/5"
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
