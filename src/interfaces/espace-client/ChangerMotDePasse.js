import React, { useState } from "react";
import "./ChangerMotDePasse.css";

const ChangerMotDePasse = () => {
  const [ancien, setAncien] = useState("");
  const [nouveau, setNouveau] = useState("");
  const [confirmer, setConfirmer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nouveau !== confirmer) {
      alert("Le nouveau mot de passe ne correspond pas !");
    } else {
      // Ici tu peux envoyer les infos vers le backend (à implémenter)
      alert("Mot de passe changé avec succès !");
    }
  };

  return (
    <div className="changer-mdp">
      <h2>🔐 Changer le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Ancien mot de passe"
          value={ancien}
          onChange={(e) => setAncien(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={nouveau}
          onChange={(e) => setNouveau(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmer}
          onChange={(e) => setConfirmer(e.target.value)}
          required
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default ChangerMotDePasse;
