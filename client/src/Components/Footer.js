import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import LoadingGif from './LoadingGif';

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 2),
    bottom: 0,
    width: '100%',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '2rem',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const year = new Date().getFullYear();

  const getSocialNetworks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/social_networks');
      setSocialNetworks(res.data);
    } catch (err) {
      setSocialNetworks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSocialNetworks();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif visible={loading} />;
  }
  return (
    <footer className={classes.footer}>
      <CssBaseline />
      <div className={classes.list}>
        {socialNetworks.map((item) => (
          <a
            key={uuidv4()}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={classes.icon} src={item.src} alt={`${item.name}-icon`} />
          </a>
        ))}
      </div>
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
