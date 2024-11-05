import * as React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const signedUser = localStorage.getItem("userProfile");
    // eslint-disable-next-line curly
    if (!signedUser) return navigate("/overview");
  }, [navigate]);

  return (
    <>
      <Typography variant="h1">Welcome to our Dashboard Page</Typography>
    </>
  );
}
