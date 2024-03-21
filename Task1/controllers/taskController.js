let tasks = [];

const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};


const createTask = (req, res) => {
  const { title, description, status } = req.body;
  const newTask = { id: tasks.length + 1, title, description, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.status(200).json(task);
  }
};

const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, status } = req.body;
  let task = tasks.find(task => task.id === taskId);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    res.status(200).json(task);
  }
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks.splice(index, 1);
    res.status(204).send();
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};
