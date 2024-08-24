import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb={3}>
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
};

export default Header;
