import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import { Box, Container, Divider } from "@mui/material";
import logger from "./Extras/Debug/debug";

// Importação dinâmica dos componentes
const AppBar = React.lazy(() => import("./Components/TopBar/AppBar"));
const Footer = React.lazy(() => import("./Components/Footer/Normal/Footer"));
const MinimalistFooter = React.lazy(
  () => import("./Components/Footer/Minimalist/Footer"),
);
const AR = React.lazy(() => import("./Components/Articles/ArticlesRender"));
const SignIn = React.lazy(() => import("./Components/SignIn/SingIn"));
const SignUp = React.lazy(() => import("./Components/SignUp/SignUp"));
const Profile = React.lazy(() => import("./Components/Profile/Profile"));
const Blog = React.lazy(() => import("./Components/Blog/Blog"));

const RedirectToProfile = () => {
  const { uuid } = useParams();
  return <Navigate to={`/SS/user/${uuid}/profile`} replace={true} />;
};

const LoadingFallback = () => (
  <div>
    <div></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/SS" replace={true} />,
  },
  {
    path: "/SS/signin",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <SignIn />
      </React.Suspense>
    ),
  },
  {
    path: "/SS/signup",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <SignUp />
      </React.Suspense>
    ),
  },
  {
    path: "/SS/",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <AppBar />
        <main></main>
      </React.Suspense>
    ),
  },
  {
    path: "/SS/contract",
    element: (
      <>
        <React.Suspense>
          <AppBar />
        </React.Suspense>
        <React.Suspense fallback={<LoadingFallback />}>
          <main>
            <AR />
          </main>
        </React.Suspense>
      </>
    ),
  },
  {
    path: "/SS/blog",
    element: (
      <>
        <React.Suspense>
          <AppBar />
        </React.Suspense>
        <React.Suspense fallback={<LoadingFallback />}>
          <Container
            maxWidth="true"
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              margin: 0,
              padding: "0 !important",
            }}
          >
            <Box maxWidth={true}>
              <Blog />
              <Divider />
              <Footer />
            </Box>
          </Container>
        </React.Suspense>
      </>
    ),
  },
  {
    path: "/SS/user/:uuid", // Redireciona para o perfil usando RedirectToProfile
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <RedirectToProfile />
      </React.Suspense>
    ),
  },
  {
    path: "/SS/user/:uuid/profile",
    element: (
      <>
        <React.Suspense>
          <AppBar />
        </React.Suspense>
        <React.Suspense fallback={<LoadingFallback />}>
          <Container
            maxWidth="true"
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              margin: 0,
              padding: "0 24px 0 24px !important",
            }}
          >
            <Box maxWidth={true}>
              <Profile />
              <MinimalistFooter />
            </Box>
          </Container>
        </React.Suspense>
      </>
    ),
  },
]);

export default function App() {
  React.useEffect(() => {
    logger.debug("Versão de desenvolvimento.");
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
