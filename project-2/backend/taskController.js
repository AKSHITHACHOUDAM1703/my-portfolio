const Task = require("./task");

async function getTasks(req, res) {
  const { status, priority, search } = req.query;
  const query = { user: req.user._id };

  if (status && status !== "all") {
    query.status = status;
  }

  if (priority && priority !== "all") {
    query.priority = priority;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  res.json(tasks);
}

async function createTask(req, res) {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    status,
    priority,
    dueDate: dueDate || undefined,
  });

  res.status(201).json(task);
}

async function updateTask(req, res) {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const fields = ["title", "description", "status", "priority", "dueDate"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      task[field] = req.body[field] || undefined;
    }
  });

  const updatedTask = await task.save();
  res.json(updatedTask);
}

async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
