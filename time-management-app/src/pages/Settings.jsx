import TopBar from "../components/TopBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark");
  const [hideCompleted, setHideCompleted] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    // Firebase save will go here later
    // await updateUserSettings({ theme, hideCompleted });

    setTimeout(() => {
      setSaving(false);
    }, 800);
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Settings</h2>

      <div style={styles.card}>
        {/* Appearance */}
        <div style={styles.section}>
          <div>
            <h4 style={styles.sectionTitle}>Appearance</h4>
            <p style={styles.muted}>Switch between light and dark themes</p>
          </div>

          <div style={styles.toggleGroup}>
            <button
              style={{
                ...styles.toggleButton,
                ...(theme === "light" ? styles.toggleActive : {}),
              }}
              onClick={() => setTheme("light")}
            >
              Light
            </button>
            <button
              style={{
                ...styles.toggleButton,
                ...(theme === "dark" ? styles.toggleActive : {}),
              }}
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Task Preferences */}
        <div style={styles.section}>
          <div>
            <h4 style={styles.sectionTitle}>Task Preferences</h4>
            <p style={styles.muted}>Hide tasks you've already completed</p>
          </div>

          <label style={styles.switch}>
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={() => setHideCompleted(!hideCompleted)}
            />
            <span style={styles.slider} />
          </label>
        </div>

        {/* Data */}
        <div style={styles.section}>
          <div>
            <h4 style={styles.sectionTitle}>Data</h4>
            <p style={styles.muted}>Manage your task history</p>
          </div>

          <button style={styles.secondaryButton}>
            Clear completed tasks
          </button>
        </div>

        {/* Save */}
        <div style={styles.saveRow}>
          <button
            style={{
              ...styles.primaryButton,
              opacity: saving ? 0.6 : 1,
            }}
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {/* Back */}
      <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={16} />
        Back to dashboard
      </button>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "48px 20px",
    color: "#E6EEF3",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "24px",
  },
  card: {
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(8px)",
    borderRadius: "14px",
    padding: "28px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.03)",
  },
  section: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "4px",
  },
  muted: {
    fontSize: "14px",
    opacity: 0.7,
  },
  toggleGroup: {
    display: "flex",
    gap: "8px",
  },
  toggleButton: {
    padding: "8px 16px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.04)",
    color: "#E6F7FF",
    cursor: "pointer",
  },
  toggleActive: {
    background: "linear-gradient(135deg, #A75885, #8F3A76)",
    boxShadow: "0 10px 28px rgba(167,88,133,0.28)",
    color: "#fff",
  },
  switch: {
    position: "relative",
    width: "44px",
    height: "24px",
  },
  slider: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.08)",
    borderRadius: "20px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.04)",
    color: "#E6F7FF",
    cursor: "pointer",
  },
  saveRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "24px",
  },
  primaryButton: {
    padding: "12px 24px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    color: "#fff",
    background: "linear-gradient(135deg, #A75885, #8F3A76)",
    boxShadow: "0 10px 28px rgba(167,88,133,0.28)",
  },
  backButton: {
    marginTop: "24px",
    background: "none",
    border: "none",
    color: "#E6F7FF",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    opacity: 0.8,
  },
};

export default Settings;