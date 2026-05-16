import Dashboard from "./dashboard.jsx";
import Login from "./login.jsx";
import { useAuth } from "./authcontext.js";

function App() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Dashboard /> : <Login />;
}

export default App;
