import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  root: {
    opacity: '70%',
  },
  title: {
    flexGrow: 1,
  },
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
  },
  link: {
    margin: '1rem',
    alignSelf: 'center',
  },
});

const Navbar = ({ openSignIn }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root} color="inherit">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Website
        </Typography>
        <Grid container className={classes.container}>
          <Link href="#about" color="inherit" className={classes.link}>
            Nosotros
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link href="#home" color="inherit" className={classes.link}>
            <HomeIcon />
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link href="#contact" color="inherit" className={classes.link}>
            Contacto
          </Link>
        </Grid>
        <IconButton edge="start" onClick={openSignIn} color="inherit" aria-label="menu">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  openSignIn: PropTypes.func.isRequired,
};

export default Navbar;
