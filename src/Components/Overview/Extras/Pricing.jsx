import * as React from "react";
import {
  Box,
  Typography,
  Grid2 as Grid,
  Container,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  CardActions,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const tiers = [
  {
    title: "Grátis",
    price: "0",
    description: [
      "2 GB de armazenamento",
      "Acesso ao centro de ajuda",
      "Suporte por e-mail",
    ],
    buttonText: "Inscreva-se gratuitamente",
    buttonVariant: "outlined",
    buttonColor: "primary",
  },
  {
    title: "Profissional",
    subheader: "Recomendado",
    price: "15",
    description: [
      "10 GB de armazenamento",
      "Acesso ao centro de ajuda",
      "Suporte prioritário por e-mail",
      "Equipe dedicada",
      "Melhores ofertas",
    ],
    buttonText: "Comece agora",
    buttonVariant: "contained",
    buttonColor: "secondary",
  },
  {
    title: "Empresarial",
    price: "30",
    description: [
      "30 GB de armazenamento",
      "Acesso ao centro de ajuda",
      "Suporte por telefone e e-mail",
      "Equipe dedicada",
    ],
    buttonText: "Entre em contato",
    buttonVariant: "outlined",
    buttonColor: "primary",
  },
];

export default function Pricing() {
  const SIZE_SM_ENTERPRISE = 12;
  const SIZE_SM_NON_ENTERPRISE = 6;

  return (
    <Container
      id="pricing"
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
          Preços
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Veja nossas opções de preços e escolha a que melhor atende às suas
          necessidades. Oferecemos planos acessíveis com recursos variados para
          atender diferentes perfis de usuários.
        </Typography>
      </Box>
      <Grid
        container={true}
        spacing={3}
        sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
      >
        {tiers.map((tier) => (
          <Grid
            size={{
              xs: 12,
              sm:
                tier.title === "Empresarial"
                  ? SIZE_SM_ENTERPRISE
                  : SIZE_SM_NON_ENTERPRISE,
              md: 4,
            }}
            key={tier.title}
          >
            <Card
              sx={[
                {
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                },
                tier.title === "Profissional" &&
                  (() => ({
                    border: "none",
                    background:
                      "radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))",
                    boxShadow: "0 8px 12px hsla(220, 20%, 42%, 0.2)",
                  })),
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    },
                    tier.title === "Profissional"
                      ? { color: "grey.100" }
                      : { color: "" },
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === "Profissional" && (
                    <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                  )}
                </Box>
                <Box
                  sx={[
                    {
                      display: "flex",
                      alignItems: "baseline",
                    },
                    tier.title === "Profissional"
                      ? { color: "grey.50" }
                      : { color: null },
                  ]}
                >
                  <Typography component="h3" variant="h2">
                    R${tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; por mês
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: "divider" }} />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={[
                        {
                          width: 20,
                        },
                        tier.title === "Profissional"
                          ? { color: "primary.light" }
                          : { color: "primary.main" },
                      ]}
                    />
                    <Typography
                      variant="subtitle2"
                      component={"span"}
                      sx={[
                        tier.title === "Profissional"
                          ? { color: "grey.50" }
                          : { color: null },
                      ]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth={true}
                  variant={tier.buttonVariant}
                  color={tier.buttonColor}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
