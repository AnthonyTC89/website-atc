import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import ModalGridImages from './ModalGridImages';
import LoadingGif from './LoadingGif';
import { ServicesFormInfo, buttons } from '../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
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
}));

const ServicesForm = ({ editItem, closeForm }) => {
  const classes = useStyles();
  const { title } = ServicesFormInfo;
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(editItem);

  const { add, update, wait, select } = buttons;
  const btnText = service.id == null ? add : update;

  const handleChange = (e) => {
    e.persist();
    setService((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = service.id == null
        ? await axios.post('api/services/', service)
        : await axios.put(`api/services/${service.id}`, service);
      setLoading(false);
      closeForm({ ...service, id: res.data.id });
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
      setService((prev) => (
        { ...prev,
          image_id: image.id,
          location: image.location,
          key: image.key,
        }
      ));
    }
  };

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle2" align="center" color="error" gutterBottom>
        {message}
      </Typography>
      <LoadingGif visible={loading} />
      <IconButton
        aria-label="return"
        disabled={loading}
        onClick={closeForm}
      >
        <Avatar className={classes.avatar}>
          <ArrowBackIcon />
        </Avatar>
      </IconButton>
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
              {loading ? wait : btnText}
            </Button>
            <TextField
              margin="dense"
              name="title"
              variant="outlined"
              id="title"
              value={service.title}
              label="titulo"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="text"
              multiline
              rows={6}
              variant="outlined"
              id="text"
              value={service.text}
              label="descripción"
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
            {service.image_id == null ? null : (
              <picture className={classes.picture}>
                <img className={classes.img} src={service.location} alt={service.key} />
              </picture>
            )}
            <ModalGridImages open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

ServicesForm.propTypes = {
  editItem: PropTypes.object.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default ServicesForm;
