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
import ProductsForm from './ProductsForm';
import { ProductsListInfo } from '../Info.json';

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
  { id: 'title', label: 'titulo', minWidth: 100, align: 'center' },
  { id: 'image', label: 'imagen', minWidth: 150, align: 'center' },
  { id: 'status', label: 'status', minWidth: 50, align: 'center' },
  { id: 'actions', label: 'actions', minWidth: 50, align: 'center' },
];

const ProductsList = () => {
  const { title } = ProductsListInfo;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [editItem, setEditItem] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setEditItem({ id: null, name: '', href: '', src: '' });
    setShowForm(true);
  };

  const closeForm = (item) => {
    setMessage(null);
    setShowForm(false);
    if (item.id) {
      if (products.some((sn) => sn.id === item.id)) {
        const auxProducts = products.filter((i) => i.id !== item.id);
        setProducts([item, ...auxProducts]);
      } else {
        setProducts([...products, item]);
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
      const res = await axios.put(`api/products/${item.id}`, { status: !item.status });
      const { id, name, href, src, status } = res.data;
      const newProduct = { id, name, href, src, status };
      const auxProducts = products.filter((i) => i.id !== item.id);
      const fullProducts = [...auxProducts, newProduct];
      const sortedProducts = fullProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
      setProducts(sortedProducts);
      setMessage(res.statusText);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/products_full');
      if (res.data.length === 0) {
        // setShowForm(true);
      } else {
        setProducts(res.data);
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
      await axios.delete(`api/products/${item.id}`);
      setProducts(products.filter((p) => p.id !== item.id));
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
    getProducts();
    // eslint-disable-next-line
  }, []);

  if (showForm) {
    return <ProductsForm closeForm={closeForm} editItem={editItem} />;
  }
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {title}
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
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
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
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductsList;
