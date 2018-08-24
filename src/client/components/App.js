import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Routes } from './router';
import { Header } from './commons';

//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
const mapStateToProps = state => ({
  loading: state.get('ajaxCallsInProgress') > 0,
  location: state.get('router').get('location'),
});

const App = ({ loading }) => (
  <div className="container-fluid">
    <Header loading={loading} />
    <Routes />
  </div>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired
};

const connectedApp = connect(mapStateToProps)(App);
export default hot(module)(connectedApp);
