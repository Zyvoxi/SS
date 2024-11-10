import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default function SatisfactionChart() {
  const theme = useTheme();

  // Função para gerar as datas do mês
  const generateDates = (startDate, numDays) => {
    const dates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < numDays; i++) {
      const dateStr = `${currentDate.getDate()} de ${currentDate.toLocaleString("default", { month: "long" })}`;
      dates.push(dateStr);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Gerando as 30 datas a partir do primeiro de outubro
  const data = generateDates(new Date(2024, 9, 1), 30);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom={true}>
          Índice de Satisfação do Cliente
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
              85%
            </Typography>
            <Chip size="small" color="success" label="+5%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Índice de satisfação dos clientes nos últimos 30 dias
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: "positiveFeedback",
              label: "Feedback Positivo",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: [
                100, 120, 150, 130, 200, 170, 190, 180, 220, 210, 230, 260, 240,
                250, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 380, 390,
                400, 410, 420, 440,
              ],
            },
            {
              id: "negativeFeedback",
              label: "Feedback Negativo",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: [
                50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160, 170, 180,
                190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310,
                320, 330, 340, 350,
              ],
            },
            {
              id: "overallSatisfaction",
              label: "Satisfação Geral",
              showMark: false,
              curve: "linear",
              stack: "total",
              stackOrder: "ascending",
              data: [
                150, 180, 220, 210, 300, 280, 310, 310, 360, 360, 390, 430, 420,
                440, 470, 490, 510, 530, 550, 570, 590, 610, 630, 640, 670, 690,
                710, 730, 750, 770,
              ],
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-positiveFeedback": {
              fill: "url('#positiveFeedback')",
            },
            "& .MuiAreaElement-series-negativeFeedback": {
              fill: "url('#negativeFeedback')",
            },
            "& .MuiAreaElement-series-overallSatisfaction": {
              fill: "url('#overallSatisfaction')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient
            color={theme.palette.success.main}
            id="positiveFeedback"
          />
          <AreaGradient
            color={theme.palette.error.main}
            id="negativeFeedback"
          />
          <AreaGradient
            color={theme.palette.primary.main}
            id="overallSatisfaction"
          />
        </LineChart>
      </CardContent>
    </Card>
  );
}
