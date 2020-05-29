import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  picture: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
});

const LoadingGif = ({ visible }) => {
  const classes = useStyles();
  return (
    visible ? (
      <picture className={classes.picture}>
        <CircularProgress />
      </picture>
    ) : null
  );
};

LoadingGif.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default LoadingGif;
