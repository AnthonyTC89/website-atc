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
import { AboutFormInfo, buttons } from '../Info.json';

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

const AboutForm = () => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [about, setAbout] = useState({
    id: null, title: '', text: '', image_id: null, location: '', key: '',
  });

  const { update, wait, select } = buttons;

  const handleChange = (e) => {
    e.persist();
    setAbout((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = about.id == null
        ? await axios.post('api/abouts/', about)
        : await axios.put(`api/abouts/${about.id}`, about);
      setAbout((prev) => ({ ...prev, id: res.data.id }));
      setMessage(res.statusText);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  const getAbout = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/abouts_full');
      if (res.data.length !== 0) {
        setAbout(res.data[0]);
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
      setAbout((prev) => (
        { ...prev,
          image_id: image.id,
          location: image.location,
          key: image.key,
        }
      ));
    }
  };

  useEffect(() => {
    getAbout();
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {AboutFormInfo.title}
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
              value={about.title}
              label="titulo"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              multiline
              rows="5"
              name="text"
              variant="outlined"
              id="text"
              value={about.text}
              label="texto"
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
            {about.image_id == null ? null : (
              <picture className={classes.picture}>
                <img className={classes.img} src={about.location} alt={about.key} />
              </picture>
            )}
            <ModalImages open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AboutForm;
