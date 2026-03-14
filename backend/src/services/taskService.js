const Task = require('../models/Task');
const ErrorResponse = require('../utils/ErrorResponse');

const getTasks = async (userId, query) => {
  const { page = 1, limit = 10, status, search } = query;
  
  const filter = { user: userId };
  if (status) {
    filter.status = status;
  }

  // Fetch all tasks matching the basic filter (user and status)
  // We need to fetch all because we're using AES encryption on title/description,
  // making it impossible to use MongoDB's native $regex on encrypted data.
  let tasks = await Task.find(filter).sort({ createdAt: -1 });

  // Filter in memory for the search term after decryption (Mongoose getters handle decryption)
  if (search) {
    const searchLower = search.toLowerCase();
    tasks = tasks.filter(task => 
      task.title.toLowerCase().includes(searchLower) || 
      task.description.toLowerCase().includes(searchLower)
    );
  }

  // Manual pagination since we filtered in memory
  const total = tasks.length;
  const skip = (page - 1) * limit;
  const paginatedTasks = tasks.slice(skip, skip + Number(limit));

  return {
    tasks: paginatedTasks,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  };
};

const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });

  if (!task) {
    throw new ErrorResponse('Task not found', 404);
  }

  return task;
};

const createTask = async (userId, taskData) => {
  const { title, description, status } = taskData;

  const task = await Task.create({
    user: userId,
    title,
    description,
    status,
  });

  return task;
};

const updateTask = async (userId, taskId, taskData) => {
  const { title, description, status } = taskData;

  let task = await Task.findOne({ _id: taskId, user: userId });

  if (!task) {
    throw new ErrorResponse('Task not found', 404);
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  await task.save();

  return task;
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

  if (!task) {
    throw new ErrorResponse('Task not found', 404);
  }

  return task;
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
