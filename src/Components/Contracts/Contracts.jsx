import * as React from "react";
import {
  Skeleton,
  Backdrop,
  Paper,
  Box,
  Modal,
  Typography,
  Fade,
  Avatar,
  Container,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Modal para Exibir Informações do Artigo
const ModalRender = ({ show, onClose, article }) => {
  const navigate = useNavigate();

  if (!article) {
    return null;
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      closeAfterTransition={true}
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={show}>
        <Box sx={style}>
          <Typography variant="h6">{article.title}</Typography>
          <Typography
            sx={{ mt: 2, cursor: "pointer" }}
            onClick={() => navigate(`/users/${article.uuid}`)}
          >
            {article.uuid}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

ModalRender.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }),
};

// Componente de Artigo Individual
const Article = ({ title, text, imgSrc, onClick }) => {
  const DEFAULT_ELEVATION = 2;
  const HOVERED_ELEVATION = 15;
  const [elevation, setElevation] = React.useState(DEFAULT_ELEVATION);

  return (
    <Paper
      onClick={onClick}
      component="article"
      elevation={elevation}
      onMouseEnter={() => setElevation(HOVERED_ELEVATION)}
      onMouseLeave={() => setElevation(DEFAULT_ELEVATION)}
      sx={{
        padding: "10px",
        width: "100%",
        maxWidth: "402px",
        borderRadius: "25px",
        height: "150px",
        backgroundColor: "#fefefe41",
        display: "flex",
        flexDirection: "row",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "scale(1.04)",
          cursor: "pointer",
        },
      }}
    >
      <Avatar src={imgSrc} alt={title} sx={{ width: 150, height: 150 }} />
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{text}</Typography>
      </Box>
    </Paper>
  );
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Contracts() {
  const VISIBLE_ARTICLES = 20;
  const [articlesData, setArticlesData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [visibleArticles, setVisibleArticles] =
    React.useState(VISIBLE_ARTICLES);

  React.useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(
          "https://pub-2f68c1db324345bb8d0fd40f4f1887c8.r2.dev/Jsons/users.json",
        );

        if (!response.ok) {
          throw new Error(
            `Contracts --> ArticlesRender - HTTP error! status: ${response.status}`,
          );
        }

        const data = await response.json();
        const articles = data.results.map((user) => ({
          title: `${user.name.first} ${user.name.last}`,
          email: user.email,
          phone: user.phone,
          uuid: user.login.uuid,
          location: {
            state: user.location.state,
            city: user.location.city,
            country: user.location.country,
          },
          text: `Generated user from ${user.location.city}, ${user.location.country}.`,
          imgSrc: user.picture.large,
        }));
        setArticlesData(articles);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsersData();
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const loadMoreArticles = () => {
    const LOAD_MORE_ARTICLES_COUNT = 20;
    setVisibleArticles((prev) => prev + LOAD_MORE_ARTICLES_COUNT);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const SCROLL_OFFSET_THRESHOLD = 50;
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - SCROLL_OFFSET_THRESHOLD
      ) {
        loadMoreArticles();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container
      maxWidth="none"
      sx={{
        width: "100%",
        margin: 0,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          marginTop: "100px",
          width: "100%",
          maxWidth: "300px",
          height: "100%",
          maxHeight: "85vh",
          display: "inline-flex",
          flexDirection: "column",
          position: { xs: "absolute", lg: "static" },
          zIndex: 500,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "450px", sm: "300px" },
            height: "100%",
            maxHeight: "85vh",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: 3,
            boxShadow:
              "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            left: { xs: "-300px", lg: "24px" },
            backgroundColor: {
              xs: "rgba(255, 255, 255, 0.4)",
              lg: "#f3f4f9",
            },
            backdropFilter: "blur(24px)",
            position: "fixed",
          }}
        >
          <Typography variant="h4" color="initial" sx={{ padding: "16px" }}>
            Menu
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          maxHeight: { xs: "90vh", sm: "100vh" },
          padding: "16px",
        }}
      >
        {!loading ? (
          <Box
            component="section"
            sx={{
              paddingTop: "85px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {articlesData.slice(0, visibleArticles).map((article, index) => (
              <Article
                key={index}
                title={article.title}
                text={article.text}
                imgSrc={article.imgSrc}
                onClick={() => handleArticleClick(article)}
              />
            ))}
          </Box>
        ) : (
          <Box
            component="section"
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {Array.from({ length: 200 }).map((_, index) => (
              <Paper
                key={index}
                sx={{
                  padding: "10px",
                  backgroundColor: "#fefefe41",
                  width: "100%",
                  maxWidth: "402px",
                  height: "150px",
                  borderRadius: "25px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <Skeleton variant="circular" width={150} height={150} />
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <Skeleton variant="text" width="80%" height={35} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="100%" height={20} />
                </Box>
              </Paper>
            ))}
          </Box>
        )}
        <ModalRender
          show={showModal}
          onClose={handleCloseModal}
          article={selectedArticle}
        />
      </Box>
    </Container>
  );
}
