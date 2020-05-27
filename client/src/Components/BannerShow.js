import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import LoadingGif from './LoadingGif';
import maintenance from '../Images/maintenance.jpg';

const useStyles = makeStyles({
  picture: {
    width: '100%',
  },
  img: {
    width: '100%',
  },
});

const Banner = () => {
  const classes = useStyles();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBanner = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/banners_full');
      if (res.data.length !== 0) {
        setBanner(res.data[0]);
      } else {
        setBanner(null);
      }
    } catch (err) {
      setBanner(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line
  }, []);

  return (
    <section id="home">
      {loading ? <LoadingGif visible={loading} /> : (
        <picture className={classes.picture}>
          {banner === null
            ? <img className={classes.img} src={maintenance} alt="under-construction" />
            : <img className={classes.img} src={banner.location} alt={banner.key} />}
        </picture>
      )}
    </section>
  );
};

export default Banner;
