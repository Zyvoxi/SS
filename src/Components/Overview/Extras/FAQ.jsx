import * as React from "react";
import {
  Container,
  Box,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Link,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: "text.primary",
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Perguntas frequentes
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Como posso entrar em contato com o suporte ao cliente se eu tiver
              uma pergunta ou problema?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom={true}
              sx={{ maxWidth: { sm: "100%", md: "70%" } }}
            >
              Você pode entrar em contato com nossa equipe de suporte ao cliente
              enviando um e-mail para
              <Link> support@email.com </Link>
              ou ligando para nosso número gratuito. Estamos aqui para ajudá-lo
              prontamente.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Posso devolver o produto se ele não atender às minhas
              expectativas?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom={true}
              sx={{ maxWidth: { sm: "100%", md: "70%" } }}
            >
              Absolutamente! Oferecemos uma política de devolução sem
              complicações. Se você não estiver completamente satisfeito, pode
              devolver o produto dentro de [número de dias] dias para um
              reembolso total ou troca.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
              O que torna seu produto diferente dos outros no mercado?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom={true}
              sx={{ maxWidth: { sm: "100%", md: "70%" } }}
            >
              Nosso produto se destaca por sua adaptabilidade, durabilidade e
              recursos inovadores. Priorizamos a satisfação do usuário e nos
              esforçamos continuamente para superar expectativas em todos os
              aspectos.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Existe uma garantia para o produto e o que ela cobre?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom={true}
              sx={{ maxWidth: { sm: "100%", md: "70%" } }}
            >
              Sim, nosso produto vem com uma garantia de [duração da garantia].
              Ela cobre defeitos de materiais e mão de obra. Se você encontrar
              qualquer problema coberto pela garantia, entre em contato com
              nosso suporte ao cliente para assistência.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
