/* eslint-disable no-magic-numbers */
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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import winston from "winston";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import logo from "../Images/Logo/logo-alt.svg";
import { useNavigate } from "react-router-dom";
import "./AppBar.css";

/**
 * Cria uma barra de navegação customizada com estilo.
 * Configura elementos visuais, como cor de fundo e bordas, usando propriedades de estilo de tema.
 */
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: "15px",
  backdropFilter: "blur(24px)", // Cria efeito de desfoque para um fundo translúcido
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.2), // Define uma cor de fundo levemente translúcida
  boxShadow: theme.shadows[1],
  padding: "2px 12px", // Ajuste do padding para controlar o espaçamento
}));

/**
 * Gera uma cor hexadecimal única para uma string fornecida.
 * Utilizado para criar um avatar com cor de fundo consistente para cada usuário.
 *
 * @param {string} string - String a ser convertida em uma cor hexadecimal.
 * @returns {string} - Cor hexadecimal gerada a partir do hash da string.
 */
function stringToColor(string) {
  let hash = 0;
  let i;

  // Calcula um hash numérico da string
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  // Gera cor hexadecimal a partir dos bits do hash
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

/**
 * Cria um objeto de configuração para o Avatar com cor e iniciais baseadas no nome.
 * Útil para gerar avatares personalizados para cada usuário, mostrando iniciais do nome.
 *
 * @param {string} name - Nome completo do usuário.
 * @returns {object} - Configuração do Avatar com cor de fundo e texto de inicial.
 */
function stringAvatar(name) {
  const nameParts = name.split(" "); // Divide o nome em partes para extrair as iniciais

  // Define as iniciais com base na quantidade de partes no nome
  const initials =
    nameParts.length === 1
      ? `${nameParts[0][0]}`
      : `${nameParts[0][0]}${nameParts[1][0]}`;

  return {
    sx: {
      bgcolor: stringToColor(name), // Define a cor de fundo do avatar com base no nome
    },
    children: initials, // Exibe as iniciais no avatar
  };
}

/**
 * Componente principal AppAppBar, representando a barra de navegação superior.
 * Inclui menus de usuário e login, além de navegação para páginas importantes.
 *
 * @component
 * @returns {JSX.Element} - Barra de navegação com menus de perfil e login.
 */
export default function AppAppBar() {
  // Controla o estado de abertura do Drawer (menu lateral)
  const [open, setOpen] = React.useState(false);

  // Controla o menu dropdown do avatar
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Função de navegação do React Router
  const navigate = useNavigate();

  // Estados para gerenciar informações do usuário
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userPicture, setUserPicture] = React.useState("");
  const [userUUID, setUserUUID] = React.useState("");

  // Logger configurado com winston para registro de mensagens de depuração
  const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "warn" : "debug",
    transports: [new winston.transports.Console()],
  });

  /**
   * Alterna o estado de exibição do Drawer, abrindo ou fechando o menu lateral.
   *
   * @param {boolean} isOpen - Define se o menu deve ser aberto (true) ou fechado (false).
   * @returns {function} - Função de callback que lida com eventos de teclado e clique.
   */
  const toggleDrawer = (isOpen) => (event) => {
    // Evita que o menu seja fechado com teclas de navegação específicas
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen); // Atualiza o estado do menu
  };

  /**
   * Redireciona o usuário para a página de login ao clicar no botão de login.
   */
  const handleSignInClick = () => {
    navigate("/SS/signin");
  };

  /**
   * Realiza logout do usuário, limpando o estado e os dados do perfil local armazenados.
   */
  const handleSignOutClick = () => {
    setIsUserLoggedIn(false); // Marca o usuário como deslogado
    localStorage.removeItem("userProfile"); // Remove dados do perfil do localStorage
    navigate("/SS/signin"); // Redireciona para a página de login
  };

  /**
   * Abre o menu de opções do avatar, definindo o elemento de âncora.
   *
   * @param {object} event - Evento de clique que aciona a exibição do menu.
   */
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Define o elemento de âncora para o menu
  };

  /**
   * Fecha o menu de opções do avatar.
   */
  const handleCloseMenu = () => {
    setAnchorEl(null); // Remove o elemento de âncora, fechando o menu
  };

  /**
   * Lida com o clique nas opções do menu de avatar, redirecionando o usuário conforme necessário.
   *
   * @param {string} option - Opção selecionada no menu ("perfil", "config", "sair", "inicio").
   */
  const handleMenuClick = (option) => {
    // Verifica a opção selecionada e realiza a ação correspondente
    if (option === "perfil") {
      navigate(`/SS/user/${userUUID}/profile`);
    } else if (option === "config") {
      logger.debug("Redirecionar para a página de configurações "); // Log de debug
    } else if (option === "sair") {
      handleSignOutClick(); // Realiza logout
    } else if (option === "inicio") {
      navigate("/SS/"); // Redireciona para a página inicial
    }
    handleCloseMenu(); // Fecha o menu
  };

  /**
   * useEffect que verifica o localStorage para carregar dados de perfil do usuário.
   * Executado apenas na primeira renderização do componente.
   */
  React.useEffect(() => {
    // Recupera dados do perfil do usuário no localStorage
    const userProfile = localStorage.getItem("userProfile");

    if (userProfile) {
      // Se existir, faz o parse dos dados e atualiza o estado
      const profile = JSON.parse(userProfile);
      setUserName(profile.name);
      setUserPicture(profile.picture);
      setUserUUID(profile.id);
      setIsUserLoggedIn(true); // Marca o usuário como logado
    }
  }, []);

  // Renderização do componente
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
        <StyledToolbar variant="dense" disableGutters={true}>
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
                    {<PersonOutlineOutlinedIcon />}Perfil
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("config")}>
                    {<SettingsOutlinedIcon />}Configurações
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("sair")}>
                    {<LogoutOutlinedIcon />}Sair
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
                <Divider sx={{ my: 1 }} />
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
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      sx={{ gap: "8px", mt: 2 }}
                      onClick={() => {
                        handleMenuClick("perfil");
                        setOpen(false); // Fechar o Drawer
                      }}
                    >
                      {<Avatar alt={userName} src={userPicture} />}
                      {userName}
                    </MenuItem>
                    <MenuItem>{<SettingsOutlinedIcon />}Configurações</MenuItem>
                    <MenuItem
                      onClick={() => {
                        setOpen(false); // Fechar o Drawer
                        handleSignOutClick();
                      }}
                    >
                      {<LogoutOutlinedIcon />}Sair
                    </MenuItem>
                  </>
                )}
                {!isUserLoggedIn && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem sx={{ mt: 2 }}>
                      <Button
                        color="primary"
                        variant="outlined"
                        fullWidth={true}
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
                        fullWidth={true}
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
