import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Contrat.css";

const AjouterContrat = () => {
  const [formData, setFormData] = useState({
    type: "",
    dateDebut: "",
    dateFin: "",
    statut: "",
    prix: "",
    échance: "",
    offre: null, // This will store the full offer object
  });

  const [offres, setOffres] = useState([]);

  // Fetch offers on component mount
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/offres");
        const data = await response.json();
        setOffres(data);
      } catch (err) {
        console.error("Erreur lors du chargement des offres :", err);
      }
    };

    fetchOffres();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOffreChange = (e) => {
    const selectedOfferId = e.target.value;
    const selectedOffer = offres.find((offre) => offre._id === selectedOfferId);
    setFormData({ ...formData, offre: selectedOffer });
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(33, 37, 41);
    doc.text(" Contrat d'Assurance - Maghrebia", 20, 20);

    const offer = formData.offre;

    autoTable(doc, {
      startY: 30,
      head: [["Champ", "Valeur"]],
      body: [
        ["Type de contrat", formData.type],
        ["Date de début", formData.dateDebut],
        ["Date de fin", formData.dateFin],
        ["Statut", formData.statut],
        ["Prix (TND)", `${formData.prix} TND`],
        ["Échéance (TND) ", `${formData.échance} TND` || "Non spécifiée"],
        [
          "Offre",
          offer
            ? `${offer.description} (${offer.remise})\n${
                offer.avantages?.join(", ") || "Pas d’avantages"
              }`
            : "Non spécifiée",
        ],
      ],
      headStyles: { fillColor: [0, 40, 85], halign: "center" },
      styles: { fontSize: 11, cellPadding: 4 },
    });

    doc.setFontSize(10);
    doc.text(
      "Document généré automatiquement par l'application Maghrebia",
      20,
      doc.internal.pageSize.height - 10
    );

    doc.save("Contrat_Assurance.pdf");
  };

  return (
    <div className="ajouter-contrat-container">
      <h2>📋 Ajouter un Nouveau Contrat</h2>
      <form className="formulaire-contrat" onSubmit={(e) => e.preventDefault()}>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">-- Type de contrat --</option>
          <option value="Multirisque Plaisance">Multirisque Plaisance</option>
          <option value="Responsabilité Civile">Responsabilité Civile</option>
          <option value="Individuelle Accident">Individuelle Accident</option>
          <option value="Tous Risques Navigation">
            Tous Risques Navigation
          </option>
          <option value="Assurance Temporaire">Assurance Temporaire</option>
        </select>

        <input
          type="date"
          name="dateDebut"
          value={formData.dateDebut}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dateFin"
          value={formData.dateFin}
          onChange={handleChange}
          required
        />

        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          required
        >
          <option value="">-- Statut --</option>
          <option value="Actif">Actif</option>
          <option value="Suspendu">Suspendu</option>
          <option value="Résilié">Résilié</option>
        </select>

        <input
          type="number"
          name="prix"
          placeholder="Prix du contrat (TND)"
          value={formData.prix}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="échance"
          placeholder="Échéance (facultatif)"
          value={formData.échance}
          onChange={handleChange}
        />

        <select
          name="offre"
          onChange={handleOffreChange}
          value={formData.offre?._id || ""}
        >
          <option value="">-- Sélectionnez une offre --</option>
          {offres.map((offre) => (
            <option key={offre._id} value={offre._id}>
              {offre.description} ({offre.remise})
            </option>
          ))}
        </select>

        <button type="button" onClick={handleGeneratePDF}>
          📄 Générer le PDF
        </button>
      </form>
    </div>
  );
};

export default AjouterContrat;
