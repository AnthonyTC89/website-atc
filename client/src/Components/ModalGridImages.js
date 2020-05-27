import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'blue',
    border: '2px solid #000',
    padding: '0.5rem',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'aliceblue',
  },
  gridList: {
    width: 500,
    height: 450,
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
  },
  img: {
    width: '100%',
  },
});

const ModalImages = ({ open, handleClose, images }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {images.map((tile) => (
              <GridListTile key={uuidv4()}>
                <Button
                  className={classes.button}
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleClose(tile)}
                >
                  <img className={classes.img} src={tile.location} alt={tile.key} />
                </Button>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Fade>
    </Modal>
  );
};

ModalImages.propTypes = {
  images: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  images: state.images,
});

const ModalImagesWrapper = connect(mapStateToProps, null)(ModalImages);

export default ModalImagesWrapper;
