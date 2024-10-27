import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const articleInfo = [
  {
    tag: "Engenharia",
    title: "O futuro da IA na engenharia de software",
    description:
      "A inteligência artificial está revolucionando a engenharia de software. Explore como as ferramentas impulsionadas por IA estão aprimorando os processos de desenvolvimento e melhorando a qualidade do software.",
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
    tag: "Produto",
    title:
      "Impulsionando o crescimento com design de produto centrado no usuário",
    description:
      "Nossa abordagem de design centrado no usuário está gerando um crescimento significativo. Saiba mais sobre as estratégias que empregamos para criar produtos que ressoam com os usuários.",
    authors: [
      {
        name: "Erica Johns",
        avatar: "https://randomuser.me/api/portraits/thumb/women/74.jpg",
      },
    ],
  },
  {
    tag: "Design",
    title: "Adotando o minimalismo no design moderno",
    description:
      "O minimalismo é uma tendência chave no design moderno. Descubra como nossa equipe de design incorpora princípios minimalistas para criar experiências de usuário limpas e impactantes.",
    authors: [
      {
        name: "Kate Morrison",
        avatar: "https://randomuser.me/api/portraits/thumb/women/67.jpg",
      },
    ],
  },
  {
    tag: "Empresa",
    title: "Cultivando uma cultura de inovação",
    description:
      "A inovação está no centro da nossa cultura empresarial. Conheça as iniciativas que temos em prática para promover a criatividade e impulsionar soluções inovadoras.",
    authors: [
      {
        name: "Cindy Baker",
        avatar: "https://randomuser.me/api/portraits/thumb/women/36.jpg",
      },
    ],
  },
  {
    tag: "Engenharia",
    title: "Avançando na cibersegurança com soluções de próxima geração",
    description:
      "Nossas soluções de cibersegurança de próxima geração estão estabelecendo novos padrões na indústria. Descubra como protegemos nossos clientes de ameaças cibernéticas em constante evolução.",
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
    tag: "Produto",
    title: "Melhorando a experiência do cliente por meio da inovação",
    description:
      "Nossas abordagens inovadoras estão melhorando a experiência do cliente. Saiba mais sobre os novos recursos e melhorias que estão encantando nossos usuários.",
    authors: [
      {
        name: "Travis Howard",
        avatar: "https://randomuser.me/api/portraits/thumb/men/36.jpg",
      },
    ],
  },
  {
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
    tag: "Produto",
    title: "Maximizando a eficiência com as últimas atualizações de produto",
    description:
      "Nossas recentes atualizações de produto foram projetadas para ajudar você a maximizar a eficiência e alcançar mais. Obtenha uma visão detalhada dos novos recursos e melhorias que podem elevar seu fluxo de trabalho.",
    authors: [
      {
        name: "Travis Howard",
        avatar: "https://randomuser.me/api/portraits/thumb/men/36.jpg",
      },
    ],
  },
  {
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
    tag: "Empresa",
    title: "A jornada da nossa empresa: marcos e conquistas",
    description:
      "Dê uma olhada na jornada da nossa empresa e nos marcos que alcançamos ao longo do caminho. De começos humildes a líder do setor, descubra nossa história de crescimento e sucesso.",
    authors: [
      {
        name: "Cindy Baker",
        avatar: "https://randomuser.me/api/portraits/thumb/women/36.jpg",
      },
    ],
  },
];

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },
  "& .arrow": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: "''",
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
}));

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
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

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom={true}>
        Recentes
      </Typography>
      <Grid container={true} spacing={8} columns={12} sx={{ my: 4 }}>
        {articleInfo.map((article, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 1,
                height: "100%",
              }}
            >
              <Typography gutterBottom={true} variant="caption" component="div">
                {article.tag}
              </Typography>
              <TitleTypography
                gutterBottom={true}
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? "Mui-focused" : ""}
              >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: "1rem" }}
                />
              </TitleTypography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom={true}
              >
                {article.description}
              </StyledTypography>

              <Author authors={article.authors} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
        <Pagination
          hidePrevButton={true}
          hideNextButton={true}
          count={10}
          boundaryCount={10}
        />
      </Box>
    </div>
  );
}
