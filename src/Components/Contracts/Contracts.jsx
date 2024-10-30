import * as React from "react";
import { Container, Box } from "@mui/material";
import ArticlesRender from "./Articles/ArticlesRender";

export default function Contracts() {
  return (
    <Container
      maxWidth="true"
      sx={{
        display: "grid",
      }}
    >
      <Box
        sx={{
          marginTop: "100px",
          width: "100%",
          maxWidth: "425px",
          height: "100%",
          maxHeight: "100vh",
          borderRight: "1px solid lightgray",
          borderRadius: 3,
          alignSelf: "start",
          justifySelf: "start",
          backgroundImage:
            "linear-gradient(to right, #fefefe, #f8f8f8, #fafafa)",
          position: "fixed",
        }}
      ></Box>
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
