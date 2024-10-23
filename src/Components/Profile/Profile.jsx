import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Skeleton,
  Avatar,
} from "@mui/material";
import "./Profile.css";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Componente Profile que exibe as informações do perfil do usuário.
 * O componente busca dados do usuário a partir do localStorage e de uma API externa.
 */
export default function Profile() {
  // Estados para gerenciar o carregamento e os dados do usuário
  const [loading, setLoading] = React.useState(true);
  const [ready, setReady] = React.useState(false); // Condição que indica a possibilidade de carregar os dados
  const [userName, setUserName] = React.useState(""); // Nome do usuário
  const [userPicture, setUserPicture] = React.useState(""); // URL da imagem do usuário
  const [signedUserUUID, setSignedUserUUID] = React.useState(""); // UUID do usuário conectado
  const { uuid } = useParams(); // Obtém o UUID do usuário da URL
  const navigate = useNavigate(); // Hook para navegação programática

  // Atualiza o userProfile do localStorage na montagem do componente
  React.useEffect(() => {
    const profileData = localStorage.getItem("GoogleUserProfile");
    if (profileData) {
      const profile = JSON.parse(profileData); // Converte a string do localStorage em um objeto
      setSignedUserUUID(profile.id); // Armazena o UUID do usuário conectado
    }
    setReady(true);
  }, [setReady]);

  // Lógica principal de navegação e busca de dados do usuário
  React.useEffect(() => {
    // Se ainda não estiver pronto -> return
    if (!ready) return;

    // Verifica se o UUID do usuário na URL corresponde ao UUID do usuário conectado
    if (uuid === signedUserUUID) {
      console.log("valid");
      const profileData = localStorage.getItem("GoogleUserProfile");
      if (profileData) {
        setUserName(profileData.name); // Define o nome do usuário
        setUserPicture(profileData.picture); // Define a imagem do usuário
        setLoading(false); // Atualiza o estado de carregamento
      }
    } else {
      // Função assíncrona para buscar dados do usuário de uma API externa
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            "https://raw.githubusercontent.com/Zyvoxi/SS/refs/heads/main/users.json"
          );
          const data = await response.json(); // Converte a resposta da API em JSON

          // Encontra o usuário correspondente ao UUID na lista de usuários
          const user = data.results.find((user) => user.login.uuid === uuid);

          if (user) {
            // Se o usuário for encontrado, atualiza o estado com os dados do usuário
            setUserName(`${user.name.first} ${user.name.last}`);
            setUserPicture(user.picture.large);
          } else if (!signedUserUUID) {
            // Se o UUID do usuário conectado não estiver disponível, redireciona para a página de login
            navigate("/SS/signin");
          } else {
            // Se o usuário não for encontrado, redireciona para o perfil do usuário conectado
            navigate(`/SS/user/${signedUserUUID}`);
          }
        } catch (error) {
          // Captura e exibe erros de busca de dados
          console.error("Erro ao buscar dados:", error);
        } finally {
          // Atualiza o estado de carregamento após a busca
          setLoading(false);
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
          mt: "120px",
          ml: "20px",
          mr: "20px",
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        }}
      >
        {!loading && (
          <>
            <Box
              maxWidth
              padding={2}
              borderLeft="1px solid lightgray"
              borderRight="1px solid lightgray"
              borderRadius={3}
              sx={{
                display: "flex",
                height: "120vh",
              }}
            >
              <Box maxWidth={296} alignSelf="start">
                <Avatar
                  src={userPicture}
                  alt={userName}
                  sx={{
                    height: "296px",
                    width: "296px",
                  }}
                />
                <Typography variant="h4" fontWeight={600}>
                  {userName}
                </Typography>
                <Typography variant="h6" mt={2} align="left">
                  Null: dd/mm/aa
                </Typography>
                <Typography variant="h6" mt={2} align="left">
                  Null: Some info
                </Typography>
                <Typography variant="h6" mt={2} align="left">
                  Null: Some info
                </Typography>
                <Divider
                  sx={{
                    mt: "30px",
                    mb: "30px",
                    color: "gray",
                  }}
                />
                <Typography variant="h6" mt={2} align="left">
                  Some more info
                </Typography>
                <Typography variant="h6" mt={2} align="left">
                  Some more info
                </Typography>
                <Typography variant="h6" mt={2} align="left">
                  Some more info
                </Typography>
                <Typography variant="h6" mt={2} align="left">
                  Some more info
                </Typography>
              </Box>
              <Box width="100%" pl={4}>
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
        {loading && (
          <>
            <Box
              maxWidth
              padding={2}
              borderLeft="1px solid lightgray"
              borderRight="1px solid lightgray"
              borderRadius={3}
              sx={{
                display: "flex",
                height: "120vh",
              }}
            >
              <Box maxWidth={296} alignSelf="start">
                <Skeleton variant="circular" width={296} height={296} />
                <Skeleton
                  variant="h2"
                  width={296}
                  sx={{
                    mt: "20px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width={296}
                  sx={{
                    mt: "20px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width={296}
                  sx={{
                    mt: "20px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width={296}
                  sx={{
                    mt: "20px",
                  }}
                />
                <Divider
                  sx={{
                    mt: "30px",
                    mb: "30px",
                    color: "gray",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width={296}
                  sx={{
                    mt: "0px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width={296}
                  sx={{
                    mt: "20px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width={296}
                  sx={{
                    mt: "20px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width={296}
                  sx={{
                    mt: "20px",
                    mb: "20px",
                  }}
                />
              </Box>
              <Box width="100%" pl={4}>
                <Skeleton
                  variant="h2"
                  width="100%"
                  sx={{
                    mt: "20px",
                    mb: "20px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width="100%"
                  sx={{
                    mt: "20px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width="100%"
                  sx={{
                    mt: "20px",
                  }}
                />
                <Skeleton
                  variant="h2"
                  width="100%"
                  sx={{
                    mt: "20px",
                  }}
                />
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
