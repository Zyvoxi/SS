import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Importa as funções do React Router
import Main from "./Components/Main.jsx";
import AppBar from "./Components/AppBar.jsx";
import SignIn from "./Components/SingIn.jsx";
import "./Components/Style/ACSS.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redireciona a rota raiz para /SS-Test */}
          <Route path="/" element={<Navigate to="/SS" replace />} />

          {/* Define a rota para o componente SignIn */}
          <Route path="/SS/signin" element={<SignIn />} />

          {/* Define a rota para o componente Main (aqui é a página principal) */}
          <Route
            path="/SS"
            element={
              <>
                <AppBar />
                <main>
                  <Main />
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
