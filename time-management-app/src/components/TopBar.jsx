import { User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";


const TopBar = () => {
  const navigate = useNavigate();
  return (
    <header style={styles.topBar}>
      <h2 style={styles.title}>Daily Task Tracker</h2>

      <div style={styles.right}>
        <button style={styles.iconButton}
          onClick={() => navigate("/settings")}
          title="Settings"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          }}
        >
          <Settings size={20} />
        </button>
        <button style={styles.iconButton} title="Profile"
          onClick={() => navigate("/profile")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          }}
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );


};

const styles = {
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  title: {
    margin: 0,
  },
  right: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  icon: {
    fontSize: "18px",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
    iconButton: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.04)",
    color: "#E6F7FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    transition: "all 0.2s ease",
  },  
};

export default TopBar;
