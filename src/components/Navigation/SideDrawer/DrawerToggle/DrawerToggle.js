import React from 'react';

import classes from './DrawerToggle.module.css';
// the css code add 3 white lines instead the menu in the left side 

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;