import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AjouterOffre.css";

const AjouterOffre = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    dateDebutOffre: "",
    dateFinOffre: "",
    remise: "",
  });

  const [avantages, setAvantages] = useState([]);
  const [newAvantage, setNewAvantage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAvantage = () => {
    if (newAvantage.trim() !== "") {
      setAvantages([...avantages, newAvantage.trim()]);
      setNewAvantage("");
    }
  };

  const handleDeleteAvantage = (index) => {
    setAvantages(avantages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        remise: `${formData.remise}% remise`,
        avantages: avantages,
      };

      await axios.post("http://localhost:7000/api/offres", payload);
      alert("✅ Offre ajoutée avec succès !");
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'offre :", error);
      alert("❌ Une erreur est survenue.");
    }
  };

  return (
    <div className="ajouter-offre-container">
      <button className="btn-retour" onClick={() => navigate(-1)}>
        ← Retour
      </button>
      <h2>🎯 Ajouter une Nouvelle Offre</h2>
      <form onSubmit={handleSubmit} className="form-offre">
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Nom de l'offre"
          required
        />
        <input
          type="date"
          name="dateDebutOffre"
          value={formData.dateDebutOffre}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateFinOffre"
          value={formData.dateFinOffre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="remise"
          value={formData.remise}
          onChange={handleChange}
          placeholder="Remise (%)"
          required
        />

        <div className="avantages-section">
          <input
            type="text"
            value={newAvantage}
            onChange={(e) => setNewAvantage(e.target.value)}
            placeholder="Ajouter un avantage"
          />
          <button
            type="button"
            className="btn-add-avantage"
            onClick={handleAddAvantage}
          >
            ➕ Ajouter Avantage
          </button>

          <ul className="avantages-list">
            {avantages.map((av, index) => (
              <li key={index}>
                ✅ {av}
                <button
                  type="button"
                  className="btn-delete-avantage"
                  onClick={() => handleDeleteAvantage(index)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn-ajouter">
          Ajouter l'offre
        </button>
      </form>
    </div>
  );
};

export default AjouterOffre;
