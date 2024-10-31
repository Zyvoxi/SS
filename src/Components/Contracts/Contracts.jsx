import * as React from "react";
import { Container, Box, Typography } from "@mui/material";
import ArticlesRender from "./Articles/ArticlesRender";

export default function Contracts() {
  return (
    <Container
      maxWidth="true"
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          marginTop: "100px",
          width: "100%",
          maxWidth: { sm: "350px", md: "350px" },
          height: "100%",
          maxHeight: "85vh",
          alignSelf: "start",
          justifySelf: "start",
          position: { sm: "absolute", md: "inherit" },
          zIndex: 500,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "450px",
            height: "100%",
            maxHeight: "85vh",
            borderRight: "1px solid lightgray",
            borderTop: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
            borderRadius: 3,
            left: "-24px",
            backgroundColor: { sm: "rgba(255, 255, 255, 0.4)", md: "none" },
            backgroundImage: {
              sm: "none",
              md: "linear-gradient(to right, #fbfbfbd3, #f5f5f5d2)",
            },
            backdropFilter: "blur(24px)",
            position: "fixed",
          }}
        >
          <Typography variant="h4" color="initial">
            Menu
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          justifySelf: "flex-end",
          alignSelf: "end",
        }}
      >
        <ArticlesRender />
      </Box>
    </Container>
  );
}
