import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoadingGif from './LoadingGif';
import maintenance from '../Images/maintenance.jpg';
import { DefaultItem } from '../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto',
  },
  title: {
    fontWeight: 400,
    fontSize: '3em',
    textAlign: 'center',
    margin: '1rem',
    color: theme.palette.primary.dark,
  },
  picture: {
    width: '100%',
  },
  img: {
    width: '80%',
    boxShadow: `0px 10px 15px 0px ${theme.palette.primary.main}`,
  },
  columnImg: {
    textAlign: 'center',
  },
  columnText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    padding: '0 5rem',
    color: theme.palette.primary.dark,
  },
}));

const emptyAbout = {
  title: 'About Us',
  text: DefaultItem.text,
  location: maintenance,
  key: DefaultItem.title,
};

const About = () => {
  const classes = useStyles();
  const [about, setAbout] = useState(emptyAbout);
  const [loading, setLoading] = useState(false);

  const getAbout = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/abouts_full');
      if (res.data.length !== 0) {
        setAbout(res.data[0]);
      } else {
        setAbout(emptyAbout);
      }
    } catch (err) {
      setAbout(emptyAbout);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAbout();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif visible={loading} />;
  }
  return (
    <section className={classes.root} id="about">
      <Typography className={classes.title} variant="h2">
        {about.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} className={classes.columnText}>
          <Typography
            className={classes.text}
            component="article"
          >
            {about.text}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.columnImg}>
          <picture className={classes.picture}>
            <img className={classes.img} src={about.location} alt={about.key} />
          </picture>
        </Grid>
      </Grid>
    </section>
  );
};

export default About;
