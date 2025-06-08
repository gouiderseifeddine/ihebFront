import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./simulation.css";

const Simulation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    typeBateau: "",
    coque: "",
    moteur: "",
    accessoires: "",
    ageBateau: "",
    prixBateau: "",
    dateAchat: "",
    typeContrat: "",
    typeClient: "",
  });

  const [resultatSimulation, setResultatSimulation] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculerSimulation = (data) => {
    let tarifBase = parseFloat(data.prixBateau) * 0.02;

    if (data.typeBateau === "yacht") tarifBase *= 2.5;
    if (data.moteur === "hors-bord") tarifBase += 150;
    if (data.coque === "multicoque") tarifBase += 300;
    if (data.typeContrat === "multirisque") tarifBase *= 1.6;
    if (parseInt(data.ageBateau) > 10) tarifBase *= 1.3;

    return tarifBase.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prixSimulation = calculerSimulation(formData);
    setResultatSimulation(prixSimulation);

    if (localStorage.getItem("clientAuth") === "true") {
      setShowSaveButton(true);
    }
  };

  const handleSaveSimulation = async () => {
    try {
      const client = JSON.parse(localStorage.getItem("userData"));
      const simulationPayload = {
        type_Bateau: formData.typeBateau,
        type_Coque: formData.coque,
        type_Moteur: formData.moteur,
        ageBateau: formData.ageBateau,
        type_Contrat: formData.typeContrat,
        montant_Assurance: resultatSimulation,
        typeClient: formData.typeClient,
      };

      const simRes = await axios.post(
        "http://localhost:7000/api/simulations",
        simulationPayload
      );
      const simulationId = simRes.data._id;

      // Update client with new simulation ID
      await axios.put(`http://localhost:7000/api/clients/${client._id}`, {
        simulation: simulationId,
      });

      alert("Simulation enregistrée avec succès !");
      navigate("/espace-client");
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la simulation :",
        error
      );
      alert("Erreur lors de l'enregistrement de la simulation.");
    }
  };

  return (
    <div className="simulation-container">
      <header className="header">
        <div className="logo">🚤 Maghrebia Assurance</div>
        <nav>
          <a href="/contact">Contact</a>
          <a href="/faq">FAQ</a>
          <a href="/espace-client">Espace Client</a>
        </nav>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <button onClick={() => navigate("/conseiller")}>
            📍 Trouver un conseiller
          </button>
          <button onClick={() => navigate("/espace-client")}>
            👤 Espace client
          </button>
          <button onClick={() => navigate("/contact")}>📧 Contact</button>
        </aside>

        <main className="simulation-content">
          <h1 className="simulation-title">
            ⚓ Simulez Votre Assurance Bateau
          </h1>

          <form onSubmit={handleSubmit} className="simulation-form">
            {/* TYPE DE BATEAU */}
            <div className="form-group">
              <label>🚢 Type de Bateau</label>
              <select
                name="typeBateau"
                value={formData.typeBateau}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="voilier">Voilier</option>
                <option value="moteur">Bateau à moteur</option>
                <option value="semi-rigide">Semi-Rigide</option>
                <option value="yacht">Yacht</option>
                <option value="jetski">Jet Ski</option>
              </select>
            </div>

            {/* COQUE */}
            <div className="form-group">
              <label>🛥️ Type de Coque</label>
              <select
                name="coque"
                value={formData.coque}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="monocoque">Monocoque</option>
                <option value="multicoque">Multicoque</option>
                <option value="aluminium">Aluminium</option>
                <option value="bois">Bois</option>
                <option value="composite">Composite</option>
              </select>
            </div>

            {/* MOTEUR */}
            <div className="form-group">
              <label>⚙️ Type de Moteur</label>
              <select
                name="moteur"
                value={formData.moteur}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="hors-bord">Hors-bord</option>
                <option value="inboard">Inboard</option>
                <option value="electrique">Électrique</option>
                <option value="diesel">Diesel</option>
              </select>
            </div>

            {/* ACCESSOIRES */}
            <div className="form-group">
              <label>🎛️ Accessoires</label>
              <input
                type="text"
                name="accessoires"
                value={formData.accessoires}
                onChange={handleChange}
                placeholder="Ex: GPS, Sondeur, Radio VHF..."
              />
            </div>

            {/* AGE DU BATEAU */}
            <div className="form-group">
              <label>⏳ Âge du Bateau (en années)</label>
              <input
                type="number"
                name="ageBateau"
                value={formData.ageBateau}
                onChange={handleChange}
              />
            </div>

            {/* PRIX DU BATEAU */}
            <div className="form-group">
              <label>💰 Prix du Bateau (dt)</label>
              <input
                type="number"
                name="prixBateau"
                value={formData.prixBateau}
                onChange={handleChange}
              />
            </div>

            {/* DATE D'ACHAT */}
            <div className="form-group">
              <label>📅 Date d'Achat</label>
              <input
                type="date"
                name="dateAchat"
                value={formData.dateAchat}
                onChange={handleChange}
              />
            </div>

            {/* TYPE DE CONTRAT */}
            <div className="form-group">
              <label>📝 Type de Contrat</label>
              <select
                name="typeContrat"
                value={formData.typeContrat}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="responsabilite">Responsabilité Civile</option>
                <option value="multirisque">
                  Assurance Multirisque Plaisance
                </option>
                <option value="individuelle-accident">
                  Assurance Individuelle Accident
                </option>
                <option value="assurance-corps">Assurance Corps</option>
                <option value="garanties-annexes">Garanties Annexes</option>
              </select>
            </div>

            {/* TYPE DE CLIENT */}
            <div className="form-group">
              <label>👥 Type de Client</label>
              <select
                name="typeClient"
                value={formData.typeClient}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="Particulier">Particulier</option>
                <option value="Entreprise">Entreprise</option>
                <option value="Touriste">Touriste</option>
              </select>
            </div>

            <button type="submit" className="btn-submit">
              🚀 Lancer la Simulation
            </button>
          </form>

          {resultatSimulation && (
            <div className="simulation-result">
              🎉 Prix estimé de votre assurance :{" "}
              <strong>{resultatSimulation} dt par an</strong>
            </div>
          )}

          {resultatSimulation && showSaveButton && (
            <button className="btn-save" onClick={handleSaveSimulation}>
              💾 Enregistrer cette simulation
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default Simulation;
