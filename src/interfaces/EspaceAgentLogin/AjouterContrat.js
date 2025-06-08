import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AjouterContrat.css";
import axios from "axios";

function AjouterContrat() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type_Contrat: "",
    debut_contrat: "",
    fin_contrat: "",
    status: "",
    prix_Contrat: "",
    echeance: "",
    client_concerned: "",
  });

  const [clients, setClients] = useState([]);

  // Fetch clients on mount
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/clients/")
      .then((res) => setClients(res.data))
      .catch((err) => console.error("Error fetching clients:", err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/contrats", formData);
      navigate("/espace-agent/consulter-contrats");
      setFormData({
        type_Contrat: "",
        debut_contrat: "",
        fin_contrat: "",
        status: "",
        prix_Contrat: "",
        echeance: "",
        client_concerned: "",
      });
    } catch (err) {
      console.error("Erreur lors de la création du contrat:", err);
      alert("Erreur lors de la création du contrat.");
    }
  };

  return (
    <div className="ajouter-contrat-container">
      <div className="top-bar">
        <button className="btn-retour3" onClick={() => navigate(-1)}>
          ← Retour
        </button>
      </div>

      <h2 className="titre-contrat">📄 Ajouter un Contrat</h2>

      <form onSubmit={handleSubmit} className="formulaire-contrat">
        <label>Type de contrat:</label>
        <input
          type="text"
          name="type_Contrat"
          value={formData.type_Contrat}
          onChange={handleChange}
          required
        />

        <label>Date de début:</label>
        <input
          type="date"
          name="debut_contrat"
          value={formData.debut_contrat}
          onChange={handleChange}
          required
        />

        <label>Date de fin:</label>
        <input
          type="date"
          name="fin_contrat"
          value={formData.fin_contrat}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />

        <label>Prix du contrat:</label>
        <input
          type="number"
          name="prix_Contrat"
          value={formData.prix_Contrat}
          onChange={handleChange}
          required
        />

        <label>Échéance (mois):</label>
        <input
          type="number"
          name="echeance"
          value={formData.echeance}
          onChange={handleChange}
          required
        />

        <label>Client concerné:</label>
        <select
          name="client_concerned"
          value={formData.client_concerned}
          onChange={handleChange}
          required
        >
          <option value="">-- Sélectionner un client --</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.email}
            </option>
          ))}
        </select>

        <button type="submit">Créer le contrat</button>
      </form>
    </div>
  );
}

export default AjouterContrat;
