import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  CircularProgress,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./Components/Theme/Theme";
import logger from "./Extras/Debug/debug";

// Importação dinâmica dos componentes
const AppBar = React.lazy(() => import("./Components/TopBar/AppBar"));
const Footer = React.lazy(() => import("./Components/Footer/Normal/Footer"));
const MinimalistFooter = React.lazy(
  () => import("./Components/Footer/Minimalist/Footer"),
);
const Home = React.lazy(() => import("./Components/Home/Home"));
const Overview = React.lazy(() => import("./Components/Overview/Overview"));
const Contracts = React.lazy(() => import("./Components/Contracts/Contracts"));
const SignIn = React.lazy(() => import("./Components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./Components/SignUp/SignUp"));
const Profile = React.lazy(() => import("./Components/Profile/Profile"));
const Blog = React.lazy(() => import("./Components/Blog/Blog"));

const RedirectToProfile = () => {
  const { uuid } = useParams();
  return <Navigate to={`/users/${uuid}/profile`} replace={true} />;
};

const LoadingFallback = () => (
  <Container
    maxWidth={"xl"}
    sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
  >
    <Box>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </Box>
  </Container>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home"} replace={true} />,
  },
  {
    path: "/signin",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <SignIn />
      </React.Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <SignUp />
      </React.Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <React.Suspense>
          <AppBar />
        </React.Suspense>
        <React.Suspense fallback={<LoadingFallback />}>
          <Home />
        </React.Suspense>
      </>
    ),
  },
  {
    path: "/land",
    element: (
      <>
        <React.Suspense>
          <AppBar />
        </React.Suspense>
        <React.Suspense fallback={<LoadingFallback />}>
          <Box maxWidth={true} width={"100%"}>
            <Overview />
            <Footer />
          </Box>
        </React.Suspense>
      </>
    ),
  },
  {
    path: "/contract",
    element: (
      <>
        <React.Suspense>
          <AppBar />
        </React.Suspense>
        <React.Suspense fallback={<LoadingFallback />}>
          <Box maxWidth={"100vw"} width={"100%"}>
            <Contracts />
          </Box>
        </React.Suspense>
      </>
    ),
  },
  {
    path: "/blog",
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
    path: "/users/:uuid", // Redireciona para o perfil usando RedirectToProfile
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <RedirectToProfile />
      </React.Suspense>
    ),
  },
  {
    path: "/users/:uuid/profile",
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
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}
