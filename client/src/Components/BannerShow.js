import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import LoadingGif from './LoadingGif';
import maintenance from '../Images/maintenance.jpg';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxHeight: window.innerHeight,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: '100%',
  },
  img: {
    width: '100%',
  },
  text: {
    position: 'absolute',
    top: '33%',
    left: '49%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'aliceblue',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '8vw',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '4.8vw',
  },
  body: {
    fontWeight: 'bold',
    fontSize: '3.2vw',
  },
  caption: {
    fontWeight: 'bold',
    fontSize: '1.6vw',
  },
});

const emptyBanner = {
  title: '',
  subtitle: '',
  body: '',
  caption: '',
  location: maintenance,
  key: 'maintenance',
};

const Banner = () => {
  const classes = useStyles();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBanner = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/banners_home');
      if (res.data.length !== 0) {
        setBanner(res.data[0]);
      } else {
        setBanner(emptyBanner);
      }
    } catch (err) {
      setBanner(emptyBanner);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <LoadingGif visible={loading} home />;
  }
  return (
    <section className={classes.root} id="home">
      <Grow in timeout={2000}>
        <picture className={classes.picture}>
          <img className={classes.img} src={banner.location} alt={banner.key} />
        </picture>
      </Grow>
      <div className={classes.text}>
        {banner.subtitle.trim() === '' ? null : (
          <Typography className={classes.subtitle} variant="subtitle2" gutterBottom>
            {banner.subtitle}
          </Typography>
        )}
        {banner.title.trim() === '' ? null : (
          <Typography className={classes.title} variant="h2" gutterBottom>
            {banner.title}
          </Typography>
        )}
        {banner.body.trim() === '' ? null : (
          <Typography className={classes.body} variant="body1" gutterBottom>
            {banner.body}
          </Typography>
        )}
        {banner.caption.trim() === '' ? null : (
          <Typography className={classes.caption} variant="caption" gutterBottom>
            {banner.caption}
          </Typography>
        )}
      </div>
    </section>
  );
};

export default Banner;
