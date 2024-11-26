import * as React from "react";
import {
  Backdrop,
  Paper,
  Box,
  Modal,
  Typography,
  Fade,
  Avatar,
  Container,
  Stack,
  Rating,
} from "@mui/material";
import { alpha } from "@mui/material";
import SideMenu from "./Extras/SideMenu";
import Header from "./Extras/Header";
import SideMenuMobile from "./Extras/SideMenuMobile";
import Copyright from "../Footer/Copyright";
import { ArrowBackIos as ArrowBackIosIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

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
    bgcolor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(24px)",
    border: "1px solid lightgray",
    borderRadius: "10px",
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
      sx={{
        padding: 2,
      }}
    >
      <Fade in={show}>
        <Container maxWidth={"md"}>
          <Box sx={style}>
            <Avatar src={article.imgSrc} alt={article.title} />
            <Typography variant="h6">{article.title}</Typography>
            <Typography
              sx={{ mt: 2, cursor: "pointer" }}
              onClick={() => navigate(`/users/${article.uuid}`)}
            >
              {article.text}
            </Typography>
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
};

// Defina o tipo das propiedades do ModalRender
ModalRender.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }),
};

const Article = ({ title, text, imgSrc, onClick }) => {
  const [elevation, setElevation] = React.useState(3);

  return (
    <Paper
      onClick={onClick}
      component="article"
      elevation={elevation}
      onMouseEnter={() => setElevation(15)}
      onMouseLeave={() => setElevation(3)}
      sx={{
        textAlign: "left",
        padding: "10px",
        width: "100%",
        maxWidth: "400px",
        borderRadius: "25px",
        height: "170px",
        backgroundColor: "#f3f4ff40",
        display: "flex",
        gap: 1,
        flexDirection: "row",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "scale(1.02)",
          cursor: "pointer",
        },
      }}
    >
      <Avatar src={imgSrc} alt={title} sx={{ width: 150, height: 150 }} />
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h5">{title}</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "left",
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3, // Define o número máximo de linhas
            WebkitBoxOrient: "vertical",
          }}
        >
          {text}
        </Typography>
        <Box display={"flex"} justifyContent={"right"} pt={1}>
          <Rating
            defaultValue={Math.round(Math.ceil(Math.random() * (5 - 1) + 1))}
            readOnly={true}
          />
        </Box>
      </Box>
    </Paper>
  );
};

// Defina o tipo das propiedades do Article
Article.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Contracts() {
  const VISIBLE_ARTICLES = 25;
  const [articlesData, setArticlesData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [visibleArticles, setVisibleArticles] =
    React.useState(VISIBLE_ARTICLES);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const showMenu = (newOpen) => () => {
    setOpen(newOpen);
  };

  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const signedUser = localStorage.getItem("userProfile");

    // eslint-disable-next-line curly
    if (!signedUser) return navigate("/topskill/overview");

    const handleScroll = () => {
      const SCROLL_OFFSET_THRESHOLD = 1000;
      if (
        sectionRef.current &&
        sectionRef.current.scrollTop + sectionRef.current.clientHeight >=
          sectionRef.current.scrollHeight - SCROLL_OFFSET_THRESHOLD
      ) {
        loadMoreArticles();
      }
    };

    const sectionElement = sectionRef.current;
    sectionElement.addEventListener("scroll", handleScroll); // Adicionado o event listener para a rolagem

    const fetchUsersData = async () => {
      try {
        const response = await fetch(
          "https://r2.storage.zyvoxi.com/Jsons/users.json",
        );

        // eslint-disable-next-line curly, prettier/prettier
        if (!response.ok) throw new Error(`Contracts --> ArticlesRender - HTTP error! status: ${response.status}`);

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
          text: user.skill,
          imgSrc: user.picture.large,
        }));
        setArticlesData(articles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsersData();

    return () => {
      sectionElement.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]);

  // Função para abrir o modal com o artigo selecionado
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(false); // desativo o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para carregar mais 30 artigos
  const loadMoreArticles = () => {
    const LOAD_MORE_ARTICLES_COUNT = 30;
    setVisibleArticles((prev) => prev + LOAD_MORE_ARTICLES_COUNT);
  };

  // Rederizaçao do componente "Contracts"
  return (
    <>
      <SideMenu />
      <Box
        sx={{
          display: { xs: "auto", md: "none" },
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderTop: "1px solid lightgray",
          borderBottom: "1px solid lightgray",
          borderLeft: "1px solid lightgray",
          backdropFilter: "blur(24px)",
          height: "80px",
          position: "fixed",
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))",
          top: "45%",
          right: "-0.5%",
          transition: "ease 190ms",
          zIndex: "1000",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          showMenu(!open)();
        }}
      >
        <ArrowBackIosIcon
          sx={{
            position: "relative",
            top: "35%",
            left: "20%",
          }}
        />
      </Box>
      <SideMenuMobile open={open} showMenu={showMenu} />
      <Box
        component="main"
        sx={(theme) => ({
          padding: { xs: "0", md: "70px 0 0 220px" },
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: "auto",
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 0,
            pb: 1,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header />
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "83vh",
              maxWidth: { sm: "100%", md: "1700px" },
            }}
          >
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Contratos
            </Typography>
            <Box
              sx={{
                overflowY: "auto",
                height: "90%",
                pt: "10px",
                px: 3,
                display: "flex",
                gap: 4,
                justifyContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              ref={sectionRef}
            >
              {articlesData.slice(0, visibleArticles).map((article) => (
                <Article
                  key={article.uuid}
                  title={article.title}
                  text={article.text}
                  imgSrc={article.imgSrc}
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </Box>
            <Copyright sx={{ my: 1 }} />
          </Box>
        </Stack>
        <ModalRender
          show={showModal}
          onClose={handleCloseModal}
          article={selectedArticle}
        />
      </Box>
    </>
  );
}
