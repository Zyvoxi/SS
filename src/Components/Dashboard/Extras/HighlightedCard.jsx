import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import { useTheme } from "@mui/material/styles";

export default function HighlightedCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <InsightsRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom={true}
          sx={{ fontWeight: "600" }}
        >
          Explore suas informações
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "8px" }}>
          Todos os seus contratos e lucros em um único lugar
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
        >
          Obter mais detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
