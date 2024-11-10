import * as React from "react";
import logo from "../../Assets/Logo/TSLogoIcon.svg";
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
import { GoogleIcon } from "../../Assets/Icons/CustomIcons";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import logger from "../../Extras/Debug/debug";

/**
 * Função para validar se o input é um nome de usuário (aceita espaços) ou e-mail válido.
 * @param {string} input - O valor a ser validado.
 * @returns {boolean} - Retorna true se o input for válido, caso contrário false.
 */
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Valida um nome de usuário verificando se ele atende aos critérios especificados.
 *
 * @param {string} username - O nome de usuário a ser validado.
 * @returns {boolean} Retorna true se o nome de usuário for válido, caso contrário, false.
 * O nome de usuário deve ter pelo menos 3 caracteres e pode conter letras, números,
 * pontos, sublinhados, espaços e hífens.
 */
const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9._ -]{3,}$/;
  return usernameRegex.test(username);
};

/**
 * Valida a entrada fornecida como e-mail ou nome de usuário.
 *
 * Esta função verifica se a entrada corresponde aos critérios de um e-mail
 * ou nome de usuário válido, utilizando as funções `validateEmail` e `validateUsername`.
 *
 * @param {string} input - A string de entrada a ser validada.
 * @returns {boolean} - Retorna true se a entrada for um e-mail ou nome de usuário válido, caso contrário, retorna false.
 */
const validateEmailOrUsername = (input) => {
  return validateEmail(input) || validateUsername(input);
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

  // Função para lidar com a resposta e processamento dos dados solicitados
  const fetchAndProcessData = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };

  /**
   * Função de callback para lidar com a resposta de credenciais do Google.
   * @param {Object} response - Resposta do login do Google.
   */
  const handleCredentialResponse = React.useCallback(
    async (response) => {
      const token = response.credential; // Obtém o token de acesso

      logger.debug("TOKEN: ", token);

      try {
        const userData = jwtDecode(token); // Decodifica o token JWT para obter as informações do usuário
        const userId = crypto.randomUUID(); // Gera um UUID único para o usuário

        const companiesData = await fetchAndProcessData(
          "https://pub-2f68c1db324345bb8d0fd40f4f1887c8.r2.dev/Jsons/Companies.json",
        );
        const skillsData = await fetchAndProcessData(
          "https://pub-2f68c1db324345bb8d0fd40f4f1887c8.r2.dev/Jsons/Skills.json",
        );

        // Seleciona uma empresa e uma habilidade aleatoriamente
        const randomCompany =
          companiesData.companies[
            Math.floor(Math.random() * companiesData.companies.length)
          ];
        const randomSkill =
          skillsData.skills[
            Math.floor(Math.random() * skillsData.skills.length)
          ];

        // Cria um objeto de perfil do usuário (apenas informações "não-pessoais")
        const userProfile = {
          id: userId,
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          dob: userData.birthday || "27/07/1997",
          location: "Extrema - MG",
          company: randomCompany,
          skill: randomSkill,
        };

        // Salva o perfil do usuário no armazenamento local (apenas para testes, nenhuma informação é enviada a servidores)
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        navigate("/dashboard"); // Redireciona para a página principal
      } catch (error) {
        console.error("SignIn - Erro:", error);
      }
    },
    [navigate],
  );

  /**
   * Função para iniciar o login via Google.
   */
  const handleGoogleLogin = React.useCallback(() => {
    logger.debug("login via google");
    if (google && google.accounts) {
      google.accounts.id.prompt(); // Verifica se google.accounts está disponível
    } else {
      console.error("google.accounts não está disponível");
    }
  }, []);

  /**
   * Função que valida as credenciais inseridas pelo usuário.
   */
  const handleLogin = React.useCallback(() => {
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
      const handleLoginResponse = async () => {
        const userId = crypto.randomUUID(); // Gera um UUID único para o usuário

        const handleFetchError = (error) => {
          console.error("Error fetching data:", error);
          // Adiciona uma mensagem de erro ao usuário
        }; // Função para lidar com erros de fetch

        try {
          const companiesData = await fetchAndProcessData(
            "https://pub-2f68c1db324345bb8d0fd40f4f1887c8.r2.dev/Jsons/Companies.json",
          );
          const skillsData = await fetchAndProcessData(
            "https://pub-2f68c1db324345bb8d0fd40f4f1887c8.r2.dev/Jsons/Skills.json",
          );

          // Seleciona uma empresa e uma habilidade aleatoriamente
          const randomCompany =
            companiesData.companies[
              Math.floor(Math.random() * companiesData.companies.length)
            ];
          const randomSkill =
            skillsData.skills[
              Math.floor(Math.random() * skillsData.skills.length)
            ];

          // Cria um objeto de perfil do usuário
          const userProfile = {
            id: userId,
            name: emailOrUsername,
            email: `${emailOrUsername}@mail.com`,
            dob: "27/07/1997",
            location: "Extrema - MG",
            company: randomCompany,
            skill: randomSkill,
          };

          // Salva o perfil do usuário no armazenamento local (apenas para testes)
          localStorage.setItem("userProfile", JSON.stringify(userProfile));

          navigate("/dashboard"); // Redireciona para a página principal
        } catch (error) {
          handleFetchError(error);
        }
      };
      handleLoginResponse();
    }
  }, [emailOrUsername, password, navigate]);

  /**
   * Função para lidar com a ação de recuperação de senha.
   */
  const handleForgotPassword = () => {
    /* Redirecionar para recuperação de senha (função não implementada) */
    logger.debug(
      "Redirecionar para recuperação de senha (função não implementada)",
    );
  };

  // Efeito para preparar a página de login
  React.useEffect(() => {
    const signedUser = localStorage.getItem("userProfile");
    if (signedUser) {
      return navigate("/dashboard");
    }

    // Muda a cor do body para preto
    const backgroundStyle =
      "radial-gradient(circle, #f0f8fb, #f6fbff, #ffffff)";
    document.body.style.background = backgroundStyle;

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
      document.body.style.background = ""; // Restaura a cor original
      if (window.google && google.accounts) {
        google.accounts.id.cancel();
      }
    };
  }, [handleCredentialResponse, navigate]); // O efeito é executado apenas uma vez na montagem

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
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          position: "relative",
          borderRadius: 2,
        }}
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
            TOPSKILL
          </Typography>
        </Box>

        {/* Seção de Login */}
        <Box mt={5} mb={3}>
          <Typography variant="h4" align="left" fontWeight={550}>
            Entrar
          </Typography>
        </Box>

        <Box mb={1} component={"form"}>
          {/* Campo de Nome de Usuário ou Email */}
          <Box>
            <FormControl fullWidth={true} sx={{ textAlign: "left" }}>
              <FormLabel htmlFor="username">Usuário</FormLabel>
              <TextField
                fullWidth={true}
                variant="outlined"
                placeholder="John Doe"
                autoComplete="username"
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                error={!!emailOrUsernameError}
                helperText={emailOrUsernameError}
                slotProps={{
                  input: {
                    sx: {
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
                      backgroundColor: "#a3a4aa",
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                slotProps={{
                  input: {
                    sx: {
                      borderRadius: "8px",
                    },
                  },
                }}
              />
            </FormControl>
          </Box>
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
                inputProps={{ "aria-label": "Checkbox demo" }}
              />
            }
            label="Lembre-me"
          />
        </Box>
        {/* Botão Entrar */}
        <Box mb={2}>
          <Button fullWidth={true} variant="contained" onClick={handleLogin}>
            Entrar
          </Button>
          <Typography sx={{ textAlign: "center" }} mt={2}>
            Não possui uma conta?{" "}
            <Link
              component="button"
              type="button"
              onClick={() => {
                navigate("/signup");
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
                  backgroundColor: "#a3a4aa",
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
          >
            Entrar com Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
