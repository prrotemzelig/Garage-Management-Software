import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxn/Auxn';
import LogoComponent from '../../sidebar/LogoComponent';

const sideDrawer = ( props ) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) { // if this is true, the attachedClasses should actually not have to Close class but the Open class
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
 
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed} style={{background: props.colorBackground}} >
                <div > 
                <LogoComponent />
                <div className={classes.separator}></div>

                </div>
                <nav >
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>

    );
};

export default sideDrawer;