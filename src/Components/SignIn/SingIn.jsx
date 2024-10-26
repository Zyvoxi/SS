import * as React from "react";
import logo from "../Images/Logo/logo-alt.svg";
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
import { GoogleIcon } from "../Images/Icons/CustomIcons";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

// Listas de empresas e habilidades para seleção aleatória no perfil do usuário
const companies = [
  "none",
  "Tech Solutions Inc.",
  "Innovatech Ltda.",
  "Global FinTech",
  "Eco Solutions",
  "Bright Future Corp.",
  "HealthTech Innovators",
  "Green Energy Partners",
  "Skyline Technologies",
  "QuickDelivery Services",
  "EduPrime Learning",
  "NextGen Robotics",
  "Quantum Computing Co.",
  "Virtual Reality Innovations",
  "Sustainable Resources Corp.",
  "Smart Home Solutions",
  "Cybersecurity Experts",
  "AI Development Labs",
  "Digital Marketing Agency",
  "E-Commerce Hub",
  "Data Analytics Inc.",
  "none",
];
const skills = [
  "Desenvolvimento Frontend - React, Vue.js, Angular, HTML, CSS, JavaScript, TypeScript",
  "Desenvolvimento Backend - Node.js, Express, Django, Ruby on Rails, PHP, Go, Java, Python",
  "Desenvolvimento Full-Stack - Integração frontend e backend, arquitetura MVC, RESTful APIs",
  "Desenvolvimento Mobile - Flutter, React Native, Kotlin, Swift",
  "Desenvolvimento de Jogos - Unity, Unreal Engine, C#, Godot",
  "Machine Learning e Inteligência Artificial - Python, TensorFlow, Keras, PyTorch, OpenCV",
  "Data Science e Análise de Dados - Pandas, NumPy, SQL, R, Data Mining, BI Tools (Tableau, Power BI)",
  "Desenvolvimento de APIs - RESTful, GraphQL, documentação com Swagger, Postman",
  "Testes e Qualidade de Software - Selenium, JUnit, Cypress, TDD, BDD",
  "DevOps e Infraestrutura - Docker, Kubernetes, AWS, Azure, CI/CD, Terraform",
  "Blockchain e Criptografia - Solidity, contratos inteligentes, criptomoedas, segurança de redes",
  "Engenharia de Software - Arquitetura de software, design patterns, engenharia de requisitos",
  "Desenvolvimento de Scripts e Automação - Bash, PowerShell, automação de tarefas",
  "Design de Interface (UI) - Figma, Adobe XD, Sketch, design responsivo, design para mobile",
  "Experiência do Usuário (UX) - Pesquisa de usuários, prototipagem, testes de usabilidade, user journey",
  "Design Gráfico - Adobe Photoshop, Illustrator, InDesign, branding, tipografia",
  "Design de Animação - After Effects, Blender, animações para web, motion graphics",
  "Design de Produtos Digitais - Prototipagem, wireframes, design thinking, storytelling",
  "Design de Interação - Transições, feedback do usuário, microinterações",
  "Marketing Digital - SEO, SEM, Google Ads, estratégias de conteúdo",
  "Gestão de Redes Sociais - Instagram, Twitter, LinkedIn, estratégia de postagens",
  "Copywriting e Redação Publicitária - Escrita persuasiva, call to action, storytelling",
  "E-mail Marketing - Campanhas de e-mail, automação de e-mails, Mailchimp, ActiveCampaign",
  "Gestão de Projetos - Metodologias ágeis (Scrum, Kanban), Jira, Trello, MS Project",
  "Análise de Métricas e KPIs - Google Analytics, relatórios de conversão, análise de público",
  "Publicidade Paga - PPC, campanhas de anúncios, Facebook Ads, LinkedIn Ads",
  "Desenvolvimento de Marca - Posicionamento, criação de identidade, design de logotipo",
  "Growth Hacking - Estratégias de crescimento rápido, experimentação, otimização de conversão",
  "Cibersegurança - Ethical hacking, pentesting, auditoria de segurança, criptografia",
  "Big Data - Hadoop, Spark, processamento de dados em larga escala, NoSQL",
  "Engenharia de Dados - ETL, bancos de dados relacionais e não relacionais, pipelines de dados",
  "Arquitetura de Cloud Computing - AWS, Azure, GCP, cloud-native, multicloud",
  "Internet das Coisas (IoT) - MQTT, sensores, comunicação máquina-a-máquina",
  "Banco de Dados - SQL, NoSQL, MongoDB, PostgreSQL, otimização de consultas",
  "Realidade Aumentada (AR) e Realidade Virtual (VR) - Desenvolvimento AR/VR, Unity, 3D Modeling",
  "Automação de Processos Robóticos (RPA) - UiPath, Blue Prism, automação de tarefas manuais",
];

// Configuração do logger para debug ou produção
// const logger = console.log()

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
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrUsernameError, setEmailOrUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate(); // Hook para navegação programática

  /**
   * Função de callback para lidar com a resposta de credenciais do Google.
   * @param {Object} response - Resposta do login do Google.
   */
  const handleCredentialResponse = (response) => {
    const token = response.credential; // Obtém o token de acesso

    console.debug("TOKEN: ", token);

    try {
      const userData = jwtDecode(token); // Decodifica o token JWT para obter as informações do usuário
      const userId = crypto.randomUUID(); // Gera um UUID único para o usuário

      // Seleciona uma empresa e uma habilidade aleatoriamente
      const randomCompany =
        companies[Math.floor(Math.random() * companies.length)];
      const randomSkill = skills[Math.floor(Math.random() * skills.length)];

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
    console.debug("login via google");
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
        companies[Math.floor(Math.random() * companies.length)];
      const randomSkill = skills[Math.floor(Math.random() * skills.length)];

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
    // logger.debug(
    // "Redirecionar para recuperação de senha (função não implementada)",
    // );
  };

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
            backgroundColor: "#333 !important", // Cor padrão
            backgroundImage: "linear-gradient(to bottom, #333, #000)",
            "&:hover": {
              background: "linear-gradient(to bottom, #333, #333)",
            },
            "&:focus": {
              outline: "none !important", // Remove contorno ao focar
            },
          },
        },
      },
    },
  });

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
          <FormControl fullWidth={true} sx={{ textAlign: "left" }}>
            <FormLabel htmlFor="email">Usuário:</FormLabel>
            <TextField
              fullWidth={true}
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
          <FormControl fullWidth={true} sx={{ textAlign: "left" }}>
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
              fullWidth={true}
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
