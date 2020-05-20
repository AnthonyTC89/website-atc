import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { uploadFile, deleteFile } from 'react-s3';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingGif from './LoadingGif';
import { ImagesListInfo, buttons } from '../Info.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  picture: {
    width: '100%',
  },
  img: {
    maxWidth: '5rem',
  },
  button: {
    margin: '1rem',
  },
  container: {
    marginTop: '2rem',
  },
  input: {
    display: 'none',
  },
  cells: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const columns = [
  { id: 'id', label: 'id', minWidth: 50, align: 'center' },
  { id: 'key', label: 'filename', minWidth: 150, align: 'center' },
  { id: 'location', label: 'url', minWidth: 200, align: 'center' },
  { id: 'actions', label: 'actions', minWidth: 50, align: 'center' },
];

const ImagesList = () => {
  const { title } = ImagesListInfo;
  const { upload, wait, select } = buttons;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [images, setImages] = useState([]);
  const configS3 = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_S3_BUCKET_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getImages = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/images');
      setImages(res.data);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const data = await uploadFile(file, configS3);
      const { bucket, key, location } = data;
      const res = await axios.post('/api/images', { bucket, key, location });
      const newRecipe = { id: res.data.id, key, location };
      setImages([...images, newRecipe]);
    } catch (err) {
      if (err.statusText) {
        setMessage(err.statusText);
      } else {
        setMessage(err.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (image) => {
    setLoading(true);
    setMessage(null);
    try {
      await axios.delete(`api/images/${image.id}`);
      await deleteFile(image.key, configS3);
      setImages(images.filter((img) => img.id !== image.id));
    } catch (err) {
      if (err.statusText) {
        setMessage(err.statusText);
      } else {
        setMessage(err.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle2" align="center" color="error" gutterBottom>
        {message}
      </Typography>
      <LoadingGif visible={loading} />
      <form onSubmit={handleCreate}>
        <Grid container spacing={3} justify="center" alignItems="center" alignContent="center">
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple={false}
            type="file"
            onChange={(e) => setFile(e.currentTarget.files[0])}
          />
          <label htmlFor="contained-button-file">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              component="span"
              disabled={loading}
            >
              {select}
            </Button>
          </label>
          <Typography variant="subtitle2" display="block" gutterBottom>
            {file == null ? null : file.name}
          </Typography>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? wait : upload}
          </Button>
        </Grid>
      </form>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={uuidv4()}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {images.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow hover tabIndex={-1} key={uuidv4()}>
                <TableCell align="center">
                  {item.id}
                </TableCell>
                <TableCell align="center">
                  {item.key}
                </TableCell>
                <TableCell align="center">
                  <picture className={classes.picture}>
                    <img className={classes.img} src={item.location} alt={item.key} />
                  </picture>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    disabled={loading}
                    onClick={() => handleDelete(item)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={images.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ImagesList;
