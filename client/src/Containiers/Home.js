import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Home = ({ history }) => {
  const openSignIn = () => (
    history.push('/login')
  );

  return (
    <>
      <header>
        <Navbar openSignIn={openSignIn} />
      </header>
      <main>
        Main
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
