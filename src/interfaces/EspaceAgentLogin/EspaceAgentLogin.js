// src/interfaces/EspaceAgentLogin/EspaceAgentLogin.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./EspaceAgentLogin.css";

const EspaceAgentLogin = () => {
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAgentLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:7000/api/agents/loginagent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save agent data in localStorage under the key clientData
        localStorage.setItem("clientData", JSON.stringify(data.agent));
        localStorage.setItem("agentAuth", true);
        setIsAgentLoggedIn(true);

        // Redirect to agent dashboard
        navigate("/dashboard-agent");
      } else {
        alert(data.message || "Échec de la connexion.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Erreur serveur. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Connexion Agent</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default EspaceAgentLogin;
