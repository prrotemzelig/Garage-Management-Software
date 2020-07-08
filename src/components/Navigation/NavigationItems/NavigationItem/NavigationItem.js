import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';
// import Icon from '../../../../assets/icon-overview.js';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

//const navigationItem = ( props ) => (

class navigationItem extends Component {
    
static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
    };

render(){
   // const { match, location, history } = this.props; // I want to get the current location to know with icon need to be light!    
    const { location } = this.props; // I want to get the current location to know with icon need to be light!
    let isActive = location.pathname === this.props.link;

return(
    <li className={classes.NavigationItem}>
        
        <NavLink 
        
            to={this.props.link} //the to path here is what determines whether this is the active route or not and it's treated as a prefix as learned
            //so as long as our current paths starts with path here, this link is treated to be active
            exact={this.props.exact} // its make sure that this only gets used if it is exact. this of course will attach exact to all nav links
            activeClassName={classes.active} >
            {this.props.children} 
           
            {isActive?
              <span style={{marginLeft: "10px"}}> <this.props.icon fill={'white'} /> </span>
            :                 
            <span style={{marginLeft: "10px"}}>  <this.props.icon  /> </span>
           
        }
        </NavLink>
              
        </li>
    );
}
}

NavLink.contextTypes = {
    router: PropTypes.object
};


export default withRouter(navigationItem);
//this hold the individual navigation item