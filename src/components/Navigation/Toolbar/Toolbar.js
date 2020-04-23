import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems.js';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import LogoComponent from '../../sidebar/LogoComponent'
// style={{direction: "rtl"}}
const toolbar = (props) => (
    
<div>
    <DrawerToggle clicked={props.drawerToggleClicked}/>

    <header className={classes.Toolbar} >
        <LogoComponent />
        <nav className={classes.DesktopOnly}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>

            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
        
        
   
    </header></div>
);

/*this going to be a functional component because it don't need to manage any state in there.
we expect to get some props there and then, outputting some jsx. */

export default toolbar;