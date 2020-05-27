import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 2),
    bottom: 0,
    width: '100%',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
          {` ${year} © `}
          <Link color="inherit" href="https://material-ui.com/">
            AnthonyTC89
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          All Rights Reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
