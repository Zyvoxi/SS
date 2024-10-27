import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AR from "./Components/Articles/ArticlesRender";
import AppBar from "./Components/TopBar/AppBar";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Components/SignIn/SingIn";
import Profile from "./Components/Profile/Profile";
import RedirectToProfile from "./Components/RedirectToProfile/RedirectToProfile";
import Blog from "./Components/Blog/Blog";
import "./Styles/App.css";
import "./Styles/index.css";
import { Box, Container, Divider } from "@mui/material";

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
        <main></main>
      </>
    ),
  },
  {
    path: "/SS/contract",
    element: (
      <>
        <AppBar />
        <main>
          <AR />
        </main>
      </>
    ),
  },
  {
    path: "/SS/blog",
    element: (
      <>
        <Container
          maxWidth={true}
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            margin: 0,
            padding: "0 !important",
          }}
        >
          <AppBar />
          <Box maxWidth={true}>
            <Blog />
            <Divider />
            <Footer />
          </Box>
        </Container>
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
