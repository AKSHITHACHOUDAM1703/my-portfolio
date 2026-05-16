const statusLabels = {
  todo: "To Do",
  progress: "In Progress",
  done: "Done",
};

function TaskCard({ onDelete, onEdit, onStatusChange, task }) {
  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  return (
    <article className={`task-card ${task.priority}`}>
      <div className="task-card-top">
        <span className={`status-pill ${task.status}`}>{statusLabels[task.status]}</span>
        <span className="priority-pill">{task.priority}</span>
      </div>

      <h3>{task.title}</h3>
      <p>{task.description || "No description added."}</p>

      <div className="task-meta">
        <span>Due: {dueDate}</span>
      </div>

      <div className="task-actions">
        <select value={task.status} onChange={(event) => onStatusChange(task, event.target.value)}>
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button className="secondary-button" type="button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="danger-button" type="button" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
