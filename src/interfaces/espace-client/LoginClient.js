import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./LoginClient.css";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsClientLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:7000/api/clients/loginClient",
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
        // Save the full user data to localStorage
        localStorage.setItem("userData", JSON.stringify(data.client));
        localStorage.setItem("clientAuth", true);
        setIsClientLoggedIn(true);

        // Navigate to client dashboard
        navigate("/espace-client");
      } else {
        // Show error from backend
        alert(data.message || "Erreur de connexion.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div className="login-client">
      <h2>Connexion Client</h2>
      <form onSubmit={handleLogin}>
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

      {/* 🔐 Bouton vers la page de changement de mot de passe */}
      <button className="link-btn" onClick={() => navigate("/changer-mdp")}>
        🔑 Changer le mot de passe
      </button>
    </div>
  );
};

export default LoginClient;
