import { useState } from "react";

import Register from "./register.jsx";
import { useAuth } from "./authcontext.js";

function Login() {
  const { login } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (showRegister) {
    return <Register onBack={() => setShowRegister(false)} />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div>
          <p className="eyebrow">Task Management Application</p>
          <h1>Organize work without losing the thread.</h1>
          <p className="auth-copy">
            Sign in to create, update, prioritize, and track tasks from one focused dashboard.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Minimum 6 characters"
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <button className="ghost-button" type="button" onClick={() => setShowRegister(true)}>
            Create New Account
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
