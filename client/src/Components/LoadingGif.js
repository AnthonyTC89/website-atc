import React from 'react';
import PropTypes from 'prop-types';
import loadingGif from '../Images/loading.gif';
import './LoadingGif.css';

const LoadingGif = ({ visible }) => (
  visible ? (
    <picture className="picture-loading">
      <img className="icon-loading" src={loadingGif} alt="icon-loading" />
    </picture>
  ) : null
);

LoadingGif.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default LoadingGif;
