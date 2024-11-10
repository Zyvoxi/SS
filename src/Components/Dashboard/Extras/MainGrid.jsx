import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../../Footer/Copyright";
import ContractsByCountry from "./ContractsByCountry";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./HiringClientsChart";
import SessionsChart from "./SatisfactionChart";
import StatCard from "./StatCard";

const data = [
  {
    title: "Contratos",
    value: "100",
    interval: "Últimos 30 dias",
    trend: "up",
    data: [
      1, 4, 4, 9, 3, 3, 2, 4, 6, 3, 3, 4, 4, 3, 2, 4, 2, 2, 2, 7, 2, 3, 3, 4, 4,
      1, 3, 2, 3, 3,
    ],
  },
  {
    title: "Gastos",
    value: "R$325",
    interval: "Últimos 30 dias",
    trend: "down",
    data: [
      13, 14, 15, 6, 13, 17, 9, 10, 14, 12, 10, 11, 14, 4, 12, 7, 7, 12, 10, 8,
      9, 8, 10, 10, 8, 10, 17, 8, 18, 9,
    ],
  },
  {
    title: "Lucros",
    value: "R$15,7k",
    interval: "Últimos 30 dias",
    trend: "neutral",
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container={true}
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Detalhes
      </Typography>
      <Grid container={true} spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <ContractsByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
