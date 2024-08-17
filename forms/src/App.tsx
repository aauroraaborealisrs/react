import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main.tsx";
import UncontrolledForm from "./components/UncontrolledForm.tsx";
import ControlledForm from "./components/ControlledForm.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/uncontrolled-form">Uncontrolled Form</Link>
            </li>
            <li>
              <Link to="/controlled-form">Controlled Form</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/controlled-form" element={<ControlledForm />} />
      </Routes>
    </Router>
  );
};

export default App;
