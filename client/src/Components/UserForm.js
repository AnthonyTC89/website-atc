import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserFormInfo, buttons } from '../Info.json';
import LoadingGif from './LoadingGif';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserForm = ({ session }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const classes = useStyles();
  const { title } = UserFormInfo;
  const { update, wait } = buttons;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const user = jwt.verify(session.user, privateKey);
      const payload = { id: user.id, email };
      if (password !== '') {
        if (password.trim() !== confirmation.trim()) {
          throw new Error('Contraseña');
        }
        const salt = parseInt(process.env.REACT_APP_BCRYPT_SALT, 10);
        payload.password_digest = bcrypt.hashSync(password, salt);
      }
      const token = jwt.sign(payload, privateKey);
      await axios.put('api/users_update', { token });
      setMessage('success');
      setPassword('');
      setConfirmation('');
    } catch (err) {
      if (err.response) {
        setMessage(err.response.statusText);
      } else {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.user) {
      try {
        const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
        const user = jwt.verify(session.user, privateKey);
        setUsername(user.username);
        setEmail(user.email);
      } catch (err) {
        setMessage(err.message);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle2" color="error" align="center">
          {message}
        </Typography>
        <LoadingGif visible={loading} />
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                disabled
                fullWidth
                id="username"
                value={username}
                label="usuario"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={email}
                label="correo electrónico"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmation"
                label="confirmación"
                type="password"
                id="confirmation"
                value={confirmation}
                disabled={password === ''}
                required={password !== ''}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? wait : update}
          </Button>
        </form>
      </div>
    </Container>
  );
};

UserForm.propTypes = {
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const UserFormWrapper = connect(mapStateToProps, null)(UserForm);

export default UserFormWrapper;
