const TopBar = () => {
  return (
    <header style={styles.topBar}>
      <h2 style={styles.title}>Daily Task Tracker</h2>

      <div style={styles.right}>
        <button style={styles.icon}>⚙️</button>
        <div style={styles.avatar}>👤</div>
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
};

export default TopBar;
