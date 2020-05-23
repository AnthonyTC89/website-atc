/* eslint-disable object-property-newline */
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
import { ContactFormInfo, buttons } from '../Info.json';

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

const ContactForm = () => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [contact, setContact] = useState({
    id: null, title: '', email: '', mobile: '', address: '',
    zoom: '10', lat: '0', lng: '0', image_id: null, location: '', key: '',
  });

  const { update, wait, select } = buttons;

  const handleChange = (e) => {
    e.persist();
    setContact((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = contact.id == null
        ? await axios.post('api/contacts/', contact)
        : await axios.put(`api/contacts/${contact.id}`, contact);
      setContact((prev) => ({ ...prev, id: res.data.id }));
      setMessage(res.statusText);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  const getContact = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/contacts_full');
      if (res.data.length !== 0) {
        setContact(res.data[0]);
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
      setContact((prev) => (
        { ...prev,
          image_id: image.id,
          location: image.location,
          key: image.key,
        }
      ));
    }
  };

  useEffect(() => {
    getContact();
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {ContactFormInfo.title}
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
              value={contact.title}
              label="titulo"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              type="email"
              variant="outlined"
              id="email"
              value={contact.email}
              label="correo electrónico"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="mobile"
              type="tel"
              variant="outlined"
              id="mobile"
              value={contact.mobile}
              label="celular"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="address"
              multiline
              rows="3"
              variant="outlined"
              id="address"
              value={contact.address}
              label="dirección"
              onChange={handleChange}
            />
            <Typography variant="h6" align="center" color="primary" gutterBottom>
              Google Maps
            </Typography>
            <TextField
              margin="dense"
              name="zoom"
              type="number"
              variant="outlined"
              id="zoom"
              value={contact.zoom}
              label="zoom"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="lat"
              variant="outlined"
              id="lat"
              value={contact.lat}
              label="latitud"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="lng"
              variant="outlined"
              id="lng"
              value={contact.lng}
              label="longitud"
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
            {contact.image_id == null ? null : (
              <picture className={classes.picture}>
                <img className={classes.img} src={contact.location} alt={contact.key} />
              </picture>
            )}
            <ModalImages open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;
