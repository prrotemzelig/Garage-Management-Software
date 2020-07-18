import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount () {
        this.props.onLogout(); 

        this.props.onLogoutAdminReducers(); 
        this.props.onLogoutCardReducers(); 
        this.props.onLogoutNotificationReducers(); 
        this.props.onLogoutStorageReducers(); 
        this.props.onLogoutTaskReducers(); 
    }

    render () {
        return <Redirect to="/auth"/>; // here we redirect to the path we need o change. we want to redirect declaratively
       // return <Redirect to="/"/>; // here we redirect to the path we need o change. we want to redirect declaratively
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()), // this is the onLogout prop which we can call as a function to dispatch this action 

        onLogoutAdminReducers: () => dispatch(actions.logoutAdminReducers()),
        onLogoutCardReducers: () => dispatch(actions.logoutCardReducers()),
        onLogoutNotificationReducers: () => dispatch(actions.logoutNotificationReducers()),
        onLogoutStorageReducers: () => dispatch(actions.logoutStorageReducers()),
        onLogoutTaskReducers: () => dispatch(actions.logoutTaskReducers())

    };
};

export default connect(null, mapDispatchToProps)(Logout);