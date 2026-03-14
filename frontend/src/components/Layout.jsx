import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main className="flex-grow relative">
        {/* Subtle Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-cyan-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <footer className="py-10 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} TaskMaster Pro • Production Ready Task Management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
