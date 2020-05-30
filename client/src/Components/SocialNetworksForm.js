import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LoadingGif from './LoadingGif';
import { SocialNetworksInfo, buttons } from '../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SocialNetworksForm = ({ closeForm, editItem }) => {
  const classes = useStyles();
  const [socialNetwork, setSocialNetwork] = useState(editItem);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { title } = SocialNetworksInfo;
  const { add, update, wait } = buttons;
  const btnText = socialNetwork.id == null ? add : update;

  const handleChange = (e) => {
    e.persist();
    setSocialNetwork((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = socialNetwork.id !== null
        ? await axios.put(`api/social_networks/${socialNetwork.id}`, socialNetwork)
        : await axios.post('api/social_networks', socialNetwork);
      setLoading(false);
      const { id, name, href, src, status } = res.data;
      closeForm({ id, name, href, src, status });
    } catch (err) {
      setMessage(err.response.statusText);
      setLoading(false);
    }
  };

  return (
    <Paper className={classes.root}>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
        <Container maxWidth="xs">
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.column}>
              <TextField
                margin="dense"
                name="name"
                variant="outlined"
                id="name"
                value={socialNetwork.name}
                label="name"
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                fullWidth
                name="href"
                variant="outlined"
                id="href"
                value={socialNetwork.href}
                label="enlace (url)"
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                fullWidth
                name="src"
                variant="outlined"
                id="src"
                value={socialNetwork.src}
                label="icono (url)"
                onChange={handleChange}
              />
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? wait : btnText}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Paper>
  );
};

SocialNetworksForm.propTypes = {
  editItem: PropTypes.object.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default SocialNetworksForm;
