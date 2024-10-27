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
    width: 400, // Constante de número mágico usada diretamente
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
            onClick={() => navigate(`/SS/user/${article.uuid}`)}
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
  // Constantes para a elevação padrão e no hover
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

// Componente Principal com Infinite Scroll
export default function Main() {
  const VISIBLE_ARTICLES = 20;
  const [articlesData, setArticlesData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [visibleArticles, setVisibleArticles] =
    React.useState(VISIBLE_ARTICLES);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Zyvoxi/SS/refs/heads/main/users.json",
        );
        const data = await response.json();
        const articles = data.results.map((user) => {
          const RANDOM_RATING_MAX = 6;
          return {
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
            rating: Math.floor(Math.random() * RANDOM_RATING_MAX),
          };
        });
        setArticlesData(articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para carregar mais artigos quando o usuário rolar até o final
  const loadMoreArticles = () => {
    const LOAD_MORE_ARTICLES_COUNT = 20;
    setVisibleArticles((prev) => prev + LOAD_MORE_ARTICLES_COUNT);
  };

  // Observador de scroll para carregar mais artigos
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

  if (loading) {
    return (
      <Box component="section" className="Main-Section">
        {Array.from({ length: 20 }).map((_, index) => (
          <Paper
            key={index}
            sx={{
              padding: "10px",
              marginBottom: "15px",
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
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <Skeleton variant="text" width="80%" height={35} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="100%" height={20} />
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <>
      <Box component="section" className="Main-Section">
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

      <ModalRender
        show={showModal}
        onClose={handleCloseModal}
        article={selectedArticle}
      />
    </>
  );
}
