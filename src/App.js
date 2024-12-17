import React, { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://todo-app-o3h9.onrender.com/tasks"); // URL to backend
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  const addTask = async () => {
    try {
      await axios.post("https://todo-app-o3h9.onrender.com/tasks", newTask); // URL to backend
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  const updateTask = async () => {
    try {
      await axios.put(`https://todo-app-o3h9.onrender.com/tasks/${editTask._id}`, editTask); // URL
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-app-o3h9.onrender.com/tasks/${id}`); // URL to backend
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>

      {/* Add/Edit Task Form */}
      <div className="card mb-4 p-3">
        <h5>{editTask ? "Edit Task" : "Add Task"}</h5>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={editTask ? editTask.title : newTask.title}
          onChange={(e) =>
            editTask
              ? setEditTask({ ...editTask, title: e.target.value })
              : setNewTask({ ...newTask, title: e.target.value })
          }
        />
        <input
          className="form-control mb-2"
          placeholder="Description"
          value={editTask ? editTask.description : newTask.description}
          onChange={(e) =>
            editTask
              ? setEditTask({ ...editTask, description: e.target.value })
              : setNewTask({ ...newTask, description: e.target.value })
          }
        />
        {editTask ? (
          <button className="btn btn-success" onClick={updateTask}>
            Update Task
          </button>
        ) : (
          <button className="btn btn-primary" onClick={addTask}>
            Add Task
          </button>
        )}
      </div>

      {/* Tasks List */}
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.title}</strong> - {task.description}
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning mx-2"
                onClick={() => setEditTask(task)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
