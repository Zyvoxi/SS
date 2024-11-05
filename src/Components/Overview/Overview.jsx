import * as React from "react";
import { Box, Divider } from "@mui/material";
import Hero from "./Extras/Hero";
import LogoCollection from "./Extras/LogoCollection";
import Features from "./Extras/Features";
import Testimonials from "./Extras/Testimonials";
import Highlights from "./Extras/Highlights";
import Pricing from "./Extras/Pricing";
import FAQ from "./Extras/FAQ";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const signedUser = localStorage.getItem("userProfile");
    // eslint-disable-next-line curly
    if (signedUser) return navigate("/dashboard");
  }, [navigate]);

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
