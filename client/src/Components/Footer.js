import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

const Footer = () => {
  const classes = useStyles();
  const year = new Date().getFullYear();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
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
    </div>
  );
};

export default Footer;
