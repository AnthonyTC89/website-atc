/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingGif from './LoadingGif';
import { SocialNetworksListInfo } from '../Info.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  picture: {
    width: '100%',
    textAlign: 'center',
  },
  img: {
    maxWidth: '2rem',
  },
  button: {
    margin: '1rem',
  },
  container: {
    marginTop: '2rem',
  },
  cells: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const columns = [
  { id: 'id', label: 'id', minWidth: 50, align: 'center' },
  { id: 'name', label: 'name', minWidth: 100, align: 'center' },
  { id: 'href', label: 'url', minWidth: 200, align: 'center' },
  { id: 'src', label: 'icon', minWidth: 100, align: 'center' },
  { id: 'status', label: 'status', minWidth: 100, align: 'center' },
  { id: 'actions', label: 'actions', minWidth: 50, align: 'center' },
];

const SocialNetworkList = () => {
  const { title } = SocialNetworksListInfo;
  // const { upload, wait, select } = buttons;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getSocialNetworks = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/social_networks');
      setSocialNetworks(res.data);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (socialNetwork) => {
    setLoading(true);
    setMessage(null);
    try {
      await axios.delete(`api/social_networks/${socialNetwork.id}`);
      setSocialNetworks(socialNetworks.filter((sn) => sn.id !== socialNetwork.id));
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
    getSocialNetworks();
    // eslint-disable-next-line
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
            {socialNetworks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow hover tabIndex={-1} key={uuidv4()}>
                <TableCell align="center">
                  {item.id}
                </TableCell>
                <TableCell align="center">
                  {item.name}
                </TableCell>
                <TableCell align="center">
                  <picture className={classes.picture}>
                    <img className={classes.img} src={item.src} alt={item.name} />
                  </picture>
                </TableCell>
                <TableCell align="center">
                  {item.href}
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
        count={socialNetworks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SocialNetworkList;
