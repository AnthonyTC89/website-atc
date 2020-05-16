import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import updateSession from '../redux/actions/updateSession';
import Footer from '../Components/Footer';
import LoadingGif from '../Components/LoadingGif';
import { signInInfo, buttons } from '../Info.json';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ session, history, changeSession }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const classes = useStyles();
  const { title } = signInInfo;
  const { login, wait } = buttons;

  useEffect(() => {
    if (session.isLoggedIn) {
      history.push('/dashboard');
    }
  });

  const closeSignIn = () => (
    history.push('/')
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const token = jwt.sign({ username, password }, privateKey);
      const res = await axios.post('/api/users/login', { token });
      setError(null);
      setLoading(false);
      changeSession(res.data);
    } catch (err) {
      setError(err.response.statusText);
      setLoading(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <IconButton onClick={closeSignIn}>
            <Avatar className={classes.avatar}>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          {error === null ? null : (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <LoadingGif visible={loading} />
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="usuario"
              name="username"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="contraseña"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              {loading ? wait : login}
            </Button>
          </form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

SignIn.propTypes = {
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
});

const SignInWrapper = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInWrapper;
