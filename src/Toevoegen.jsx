import "./Toevoegen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Toevoegen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients);

    try {
      const response = await fetch("http://localhost:3001/api/data", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Gegevens zijn succesvol naar de server verzonden.");
        navigate("/recepten");

        // Insert image name into database
        const imageName = image.name;
        const imageResponse = await fetch(
          "http://localhost:3001/api/data/${recipeId}/image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageName }),
          }
        );

        if (imageResponse.ok) {
          console.log(
            "Afbeeldingsnaam is succesvol opgeslagen in de database."
          ); // Navigeer naar de receptenpagina na het verzenden van het formulie
        } else {
          console.log(
            "Er is een fout opgetreden bij het opslaan van de afbeeldingsnaam in de database."
          );
        }
      } else {
        console.log(
          "Er is een fout opgetreden bij het verzenden van de gegevens naar de server."
        );
      }
    } catch (error) {
      console.error("Er is een fout opgetreden: ", error);
    }
  };

  return (
    <>
      <section className="component">
        <div className="back">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="back-arrow"
            >
              <g data-name="Layer 2">
                <path
                  d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
                  data-name="arrow-ios-back"
                ></path>
              </g>
            </svg>
          </Link>
        </div>
        <div className="kleur">
          <h2 className="titel">Recept toevoegen</h2>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="wave"
        >
          <path
            fill="#34B76A"
            fillOpacity="1"
            d="M0,288L60,245.3C120,203,240,117,360,80C480,43,600,53,720,85.3C840,117,960,171,1080,165.3C1200,160,1320,96,1380,64L1440,32L1440,0L1380,0,1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>

        <form onSubmit={handleSubmit} className="toevoeg-form">
          <div className="title">
            <label htmlFor="title">Titel</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="beschrijving">
            <label htmlFor="description">Beschrijving</label>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="Ingredienten">
            <label htmlFor="ingredients">Ingrediënten</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className="Image">
            <label htmlFor="image">Afbeelding</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="button-form">
            <button type="submit" className="toevoeg-button">
              Voeg toe
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Toevoegen;
