import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

export default function CardAlert() {
  return (
    <Card variant="outlined" sx={{ m: 1.5, p: 1.5 }}>
      <CardContent>
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography gutterBottom={true} sx={{ fontWeight: 600 }}>
          Seu plano está preste a acabar
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Aproveite 10% off ao renovar sua assinatura hoje
        </Typography>
        <Button variant="contained" size="small" fullWidth={true}>
          Obter o desconto
        </Button>
      </CardContent>
    </Card>
  );
}
