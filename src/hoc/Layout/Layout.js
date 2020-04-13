import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxn/Auxn';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.js';

class Layout extends Component{

    state = { // state should essentially contain information if the sideDrawer is visible or not
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => { // expect the previous state as input and in there, simply return the object, and in there we simply return the object we want to merge into the state
            //This is the clean way of setting the state when it depends on the old state.
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render(){
        return(
            <Aux >  
            <Toolbar
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
} 



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null // we need to find out if the user is authenticated . if it's not null so the user is authenticated
    };
};

export default connect( mapStateToProps )( Layout );