import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { api } from "../api/client";
import type { AuthResponse, UserProfile } from "../types";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("electrohub-token"),
  );

  useEffect(() => {
    if (!token) {
      setUser(null);
      delete api.defaults.headers.common.Authorization;
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    api
      .get("/auth/profile")
      .then((response) => setUser(response.data))
      .catch(() => {
        localStorage.removeItem("electrohub-token");
        delete api.defaults.headers.common.Authorization;
        setToken(null);
        setUser(null);
      });
  }, [token]);

  const persistUser = (authUser: AuthResponse) => {
    localStorage.setItem("electrohub-token", authUser.token);
    api.defaults.headers.common.Authorization = `Bearer ${authUser.token}`;
    setToken(authUser.token);
    setUser({
      _id: authUser._id,
      name: authUser.name,
      email: authUser.email,
      role: authUser.role,
    });
  };

  const login = async (email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    persistUser(response.data);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
    });
    persistUser(response.data);
  };

  const logout = () => {
    localStorage.removeItem("electrohub-token");
    delete api.defaults.headers.common.Authorization;
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
