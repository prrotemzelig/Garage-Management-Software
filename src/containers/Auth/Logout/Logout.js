import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount () {
        this.props.onLogout(); // call this.props.onLogout
    }

    render () {
        return <Redirect to="/"/>; // here we redirect to the path we need o change. we want to redirect declaratively
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()) // this is the onLogout prop which we can call as a function to dispatch this action 
    };
};

export default connect(null, mapDispatchToProps)(Logout);