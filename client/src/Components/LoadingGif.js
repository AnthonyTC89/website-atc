import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import loadingGif from '../Images/loading.gif';

const useStyles = makeStyles({
  picture: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  img: {
    maxWidth: '3rem',
  },
});

const LoadingGif = ({ visible }) => {
  const classes = useStyles();
  return (
    visible ? (
      <picture className={classes.picture}>
        <img className={classes.img} src={loadingGif} alt="icon-loading" />
      </picture>
    ) : null
  );
};

LoadingGif.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default LoadingGif;
