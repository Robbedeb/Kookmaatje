import "./Recepten.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Recepten = () => {
  const [recepten, setRecepten] = useState([]);
  const [zoekTerm, setZoekTerm] = useState("");

  useEffect(() => {
    async function fetchRecepten() {
      try {
        const response = await fetch("http://localhost:3001/api/data");
        const data = await response.json();
        setRecepten(data);
      } catch (error) {
        console.error(
          "Er is een fout opgetreden bij het ophalen van de recepten:",
          error
        );
      }
    }

    fetchRecepten();
  }, []);

  const gefilterdeRecepten = recepten.filter((recept) =>
    recept.title.toLowerCase().includes(zoekTerm.toLowerCase())
  );

  return (
    <>
      <section className="component">
        <div className="front">
          <Link to="/Toevoegen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
            </svg>
          </Link>
        </div>
        <div className="kleur">
          <h2 className="titel">Recepten</h2>
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

        <div className="recepten-div container">
          <div className="zoekbalk">
            <input
              type="text"
              value={zoekTerm}
              onChange={(e) => setZoekTerm(e.target.value)}
              placeholder="Zoeken..."
            />
          </div>

          {gefilterdeRecepten.map((recept) => (
            <Link
              to={`/recepten/${recept.id}`}
              key={recept.id}
              className="recept"
            >
              <div className="row receptlengte">
                <div className="col-sm-2 col-3">
                  <div className="img-container">
                    <img
                      src={`http://localhost:3001/uploads/${recept.image}`}
                      alt={recept.title}
                      className="receptfoto"
                    />
                  </div>
                </div>
                <div className="col-sm-10 col-9">
                  <h3 className="titel">{recept.title}</h3>
                  <p className="beschrijving">{recept.description}</p>
                </div>
              </div>
              <div className="pijl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21.052"
                  height="26.687"
                  viewBox="0 0 21.052 26.687"
                >
                  <g
                    id="Group_2"
                    data-name="Group 2"
                    transform="translate(-343.97 -272.652)"
                  >
                    <line
                      id="Line_3"
                      data-name="Line 3"
                      x2="19.992"
                      y2="12.495"
                      transform="translate(344.5 273.5)"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                    />
                    <line
                      id="Line_4"
                      data-name="Line 4"
                      y1="12.495"
                      x2="19.992"
                      transform="translate(344.5 285.995)"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>
            </Link>
          ))}
          <Link to="/">
            <div className="home-knop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h18v-10h3zm-5 8h-14v-10.26l7-6.912 7 6.99v10.182zm-5-1h-4v-6h4v6z" />
              </svg>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Recepten;
