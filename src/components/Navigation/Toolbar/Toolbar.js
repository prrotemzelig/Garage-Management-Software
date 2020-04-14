import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems.js';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
// style={{direction: "rtl"}}
const toolbar = (props) => (
    <header className={classes.Toolbar} >
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
        <div className={classes.Logo}>
            <Logo/>
        </div>
   
    </header>
);

/*this going to be a functional component because it don't need to manage any state in there.
we expect to get some props there and then, outputting some jsx. */

export default toolbar;