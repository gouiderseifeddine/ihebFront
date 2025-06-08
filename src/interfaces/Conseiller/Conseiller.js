import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./Conseiller.css"; // tu pourras aussi l'adapter pour la carte

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  marginTop: '20px'
};

// Coordonnées du siège social Maghrebia (exemple : Tunis Centre)
const center = {
  lat: 36.8065,  // latitude de Tunis
  lng: 10.1815   // longitude de Tunis
};

// Exemple d'agences avec leurs coordonnées
const agences = [
  { id: 1, name: "Maghrebia Agence Tunis", lat: 36.8065, lng: 10.1815 },
  { id: 2, name: "Maghrebia Agence Sousse", lat: 35.8256, lng: 10.6369 },
  { id: 3, name: "Maghrebia Agence Sfax", lat: 34.7404, lng: 10.7610 }
];

function Conseiller() {
  return (
    <div className="conseiller-map-container">
      <h2>📍 Nos Agences Maghrebia</h2>
      <LoadScript googleMapsApiKey="AIzaSyDZDD1WqhsqtSOiuqsL2Nx9xv9cN8MKPi8">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7} // Zoom pour couvrir plusieurs agences
        >
          {/* Marqueur pour le siège social */}
          <Marker position={center} title="Siège Social Maghrebia" />

          {/* Marqueurs pour chaque agence */}
          {agences.map((agence) => (
            <Marker 
              key={agence.id} 
              position={{ lat: agence.lat, lng: agence.lng }} 
              title={agence.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Conseiller;
