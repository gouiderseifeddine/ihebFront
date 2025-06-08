import React, { useEffect, useState } from "react";
import axios from "axios";
import "./offre.css";
import { useNavigate } from "react-router-dom";

const Offre = () => {
  const [offres, setOffres] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/offres");
        setOffres(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffres();
  }, []);

  // 👉 Handle button click to navigate to /contrat
  const handleClick = (offreId) => {
    navigate(`/contrat`, { state: { offreId } });
  };

  return (
    <div className="offres-container">
      <h1 className="offres-title">📜 Découvrez Nos Offres d'Assurance</h1>

      {loading ? (
        <p>Chargement des offres...</p>
      ) : offres.length === 0 ? (
        <p>Aucune offre disponible.</p>
      ) : (
        <div className="offres-grid">
          {offres.map((offre) => (
            <div className="offre-card" key={offre._id}>
              <h3>{offre.description}</h3>
              <p className="prix">{offre.remise}</p>
              <ul>
                {offre.avantages.map((av, i) => (
                  <li key={i}>✅ {av}</li>
                ))}
              </ul>
              <p className="start-date">
                {new Date(offre.dateDebutOffre).toLocaleDateString("fr-FR")}
              </p>
              <button onClick={() => handleClick(offre._id)}>Souscrire</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offre;
