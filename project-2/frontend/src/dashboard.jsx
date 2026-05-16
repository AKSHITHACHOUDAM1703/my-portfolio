import { useEffect, useMemo, useState } from "react";

import api from "./api";
import Navbar from "./navbar.jsx";
import TaskForm from "./taskform.jsx";
import TaskList from "./tasklist.jsx";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: "all", priority: "all", search: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      progress: tasks.filter((task) => task.status === "progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    };
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
  }, [filters.status, filters.priority]);

  async function fetchTasks() {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks", {
        params: {
          status: filters.status,
          priority: filters.priority,
          search: filters.search,
        },
      });
      setTasks(data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(form) {
    try {
      if (editingTask) {
        const { data } = await api.put(`/tasks/${editingTask._id}`, form);
        setTasks((current) => current.map((task) => (task._id === data._id ? data : task)));
        setEditingTask(null);
        setMessage("Task updated successfully");
      } else {
        const { data } = await api.post("/tasks", form);
        setTasks((current) => [data, ...current]);
        setMessage("Task created successfully");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to save task");
    }
  }

  async function handleDelete(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((current) => current.filter((task) => task._id !== taskId));
      setMessage("Task deleted");
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to delete task");
    }
  }

  async function handleStatusChange(task, status) {
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { ...task, status });
      setTasks((current) => current.map((item) => (item._id === data._id ? data : item)));
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to update status");
    }
  }

  return (
    <main className="app-shell">
      <Navbar />

      <section className="summary-grid">
        <div className="summary-card">
          <span>Total</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="summary-card">
          <span>To Do</span>
          <strong>{stats.todo}</strong>
        </div>
        <div className="summary-card">
          <span>In Progress</span>
          <strong>{stats.progress}</strong>
        </div>
        <div className="summary-card">
          <span>Done</span>
          <strong>{stats.done}</strong>
        </div>
      </section>

      {message && (
        <button className="toast" type="button" onClick={() => setMessage("")}>
          {message}
        </button>
      )}

      <section className="dashboard-layout">
        <TaskForm
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
          onSubmit={handleSubmit}
        />

        <div className="task-panel">
          <div className="toolbar">
            <input
              value={filters.search}
              onChange={(event) => setFilters({ ...filters, search: event.target.value })}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  fetchTasks();
                }
              }}
              placeholder="Search tasks"
            />

            <select
              value={filters.status}
              onChange={(event) => setFilters({ ...filters, status: event.target.value })}
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <select
              value={filters.priority}
              onChange={(event) => setFilters({ ...filters, priority: event.target.value })}
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button className="secondary-button" type="button" onClick={fetchTasks}>
              Search
            </button>
          </div>

          {loading ? (
            <div className="empty-state">
              <h2>Loading tasks...</h2>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onEdit={setEditingTask}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
