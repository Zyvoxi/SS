import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import Main from "./Components/Articles/ArticlesRender";
import AppBar from "./Components/TopBar/AppBar";
import SignIn from "./Components/SignIn/SingIn";
import Profile from "./Components/Profile/Profile";
import "./Components/Styles/App.css";
import "./Components/Styles/index.css"

// Componente para redirecionamento dinâmico
// eslint-disable-next-line react-refresh/only-export-components
const RedirectToProfile = () => {
  const { uuid } = useParams(); // Extraindo uuid da URL
  return <Navigate to={`/SS/user/${uuid}/profile`} replace={true} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/SS" replace={true} />,
  },
  {
    path: "/SS/signin",
    element: <SignIn />,
  },
  {
    path: "/SS/",
    element: (
      <>
        <AppBar />
        <main>
          <Main />
        </main>
      </>
    ),
  },
  {
    path: "/SS/user/:uuid", // Redireciona para o perfil usando RedirectToProfile
    element: <RedirectToProfile />,
  },
  {
    path: "/SS/user/:uuid/profile",
    element: (
      <>
        <AppBar />
        <main>
          <Profile />
        </main>
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="App">
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
);
