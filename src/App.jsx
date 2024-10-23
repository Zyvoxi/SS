import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom"; // Importa as funções do React Router
import Main from "./Components/Articles/ArticlesRender.jsx";
import AppBar from "./Components/TopBar/AppBar.jsx";
import SignIn from "./Components/SignIn/SingIn.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import "./Components/Styles/App.css";

// Componente para redirecionamento dinâmico
function RedirectToProfile() {
  const { uuid } = useParams(); // Captura o UUID da URL
  return <Navigate to={`/SS/user/${uuid}/profile`} replace />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redireciona a rota raiz para /SS */}
          <Route path="/" element={<Navigate to="/SS" replace />} />

          {/* Define a rota para o componente SignIn */}
          <Route path="/SS/signin" element={<SignIn />} />

          {/* Define a rota para o componente Main (aqui é a página principal) */}
          <Route
            path="/SS/"
            element={
              <>
                <AppBar />
                <main>
                  <Main />
                </main>
              </>
            }
          />

          {/* Redireciona para /profile se o usuário acessar apenas /user/:uuid */}
          <Route path="/SS/user/:uuid" element={<RedirectToProfile />} />

          {/* Define a rota para o perfil */}
          <Route
            path="/SS/user/:uuid/profile"
            element={
              <>
                <AppBar />
                <main>
                  <Profile />
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
