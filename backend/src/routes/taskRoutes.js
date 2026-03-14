const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { taskSchema } = require('../validators/taskValidator');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(validate(taskSchema), createTask);

router.route('/:id')
  .get(getTask)
  .put(validate(taskSchema), updateTask)
  .delete(deleteTask);

module.exports = router;
