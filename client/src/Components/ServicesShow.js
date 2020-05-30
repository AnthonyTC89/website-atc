import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoadingGif from './LoadingGif';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto',
    textAlign: 'center',
  },
  title: {
    fontWeight: 400,
    fontSize: '3em',
    margin: '1rem',
    color: theme.palette.primary.dark,
  },
  subtitle: {
    fontWeight: 300,
    fontSize: '2em',
    margin: '1rem',
    color: theme.palette.primary.dark,
  },
  text: {
    color: theme.palette.primary.main,
  },
  picture: {
    width: '100%',
  },
  img: {
    width: '60%',
    boxShadow: `0px 10px 15px 0px ${theme.palette.primary.main}`,
  },
}));

const ServicesShow = () => {
  const classes = useStyles();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/services_full');
      setServices(res.data);
    } catch (err) {
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingGif visible={loading} />;
  }
  return (
    services.length === 0 ? null : (
      <Grid container spacing={4} component="section" className={classes.root} id="contact">
        <Grid item key={uuidv4()} xs={12}>
          <Typography className={classes.title} variant="h2">
            Servicios
          </Typography>
        </Grid>
        {services.map((item) => (
          <Grid item key={uuidv4()} xs={12} sm={6} md component="article">
            <picture className={classes.picture}>
              <img className={classes.img} src={item.location} alt={item.key} />
            </picture>
            <Typography className={classes.subtitle} variant="subtitle2">
              {item.title}
            </Typography>
            <Typography className={classes.text}>
              {item.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default ServicesShow;