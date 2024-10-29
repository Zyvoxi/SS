import * as React from "react";
import logo from "../../Assets/Logo/SSLogoIcon.svg";
import {
  Divider,
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Link,
  Paper,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { GoogleIcon } from "../../Assets/Icons/CustomIcons";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import companiesData from "../../Extras/Jsons/Companies.json";
import skillsData from "../../Extras/Jsons/Skills.json";
import logger from "../../Extras/Debug/debug";

// Estilização personalizada para o ícone do checkbox
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#f5f8fa",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
    ...theme.applyStyles("dark", {
      backgroundColor: "#30404d",
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
    ...theme.applyStyles("dark", {
      background: "rgba(57,75,89,.5)",
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
    backgroundColor: "#394b59",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
  }),
}));

// Estilização personalizada para o ícone do checkbox quando está selecionado
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: "''",
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

// Criação do tema do botão
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "500ms ease !important", // Força a transição para o hover
          backgroundImage: "linear-gradient(to bottom, #666, #000)",
          "&:hover": {
            background: "linear-gradient(to bottom, #666, #222)",
          },
          "&:focus": {
            outline: "none !important", // Remove contorno ao focar
          },
        },
      },
    },
  },
});

/**
 * Função para validar se o input é um nome de usuário (aceita espaços) ou e-mail válido.
 * @param {string} input - O valor a ser validado.
 * @returns {boolean} - Retorna true se o input for válido, caso contrário false.
 */
const validateEmailOrUsername = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9._ -]{3,}$/;
  return emailRegex.test(input) || usernameRegex.test(input);
};

/**
 * Componente SignIn que gerencia o processo de login do usuário.
 * O componente permite login via Google ou através de credenciais (nome de usuário/e-mail e senha).
 */
export default function SignIn() {
  // Estados para gerenciar as credenciais e erros de validação
  const [emailOrUsername, setEmailOrUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailOrUsernameError, setEmailOrUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const navigate = useNavigate(); // Hook para navegação programática

  React.useEffect(() => {
    // Muda a cor do body para preto
    document.body.style.background =
      "radial-gradient(circle, #f0f8fb, #f6fbff, #ffffff)";

    // Função de limpeza para restaurar a cor original
    return () => {
      document.body.style.background = ""; // Restaura a cor original
    };
  }, []);

  /**
   * Função de callback para lidar com a resposta de credenciais do Google.
   * @param {Object} response - Resposta do login do Google.
   */
  const handleCredentialResponse = (response) => {
    const token = response.credential; // Obtém o token de acesso

    logger.debug("TOKEN: ", token);

    try {
      const userData = jwtDecode(token); // Decodifica o token JWT para obter as informações do usuário
      const userId = crypto.randomUUID(); // Gera um UUID único para o usuário

      // Seleciona uma empresa e uma habilidade aleatoriamente
      const randomCompany =
        companiesData.companies[
          Math.floor(Math.random() * companiesData.companies.length)
        ];
      const randomSkill =
        skillsData.skills[Math.floor(Math.random() * skillsData.skills.length)];

      // Cria um objeto de perfil do usuário (apenas informações "não-pessoais")
      const userProfile = {
        id: userId,
        name: userData.name,
        picture: userData.picture,
        dob: userData.birthday || "27/07/1997",
        location: "Extrema - MG",
        company: randomCompany,
        skill: randomSkill,
      };

      // Salva o perfil do usuário no armazenamento local (apenas para testes, nenhuma informação é enviada a servidores)
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      navigate("/SS"); // Redireciona para a página principal
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  };

  /**
   * Função para iniciar o login via Google.
   */
  const handleGoogleLogin = () => {
    logger.debug("login via google");
    if (google && google.accounts) {
      google.accounts.id.prompt(); // Verifica se google.accounts está disponível
    } else {
      console.error("google.accounts não está disponível");
    }
  };

  // Efeito para carregar o script do Google Identity Services
  React.useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client"; // URL do script do Google
      script.async = true; // Carrega o script de forma assíncrona
      script.defer = true; // Atrasar a execução do script até que o documento seja analisado
      script.onload = () => {
        if (window.google) {
          google.accounts.id.initialize({
            client_id:
              "763143041695-60bjan0591o8rbm3juj9bk004cr9ng8e.apps.googleusercontent.com",
            callback: handleCredentialResponse, // Define a função de callback
          });
        }
      };
      document.body.appendChild(script); // Adiciona o script ao corpo do documento
    };

    loadGoogleScript(); // Carrega o script

    // Função de limpeza para cancelar a autenticação
    return () => {
      if (window.google && google.accounts) {
        google.accounts.id.cancel();
      }
    };
  }); // O efeito é executado apenas uma vez na montagem

  /**
   * Função que valida as credenciais inseridas pelo usuário.
   */
  const handleLogin = () => {
    const minPWLength = 6;
    let isValid = true;

    // Validação do campo de nome de usuário ou e-mail
    if (!emailOrUsername) {
      setEmailOrUsernameError("O campo é obrigatório.");
      isValid = false;
    } else if (!validateEmailOrUsername(emailOrUsername)) {
      setEmailOrUsernameError(
        "Por favor, insira um nome de usuário ou e-mail válido.",
      );
      isValid = false;
    } else {
      setEmailOrUsernameError("");
    }

    // Validação da senha
    if (!password) {
      setPasswordError("O campo de senha é obrigatório.");
      isValid = false;
    } else if (password.length < minPWLength) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      const userId = crypto.randomUUID(); // Gera um UUID único para o usuário

      // Seleciona uma empresa e uma habilidade aleatoriamente
      const randomCompany =
        companiesData.companies[
          Math.floor(Math.random() * companiesData.companies.length)
        ];
      const randomSkill =
        skillsData.skills[Math.floor(Math.random() * skillsData.skills.length)];

      // Cria um objeto de perfil do usuário
      const userProfile = {
        id: userId,
        name: emailOrUsername,
        dob: "27/07/1997",
        location: "Extrema - MG",
        company: randomCompany,
        skill: randomSkill,
      };

      // Salva o perfil do usuário no armazenamento local (apenas para testes)
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      navigate("/SS"); // Redireciona para a página principal
    }
  };

  /**
   * Função para lidar com a ação de recuperação de senha.
   */
  const handleForgotPassword = () => {
    /* Redirecionar para recuperação de senha (função não implementada) */
    logger.debug(
      "Redirecionar para recuperação de senha (função não implementada)",
    );
  };

  // Renderização do componente
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Paper
        elevation={15}
        sx={{ padding: 4, width: "100%", position: "relative" }}
      >
        {/* Logo e STOPSKILL lado a lado, no canto superior esquerdo */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="rotating-logo"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />
          <Typography
            variant="h6"
            sx={{
              background: "linear-gradient(90deg, #00c6ff, #0072ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              fontSize: "14px",
            }}
          >
            STOPSKILL
          </Typography>
        </Box>

        {/* Seção de Login */}
        <Box mt={5} mb={3}>
          <Typography variant="h4" align="left" fontWeight={550}>
            Entrar
          </Typography>
        </Box>

        {/* Campo de Nome de Usuário ou Email */}
        <Box mb={1}>
          <FormControl fullWidth={true} sx={{ textAlign: "left" }}>
            <FormLabel htmlFor="username">Usuário</FormLabel>
            <TextField
              fullWidth={true}
              variant="outlined"
              placeholder="John Doe"
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              error={!!emailOrUsernameError}
              helperText={emailOrUsernameError}
              slotProps={{
                input: {
                  sx: {
                    height: "40px",
                    borderRadius: "8px",
                  },
                },
              }}
            />
          </FormControl>
        </Box>

        {/* Campo de Senha */}
        <Box mb={2}>
          <FormControl fullWidth={true} sx={{ textAlign: "left" }}>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Link
                component="button"
                type="button"
                onClick={handleForgotPassword}
                variant="body2"
                underline="none"
                sx={{
                  alignSelf: "baseline",
                  color: "black",
                  position: "relative", // Necessário para o posicionamento do ::after
                  overflow: "hidden",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "0.1em",
                    backgroundColor: "#aaa",
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)",
                    transition: "ease-out 400ms",
                  },
                  "&:hover::after, &:focus::after": {
                    transform: "translate3d(-100%, 0, 0)",
                  },
                }}
              >
                Esqueceu a Senha?
              </Link>
            </Box>
            <TextField
              fullWidth={true}
              variant="outlined"
              placeholder="••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              slotProps={{
                input: {
                  sx: {
                    height: "40px",
                    borderRadius: "8px",
                  },
                },
              }}
            />
          </FormControl>
        </Box>
        <Box
          mb={2}
          sx={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                sx={{ "&:hover": { bgcolor: "transparent" } }}
                disableRipple={true}
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                inputProps={{ "aria-label": "Checkbox demo" }}
              />
            }
            label="Lembre-me"
          />
        </Box>
        {/* Botão Entrar */}
        <Box mb={2}>
          <ThemeProvider theme={theme}>
            <Button fullWidth={true} variant="contained" onClick={handleLogin}>
              Entrar
            </Button>
          </ThemeProvider>
          <Typography sx={{ textAlign: "center" }} mt={2}>
            Não possui uma conta?{" "}
            <Link
              component="button"
              type="button"
              onClick={() => {
                navigate("/SS/signup");
              }}
              underline="none"
              sx={{
                color: "black",
                fontSize: "inherit", // Herda o tamanho de fonte
                lineHeight: "inherit", // Herda a altura da linha
                position: "relative", // Necessário para o posicionamento do ::after
                overflow: "hidden",
                "&::after": {
                  content: "''",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "0.1em",
                  backgroundColor: "#aaa",
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                  transition: "ease-out 400ms",
                },
                "&:hover::after, &:focus::after": {
                  transform: "translate3d(-100%, 0, 0)",
                },
              }}
            >
              Registre-se
            </Link>
          </Typography>
        </Box>

        {/* Divisor "ou" */}
        <Box mb={2} width="100%">
          <Divider>ou</Divider>
        </Box>

        {/* Botão de login via Google */}
        <Box width="100%">
          <Button
            fullWidth={true}
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
              color: "black",
              backgroundColor: "transparent",
              borderColor: "black",
              "&:hover": {
                borderColor: "#666",
              },
            }}
          >
            Entrar com Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
