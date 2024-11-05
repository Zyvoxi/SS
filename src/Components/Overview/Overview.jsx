import * as React from "react";
import { Box, Divider } from "@mui/material";
import Hero from "./Extras/Hero";
import LogoCollection from "./Extras/LogoCollection";
import Features from "./Extras/Features";
import Testimonials from "./Extras/Testimonials";
import Highlights from "./Extras/Highlights";
import Pricing from "./Extras/Pricing";
import FAQ from "./Extras/FAQ";

export default function Overview() {
  return (
    <>
      <Hero />
      <Box>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
      </Box>
    </>
  );
}
