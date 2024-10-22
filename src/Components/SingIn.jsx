/* global google */
import * as React from "react";
import logo from "./Images/Logo/logo-alt.svg";
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
import { GoogleIcon } from "./Images/Icons/CustomIcons";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./Style/SCSS.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrUsernameError, setEmailOrUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleCredentialResponse = (response) => {
    const token = response.credential;
    console.log("Token de acesso:", token);

    try {
      const userData = jwtDecode(token); // Decodifica o token JWT para obter as informações do usuário
      const userId = crypto.randomUUID(); // Gera um UUID único para o usuário

      const userProfile = {
        id: userId,
        name: userData.name,
        picture: userData.picture,
      };

      console.log("Nome do usuário:", userData.name);
      console.log("Foto do usuário:", userData.picture);
      console.log("UUID gerado:", userId);

      // Salva no armazenamento local (apenas para testes)
      localStorage.setItem("GoogleUserProfile", JSON.stringify(userProfile));

      navigate("/SS-Test");
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login via Google");
    if (google && google.accounts) {
      google.accounts.id.prompt(); // Verifica se google.accounts está disponível
    } else {
      console.error("Google Accounts não está disponível.");
    }
  };

  React.useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          google.accounts.id.initialize({
            client_id:
              "763143041695-60bjan0591o8rbm3juj9bk004cr9ng8e.apps.googleusercontent.com",
            callback: handleCredentialResponse,
          });
        }
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      if (window.google && google.accounts) {
        google.accounts.id.cancel();
      }
    };
  });

  React.useEffect(() => {
    // Verifica se o GoogleUserProfile está armazenado
    const userProfile = localStorage.getItem("GoogleUserProfile");

    if (userProfile) {
      // Se o perfil do usuário existir, redireciona para /SS-Test
      navigate("/SS-Test");
    }
  }, [navigate]); // Inclui 'navigate' como dependência

  // Criação do tema do botão
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
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
          },
        },
      },
    },
  });

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
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  });

  // Função para validar se o input é um nome de usuário (aceita espaços) ou e-mail válido
  const validateEmailOrUsername = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar e-mail
    const usernameRegex = /^[a-zA-Z0-9._ -]{3,}$/; // Regex para nome de usuário (mínimo 3 caracteres, aceita espaços)

    // Retorna true se o input for um e-mail ou nome de usuário válido
    return emailRegex.test(input) || usernameRegex.test(input);
  };

  const handleLogin = () => {
    let isValid = true;

    // Validação do campo de nome de usuário ou e-mail
    if (!emailOrUsername) {
      setEmailOrUsernameError("O campo é obrigatório.");
      isValid = false;
    } else if (!validateEmailOrUsername(emailOrUsername)) {
      setEmailOrUsernameError(
        "Por favor, insira um nome de usuário ou e-mail válido."
      );
      isValid = false;
    } else {
      setEmailOrUsernameError("");
    }

    // Validação da senha
    if (!password) {
      setPasswordError("O campo de senha é obrigatório.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      console.log("Login bem-sucedido");
    }
  };

  const handleForgotPassword = () => {
    console.log("Redirecionar para recuperação de senha");
  };

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
            style={{ width: "30px", height: "30px", marginRight: "8px" }}
          />
          <Typography
            variant="h6"
            sx={{
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
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <FormLabel htmlFor="email">Usuário:</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="User1234"
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              error={!!emailOrUsernameError}
              helperText={emailOrUsernameError}
              InputProps={{
                sx: {
                  height: "40px",
                  borderRadius: "8px",
                },
              }}
            />
          </FormControl>
        </Box>

        {/* Campo de Senha */}
        <Box mb={2}>
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <FormLabel htmlFor="password">Senha:</FormLabel>
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
              fullWidth
              variant="outlined"
              placeholder="••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                sx: {
                  height: "40px",
                  borderRadius: "8px",
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
                disableRipple
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
            <Button fullWidth variant="contained" onClick={handleLogin}>
              Entrar
            </Button>
          </ThemeProvider>
          <Typography sx={{ textAlign: "center" }} mt={2}>
            Não possui uma conta?{" "}
            <Link
              component="button"
              type="button"
              onClick={handleForgotPassword}
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
            fullWidth
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

export default SignIn;
