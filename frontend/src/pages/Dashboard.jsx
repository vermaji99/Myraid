import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Loader2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    status: '',
    search: ''
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTasks();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query.page, query.status, query.search]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('tasks', { params: query });
      setTasks(data.data);
      setPagination(data.pagination);
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`tasks/${id}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error(err || 'Failed to delete task');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case 'in-progress': return <Loader2 className="h-5 w-5 text-cyan-400 animate-spin" />;
      default: return <Clock className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'in-progress': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <LayoutGrid className="h-8 w-8 text-cyan-400" />
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">Manage and track your daily productivity</p>
        </div>
        <Link
          to="/tasks/new"
          className="glass-button-primary inline-flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Task
        </Link>
      </div>

      <div className="glass-card p-6 flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="relative w-full lg:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
          </div>
          <input
            type="text"
            className="glass-input block w-full pl-11 pr-4 py-3 sm:text-sm"
            placeholder="Search your tasks..."
            value={query.search}
            onChange={(e) => setQuery({ ...query, search: e.target.value, page: 1 })}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
            <Filter className="h-4 w-4 text-cyan-400" />
            <select
              className="bg-transparent text-sm font-bold text-gray-300 border-none focus:ring-0 cursor-pointer pr-8"
              value={query.status}
              onChange={(e) => setQuery({ ...query, status: e.target.value, page: 1 })}
            >
              <option value="" className="bg-[#161b22]">All Status</option>
              <option value="pending" className="bg-[#161b22]">Pending</option>
              <option value="in-progress" className="bg-[#161b22]">In Progress</option>
              <option value="completed" className="bg-[#161b22]">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {loading && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 glass-card">
          <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mb-4" />
          <p className="text-gray-400 font-medium">Loading your tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-24 glass-card">
          <div className="bg-white/5 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Search className="h-10 w-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No tasks found</h3>
          <p className="text-gray-400 max-w-xs mx-auto mb-8">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button 
            onClick={() => setQuery({ page: 1, limit: 10, status: '', search: '' })}
            className="glass-button-secondary"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="glass-card group hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusBadge(task.status)}`}>
                    {task.status}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/tasks/edit/${task._id}`}
                      className="p-2 bg-white/5 hover:bg-cyan-500/20 rounded-lg text-gray-400 hover:text-cyan-400 transition-all border border-white/5"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-all border border-white/5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                  {task.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
                  {task.description}
                </p>
              </div>
              <div className="px-6 py-4 bg-black/20 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
                {getStatusIcon(task.status)}
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 pb-8">
          <button
            onClick={() => setQuery({ ...query, page: Math.max(1, query.page - 1) })}
            disabled={query.page === 1}
            className="glass-button-secondary !p-3 disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="px-6 py-2.5 glass-card text-sm font-black text-white">
            <span className="text-cyan-400">{query.page}</span>
            <span className="mx-2 text-gray-600">/</span>
            <span>{pagination.pages}</span>
          </div>
          <button
            onClick={() => setQuery({ ...query, page: Math.min(pagination.pages, query.page + 1) })}
            disabled={query.page === pagination.pages}
            className="glass-button-secondary !p-3 disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
