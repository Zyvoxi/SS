import * as React from "react";
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import logo from "../../../Assets/Logo/TSLogoIcon.svg";
import logger from "../../../Extras/Debug/debug";

function Copyright() {
  return (
    <div style={{ textAlign: "left" }}>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
        {"T.S. © "}
        {new Date().getFullYear()}
        &nbsp;
        <Link
          color="text.secondary"
          target="_blank"
          href="https://github.com/Zyvoxi"
          aria-label="GitHub profile of Zyvoxi"
        >
          Zyvoxi
        </Link>
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Licensed under{" "}
        <Link
          color="text.secondary"
          target="_blank"
          href="https://creativecommons.org/licenses/by-nc/4.0/legalcode.pt"
          aria-label="CC BY-NC"
        >
          CC BY-NC
        </Link>
        .
      </Typography>
    </div>
  );
}

export default function Footer() {
  React.useEffect(() => {
    logger.debug("O componente 'MinimalistFooter' foi carregado.");
  });

  return (
    <React.Fragment>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          pt: { xs: 5, sm: 3, md: 4 },
          pb: 3,
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              alignItems={"center"}
              display={"flex"}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              TOPSKILL
            </Typography>
            <Link color="text.secondary" variant="body2">
              Política de Privacidade
            </Link>
            <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" variant="body2">
              Termos de Serviço
            </Link>
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap={true}
            sx={{ justifyContent: "left", color: "text.secondary" }}
          >
            <IconButton
              color="inherit"
              size="small"
              target="_blank"
              href="https://github.com/Zyvoxi/SS"
              aria-label="GitHub"
              sx={{ alignSelf: "center" }}
            >
              <GitHub />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
