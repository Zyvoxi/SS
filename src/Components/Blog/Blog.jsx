import * as React from "react";
import { Box, Container } from "@mui/material";
const MainContent = React.lazy(() => import("./Extras/MainContent"));
const Latest = React.lazy(() => import("./Extras/Latest"));

export default function Blog() {
  return (
    <>
      <Box
        maxWidth={true}
        display={"flex"}
        flexDirection={"column"}
        paddingLeft={"24px"}
        paddingRight={"24px"}
      >
        <Container
          maxWidth="lg"
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            my: 16,
            gap: 4,
            padding: "0 !important",
          }}
        >
          <MainContent />
          <Latest />
        </Container>
      </Box>
    </>
  );
}
