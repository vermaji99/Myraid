import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';

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
      const { data } = await api.get(`/tasks/${id}`);
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
        await api.put(`/tasks/${id}`, formData);
        toast.success('Task updated successfully');
      } else {
        await api.post('/tasks', formData);
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
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors group"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 mr-3 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow-xl shadow-indigo-100/20 border border-gray-100 rounded-3xl overflow-hidden">
        <div className="bg-indigo-600 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Update Task' : 'Create Task'}
          </h1>
          <p className="text-indigo-100 text-sm mt-1">
            {isEdit ? 'Modify your existing task details' : 'Add a new task to your list'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="block w-full border border-gray-200 rounded-2xl shadow-sm py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm bg-gray-50/50 hover:bg-gray-50 transition-all"
                placeholder="What needs to be done?"
                value={title}
                onChange={onChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="5"
                required
                className="block w-full border border-gray-200 rounded-2xl shadow-sm py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm bg-gray-50/50 hover:bg-gray-50 transition-all resize-none"
                placeholder="Add more details about this task..."
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  Current Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    id="status"
                    className="block w-full pl-4 pr-10 py-3 text-base border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm rounded-2xl bg-gray-50/50 hover:bg-gray-50 appearance-none transition-all cursor-pointer"
                    value={status}
                    onChange={onChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end space-x-4">
            <Link
              to="/"
              className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-8 py-3 border border-transparent rounded-2xl shadow-lg shadow-indigo-100 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Saving Changes...' : isEdit ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
