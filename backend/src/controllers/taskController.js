const taskService = require('../services/taskService');
const asyncHandler = require('../middlewares/async');

// @desc    Get all tasks
// @route   GET /tasks
// @access  Private
const getTasks = asyncHandler(async (req, res, next) => {
  const result = await taskService.getTasks(req.user.id, req.query);
  res.status(200).json({
    success: true,
    count: result.tasks.length,
    pagination: result.pagination,
    data: result.tasks,
  });
});

// @desc    Get single task
// @route   GET /tasks/:id
// @access  Private
const getTask = asyncHandler(async (req, res, next) => {
  const task = await taskService.getTaskById(req.user.id, req.params.id);
  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Create task
// @route   POST /tasks
// @access  Private
const createTask = asyncHandler(async (req, res, next) => {
  const task = await taskService.createTask(req.user.id, req.body);
  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Update task
// @route   PUT /tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res, next) => {
  const task = await taskService.updateTask(req.user.id, req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Delete task
// @route   DELETE /tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res, next) => {
  await taskService.deleteTask(req.user.id, req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
