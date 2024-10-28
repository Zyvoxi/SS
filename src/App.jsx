import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import AppBar from "./Components/TopBar/AppBar";
import Footer from "./Components/Footer/Footer";
import { Box, Container, Divider } from "@mui/material";

// Importação dinâmica dos componentes
const AR = React.lazy(() => import("./Components/Articles/ArticlesRender"));
const SignIn = React.lazy(() => import("./Components/SignIn/SingIn"));
const Profile = React.lazy(() => import("./Components/Profile/Profile"));
const Blog = React.lazy(() => import("./Components/Blog/Blog"));

const RedirectToProfile = () => {
  const { uuid } = useParams();
  return <Navigate to={`/SS/user/${uuid}/profile`} replace={true} />;
};

const LoadingFallback = () => <div></div>;

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
          <React.Suspense fallback={<LoadingFallback />}>
            <AR />
          </React.Suspense>
        </main>
      </>
    ),
  },
  {
    path: "/SS/blog",
    element: (
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
          <AppBar />
          <Box maxWidth={true}>
            <Blog />
            <Divider />
            <Footer />
          </Box>
        </Container>
      </React.Suspense>
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
        <AppBar />
        <main>
          <React.Suspense fallback={<LoadingFallback />}>
            <Profile />
          </React.Suspense>
        </main>
      </>
    ),
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
