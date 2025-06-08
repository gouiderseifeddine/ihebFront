import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="why-bna-section">
        <h2>Pourquoi choisir Maghrbia Assurances</h2>
        <div className="features">
          <div className="feature">
            <h3>La simplicité</h3>
            <p>Un tarif d'assurance personnalisé</p>
          </div>
          <div className="feature">
            <h3>La confiance</h3>
            <p>
              Le savoir-faire et la proximité de notre réseau et partenaires
            </p>
          </div>
          <div className="feature">
            <h3>Le prix</h3>
            <p>Des tarifs étudiés pour vos besoins</p>
          </div>
        </div>
      </section>

      <section className="univers-section">
        <h2>
          <span style={{ color: "#2f479a" }}>
            Une parfaite maitrise du risque,
          </span>{" "}
          <span style={{ color: "#8a8fa7" }}>découvrez notre univers...</span>
        </h2>
        <div className="univers-grid">
          {[
            {
              title: "Assurance Plaisance",
              image: "/images/bateau.jpeg",
              description:
                "Naviguez en toute sérénité avec notre assurance plaisance, conçue pour couvrir les propriétaires de bateaux de loisir contre les risques en mer, au port ou lors du transport.",
            },
            {
              title: "Garantie bateau",
              image: "/images/garantie.jpg",
              description:
                "Protégez votre embarcation avec nos garanties bateau complètes : dommages matériels, assistance en mer, vol, incendie, et responsabilité civile incluse.",
            },
            {
              title: "Prévoyance",
              image: "/images/prevoyance.jpg",
              description:
                "Préparez l’avenir avec notre solution de prévoyance : une couverture adaptée aux plaisanciers en cas d’accident, d’invalidité ou de décès, pour vous et vos proches.",
            },
            {
              title: "Points de fidélité",
              image: "/images/images.png",
              description:
                "Profitez de notre programme de fidélité : chaque année assurée vous rapporte des points convertibles en réductions ou services exclusifs pour votre bateau.",
            },
          ].map((item, index) => (
            <div className="univers-card" key={index}>
              <img
                src={item.image}
                alt={item.title}
                className="univers-image"
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button className="univers-button">VOIR PLUS</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
