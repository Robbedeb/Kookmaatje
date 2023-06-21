import "./detail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recept, setRecept] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedRecept, setEditedRecept] = useState({});

  const fetchRecept = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/data/${id}`);
      const data = await response.json();
      setRecept(data);
      setEditedRecept(data);
    } catch (error) {
      console.error(
        "Er is een fout opgetreden bij het ophalen van het recept:",
        error
      );
    }
  };

  useEffect(() => {
    fetchRecept();
  }, [id]);

  const handleEdit = async () => {
    const { title, description, ingredients } = editedRecept;

    const formData = new FormData();
    formData.append("title", title || recept.title);
    formData.append("description", description || recept.description);
    formData.append("ingredients", ingredients || recept.ingredients);

    if (editedRecept.image) {
      formData.append("image", editedRecept.image);
    } else {
      formData.append("image", null); // Append null if no image is selected for updating
    }

    try {
      const response = await fetch(`http://localhost:3001/api/data/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Recept succesvol bijgewerkt");
        fetchRecept();
        setEditMode(false);
      } else {
        console.log("Fout bij het bijwerken van het recept");
      }
    } catch (error) {
      console.error("Er is een fout opgetreden: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecept((prevRecept) => ({
      ...prevRecept,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedRecept((prevRecept) => ({
      ...prevRecept,
      image: file,
    }));
  };

  if (!recept) {
    return <div>Loading...</div>;
  }

  if (editMode) {
    return (
      <>
        <section className="component">
          <div className="kleur">
            <h1 className="titel">Edit recept</h1>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="wave"
          >
            <path
              fill="#34B76A"
              fillOpacity="1"
              d="M0,288L60,245.3C120,203,240,117,360,80C480,43,600,53,720,85.3C840,117,960,171,1080,165.3C1200,160,1320,96,1380,64L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
          <form className="toevoeg-form">
            <div className="title">
              <label htmlFor="title">Titel</label>
              <input
                type="text"
                name="title"
                value={editedRecept.title || recept.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="beschrijving">
              <label htmlFor="description">Beschrijving</label>
              <textarea
                name="description"
                value={editedRecept.description || recept.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="Ingredienten">
              <label htmlFor="ingredients">Ingrediënten</label>
              <textarea
                name="ingredients"
                value={editedRecept.ingredients || recept.ingredients}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="Image">
              <label htmlFor="image">Afbeelding</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="button-form">
              <button onClick={handleEdit} className="toevoeg-button">
                Opslaan
              </button>
            </div>
          </form>
        </section>
      </>
    );
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/data/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Rij succesvol verwijderd");
        navigate("/recepten");
      } else {
        console.log("Fout bij het verwijderen van de rij");
      }
    } catch (error) {
      console.error("Er is een fout opgetreden: ", error);
    }
  };

  return (
    <>
      <section className="component">
        <div className="back">
          <Link to="/Recepten">
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
          <h1 className="titel">Recept details</h1>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="wave"
        >
          <path
            fill="#34B76A"
            fillOpacity="1"
            d="M0,288L60,245.3C120,203,240,117,360,80C480,43,600,53,720,85.3C840,117,960,171,1080,165.3C1200,160,1320,96,1380,64L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
        <div className="detail-info container">
          <h2>{recept.title}</h2>
          <p className="label">Beschrijving:</p>
          <p className="beschrijving">{recept.description}</p>
          <p className="label-ing">Ingrediënten:</p>
          <p className="ingredients">{recept.ingredients}</p>
          <div className="detail-image">
            {recept.image ? (
              <img
                src={`http://localhost:3001/uploads/${recept.image}`}
                alt={recept.title}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className="button-edit">
            <button onClick={() => setEditMode(true)} className="bewerken">
              Bewerken
            </button>
            <button onClick={handleDelete} className="verwijderen">
              Verwijderen
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
