import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
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
import LoadingGif from './LoadingGif';
import { UserListInfo } from '../Info.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    // textAlign: 'center',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'id', label: 'id', minWidth: 50 },
  { id: 'username', label: 'username', minWidth: 150 },
  { id: 'email', label: 'email', minWidth: 200 },
  { id: 'status', label: 'status', minWidth: 50 },
];

function createData(id, username, email, status) {
  return { id, username, email, status };
}

const rows = [
  createData('1', 'user1', 'email1@domain.com', 1),
  createData('2', 'user2', 'email2@domain.com', 2),
  createData('3', 'user3', 'email3@domain.com', 2),
  createData('4', 'user4', 'email4@domain.com', 3),
  createData('5', 'user5', 'email5@domain.com', 3),
  createData('6', 'user6', 'email6@domain.com', 2),
];

const UserList = () => {
  const { title } = UserListInfo;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('message');
  // const [users, setUsers] = useState([]);

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
      // const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      // const token = jwt.sign({ privateKey }, privateKey);
      // const res = await axios.get('/api/users_list', { params: { token } });
      // console.log(res.data);
      setMessage(null);
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
      <Typography variant="h4" align="center" color="primary">
        {title}
      </Typography>
      <Typography variant="subtitle2" align="center" color="error">
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
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UserList;
