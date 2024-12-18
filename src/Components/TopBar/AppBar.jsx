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
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import logo from "../../Assets/Logo/TSLogoIcon.svg";
import { useNavigate } from "react-router-dom";
import logger from "../../Extras/Debug/debug";
import PropTypes from "prop-types";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: "10px",
  backdropFilter: "blur(24px)", // Cria efeito de desfoque para um fundo translúcido
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4), // Define uma cor de fundo levemente translúcida
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

  // Calcula um hash numérico da string
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  // Gera cor hexadecimal a partir dos bits do hash
  for (let i = 0; i < 3; i += 1) {
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
export default function AppAppBar({
  scrollToSection,
  overviewRef,
  featuresRef,
  testimonialsRef,
  highlightsRef,
  pricingRef,
  faqRef,
}) {
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
    /* eslint-disable indent */
    switch (option) {
      case "perfil":
        logger.debug("AppBar - Redirecionando para o perfil: ", userUUID);
        navigate(`/topskill/users/${userUUID}/profile`); // Redireciona para o perfil do usuário conectado
        break;

      case "config":
        logger.debug(
          "AppBar - Redirecionar para a página: Configurações (não implementado)",
        );
        break;

      case "sair":
        logger.debug("AppBar - Logout do usuário: ", userUUID);
        setIsUserLoggedIn(false); // Marca o usuário como deslogado
        localStorage.removeItem("userProfile"); // Remove dados do perfil do localStorage
        navigate("/topskill/signin"); // Redireciona para a página de login
        break;

      case "inicio":
        logger.debug("AppBar - Redirecionando para a página: Dashboard.");
        navigate("/topskill/dashboard"); // Redireciona para a página inicial
        break;

      case "overview":
        logger.debug("AppBar - Redirecionando para a página: Overview.");
        navigate("/topskill/overview"); // Redireciona para a página overview
        break;

      case "contratos":
        logger.debug("AppBar - Redirecionando para a página: Contratos.");
        navigate("/topskill/contracts"); // Redireciona para a página de contratos
        break;

      case "blog":
        logger.debug("AppBar - Redirecionando para a página: Blog.");
        navigate("/topskill/blog"); // Redireciona para a página do Blog
        break;

      case "entrar":
        logger.debug("AppBar - Redirecionando para a página: Login.");
        navigate("/topskill/signin"); // Redireciona para a página de login
        break;

      case "registrar-se":
        logger.debug("AppBar - Redirecionando para a página: Registro");
        navigate("/topskill/signup"); // Redireciona para a página de registro
        break;

      case "faq":
        logger.debug(
          "AppBar - Redirecionar para a página: FAQ (não implementado)",
        );
        break;

      default:
        break;
    }
    /* eslint-enable indent */
    handleCloseMenu(); // Fecha o menu
  };

  /**
   * useEffect que verifica o localStorage para carregar dados de perfil do usuário.
   * Executado apenas na primeira renderização do componente.
   */
  React.useEffect(() => {
    logger.debug("Carregando o componente 'AppBar'.");

    // Recupera dados do perfil do usuário no localStorage
    const userProfile = localStorage.getItem("userProfile");

    if (userProfile) {
      // Se existir, faz o parse dos dados e atualiza o estado
      const profile = JSON.parse(userProfile);
      setUserName(profile.name); // Define o nome do usuário
      setUserPicture(profile.picture); // Define a foto do usuário
      setUserUUID(profile.id); // Define o UUID do usuário
      setIsUserLoggedIn(true); // Marca o usuário como logado
      logger.debug("AppBar - Conectado como: ", profile.name);
    }

    logger.debug("Componente 'AppBar' carregado.");
  }, []);

  // Renderização do componente AppBar
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
        paddingLeft: "24px",
        paddingRight: "24px",
        zIndex: 500,
      }}
    >
      <Container maxWidth="lg" sx={{ padding: "0 !important" }}>
        <StyledToolbar variant="dense" disableGutters={true}>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <img
              src={logo}
              alt="logo"
              className="rotating-logo"
              style={{ width: "30px", height: "30px", marginRight: "0px" }}
            />
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              fontWeight={700}
              mr={5}
              sx={{
                background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: ".2rem",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              TOPSKILL
            </Typography>
            <Box sx={{ display: { xs: "none", lg: "flex" } }}>
              {isUserLoggedIn ? (
                <>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      handleMenuClick("inicio");
                    }}
                    sx={{ fontWeight: "600" }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      handleMenuClick("contratos");
                    }}
                    sx={{ fontWeight: "600" }}
                  >
                    Contratos
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      handleMenuClick("overview");
                      setTimeout(() => {
                        scrollToSection(overviewRef);
                      }, 200);
                    }}
                    sx={{ fontWeight: "600" }}
                  >
                    Overview
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ fontWeight: "600" }}
                    onClick={() => {
                      handleMenuClick("overview");
                      setTimeout(() => {
                        scrollToSection(featuresRef);
                      }, 200);
                    }}
                  >
                    Recursos
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ fontWeight: "600" }}
                    onClick={() => {
                      handleMenuClick("overview");
                      setTimeout(() => {
                        scrollToSection(testimonialsRef);
                      }, 200);
                    }}
                  >
                    Depoimentos
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ fontWeight: "600" }}
                    onClick={() => {
                      handleMenuClick("overview");
                      setTimeout(() => {
                        scrollToSection(highlightsRef);
                      }, 200);
                    }}
                  >
                    Destaques
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ fontWeight: "600" }}
                    onClick={() => {
                      handleMenuClick("overview");
                      setTimeout(() => {
                        scrollToSection(pricingRef);
                      }, 200);
                    }}
                  >
                    Preços
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ fontWeight: "600" }}
                    onClick={() => {
                      handleMenuClick("overview");
                      setTimeout(() => {
                        scrollToSection(faqRef);
                      }, 200);
                    }}
                  >
                    FAQ
                  </Button>
                </>
              )}
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  handleMenuClick("blog");
                }}
                sx={{ fontWeight: "600" }}
              >
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
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
                  slotProps={{
                    paper: {
                      sx: {
                        backdropFilter: "blur(24px)",
                        borderRadius: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        boxShadow:
                          "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
                      },
                    },
                  }}
                  sx={{
                    mt: 1.5,
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
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
                  onClick={() => {
                    handleMenuClick("entrar");
                  }}
                  sx={{ fontWeight: "600" }}
                >
                  Entrar
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    handleMenuClick("registrar-se");
                  }}
                >
                  Registrar-se
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { sm: "flex", lg: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 1 }} />
                {isUserLoggedIn ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick("inicio");
                        setOpen(false);
                      }}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick("contratos");
                        setOpen(false);
                      }}
                    >
                      Contratos
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick("overview");
                        setTimeout(() => {
                          scrollToSection(overviewRef);
                        }, 200);
                        setOpen(false);
                      }}
                    >
                      Overview
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick("overview");
                        setTimeout(() => {
                          scrollToSection(featuresRef);
                        }, 200);
                        setOpen(false);
                      }}
                    >
                      Recursos
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick("overview");
                        setTimeout(() => {
                          scrollToSection(testimonialsRef);
                        }, 200);
                        setOpen(false);
                      }}
                    >
                      Depoimentos
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick("overview");
                        setTimeout(() => {
                          scrollToSection(highlightsRef);
                        }, 200);
                        setOpen(false);
                      }}
                    >
                      Destaques
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick("overview");
                        setTimeout(() => {
                          scrollToSection(pricingRef);
                        }, 200);
                        setOpen(false);
                      }}
                    >
                      Preços
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick("overview");
                        setTimeout(() => {
                          scrollToSection(faqRef);
                        }, 200);
                        setOpen(false);
                      }}
                    >
                      FAQ
                    </MenuItem>
                  </>
                )}
                <MenuItem
                  onClick={() => {
                    handleMenuClick("blog");
                    setOpen(false);
                  }}
                >
                  Blog
                </MenuItem>
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
                    <MenuItem
                      sx={{ gap: "5px" }}
                      onClick={() => {
                        handleMenuClick("config");
                      }}
                    >
                      {<SettingsOutlinedIcon />}Configurações
                    </MenuItem>
                    <MenuItem
                      sx={{ gap: "5px" }}
                      onClick={() => {
                        setOpen(false); // Fechar o Drawer
                        handleMenuClick("sair");
                      }}
                    >
                      {<LogoutOutlinedIcon />}Sair
                    </MenuItem>
                  </>
                )}
                {!isUserLoggedIn && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      sx={{
                        mt: 2,
                        "&:hover": {
                          backgroundColor: "#00000000 !important",
                        },
                      }}
                    >
                      <Button
                        color="primary"
                        variant="outlined"
                        fullWidth={true}
                        onClick={() => {
                          handleMenuClick("entrar");
                        }}
                      >
                        Entrar
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        variant="contained"
                        fullWidth={true}
                        onClick={() => {
                          handleMenuClick("registrar-se");
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

AppAppBar.propTypes = {
  scrollToSection: PropTypes.func,
  overviewRef: PropTypes.object,
  featuresRef: PropTypes.object,
  testimonialsRef: PropTypes.object,
  highlightsRef: PropTypes.object,
  pricingRef: PropTypes.object,
  faqRef: PropTypes.object,
};
