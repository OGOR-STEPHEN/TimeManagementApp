import TopBar from "../components/TopBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pageBg = "linear-gradient(180deg, rgba(15,23,42,0.72), rgba(8,12,20,0.72))";
    document.body.style.background = pageBg;
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.minHeight = "100vh";
    document.body.style.color = "#E6EEF3";
  }, []);

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
      <TopBar />
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

          <button
            style={{
              ...styles.sliderButton,
              background: hideCompleted
                ? "linear-gradient(135deg, #A75885, #8F3A76)"
                : "rgba(255,255,255,0.08)",
            }}
            onClick={() => setHideCompleted(!hideCompleted)}
          >
            <span
              style={{
                ...styles.sliderDot,
                transform: hideCompleted ? "translateX(20px)" : "translateX(0)",
              }}
            />
          </button>
        </div>

        {/* Data */}
        <div style={styles.section}>
          <div>
            <h4 style={styles.sectionTitle}>Data</h4>
            <p style={styles.muted}>Manage your task history</p>
          </div>

          <button 
            style={styles.secondaryButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #A75885, #8F3A76)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(167,88,133,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
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
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "24px",
    color: "#E6EEF3",
  },
  card: {
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",
    borderRadius: "18px",
    padding: "32px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  section: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: 600,
    marginBottom: "4px",
    color: "#E6EEF3",
  },
  muted: {
    fontSize: "13px",
    opacity: 0.65,
    color: "#A0AEC0",
  },
  sliderButton: {
    width: "48px",
    height: "28px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    position: "relative",
    padding: 0,
    transition: "background 0.3s ease",
  },
  sliderDot: {
    position: "absolute",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#fff",
    top: "2px",
    left: "2px",
    transition: "transform 0.3s ease",
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
    transition: "all 0.2s ease",
  },
  toggleActive: {
    background: "linear-gradient(135deg, #A75885, #8F3A76)",
    boxShadow: "0 10px 28px rgba(167,88,133,0.28)",
    color: "#fff",
  },
  secondaryButton: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.04)",
    color: "#E6F7FF",
    cursor: "pointer",
    transition: "all 0.2s ease",
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
    transition: "all 0.2s ease",
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
    transition: "all 0.2s ease",
  },
};

export default Settings;