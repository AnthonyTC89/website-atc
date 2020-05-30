import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Components/Navbar';
import BannerShow from '../Components/BannerShow';
import AboutShow from '../Components/AboutShow';
import ProductsShow from '../Components/ProductsShow';
// import ContactShow from '../Components/ContactShow';
import Footer from '../Components/Footer';

const Home = ({ history }) => {
  const openSignIn = () => (
    history.push('/login')
  );

  return (
    <>
      <Navbar openSignIn={openSignIn} />
      <main>
        <BannerShow />
        <AboutShow />
        <ProductsShow />
        {/* <ContactShow /> */}
      </main>
      <Footer />
    </>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const HomeWrapper = connect(mapStateToProps, null)(Home);

export default HomeWrapper;
