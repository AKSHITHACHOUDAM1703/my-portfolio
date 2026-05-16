import { createContext, createElement, useContext, useMemo, useState } from "react";

import api from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("taskflowToken"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("taskflowUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    saveSession(data);
  }

  async function register(name, email, password) {
    const { data } = await api.post("/auth/register", { name, email, password });
    saveSession(data);
  }

  function saveSession(data) {
    localStorage.setItem("taskflowToken", data.token);
    localStorage.setItem("taskflowUser", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("taskflowToken");
    localStorage.removeItem("taskflowUser");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      register,
      token,
      user,
    }),
    [token, user]
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  return useContext(AuthContext);
}
