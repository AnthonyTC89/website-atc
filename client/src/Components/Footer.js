import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import LoadingGif from './LoadingGif';
import { FooterInfo } from '../Info.json';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1rem',
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
    margin: '0.5rem',
  },
});

const Footer = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const year = new Date().getFullYear();
  const { authorName, authorUrl, copyright } = FooterInfo;

  const getSocialNetworks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/social_networks_home');
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
    return <LoadingGif visible={loading} home />;
  }
  return (
    <footer className={classes.footer}>
      <CssBaseline />
      {socialNetworks.length === 0 ? null : (
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
      )}
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
          {` ${year} © `}
          <Link color="inherit" href={authorUrl}>
            {authorName}
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {copyright}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
