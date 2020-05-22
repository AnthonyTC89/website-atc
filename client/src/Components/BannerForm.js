import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ModalImages from './ModalImages';
import LoadingGif from './LoadingGif';
import { BannerFormInfo, buttons } from '../Info.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  picture: {
    width: '100%',
    textAlign: 'center',
    margin: '0.5rem',
  },
  img: {
    width: '60%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const BannerForm = () => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [banner, setBanner] = useState({
    id: null, title: '', subtitle: '', body: '', caption: '', image_id: null, location: '', key: '',
  });

  const { update, wait, select } = buttons;

  const handleChange = (e) => {
    e.persist();
    setBanner((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = banner.id == null
        ? await axios.post('api/banners/', banner)
        : await axios.put(`api/banners/${banner.id}`, banner);
      setBanner((prev) => ({ ...prev, id: res.data.id }));
      setMessage(res.statusText);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  const getBanner = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/banners_full');
      if (res.data.length !== 0) {
        setBanner(res.data[0]);
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (image) => {
    setOpen(false);
    if (image.id) {
      setBanner((prev) => (
        { ...prev,
          image_id: image.id,
          location: image.location,
          key: image.key,
        }
      ));
    }
  };

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {BannerFormInfo.title}
      </Typography>
      <Typography variant="subtitle2" align="center" color="error" gutterBottom>
        {message}
      </Typography>
      <LoadingGif visible={loading} />
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className={classes.column}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? wait : update}
            </Button>
            <TextField
              margin="dense"
              name="title"
              variant="outlined"
              id="title"
              value={banner.title}
              label="titulo"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="subtitle"
              variant="outlined"
              id="subtitle"
              value={banner.subtitle}
              label="sub-titulo"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="body"
              variant="outlined"
              id="body"
              value={banner.body}
              label="texto"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="caption"
              variant="outlined"
              id="caption"
              value={banner.caption}
              label="texto pequeño"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.column}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleOpen}
            >
              {loading ? wait : select}
            </Button>
            {banner.image_id == null ? null : (
              <picture className={classes.picture}>
                <img className={classes.img} src={banner.location} alt={banner.key} />
              </picture>
            )}
            <ModalImages open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BannerForm;
