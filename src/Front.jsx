import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="component">
      <div className="kleur_front">
        {/* <h1 className="titel">Kookmaatje</h1> */}
        <img src="../logo.png" alt="" />
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

      <div className="knoppen container">
        <Link to="/toevoegen" className="toevoegen knop">
          Recept toevoegen
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27.053"
            height="27.053"
            viewBox="0 0 27.053 27.053"
          >
            <g
              id="Group_1"
              data-name="Group 1"
              transform="translate(-348.5 -348.5)"
            >
              <line
                id="Line_1"
                data-name="Line 1"
                y2="27.053"
                transform="translate(362.026 348.5)"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <line
                id="Line_2"
                data-name="Line 2"
                x1="27.053"
                transform="translate(348.5 362.026)"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
            </g>
          </svg>
        </Link>
        <Link to="/recepten" className="vorige knop">
          Recepten{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="29"
            viewBox="0 0 33 29"
          >
            <path
              id="folder"
              d="M5.5,1.5A2.756,2.756,0,0,0,2.75,4.262V5.643q0,.117.01.232A4.143,4.143,0,0,0,0,9.786V26.357A4.134,4.134,0,0,0,4.125,30.5h24.75A4.134,4.134,0,0,0,33,26.357V9.786a4.134,4.134,0,0,0-4.125-4.143H16.327A5.507,5.507,0,0,0,11,1.5Zm7.882,4.143A2.747,2.747,0,0,0,11,4.262H5.5V5.643ZM4.125,8.4A1.378,1.378,0,0,0,2.75,9.786V26.357a1.378,1.378,0,0,0,1.375,1.381h24.75a1.378,1.378,0,0,0,1.375-1.381V9.786A1.378,1.378,0,0,0,28.875,8.4Z"
              transform="translate(0 -1.5)"
              fillRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default Home;
