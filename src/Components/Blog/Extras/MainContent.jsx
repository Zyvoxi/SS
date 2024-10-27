/* eslint-disable no-magic-numbers */
import * as React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import {
  SearchRounded as SearchRoundedIcon,
  RssFeedRounded as RssFeedRoundedIcon,
} from "@mui/icons-material";

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Engenharia",
    title:
      "Revolucionando o desenvolvimento de software com ferramentas de ponta",
    description:
      "Nossas mais recentes ferramentas de engenharia foram projetadas para otimizar fluxos de trabalho e aumentar a produtividade. Descubra como essas inovações estão transformando o cenário do desenvolvimento de software.",
    authors: [
      {
        name: "Remy Sharp",
        avatar: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
      },
      {
        name: "Travis Howard",
        avatar: "https://randomuser.me/api/portraits/thumb/men/36.jpg",
      },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=2",
    tag: "Produto",
    title: "Recursos inovadores de produtos que impulsionam o sucesso",
    description:
      "Explore os principais recursos de nossa mais recente versão de produto que estão ajudando empresas a alcançar seus objetivos. De interfaces amigáveis a funcionalidades robustas, descubra por que nosso produto se destaca.",
    authors: [
      {
        name: "Erica Johns",
        avatar: "https://randomuser.me/api/portraits/thumb/women/74.jpg",
      },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=3",
    tag: "Design",
    title: "Design para o futuro: tendências e insights",
    description:
      "Mantenha-se à frente com as últimas tendências e insights de design. Nossa equipe de design compartilha sua experiência em criar experiências de usuário intuitivas e visualmente impressionantes.",
    authors: [
      {
        name: "Kate Morrison",
        avatar: "https://randomuser.me/api/portraits/thumb/women/67.jpg",
      },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=4",
    tag: "Empresa",
    title: "Nossa jornada como empresa: marcos e conquistas",
    description:
      "Dê uma olhada em nossa trajetória como empresa e os marcos que conquistamos ao longo do caminho. De começos humildes a líder do setor, descubra nossa história de crescimento e sucesso.",
    authors: [
      {
        name: "Cindy Baker",
        avatar: "https://randomuser.me/api/portraits/thumb/women/36.jpg",
      },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=45",
    tag: "Engenharia",
    title: "Pioneirismo em soluções de engenharia sustentável",
    description:
      "Saiba mais sobre nosso compromisso com a sustentabilidade e as soluções de engenharia inovadoras que estamos implementando para criar um futuro mais verde. Descubra o impacto de nossas iniciativas ecológicas.",
    authors: [
      {
        name: "Agnes Walker",
        avatar: "https://randomuser.me/api/portraits/thumb/women/11.jpg",
      },
      {
        name: "Trevor Henderson",
        avatar: "https://randomuser.me/api/portraits/thumb/men/58.jpg",
      },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=6",
    tag: "Produto",
    title:
      "Maximizando a eficiência com as atualizações mais recentes de nossos produtos",
    description:
      "Nossas recentes atualizações de produtos foram projetadas para ajudar você a maximizar a eficiência e alcançar mais. Veja uma visão detalhada dos novos recursos e melhorias que podem elevar seu fluxo de trabalho.",
    authors: [
      {
        name: "Travis Howard",
        avatar: "https://randomuser.me/api/portraits/thumb/men/36.jpg",
      },
    ],
  },
];

const SyledCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: "#f3f4f9",
  transition: "ease 0.25s",
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">5 de Novembro, 2024</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Buscar…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom={true}>
          Blog
        </Typography>
        <Typography>
          Mantenha-se atualizado sobre as novidades de nossos produtos
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip
            onClick={handleClick}
            size="medium"
            label="Todas as categorias"
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Empresa"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Produto"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Design"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Engenharia"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container={true} spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[0].img}
              sx={{
                aspectRatio: "16 / 9",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom={true} variant="caption" component="div">
                {cardData[0].tag}
              </Typography>
              <Typography gutterBottom={true} variant="h6" component="div">
                {cardData[0].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom={true}
              >
                {cardData[0].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={cardData[0].authors} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? "Mui-focused" : ""}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[1].img}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom={true} variant="caption" component="div">
                {cardData[1].tag}
              </Typography>
              <Typography gutterBottom={true} variant="h6" component="div">
                {cardData[1].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom={true}
              >
                {cardData[1].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={cardData[1].authors} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 2 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[2].img}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom={true} variant="caption" component="div">
                {cardData[2].tag}
              </Typography>
              <Typography gutterBottom={true} variant="h6" component="div">
                {cardData[2].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom={true}
              >
                {cardData[2].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={cardData[2].authors} />
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(3)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 3 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <SyledCardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <Typography
                    gutterBottom={true}
                    variant="caption"
                    component="div"
                  >
                    {cardData[3].tag}
                  </Typography>
                  <Typography gutterBottom={true} variant="h6" component="div">
                    {cardData[3].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom={true}
                  >
                    {cardData[3].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author authors={cardData[3].authors} />
            </SyledCard>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(4)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 4 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <SyledCardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <Typography
                    gutterBottom={true}
                    variant="caption"
                    component="div"
                  >
                    {cardData[4].tag}
                  </Typography>
                  <Typography gutterBottom={true} variant="h6" component="div">
                    {cardData[4].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom={true}
                  >
                    {cardData[4].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
              <Author authors={cardData[4].authors} />
            </SyledCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[5].img}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom={true} variant="caption" component="div">
                {cardData[5].tag}
              </Typography>
              <Typography gutterBottom={true} variant="h6" component="div">
                {cardData[5].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom={true}
              >
                {cardData[5].description}
              </StyledTypography>
            </SyledCardContent>
            <Author authors={cardData[5].authors} />
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
