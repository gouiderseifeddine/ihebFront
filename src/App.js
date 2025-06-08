import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./interfaces/Home/Home";
import Simulation from "./interfaces/Simulation/Simulation";
import Offre from "./interfaces/offre/offre";
import Contact from "./interfaces/contact/Contact";
import Contrat from "./interfaces/contrat/contrat";
import EspaceClient from "./interfaces/EspaceClient/EspaceClient";
import LoginClient from "./interfaces/espace-client/LoginClient";
import ChangerMotDePasse from "./interfaces/espace-client/ChangerMotDePasse";

import EspaceAgentLogin from "./interfaces/EspaceAgentLogin/EspaceAgentLogin";
import EspaceAgentDashboard from "./interfaces/EspaceAgentLogin/EspaceAgentDashboard";
import AjouterContrat from "./interfaces/EspaceAgentLogin/AjouterContrat";
import ConsulterContrats from "./interfaces/EspaceAgentLogin/ConsulterContrats";
import AjouterOffre from "./interfaces/EspaceAgentLogin/AjouterOffre";

import Conseiller from "./interfaces/Conseiller/Conseiller";

import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// 🔒 Route protégée pour l'espace client
const ProtectedClientRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("clientAuth");

  return isAuthenticated ? children : <Navigate to="/login-client" />;
};

function App() {
  const {
    isClientLoggedIn,
    setIsClientLoggedIn,
    isAgentLoggedIn,
    setIsAgentLoggedIn,
  } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <div className="logo">
            <h2>GESTION ASSURANCE BATEAU</h2>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Accueil</Link>
              </li>
              <li>
                <Link to="/simulation">Simulation</Link>
              </li>
              <li>
                <Link to="/offre">Offres</Link>
              </li>
              <li>
                <Link to="/contrat">Contrats</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>

              {isClientLoggedIn ? (
                <>
                  <li>
                    <Link to="/espace-client" className="btn-espace">
                      Espace Client
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home"
                      className="btn-deconnexion"
                      onClick={() => {
                        localStorage.removeItem("agentAuth");
                        localStorage.removeItem("clientAuth");
                        localStorage.clear();
                        setIsClientLoggedIn(false);
                        setIsAgentLoggedIn(false);
                      }}
                    >
                      deconnexion
                    </Link>
                  </li>
                </>
              ) : isAgentLoggedIn ? (
                <>
                  <li>
                    <Link to="/dashboard-agent" className="btn-espace">
                      Espace Agent
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home"
                      className="btn-deconnexion"
                      onClick={() => {
                        localStorage.removeItem("agentAuth");
                        localStorage.removeItem("clientAuth");
                        localStorage.clear();
                        setIsClientLoggedIn(false);
                        setIsAgentLoggedIn(false);
                      }}
                    >
                      deconnexion
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login-client" className="btn-espace">
                      Espace Client
                    </Link>
                  </li>
                  <li>
                    <Link to="/espace-agent" className="btn-espace">
                      Espace Agent
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <Routes>
          {/* 🏠 Pages publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/offre" element={<Offre />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contrat" element={<Contrat />} />
          <Route path="/conseiller" element={<Conseiller />} />

          {/* 👤 Authentification client */}
          <Route path="/login-client" element={<LoginClient />} />
          <Route path="/changer-mdp" element={<ChangerMotDePasse />} />
          <Route
            path="/espace-client"
            element={
              <ProtectedClientRoute>
                <EspaceClient />
              </ProtectedClientRoute>
            }
          />

          {/* 👨‍💼 Espace agent */}
          <Route path="/espace-agent" element={<EspaceAgentLogin />} />
          <Route path="/dashboard-agent" element={<EspaceAgentDashboard />} />
          <Route
            path="/espace-agent/ajouter-contrat"
            element={<AjouterContrat />}
          />
          <Route
            path="/espace-agent/consulter-contrats"
            element={<ConsulterContrats />}
          />
          <Route
            path="/espace-agent/ajouter-offre"
            element={<AjouterOffre />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
