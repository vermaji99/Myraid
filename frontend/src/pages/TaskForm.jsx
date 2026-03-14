import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Save, ArrowLeft, Loader2, ClipboardList } from 'lucide-react';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const { data } = await api.get(`tasks/${id}`);
      setFormData({
        title: data.data.title,
        description: data.data.description,
        status: data.data.status,
      });
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to fetch task');
      navigate('/');
    } finally {
      setFetching(false);
    }
  };

  const { title, description, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`tasks/${id}`, formData);
        toast.success('Task updated successfully');
      } else {
        await api.post('tasks', formData);
        toast.success('Task created successfully');
      }
      navigate('/');
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-24 glass-card max-w-2xl mx-auto mt-12">
        <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Fetching task details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors group"
        >
          <div className="p-2 bg-white/5 rounded-xl border border-white/5 mr-3 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Dashboard
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="bg-cyan-500/10 px-8 py-8 border-b border-white/5 flex items-center gap-5">
          <div className="h-12 w-12 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
            <ClipboardList className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">
              {isEdit ? 'Update Task' : 'Create Task'}
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {isEdit ? 'Modify your existing task details' : 'Add a new task to your list'}
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 ml-1">Task Title</label>
              <input
                type="text"
                name="title"
                required
                className="glass-input block w-full"
                placeholder="What needs to be done?"
                value={title}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 ml-1">Description</label>
              <textarea
                name="description"
                required
                rows="4"
                className="glass-input block w-full resize-none"
                placeholder="Provide some details about this task..."
                value={description}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 ml-1">Current Status</label>
              <div className="grid grid-cols-3 gap-4">
                {['pending', 'in-progress', 'completed'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: s })}
                    className={`py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                      status === s
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/10'
                        : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {s.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="glass-button-primary flex-grow flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  {isEdit ? 'Update Task' : 'Create Task'}
                </>
              )}
            </button>
            <Link
              to="/"
              className="glass-button-secondary flex justify-center items-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
