import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
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
  const [userName, setUserName] = React.useState(""); // Nome do usuário
  const [userPicture, setUserPicture] = React.useState(""); // URL da imagem do usuário
  const [signedUserUUID, setSignedUserUUID] = React.useState(""); // UUID do usuário conectado
  const [userProfile, setUserProfile] = React.useState(null); // Dados do perfil do usuário
  const { uuid } = useParams(); // Obtém o UUID do usuário da URL
  const navigate = useNavigate(); // Hook para navegação programática

  // Atualiza o userProfile do localStorage na montagem do componente
  React.useEffect(() => {
    const profileData = localStorage.getItem("GoogleUserProfile");
    if (profileData) {
      const profile = JSON.parse(profileData); // Converte a string do localStorage em um objeto
      setUserProfile(profile); // Define o estado do perfil do usuário
      setSignedUserUUID(profile.id); // Armazena o UUID do usuário conectado
    }
  }, []);

  // Lógica principal de navegação e busca de dados do usuário
  React.useEffect(() => {
    // Verifica se o perfil do usuário já foi carregado
    if (!userProfile) return;

    // Verifica se o UUID do usuário na URL corresponde ao UUID do usuário conectado
    if (userProfile && uuid === signedUserUUID) {
      setUserName(userProfile.name); // Define o nome do usuário
      setUserPicture(userProfile.picture); // Define a imagem do usuário
      setLoading(false); // Atualiza o estado de carregamento
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
  }, [uuid, signedUserUUID, navigate, userProfile]); // Dependências que disparam o efeito

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: "120px",
          ml: "20px",
          mr: "20px",
          paddingLeft: "0 !important",
          paddingRight: "0 !important"
        }}
      >
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
              sx={{
                height: "296px",
                width: "296px",
              }}
            />
            <Typography variant="h4">{userName}</Typography>
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
            <Typography variant="h4">{uuid}</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
