import { useState } from "react";
import { signupUser } from "../firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, rgba(15,23,42,0.72), rgba(8,12,20,0.72))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, system-ui, sans-serif",
    color: "#E6EEF3",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(0, 0, 0, 0.35)",
    backdropFilter: "blur(8px)",
    padding: "32px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.03)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  subtitle: {
    fontSize: "14px",
    opacity: 0.85,
    marginBottom: "24px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.04)",
    color: "#E6EEF3",
    fontSize: "14px",
    outline: "none",
  },

  primaryButton: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    color: "#FFFFFF",
    background: "linear-gradient(135deg, #A75885, #8F3A76)",
    boxShadow: "0 10px 28px rgba(167,88,133,0.28)",
  },

  error: {
    fontSize: "13px",
    color: "#E6F7FF",
    opacity: 0.85,
  },

  footerText: {
    marginTop: "18px",
    fontSize: "13px",
    opacity: 0.85,
    textAlign: "center",
  },

  link: {
    color: "#E6F7FF",
    fontWeight: "600",
    textDecoration: "none",
  },
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signupUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>
          Set up your workspace and start organizing
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.primaryButton}>
            Create Account
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;