import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
  Typography,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import logo from "./Images/Logo/logo-alt.svg";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `15px`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "2px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [userPicture, setUserPicture] = React.useState("");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignInClick = () => {
    navigate("/SS-Test/signin");
  };

  const handleSignOutClick = () => {
    localStorage.removeItem("GoogleUserProfile")
    window.location.reload();
  };

  React.useEffect(() => {
    // Verifica se o GoogleUserProfile está armazenado
    const userProfile = localStorage.getItem("GoogleUserProfile"); // ou sessionStorage, se preferir

    if (userProfile) {
      const profile = JSON.parse(userProfile);

      setUserName(profile.name); // Armazena o nome
      setUserPicture(profile.picture); // Armazena a foto

      setIsUserLoggedIn(true); // Define o estado para indicar que o usuário está logado
    }
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <img
              src={logo}
              alt="logo"
              className="rotating-logo"
              style={{ width: "40px", height: "40px", marginRight: "0px" }}
            />
            <Typography color="#6c8cf6" variant="h5" fontWeight={700} mr={5}>
              STOPSKILL
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                size="small"
                sx={{
                  fontWeight: "600",
                  color: "#888",
                }}
              >
                Features
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{
                  fontWeight: "600",
                  color: "#888",
                }}
              >
                Testimonials
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{
                  fontWeight: "600",
                  color: "#888",
                }}
              >
                Highlights
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{
                  fontWeight: "600",
                  color: "#888",
                }}
              >
                Pricing
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{ minWidth: 0, fontWeight: "600", color: "#888" }}
              >
                FAQ
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{ minWidth: 0, fontWeight: "600", color: "#888" }}
              >
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {isUserLoggedIn && (
              <>
                <Avatar alt={userName} src={userPicture} onClick={handleSignOutClick} sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }} />
              </>
            )}
            {!isUserLoggedIn && (
              <>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleSignInClick}
                  sx={{
                    fontWeight: "600",
                    color: "#888",
                  }}
                >
                  Entrar
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{
                    transition: "500ms ease !important", // Forçar transição
                    backgroundColor: "#333 !important", // Cor padrão
                    backgroundImage: "linear-gradient(to bottom, #333, #000)",
                    "&:hover": {
                      background: "linear-gradient(to bottom, #333, #333)",
                      backgroundImage:
                        "linear-gradient(to bottom, #00000000, #00000000)", // Cor ao passar o mouse
                    },
                    "&:focus": {
                      outline: "none !important", // Remover contorno de foco
                    },
                  }}
                >
                  Registrar-se
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                {isUserLoggedIn && (
                  <>
                    <Divider />
                    <MenuItem sx={{
                      gap: "8px"
                    }}>
                      <Avatar alt={userName} src={userPicture} />
                      {userName}
                    </MenuItem>
                    <MenuItem>Configurações</MenuItem>
                    <MenuItem onClick={handleSignOutClick}>Sair</MenuItem>
                  </>
                )}
                {!isUserLoggedIn && (
                  <>
                    <Divider />
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        fullWidth
                        onClick={handleSignInClick}
                        sx={{
                          color: "black",
                          backgroundColor: "transparent",
                          borderColor: "black",
                          "&:hover": {
                            borderColor: "#666",
                          },
                        }}
                      >
                        Entrar
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        variant="conteined"
                        fullWidth
                        sx={{
                          transition: "500ms ease !important", // Forçar transição
                          color: "white",
                          backgroundColor: "#333 !important", // Cor padrão
                          backgroundImage:
                            "linear-gradient(to bottom, #333, #000)",
                          "&:hover": {
                            background:
                              "linear-gradient(to bottom, #333, #333)",
                            backgroundImage:
                              "linear-gradient(to bottom, #00000000, #00000000)", // Cor ao passar o mouse
                          },
                          "&:focus": {
                            outline: "none !important", // Remover contorno de foco
                          },
                        }}
                      >
                        Registrar-se
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
