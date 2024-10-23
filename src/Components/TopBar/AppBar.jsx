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
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import logo from "../Images/Logo/logo-alt.svg";
import { useNavigate } from "react-router-dom";
import "./AppBar.css";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `15px`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.2),
  boxShadow: theme.shadows[1],
  padding: "2px 12px",
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  const nameParts = name.split(" ");

  const initials =
    nameParts.length === 1
      ? `${nameParts[0][0]}`
      : `${nameParts[0][0]}${nameParts[1][0]}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userPicture, setUserPicture] = React.useState("");
  const [userUUID, setUserUUID] = React.useState("");

  // Função para alternar o estado do Drawer
  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  const handleSignInClick = () => {
    navigate("/SS/signin");
  };

  const handleSignOutClick = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("GoogleUserProfile"); // Limpa os dados do perfil
    navigate("/SS/signin");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (option) => {
    if (option === "perfil") {
      navigate(`/SS/user/${userUUID}/profile`);
    } else if (option === "config") {
      console.log("Página de configurações");
    } else if (option === "sair") {
      handleSignOutClick();
    } else if (option === "inicio") {
      navigate("/SS/");
    }
    handleCloseMenu();
  };

  React.useEffect(() => {
    const userProfile = localStorage.getItem("GoogleUserProfile");
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setUserName(profile.name);
      setUserPicture(profile.picture);
      setUserUUID(profile.id);
      setIsUserLoggedIn(true);
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
              style={{ width: "50px", height: "40px", marginRight: "0px" }}
            />
            <Typography color="#6c8cf6" variant="h5" fontWeight={700} mr={5}>
              STOPSKILL
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                size="small"
                onClick={() => navigate("/SS/")}
                sx={{ fontWeight: "600", color: "#888" }}
              >
                Início
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{ fontWeight: "600", color: "#888" }}
              >
                Contratos
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{ fontWeight: "600", color: "#888" }}
              >
                FAQ
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{ fontWeight: "600", color: "#888" }}
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
                <Button
                  onClick={handleAvatarClick}
                  sx={{
                    gap: "5px",
                    color: "#888",
                  }}
                >
                  <Avatar
                    {...stringAvatar(userName)}
                    alt={userName}
                    src={userPicture}
                  />
                  <Typography
                    variant="text"
                    fontSize={20}
                    fontWeight={600}
                    color="#888"
                  >
                    {userName}
                  </Typography>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  sx={{
                    mt: 1.5,
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={() => handleMenuClick("perfil")}>
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("config")}>
                    Configurações
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("sair")}>
                    Sair
                  </MenuItem>
                </Menu>
              </>
            )}
            {!isUserLoggedIn && (
              <>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleSignInClick}
                  sx={{ fontWeight: "600", color: "#888" }}
                >
                  Entrar
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{
                    transition: "500ms ease !important",
                    backgroundColor: "#333 !important",
                    backgroundImage: "linear-gradient(to bottom, #333, #000)",
                    "&:hover": {
                      background: "linear-gradient(to bottom, #333, #333)",
                      backgroundImage:
                        "linear-gradient(to bottom, #00000000, #00000000)",
                    },
                    "&:focus": { outline: "none !important" },
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
                <MenuItem
                  onClick={() => {
                    navigate("/SS/");
                    setOpen(false); // Fechar o Drawer
                  }}
                >
                  Início
                </MenuItem>
                <MenuItem>Contratos</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                {isUserLoggedIn && (
                  <>
                    <Divider />
                    <MenuItem
                      sx={{ gap: "8px" }}
                      onClick={() => {
                        handleMenuClick("perfil");
                        setOpen(false); // Fechar o Drawer
                      }}
                    >
                      <Avatar alt={userName} src={userPicture} />
                      <Typography variant="text">{userName}</Typography>
                    </MenuItem>
                    <MenuItem>Configurações</MenuItem>
                    <MenuItem
                      onClick={() => {
                        setOpen(false); // Fechar o Drawer
                        handleSignOutClick();
                      }}
                    >
                      Sair
                    </MenuItem>
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
                          "&:hover": { borderColor: "#666" },
                        }}
                      >
                        Entrar
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          transition: "500ms ease !important",
                          color: "white",
                          backgroundColor: "#333 !important",
                          backgroundImage:
                            "linear-gradient(to bottom, #333, #000)",
                          "&:hover": {
                            background:
                              "linear-gradient(to bottom, #333, #333)",
                            backgroundImage:
                              "linear-gradient(to bottom, #00000000, #00000000)",
                          },
                          "&:focus": { outline: "none !important" },
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
