import React from 'react';
import { Typography, Link } from '@material-ui/core';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {` ${year} © `}
      <Link color="inherit" href="https://material-ui.com/">
        AnthonyTC89
      </Link>
      . All Rights Reserved.
    </Typography>
  );
};

export default Footer;
