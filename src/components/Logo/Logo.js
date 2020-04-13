import React from 'react';

import carLogo from '../../assets/images/car.png';
import classes from './Logo.module.css';

const logo = (props) => (
    
    <div className={classes.Logo} style={{height: props.height}}>
        
        <img src={carLogo} alt="car" />
    </div>
);
//my car Logo in the end just receive the path of the image where webpack will copy it to.
//so this will be dynamically resolved
//src={carLogo} - this will again refer to a string in the end to the path where webpack the optimized and copied images.

export default logo;