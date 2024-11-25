import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Skeleton,
  Avatar,
} from "@mui/material";
import {
  CakeOutlined as CakeOutlinedIcon,
  RoomOutlined as RoomOutlinedIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import logger from "../../Extras/Debug/debug";

/**
 * Componente Profile que exibe as informações do perfil do usuário.
 * O componente busca dados do usuário a partir do localStorage e de uma API externa.
 */
export default function Profile() {
  // Estados para gerenciar o carregamento e os dados do usuário
  const profileData = localStorage.getItem("userProfile");
  const [loading, setLoading] = React.useState(true);
  const [ready, setReady] = React.useState(false); // Condição que indica a possibilidade de buscar os dados
  const [userName, setUserName] = React.useState(""); // Nome do usuário
  const [userPicture, setUserPicture] = React.useState(""); // URL da imagem do usuário
  const [userDOB, setUserDOB] = React.useState(""); // Data de nascimento do usuário
  const [userLocation, setUserLocation] = React.useState(""); // Localização do usuário
  const [userCompanny, setUserCompany] = React.useState("");
  const [userSkill, setUserSkill] = React.useState("");
  const [signedUserUUID, setSignedUserUUID] = React.useState(""); // UUID do usuário conectado
  const { uuid } = useParams(); // Obtém o UUID do usuário da URL
  const navigate = useNavigate(); // Hook para navegação programática

  const formatDate = (isoString) => {
    const sliceValue = -2;
    const date = new Date(isoString);
    const day = `0${date.getDate()}`.slice(sliceValue);
    const month = `0${date.getMonth() + 1}`.slice(sliceValue);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para lidar com a resposta e processamento dos dados solicitados
  const fetchAndProcessData = async (url) => {
    const response = await fetch(url);
    // eslint-disable-next-line curly, prettier/prettier
    if (!response.ok) throw new Error(`Contracts --> ArticlesRender - HTTP error! status: ${response.status}`);
    return await response.json();
  };

  React.useEffect(() => {
    if (profileData) {
      const profile = JSON.parse(profileData); // Converte a string do localStorage em um objeto
      setSignedUserUUID(profile.id); // Armazena o UUID do usuário conectado
    }
    setReady(true); // Libera a busca dos dados
  }, [setReady, profileData]);

  // Lógica principal de navegação e busca de dados do usuário
  React.useEffect(() => {
    // Não faz nada se ainda não estiver pronto
    if (!ready) {
      return;
    }

    logger.debug("Carregando o componente 'Profile'...");

    // Verifica se o UUID do usuário na URL corresponde ao UUID do usuário conectado
    if (uuid === signedUserUUID) {
      if (profileData) {
        const profile = JSON.parse(profileData); // Constante para guardar o "profileData" como um json
        setUserName(profile.name); // Define o nome do usuário
        setUserPicture(profile.picture); // Define a imagem do usuário
        setUserDOB(profile.dob); // Define a data de nascimento do usuário
        setUserLocation(profile.location); // Define a localização do usuário
        setUserCompany(profile.company); // Define a empresa do usuário
        setUserSkill(profile.skill); // Define a abilidade do usuário
        setLoading(false); // Atualiza o estado de carregamento
      }
    } else {
      const fetchUserData = async () => {
        try {
          const data = fetchAndProcessData(
            "https://r2.storage.zyvoxi.com/Jsons/users.json",
          ); // Busca os dados do usuário a partir da API externa

          // Encontra o usuário correspondente ao UUID na lista de usuários
          const user = await data.results.find(
            (user) => user.login.uuid === uuid,
          );

          if (user) {
            // Se o usuário for encontrado, atualiza o estado com os dados do usuário
            setUserName(`${user.name.first} ${user.name.last}`); // Define o nome do usuário
            setUserPicture(user.picture.large); // Define a imagem do usuário
            setUserDOB(formatDate(user.dob.date)); // Formata a data de nascimento e Define a data de nascimento do usuário
            setUserLocation(`${user.location.city} - ${user.location.state}`); // Define a localização do usuário
            setUserCompany(user.company); // Define a empresa do usuário
            setUserSkill(user.skill); // Define a abilidade do usuário
            setLoading(false); // Atualiza o estado de carregamento
          } else if (!signedUserUUID) {
            // Se o UUID do usuário conectado não estiver disponível, redireciona para a página de login
            logger.debug(
              // eslint-disable-next-line prettier/prettier
              "Profile - Nenhum usuário encontrado & Nenhum usuário \"Logado\".\nProfile - Redirecionando para a página de Login. ",
            );
            navigate("/signin"); // Redireciona para a página de login
          } else {
            // Se o usuário não for encontrado e existir um usuário conectado, redireciona para o perfil do usuário conectado
            logger.debug(
              "Profile - Nenhum usuário encontrado, redirecionando para o perfil: ",
              signedUserUUID,
            );
            navigate(`/topskill/users/${signedUserUUID}`); // Redireciona para o perfil do usuário conectado
          }
        } catch (error) {
          // Caso ocorra um erro, loga o erro no console
          console.error(error);
        }
      };
      fetchUserData(); // Chama a função para buscar os dados do usuário
    }
    logger.debug("Componente 'Profile' carregado.");
  }, [uuid, signedUserUUID, navigate, ready, profileData]); // Dependências que disparam o efeito

  // Renderiza o componente Profile
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: "100px",
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
          justifySelf: "center",
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
                  <Typography variant="h4" fontWeight={600} align="center">
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
                  {userCompanny !== "none" && (
                    <Typography
                      variant="h6"
                      mt={2}
                      align="left"
                      alignItems={"center"}
                      display={"flex"}
                      gap={1}
                    >
                      {<BusinessIcon />} {userCompanny}
                    </Typography>
                  )}
                  <Divider
                    sx={{
                      mt: "28px",
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
                  <Typography variant="h6" align="left">
                    {userSkill}
                  </Typography>
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
