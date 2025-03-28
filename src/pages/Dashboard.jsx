import { useTheme } from "../contexts/ThemeContext";

const Dashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  console.log(isDark);

  return (
    <div style={{ backgroundColor: isDark ? "black" : "white" }}>
      <p>dashboard</p>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
};

export default Dashboard;
