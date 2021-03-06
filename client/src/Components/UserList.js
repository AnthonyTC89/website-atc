import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RestoreIcon from '@material-ui/icons/Restore';
import TextField from '@material-ui/core/TextField';
import LoadingGif from './LoadingGif';
import { UserListInfo, buttons } from '../Info.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  cells: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const columns = [
  { id: 'id', label: 'id', minWidth: 50, align: 'center' },
  { id: 'username', label: 'username', minWidth: 150, align: 'center' },
  { id: 'email', label: 'email', minWidth: 200, align: 'center' },
  { id: 'status', label: 'status', minWidth: 50, align: 'center' },
];

const UserList = () => {
  const { title } = UserListInfo;
  const { add, wait } = buttons;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUsers = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const token = jwt.sign({ privateKey }, privateKey);
      const res = await axios.get('/api/users_list', { params: { token } });
      setUsers(res.data);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const payload = { username };
      const token = jwt.sign(payload, privateKey);
      const res = await axios.post('/api/users_create', { token });
      setUsers([...users, res.data]);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user) => {
    setLoading(true);
    setMessage(null);
    try {
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const payload = { id: user.id };
      const token = jwt.sign(payload, privateKey);
      const res = await axios.delete('/api/users_delete', { params: { token } });
      setUsers(users.filter((item) => item.id !== user.id));
      setMessage(res.statusText);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (user) => {
    setLoading(true);
    setMessage(null);
    try {
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const payload = { id: user.id };
      const token = jwt.sign(payload, privateKey);
      const res = await axios.put('/api/users_restore', { token });
      setMessage(res.statusText);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (user, value) => {
    setLoading(true);
    setMessage(null);
    try {
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const payload = { id: user.id, value };
      const token = jwt.sign(payload, privateKey);
      const res = await axios.put('/api/users_updown', { token });
      setMessage(res.statusText);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
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
          <Grid item>
            <TextField
              autoComplete="fname"
              name="username"
              variant="outlined"
              id="username"
              value={username}
              label="nuevo usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? wait : add}
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
              <TableCell align="center" style={{ minWidth: 100 }}>
                actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow hover tabIndex={-1} key={uuidv4()}>
                {columns.map((column) => {
                  const value = user[column.id];
                  return (
                    <TableCell key={column.id} align="center">
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                <TableCell className={classes.cells}>
                  <IconButton
                    style={{ color: 'green' }}
                    aria-label="upgrade"
                    disabled={loading}
                    onClick={() => handleUpdate(user, -1)}
                  >
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    style={{ color: 'darkorange' }}
                    aria-label="downgrade"
                    disabled={loading}
                    onClick={() => handleUpdate(user, 1)}
                  >
                    <ArrowDownwardIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    style={{ color: 'black' }}
                    aria-label="restore"
                    disabled={loading}
                    onClick={() => handleRestore(user)}
                  >
                    <RestoreIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    disabled={loading}
                    onClick={() => handleDelete(user)}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UserList;
