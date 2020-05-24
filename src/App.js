import React, { Component } from 'react';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
//import 'bootstrap/dist/css/bootstrap.min.css';

import './App.module.css';
import Layout from './hoc/Layout/Layout';
import OpeningPage from './containers/openingPage/openingPage';
import UserHomePage from './containers/UserHomePage/UserHomePage';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles/reduction.scss';


const asyncCards = asyncComponent(() => { // here we can define the path to the component we want to load lazily
  return import('./containers/Cards/Cards');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncOpenCard = asyncComponent(() => {
  return import('./containers/OpenNewCard/OpenNewCard');
});

const asyncReports = asyncComponent(() => {
  return import('./containers/MonthlyReports/Report');
});

const asyncUpdateCard = asyncComponent(() => {
  return import('./containers/UpdateCard/UpdateCard');
});

const asyncOpenTwo = asyncComponent(() => {
  return import('./containers/OpenNewCard/openNew');
});

const asyncAdminSettingPage = asyncComponent(() => { // here we can define the path to the component we want to load lazily
  return import('./containers/AdminSettings/AdminSettings');
});

const asyncAdminUserManagementPage = asyncComponent(() => { // here we can define the path to the component we want to load lazily
  return import('./containers/AdminSettings/AdminUserManagement');
});

const asyncUserSettingPage = asyncComponent(() => { // here we can define the path to the component we want to load lazily
  return import('./containers/openingPage/openingPage');
});

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
}

    resize = () => this.forceUpdate();

  render () {
    
    let routes = (
      <Switch>
        <Route path="/" exact component={OpeningPage} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/main" exact component={UserHomePage} />
          <Route path="/openCards" component={asyncCards} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/cardOpening" exact component={asyncOpenCard} />
          <Route path="/updateTicketStatus" component={asyncOpenTwo} />
          <Route path="/carHistory" component={asyncUpdateCard} />
          <Route path="/AdminSettings" component={asyncAdminSettingPage} />
          <Route path="/AdminUserManagement" component={asyncAdminUserManagementPage} />

          <Route path="/UserSettings" component={asyncUserSettingPage} />
          <Route path="/dailyUpdates" component={asyncReports} />

          <Redirect to="/main" />
          <Redirect to="/" />
        </Switch>
      );
    } // <switch is for : only  load 1 of these routes each time the first one which matches a path, the given path

    return (
      // style={{direction: "rtl"}}
        <Layout>
          {routes}
        </Layout> 
    );
  }
}

const mapStateToProps = state => { 
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );

//  <Route path="/auth" component={Auth} /> - for /auto - we want to load Auth