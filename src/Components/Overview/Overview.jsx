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
import PropTypes from "prop-types";

const Overview = React.forwardRef(
  (
    {
      overviewRef,
      featuresRef,
      testimonialsRef,
      highlightsRef,
      pricingRef,
      faqRef,
    },
    // eslint-disable-next-line no-unused-vars
    _ref,
  ) => {
    const navigate = useNavigate();

    React.useEffect(() => {
      const signedUser = localStorage.getItem("userProfile");
      if (signedUser) {
        return navigate("/dashboard");
      }
    }, [navigate]);

    return (
      <>
        <Box ref={overviewRef}>
          <Hero />
        </Box>
        <Box>
          <LogoCollection />
          <Box ref={featuresRef}>
            <Features />
          </Box>
          <Divider />
          <Box ref={testimonialsRef}>
            <Testimonials />
          </Box>
          <Divider />
          <Box ref={highlightsRef}>
            <Highlights />
          </Box>
          <Divider />
          <Box ref={pricingRef}>
            <Pricing />
          </Box>
          <Divider />
          <Box ref={faqRef}>
            <FAQ />
          </Box>
          <Divider />
        </Box>
      </>
    );
  },
);

Overview.displayName = "Overview";

Overview.propTypes = {
  overviewRef: PropTypes.object.isRequired,
  featuresRef: PropTypes.object.isRequired,
  testimonialsRef: PropTypes.object.isRequired,
  highlightsRef: PropTypes.object.isRequired,
  pricingRef: PropTypes.object.isRequired,
  faqRef: PropTypes.object.isRequired,
};

export default Overview;
