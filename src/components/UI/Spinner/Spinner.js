
import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
    // if loading between is like a fallback in case the css isn't displayed then this will be show
);

export default spinner;