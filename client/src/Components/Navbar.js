import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import Hidden from '@material-ui/core/Hidden';
import LoadingGif from './LoadingGif';
import { NavbarInfo } from '../Info.json';

const useStyles = makeStyles({
  root: {
    opacity: '70%',
  },
  title: {
    flexGrow: 1,
    fontSize: '3vw',
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
  img: {
    width: '2.5rem',
  },
});

const emptyLogo = {
  text: 'Website',
};

const Navbar = ({ openSignIn }) => {
  const classes = useStyles();
  const [logo, setLogo] = useState(emptyLogo);
  const [loading, setLoading] = useState(true);
  const { about, contact, products, services } = NavbarInfo;

  const getLogo = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/logos_home');
      if (res.data.length !== 0) {
        setLogo(res.data[0]);
      } else {
        setLogo(emptyLogo);
      }
    } catch (err) {
      setLogo(emptyLogo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogo();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif visible={loading} home />;
  }
  return (
    <AppBar position="fixed" className={classes.root} color="inherit">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {logo.text}
        </Typography>
        <Grid container className={classes.container}>
          <Hidden xsDown>
            <Link href="#products" color="inherit" className={classes.link}>
              {products}
            </Link>
            <Divider orientation="vertical" flexItem />
          </Hidden>
          <Hidden smDown>
            <Link href="#about" color="inherit" className={classes.link}>
              {about}
            </Link>
            <Divider orientation="vertical" flexItem />
          </Hidden>
          <Link href="#home" color="inherit" className={classes.link}>
            {logo.location == null ? <HomeIcon /> : (
              <img className={classes.img} src={logo.location} alt={logo.key} />
            )}
          </Link>
          <Hidden smDown>
            <Divider orientation="vertical" flexItem />
            <Link href="#contact" color="inherit" className={classes.link}>
              {contact}
            </Link>
          </Hidden>
          <Hidden xsDown>
            <Divider orientation="vertical" flexItem />
            <Link href="#services" color="inherit" className={classes.link}>
              {services}
            </Link>
          </Hidden>
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
