/* eslint-disable security/detect-object-injection */
import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Container,
  Grid2 as Grid,
  Box,
} from "@mui/material";

const userTestimonials = [
  {
    avatar: (
      <Avatar
        alt="Remy Sharp"
        src="https://randomuser.me/api/portraits/thumb/men/32.jpg"
      />
    ),
    name: "Remy Sharp",
    occupation: "Engenheiro Sênior",
    testimonial:
      "Eu absolutamente amo a versatilidade deste produto! Seja para projetos de trabalho ou para me dedicar aos meus hobbies favoritos, ele se adapta perfeitamente às minhas necessidades. Seu design intuitivo realmente melhorou minha rotina, tornando as tarefas mais eficientes e agradáveis.",
  },
  {
    avatar: (
      <Avatar
        alt="Travis Howard"
        src="https://randomuser.me/api/portraits/thumb/men/36.jpg"
      />
    ),
    name: "Travis Howard",
    occupation: "Designer de Produto Líder",
    testimonial:
      "Uma das melhores características deste produto é o suporte ao cliente excepcional. Em minha experiência, a equipe responsável pelo produto sempre responde rapidamente e é muito prestativa. É reconfortante saber que eles realmente confiam no que oferecem.",
  },
  {
    avatar: (
      <Avatar
        alt="Cindy Baker"
        src="https://randomuser.me/api/portraits/thumb/women/36.jpg"
      />
    ),
    name: "Cindy Baker",
    occupation: "CTO",
    testimonial:
      "O nível de simplicidade e facilidade de uso deste produto realmente simplificou minha vida. Agradeço aos criadores por entregar uma solução que não só atende, mas supera as expectativas do usuário.",
  },
  {
    avatar: (
      <Avatar
        alt="Julia Stewart"
        src="https://randomuser.me/api/portraits/thumb/women/90.jpg"
      />
    ),
    name: "Julia Stewart",
    occupation: "Engenheira Sênior",
    testimonial:
      "Eu aprecio a atenção aos detalhes no design deste produto. Os pequenos toques fazem uma grande diferença, e é evidente que os criadores focaram em oferecer uma experiência premium.",
  },
  {
    avatar: (
      <Avatar
        alt="John Smith"
        src="https://randomuser.me/api/portraits/thumb/men/86.jpg"
      />
    ),
    name: "John Smith",
    occupation: "Designer de Produto",
    testimonial:
      "Já experimentei outros produtos semelhantes, mas este se destaca por seus recursos inovadores. Fica claro que os criadores pensaram muito em criar uma solução que realmente atende às necessidades dos usuários.",
  },
  {
    avatar: (
      <Avatar
        alt="Daniel Wolf"
        src="https://randomuser.me/api/portraits/thumb/men/78.jpg"
      />
    ),
    name: "Daniel Wolf",
    occupation: "CDO",
    testimonial:
      "A qualidade deste produto superou minhas expectativas. É durável, bem projetado e feito para durar. Vale muito o investimento!",
  },
];

const darkLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const logos = darkLogos;

  return (
    <Container
      id="testimonials"
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
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom={true}
          sx={{ color: "text.primary" }}
        >
          Depoimentos
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Veja o que nossos clientes amam em nossos produtos. Descubra como nos
          destacamos em eficiência, durabilidade e satisfação. Junte-se a nós
          para qualidade, inovação e suporte confiável.
        </Typography>
      </Box>
      <Grid container={true} spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
            sx={{ display: "flex" }}
          >
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom={true}
                  sx={{ color: "text.secondary" }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
