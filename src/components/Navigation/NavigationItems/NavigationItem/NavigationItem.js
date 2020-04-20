import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';
import Icon from '../../../../assets/icon-overview.js';

const navigationItem = ( props ) => (
    

    <li className={classes.NavigationItem}>
        
        <NavLink 
        
            to={props.link} //the to path here is what determines whether this is the active route or not and it's treated as a prefix as learned
            //so as long as our current paths starts with path here, this link is treated to be active
            exact={props.exact} // its make sure that this only gets used if it is exact. this of course will attach exact to all nav links
            activeClassName={classes.active}>
            {props.children} 
            <Icon activeClassName={classes.Logo} />
        
        </NavLink>
            

    </li>
);

export default navigationItem;
//this hold the individual navigation item