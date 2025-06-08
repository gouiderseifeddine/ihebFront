import React, { useState, useRef } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    confirmationEmail: "",
    societe: "",
    fonction: "",
    telephone: "",
    dateNaissance: "",
    sujet: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email confirmation
    if (formData.email !== formData.confirmationEmail) {
      alert("Email and confirmation email do not match.");
      return;
    }

    emailjs
      .sendForm(
        "service_591k0cy", // Replace with your EmailJS service ID
        "template_dbc540f", // Replace with your EmailJS template ID
        form.current,
        {
          publicKey: "Y4iHrEyNGQA8F8aNl",
        }
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Votre message a été envoyé !");
          setFormData({
            nom: "",
            prenom: "",
            email: "",
            confirmationEmail: "",
            societe: "",
            fonction: "",
            telephone: "",
            dateNaissance: "",
            sujet: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
          alert("Une erreur s'est produite lors de l'envoi du message.");
        }
      );
  };

  return (
    <div className="contact-container">
      <h2>Contact</h2>
      <div className="contact-content">
        <form className="contact-form" ref={form} onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              name="nom"
              placeholder="Nom"
              required
              onChange={handleChange}
              value={formData.nom}
            />
            <input
              name="prenom"
              placeholder="Prénom"
              required
              onChange={handleChange}
              value={formData.prenom}
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="email"
              name="confirmationEmail"
              placeholder="Confirmation Email"
              required
              onChange={handleChange}
              value={formData.confirmationEmail}
            />
          </div>
          <div className="form-row">
            <input
              name="societe"
              placeholder="Société"
              onChange={handleChange}
              value={formData.societe}
            />
            <input
              name="fonction"
              placeholder="Fonction"
              onChange={handleChange}
              value={formData.fonction}
            />
          </div>
          <div className="form-row">
            <input
              name="telephone"
              placeholder="Téléphone"
              required
              onChange={handleChange}
              value={formData.telephone}
            />
            <input
              type="date"
              name="dateNaissance"
              placeholder="Date de Naissance"
              onChange={handleChange}
              value={formData.dateNaissance}
            />
          </div>
          <input
            name="sujet"
            placeholder="Sujet"
            required
            onChange={handleChange}
            value={formData.sujet}
          />
          <textarea
            name="message"
            placeholder="Votre message"
            required
            onChange={handleChange}
            value={formData.message}
          ></textarea>

          <div className="form-row checkbox-row">
            <input type="checkbox" required />
            <label>
              J’ai lu et approuvé les conditions de traitement des données
              personnelles.
            </label>
          </div>

          <button type="submit">Envoyer</button>
        </form>

        <div className="contact-info">
          <h3>ASSURANCES MAGHREBIA</h3>
          <p>64, rue de Palestine 1002 Tunis</p>
          <p>Tél. : 00 216 71 788 800</p>
          <p>Fax : 00 216 71 788 334</p>

          <h3>ASSURANCES MAGHREBIA VIE</h3>
          <p>24, Rue du Royaume d'Arabie Saoudite 1002 Tunis</p>
          <p>Tél. : 00 216 71 155 700</p>
          <p>Fax : 00 216 71 843 993</p>

          <h4>N° Bleu : 82 10 20 20</h4>
          <p>Du Lundi au Vendredi de 8h00 à 17h30</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
