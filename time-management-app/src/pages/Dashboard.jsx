import { auth } from "../firebase/config";
import {
  addTaskToDB,
  fetchTasksFromDB,
  updateTaskInDB,
  deleteTaskFromDB,
} from "../firebase/tasks";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { Trash2, Save, Edit, Check } from "lucide-react";

const Dashboard = () => {
  // console.log("USER:", auth.currentUser);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTasks([]);
        return;
      }

      const unsubscribeTasks = fetchTasksFromDB(user.uid, setTasks);

      // cleanup Firestore listener
      return () => unsubscribeTasks();
    });

    // cleanup auth listener
    return () => unsubscribeAuth();
  }, []);


    // ADD TASK FUNCTION
  const addTask = async () => {
    if (!input.trim()) return;

    const user = auth.currentUser;
    if (!user) return;

    const id = await addTaskToDB(user.uid, input);

    setTasks((prev) => [
      ...prev,
      {
        id,
        text: input,
        completed: false,
      },
    ]);

    setInput("");
  };



  // TOGGLE TASK COMPLETION
    const toggleTask = (id) => {
      const user = auth.currentUser;
      if (!user) return;

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            updateTaskInDB(user.uid, id, {
              completed: !task.completed,
            });
            return { ...task, completed: !task.completed };
          }
          return task;
        })
      );
    };


  // DELETE TASK FUNCTION
  const deleteTask = async (id) => {
    await deleteTaskFromDB(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };


  // EDIT TASK FUNCTIONS
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  //  SAVE EDIT FUNCTION
  const saveEdit = async (id) => {
    await updateTaskInDB(id, { text: editingText });

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: editingText } : t))
    );

    setEditingId(null);
    setEditingText("");
  };


  // MARK TASK AS DONE FUNCTION
  const markDone = async (id) => {
    await updateTaskInDB(id, { completed: true });

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  };

  // CLEAR ALL TASKS FUNCTION
  const clearAllTasks = async () => {
  const user = auth.currentUser;
  if (!user || tasks.length === 0) return;

  const confirmClear = window.confirm(
    "This will delete all your tasks. Continue?"
  );

  if (!confirmClear) return;

  for (const task of tasks) {
    await deleteTaskFromDB(task.id);
  }

  setTasks([]);
};



  const tasksLeft = tasks.filter((t) => !t.completed).length;

  return (
    <div style={styles.page}>
      <TopBar />

      {/* Add Task Card */}
    <div style={styles.card}>
      <h3>Add New Task</h3>

      <div style={styles.addRow}>
        <input
          autoFocus
          type="text"
          placeholder="Add a task..."
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button style={styles.addButton} onClick={addTask}>
          + Add
        </button>
      </div>
    </div>


      {/* Task List Card */}
      <div style={styles.card}>
        {tasks.length === 0 && <p>No tasks yet</p>}

        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              ...styles.taskItem,
              opacity: task.completed ? 0.6 : 1,
            }}
          >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />

          {editingId === task.id ? (
            <input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              style={{ ...styles.input, marginRight: "12px" }}
            />
          ) : (
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  flex: 1,
                }}
              >
                {task.text}
              </span>
            )}

            <div style={styles.actions}>
              {editingId === task.id ? (
                <button onClick={() => saveEdit(task.id)}><Save size={18} /></button>
              ) : (
                <button onClick={() => startEdit(task)}><Edit size={18} /></button>
              )}

              {!task.completed && (
                <button onClick={() => markDone(task.id)}><Check size={18} /></button>
              )}

              <button onClick={() => deleteTask(task.id)}><Trash2 size={18} /></button>
            </div>
          </div>
    ))}

      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>Tasks left: {tasksLeft}</span>

        <button
          style={styles.clearButton}
          onClick={clearAllTasks}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    background: "#f7f9fb",
    minHeight: "100vh",
  },
  card: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    marginBottom: "32px",
  },
  cardTitle: {
    marginBottom: "16px",
    fontSize: "20px",
    fontWeight: "600",
  },
  addRow: {
    display: "flex",
    gap: "14px",
  },
  input: {
    flex: 1,
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "rgba(255,255,255,0.9)",
    outline: "none",
  },

  addButton: {
    padding: "14px 26px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",

    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.45)",
  },
    clearButton: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(239, 68, 68, 0.4)",
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  footer: {
    background: "#e6f7f3",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default Dashboard;