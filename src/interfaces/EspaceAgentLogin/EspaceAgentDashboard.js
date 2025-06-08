import React from "react";
import { useNavigate } from "react-router-dom";
import "./EspaceAgentDashboard.css";

function EspaceAgentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Bouton de retour positionné en haut à gauche */}
      <button 
        className="back-button" 
        onClick={() => navigate(-1)} // Revenir à la page précédente
      >
        ↩ Retour
      </button>

      <h2>Tableau de Bord - Espace Agent</h2>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/espace-agent/ajouter-contrat")}>
          ➕ Ajouter un contrat
        </button>
        <button onClick={() => navigate("/espace-agent/consulter-contrats")}>
          📄 Consulter les contrats
        </button>
        <button onClick={() => navigate("/espace-agent/ajouter-offre")}>
          🎯 Ajouter une offre
        </button>
      </div>
    </div>
  );
}

export default EspaceAgentDashboard;
