import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Skeleton,
  Avatar,
} from "@mui/material";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import "./Profile.css";
import winston from "winston";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Componente Profile que exibe as informações do perfil do usuário.
 * O componente busca dados do usuário a partir do localStorage e de uma API externa.
 */
export default function Profile() {
  // Estados para gerenciar o carregamento e os dados do usuário
  const profileData = localStorage.getItem("GoogleUserProfile");
  const [loading, setLoading] = React.useState(true);
  const [ready, setReady] = React.useState(false); // Condição que indica a possibilidade de buscar os dados
  const [userName, setUserName] = React.useState(""); // Nome do usuário
  const [userPicture, setUserPicture] = React.useState(""); // URL da imagem do usuário
  const [userDOB, setUserDOB] = React.useState(""); // Data de nascimento do usuário
  const [userLocation, setUserLocation] = React.useState(""); // Localização do usuário
  const [signedUserUUID, setSignedUserUUID] = React.useState(""); // UUID do usuário conectado
  const { uuid } = useParams(); // Obtém o UUID do usuário da URL
  const navigate = useNavigate(); // Hook para navegação programática

  const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "warn" : "debug",
    transports: [new winston.transports.Console()],
  });

  const formatDate = (isoString) => {
    const sliceValue = -2;
    const date = new Date(isoString);
    const day = `0${date.getDate()}`.slice(sliceValue);
    const month = `0${date.getMonth() + 1}`.slice(sliceValue);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  React.useEffect(() => {
    if (profileData) {
      const profile = JSON.parse(profileData); // Converte a string do localStorage em um objeto
      setSignedUserUUID(profile.id); // Armazena o UUID do usuário conectado
    }
    setReady(true); // Libera a busca dos dados
  }, [setReady]);

  // Lógica principal de navegação e busca de dados do usuário
  React.useEffect(() => {
    // Não faz nada se ainda não estiver pronto
    if (!ready) {
      return;
    }

    // Verifica se o UUID do usuário na URL corresponde ao UUID do usuário conectado
    if (uuid === signedUserUUID) {
      if (profileData) {
        const profile = JSON.parse(profileData);
        setUserName(profile.name); // Define o nome do usuário
        setUserPicture(profile.picture); // Define a imagem do usuário
        setUserDOB(profile.dob); // Define a data de nascimento do usuário
        setUserLocation(profile.location); // Define a localização do usuário
        setLoading(false); // Atualiza o estado de carregamento
      }
    } else {
      // Função assíncrona para buscar dados do usuário de uma API externa
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            "https://raw.githubusercontent.com/Zyvoxi/SS/refs/heads/main/users.json",
          );
          const data = await response.json(); // Converte a resposta da API em JSON

          // Encontra o usuário correspondente ao UUID na lista de usuários
          const user = data.results.find((user) => user.login.uuid === uuid);

          if (user) {
            // Se o usuário for encontrado, atualiza o estado com os dados do usuário
            setUserName(`${user.name.first} ${user.name.last}`);
            setUserPicture(user.picture.large);
            setUserDOB(formatDate(user.dob.date));
            setUserLocation(`${user.location.city} - ${user.location.state}`);
            setLoading(false);
          } else if (!signedUserUUID) {
            // Se o UUID do usuário conectado não estiver disponível, redireciona para a página de login
            navigate("/SS/signin");
          } else {
            // Se o usuário não for encontrado, redireciona para o perfil do usuário conectado
            navigate(`/SS/user/${signedUserUUID}`);
          }
        } catch (error) {
          // Captura e exibe erros de busca de dados
          logger.error("Erro ao buscar dados:", error);
        }
      };

      if (uuid) {
        fetchUserData(); // Chama a função de busca de dados se o UUID estiver disponível
      }
    }
  }, [uuid, signedUserUUID, navigate, ready]); // Dependências que disparam o efeito

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: "100px",
          ml: "20px",
          mr: "20px",
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        }}
      >
        {!loading && (
          <>
            <Box
              maxWidth={true}
              padding={2}
              borderLeft="1px solid lightgray"
              borderRight="1px solid lightgray"
              borderRadius={3}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "row",
                },
              }}
            >
              <Box
                alignSelf="start"
                sx={{
                  width: "100%",
                  maxWidth: {
                    xs: "100vw",
                    sm: "100vw",
                    md: "296px",
                  },
                  display: {
                    sm: "flex",
                    md: "block",
                  },
                }}
              >
                <Box
                  display={{ xs: "flex", sm: "flex", md: "block" }}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Avatar
                    src={userPicture}
                    alt={userName}
                    sx={{
                      border: "2px solid gray",
                      height: {
                        xs: "156px", // Para telas menores que 600px
                        sm: "256px", // Para telas maiores que 600px
                        md: "296px", // Para telas maiores que 900px
                      },
                      width: {
                        xs: "156px", // Para telas menores que 600px
                        sm: "256px", // Para telas maiores que 600px
                        md: "296px", // Para telas maiores que 900px
                      },
                    }}
                  />
                  <Typography variant="h4" fontWeight={600}>
                    {userName}
                  </Typography>
                </Box>
                <Box
                  maxWidth={true}
                  paddingRight={{ sm: "0", md: "7px" }}
                  paddingLeft={{ sm: "16px", md: "0" }}
                  paddingBottom={{ xs: "16px", sm: "16px", md: "0" }}
                  borderRight={{ sm: "0", md: "1px solid lightgray" }}
                  borderRadius={3}
                >
                  <Typography
                    variant="h6"
                    mt={2}
                    align="left"
                    display={"flex"}
                    gap={1}
                  >
                    {<CakeOutlinedIcon />} {userDOB}
                  </Typography>
                  <Typography
                    variant="h6"
                    mt={2}
                    align="left"
                    alignItems={"center"}
                    display={"flex"}
                    gap={1}
                  >
                    {<RoomOutlinedIcon />} Brasil, {userLocation}
                  </Typography>
                  <Divider
                    sx={{
                      mt: "30px",
                      mb: "30px",
                      color: "gray",
                    }}
                  />
                  <Typography
                    variant="h6"
                    mt={2}
                    align="left"
                    textAlign={"justify"}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Debitis aliquid mollitia iusto fugit iure aliquam quidem
                    cumque, id magnam eveniet numquam cupiditate nobis deserunt
                    voluptas sunt ea ratione adipisci dolor.
                  </Typography>
                </Box>
              </Box>
              <Box
                width="100%"
                sx={{
                  paddingLeft: {
                    xs: "0px",
                    sm: "0px",
                    md: "16px",
                  },
                }}
              >
                <Box borderRadius={2} border="1px solid #ddddddef" padding={1}>
                  <Skeleton variant="h2" width="100%" />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                  <Skeleton
                    variant="h2"
                    width="100%"
                    sx={{
                      mt: 2,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
