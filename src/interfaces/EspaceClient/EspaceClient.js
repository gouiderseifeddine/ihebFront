import React, { useState, useEffect } from "react";
import "./EspaceClient.css";

const EspaceClient = () => {
  const [activeSection, setActiveSection] = useState("profil");
  const [editMode, setEditMode] = useState(false);

  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    type: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const bateauId = parsed.bateaux?.[0];
      if (bateauId) {
        fetch(`http://localhost:7000/api/bateaux/${bateauId}`)
          .then((res) => res.json())
          .then((data) => {
            setBateauData({
              typeBateau: data.type_bateau || "",
              typeCoque: data.type_de_coque || "",
              typeMoteur: data.type_de_moteur || "",
              accessoires: data.accessoire || "",
              prixBateau: data.prix_bateau || 0,
              dateAchat: data.date_acquisition?.split("T")[0] || "",
              status: data.status_bateau || "",
            });
          })
          .catch((err) => {
            console.error("Erreur de récupération du bateau :", err);
          });
      }
      setUserData({
        nom: parsed.lastName || "",
        prenom: parsed.firstName || "",
        email: parsed.email || "",
        telephone: parsed.phoneNumber || "",
        type: parsed.role || "",
      });
    }
  }, []);

  const [bateauData, setBateauData] = useState({
    typeBateau: "Voilier",
    typeCoque: "Monocoque",
    typeMoteur: "In-bord",
    accessoires: "GPS, VHF, Gilets de sauvetage",
    prixBateau: 25000,
    dateAchat: "2020-01-15",
    status: "Disponible",
  });

  const [simulations, setSimulations] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const simulationIds = Array.isArray(parsed.simulation)
        ? parsed.simulation
        : [];

      Promise.all(
        simulationIds.map((id) =>
          fetch(`http://localhost:7000/api/simulations/${id}`)
            .then((res) => res.json())
            .catch((err) => {
              console.error(
                `Erreur lors de la récupération de la simulation ${id} :`,
                err
              );
              return null;
            })
        )
      ).then((data) => {
        // Remove any nulls (in case some fetch failed)
        const filtered = data.filter((sim) => sim !== null);
        setSimulations(filtered);
      });
    }
  }, []);

  const [contrats] = useState([
    { contrat: "Assurance Bateau #1234", dateEcheance: "2025-06-01" },
  ]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBateauChange = (e) => {
    setBateauData({ ...bateauData, [e.target.name]: e.target.value });
  };

  const handleSaveUser = async () => {
    try {
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) return;

      const parsed = JSON.parse(storedUser);
      const userId = parsed._id; // assuming your localStorage stores the user's _id

      const response = await fetch(
        `http://localhost:7000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: userData.prenom,
            lastName: userData.nom,
            email: userData.email,
            phoneNumber: userData.telephone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur.");
      }

      const updatedUser = await response.json();

      // Update localStorage as well (to reflect new data)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...parsed,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNumber,
        })
      );

      // Update React state
      setUserData({
        nom: updatedUser.lastName,
        prenom: updatedUser.firstName,
        email: updatedUser.email,
        telephone: updatedUser.phoneNumber,
        type: updatedUser.role,
      });

      setEditMode(false);
      alert("Informations mises à jour avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour.");
    }
  };
  const handleSaveBateau = async () => {
    try {
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) return;

      const parsed = JSON.parse(storedUser);
      const bateauId = parsed.bateaux?.[0]; // Assuming userData.bateaux is an array with at least one bateau ID

      if (!bateauId) {
        alert("Aucun bateau lié à cet utilisateur.");
        return;
      }

      const response = await fetch(
        `http://localhost:7000/api/bateaux/${bateauId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type_bateau: bateauData.typeBateau,
            type_de_coque: bateauData.typeCoque,
            type_de_moteur: bateauData.typeMoteur,
            Accessoires: bateauData.accessoires,
            prix_bateau: bateauData.prixBateau,
            date_acquisition: bateauData.dateAchat,
            status_bateau: bateauData.status,
            age_bateau:
              new Date().getFullYear() -
              new Date(bateauData.dateAchat).getFullYear(), // You can adjust this logic if needed
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du bateau.");
      }

      const updatedBateau = await response.json();

      // Update React state
      setBateauData({
        typeBateau: updatedBateau.type_bateau,
        typeCoque: updatedBateau.type_de_coque,
        typeMoteur: updatedBateau.type_de_moteur,
        accessoires: updatedBateau.Accessoires,
        prixBateau: updatedBateau.prix_bateau,
        dateAchat: updatedBateau.date_acquisition.split("T")[0],
        status: updatedBateau.status_bateau,
      });

      setEditMode(false);
      alert("Informations du bateau mises à jour avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du bateau.");
    }
  };

  return (
    <div className="espace-client-container">
      <div className="card-tabs">
        <button
          className={activeSection === "profil" ? "active" : ""}
          onClick={() => setActiveSection("profil")}
        >
          👤 Mon Profil
        </button>
        <button
          className={activeSection === "bateau" ? "active" : ""}
          onClick={() => setActiveSection("bateau")}
        >
          🚤 Mon Bateau
        </button>
        <button
          className={activeSection === "contrats" ? "active" : ""}
          onClick={() => setActiveSection("contrats")}
        >
          📄 Mes Contrats
        </button>
        <button
          className={activeSection === "paiements" ? "active" : ""}
          onClick={() => setActiveSection("paiements")}
        >
          💳 Mes Simulations
        </button>
      </div>

      <div className="tab-card">
        {activeSection === "profil" && (
          <>
            <h3>Informations personnelles</h3>
            {!editMode ? (
              <ul>
                <li>
                  <strong>Nom :</strong> {userData.nom}
                </li>
                <li>
                  <strong>Prénom :</strong> {userData.prenom}
                </li>
                <li>
                  <strong>Email :</strong> {userData.email}
                </li>
                <li>
                  <strong>Téléphone :</strong> {userData.telephone}
                </li>
                <li>
                  <strong>Type :</strong> {userData.type}
                </li>
              </ul>
            ) : (
              <form className="edit-profil-form">
                <input
                  type="text"
                  name="nom"
                  value={userData.nom}
                  onChange={handleChange}
                  placeholder="Nom"
                />
                <input
                  type="text"
                  name="prenom"
                  value={userData.prenom}
                  onChange={handleChange}
                  placeholder="Prénom"
                />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="telephone"
                  value={userData.telephone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                />
                <input
                  type="text"
                  name="type"
                  value={userData.type}
                  onChange={handleChange}
                  placeholder="Type"
                  disabled="true"
                />
              </form>
            )}

            <div style={{ marginTop: "10px" }}>
              {editMode ? (
                <>
                  <button onClick={handleSaveUser}>💾 Enregistrer</button>
                  <button
                    onClick={() => setEditMode(false)}
                    style={{ marginLeft: "10px", backgroundColor: "#ccc" }}
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)}>
                  ✏️ Modifier mes infos
                </button>
              )}
            </div>
          </>
        )}

        {activeSection === "bateau" && (
          <>
            <h3>🚤 Mon Bateau</h3>
            <div>
              <p>
                <strong>Type de Bateau :</strong> {bateauData.typeBateau}
              </p>
              <p>
                <strong>Type de Coque :</strong> {bateauData.typeCoque}
              </p>
              <p>
                <strong>Type de Moteur :</strong> {bateauData.typeMoteur}
              </p>
              <p>
                <strong>Accessoires :</strong> {bateauData.accessoires}
              </p>
              <p>
                <strong>Prix du Bateau :</strong> {bateauData.prixBateau} DT
              </p>
              <p>
                <strong>Date d'Achat :</strong> {bateauData.dateAchat}
              </p>
              <p>
                <strong>Status :</strong> {bateauData.status}
              </p>
            </div>

            <button onClick={() => setEditMode(true)}>✏️ Modifier</button>

            {editMode && (
              <form className="edit-bateau-form">
                <input
                  type="text"
                  name="typeBateau"
                  value={bateauData.typeBateau}
                  onChange={handleBateauChange}
                  placeholder="Type de Bateau"
                />
                <input
                  type="text"
                  name="typeCoque"
                  value={bateauData.typeCoque}
                  onChange={handleBateauChange}
                  placeholder="Type de Coque"
                />
                <input
                  type="text"
                  name="typeMoteur"
                  value={bateauData.typeMoteur}
                  onChange={handleBateauChange}
                  placeholder="Type de Moteur"
                />
                <input
                  type="text"
                  name="accessoires"
                  value={bateauData.accessoires}
                  onChange={handleBateauChange}
                  placeholder="Accessoires"
                />
                <input
                  type="number"
                  name="prixBateau"
                  value={bateauData.prixBateau}
                  onChange={handleBateauChange}
                  placeholder="Prix du Bateau (dt)"
                />
                <input
                  type="date"
                  name="dateAchat"
                  value={bateauData.dateAchat}
                  onChange={handleBateauChange}
                  placeholder="Date d'Achat"
                />
                <input
                  type="text"
                  name="status"
                  value={bateauData.status}
                  onChange={handleBateauChange}
                  placeholder="Type de Contrat"
                />

                <button onClick={handleSaveBateau}>💾 Enregistrer</button>
              </form>
            )}
          </>
        )}

        {activeSection === "contrats" && (
          <div>
            <h3>📄 Liste de vos contrats</h3>
            <ul>
              {contrats.map((contrat, index) => (
                <li key={index}>
                  <strong>{contrat.contrat}</strong> - Date d'échéance :{" "}
                  {contrat.dateEcheance}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === "paiements" && (
          <div>
            <h3>📊 Mes Simulations</h3>
            {simulations.length === 0 ? (
              <p>Aucune simulation trouvée.</p>
            ) : (
              <table className="payment-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Type Bateau</th>
                    <th>Type Coque</th>
                    <th>Type Moteur</th>
                    <th>Type Contrat</th>
                    <th>Type Client</th>
                    <th>Montant Assurance</th>
                  </tr>
                </thead>
                <tbody>
                  {simulations.map((sim, index) => (
                    <tr key={sim._id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(
                          sim._id.toString().substring(0, 8) * 1000
                        ).toLocaleDateString()}
                      </td>
                      <td>{sim.type_Bateau}</td>
                      <td>{sim.type_Coque}</td>
                      <td>{sim.type_Moteur}</td>
                      <td>{sim.type_Contrat}</td>
                      <td>{sim.typeClient}</td>
                      <td>{sim.montant_Assurance} DT</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EspaceClient;
