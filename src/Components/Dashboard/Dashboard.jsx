import * as React from "react";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "./Extras/Header";
import MainGrid from "./Extras/MainGrid";
import SideMenu from "./Extras/SideMenu";
import SideMenuMobile from "./Extras/SideMenuMobile";
import { ArrowBackIos as ArrowBackIosIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const showMenu = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    const signedUser = localStorage.getItem("userProfile");
    // eslint-disable-next-line curly
    if (!signedUser) return navigate("/overview");
  }, [navigate]);

  return (
    <>
      <SideMenu />
      <Box
        sx={{
          display: { xs: "auto", md: "none" },
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderTop: "1px solid lightgray",
          borderBottom: "1px solid lightgray",
          borderLeft: "1px solid lightgray",
          backdropFilter: "blur(24px)",
          height: "80px",
          position: "fixed",
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))",
          top: "45%",
          right: "-0.5%",
          transition: "ease 190ms",
          zIndex: "1000",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          showMenu(!open)();
        }}
      >
        <ArrowBackIosIcon
          sx={{
            position: "relative",
            top: "35%",
            left: "20%",
          }}
        />
      </Box>
      <SideMenuMobile open={open} showMenu={showMenu} />
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
            mx: 3,
            pb: 1,
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
