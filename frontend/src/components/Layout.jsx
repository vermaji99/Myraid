import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <footer className="py-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} TaskMaster Pro • Built for Assessment
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
