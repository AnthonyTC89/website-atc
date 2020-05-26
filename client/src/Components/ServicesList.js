/* eslint-disable camelcase */
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
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LoadingGif from './LoadingGif';
import ServicesForm from './ServicesForm';
import { ServicesListInfo } from '../Info.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  picture: {
    width: '100%',
    textAlign: 'center',
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
  cells: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const columns = [
  { id: 'id', label: 'id', minWidth: 50, align: 'center' },
  { id: 'title', label: 'titulo', minWidth: 100, align: 'center' },
  { id: 'image', label: 'imagen', minWidth: 150, align: 'center' },
  { id: 'status', label: 'status', minWidth: 50, align: 'center' },
  { id: 'actions', label: 'actions', minWidth: 50, align: 'center' },
];

const ServicesList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [services, setServices] = useState([]);
  const [editItem, setEditItem] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    const newItem = { id: null, title: '', text: '', image_id: '', location: '', key: '', status: true };
    setEditItem(newItem);
    setShowForm(true);
  };

  const closeForm = (item) => {
    setMessage(null);
    setShowForm(false);
    if (item.id) {
      if (services.some((sn) => sn.id === item.id)) {
        const auxServices = services.filter((i) => i.id !== item.id);
        setServices([item, ...auxServices]);
      } else {
        setServices([...services, item]);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeStatus = async (item) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.put(`api/services/${item.id}`, { status: !item.status });
      const index = services.findIndex((p) => p.id === item.id);
      const auxServices = [...services];
      auxServices[index] = { ...auxServices[index], status: !auxServices[index].status };
      setServices(auxServices);
      setMessage(res.statusText);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const getServices = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/services_full');
      if (res.data.length === 0) {
        openForm();
      } else {
        setServices(res.data);
      }
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = async (item) => {
    setLoading(true);
    setMessage(null);
    try {
      await axios.delete(`api/services/${item.id}`);
      setServices(services.filter((p) => p.id !== item.id));
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
    getServices();
    // eslint-disable-next-line
  }, []);

  if (showForm) {
    return <ServicesForm closeForm={closeForm} editItem={editItem} />;
  }
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {ServicesListInfo.title}
      </Typography>
      <Typography variant="subtitle2" align="center" color="error" gutterBottom>
        {message}
      </Typography>
      <LoadingGif visible={loading} />
      <IconButton
        align="center"
        aria-label="delete"
        color="primary"
        disabled={loading}
        onClick={openForm}
      >
        <AddCircleIcon />
      </IconButton>
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
            {services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow hover tabIndex={-1} key={uuidv4()}>
                <TableCell align="center">
                  {item.id}
                </TableCell>
                <TableCell align="center">
                  {item.title}
                </TableCell>
                <TableCell align="center">
                  <picture className={classes.picture}>
                    <img className={classes.img} src={item.location} alt={item.key} />
                  </picture>
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={item.status}
                    onChange={() => handleChangeStatus(item)}
                    color="primary"
                    name="status"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    disabled={loading}
                    onClick={() => handleEdit(item)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
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
        count={services.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ServicesList;
