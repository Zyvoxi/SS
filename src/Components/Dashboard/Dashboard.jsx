import * as React from "react";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "./Extras/Header";
import MainGrid from "./Extras/MainGrid";
import SideMenu from "./Extras/SideMenu";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const signedUser = localStorage.getItem("userProfile");
    // eslint-disable-next-line curly
    if (!signedUser) return navigate("/overview");
  }, [navigate]);

  return (
    <>
      <SideMenu />
      {/* Conteudo principal */}
      <Box
        component="main"
        sx={(theme) => ({
          padding: { xs: "0", md: "70px 0 0 0" },
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: "auto",
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 1.5,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header />
          <MainGrid />
        </Stack>
      </Box>
    </>
  );
}
