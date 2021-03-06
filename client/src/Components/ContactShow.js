import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GoogleMaps from './GoogleMaps';
import LoadingGif from './LoadingGif';
import maintenance from '../Images/maintenance.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto',
    padding: '2rem',
    background: '#F2F9FF',
  },
  title: {
    fontWeight: 400,
    fontSize: '3em',
    textAlign: 'center',
    margin: '1rem',
    color: theme.palette.primary.dark,
  },
  picture: {
    width: '100%',
  },
  img: {
    width: '80%',
    boxShadow: `0px 10px 15px 0px ${theme.palette.primary.main}`,
  },
  columnImg: {
    textAlign: 'center',
    padding: '0 2rem',
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem auto',
  },
  icon: {
    color: theme.palette.primary.dark,
    margin: '0 0.5rem',
  },
  text: {
    color: theme.palette.primary.dark,
  },
}));

const emptyContact = {
  title: 'Contact Us',
  location: maintenance,
  key: 'maintenance',
  email: 'email@domain.com',
  mobile: '987654321',
  address: 'Av. My address 123',
  zoom: 10,
  lat: '0',
  lng: '0',
};

const ContactShow = () => {
  const classes = useStyles();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleMapsKey = process.env.REACT_APP_KEY_API_GOOGLEMAPS;
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleMapsKey}`;
  const containerElement = <div style={{ height: '100%' }} />;
  const mapElement = <div style={{ height: '100%' }} />;
  const loadingElement = <LoadingGif visible />;

  const getContact = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/contacts_home');
      if (res.data.length !== 0) {
        setContact(res.data[0]);
      } else {
        setContact(emptyContact);
      }
    } catch (err) {
      setContact(emptyContact);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContact();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <LoadingGif visible={loading} home />;
  }
  return (
    <Grid container component="section" className={classes.root} id="contact">
      <Hidden smDown>
        <Grid item xs={12} md={4} className={classes.columnImg}>
          <Grow in timeout={2000} appear>
            <picture className={classes.picture}>
              <img className={classes.img} src={contact.location} alt={contact.key} />
            </picture>
          </Grow>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={6} md={4} className={classes.columnImg}>
        <Typography className={classes.title} variant="h2">
          {contact.title}
        </Typography>
        <div className={classes.info}>
          <EmailIcon className={classes.icon} />
          <Typography className={classes.text}>
            {contact.email}
          </Typography>
        </div>
        <div className={classes.info}>
          <PhoneIcon className={classes.icon} />
          <Typography className={classes.text}>
            {contact.mobile}
          </Typography>
        </div>
        <div className={classes.info}>
          <LocationOnIcon className={classes.icon} />
          <Typography className={classes.text}>
            {contact.address}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} className={classes.columnImg}>
        <Grow in timeout={2000} appear>
          <GoogleMaps
            googleMapURL={googleMapURL}
            containerElement={containerElement}
            mapElement={mapElement}
            loadingElement={loadingElement}
            zoom={contact.zoom}
            lat={parseFloat(contact.lat)}
            lng={parseFloat(contact.lng)}
          />
        </Grow>
      </Grid>
    </Grid>
  );
};

export default ContactShow;
