
import React from 'react';
import { Spinner } from "reactstrap";

import classes from './Spinner.module.css';

const spinner = () => (
<div>
    <Spinner color="secondary" style={{ width: '10rem', height: '10rem' }} />
</div>

    //<div className={classes.Loader}>Loading...</div>


    // if loading between is like a fallback in case the css isn't displayed then this will be show
);

export default spinner;
//<div className={classes.Loader}>Loading...</div>

{/* <div class="spinner-border text-muted" style={{width: '10rem' , height: '10rem'}} >
    <span class="sr-only">Loading...</span>
</div> */}