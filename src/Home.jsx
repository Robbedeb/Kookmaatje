import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <section className="home">
      <div className="kleur">
        <h1 className="titel">Kookmaatje</h1>
      </div>
      <div className="knoppen container">
        <button className="toevoegen knop">
          Recept toevoegengasas
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
                stroke-width="2"
              />
              <line
                id="Line_2"
                data-name="Line 2"
                x1="27.053"
                transform="translate(348.5 362.026)"
                fill="none"
                stroke="#000"
                stroke-width="2"
              />
            </g>
          </svg>
        </button>
        <button className="vorige knop">
          Vorige recepten{" "}
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
              fill-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Home;
