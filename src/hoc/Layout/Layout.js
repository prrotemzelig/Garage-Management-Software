import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

import Aux from '../Auxn/Auxn';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.js';
import HeaderComponent from '../../components/header/HeaderComponent';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        padding: 25,
        paddingLeft: 20
    }
});

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
            <Row className={css(styles.container)}>
            <Toolbar
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}/> 
            <Column flexGrow={1} className={css(styles.mainBlock)}>

            <main className={classes.Content}>
                {this.props.isAuthenticated ?
            <HeaderComponent title="hey 'user name' " style={{direction: "rtl"}}/>
            : null
                }
                {this.props.children}
            </main>
            </Column>

            </Row>

        </Aux>)
    }
} 



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null // we need to find out if the user is authenticated . if it's not null so the user is authenticated
    };
};

export default connect( mapStateToProps )( Layout );