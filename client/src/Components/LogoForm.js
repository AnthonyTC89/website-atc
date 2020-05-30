import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ModalGridImages from './ModalGridImages';
import LoadingGif from './LoadingGif';
import { LogoFormInfo, buttons } from '../Info.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '1rem',
  },
  picture: {
    width: '100%',
    textAlign: 'center',
    margin: '0.5rem',
  },
  img: {
    maxWidth: '5rem',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const LogoForm = () => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [logo, setLogo] = useState({
    id: null, text: '', image_id: null, location: '', key: '',
  });

  const { update, wait, select } = buttons;

  const handleChange = (e) => {
    e.persist();
    setLogo((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = logo.id == null
        ? await axios.post('api/logos/', logo)
        : await axios.put(`api/logos/${logo.id}`, logo);
      setLogo((prev) => ({ ...prev, id: res.data.id }));
      setMessage(res.statusText);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  const getLogo = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/logos_full');
      if (res.data.length !== 0) {
        setLogo(res.data[0]);
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
      setLogo((prev) => (
        { ...prev,
          image_id: image.id,
          location: image.location,
          key: image.key,
        }
      ));
    }
  };

  useEffect(() => {
    getLogo();
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {LogoFormInfo.title}
      </Typography>
      <Typography variant="subtitle2" align="center" color="error" gutterBottom>
        {message}
      </Typography>
      <LoadingGif visible={loading} />
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} className={classes.column}>
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
              name="text"
              variant="outlined"
              id="text"
              value={logo.text}
              label="texto"
              onChange={handleChange}
              required
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleOpen}
            >
              {loading ? wait : select}
            </Button>
            {logo.image_id == null ? null : (
              <picture className={classes.picture}>
                <img className={classes.img} src={logo.location} alt={logo.key} />
              </picture>
            )}
            <ModalGridImages open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LogoForm;
