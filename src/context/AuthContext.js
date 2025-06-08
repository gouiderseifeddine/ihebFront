import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(
    localStorage.getItem("clientAuth") === "true"
  );
  const [isAgentLoggedIn, setIsAgentLoggedIn] = useState(
    localStorage.getItem("agentAuth") === "true"
  );

  // Sync on storage change (cross-tab)
  useEffect(() => {
    const syncAuth = () => {
      setIsClientLoggedIn(localStorage.getItem("clientAuth") === "true");
      setIsAgentLoggedIn(localStorage.getItem("agentAuth") === "true");
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isClientLoggedIn,
        setIsClientLoggedIn,
        isAgentLoggedIn,
        setIsAgentLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
