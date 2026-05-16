import { useEffect, useState } from "react";

const defaultForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

function TaskForm({ editingTask, onCancelEdit, onSubmit }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "todo",
        priority: editingTask.priority || "medium",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
    setForm(defaultForm);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>
        {editingTask && (
          <button className="text-button" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>

      <label>
        Title
        <input
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Design login screen"
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Add task details"
        />
      </label>

      <div className="form-row">
        <label>
          Status
          <select
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
          >
            <option value="todo">To Do</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label>
          Priority
          <select
            value={form.priority}
            onChange={(event) => setForm({ ...form, priority: event.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <label>
        Due Date
        <input
          type="date"
          value={form.dueDate}
          onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
        />
      </label>

      <button className="primary-button" type="submit">
        {editingTask ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
