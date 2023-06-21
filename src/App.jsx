import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Front";
import Toevoegen from "./Toevoegen";
import Recepten from "./Recepten";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/toevoegen" element={<Toevoegen />} />
      <Route path="/recepten" element={<Recepten />} />
      <Route path="/recepten/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;
