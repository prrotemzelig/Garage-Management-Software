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
       //backgroundColor: '#F7F8FC',
        padding: 10,
        paddingLeft: 5
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
    
//    margin-right: 230px;
    render(){
        let sidebarColor;
        let userBackgroundColor ; 
        
        if(this.props.sidebarBackgroundColor==='primary'){
            sidebarColor = 'linear-gradient(0deg, #ba54f5 0%, #e14eca 100%)';
        }
        else if(this.props.sidebarBackgroundColor==='blue'){
            sidebarColor = 'linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)';
        }
        else if(this.props.sidebarBackgroundColor==='green'){
            
            sidebarColor = 'linear-gradient(0deg, #0098f0 0%, #00f2c3 100%)';
        }

        if(this.props.backgroundColor ==='light'){
            userBackgroundColor = '#F7F8FC';
            // 'linear-gradient(0deg, #ba54f5 0%, #e14eca 100%)';
        }
        else if(this.props.backgroundColor === 'dark'){
            userBackgroundColor = '#222a42';
        }
        else{
            userBackgroundColor = '#F7F8FC';

        }

        return(
            <Aux >  
            <Row className={css(styles.container)} style={{backgroundColor:userBackgroundColor}}>
                
            <Toolbar
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}
                colorBackground={sidebarColor}/>
            <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}
                colorBackground={sidebarColor}/> 

            <Column flexGrow={1} className={css(styles.mainBlock)}>
         {this.props.isAuthenticated ?
                <HeaderComponent title={this.props.firstName}  style={{direction: "rtl"}}/>
                : null
                } 
            <main className={classes.Content}>
              
                {this.props.children}
            </main>
            </Column>

            </Row>
        
        </Aux>)
    }
} 



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null, // we need to find out if the user is authenticated . if it's not null so the user is authenticated
        firstName: state.auth.firstName,
        sidebarBackgroundColor: state.auth.sidebarBackgroundColor,
        backgroundColor: state.auth.backgroundColor

    };
};

export default connect( mapStateToProps )( Layout );