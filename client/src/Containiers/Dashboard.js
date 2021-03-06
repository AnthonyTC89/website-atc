import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AppleIcon from '@material-ui/icons/Apple';
import PanoramaIcon from '@material-ui/icons/Panorama';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import InfoIcon from '@material-ui/icons/Info';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import StoreIcon from '@material-ui/icons/Store';
import WorkIcon from '@material-ui/icons/Work';
import updateSession from '../redux/actions/updateSession';
import updateDashboard from '../redux/actions/updateDashboard';
import updateImages from '../redux/actions/updateImages';
import { DashboardInfo } from '../Info.json';

const drawerWidth = 240;

const icons = {
  AccountCircleIcon: <AccountCircleIcon />,
  AssignmentIcon: <AssignmentIcon />,
  PeopleIcon: <PeopleIcon />,
  PhotoLibraryIcon: <PhotoLibraryIcon />,
  AppleIcon: <AppleIcon />,
  PanoramaIcon: <PanoramaIcon />,
  ContactPhoneIcon: <ContactPhoneIcon />,
  InfoIcon: <InfoIcon />,
  GroupAddIcon: <GroupAddIcon />,
  StoreIcon: <StoreIcon />,
  WorkIcon: <WorkIcon />,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = ({ dashboard, history, session, changeSession,
  changeComponent, changeImages }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [showComponent, setShowComponent] = useState(true);
  const { mainListItems, homeListItems, adminListItems, secondaryListItems } = DashboardInfo;
  const { Component } = dashboard;

  const isAdmin = () => {
    try {
      const privateKey = process.env.REACT_APP_PRIVATE_KEY_JWT;
      const user = jwt.verify(session.user, privateKey);
      return user.status === 1;
    } catch (err) {
      return false;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setShowComponent(window.innerWidth >= theme.breakpoints.width('sm'));
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setShowComponent(true);
  };

  const handleLogout = async () => {
    changeSession(null);
    history.push('/');
  };

  const getImages = async () => {
    try {
      const res = await axios.get('/api/images');
      changeImages(res.data);
    } catch (err) {
      setMessage(err.response.statusText);
    }
  };

  useEffect(() => {
    if (!session.isLoggedIn) {
      history.push('/');
    }
    getImages();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleLogout}
            >
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {mainListItems.map((item) => (
              <ListItem key={uuidv4()} button onClick={() => changeComponent(item.component)}>
                <ListItemIcon>
                  {icons[item.icon]}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {homeListItems.map((item) => (
              <ListItem key={uuidv4()} button onClick={() => changeComponent(item.component)}>
                <ListItemIcon>
                  {icons[item.icon]}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {secondaryListItems.map((item) => (
              <ListItem key={uuidv4()} button onClick={() => changeComponent(item.component)}>
                <ListItemIcon>
                  {icons[item.icon]}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          {isAdmin() ? (
            <List>
              <ListSubheader inset>Admin</ListSubheader>
              {adminListItems.map((item) => (
                <ListItem key={uuidv4()} button onClick={() => changeComponent(item.component)}>
                  <ListItemIcon>
                    {icons[item.icon]}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          ) : null }
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {showComponent ? (
            <Container maxWidth="lg" className={classes.container}>
              {message == null ? null : (
                <Typography variant="subtitle2" align="center" color="error" gutterBottom>
                  {message}
                </Typography>
              )}
              <Component />
            </Container>
          ) : null }
        </main>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  dashboard: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
  changeComponent: PropTypes.func.isRequired,
  changeImages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
  changeComponent: (component) => dispatch(updateDashboard(component)),
  changeImages: (data) => dispatch(updateImages(data)),
});

const DashboardWrapper = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardWrapper;
