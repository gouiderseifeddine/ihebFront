import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ConsulterContrats.css";

function ConsulterContrats() {
  const [contrats, setContrats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContrats = async () => {
      try {
        const { data } = await axios.get("http://localhost:7000/api/contrats/");
        const contratsWithClientData = await Promise.all(
          data.map(async (contrat) => {
            try {
              const clientResponse = await axios.get(
                `http://localhost:7000/api/clients/${contrat.client_concerned}`
              );
              return {
                nom: clientResponse.data.lastName,
                prenom: clientResponse.data.firstName,
                email: clientResponse.data.email,
                type: contrat.type_Contrat,
                dateDebut: new Date(contrat.debut_contrat).toLocaleDateString(),
                datefin: new Date(contrat.fin_contrat).toLocaleDateString(),
                montant: contrat.prix_Contrat,
              };
            } catch (err) {
              console.error("Error fetching client:", err);
              return null;
            }
          })
        );

        // Filter out failed requests (null values)
        setContrats(contratsWithClientData.filter(Boolean));
      } catch (err) {
        console.error("Error fetching contracts:", err);
      }
    };

    fetchContrats();
  }, []);

  const handleRetour = () => {
    navigate(-1);
  };

  return (
    <div className="consulter-contrats-container">
      <button className="btn-retour2" onClick={handleRetour}>
        Retour
      </button>
      <h2>📄 Contrats enregistrés</h2>
      <table className="table-contrats">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Type Contrat</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Montant (TND)</th>
          </tr>
        </thead>
        <tbody>
          {contrats.map((contrat) => (
            <tr key={contrat.id}>
              <td>{contrat.nom}</td>
              <td>{contrat.prenom}</td>
              <td>{contrat.email}</td>
              <td>{contrat.type}</td>
              <td>{contrat.dateDebut}</td>
              <td>{contrat.datefin}</td>
              <td>{contrat.montant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsulterContrats;
