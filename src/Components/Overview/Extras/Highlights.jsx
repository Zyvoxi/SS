import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: "Desempenho adaptável",
    description:
      "A TOPSKILL se ajusta facilmente às suas necessidades, aumentando sua eficiência e tornando suas tarefas mais simples.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Feito para durar",
    description:
      "Desfrute de uma durabilidade incomparável que representa um investimento que vale a pena a longo prazo.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Ótima experiência do usuário",
    description:
      "Integre a TOPSKILL na sua rotina com uma interface intuitiva e fácil de usar, projetada para você.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: "Funcionalidade inovadora",
    description:
      "Esteja à frente com recursos que definem novos padrões, atendendo suas necessidades em constante evolução de maneira excepcional.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Suporte confiável",
    description:
      "Conte com nosso suporte ao cliente ágil, sempre pronto para ajudar você mesmo após a compra.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "Precisão em cada detalhe",
    description:
      "Aproveite um produto cuidadosamente elaborado, onde pequenos detalhes fazem uma grande diferença na sua experiência.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "grey.900",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom={true}>
            Destaques
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Descubra o que faz a TOPSKILL se destacar: sua adaptabilidade,
            durabilidade, design intuitivo e inovações constantes. Aproveite
            nosso suporte ao cliente sempre disponível e a atenção aos detalhes
            que tornam sua experiência excepcional.
          </Typography>
        </Box>
        <Grid container={true} spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap={true}
                sx={{
                  color: "inherit",
                  p: 3,
                  height: "100%",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  backgroundColor: "grey.800",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom={true} sx={{ fontWeight: "medium" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
