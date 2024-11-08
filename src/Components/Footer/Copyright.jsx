import * as React from "react";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: "text.secondary",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {"T.S. © "}
      <Link color="inherit" href="https://github.com/Zyvoxi/">
        Zyvoxi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

Copyright.propTypes = {
  sx: PropTypes.object,
};
