import { useState, useEffect } from "react";
import { loginUser } from "../firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const pageBg =
      "linear-gradient(180deg, rgba(15,23,42,0.72), rgba(8,12,20,0.72))";
    document.body.style.background = pageBg;
    document.body.style.minHeight = "100vh";
    document.body.style.color = "#E6EEF3";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Daily Task Tracker</h1>
        <p style={styles.subtitle}>
          Sign in to manage your daily tasks
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>

        <Link to="/forgot-password" style={styles.forgot}>
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",
    borderRadius: "18px",
    padding: "36px 32px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
    border: "1px solid rgba(255,255,255,0.05)",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#B6C2CF",
    marginBottom: "28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  label: {
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "600",
    color: "#E6F7FF",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.04)",
    color: "#E6EEF3",
    outline: "none",
    fontSize: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    fontWeight: "700",
    fontSize: "16px",
    color: "#fff",
    cursor: "pointer",
    background: "linear-gradient(135deg, #a75885, #8f3a76)",
    boxShadow: "0 12px 30px rgba(167,88,133,0.35)",
  },
  error: {
    color: "#F87171",
    fontSize: "13px",
    marginTop: "4px",
  },
  demoText: {
    marginTop: "18px",
    fontSize: "12px",
    color: "#9CA3AF",
  },
  forgot: {
    display: "inline-block",
    marginTop: "12px",
    fontSize: "13px",
    color: "#E6F7FF",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;