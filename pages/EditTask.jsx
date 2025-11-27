import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/slices/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector((state) =>
    state.tasks.list.find((t) => t._id === id)
  );

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "todo");

  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      const res = await apiRequest(`/tasks/${id}`, "PUT", {
        title,
        description,
        status,
      });

      dispatch(updateTask(res.task));

      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!task) return <h3>Task not found...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Task</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button
        onClick={handleUpdate}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
        }}
      >
        Update Task
      </button>
    </div>
  );
}
