import TaskCard from "./taskcard.jsx";

function TaskList({ onDelete, onEdit, onStatusChange, tasks }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <h2>No tasks found</h2>
        <p>Create your first task or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
