import * as React from "react";
import { Card, CardContent, Chip, Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom={true}>
          Clientes Contratantes
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              16
            </Typography>
            <Chip size="small" color="success" label="+5%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Média de clientes que fecharam contratos
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: ["Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out."],
            },
          ]}
          series={[
            {
              id: "clients",
              label: "Média de Clientes Contratantes",
              data: [43, 46, 48, 60, 57, 54, 65],
              stack: "A",
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
