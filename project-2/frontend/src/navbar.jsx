import { useAuth } from "./authcontext.js";

function Navbar() {
  const { logout, user } = useAuth();

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">TaskFlow</p>
        <h1>Task Management</h1>
      </div>

      <div className="nav-user">
        <span>{user?.name}</span>
        <button className="secondary-button" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
