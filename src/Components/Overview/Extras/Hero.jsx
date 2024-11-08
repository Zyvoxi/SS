import * as React from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  InputLabel,
  TextField,
  Button,
  Link,
} from "@mui/material";

import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage:
    "url('https://pub-2f68c1db324345bb8d0fd40f4f1887c8.r2.dev/Dashboard.png')",
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap={true}
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Nossos&nbsp;últimos&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              produtos
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Explore nosso painel de última geração, oferecendo soluções de alta
            qualidade adaptadas às suas necessidades. Eleve sua experiência com
            recursos e serviços de primeira linha.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap={true}
            sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              E-mail
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel={true}
              size="small"
              variant="outlined"
              aria-label="Digite seu endereço de e-mail"
              placeholder="Seu endereço de e-mail"
              fullWidth={true}
              slotProps={{
                htmlInput: {
                  autoComplete: "off",
                  "aria-label": "Digite seu endereço de e-mail",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: "fit-content" }}
            >
              Comece agora
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Ao clicar em &quot;Comece agora&quot;, você concorda com
            nossos&nbsp;
            <Link
              color="primary"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Termos & Condições
            </Link>
            .
          </Typography>
        </Stack>
        <StyledBox id="image" />
      </Container>
    </Box>
  );
}
