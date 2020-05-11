import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import updateSession from '../redux/actions/updateSession';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './Home.css';

const Home = ({ session, history }) => {
  useEffect(() => {
    console.log(session);
    console.log(history);
  });

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
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  // changeSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

// const mapDispatchToProps = (dispatch) => ({
//   changeSession: (session) => dispatch(updateSession(session)),
// });

const HomeWrapper = connect(mapStateToProps, null)(Home);

export default HomeWrapper;
